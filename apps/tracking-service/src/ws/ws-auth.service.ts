import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@app/common';

export interface Principal { userId: string; tenantId: string | null; role?: string; exp?: number }

function readCookie(header: string | undefined, name: string) {
    if (!header) return undefined;
    for (const part of header.split(';')) {
        const i = part.indexOf('=');
        if (i !== -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
    }
    return undefined;
}

// Sockets authenticate once, at connect time. Same checks as JwtStrategy: signature,
// expiry, token type, and the Redis blacklist.
// Candidate to move into @app/common next to JwtStrategy.
@Injectable()
export class WsAuthService {
    private readonly jwt = new JwtService({});
    constructor(private readonly redis: RedisService) { }

    async authenticate(handshake: { headers: Record<string, any>; auth?: Record<string, any> }): Promise<Principal> {
        const bearer = /^Bearer (.+)$/i.exec(handshake.headers.authorization ?? '')?.[1];
        const cookie = readCookie(handshake.headers.cookie, process.env.ACCESS_COOKIE_NAME ?? 'accessToken');
        const token = handshake.auth?.token ?? bearer ?? cookie;
        if (!token) throw new Error('no token');

        const payload: any = this.jwt.verify(token, { secret: process.env.JWT_SECRET }); // throws if invalid or expired
        if (payload.type !== 'access') throw new Error('wrong token type');
        if (await this.redis.isBlacklisted(payload.jti)) throw new Error('revoked');

        return { userId: payload.sub, tenantId: payload.tenantId ?? null, role: payload.role, exp: payload.exp };
    }
}