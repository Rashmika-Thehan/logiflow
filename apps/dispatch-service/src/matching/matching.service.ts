import { Inject, Injectable, Logger } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DRIVER_DIRECTORY_PORT, DriverDirectoryPort } from '../drivers/driver-directory.port';
import { isEligible, rankCandidates, ShipmentForMatching } from './scoring';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

const TIMEOUT_SECONDS = Number(process.env.DSP_ASSIGNMENT_TIMEOUT_SECONDS ?? 45);

@Injectable()
export class MatchingService {
    private readonly logger = new Logger(MatchingService.name);

    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        @Inject(DRIVER_DIRECTORY_PORT) private readonly drivers: DriverDirectoryPort,
    ) { }

    // Read-only — FR-DSP-06's dispatcher view. No DB writes, so it's safe to
    // call repeatedly while a dispatcher is just looking.
    async previewCandidates(tenantId: string, shipment: ShipmentForMatching) {
        const candidates = await this.drivers.listCandidates(tenantId);
        return rankCandidates(candidates, shipment);
    }

    // FR-DSP-01 entry point — called by the Kafka consumer on ShipmentCreated,
    // and again internally by redispatch() after a timeout/reject/breakdown.
    async assign(tenantId: string, shipmentId: string, shipment: ShipmentForMatching, excludeDriverIds: string[] = []) {
        // Idempotency / guard: if an assignment is already ACCEPTED for this shipment, skip
        const activeAccepted = await this.db.assignment.findFirst({
            where: { shipmentId, status: 'ACCEPTED' },
        });
        if (activeAccepted) {
            this.logger.debug(`Shipment ${shipmentId} already has an accepted assignment, skipping assign`);
            return activeAccepted;
        }

        const candidates = await this.drivers.listCandidates(tenantId);
        const ranked = rankCandidates(candidates, shipment, excludeDriverIds);
        const winner = ranked[0];

        return this.db.$transaction(async (tx: any) => {
            if (!winner) {
                const assignment = await tx.assignment.create({
                    data: { shipmentId, status: 'NO_CANDIDATES', shipmentSnapshot: shipment as any },
                });
                await tx.outboxEvent.create({
                    data: {
                        topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                        eventType: EVENT_TYPES.DISPATCH_FAILED,
                        payload: { shipmentId, reason: 'NO_ELIGIBLE_DRIVER' },
                    },
                });
                this.logger.warn(`No eligible driver for shipment ${shipmentId}`);
                return assignment;
            }

            const respondBy = new Date(Date.now() + TIMEOUT_SECONDS * 1000);
            const assignment = await tx.assignment.create({
                data: {
                    shipmentId,
                    driverId: winner?.driverId,
                    status: winner ? 'PENDING_ACCEPTANCE' : 'NO_CANDIDATES',
                    scoreSnapshot: winner as any,
                    shipmentSnapshot: shipment as any, // <-- add this line
                    respondBy: winner ? new Date(Date.now() + TIMEOUT_SECONDS * 1000) : null,
                },
            });

            // FR-DSP-04: publish DriverAssigned — same transaction as the
            // Assignment row, via the outbox, same guarantee as shipment-service.
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.DRIVER_ASSIGNED,
                    payload: { shipmentId, driverId: winner.driverId, assignmentId: assignment.id, score: winner.score },
                },
            });

            return assignment;
        });
    }

    // Shared re-dispatch path for FR-DSP-05 (timeout), a driver REJECT, and
    // FR-DSP-07 (breakdown) — all three are "this driver is no longer the
    // answer, try again excluding them."
    async redispatch(tenantId: string, shipmentId: string, shipment: ShipmentForMatching, excludeDriverIds: string[]) {
        return this.assign(tenantId, shipmentId, shipment, excludeDriverIds);
    }

    // Dispatch learned the shipment's weight and destination from its ShipmentCreated event; the
    // dispatcher doesn't get to supply them. Meant for reassignment before pickup.
    async assignManually(tenantId: string, shipmentId: string, driverId: string) {
        const known = await this.db.assignment.findFirst({ where: { shipmentId }, orderBy: { createdAt: 'desc' } });
        if (!known?.shipmentSnapshot) throw new NotFoundException('Dispatch has no record of this shipment');
        const shipment = known.shipmentSnapshot as ShipmentForMatching;

        const candidate = (await this.drivers.listCandidates(tenantId)).find((c) => c.driverId === driverId);
        if (!candidate) throw new BadRequestException('That driver is not in your fleet');
        if (!isEligible(candidate, shipment)) {
            throw new BadRequestException('That driver is not available or cannot carry this shipment');
        }

        return this.db.$transaction(async (tx: any) => {
            // Supersede whatever is live, or two drivers could both hold the shipment.
            const live = await tx.assignment.findMany({
                where: { shipmentId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
            });
            for (const a of live) {
                await tx.assignment.updateMany({ where: { id: a.id, status: a.status }, data: { status: 'CANCELLED' } });
                if (a.driverId) {
                    await tx.outboxEvent.create({
                        data: {
                            topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                            eventType: EVENT_TYPES.DRIVER_UNASSIGNED,
                            payload: { shipmentId, driverId: a.driverId, reason: 'OVERRIDE' },
                        },
                    });
                }
            }

            const assignment = await tx.assignment.create({
                data: {
                    shipmentId, driverId, status: 'PENDING_ACCEPTANCE', shipmentSnapshot: shipment as any,
                    respondBy: new Date(Date.now() + TIMEOUT_SECONDS * 1000),
                },
            });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.DRIVER_ASSIGNED,
                    payload: { shipmentId, driverId, assignmentId: assignment.id, override: true },
                },
            });
            return assignment;
        });
    }
}