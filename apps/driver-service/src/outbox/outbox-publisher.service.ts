import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Kafka, Producer, Partitioners } from 'kafkajs';
import { PrismaService } from '../prisma/prisma.service';

const POLL_BATCH_SIZE = 25;

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(OutboxPublisherService.name);
    private producer: Producer;
    private connected = false;
    private isDestroyed = false;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(private readonly prisma: PrismaService) {
        const kafka = new Kafka({
            clientId: 'driver-service-outbox',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    onModuleInit() {
        this.connectWithRetry();
    }

    private async connectWithRetry() {
        if (this.isDestroyed) return;
        try {
            await this.producer.connect();
            this.connected = true;
            this.logger.log('Kafka producer connected');
        } catch (err) {
            this.logger.warn('Kafka producer connect failed, retrying in 5s', err as Error);
            if (!this.isDestroyed) {
                this.retryTimeout = setTimeout(() => this.connectWithRetry(), 5000);
            }
        }
    }

    async onModuleDestroy() {
        this.isDestroyed = true;
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }
        if (this.connected) {
            await this.producer.disconnect();
        }
    }

    @Interval(2000)
    async publishPending() {
        if (!this.connected || this.isDestroyed) return;

        // Phase 1: Claim a batch atomically in one statement
        const claimed = await this.prisma.$queryRaw<any[]>`
      UPDATE "OutboxEvent" SET "claimedAt" = NOW()
      WHERE id IN (
        SELECT id FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL
          AND ("claimedAt" IS NULL OR "claimedAt" < NOW() - INTERVAL '120 seconds')
        ORDER BY "createdAt" ASC
        LIMIT ${POLL_BATCH_SIZE}
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *
    `;

        if (!claimed || claimed.length === 0) return;

        // Restore publication order: Postgres UPDATE ... RETURNING * does NOT
        // guarantee preserving the subquery's ORDER BY clause.
        claimed.sort((a, b) => {
            const timeDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return timeDiff !== 0 ? timeDiff : String(a.id).localeCompare(String(b.id));
        });

        // Phase 2: Publish and update each event individually outside of any transaction
        const failedTenantIds = new Set<string>();

        for (const event of claimed) {
            if (this.isDestroyed) break;

            if (failedTenantIds.has(event.tenantId)) {
                // Defer subsequent events for the same tenant to preserve causal ordering
                await this.prisma.outboxEvent.update({ where: { id: event.id }, data: { claimedAt: null } }).catch(() => {});
                continue;
            }

            let sendSucceeded = false;
            try {
                await this.producer.send({
                    topic: event.topic,
                    messages: [{
                        key: event.tenantId,
                        value: JSON.stringify({
                            type: event.eventType,
                            tenantId: event.tenantId,
                            occurredAt: event.createdAt,
                            payload: event.payload,
                        }),
                    }],
                });
                sendSucceeded = true;
            } catch (err) {
                failedTenantIds.add(event.tenantId);
                this.logger.error(`Failed to send outbox event ${event.id} to Kafka, releasing claim`, err as Error);
                await this.prisma.outboxEvent.update({ where: { id: event.id }, data: { claimedAt: null } }).catch(() => {});
                continue;
            }

            if (sendSucceeded) {
                try {
                    await this.prisma.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date() } });
                } catch (dbErr) {
                    this.logger.warn(`Event ${event.id} sent to Kafka but failed to mark publishedAt in DB (at-least-once delivery)`, dbErr as Error);
                }
            }
        }
    }
}