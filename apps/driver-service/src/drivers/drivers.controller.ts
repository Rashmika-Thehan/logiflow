import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { DriversService } from './drivers.service';
import { OnboardDriverDto } from './dto/onboard-driver.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('drivers')
@UseGuards(RolesGuard)
export class DriversController {
    constructor(private readonly driversService: DriversService) { }

    @Roles('BUSINESS_ADMIN')
    @Post()
    onboard(@Body() dto: OnboardDriverDto) {
        return this.driversService.onboard(dto);
    }

    @Roles('DRIVER')
    @Get('me')
    me(@Req() req: any) {
        return this.driversService.get(req.user.userId);
    }

    @Roles('DRIVER')
    @Patch('me/shift')
    setShift(@Req() req: any, @Body('status') status: string) {
        return this.driversService.setManualShift(req.user.userId, status);
    }

    @Roles('DRIVER')
    @Patch('me/location')
    // Temporary — a self-reported location endpoint standing in for
    // tracking-service's live GPS feed, until that service exists.
    updateLocation(@Req() req: any, @Body() dto: UpdateLocationDto) {
        return this.driversService.updateLocation(req.user.userId, dto.lat, dto.lng);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get(':id')
    get(@Param('id') id: string) {
        return this.driversService.get(id);
    }
}