import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { AppClsModule, JwtAuthGuard, TenantGuard, TenantInterceptor } from '@app/common';
import { IdentityServiceController } from './identity-service.controller';
import { IdentityServiceService } from './identity-service.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
    }),
    AppClsModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [IdentityServiceController],
  providers: [
    IdentityServiceService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },   // order matters: auth first...
    { provide: APP_GUARD, useClass: TenantGuard },    // ...then tenant-context validation
    { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
  ],
})
export class IdentityServiceModule { }