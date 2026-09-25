import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly redis: RedisService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        if (await this.redis.isBlacklisted(payload.jti)) {
            throw new UnauthorizedException('Token has been revoked');
        }
        return { userId: payload.sub, tenantId: payload.tenantId, role: payload.role, jti: payload.jti, exp: payload.exp };
    }
}