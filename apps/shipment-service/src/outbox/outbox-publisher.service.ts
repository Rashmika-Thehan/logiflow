import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Kafka, Producer, Partitioners } from 'kafkajs';
import { PrismaService } from '../prisma/prisma.service';

const POLL_BATCH_SIZE = 50;

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(OutboxPublisherService.name);
    private producer: Producer;

    constructor(private readonly prisma: PrismaService) {
        const kafka = new Kafka({
            clientId: 'shipment-service-outbox',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    async onModuleInit() {
        await this.producer.connect();
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
    }

    @Interval(2000)
    async publishPending() {
        // FOR UPDATE SKIP LOCKED + the whole claim-and-publish cycle inside one
        // transaction: if the Kafka send throws, the transaction rolls back and
        // publishedAt is never set, so the next poll retries — at-least-once,
        // never zero-times. A duplicate publish is possible (the transaction
        // could roll back *after* Kafka already has the message); consumers
        // need to be idempotent, which is a dispatch-service concern, not this
        // one's.
        await this.prisma.$transaction(async (tx) => {
            const events = await tx.$queryRaw<any[]>`
        SELECT * FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL
        ORDER BY "createdAt" ASC
        LIMIT ${POLL_BATCH_SIZE}
        FOR UPDATE SKIP LOCKED
      `;

            for (const event of events) {
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
                await tx.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date() } });
            }
        });
    }
}