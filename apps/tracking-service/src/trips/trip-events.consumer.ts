import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { EVENT_TYPES, KAFKA_TOPICS, KafkaEnvelope } from '@app/contracts';
import { TripsService } from './trips.service';
import { PositionStore } from '../ingest/position-store';

const TOPICS = [KAFKA_TOPICS.SHIPMENT_EVENTS, KAFKA_TOPICS.DISPATCH_EVENTS, KAFKA_TOPICS.DRIVER_EVENTS];

@Injectable()
export class TripEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(TripEventsConsumer.name);
    private readonly consumer: Consumer;
    private retryTimer?: NodeJS.Timeout;
    private destroyed = false;

    constructor(private readonly trips: TripsService, private readonly positions: PositionStore) {
        const kafka = new Kafka({ clientId: 'tracking-service', brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(',') });
        this.consumer = kafka.consumer({ groupId: 'tracking-service-trips' });
    }

    onModuleInit() { void this.connectWithRetry(); }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.consumer.connect();
            // fromBeginning: a brand-new group rebuilds the read model from history. Every handler is replay-safe.
            for (const topic of TOPICS) await this.consumer.subscribe({ topic, fromBeginning: true });
            await this.consumer.run({ eachMessage: (payload) => this.handle(payload) });
        } catch (err) {
            this.logger.warn(`Kafka connect failed, retrying in 5s: ${(err as Error).message}`);
            await this.consumer.disconnect().catch(() => undefined);
            this.retryTimer = setTimeout(() => void this.connectWithRetry(), 5000);
        }
    }

    async onModuleDestroy() {
        this.destroyed = true;
        if (this.retryTimer) clearTimeout(this.retryTimer);
        await this.consumer.disconnect().catch(() => undefined);
    }

    private async handle({ topic, message }: EachMessagePayload) {
        if (!message.value) return;
        let env: KafkaEnvelope;
        try { env = JSON.parse(message.value.toString()); } catch { return; }
        if (!env?.type || !env.tenantId) return;
        const p: any = env.payload ?? {};

        // Best-effort read model: log and move on. Forward-only updates mean the next
        // event repairs a missed one; only a lost ShipmentCreated can't be recovered.
        try {
            if (topic === KAFKA_TOPICS.SHIPMENT_EVENTS) {
                if (env.type === EVENT_TYPES.SHIPMENT_CREATED) await this.trips.onShipmentCreated(env.tenantId, p);
                else if (env.type === EVENT_TYPES.SHIPMENT_STATUS_CHANGED) await this.trips.onStatusChanged(p);
            } else if (topic === KAFKA_TOPICS.DISPATCH_EVENTS) {
                if (env.type === EVENT_TYPES.ASSIGNMENT_ACCEPTED) await this.trips.onAssigned(p.shipmentId, p.driverId);
                else if (env.type === EVENT_TYPES.DRIVER_UNASSIGNED) await this.trips.onUnassigned(p.shipmentId, p.driverId);
            } else if (topic === KAFKA_TOPICS.DRIVER_EVENTS && env.type === EVENT_TYPES.DRIVER_STATUS_CHANGED) {
                if (p.driverId && p.status) await this.positions.setStatus(p.driverId, p.status);
            }
        } catch (err) {
            this.logger.error(`Failed to project ${env.type} from ${topic}: ${(err as Error).message}`);
        }
    }
}