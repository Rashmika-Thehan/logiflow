import { BadRequestException, Body, Controller, Get, Inject, Put, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { UpdateDispatchSettingsDto } from './dto/dispatch-settings.dto';

const DEFAULTS = { allowPlatformDrivers: false, maxOwnAttempts: 3 };

@Controller('dispatch/settings')
@UseGuards(RolesGuard)
export class DispatchSettingsController {
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    async get() {
        const row = await this.db.tenantDispatchSettings.findFirst();
        return row ?? DEFAULTS;
    }

    @Roles('BUSINESS_ADMIN')
    @Put()
    async update(@Body() dto: UpdateDispatchSettingsDto, @Req() req: any) {
        const current = await this.db.tenantDispatchSettings.findFirst();
        const enabling = dto.allowPlatformDrivers === true && !current?.allowPlatformDrivers;
        if (enabling && dto.acknowledgeDataSharing !== true) {
            throw new BadRequestException(
                'Enabling platform drivers shares customer names, phone numbers and addresses with independent drivers. Set acknowledgeDataSharing to true to confirm.',
            );
        }

        const data = {
            ...(dto.allowPlatformDrivers !== undefined ? { allowPlatformDrivers: dto.allowPlatformDrivers } : {}),
            ...(dto.maxOwnAttempts !== undefined ? { maxOwnAttempts: dto.maxOwnAttempts } : {}),
            ...(enabling ? { platformEnabledAt: new Date(), platformEnabledById: req.user.userId } : {}),
        };
        return this.db.tenantDispatchSettings.upsert({
            where: { tenantId: req.user.tenantId },
            create: { ...data }, // tenantId is stamped by the scoping extension
            update: data,
        });
    }
}