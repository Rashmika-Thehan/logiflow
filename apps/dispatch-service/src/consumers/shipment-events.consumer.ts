import { Injectable, Logger, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ClsService } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES, KafkaEnvelope } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { MatchingService } from '../matching/matching.service';

@Injectable()
export class ShipmentEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(ShipmentEventsConsumer.name);
    private consumer: Consumer;
    private connected = false;
    private isDestroyed = false;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly cls: ClsService,
        private readonly matching: MatchingService,
        @Inject(TENANT_PRISMA) private readonly tenantPrisma: any,
    ) {
        const kafka = new Kafka({
            clientId: 'dispatch-service-consumer',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.consumer = kafka.consumer({ groupId: 'dispatch-service-consumer' });
    }

    onModuleInit() {
        this.startConsumerWithRetry();
    }

    private async startConsumerWithRetry() {
        if (this.isDestroyed) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.SHIPMENT_EVENTS, fromBeginning: false });

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    if (!message.value) return;
                    try {
                        const envelope: KafkaEnvelope = JSON.parse(message.value.toString());
                        if (envelope.type !== EVENT_TYPES.SHIPMENT_CREATED) return;
                        if (!envelope.payload || !(envelope.payload as any).shipmentId) return;

                        await this.cls.run(async () => {
                            this.cls.set('tenantId', envelope.tenantId);
                            await this.handleShipmentCreated(envelope);
                        });
                    } catch (err) {
                        this.logger.error('Failed to process shipment event message', err as Error);
                    }
                },
            });

            this.connected = true;
            this.logger.log('Kafka shipment events consumer started');
        } catch (err) {
            this.logger.warn('Kafka consumer failed to connect/subscribe, retrying in 5s', err as Error);
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

    private async handleShipmentCreated(envelope: KafkaEnvelope) {
        const { shipmentId } = envelope.payload as any;

        // Idempotency: at-least-once delivery means this handler WILL see
        // duplicates eventually. Any prior assignment (PENDING_ACCEPTANCE, ACCEPTED, or NO_CANDIDATES)
        // means this creation event has already been dispatched.
        const existing = await this.tenantPrisma.assignment.findFirst({
            where: { shipmentId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED', 'NO_CANDIDATES'] } },
        });
        if (existing) {
            this.logger.debug(`Duplicate ShipmentCreated for ${shipmentId}, skipping`);
            return;
        }

        const shipment = {
            weightKg: (envelope.payload as any).weightKg,
            recipientLat: (envelope.payload as any).recipientLat ?? null,
            recipientLng: (envelope.payload as any).recipientLng ?? null,
        };

        await this.matching.assign(envelope.tenantId, shipmentId, shipment);
    }
}