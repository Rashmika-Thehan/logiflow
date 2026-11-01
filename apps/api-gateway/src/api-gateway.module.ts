import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HealthController } from './health.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') })],
  controllers: [HealthController],
})
export class ApiGatewayModule { }