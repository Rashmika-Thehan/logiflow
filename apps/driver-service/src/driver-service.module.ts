import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CommonAuthModule } from '@app/common';
import { PrismaModule } from './prisma/prisma.module';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AssignmentOffersModule } from './assignment-offers/assignment-offers.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') }),
    CommonAuthModule,
    PrismaModule,
    DriversModule,
    VehiclesModule,
    AssignmentOffersModule,
    DeliveriesModule,
    OutboxModule,
  ],
})
export class DriverServiceModule { }