import { Controller, Get, MessageEvent, Param, Post, Query, Req, Sse, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles, RolesGuard } from '@app/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
@UseGuards(RolesGuard)
@Roles('DISPATCHER', 'BUSINESS_ADMIN')
export class AlertsController {
    constructor(private readonly alerts: AlertsService) { }

    @Get()
    list(@Query('includeAcknowledged') includeAcknowledged?: string) {
        return this.alerts.list(includeAcknowledged === 'true');
    }

    // Browser: new EventSource(url, { withCredentials: true }) sends the auth cookie.
    @Sse('stream')
    stream(@Req() req: any): Observable<MessageEvent> {
        return this.alerts.streamFor(req.user.tenantId);
    }

    @Post(':id/acknowledge')
    acknowledge(@Param('id') id: string, @Req() req: any) {
        return this.alerts.acknowledge(id, req.user.userId);
    }
}