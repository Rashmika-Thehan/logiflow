import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppClsModule } from '../cls/cls.module';
import { RedisService } from '../redis/redis.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TenantGuard } from './tenant.guard';
import { TenantInterceptor } from './tenant.interceptor';

@Global()
@Module({
    imports: [AppClsModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [
        RedisService,
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: TenantGuard },
        { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
    ],
    // RedisService and JwtStrategy are re-exported for the rare case a service
    // wants to inject one directly; most services won't need to.
    exports: [RedisService, JwtStrategy, PassportModule, AppClsModule],
})
export class CommonAuthModule { }