import { Module } from '@nestjs/common';
import { IdentityServiceController } from './identity-service.controller';
import { IdentityServiceService } from './identity-service.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [IdentityServiceController, AuthController],
  providers: [IdentityServiceService, AuthService],
})
export class IdentityServiceModule { }
