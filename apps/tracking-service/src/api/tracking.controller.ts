import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { IngestionService } from '../ingest/ingestion.service';
import { PositionStore } from '../ingest/position-store';
import { MAX_BATCH } from '../ingest/ping';
import { TripsService } from '../trips/trips.service';
import { InBoxQueryDto, NearbyQueryDto, ReplayQueryDto } from './dto';

@Controller('tracking')
@UseGuards(RolesGuard)
export class TrackingController {
    constructor(
        private readonly ingestion: IngestionService,
        private readonly positions: PositionStore,
        private readonly trips: TripsService,
    ) { }

    // Batch upload: how a driver app flushes the pings it queued offline (SRS 2.5).
    @Roles('DRIVER')
    @Post('pings')
    ingest(@Req() req: any, @Body() body: any) {
        const items = body?.pings;
        if (!Array.isArray(items)) throw new BadRequestException('Expected { "pings": [...] }');
        if (items.length > MAX_BATCH) throw new BadRequestException(`Batch too large (max ${MAX_BATCH})`);
        return this.ingestion.ingest({ driverId: req.user.userId, tenantId: req.user.tenantId }, items);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get('drivers/nearby')
    nearby(@Req() req: any, @Query() q: NearbyQueryDto) {
        return this.positions.nearby(req.user.tenantId, q.lat, q.lng, q.radiusKm, q.limit);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get('drivers/in-box')
    inBox(@Req() req: any, @Query() q: InBoxQueryDto) {
        if (q.minLat >= q.maxLat || q.minLng >= q.maxLng) throw new BadRequestException('min values must be below max values');
        return this.positions.inBox(req.user.tenantId, q.minLat, q.minLng, q.maxLat, q.maxLng, q.limit);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get('drivers/:id/position')
    async position(@Req() req: any, @Param('id') id: string) {
        const pos = await this.positions.get(id, req.user.tenantId);
        if (!pos) throw new NotFoundException('No recent position for this driver');
        return pos;
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get('trips/:shipmentId/replay')
    replay(@Req() req: any, @Param('shipmentId') shipmentId: string, @Query() q: ReplayQueryDto) {
        return this.trips.replay(req.user.tenantId, shipmentId, q.limit);
    }
}