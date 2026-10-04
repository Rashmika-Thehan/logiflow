import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '@app/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const BCRYPT_COST = 12;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly redis: RedisService,
    ) { }

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) throw new ConflictException('Email already registered');

        const tenant = await this.prisma.tenant.create({ data: { name: dto.tenantName } });
        const passwordHash = await bcrypt.hash(dto.password, BCRYPT_COST);
        const user = await this.prisma.user.create({
            data: { tenantId: tenant.id, email: dto.email, passwordHash, role: 'BUSINESS_ADMIN' },
        });

        return this.issueTokens(user.id, user.tenantId, user.role);
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !user.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.issueTokens(user.id, user.tenantId, user.role);
    }


    async refresh(refreshToken: string) {
        let payload: any;
        try {
            payload = this.jwt.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Invalid token type');
        }
        if (await this.redis.isBlacklisted(payload.jti)) {
            throw new UnauthorizedException('Token has been revoked');
        }

        // Rotation: this refresh token is single-use. Blacklist it for its own
        // remaining lifetime so a copy (stolen, logged, replayed) can't be
        // reused once a fresh pair has been issued from it.
        const ttl = payload.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await this.redis.blacklistToken(payload.jti, ttl);

        return this.issueTokens(payload.sub, payload.tenantId, payload.role);
    }

    async logout(accessPayload: { jti: string; exp: number }, refreshToken?: string) {
        const accessTtl = accessPayload.exp - Math.floor(Date.now() / 1000);
        if (accessTtl > 0) await this.redis.blacklistToken(accessPayload.jti, accessTtl);

        if (refreshToken) {
            try {
                const refreshPayload: any = this.jwt.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
                const refreshTtl = refreshPayload.exp - Math.floor(Date.now() / 1000);
                if (refreshTtl > 0) await this.redis.blacklistToken(refreshPayload.jti, refreshTtl);
            } catch {
                // Already expired or malformed — nothing left to revoke.
            }
        }
    }

    private issueTokens(userId: string, tenantId: string | null, role: string) {
        const basePayload = { sub: userId, tenantId, role };

        const accessToken = this.jwt.sign(
            { ...basePayload, type: 'access', jti: randomUUID() },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as any,
            },
        );
        const refreshToken = this.jwt.sign(
            { ...basePayload, type: 'refresh', jti: randomUUID() },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '5d') as any,
            },
        );

        return { accessToken, refreshToken };
    }

    async validateOAuthLogin(oauthUser: { googleId: string; email: string; displayName: string }) {
        let user = await this.prisma.user.findUnique({ where: { googleId: oauthUser.googleId } });

        if (!user) {
            user = await this.prisma.user.findUnique({ where: { email: oauthUser.email } });

            if (user) {
                user = await this.prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: oauthUser.googleId },
                });
            } else {
                const tenant = await this.prisma.tenant.create({
                    data: { name: `${oauthUser.displayName}'s Organization` },
                });
                user = await this.prisma.user.create({
                    data: {
                        tenantId: tenant.id,
                        email: oauthUser.email,
                        googleId: oauthUser.googleId,
                        role: 'BUSINESS_ADMIN',
                    },
                });
            }
        }

        return this.issueTokens(user.id, user.tenantId, user.role);
    }

    // Short-lived, access-token-only — no refresh token. A revoked/expired
    // integration re-authenticates by presenting its API key again, same as
    // a browser session re-logging in rather than refreshing indefinitely.
    issueApiKeyToken(tenantId: string, apiKeyId: string, scopes: string[]) {
        const accessToken = this.jwt.sign(
            { tenantId, apiKeyId, scopes, type: 'access', jti: randomUUID() },
            { secret: process.env.JWT_SECRET, expiresIn: '1h' },
        );
        return { accessToken, expiresIn: 3600 };
    }
}