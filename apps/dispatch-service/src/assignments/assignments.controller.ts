import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
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

    // List/find assignments for a shipment
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Get('by-shipment/:shipmentId')
    async getByShipment(@Param('shipmentId') shipmentId: string) {
        return this.db.assignment.findMany({
            where: { shipmentId },
            orderBy: { createdAt: 'desc' },
        });
    }

    // Get single assignment
    @Roles('DISPATCHER', 'BUSINESS_ADMIN')
    @Get(':id')
    async getById(@Param('id') id: string) {
        const assignment = await this.db.assignment.findUnique({ where: { id } });
        if (!assignment) throw new NotFoundException('Assignment not found');
        return assignment;
    }

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

        if (assignment.status !== 'PENDING_ACCEPTANCE') {
            throw new BadRequestException(
                `Assignment ${id} is no longer pending acceptance (current status: ${assignment.status})`,
            );
        }

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

        // REJECT: mark it, publish, and re-dispatch excluding all previously tried drivers
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

        const pastAssignments = await this.db.assignment.findMany({
            where: { shipmentId: assignment.shipmentId },
            select: { driverId: true },
        });
        const excludeDriverIds = Array.from(new Set(pastAssignments.map((a: any) => a.driverId).filter(Boolean))) as string[];

        await this.matching.redispatch(assignment.tenantId, assignment.shipmentId, assignment.shipmentSnapshot as any, excludeDriverIds);
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
                    payload: { assignmentId: assignment.id, shipmentId: assignment.shipmentId, driverId: assignment.driverId, reason: 'BREAKDOWN' },
                },
            });
        });

        const pastAssignments = await this.db.assignment.findMany({
            where: { shipmentId: assignment.shipmentId },
            select: { driverId: true },
        });
        const excludeDriverIds = Array.from(new Set(pastAssignments.map((a: any) => a.driverId).filter(Boolean))) as string[];

        await this.matching.redispatch(assignment.tenantId, assignment.shipmentId, assignment.shipmentSnapshot as any, excludeDriverIds);
        return { status: 'CANCELLED', redispatched: true };
    }
}