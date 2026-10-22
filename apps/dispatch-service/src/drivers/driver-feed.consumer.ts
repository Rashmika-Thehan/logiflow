import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { createKafkaClient } from '@app/common';
import { EVENT_TYPES, KAFKA_TOPICS, KafkaEnvelope } from '@app/contracts';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriverFeedConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(DriverFeedConsumer.name);
    private readonly consumer: Consumer;
    private retryTimer?: NodeJS.Timeout;
    private destroyed = false;

    constructor(private readonly prisma: PrismaService) {
        const kafka = createKafkaClient('dispatch-service-driver-feed');
        this.consumer = kafka.consumer({ groupId: 'dispatch-service-driver-feed' });
    }

    onModuleInit() {
        void this.connectWithRetry();
    }

    private async connectWithRetry() {
        if (this.destroyed) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.DRIVER_EVENTS, fromBeginning: true });
            await this.consumer.subscribe({ topic: KAFKA_TOPICS.TRACKING_EVENTS, fromBeginning: false });
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
        let env: KafkaEnvelope;
        try {
            env = JSON.parse(message.value.toString());
        } catch {
            return;
        }
        const p: any = env?.payload ?? {};

        try {
            if (env.type === EVENT_TYPES.DRIVER_STATUS_CHANGED && p.driverId) {
                await this.prisma.driverCandidateView.upsert({
                    where: { driverId: p.driverId },
                    create: {
                        driverId: p.driverId,
                        tenantId: env.tenantId,
                        status: p.status,
                        lat: p.lat ?? null,
                        lng: p.lng ?? null,
                        maxWeightKg: p.maxWeightKg ?? 0,
                    },
                    update: { status: p.status, maxWeightKg: p.maxWeightKg ?? 0 },
                });
                // A self-reported position only fills the gap until live tracking has provided one.
                if (p.lat != null && p.lng != null) {
                    await this.prisma.driverCandidateView.updateMany({
                        where: { driverId: p.driverId, locationAt: null },
                        data: { lat: p.lat, lng: p.lng },
                    });
                }
            } else if (env.type === EVENT_TYPES.DRIVER_LOCATION_UPDATED && p.driverId) {
                const at = new Date(p.ts);
                await this.prisma.driverCandidateView.updateMany({
                    // last write wins by device timestamp
                    where: { driverId: p.driverId, OR: [{ locationAt: null }, { locationAt: { lt: at } }] },
                    data: { lat: p.lat, lng: p.lng, locationAt: at },
                });
            }
        } catch (err) {
            this.logger.error(`Failed to apply ${env.type}: ${(err as Error).message}`);
        }
    }
}
