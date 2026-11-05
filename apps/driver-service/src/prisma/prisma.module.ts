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
        prisma.$extends(
          buildTenantScopingExtension(
            // outboxEvent is deliberately NOT scoped: an event is written for the SHIPMENT's tenant,
            // which is not always the driver's. Every outbox write below passes tenantId explicitly.
            ['driver', 'vehicle', 'assignmentOffer', 'deliveryAttempt'],
            cls,
            {
              driver: 'id',
              vehicle: 'assignedDriverId',
              assignmentOffer: 'driverId',
              deliveryAttempt: 'driverId',
            },
          ),
        ),
    },
  ],
  exports: [PrismaService, TENANT_PRISMA],
})
export class PrismaModule {}
