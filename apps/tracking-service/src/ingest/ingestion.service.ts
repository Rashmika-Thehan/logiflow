import { Injectable } from '@nestjs/common';
import { estimateEta } from './eta';
import { parsePing, Ping } from './ping';
import { PositionStore } from './position-store';
import { BreadcrumbWriter } from './breadcrumb.writer';
import { LocationPublisher } from './location.publisher';
import { LiveFeed } from '../live/live-feed';

export interface IngestResult { stored: number; live: boolean; invalid: number }

@Injectable()
export class IngestionService {
    constructor(
        private readonly positions: PositionStore,
        private readonly breadcrumbs: BreadcrumbWriter,
        private readonly feed: LiveFeed,
        private readonly publisher: LocationPublisher,
    ) { }

    async ingest(driver: { driverId: string; tenantId: string }, raw: unknown[]): Promise<IngestResult> {
        const now = Date.now();
        const valid: Ping[] = [];
        for (const item of raw) {
            const ping = parsePing(item, now);
            if (ping) valid.push(ping);
        }
        const invalid = raw.length - valid.length;
        if (valid.length === 0) return { stored: 0, live: false, invalid };

        valid.sort((a, b) => a.ts - b.ts); // an offline queue can arrive in any order

        // History keeps every valid point, late ones included (FR-TRK-06)...
        this.breadcrumbs.enqueue(
            valid.map((p) => ({
                driverId: driver.driverId, tenantId: driver.tenantId, ts: new Date(p.ts),
                loc: { type: 'Point', coordinates: [p.lng, p.lat] },
                speedKmh: p.speedKmh, heading: p.heading, accuracyM: p.accuracyM,
            })),
        );

        // ...but only the newest point can move the live position (FR-TRK-02). Older
        // points in the batch would be overwritten immediately, so one Redis call covers the batch.
        const latest = valid[valid.length - 1];
        const result = await this.positions.update(driver.driverId, driver.tenantId, latest);

        if (result.accepted) {
            this.feed.positions$.next({
                tenantId: driver.tenantId, driverId: driver.driverId,
                lat: latest.lat, lng: latest.lng, ts: latest.ts, speedKmh: latest.speedKmh, heading: latest.heading,
                trips: result.trips.map((t) => ({
                    shipmentId: t.shipmentId,
                    eta: t.destLat != null && t.destLng != null
                        ? estimateEta(latest.lat, latest.lng, t.destLat, t.destLng, result.avgSpeedKmh)
                        : undefined,
                })),
            });
            this.publisher.maybePublish(driver, latest);
        }
        return { stored: valid.length, live: result.accepted, invalid };
    }
}