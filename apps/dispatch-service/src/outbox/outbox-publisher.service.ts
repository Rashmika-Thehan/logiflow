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
            clientId: 'dispatch-service-outbox',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    onModuleInit() {
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

        // Phase 1: Claim a batch atomically in one statement
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

        // Phase 2: Publish and update each event individually outside of any transaction
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
            }
        }
    }
}