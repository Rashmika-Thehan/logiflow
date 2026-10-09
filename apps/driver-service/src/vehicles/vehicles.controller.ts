import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('vehicles')
@UseGuards(RolesGuard)
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) { }

    @Roles('BUSINESS_ADMIN')
    @Post()
    create(@Body() dto: CreateVehicleDto) {
        return this.vehiclesService.create(dto);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.vehiclesService.list();
    }

    @Roles('BUSINESS_ADMIN')
    @Patch(':id/assign/:driverId')
    assign(@Param('id') id: string, @Param('driverId') driverId: string) {
        return this.vehiclesService.assign(id, driverId);
    }

    @Roles('BUSINESS_ADMIN')
    @Patch(':id/maintenance')
    setMaintenance(@Param('id') id: string, @Body('state') state: 'OPERATIONAL' | 'IN_MAINTENANCE') {
        return this.vehiclesService.setMaintenance(id, state);
    }
}