import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { TenantSettingsService } from './tenant-settings.service';

@Controller('tenant/join-code')
@UseGuards(RolesGuard)
@Roles('BUSINESS_ADMIN')
export class TenantSettingsController {
    constructor(private readonly settings: TenantSettingsService) { }

    @Get()
    get(@Req() req: any) {
        return this.settings.get(req.user.tenantId);
    }

    // Generates the first code, or replaces the current one (the old code stops working immediately).
    @Post()
    rotate(@Req() req: any) {
        return this.settings.rotate(req.user.tenantId);
    }

    @Delete()
    disable(@Req() req: any) {
        return this.settings.disable(req.user.tenantId);
    }
}