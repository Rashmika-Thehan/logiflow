import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';

// 31 characters: no I, L, O, 0 or 1, so codes survive being read aloud or
// typed from a screenshot. 31^8 is about 2^39.6 possibilities.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const normalizeJoinCode = (input: string) => input.toUpperCase().replace(/[^A-Z0-9]/g, '');
const formatJoinCode = (code: string) => `${code.slice(0, 4)}-${code.slice(4)}`;

function generateJoinCode() {
    let code = '';
    for (let i = 0; i < 8; i++) code += ALPHABET[randomInt(ALPHABET.length)]; // randomInt avoids modulo bias
    return code;
}

@Injectable()
export class TenantSettingsService {
    // Unscoped on purpose: Tenant has no tenantId column (its own id is its
    // scope), so every call below filters by the caller's verified tenantId.
    constructor(private readonly prisma: PrismaService) { }

    async get(tenantId: string) {
        const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId }, select: { joinCode: true } });
        return { enabled: !!tenant?.joinCode, joinCode: tenant?.joinCode ? formatJoinCode(tenant.joinCode) : null };
    }

    async rotate(tenantId: string) {
        for (let attempt = 0; attempt < 3; attempt++) {
            const code = generateJoinCode();
            try {
                await this.prisma.tenant.update({ where: { id: tenantId }, data: { joinCode: code } });
                return { enabled: true, joinCode: formatJoinCode(code) };
            } catch (err: any) {
                if (err.code !== 'P2002') throw err; // collision on the unique index: try a fresh code
            }
        }
        throw new Error('Could not generate a unique join code');
    }

    async disable(tenantId: string) {
        await this.prisma.tenant.update({ where: { id: tenantId }, data: { joinCode: null } });
        return { enabled: false, joinCode: null };
    }
}