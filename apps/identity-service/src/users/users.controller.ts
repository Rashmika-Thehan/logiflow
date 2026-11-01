import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { UsersService } from './users.service';
import { Param } from '@nestjs/common';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.usersService.listTeammates();
    }

    @Roles('SUPER_ADMIN')
    @Get('platform-drivers')
    platformDrivers() { return this.usersService.listPlatformDrivers(); }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get(':id')
    teammate(@Param('id') id: string) { return this.usersService.getTeammate(id); }
}