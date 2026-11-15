import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ClsService } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { PrismaService } from '../prisma/prisma.service';
import { MatchingService } from '../matching/matching.service';

@Injectable()
export class TimeoutCheckerService {
    private readonly logger = new Logger(TimeoutCheckerService.name);

    constructor(
        private readonly prisma: PrismaService, // unscoped — spans all tenants, like the outbox publisher
        private readonly cls: ClsService,
        private readonly matching: MatchingService,
    ) { }

    @Interval(5000)
    async checkTimeouts() {
        // SKIP LOCKED, same reasoning as the outbox publisher: safe even if
        // this service ever runs more than one instance.
        const expired = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM "Assignment"
      WHERE status = 'PENDING_ACCEPTANCE' AND "respondBy" < NOW()
      FOR UPDATE SKIP LOCKED
    `;

        for (const assignment of expired) {
            await this.cls.run(async () => {
                this.cls.set('tenantId', assignment.tenantId);

                let timedOut = false;
                await this.prisma.$transaction(async (tx) => {
                    // 1. Acquire transaction advisory lock for the shipment
                    await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext('dispatch_shipment'), hashtext(${assignment.shipmentId}))`;

                    // 2. Only time out if the assignment is still PENDING_ACCEPTANCE (hasn't been accepted concurrently)
                    const result = await tx.assignment.updateMany({
                        where: { id: assignment.id, status: 'PENDING_ACCEPTANCE' },
                        data: { status: 'TIMED_OUT' },
                    });

                    if (result.count === 0) {
                        // Already accepted or resolved concurrently; do not time out or redispatch
                        return;
                    }

                    timedOut = true;
                    await tx.outboxEvent.create({
                        data: {
                            tenantId: assignment.tenantId,
                            topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                            eventType: EVENT_TYPES.DRIVER_UNASSIGNED,
                            payload: {
                                assignmentId: assignment.id,
                                shipmentId: assignment.shipmentId,
                                driverId: assignment.driverId,
                                reason: 'TIMEOUT',
                            },
                        },
                    });
                });

                if (!timedOut) {
                    this.logger.debug(`Assignment ${assignment.id} was already resolved before timeout could apply; skipping redispatch`);
                    return;
                }

                this.logger.warn(`Assignment ${assignment.id} timed out, re-dispatching`);

                // Check if another assignment for this shipment was already accepted
                const alreadyAccepted = await this.prisma.assignment.findFirst({
                    where: { shipmentId: assignment.shipmentId, status: 'ACCEPTED' },
                });
                if (alreadyAccepted) {
                    this.logger.debug(`Shipment ${assignment.shipmentId} already has an accepted assignment, skipping redispatch`);
                    return;
                }

                const shipment = assignment.shipmentSnapshot as any;
                if (shipment) {
                    const pastAssignments = await this.prisma.assignment.findMany({
                        where: { shipmentId: assignment.shipmentId },
                        select: { driverId: true },
                    });
                    const excludeDriverIds = Array.from(new Set(pastAssignments.map((a) => a.driverId).filter(Boolean))) as string[];

                    await this.matching.redispatch(
                        assignment.tenantId,
                        assignment.shipmentId,
                        shipment,
                        excludeDriverIds,
                    );
                }
            });
        }
    }

    // Retry shipments that found NO_CANDIDATES the first time (no driver was available).
    // Runs every 60 s — cheap because it only fires when there are stranded shipments.
    @Interval(60_000)
    async retryNoCandidates() {
        // All NO_CANDIDATES assignments — the loop skips rows without a snapshot at runtime.
        const stranded = await this.prisma.assignment.findMany({
            where: { status: 'NO_CANDIDATES' },
            orderBy: { createdAt: 'asc' },
            take: 20,
        });

        for (const assignment of stranded) {
            await this.cls.run(async () => {
                this.cls.set('tenantId', assignment.tenantId);

                // Skip if this shipment now has an active assignment (accepted or pending)
                const active = await this.prisma.assignment.findFirst({
                    where: { shipmentId: assignment.shipmentId, status: { in: ['ACCEPTED', 'PENDING_ACCEPTANCE'] } },
                });
                if (active) return;

                const shipment = assignment.shipmentSnapshot as any;
                if (!shipment) return; // should not happen, but guard just in case
                const pastDriverIds = await this.prisma.assignment.findMany({
                    where: { shipmentId: assignment.shipmentId },
                    select: { driverId: true },
                });
                const excludeDriverIds = Array.from(new Set(pastDriverIds.map((a) => a.driverId).filter(Boolean))) as string[];

                this.logger.log(`Retrying NO_CANDIDATES shipment ${assignment.shipmentId}`);
                await this.matching.redispatch(assignment.tenantId, assignment.shipmentId, shipment, excludeDriverIds);
            });
        }
    }
}