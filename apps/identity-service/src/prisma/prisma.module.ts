import { Global, Module } from '@nestjs/common';
import { ClsModule, ClsService, buildTenantScopingExtension } from '@app/common';
import { PrismaService } from '../../prisma/prisma.service';

export const TENANT_PRISMA = 'TENANT_PRISMA';

@Global()
@Module({
    imports: [ClsModule],
    providers: [
        PrismaService,
        {
            provide: TENANT_PRISMA,
            inject: [PrismaService, ClsService],
            useFactory: (prisma: PrismaService, cls: ClsService) =>
                prisma.$extends(buildTenantScopingExtension(['user', 'branch', 'apiKey'], cls)),
        },
    ],
    exports: [PrismaService, TENANT_PRISMA],
})
export class PrismaModule { }
