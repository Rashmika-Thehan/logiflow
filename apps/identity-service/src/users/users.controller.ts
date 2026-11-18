import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { UsersService } from './users.service';
import { Param } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    getProfile(@Req() req: any) {
        return this.usersService.getProfile(req.user.userId);
    }

    @Patch('me')
    updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
        return this.usersService.updateProfile(req.user.userId, dto);
    }

    @Post('me/password')
    changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
        return this.usersService.changePassword(req.user.userId, dto);
    }

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