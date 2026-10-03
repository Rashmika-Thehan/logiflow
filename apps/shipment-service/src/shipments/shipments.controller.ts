import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipments')
@UseGuards(RolesGuard)
export class ShipmentsController {
    constructor(private readonly shipmentsService: ShipmentsService) { }

    // FR-SHP-01/02/04. (JwtAuthGuard is global; no @UseGuards needed for it here.)
    @Roles('BUSINESS_ADMIN')
    @Post()
    create(@Body() dto: CreateShipmentDto) {
        return this.shipmentsService.create(dto);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.shipmentsService.list();
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get(':id')
    get(@Param('id') id: string) {
        return this.shipmentsService.get(id);
    }

    // FR-SHP-06: explicitly both roles per the SRS.
    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Post(':id/cancel')
    cancel(@Param('id') id: string) {
        return this.shipmentsService.cancel(id);
    }
}