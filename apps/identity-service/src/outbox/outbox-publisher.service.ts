import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Partitioners, Producer } from 'kafkajs';
import { PrismaService } from '../../prisma/prisma.service';

const POLL_MS = 2000;
const BATCH = 25;
const RETENTION_DAYS = 7;

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(OutboxPublisherService.name);
    private readonly producer: Producer;
    private connected = false;
    private destroyed = false;
    private polling = false;
    private retryTimer?: NodeJS.Timeout;
    private pollTimer?: NodeJS.Timeout;
    private cleanupTimer?: NodeJS.Timeout;

    constructor(private readonly prisma: PrismaService) {
        const kafka = new Kafka({ clientId: 'identity-service-outbox', brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(',') });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    onModuleInit() {
        void this.connectWithRetry(); // not awaited: a Kafka outage must not stop the API from booting
        this.pollTimer = setInterval(
            () =>
                this.publishPending().catch((err) =>
                    this.logger.error(`Outbox poll failed: ${(err as Error).message}`),
                ),
            POLL_MS,
        );
        this.cleanupTimer = setInterval(() => void this.cleanup(), 60 * 60 * 1000);
    }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.producer.connect();
            this.connected = true;
            this.logger.log('Kafka producer connected');
        } catch {
            this.retryTimer = setTimeout(() => void this.connectWithRetry(), 5000);
        }
    }

    async onModuleDestroy() {
        this.destroyed = true;
        for (const t of [this.retryTimer, this.pollTimer, this.cleanupTimer]) if (t) clearTimeout(t);
        if (this.connected) await this.producer.disconnect().catch(() => undefined);
    }

    async publishPending() {
        if (!this.connected || this.polling) return;
        this.polling = true;
        try {
            // Phase 1: claim in ONE statement (no interactive transaction, so no 5s Prisma limit).
            // Rows claimed by a crashed attempt become claimable again after the 120s lease.
            const claimed = await this.prisma.$queryRaw<any[]>`
        UPDATE "OutboxEvent" SET "claimedAt" = NOW()
        WHERE id IN (
          SELECT id FROM "OutboxEvent"
          WHERE "publishedAt" IS NULL
            AND ("claimedAt" IS NULL OR "claimedAt" < NOW() - INTERVAL '120 seconds')
          ORDER BY "createdAt" ASC
          LIMIT ${BATCH}
          FOR UPDATE SKIP LOCKED
        )
        RETURNING *`;
            // RETURNING does not guarantee order
            claimed.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() || a.id.localeCompare(b.id));

            // Phase 2: publish and mark each row, outside any transaction.
            for (const event of claimed) {
                try {
                    await this.producer.send({
                        topic: event.topic,
                        messages: [{
                            key: event.tenantId,
                            value: JSON.stringify({
                                eventId: event.id, type: event.eventType, tenantId: event.tenantId,
                                occurredAt: event.createdAt, payload: event.payload,
                            }),
                        }],
                    });
                    await this.prisma.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date() } });
                } catch (err) {
                    this.logger.error(`Failed to publish outbox event ${event.id}, will retry: ${(err as Error).message}`);
                }
            }
        } finally {
            this.polling = false;
        }
    }

    // Published rows (and the ciphertext in them) don't need to live forever.
    async cleanup() {
        const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
        try {
            await this.prisma.outboxEvent.deleteMany({ where: { publishedAt: { lt: cutoff } } });
        } catch (err) {
            this.logger.error(`Failed to clean up published outbox events: ${(err as Error).message}`);
        }
    }
}