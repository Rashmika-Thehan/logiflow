import { Inject, Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'kafkajs';
import { ClsService, createKafkaClient } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES, KafkaEnvelope } from '@app/contracts';
import { ShipmentsService } from '../shipments/shipments.service';

@Injectable()
export class DispatchEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DispatchEventsConsumer.name);
    private consumer: Consumer;
    private connected = false;
    private isDestroyed = false;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(
        private readonly cls: ClsService,
        private readonly shipmentsService: ShipmentsService,
    ) {
        const kafka = createKafkaClient('shipment-service-dispatch-consumer');
        this.consumer = kafka.consumer({ groupId: 'shipment-service-dispatch-consumer' });
    }

    onModuleInit() {
        this.startConsumerWithRetry();
    }

    private async startConsumerWithRetry() {
        if (this.isDestroyed) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.DISPATCH_EVENTS, fromBeginning: false });

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
                                case EVENT_TYPES.DRIVER_ASSIGNED:
                                    await this.shipmentsService.advanceForward(shipmentId, 'DISPATCHING');
                                    break;
                                case EVENT_TYPES.ASSIGNMENT_ACCEPTED:
                                    await this.shipmentsService.advanceForward(shipmentId, 'ASSIGNED');
                                    break;
                                case EVENT_TYPES.ASSIGNMENT_REJECTED:
                                case EVENT_TYPES.DRIVER_UNASSIGNED:
                                    await this.shipmentsService.regressToDispatching(shipmentId);
                                    break;
                                case EVENT_TYPES.DISPATCH_FAILED:
                                    await this.shipmentsService.markFailed(shipmentId, (envelope.payload as any).reason ?? 'DISPATCH_FAILED', ['PENDING', 'DISPATCHING']);
                                    break;
                                case EVENT_TYPES.DELIVERY_FAILED:
                                    await this.shipmentsService.markFailed(shipmentId, (envelope.payload as any).reasonCode ?? 'DELIVERY_FAILED', ['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT']);
                                    break;
                                case EVENT_TYPES.ASSIGNMENT_ACCEPTED:
                                    await this.shipmentsService.advanceForward(shipmentId, 'ASSIGNED', { driverId: (envelope.payload as any).driverId });
                                    break;
                                default:
                                    break;
                            }
                        });
                    } catch (err) {
                        this.logger.error('Failed to process dispatch event message', err as Error);
                    }
                },
            });

            this.connected = true;
            this.logger.log('Kafka dispatch events consumer started');
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