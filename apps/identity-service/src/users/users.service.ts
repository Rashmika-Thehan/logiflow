import { Inject, Injectable } from '@nestjs/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';

@Injectable()
export class UsersService {
    // Typed loosely for now — tightening this to the exact extended-client
    // type is a later cleanup, not a blocker.
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    // No `where: { tenantId }` here — the extension injects it automatically.
    listTeammates() {
        return this.db.user.findMany({
            select: { id: true, email: true, role: true, createdAt: true },
        });
    }
}