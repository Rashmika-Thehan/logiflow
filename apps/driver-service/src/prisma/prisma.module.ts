import { Global, Module } from '@nestjs/common';
import { ClsService } from '@app/common';
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
                prisma.$extends(buildTenantScopingExtension(
                    ['driver', 'vehicle', 'assignmentOffer', 'deliveryAttempt', 'outboxEvent'], cls,
                )),
        },
    ],
    exports: [PrismaService, TENANT_PRISMA],
})
export class PrismaModule { }