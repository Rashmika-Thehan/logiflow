import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly redis: RedisService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.accessToken,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        if (payload.type !== 'access') {
            throw new UnauthorizedException('Invalid token type');
        }
        if (await this.redis.isBlacklisted(payload.jti)) {
            throw new UnauthorizedException('Token has been revoked');
        }
        return {
            userId: payload.sub,
            tenantId: payload.tenantId,
            role: payload.role,
            scopes: payload.scopes,
            apiKeyId: payload.apiKeyId,
            jti: payload.jti,
            exp: payload.exp,
        };
    }
}
