import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public, Roles, RolesGuard } from '@app/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

@Controller('invitations')
export class InvitationsController {
    constructor(private readonly invitations: InvitationsService) { }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Post()
    create(@Body() dto: CreateInvitationDto, @Req() req: any) {
        return this.invitations.create(dto, req.user.userId, req.user.tenantId);
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Get()
    list() {
        return this.invitations.list();
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Delete(':id')
    revoke(@Param('id') id: string) {
        return this.invitations.revoke(id);
    }

    // The invitee has no account or session yet. The 256-bit token is the credential.
    @Public()
    @Throttle({ default: { limit: 10, ttl: 60_000 } })
    @Post('accept')
    accept(@Body() dto: AcceptInvitationDto) {
        return this.invitations.accept(dto);
    }
}