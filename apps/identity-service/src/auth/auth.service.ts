import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
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
        if (await this.redis.isBlacklisted(payload.jti)) {
            throw new UnauthorizedException('Token has been revoked');
        }
        return this.issueTokens(payload.sub, payload.tenantId, payload.role);
    }

    async logout(user: { jti: string; exp: number }) {
        const ttl = user.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) await this.redis.blacklistToken(user.jti, ttl);
    }

    private issueTokens(userId: string, tenantId: string | null, role: string) {
        const basePayload = { sub: userId, tenantId, role };

        const accessToken = this.jwt.sign(
            { ...basePayload, jti: randomUUID() },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as JwtSignOptions['expiresIn'],
            },
        );
        const refreshToken = this.jwt.sign(
            { ...basePayload, jti: randomUUID() },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '5d') as JwtSignOptions['expiresIn'],
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
}