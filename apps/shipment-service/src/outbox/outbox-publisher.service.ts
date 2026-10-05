import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Kafka, Producer, Partitioners } from 'kafkajs';
import { PrismaService } from '../prisma/prisma.service';

const POLL_BATCH_SIZE = 50;

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(OutboxPublisherService.name);
    private producer: Producer;
    private connected = false;

    constructor(private readonly prisma: PrismaService) {
        const kafka = new Kafka({
            clientId: 'shipment-service-outbox',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    onModuleInit() {
        // Not awaited — a Kafka outage must never block this service's HTTP API
        // from starting. publishPending() below just no-ops until connected.
        this.connectWithRetry();
    }

    private async connectWithRetry() {
        try {
            await this.producer.connect();
            this.connected = true;
            this.logger.log('Kafka producer connected');
        } catch {
            this.logger.warn('Kafka producer connect failed, retrying in 5s');
            setTimeout(() => this.connectWithRetry(), 5000);
        }
    }

    async onModuleDestroy() {
        if (this.connected) await this.producer.disconnect();
    }

    @Interval(2000)
    async publishPending() {
        if (!this.connected) return;

        // Phase 1: claim a batch. ONE statement — not an interactive
        // transaction — so there's no 5-second Prisma timeout to worry about.
        // Also reclaims rows abandoned by a crashed previous attempt (claimed
        // but never published, more than 30s ago).
        const claimed = await this.prisma.$queryRaw<any[]>`
      UPDATE "OutboxEvent" SET "claimedAt" = NOW()
      WHERE id IN (
        SELECT id FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL
          AND ("claimedAt" IS NULL OR "claimedAt" < NOW() - INTERVAL '30 seconds')
        ORDER BY "createdAt" ASC
        LIMIT ${POLL_BATCH_SIZE}
        FOR UPDATE SKIP LOCKED
      )
      RETURNING *
    `;

        // Phase 2: publish + mark each one individually, OUTSIDE any
        // transaction. A slow or failing Kafka send can take as long as it
        // needs without risking a transaction rollback undoing publishedAt
        // for sends that already succeeded.
        for (const event of claimed) {
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
                await this.prisma.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date() } });
            } catch (err) {
                this.logger.error(`Failed to publish outbox event ${event.id}, will retry`, err as Error);
                // Left claimed with publishedAt still null — reclaimed automatically
                // once claimedAt goes stale past 30s, by this instance or another.
            }
        }
    }
}