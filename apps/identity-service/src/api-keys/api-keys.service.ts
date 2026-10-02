import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

const BCRYPT_COST = 12;

@Injectable()
export class ApiKeysService {
    constructor(
        private readonly prisma: PrismaService,       // unscoped — used only for the pre-auth lookup in verify()
        @Inject(TENANT_PRISMA) private readonly db: any, // scoped — used for everything an authenticated caller does
    ) { }

    async create(dto: CreateApiKeyDto) {
        const raw = randomBytes(32).toString('hex');
        const keyPrefix = raw.slice(0, 8);
        const keyHash = await bcrypt.hash(raw, BCRYPT_COST);

        const record = await this.db.apiKey.create({
            data: {
                name: dto.name,
                scopes: dto.scopes,
                allowedIps: dto.allowedIps ?? [],
                keyPrefix,
                keyHash,
            },
        });

        // The raw key is returned exactly once — it's not retrievable again after this response.
        return { id: record.id, name: record.name, apiKey: raw, keyPrefix };
    }

    list() {
        return this.db.apiKey.findMany({
            select: { id: true, name: true, keyPrefix: true, scopes: true, allowedIps: true, lastUsedAt: true, revokedAt: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async revoke(id: string) {
        const key = await this.db.apiKey.update({ where: { id }, data: { revokedAt: new Date() } });
        if (!key) throw new NotFoundException('API key not found');
        return { id: key.id, revokedAt: key.revokedAt };
    }

    // Runs before any tenant is known — deliberately uses the unscoped client
    // and narrows by keyPrefix (indexed, non-secret) before the slow bcrypt compare.
    async verify(rawKey: string, requestIp: string) {
        const keyPrefix = rawKey.slice(0, 8);
        const candidates = await this.prisma.apiKey.findMany({ where: { keyPrefix, revokedAt: null } });

        for (const candidate of candidates) {
            if (await bcrypt.compare(rawKey, candidate.keyHash)) {
                if (candidate.allowedIps.length > 0 && !candidate.allowedIps.includes(requestIp)) {
                    throw new ForbiddenException('Request IP not allowed for this API key');
                }
                await this.prisma.apiKey.update({ where: { id: candidate.id }, data: { lastUsedAt: new Date() } });
                return candidate;
            }
        }

        throw new ForbiddenException('Invalid API key');
    }
}