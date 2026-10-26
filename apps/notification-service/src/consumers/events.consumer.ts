import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createHash } from 'crypto';
import { createKafkaClient } from '@app/common';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { EVENT_TYPES, KAFKA_TOPICS, KafkaEnvelope, SendNotificationPayload } from '@app/contracts';
import { NotificationsService } from '../notifications/notifications.service';
import { AlertsService } from '../alerts/alerts.service';
import { alertForEvent } from '../alerts/alert-rules';

// shipment.events is deliberately not subscribed: nothing here reacts to it
// yet, and a subscription nobody uses is just load.
const TOPICS = [KAFKA_TOPICS.DISPATCH_EVENTS, KAFKA_TOPICS.DRIVER_EVENTS, KAFKA_TOPICS.NOTIFICATION_REQUESTS];

@Injectable()
export class EventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(EventsConsumer.name);
    private readonly consumer: Consumer;
    private retryTimer?: NodeJS.Timeout;
    private destroyed = false;

    constructor(
        private readonly notifications: NotificationsService,
        private readonly alerts: AlertsService,
    ) {
        const kafka = createKafkaClient('notification-service');
        this.consumer = kafka.consumer({ groupId: 'notification-service' });
    }

    onModuleInit() {
        void this.connectWithRetry(); // not awaited: a Kafka outage must not block the HTTP API from booting
    }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.consumer.connect();
            for (const topic of TOPICS) {
                await this.consumer.subscribe({ topic, fromBeginning: false });
            }
            await this.consumer.run({ eachMessage: (payload) => this.handle(payload) });
            this.logger.log('Kafka consumer running');
        } catch (err) {
            this.logger.warn(`Kafka consumer connect failed, retrying in 5s: ${(err as Error).message}`);
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

        // Bad input is skipped so it can't block the partition...
        let envelope: KafkaEnvelope;
        try {
            envelope = JSON.parse(message.value.toString());
        } catch {
            this.logger.error(`Skipping unparseable message on ${topic}`);
            return;
        }
        if (!envelope?.type || !envelope.tenantId) {
            this.logger.warn(`Skipping message without type/tenantId on ${topic}`);
            return;
        }

        const eventId = envelope.eventId ?? this.fallbackEventId(topic, envelope);

        // ...but a real infrastructure error (Redis or Postgres down) is allowed to
        // throw, so kafkajs redelivers the message instead of silently losing an OTP email.
        if (topic === KAFKA_TOPICS.NOTIFICATION_REQUESTS) {
            await this.handleRequest(eventId, envelope);
        } else {
            await this.handleDomainEvent(eventId, envelope);
        }
    }

    private async handleRequest(eventId: string, envelope: KafkaEnvelope) {
        if (envelope.type !== EVENT_TYPES.SEND_NOTIFICATION) return;
        const p = envelope.payload as Partial<SendNotificationPayload>;
        if (p?.channel !== 'EMAIL' || typeof p.template !== 'string' || typeof p.to?.email !== 'string') {
            this.logger.error(`Malformed notification request ${eventId}, skipping`);
            return;
        }

        const secrets = p.secrets && typeof p.secrets === 'object'
            ? Object.fromEntries(Object.entries(p.secrets).filter(([, v]) => typeof v === 'string'))
            : undefined;

        await this.notifications.enqueueEmail({
            dedupeKey: eventId,
            tenantId: envelope.tenantId,
            template: p.template,
            to: p.to,
            data: p.data ?? {},
            secrets,
        });
    }

    private async handleDomainEvent(eventId: string, envelope: KafkaEnvelope) {
        const draft = alertForEvent(envelope.type, envelope.payload);
        if (!draft) return;
        await this.alerts.create({ dedupeKey: eventId, tenantId: envelope.tenantId, ...draft });
    }

    // Only for messages published before eventId existed.
    private fallbackEventId(topic: string, envelope: KafkaEnvelope) {
        return createHash('sha1')
            .update(`${topic}|${envelope.type}|${envelope.tenantId}|${envelope.occurredAt}|${JSON.stringify(envelope.payload)}`)
            .digest('hex');
    }
}