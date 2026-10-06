import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, randomInt } from 'crypto';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { isTerminal, rank, canCancel } from './state-machine';
import { PrismaService } from '../prisma/prisma.service';
import { ListShipmentsQueryDto } from './dto/list-shipments.dto';
import { ConflictException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ShipmentsService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly prisma: PrismaService
    ) { }

    private generateTrackingCode() {
        return `LF-${randomBytes(6).toString('hex').toUpperCase()}`;
    }

    // Cryptographically secure — not Math.random().
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

    async get(id: string) {
        const shipment = await this.db.shipment.findUnique({ where: { id } });
        if (!shipment) throw new NotFoundException('Shipment not found');
        return shipment;
    }

    async cancel(id: string) {
        const shipment = await this.db.shipment.findUnique({ where: { id } });
        if (!shipment) throw new NotFoundException('Shipment not found');
        if (!canCancel(shipment.status)) {
            throw new BadRequestException(`Cannot cancel a shipment that is already ${shipment.status}`); // was: throw new Error(...) — fixes #12
        }

        return this.db.$transaction(async (tx: any) => {
            // Conditional on the status we just read: if another request already
            // changed it, affected count is 0 instead of silently overwriting.
            const result = await tx.shipment.updateMany({
                where: { id, status: shipment.status },
                data: { status: 'CANCELLED' },
            });
            if (result.count === 0) {
                throw new ConflictException('Shipment status changed concurrently — please retry');
            }

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
                    payload: { shipmentId: id, from: shipment.status, to: 'CANCELLED' },
                },
            });

            return tx.shipment.findUnique({ where: { id } });
        });
    }

    async list({ page = 1, limit = 20 }: ListShipmentsQueryDto) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.db.shipment.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
            this.db.shipment.count(),
        ]);
        return { data, page, limit, total, totalPages: Math.ceil(total / limit) };
    }

    // an anonymous recipient has no tenant to scope by in the first place.
    // Returns only recipient-safe fields — never deliveryOtp or internal IDs.
    async trackPublic(trackingCode: string) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { trackingCode },
            select: {
                trackingCode: true,
                status: true,
                priority: true,
                deliveryWindowStart: true,
                deliveryWindowEnd: true,
                createdAt: true,
            },
        });
        if (!shipment) throw new NotFoundException('No shipment found for this tracking code');
        return shipment;
    }

    // Event-driven, idempotent forward move. No-ops silently on a replay or
    // out-of-order delivery — the rank comparison is what makes "already
    // past this point" distinguishable from "legitimately needs to advance."
    async advanceForward(shipmentId: string, target: string) {
        return this.db.$transaction(async (tx: any) => {
            const shipment = await tx.shipment.findUnique({ where: { id: shipmentId } });
            if (!shipment || isTerminal(shipment.status) || rank(shipment.status) >= rank(target)) return;

            const result = await tx.shipment.updateMany({
                where: { id: shipmentId, status: shipment.status },
                data: { status: target },
            });
            if (result.count === 0) return; // lost a race — next event reconciles

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
                    payload: { shipmentId, from: shipment.status, to: target },
                },
            });
        });
    }

    // FR-DSP-07's "unassign and re-dispatch" reflected into shipment status.
    async regressToDispatching(shipmentId: string) {
        return this.db.$transaction(async (tx: any) => {
            const shipment = await tx.shipment.findUnique({ where: { id: shipmentId } });
            if (!shipment || shipment.status !== 'ASSIGNED') return; // already DISPATCHING or elsewhere — nothing to do

            await tx.shipment.updateMany({ where: { id: shipmentId, status: 'ASSIGNED' }, data: { status: 'DISPATCHING' } });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
                    payload: { shipmentId, from: 'ASSIGNED', to: 'DISPATCHING' },
                },
            });
        });
    }

    async markFailed(shipmentId: string, reason: string) {
        return this.db.$transaction(async (tx: any) => {
            const shipment = await tx.shipment.findUnique({ where: { id: shipmentId } });
            if (!shipment || isTerminal(shipment.status)) return;

            const result = await tx.shipment.updateMany({
                where: { id: shipmentId, status: shipment.status },
                data: { status: 'FAILED' },
            });
            if (result.count === 0) return;

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.SHIPMENT_EVENTS,
                    eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
                    payload: { shipmentId, from: shipment.status, to: 'FAILED', reason },
                },
            });
        });
    }
}