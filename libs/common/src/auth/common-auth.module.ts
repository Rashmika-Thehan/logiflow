import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';
import { RedisService } from '../redis/redis.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TenantGuard } from './tenant.guard';
import { TenantInterceptor } from './tenant.interceptor';

@Global()
@Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [
        RedisService,
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: TenantGuard },
        { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
    ],
    exports: [RedisService, JwtStrategy, PassportModule, ClsModule],
})
export class CommonAuthModule { }