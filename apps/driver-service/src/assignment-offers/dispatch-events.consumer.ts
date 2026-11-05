import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { ClsService } from '@app/common';
import { EVENT_TYPES, KAFKA_TOPICS, KafkaEnvelope } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class DispatchEventsConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DispatchEventsConsumer.name);
    private readonly consumer: Consumer;
    private retryTimer?: NodeJS.Timeout;
    private destroyed = false;

    constructor(
        private readonly cls: ClsService,
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly prisma: PrismaService, // unscoped: needed to learn whose tenant a driver belongs to
        private readonly driversService: DriversService,
    ) {
        const kafka = new Kafka({ clientId: 'driver-service-dispatch-consumer', brokers: (process.env.KAFKA_BROKER ?? 'localhost:9092').split(',') });
        this.consumer = kafka.consumer({ groupId: 'driver-service-dispatch-consumer' });
    }

    onModuleInit() { void this.connectWithRetry(); }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.DISPATCH_EVENTS, fromBeginning: false });
            await this.consumer.run({ eachMessage: (m) => this.handle(m) });
        } catch (err) {
            this.logger.warn(`Kafka connect failed, retrying in 5s: ${(err as Error).message}`);
            await this.consumer.disconnect().catch(() => undefined);
            this.retryTimer = setTimeout(() => void this.connectWithRetry(), 5000);
        }
    }

    async onModuleDestroy() {
        this.destroyed = true;
        if (this.retryTimer) clearTimeout(this.retryTimer);
        await this.consumer.disconnect().catch(() => undefined);
    }

    private async handle({ message }: EachMessagePayload) {
        if (!message.value) return;
        try {
            const env: KafkaEnvelope = JSON.parse(message.value.toString());
            if (env.type !== EVENT_TYPES.DRIVER_ASSIGNED && env.type !== EVENT_TYPES.DRIVER_UNASSIGNED) return;
            const p: any = env.payload ?? {};
            const { shipmentId, driverId, assignmentId } = p;
            if (!shipmentId || !driverId) return;

            // The offer lives under the DRIVER's tenant. For a platform driver that differs from the
            // envelope's tenant, which is the business that owns the shipment.
            const driver = await this.prisma.driver.findUnique({ where: { id: driverId }, select: { tenantId: true } });
            if (!driver) return; // not a driver we know

            await this.cls.run(async () => {
                this.cls.set('tenantId', driver.tenantId);

                if (env.type === EVENT_TYPES.DRIVER_ASSIGNED) {
                    await this.db.assignmentOffer.upsert({
                        where: { id: assignmentId },
                        create: {
                            id: assignmentId, driverId, shipmentId, shipmentTenantId: env.tenantId,
                            preview: p.preview ?? undefined, status: 'PENDING_ACCEPTANCE',
                        },
                        update: {}, // a replayed event: already recorded
                    });
                    return;
                }

                const reason = p.reason;
                // A timeout only ever concerns a pending offer. These reasons revoke an accepted one too.
                const revokesAccepted = ['BREAKDOWN', 'SHIPMENT_CLOSED', 'OVERRIDE'].includes(reason);
                const { count } = await this.db.assignmentOffer.updateMany({
                    where: { driverId, shipmentId, status: { in: revokesAccepted ? ['PENDING_ACCEPTANCE', 'ACCEPTED'] : ['PENDING_ACCEPTANCE'] } },
                    data: { status: 'EXPIRED' },
                });
                if (count > 0 && revokesAccepted) {
                    if (reason === 'BREAKDOWN') await this.driversService.applyShiftStatus(driverId, 'OFFLINE'); // the vehicle is down
                    else await this.driversService.releaseIfIdle(driverId);
                }
            });
        } catch (err) {
            this.logger.error('Failed to process dispatch.events message', err as Error);
        }
    }
}