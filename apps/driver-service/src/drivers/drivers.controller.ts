import { Body, Controller, Get, Headers, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { DriversService } from './drivers.service';
import { OnboardDriverDto } from './dto/onboard-driver.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { SelfOnboardDto } from './dto/self-onboard.dto';
import { CreateOwnVehicleDto } from './dto/create-own-vehicle.dto';

@Controller('drivers')
@UseGuards(RolesGuard)
export class DriversController {
    constructor(private readonly driversService: DriversService) { }

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

    @Roles('DRIVER')
    @Post('me/profile')
    selfOnboard(@Req() req: any, @Body() dto: SelfOnboardDto) {
        return this.driversService.selfOnboard(req.user, dto);
    }

    @Roles('DRIVER')
    @Post('me/vehicle')
    createOwnVehicle(@Req() req: any, @Body() dto: CreateOwnVehicleDto) {
        return this.driversService.createOwnVehicle(req.user, dto);
    }

    @Roles('DRIVER')
    @Patch('me/license')
    updateOwnLicense(@Req() req: any, @Body() dto: UpdateLicenseDto) {
        return this.driversService.updateLicense(req.user.userId, dto);
    }

    @Roles('SUPER_ADMIN')
    @Get('platform')
    listPlatform(@Query('needsReview') needsReview?: string) {
        return this.driversService.listPlatformDrivers(needsReview === 'true');
    }

    @Roles('BUSINESS_ADMIN')
    @Post()
    onboard(@Body() dto: OnboardDriverDto, @Headers('cookie') cookie?: string) {
        return this.driversService.onboard(dto, { cookie });
    }

    @Roles('BUSINESS_ADMIN', 'SUPER_ADMIN')
    @Patch(':id/verify-license')
    verifyLicense(@Param('id') id: string, @Req() req: any) {
        return this.driversService.verifyLicense(id, req.user);
    }

    @Roles('BUSINESS_ADMIN', 'SUPER_ADMIN')
    @Patch(':id/revoke-verification')
    revokeVerification(@Param('id') id: string, @Req() req: any) {
        return this.driversService.revokeVerification(id, req.user);
    }


    @Roles('BUSINESS_ADMIN')
    @Patch(':id/license')
    updateLicense(@Param('id') id: string, @Body() dto: UpdateLicenseDto) {
        return this.driversService.updateLicense(id, dto);
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get(':id')
    get(@Param('id') id: string) {
        return this.driversService.get(id);
    }
}
