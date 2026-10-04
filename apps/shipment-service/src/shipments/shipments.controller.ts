import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Auth, Roles, RolesGuard } from '@app/common';
import { SCOPES } from '@app/contracts';

@Controller('shipments')
export class ShipmentsController {
    constructor(private readonly shipmentsService: ShipmentsService) { }

    @Auth({ roles: ['BUSINESS_ADMIN'], scopes: [SCOPES.SHIPMENTS_WRITE] })
    @Post()
    create(@Body() dto: CreateShipmentDto) {
        return this.shipmentsService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.shipmentsService.list();
    }

    @Auth({ roles: ['BUSINESS_ADMIN', 'DISPATCHER'], scopes: [SCOPES.SHIPMENTS_READ] })
    @Get(':id')
    get(@Param('id') id: string) {
        return this.shipmentsService.get(id);
    }

    // explicitly both roles
    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Post(':id/cancel')
    cancel(@Param('id') id: string) {
        return this.shipmentsService.cancel(id);
    }
}