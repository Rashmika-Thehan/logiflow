import { Module } from '@nestjs/common';
import { DispatchEventsConsumer } from './dispatch-events.consumer';
import { AssignmentOffersController } from './assignment-offers.controller';
import { AssignmentOffersService } from './assignment-offers.service';
import { DriversModule } from '../drivers/drivers.module';
import { DriversService } from '../drivers/drivers.service';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { ClsService } from '@app/common';

@Module({
    imports: [DriversModule],
    controllers: [AssignmentOffersController],
    providers: [
        AssignmentOffersService,
        {
            provide: DispatchEventsConsumer,
            inject: [ClsService, TENANT_PRISMA, DriversService],
            useFactory: (cls: ClsService, tenantPrisma: any, driversService: DriversService) =>
                new DispatchEventsConsumer(cls, tenantPrisma, driversService),
        },
    ],
})
export class AssignmentOffersModule { }