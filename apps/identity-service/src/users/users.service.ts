import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { PLATFORM_TENANT_ID } from '@app/contracts';

@Injectable()
export class UsersService {
    // Typed loosely for now — tightening this to the exact extended-client
    // type is a later cleanup, not a blocker.
    constructor(@Inject(TENANT_PRISMA) private readonly db: any, private readonly prisma: PrismaService) { }

    // No `where: { tenantId }` here — the extension injects it automatically.
    listTeammates() {
        return this.db.user.findMany({
            select: { id: true, email: true, role: true, fullName: true, phone: true, createdAt: true },
        });
    }

    // SUPER_ADMIN's view of who is in the freelance pool; driver-service holds the verification status.
    listPlatformDrivers() {
        return this.prisma.user.findMany({
            where: { tenantId: PLATFORM_TENANT_ID, role: 'DRIVER' },
            select: { id: true, email: true, fullName: true, phone: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
    }

    // Tenant-scoped: another organization's user id is simply "not found". driver-service uses this to validate onboarding.
    async getTeammate(id: string) {
        const user = await this.db.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, fullName: true, phone: true } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}