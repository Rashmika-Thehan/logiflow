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

                await this.prisma.$transaction(async (tx) => {
                    await tx.assignment.update({ where: { id: assignment.id }, data: { status: 'TIMED_OUT' } });
                    await tx.outboxEvent.create({
                        data: {
                            tenantId: assignment.tenantId,
                            topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                            eventType: EVENT_TYPES.DRIVER_UNASSIGNED,
                            payload: { shipmentId: assignment.shipmentId, driverId: assignment.driverId, reason: 'TIMEOUT' },
                        },
                    });
                });

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
}