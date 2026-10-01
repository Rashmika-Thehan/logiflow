import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityServiceController } from './identity-service.controller';
import { IdentityServiceService } from './identity-service.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), AuthModule],
  controllers: [IdentityServiceController],
  providers: [IdentityServiceService],
})
export class IdentityServiceModule { }
