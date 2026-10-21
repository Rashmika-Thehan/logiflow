import { Inject, Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { ClsService, createKafkaClient } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES, KafkaEnvelope } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { MatchingService } from '../matching/matching.service';

@Injectable()
export class DriverEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DriverEventsConsumer.name);
    private consumer: Consumer;
    private connected = false;
    private isDestroyed = false;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly cls: ClsService,
        private readonly matching: MatchingService,
        @Inject(TENANT_PRISMA) private readonly db: any,
    ) {
        const kafka = createKafkaClient('dispatch-service-driver-consumer');
        this.consumer = kafka.consumer({ groupId: 'dispatch-service-driver-consumer' });
    }

    onModuleInit() {
        this.startConsumerWithRetry();
    }

    private async startConsumerWithRetry() {
        if (this.isDestroyed) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.DRIVER_EVENTS, fromBeginning: false });

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    if (!message.value) return;
                    try {
                        const envelope: KafkaEnvelope = JSON.parse(message.value.toString());
                        if (!envelope.payload) return;

                        await this.cls.run(async () => {
                            this.cls.set('tenantId', envelope.tenantId);

                            if (envelope.type === EVENT_TYPES.ASSIGNMENT_ACCEPTED) {
                                const { assignmentId, shipmentId, driverId } = envelope.payload as any;
                                if (!assignmentId) return;

                                const accepted = await this.db.$transaction(async (tx: any) => {
                                    const result = await tx.assignment.updateMany({
                                        where: { id: assignmentId, driverId, status: 'PENDING_ACCEPTANCE' },
                                        data: { status: 'ACCEPTED', respondedAt: new Date() },
                                    });
                                    if (result.count === 0) return false;

                                    await tx.outboxEvent.create({
                                        data: {
                                            topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                                            eventType: EVENT_TYPES.ASSIGNMENT_ACCEPTED,
                                            payload: { shipmentId, driverId, assignmentId },
                                        },
                                    });
                                    return true;
                                });

                                if (accepted) {
                                    this.logger.log(`Assignment ${assignmentId} accepted by driver ${driverId}`);
                                }
                            }
                        });
                    } catch (err) {
                        this.logger.error('Failed to process driver event in dispatch-service', err as Error);
                    }
                },
            });

            this.connected = true;
            this.logger.log('Kafka driver events consumer started in dispatch-service');
        } catch (err) {
            this.logger.warn('Kafka consumer failed to connect/subscribe in dispatch-service, retrying in 5s', err as Error);
            if (!this.isDestroyed) {
                this.retryTimeout = setTimeout(() => this.startConsumerWithRetry(), 5000);
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
            await this.consumer.disconnect();
        }
    }
}
