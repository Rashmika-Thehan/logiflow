import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CommonAuthModule } from '@app/common';
import { IdentityServiceController } from './identity-service.controller';
import { IdentityServiceService } from './identity-service.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BranchesModule } from './branches/branches.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { InvitationsModule } from './invitations/invitations.module';
import { JoinRequestsModule } from './join-requests/join-requests.module';
import { TenantSettingsModule } from './tenant-settings/tenant-settings.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    CommonAuthModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    BranchesModule,
    ApiKeysModule,
    InvitationsModule,
    JoinRequestsModule,
    TenantSettingsModule,
    OutboxModule
  ],
  controllers: [IdentityServiceController],
  providers: [IdentityServiceService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class IdentityServiceModule { }