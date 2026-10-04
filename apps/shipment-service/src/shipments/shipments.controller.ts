import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Auth, Public, Roles, RolesGuard } from '@app/common';
import { SCOPES } from '@app/contracts';
import { ListShipmentsQueryDto } from './dto/list-shipments.dto';

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
    list(@Query() query: ListShipmentsQueryDto) {
        return this.shipmentsService.list(query);
    }

    @Public()
    @Get('track/:trackingCode')
    trackPublic(@Param('trackingCode') trackingCode: string) {
        return this.shipmentsService.trackPublic(trackingCode);
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