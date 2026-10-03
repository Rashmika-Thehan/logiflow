import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, randomInt } from 'crypto';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { canCancel } from './state-machine';

@Injectable()
export class ShipmentsService {
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    private generateTrackingCode() {
        return `LF-${randomBytes(6).toString('hex').toUpperCase()}`;
    }

    // Cryptographically secure — FR-SHP-04 requires this, not Math.random().
    private generateOtp() {
        return String(randomInt(0, 10000)).padStart(4, '0');
    }

    // Create + outbox write happen in one DB transaction (FR-SHP-07): either
    // both commit or neither does. The extension's auto tenantId-stamping still
    // applies inside $transaction — `tx` is derived from the extended client.
    create(dto: CreateShipmentDto) {
        return this.db.$transaction(async (tx: any) => {
            const shipment = await tx.shipment.create({
                data: {
                    ...dto,
                    trackingCode: this.generateTrackingCode(),
                    deliveryOtp: this.generateOtp(),
                },
            });

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_CREATED,
                    payload: {
                        shipmentId: shipment.id,
                        trackingCode: shipment.trackingCode,
                        priority: shipment.priority,
                        weightKg: shipment.weightKg,
                        recipientLat: shipment.recipientLat,
                        recipientLng: shipment.recipientLng,
                    },
                },
            });

            return shipment;
        });
    }

    list() {
        return this.db.shipment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async get(id: string) {
        const shipment = await this.db.shipment.findUnique({ where: { id } });
        if (!shipment) throw new NotFoundException('Shipment not found');
        return shipment;
    }

    async cancel(id: string) {
        return this.db.$transaction(async (tx: any) => {
            const shipment = await tx.shipment.findUnique({ where: { id } });
            if (!shipment) throw new NotFoundException('Shipment not found');
            if (!canCancel(shipment.status)) {
                throw new Error(`Cannot cancel a shipment that is already ${shipment.status}`);
            }

            const updated = await tx.shipment.update({
                where: { id },
                data: { status: 'CANCELLED' },
            });

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
                    payload: { shipmentId: id, from: shipment.status, to: 'CANCELLED' },
                },
            });

            return updated;
        });
    }
}