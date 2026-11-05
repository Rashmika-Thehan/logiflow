import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BREADCRUMB, TRIP } from '../schemas';
import { PositionStore } from '../ingest/position-store';
import { LiveFeed } from '../live/live-feed';

const TERMINAL = ['DELIVERED', 'FAILED', 'CANCELLED'];
const ORDER = ['PENDING', 'DISPATCHING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
const below = (status: string) => ORDER.slice(0, Math.max(ORDER.indexOf(status), 0));

// Every Mongo query in this service filters tenantId explicitly: unlike the Prisma
// services there is no scoping extension to do it for us.
@Injectable()
export class TripsService implements OnApplicationBootstrap {
    constructor(
        @InjectModel(TRIP) private readonly trips: Model<any>,
        @InjectModel(BREADCRUMB) private readonly breadcrumbs: Model<any>,
        @InjectModel(TRIP) private readonly tripsModel: Model<any>, // or use this.trips
        private readonly positions: PositionStore,
        private readonly feed: LiveFeed,
    ) { }

    // Solution A: Startup backfill to ensure legacy Redis hashes get the new `${coords}|${tenantId}` format
    async onApplicationBootstrap() {
        try {
            const activeTrips = await this.trips.find({
                status: 'IN_TRANSIT',
                driverId: { $exists: true }
            }).lean();

            for (const trip of activeTrips) {
                if (trip.driverId && trip.destLat != null && trip.destLng != null) {
                    await this.positions.addTrip(
                        trip.driverId,
                        trip.shipmentId,
                        trip.tenantId,
                        trip.destLat,
                        trip.destLng,
                    );
                }
            }
        } catch (err) {
            // Log or handle startup backfill error gracefully if needed
        }
    }

    // ---- projection (driven by Kafka events) ----

    async onShipmentCreated(tenantId: string, p: any) {
        if (!p?.shipmentId || !p?.trackingCode) return;
        await this.trips.updateOne(
            { shipmentId: p.shipmentId },
            {
                $setOnInsert: {
                    shipmentId: p.shipmentId, tenantId, trackingCode: p.trackingCode, status: 'PENDING',
                    ...(p.recipientLat != null && p.recipientLng != null ? { destLat: p.recipientLat, destLng: p.recipientLng } : {}),
                },
            },
            { upsert: true },
        );
    }

    async onStatusChanged(p: { shipmentId?: string; from?: string; to?: string }) {
        if (!p?.shipmentId || !p.to) return;
        const { shipmentId, from, to } = p;

        // One atomic conditional update: apply only forward progress (or the explicit
        // ASSIGNED -> DISPATCHING regression), so replays and duplicates change nothing.
        const filter: any = { shipmentId, status: { $nin: TERMINAL } };
        if (!TERMINAL.includes(to)) filter.$or = [{ status: from }, { status: { $in: below(to) } }];

        const set: any = { status: to };
        if (to === 'PICKED_UP') set.pickedUpAt = new Date();
        if (TERMINAL.includes(to)) {
            set.endedAt = new Date();
            set.carrierEndedAt = new Date(); // 👈 Cap carrier journey if trip completed normally
        }

        const trip: any = await this.trips.findOneAndUpdate(filter, { $set: set }, { returnDocument: 'after' }).lean();
        if (!trip) return;

        if (to === 'PICKED_UP' && trip.driverId) {
            await this.trips.updateOne({ shipmentId }, { $set: { carrierDriverId: trip.driverId } });
        }
        if (to === 'IN_TRANSIT' && trip.driverId) {
            await this.positions.addTrip(trip.driverId, shipmentId, trip.tenantId, trip.destLat, trip.destLng);
        }
        if (TERMINAL.includes(to)) {
            if (trip.driverId) await this.positions.removeTrip(trip.driverId, shipmentId);
            this.feed.tripEnded$.next({ shipmentId, status: to });
        }
    }

    async onAssigned(shipmentId?: string, driverId?: string) {
        if (!shipmentId || !driverId) return;
        const trip: any = await this.trips
            .findOneAndUpdate({ shipmentId, status: { $nin: TERMINAL } }, { $set: { driverId } }, { returnDocument: 'after' })
            .lean();
        // Events from different topics can interleave on a replay: if the shipment is already in transit, go live now.
        if (trip?.status === 'IN_TRANSIT') await this.positions.addTrip(driverId, shipmentId, trip.tenantId, trip.destLat, trip.destLng);
    }

    async onUnassigned(shipmentId?: string, driverId?: string) {
        if (!shipmentId || !driverId) return;
        const now = new Date();
        await this.trips.updateOne(
            { shipmentId, driverId },
            {
                $unset: { driverId: '' },
                $set: { carrierEndedAt: now } // 👈 Record when the driver stopped carrying to prevent privacy leaks
            }
        );
        await this.positions.removeTrip(driverId, shipmentId);
    }

    // ---- queries ----

    // Public lookup by tracking code: returns only what the live page needs.
    findPublicByTrackingCode(trackingCode: string) {
        return this.trips.findOne({ trackingCode }).select('shipmentId tenantId status driverId destLat destLng').lean<any>();
    }

    // FR-TRK-07
    async replay(tenantId: string, shipmentId: string, limit: number) {
        const trip: any = await this.trips.findOne({ shipmentId, tenantId }).lean();
        if (!trip) throw new NotFoundException('Trip not found');

        const driverId = trip.carrierDriverId ?? trip.driverId;
        if (!trip.pickedUpAt || !driverId) {
            return { shipmentId, status: trip.status, driverId: driverId ?? null, points: [] };
        }

        // Cap at carrierEndedAt if unassigned, otherwise endedAt, otherwise now
        const to = trip.carrierEndedAt ?? trip.endedAt ?? new Date();

        // The trip itself was verified against the caller's tenant above. Breadcrumbs belong to the DRIVER's
        // tenant (not the shipment's), so they're selected by driver and the trip's own pickup-to-end window:
        // the business sees the path of its delivery and nothing outside it.
        const docs: any[] = await this.breadcrumbs
            .find({ driverId, ts: { $gte: trip.pickedUpAt, $lte: to } })
            .sort({ ts: 1 })
            .limit(limit)
            .lean();

        return {
            shipmentId, status: trip.status, driverId, from: trip.pickedUpAt, to,
            points: docs.map((d) => ({ ts: d.ts, lat: d.loc.coordinates[1], lng: d.loc.coordinates[0], speedKmh: d.speedKmh })),
        };
    }
}