import { Inject, Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ClsService } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES, KafkaEnvelope } from '@app/contracts';
import { ShipmentsService } from '../shipments/shipments.service';

@Injectable()
export class DriverEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DriverEventsConsumer.name);
    private consumer: Consumer;
    private connected = false;
    private isDestroyed = false;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly cls: ClsService,
        private readonly shipmentsService: ShipmentsService,
    ) {
        const kafka = new Kafka({
            clientId: 'shipment-service-driver-consumer',
            brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(','),
        });
        this.consumer = kafka.consumer({ groupId: 'shipment-service-driver-consumer' });
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
                        const shipmentId = (envelope.payload as any).shipmentId;
                        if (!shipmentId) return;

                        await this.cls.run(async () => {
                            this.cls.set('tenantId', envelope.tenantId);

                            switch (envelope.type) {
                                case EVENT_TYPES.PACKAGE_COLLECTED:
                                    await this.shipmentsService.advanceForward(shipmentId, 'PICKED_UP');
                                    break;
                                case EVENT_TYPES.DELIVERY_STARTED:
                                    await this.shipmentsService.advanceForward(shipmentId, 'IN_TRANSIT');
                                    break;
                                case EVENT_TYPES.DELIVERY_FAILED:
                                    await this.shipmentsService.markFailed(shipmentId, (envelope.payload as any).reasonCode ?? 'DELIVERY_FAILED', ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT']);
                                    break;
                            }
                        });
                    } catch (err) {
                        this.logger.error('Failed to process driver event message', err as Error);
                    }
                },
            });

            this.connected = true;
            this.logger.log('Kafka driver events consumer started');
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
}