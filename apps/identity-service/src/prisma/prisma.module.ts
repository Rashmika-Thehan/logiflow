import { Global, Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from '../../prisma/prisma.service';
import { withTenantScoping } from './tenant-scoping.extenstion';

export const TENANT_PRISMA = 'TENANT_PRISMA';

@Global()
@Module({
    providers: [
        PrismaService,
        {
            provide: TENANT_PRISMA,
            inject: [PrismaService, ClsService],
            useFactory: (prisma: PrismaService, cls: ClsService) => prisma.$extends(withTenantScoping(cls)),
        },
    ],
    exports: [PrismaService, TENANT_PRISMA],
})
export class PrismaModule { }