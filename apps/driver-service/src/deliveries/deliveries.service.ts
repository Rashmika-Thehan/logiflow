import { ForbiddenException, HttpException, Inject, Injectable } from '@nestjs/common';
import { EVENT_TYPES, KAFKA_TOPICS } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DriversService } from '../drivers/drivers.service';

const shipmentServiceUrl = () => process.env.SHIPMENT_URL ?? `http://127.0.0.1:${process.env.SHIPMENT_PORT ?? 3002}`;

@Injectable()
export class DeliveriesService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly driversService: DriversService,
    ) { }

    private async requireAcceptedOffer(driverId: string, shipmentId: string) {
        const offer = await this.db.assignmentOffer.findFirst({ where: { driverId, shipmentId, status: 'ACCEPTED' } });
        if (!offer) throw new ForbiddenException('No accepted assignment for this shipment');
        return offer;
    }

    // Milestones and outcomes are published for the SHIPMENT's tenant (the business that owns the
    // delivery), which for a platform driver is not the driver's own.
    private async record(offer: any, outcome: string, eventType: string, extra: Record<string, any> = {}, terminal = false) {
        const { driverId, shipmentId } = offer;
        await this.db.$transaction(async (tx: any) => {
            await tx.deliveryAttempt.create({ data: { shipmentId, driverId, outcome, ...extra } });
            await tx.outboxEvent.create({
                data: { tenantId: offer.shipmentTenantId, topic: KAFKA_TOPICS.DRIVER_EVENTS, eventType, payload: { shipmentId, driverId, ...extra } },
            });
            if (terminal) {
                await tx.assignmentOffer.updateMany({ where: { id: offer.id, status: 'ACCEPTED' }, data: { status: 'COMPLETED' } });
            }
        });
        if (terminal) await this.driversService.releaseIfIdle(driverId);
    }

    async arrived(driverId: string, shipmentId: string) {
        const offer = await this.requireAcceptedOffer(driverId, shipmentId);
        await this.record(offer, 'ARRIVED_AT_PICKUP', EVENT_TYPES.ARRIVED_AT_PICKUP);
        return { ok: true };
    }

    async collected(driverId: string, shipmentId: string) {
        const offer = await this.requireAcceptedOffer(driverId, shipmentId);
        await this.record(offer, 'PACKAGE_COLLECTED', EVENT_TYPES.PACKAGE_COLLECTED);
        return { ok: true };
    }

    async startDelivery(driverId: string, shipmentId: string) {
        const offer = await this.requireAcceptedOffer(driverId, shipmentId);
        await this.record(offer, 'START_DELIVERY', EVENT_TYPES.DELIVERY_STARTED);
        return { ok: true };
    }

    // Synchronous on purpose: a driver at the door needs an immediate answer.
    async confirmDelivery(driverId: string, shipmentId: string, otp: string, cookieHeader?: string) {
        const offer = await this.requireAcceptedOffer(driverId, shipmentId);

        const res = await fetch(`${shipmentServiceUrl()}/shipments/${shipmentId}/verify-delivery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(cookieHeader ? { Cookie: cookieHeader } : {}) },
            body: JSON.stringify({ otp }),
        });
        if (!res.ok) {
            const body: any = await res.json().catch(() => ({}));
            throw new HttpException(body.message ?? 'OTP verification failed', res.status);
        }

        await this.record(offer, 'DELIVERED', EVENT_TYPES.DELIVERY_COMPLETED, {}, true);
        return { ok: true };
    }

    async failDelivery(driverId: string, shipmentId: string, reasonCode: string, photoUrl?: string) {
        const offer = await this.requireAcceptedOffer(driverId, shipmentId);
        await this.record(offer, 'FAILED', EVENT_TYPES.DELIVERY_FAILED, { reasonCode, photoUrl }, true);
        return { ok: true };
    }
}