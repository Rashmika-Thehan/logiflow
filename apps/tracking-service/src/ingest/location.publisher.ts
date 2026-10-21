import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Kafka, Partitioners, Producer } from 'kafkajs';
import { EVENT_TYPES, KAFKA_TOPICS } from '@app/contracts';
import { haversineKm } from './eta';
import { Ping } from './ping';

const MIN_GAP_MS = 2_000;       // never more often than this
const MAX_SILENCE_MS = 10_000;  // otherwise at least this often
const MOVE_THRESHOLD_KM = 0.2;  // or as soon as the driver has moved this far

// Fire-and-forget, no outbox: a location update is superseded by the next one,
// so losing one is harmless (unlike shipment state changes, which need the outbox).
@Injectable()
export class LocationPublisher implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(LocationPublisher.name);
    private readonly producer: Producer;
    private connected = false;
    private destroyed = false;
    private retryTimer?: NodeJS.Timeout;
    private readonly last = new Map<string, { at: number; lat: number; lng: number }>();

    constructor() {
        const kafka = new Kafka({ clientId: 'tracking-service-producer', brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(',') });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    onModuleInit() { void this.connectWithRetry(); }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.producer.connect();
            this.connected = true;
        } catch {
            this.retryTimer = setTimeout(() => void this.connectWithRetry(), 5000);
        }
    }

    async onModuleDestroy() {
        this.destroyed = true;
        if (this.retryTimer) clearTimeout(this.retryTimer);
        if (this.connected) await this.producer.disconnect().catch(() => undefined);
    }

    maybePublish(driver: { driverId: string; tenantId: string }, p: Ping) {
        if (!this.connected) return;
        const now = Date.now();
        const prev = this.last.get(driver.driverId);
        if (prev) {
            const elapsed = now - prev.at;
            const moved = haversineKm(prev.lat, prev.lng, p.lat, p.lng);
            if (elapsed < MIN_GAP_MS || (elapsed < MAX_SILENCE_MS && moved < MOVE_THRESHOLD_KM)) return;
        }
        this.last.set(driver.driverId, { at: now, lat: p.lat, lng: p.lng });

        this.producer
            .send({
                topic: KAFKA_TOPICS.TRACKING_EVENTS,
                messages: [{
                    key: driver.tenantId,
                    value: JSON.stringify({
                        eventId: randomUUID(),
                        type: EVENT_TYPES.DRIVER_LOCATION_UPDATED,
                        tenantId: driver.tenantId,
                        occurredAt: new Date().toISOString(),
                        payload: { driverId: driver.driverId, lat: p.lat, lng: p.lng, ts: p.ts },
                    }),
                }],
            })
            .catch((err) => this.logger.warn(`Location publish failed: ${err.message}`));
    }
}