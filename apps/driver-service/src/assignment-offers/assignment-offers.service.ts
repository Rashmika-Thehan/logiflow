import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES, PLATFORM_TENANT_ID } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class AssignmentOffersService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly driversService: DriversService,
    ) { }

    // No tenant ids: a platform driver must not learn which business an offer belongs to before accepting.
    mine(driverId: string) {
        return this.db.assignmentOffer.findMany({
            where: { driverId, status: 'PENDING_ACCEPTANCE' },
            select: { id: true, shipmentId: true, status: true, createdAt: true, preview: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    // The jobs a driver is committed to: what the app needs to fetch each job's details.
    active(driverId: string) {
        return this.db.assignmentOffer.findMany({
            where: { driverId, status: 'ACCEPTED' },
            select: { id: true, shipmentId: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async respond(driverId: string, offerId: string, decision: 'ACCEPT' | 'REJECT') {
        if (decision !== 'ACCEPT' && decision !== 'REJECT') {
            throw new BadRequestException('Decision must be either ACCEPT or REJECT');
        }

        const offer = await this.db.assignmentOffer.findUnique({ where: { id: offerId } });
        if (!offer) throw new NotFoundException('Offer not found');
        if (offer.driverId !== driverId) throw new ForbiddenException('Not your offer');
        if (offer.status !== 'PENDING_ACCEPTANCE') {
            throw new BadRequestException(`Offer is no longer pending (currently ${offer.status})`);
        }

        if (decision === 'ACCEPT') {
            await this.driversService.assertEligible(driverId);
        }

        const newStatus = decision === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';

        await this.db.$transaction(async (tx: any) => {
            if (decision === 'ACCEPT') {
                // Lock the driver row to serialize concurrent accept requests
                await tx.$queryRaw`SELECT 1 FROM "Driver" WHERE id = ${driverId} FOR UPDATE`;

                const driver = await this.driversService.get(driverId);
                if (driver.tenantId === PLATFORM_TENANT_ID) {
                    const active = await tx.assignmentOffer.count({
                        where: { driverId, status: 'ACCEPTED' }
                    });
                    if (active > 0) {
                        throw new BadRequestException('Finish your current delivery before accepting another');
                    }
                }
            }

            const result = await tx.assignmentOffer.updateMany({
                where: { id: offerId, status: 'PENDING_ACCEPTANCE' },
                data: { status: newStatus },
            });
            if (result.count === 0) throw new BadRequestException('Offer was already resolved');

            await tx.outboxEvent.create({
                data: {
                    tenantId: offer.shipmentTenantId,
                    topic: KAFKA_TOPICS.DRIVER_EVENTS,
                    eventType: decision === 'ACCEPT' ? EVENT_TYPES.ASSIGNMENT_ACCEPTED : EVENT_TYPES.ASSIGNMENT_REJECTED,
                    payload: { assignmentId: offerId, shipmentId: offer.shipmentId, driverId },
                },
            });

            if (decision === 'ACCEPT') {
                await this.driversService.applyShiftStatus(driverId, 'BUSY', tx);
            }
        });

        return { status: newStatus };
    }
}