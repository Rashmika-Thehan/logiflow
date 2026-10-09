import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { AssignmentOffersService } from './assignment-offers.service';

@Controller('assignment-offers')
@UseGuards(RolesGuard)
export class AssignmentOffersController {
    constructor(private readonly offers: AssignmentOffersService) { }

    @Roles('DRIVER')
    @Get('mine')
    mine(@Req() req: any) {
        return this.offers.mine(req.user.userId);
    }

    @Roles('DRIVER')
    @Post(':id/respond')
    respond(@Req() req: any, @Param('id') id: string, @Body('decision') decision: 'ACCEPT' | 'REJECT') {
        return this.offers.respond(req.user.userId, id, decision);
    }
}