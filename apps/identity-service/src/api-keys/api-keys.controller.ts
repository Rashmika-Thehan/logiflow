import { Body, Controller, Delete, Get, Headers, Ip, Param, Post, UseGuards } from '@nestjs/common';
import { Public, Roles, RolesGuard } from '@app/common';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { AuthService } from '../auth/auth.service';

@Controller('api-keys')
export class ApiKeysController {
    constructor(
        private readonly apiKeysService: ApiKeysService,
        private readonly authService: AuthService,
    ) { }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Post()
    create(@Body() dto: CreateApiKeyDto) {
        return this.apiKeysService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Get()
    list() {
        return this.apiKeysService.list();
    }

    @UseGuards(RolesGuard)
    @Roles('BUSINESS_ADMIN')
    @Delete(':id')
    revoke(@Param('id') id: string) {
        return this.apiKeysService.revoke(id);
    }

    // The actual B2B entry point: external systems trade a raw key for a
    // short-lived JWT, then use that JWT like any other caller would.
    @Public()
    @Post('token')
    async exchange(@Headers('x-api-key') apiKey: string, @Ip() ip: string) {
        const record = await this.apiKeysService.verify(apiKey, ip);
        return this.authService.issueApiKeyToken(record.tenantId, record.id, record.scopes);
    }
}