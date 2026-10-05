import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ClsModule, CommonAuthModule } from '@app/common';
import { DispatchServiceController } from './dispatch-service.controller';
import { DispatchServiceService } from './dispatch-service.service';
import { PrismaModule } from './prisma/prisma.module';
import { DriversModule } from './drivers/drivers.module';
import { MatchingModule } from './matching/matching.module';
import { ConsumersModule } from './consumers/consumers.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    CommonAuthModule,
    PrismaModule,
    DriversModule,
    MatchingModule,
    ConsumersModule,
    AssignmentsModule,
    OutboxModule,
  ],
  controllers: [DispatchServiceController],
  providers: [DispatchServiceService],
})
export class DispatchServiceModule { }