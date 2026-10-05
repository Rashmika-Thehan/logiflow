import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { MatchingService } from '../matching/matching.service';
import { OverrideAssignmentDto } from './dto/override.dto';
import { RespondDto } from './dto/respond.dto';

@Controller('assignments')
@UseGuards(RolesGuard)
export class AssignmentsController {
    constructor(
        private readonly matching: MatchingService,
        @Inject(TENANT_PRISMA) private readonly db: any,
    ) { }

    // FR-DSP-06: ranked candidates, no commitment — dry run.
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Get('candidates')
    async candidates(
        @Query('weightKg') weightKg: string,
        @Query('lat') lat: string,
        @Query('lng') lng: string,
    ) {
        return this.matching.previewCandidates('', {
            weightKg: Number(weightKg),
            recipientLat: lat ? Number(lat) : null,
            recipientLng: lng ? Number(lng) : null,
        });
    }

    // FR-DSP-06: manual override — dispatcher picks directly, bypassing scoring.
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Post('override')
    async override(@Body() dto: OverrideAssignmentDto) {
        const respondBy = new Date(Date.now() + Number(process.env.DSP_ASSIGNMENT_TIMEOUT_SECONDS ?? 45) * 1000);
        return this.db.$transaction(async (tx: any) => {
            const assignment = await tx.assignment.create({
                data: {
                    shipmentId: dto.shipmentId,
                    driverId: dto.driverId,
                    status: 'PENDING_ACCEPTANCE',
                    shipmentSnapshot: { weightKg: dto.weightKg, recipientLat: dto.recipientLat, recipientLng: dto.recipientLng },
                    respondBy,
                },
            });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.DRIVER_ASSIGNED,
                    payload: { shipmentId: dto.shipmentId, driverId: dto.driverId, assignmentId: assignment.id, override: true },
                },
            });
            return assignment;
        });
    }

    // Temporary stand-in for driver-fleet-service's FR-DRV-06 acceptance
    // interface, until that service exists and this becomes a Kafka consumer
    // on driver.events instead of an HTTP route.
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Post(':id/respond')
    async respond(@Param('id') id: string, @Body() dto: RespondDto) {
        const assignment = await this.db.assignment.findUnique({ where: { id } });
        if (!assignment) throw new NotFoundException('Assignment not found');

        if (dto.decision === 'ACCEPT') {
            await this.db.$transaction(async (tx: any) => {
                await tx.assignment.update({ where: { id }, data: { status: 'ACCEPTED', respondedAt: new Date() } });
                await tx.outboxEvent.create({
                    data: {
                        topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                        eventType: EVENT_TYPES.ASSIGNMENT_ACCEPTED,
                        payload: { shipmentId: assignment.shipmentId, driverId: assignment.driverId },
                    },
                });
            });
            return { status: 'ACCEPTED' };
        }

        // REJECT: mark it, publish, and re-dispatch excluding this driver —
        // same shared path the timeout checker uses.
        await this.db.$transaction(async (tx: any) => {
            await tx.assignment.update({ where: { id }, data: { status: 'REJECTED', respondedAt: new Date() } });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.ASSIGNMENT_REJECTED,
                    payload: { shipmentId: assignment.shipmentId, driverId: assignment.driverId },
                },
            });
        });
        await this.matching.redispatch(assignment.tenantId, assignment.shipmentId, assignment.shipmentSnapshot as any, [assignment.driverId]);
        return { status: 'REJECTED', redispatched: true };
    }

    // FR-DSP-07: vehicle breakdown / emergency — unassign + immediate re-dispatch.
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Post(':id/breakdown')
    async breakdown(@Param('id') id: string) {
        const assignment = await this.db.assignment.findUnique({ where: { id } });
        if (!assignment) throw new NotFoundException('Assignment not found');

        await this.db.$transaction(async (tx: any) => {
            await tx.assignment.update({ where: { id }, data: { status: 'CANCELLED' } });
            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.DISPATCH_EVENTS,
                    eventType: EVENT_TYPES.DRIVER_UNASSIGNED,
                    payload: { shipmentId: assignment.shipmentId, driverId: assignment.driverId, reason: 'BREAKDOWN' },
                },
            });
        });
        await this.matching.redispatch(assignment.tenantId, assignment.shipmentId, assignment.shipmentSnapshot as any, [assignment.driverId]);
        return { status: 'CANCELLED', redispatched: true };
    }
}