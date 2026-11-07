import { BadRequestException, ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EVENT_TYPES, KAFKA_TOPICS } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DRIVER_DIRECTORY_PORT, DriverDirectoryPort, DriverPool } from '../drivers/driver-directory.port';
import { isEligible, rankCandidates, ShipmentForMatching } from './scoring';

const TIMEOUT_SECONDS = Number(process.env.DSP_ASSIGNMENT_TIMEOUT_SECONDS ?? 45);
const DEFAULT_SETTINGS = { allowPlatformDrivers: false, maxOwnAttempts: 3 };

// What a driver may see BEFORE accepting: enough to decide, nothing that identifies the customer. The
// destination is rounded to about 1 km. The exact address is only released to the assigned driver after accepting.
const round2 = (n: number | null | undefined) => (n == null ? null : Math.round(n * 100) / 100);
const buildPreview = (s: ShipmentForMatching) => ({
    weightKg: s.weightKg,
    priority: s.priority ?? null,
    deliveryWindowEnd: s.deliveryWindowEnd ?? null,
    approxDestLat: round2(s.recipientLat),
    approxDestLng: round2(s.recipientLng),
});

@Injectable()
export class MatchingService {
    private readonly logger = new Logger(MatchingService.name);

    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        @Inject(DRIVER_DIRECTORY_PORT) private readonly drivers: DriverDirectoryPort,
    ) { }

    private async getSettings(tenantId: string) {
        const row = await this.db.tenantDispatchSettings.findUnique({ where: { tenantId } });
        return row ?? DEFAULT_SETTINGS;
    }

    // The order dispatch would actually try drivers in: the business's own, then (if enabled) the platform pool.
    async previewCandidates(tenantId: string, shipment: ShipmentForMatching) {
        const settings = await this.getSettings(tenantId);
        const candidates = await this.drivers.listCandidates(tenantId, { includePlatform: settings.allowPlatformDrivers });
        const own = rankCandidates(candidates.filter((c) => c.pool === 'OWN'), shipment)
            .map((c) => ({ ...c, pool: 'OWN' as const }));
        const platform = settings.allowPlatformDrivers
            ? rankCandidates(candidates.filter((c) => c.pool === 'PLATFORM'), shipment).map((c) => ({ ...c, pool: 'PLATFORM' as const }))
            : [];
        return [...own, ...platform];
    }

    private async pickCandidate(tenantId: string, shipmentId: string, shipment: ShipmentForMatching, exclude: string[]) {
        const settings = await this.getSettings(tenantId);
        const candidates = await this.drivers.listCandidates(tenantId, { includePlatform: settings.allowPlatformDrivers });

        // Own drivers first, until the business's own pool is exhausted or it has said no too many times.
        const ownAttempts = await this.db.assignment.count({
            where: { shipmentId, pool: 'OWN', status: { in: ['REJECTED', 'TIMED_OUT'] } },
        });
        if (ownAttempts < settings.maxOwnAttempts) {
            const own = rankCandidates(candidates.filter((c) => c.pool === 'OWN'), shipment, exclude);
            if (own[0]) return { winner: own[0], pool: 'OWN' as DriverPool };
        }
        if (settings.allowPlatformDrivers) {
            const platform = rankCandidates(candidates.filter((c) => c.pool === 'PLATFORM'), shipment, exclude);
            if (platform[0]) return { winner: platform[0], pool: 'PLATFORM' as DriverPool };
        }
        return { winner: undefined, pool: undefined };
    }

    async assign(tenantId: string, shipmentId: string, shipment: ShipmentForMatching, excludeDriverIds: string[] = [],): Promise<any> {
        // Quick exit if an assignment for this shipment was already accepted or is currently pending
        const existing = await this.db.assignment.findFirst({
            where: { shipmentId, status: { in: ['ACCEPTED', 'PENDING_ACCEPTANCE'] } },
        });
        if (existing) return existing;

        const excluded = [...excludeDriverIds];

        // Loop to handle concurrency: if a selected driver was claimed by a racing dispatch,
        // we exclude that driver and immediately pick the next best candidate without waiting for timeouts.
        while (true) {
            const { winner, pool } = await this.pickCandidate(tenantId, shipmentId, shipment, excluded);

            try {
                const result = await this.db.$transaction(async (tx: any) => {
                    // 0. Serialize dispatches per shipment to prevent concurrent offers
                    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext('dispatch_shipment'), hashtext(${shipmentId}))`;

                    // 1. Double-check shipment state inside the transaction to avoid duplicate dispatches
                    const alreadyHandled = await tx.assignment.findFirst({
                        where: { shipmentId, status: { in: ['ACCEPTED', 'PENDING_ACCEPTANCE'] } },
                    });
                    if (alreadyHandled) {
                        return { kind: 'DONE' as const, assignment: alreadyHandled };
                    }

                    // 2. No eligible driver available in either pool
                    if (!winner) {
                        const assignment = await tx.assignment.create({
                            data: {
                                shipmentId,
                                status: 'NO_CANDIDATES',
                                shipmentSnapshot: shipment as any,
                            },
                        });
                        await tx.outboxEvent.create({
                            data: {
                                topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                                eventType: EVENT_TYPES.DISPATCH_FAILED,
                                payload: { shipmentId, reason: 'NO_ELIGIBLE_DRIVER' },
                            },
                        });
                        this.logger.warn(`No eligible driver for shipment ${shipmentId}`);
                        return { kind: 'DONE' as const, assignment };
                    }

                    // 3. Atomic Driver Claim Guard
                    const isClaimed = pool === 'PLATFORM'
                        ? (await tx.assignment.count({
                            where: { driverId: winner.driverId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
                        })) > 0
                        : (await tx.assignment.count({
                            where: { driverId: winner.driverId, status: 'PENDING_ACCEPTANCE' },
                        })) > 0;

                    if (isClaimed) {
                        return { kind: 'RETRY' as const, conflictDriverId: winner.driverId };
                    }

                    // 4. Create the pending offer
                    const assignment = await tx.assignment.create({
                        data: {
                            shipmentId,
                            driverId: winner.driverId,
                            pool,
                            status: 'PENDING_ACCEPTANCE',
                            scoreSnapshot: winner as any,
                            shipmentSnapshot: shipment as any,
                            respondBy: new Date(Date.now() + TIMEOUT_SECONDS * 1000),
                        },
                    });

                    await tx.outboxEvent.create({
                        data: {
                            topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                            eventType: EVENT_TYPES.DRIVER_ASSIGNED,
                            payload: {
                                shipmentId,
                                driverId: winner.driverId,
                                assignmentId: assignment.id,
                                score: winner.score,
                                pool,
                                preview: buildPreview(shipment),
                            },
                        },
                    });

                    return { kind: 'DONE' as const, assignment };
                });

                if (result.kind === 'DONE') {
                    return result.assignment;
                }

                excluded.push(result.conflictDriverId);
            } catch (err: any) {
                if (err?.code === 'P2002') {
                    const active = await this.db.assignment.findFirst({
                        where: { shipmentId, status: { in: ['ACCEPTED', 'PENDING_ACCEPTANCE'] } },
                    });
                    if (active) return active;
                }
                throw err;
            }
        }
    }

    redispatch(tenantId: string, shipmentId: string, shipment: ShipmentForMatching, excludeDriverIds: string[]) {
        return this.assign(tenantId, shipmentId, shipment, excludeDriverIds);
    }

    // Meant for reassignment before pickup. Dispatch can't see shipment status, so the UI should hide it afterwards.
    async assignManually(tenantId: string, shipmentId: string, driverId: string) {
        const known = await this.db.assignment.findFirst({ where: { shipmentId }, orderBy: { createdAt: 'desc' } });
        if (!known?.shipmentSnapshot) throw new NotFoundException('Dispatch has no record of this shipment');
        const shipment = known.shipmentSnapshot as ShipmentForMatching;

        const settings = await this.getSettings(tenantId);
        const candidate = (await this.drivers.listCandidates(tenantId, { includePlatform: settings.allowPlatformDrivers }))
            .find((c) => c.driverId === driverId);
        if (!candidate) throw new BadRequestException('That driver is not in your fleet or the platform pool');
        if (!isEligible(candidate, shipment)) {
            throw new BadRequestException('That driver is not available or cannot carry this shipment');
        }

        return this.db.$transaction(async (tx: any) => {
            // Serialize with automated dispatch
            await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext('dispatch_shipment'), hashtext(${shipmentId}))`;
            const live = await tx.assignment.findMany({ where: { shipmentId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } } });
            for (const a of live) {
                const result = await tx.assignment.updateMany({ where: { id: a.id, status: a.status }, data: { status: 'CANCELLED' } });
                if (result.count === 0) throw new ConflictException('Assignment changed concurrently — please retry');
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
                    shipmentId, driverId, pool: candidate.pool, status: 'PENDING_ACCEPTANCE',
                    shipmentSnapshot: shipment as any, respondBy: new Date(Date.now() + TIMEOUT_SECONDS * 1000),
                },
            });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.DRIVER_ASSIGNED,
                    payload: { shipmentId, driverId, assignmentId: assignment.id, override: true, pool: candidate.pool, preview: buildPreview(shipment) },
                },
            });
            return assignment;
        });
    }
}