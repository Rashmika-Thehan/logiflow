import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { CommonAuthModule } from '@app/common';
import { ShipmentServiceController } from './shipment-service.controller';
import { ShipmentServiceService } from './shipment-service.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') }),
    ScheduleModule.forRoot(),
    CommonAuthModule,
    PrismaModule,
    ShipmentsModule,
    OutboxModule,
  ],
  controllers: [ShipmentServiceController],
  providers: [ShipmentServiceService],
})
export class ShipmentServiceModule { }