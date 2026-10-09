import { BadRequestException, ForbiddenException, HttpException, Inject, Injectable } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class DeliveriesService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly driversService: DriversService,
    ) { }

    // Every action below first confirms this driver actually holds an
    // ACCEPTED offer for this shipment — the ownership check nothing else enforces.
    private async requireAcceptedOffer(driverId: string, shipmentId: string) {
        const offer = await this.db.assignmentOffer.findFirst({
            where: { driverId, shipmentId, status: 'ACCEPTED' },
        });
        if (!offer) throw new ForbiddenException('No accepted assignment for this shipment');
        return offer;
    }

    private async recordAndPublish(
        driverId: string, shipmentId: string,
        outcome: string, eventType: string, extra: Record<string, any> = {},
    ) {
        await this.db.$transaction(async (tx: any) => {
            await tx.deliveryAttempt.create({ data: { shipmentId, driverId, outcome, ...extra } });
            await tx.outboxEvent.create({
                data: { topic: KAFKA_TOPICS.DRIVER_EVENTS, eventType, payload: { shipmentId, driverId, ...extra } },
            });
        });
    }

    async arrived(driverId: string, shipmentId: string) {
        await this.requireAcceptedOffer(driverId, shipmentId);
        await this.recordAndPublish(driverId, shipmentId, 'ARRIVED_AT_PICKUP', EVENT_TYPES.ARRIVED_AT_PICKUP);
        return { ok: true };
    }

    async collected(driverId: string, shipmentId: string) {
        await this.requireAcceptedOffer(driverId, shipmentId);
        await this.recordAndPublish(driverId, shipmentId, 'PACKAGE_COLLECTED', EVENT_TYPES.PACKAGE_COLLECTED);
        return { ok: true };
    }

    async startDelivery(driverId: string, shipmentId: string) {
        await this.requireAcceptedOffer(driverId, shipmentId);
        await this.recordAndPublish(driverId, shipmentId, 'START_DELIVERY', EVENT_TYPES.DELIVERY_STARTED);
        return { ok: true };
    }

    // Synchronous call to shipment-service — the one deliberate exception to
    // this system's otherwise all-async design, because a driver at the door
    // needs an immediate yes/no, not an eventual one. Forwards the driver's
    // own auth cookie, so shipment-service's own RolesGuard/ownership logic
    // applies exactly as if the driver had called it directly.
    async confirmDelivery(driverId: string, shipmentId: string, otp: string, cookieHeader?: string) {
        await this.requireAcceptedOffer(driverId, shipmentId);

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (cookieHeader) {
            headers['Cookie'] = cookieHeader;
        }

        const res = await fetch(`http://localhost:${process.env.SHIPMENT_PORT ?? 3002}/shipments/${shipmentId}/verify-delivery`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ otp }),
        });

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new HttpException(body.message ?? 'OTP verification failed', res.status);
        }

        await this.recordAndPublish(driverId, shipmentId, 'DELIVERED', EVENT_TYPES.DELIVERY_COMPLETED);
        await this.driversService.applyShiftStatus(driverId, 'AVAILABLE');
        return { ok: true };
    }

    async failDelivery(driverId: string, shipmentId: string, reasonCode: string, photoUrl?: string) {
        await this.requireAcceptedOffer(driverId, shipmentId);
        await this.recordAndPublish(driverId, shipmentId, 'FAILED', EVENT_TYPES.DELIVERY_FAILED, { reasonCode, photoUrl });
        await this.driversService.applyShiftStatus(driverId, 'AVAILABLE');
        return { ok: true };
    }
}