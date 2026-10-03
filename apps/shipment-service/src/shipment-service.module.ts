import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { AppClsModule, JwtAuthGuard, JwtStrategy, RedisService, TenantGuard, TenantInterceptor } from '@app/common';
import { ShipmentServiceController } from './shipment-service.controller';
import { ShipmentServiceService } from './shipment-service.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') }),
    ScheduleModule.forRoot(),
    PassportModule,
    AppClsModule,
    PrismaModule,
    ShipmentsModule,
    OutboxModule,
  ],
  controllers: [ShipmentServiceController],
  providers: [
    ShipmentServiceService,
    JwtStrategy,
    RedisService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: TenantGuard },
    { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
  ],
})
export class ShipmentServiceModule { }