import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Kafka, Producer, Partitioners } from 'kafkajs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(OutboxPublisherService.name);
    private producer: Producer;

    constructor(private readonly prisma: PrismaService) {
        const kafka = new Kafka({
            clientId: 'dispatch-service-outbox',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    }

    async onModuleInit() { await this.producer.connect(); }
    async onModuleDestroy() { await this.producer.disconnect(); }

    @Interval(2000)
    async publishPending() {
        await this.prisma.$transaction(async (tx) => {
            const events = await tx.$queryRaw<any[]>`
        SELECT * FROM "OutboxEvent"
        WHERE "publishedAt" IS NULL
        ORDER BY "createdAt" ASC
        LIMIT 50
        FOR UPDATE SKIP LOCKED
      `;
            for (const event of events) {
                await this.producer.send({
                    topic: event.topic,
                    messages: [{
                        key: event.tenantId,
                        value: JSON.stringify({ type: event.eventType, tenantId: event.tenantId, occurredAt: event.createdAt, payload: event.payload }),
                    }],
                });
                await tx.outboxEvent.update({ where: { id: event.id }, data: { publishedAt: new Date() } });
            }
        });
    }
}