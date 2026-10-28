import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public, Roles, RolesGuard } from '@app/common';
import { JoinRequestsService } from './join-requests.service';
import { SubmitJoinRequestDto } from './dto/submit-join-request.dto';
import { ApproveJoinRequestDto, ListJoinRequestsQueryDto, RejectJoinRequestDto } from './dto/resolve-join-request.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('join-requests')
export class JoinRequestsController {
    constructor(private readonly joinRequests: JoinRequestsService) { }

    // ---- public ----

    @Public()
    @Throttle({ default: { limit: 5, ttl: 60_000 } })
    @Post()
    submit(@Body() dto: SubmitJoinRequestDto) {
        return this.joinRequests.submit(dto);
    }

    @Public()
    @Throttle({ default: { limit: 30, ttl: 60_000 } })
    @Get(':id/status')
    status(@Param('id', ParseUUIDPipe) id: string) {
        return this.joinRequests.status(id);
    }

    // ---- tenant admin ----

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Get()
    list(@Query() query: ListJoinRequestsQueryDto) {
        return this.joinRequests.list(query.status);
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Post(':id/approve')
    approve(@Param('id') id: string, @Body() dto: ApproveJoinRequestDto, @Req() req: any) {
        return this.joinRequests.approve(id, dto, req.user.userId);
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Post(':id/reject')
    reject(@Param('id') id: string, @Body() dto: RejectJoinRequestDto, @Req() req: any) {
        return this.joinRequests.reject(id, dto.reason, req.user.userId);
    }

    @Public()
    @Throttle({ default: { limit: 10, ttl: 60_000 } })
    @Post(':id/verify-email')
    verifyEmail(@Param('id', ParseUUIDPipe) id: string, @Body() dto: VerifyEmailDto) {
        return this.joinRequests.verifyEmail(id, dto.code);
    }

    @Public()
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @Post(':id/resend-code')
    resendCode(@Param('id', ParseUUIDPipe) id: string) {
        return this.joinRequests.resendCode(id);
    }
}