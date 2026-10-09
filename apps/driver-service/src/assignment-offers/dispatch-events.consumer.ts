import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ClsService } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES, KafkaEnvelope } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';

@Injectable()
export class DispatchEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DispatchEventsConsumer.name);
    private consumer: Consumer;

    constructor(
        private readonly cls: ClsService,
        private readonly tenantPrisma: any, // TENANT_PRISMA, injected via module factory below
    ) {
        const kafka = new Kafka({
            clientId: 'driver-service-dispatch-consumer',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.consumer = kafka.consumer({ groupId: 'driver-service-dispatch-consumer' });
    }

    async onModuleInit() {
        this.connectWithRetry(); // not awaited — matches the Kafka-outage fix applied elsewhere
    }
    private async connectWithRetry() {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.DISPATCH_EVENTS, fromBeginning: false });
            await this.consumer.run({ eachMessage: (p) => this.handle(p) });
        } catch {
            setTimeout(() => this.connectWithRetry(), 5000);
        }
    }
    async onModuleDestroy() { await this.consumer.disconnect(); }

    private async handle({ message }: any) {
        try {
            if (!message.value) return;
            const envelope: KafkaEnvelope = JSON.parse(message.value.toString());
            if (!envelope.tenantId) {
                this.logger.warn(`Received message without tenantId on topic ${KAFKA_TOPICS.DISPATCH_EVENTS}, ignoring`);
                return;
            }

            const { shipmentId, driverId, assignmentId } = envelope.payload as any;
            if (!driverId) return; // DispatchFailed etc. carry no driverId — not this consumer's concern

            await this.cls.run(async () => {
                this.cls.set('tenantId', envelope.tenantId);

                if (envelope.type === EVENT_TYPES.DRIVER_ASSIGNED) {
                    await this.tenantPrisma.assignmentOffer.upsert({
                        where: { id: assignmentId },
                        create: { id: assignmentId, driverId, shipmentId, status: 'PENDING_ACCEPTANCE' },
                        update: {}, // replay of the same event or late arrival after unassignment — no-op, preserves EXPIRED tombstone
                    });
                }
                if (envelope.type === EVENT_TYPES.DRIVER_UNASSIGNED) {
                    if (assignmentId) {
                        await this.tenantPrisma.assignmentOffer.upsert({
                            where: { id: assignmentId },
                            create: { id: assignmentId, driverId, shipmentId, status: 'EXPIRED' },
                            update: { status: 'EXPIRED' },
                        });
                    } else {
                        await this.tenantPrisma.assignmentOffer.updateMany({
                            where: { driverId, shipmentId, status: 'PENDING_ACCEPTANCE' },
                            data: { status: 'EXPIRED' },
                        });
                    }
                }
            });
        } catch (err) {
            // Poison-pill protection, same as the other consumers — log and move on.
            this.logger.error('Failed to process dispatch.events message', err as Error);
        }
    }
}