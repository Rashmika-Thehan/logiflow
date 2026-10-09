import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class AssignmentOffersService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly driversService: DriversService,
    ) { }

    mine(driverId: string) {
        return this.db.assignmentOffer.findMany({
            where: { driverId, status: 'PENDING_ACCEPTANCE' },
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

        const newStatus = decision === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';
        await this.db.$transaction(async (tx: any) => {
            const result = await tx.assignmentOffer.updateMany({
                where: { id: offerId, status: 'PENDING_ACCEPTANCE' },
                data: { status: newStatus },
            });
            if (result.count === 0) throw new BadRequestException('Offer was already resolved');

            await tx.outboxEvent.create({
                data: {
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