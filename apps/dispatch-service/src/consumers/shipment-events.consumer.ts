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

    async onModuleInit() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: KAFKA_TOPICS.SHIPMENT_EVENTS, fromBeginning: false });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                if (!message.value) return;
                const envelope: KafkaEnvelope = JSON.parse(message.value.toString());

                if (envelope.type !== EVENT_TYPES.SHIPMENT_CREATED) return; // ignore other shipment.events types for now

                // Manual CLS context — same reasoning as the batch-import worker:
                // this isn't an HTTP request, so TenantInterceptor never runs.
                await this.cls.run(async () => {
                    this.cls.set('tenantId', envelope.tenantId);
                    await this.handleShipmentCreated(envelope);
                });
            },
        });
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }

    private async handleShipmentCreated(envelope: KafkaEnvelope) {
        const { shipmentId } = envelope.payload as any;

        // Idempotency: at-least-once delivery means this handler WILL see
        // duplicates eventually. An active assignment already existing for this
        // shipment means we've already processed this event — skip.
        const existing = await this.tenantPrisma.assignment.findFirst({
            where: { shipmentId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
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