import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.usersService.listTeammates();
    }
}