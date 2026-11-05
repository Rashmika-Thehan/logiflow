import { Injectable, NotFoundException, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BREADCRUMB, TRIP } from '../schemas';
import { PositionStore } from '../ingest/position-store';
import { LiveFeed } from '../live/live-feed';

const TERMINAL = ['DELIVERED', 'FAILED', 'CANCELLED'];
const ORDER = ['PENDING', 'DISPATCHING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
const below = (status: string) => ORDER.slice(0, Math.max(ORDER.indexOf(status), 0));

@Injectable()
export class TripsService implements OnApplicationBootstrap {
    private readonly logger = new Logger(TripsService.name);

    constructor(
        @InjectModel(TRIP) private readonly trips: Model<any>,
        @InjectModel(BREADCRUMB) private readonly breadcrumbs: Model<any>,
        private readonly positions: PositionStore,
        private readonly feed: LiveFeed,
    ) { }

    // Violation 1 Fix: Robust startup backfill with retries and fail-fast bootstrap
    async onApplicationBootstrap() {
        this.logger.log('Starting active trips Redis backfill...');
        try {
            const activeTrips = await this.trips.find({
                status: 'IN_TRANSIT',
                driverId: { $exists: true }
            }).lean();

            for (const trip of activeTrips) {
                if (trip.driverId) {
                    await this.backfillTripWithRetry(trip);
                }
            }
            this.logger.log(`Successfully backfilled ${activeTrips.length} active trips into Redis.`);
        } catch (err) {
            this.logger.error('Fatal error during active trips Redis backfill bootstrap:', err);
            throw err; // Fail startup so active hashes are not silently left in legacy format
        }
    }

    private async backfillTripWithRetry(trip: any, retries = 3, delayMs = 1000): Promise<void> {
        let attempt = 0;
        while (attempt < retries) {
            try {
                await this.positions.addTrip(
                    trip.driverId,
                    trip.shipmentId,
                    trip.tenantId,
                    trip.destLat,
                    trip.destLng,
                );
                return;
            } catch (err) {
                attempt++;
                this.logger.warn(`Failed to backfill trip ${trip.shipmentId} (attempt ${attempt}/${retries}): ${err.message}`);
                if (attempt >= retries) {
                    throw new Error(`Failed to backfill trip ${trip.shipmentId} after ${retries} attempts: ${err.message}`);
                }
                await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
            }
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

        const filter: any = { shipmentId, status: { $nin: TERMINAL } };
        if (!TERMINAL.includes(to)) filter.$or = [{ status: from }, { status: { $in: below(to) } }];

        const set: any = { status: to };
        if (to === 'PICKED_UP') set.pickedUpAt = new Date();
        if (TERMINAL.includes(to)) {
            set.endedAt = new Date();
            set.carrierEndedAt = new Date(); // 👈 Cap carrier journey on normal completion
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

    findPublicByTrackingCode(trackingCode: string) {
        return this.trips.findOne({ trackingCode }).select('shipmentId tenantId status driverId destLat destLng').lean<any>();
    }

    async replay(tenantId: string, shipmentId: string, limit: number) {
        const trip: any = await this.trips.findOne({ shipmentId, tenantId }).lean();
        if (!trip) throw new NotFoundException('Trip not found');

        const driverId = trip.carrierDriverId ?? trip.driverId;
        if (!trip.pickedUpAt || !driverId) {
            return { shipmentId, status: trip.status, driverId: driverId ?? null, points: [] };
        }

        // Cap at carrierEndedAt if unassigned, otherwise endedAt, otherwise now
        const to = trip.carrierEndedAt ?? trip.endedAt ?? new Date();

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