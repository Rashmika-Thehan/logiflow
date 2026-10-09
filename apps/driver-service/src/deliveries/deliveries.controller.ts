import { Body, Controller, Headers, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
@UseGuards(RolesGuard)
@Roles('DRIVER')
export class DeliveriesController {
    constructor(private readonly deliveries: DeliveriesService) { }

    @Post(':shipmentId/arrived')
    arrived(@Req() req: any, @Param('shipmentId') shipmentId: string) {
        return this.deliveries.arrived(req.user.userId, shipmentId);
    }

    @Post(':shipmentId/collected')
    collected(@Req() req: any, @Param('shipmentId') shipmentId: string) {
        return this.deliveries.collected(req.user.userId, shipmentId);
    }

    @Post(':shipmentId/start')
    start(@Req() req: any, @Param('shipmentId') shipmentId: string) {
        return this.deliveries.startDelivery(req.user.userId, shipmentId);
    }

    @Post(':shipmentId/confirm')
    confirm(
        @Req() req: any, @Param('shipmentId') shipmentId: string,
        @Body('otp') otp: string, @Headers('cookie') cookie: string,
    ) {
        return this.deliveries.confirmDelivery(req.user.userId, shipmentId, otp, cookie);
    }

    @Post(':shipmentId/fail')
    fail(
        @Req() req: any, @Param('shipmentId') shipmentId: string,
        @Body('reasonCode') reasonCode: string, @Body('photoUrl') photoUrl?: string,
    ) {
        return this.deliveries.failDelivery(req.user.userId, shipmentId, reasonCode, photoUrl);
    }
}