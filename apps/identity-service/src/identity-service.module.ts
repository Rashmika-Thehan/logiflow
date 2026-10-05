import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ClsModule, CommonAuthModule } from '@app/common';
import { IdentityServiceController } from './identity-service.controller';
import { IdentityServiceService } from './identity-service.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BranchesModule } from './branches/branches.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    CommonAuthModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    BranchesModule,
    ApiKeysModule,
  ],
  controllers: [IdentityServiceController],
  providers: [IdentityServiceService],
})
export class IdentityServiceModule { }