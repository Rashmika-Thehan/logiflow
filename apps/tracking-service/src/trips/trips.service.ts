import { Injectable, NotFoundException } from '@nestjs/common';
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
export class TripsService {
    constructor(
        @InjectModel(TRIP) private readonly trips: Model<any>,
        @InjectModel(BREADCRUMB) private readonly breadcrumbs: Model<any>,
        private readonly positions: PositionStore,
        private readonly feed: LiveFeed,
    ) { }

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
        if (TERMINAL.includes(to)) set.endedAt = new Date();

        const trip: any = await this.trips.findOneAndUpdate(filter, { $set: set }, { new: true }).lean();
        if (!trip) return;

        if (to === 'PICKED_UP' && trip.driverId) {
            await this.trips.updateOne({ shipmentId }, { $set: { carrierDriverId: trip.driverId } });
        }
        if (to === 'IN_TRANSIT' && trip.driverId) {
            await this.positions.addTrip(trip.driverId, shipmentId, trip.destLat, trip.destLng);
        }
        if (TERMINAL.includes(to)) {
            if (trip.driverId) await this.positions.removeTrip(trip.driverId, shipmentId);
            this.feed.tripEnded$.next({ shipmentId, status: to });
        }
    }

    async onAssigned(shipmentId?: string, driverId?: string) {
        if (!shipmentId || !driverId) return;
        const trip: any = await this.trips
            .findOneAndUpdate({ shipmentId, status: { $nin: TERMINAL } }, { $set: { driverId } }, { new: true })
            .lean();
        // Events from different topics can interleave on a replay: if the shipment is already in transit, go live now.
        if (trip?.status === 'IN_TRANSIT') await this.positions.addTrip(driverId, shipmentId, trip.destLat, trip.destLng);
    }

    async onUnassigned(shipmentId?: string, driverId?: string) {
        if (!shipmentId || !driverId) return;
        await this.trips.updateOne({ shipmentId, driverId }, { $unset: { driverId: '' } });
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
        const to = trip.endedAt ?? new Date();
        const docs: any[] = await this.breadcrumbs
            .find({ driverId, tenantId, ts: { $gte: trip.pickedUpAt, $lte: to } })
            .sort({ ts: 1 })
            .limit(limit)
            .lean();

        return {
            shipmentId, status: trip.status, driverId, from: trip.pickedUpAt, to,
            points: docs.map((d) => ({ ts: d.ts, lat: d.loc.coordinates[1], lng: d.loc.coordinates[0], speedKmh: d.speedKmh })),
        };
    }
}