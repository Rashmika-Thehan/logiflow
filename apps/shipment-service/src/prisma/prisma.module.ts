import { Global, Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { buildTenantScopingExtension } from '@app/common';
import { PrismaService } from './prisma.service';

export const TENANT_PRISMA = 'TENANT_PRISMA';

@Global()
@Module({
    providers: [
        PrismaService,
        {
            provide: TENANT_PRISMA,
            inject: [PrismaService, ClsService],
            useFactory: (prisma: PrismaService, cls: ClsService) =>
                prisma.$extends(buildTenantScopingExtension(['shipment', 'outboxEvent'], cls)),
        },
    ],
    exports: [PrismaService, TENANT_PRISMA],
})
export class PrismaModule { }