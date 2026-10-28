import { Injectable } from '@nestjs/common';
import { EVENT_TYPES, KAFKA_TOPICS } from '@app/contracts';
import { PrismaService } from '../prisma/prisma.service';

// Keeps assignments in step with where the shipment actually ended up. Without this an
// accepted assignment stays ACCEPTED forever: the driver's workload count only grows, and
// a cancelled shipment keeps its driver busy.
@Injectable()
export class AssignmentLifecycleService {
    constructor(private readonly prisma: PrismaService) { }

    async onShipmentStatusChanged(tenantId: string, shipmentId: string, to: string) {
        if (!['DELIVERED', 'FAILED', 'CANCELLED'].includes(to)) return;

        const active = await this.prisma.assignment.findMany({
            where: { tenantId, shipmentId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
        });

        for (const a of active) {
            // An accepted assignment on a delivered/failed shipment completed normally. Anything else is revoked.
            const closeAs = a.status === 'ACCEPTED' && to !== 'CANCELLED' ? 'COMPLETED' : 'CANCELLED';
            await this.prisma.$transaction(async (tx) => {
                const result = await tx.assignment.updateMany({ where: { id: a.id, status: a.status }, data: { status: closeAs } });
                if (result.count === 0 || closeAs === 'COMPLETED' || !a.driverId) return;
                // Only a revocation needs to tell the driver side; on delivery the driver finished it themselves.
                await tx.outboxEvent.create({
                    data: {
                        tenantId,
                        topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                        eventType: EVENT_TYPES.DRIVER_UNASSIGNED,
                        payload: { assignmentId: a.id, shipmentId, driverId: a.driverId, reason: 'SHIPMENT_CLOSED' },
                    },
                });
            });
        }
    }
}
