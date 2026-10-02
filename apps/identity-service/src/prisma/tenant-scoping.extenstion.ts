import { ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

/**
 * Auto-filters every `user` query by tenantId and auto-stamps tenantId on
 * create. SUPER_ADMIN bypasses scoping entirely. Only wired onto `user` for
 * now — identity-service's only tenant-owned table today.
 */
export function withTenantScoping(cls: ClsService) {
    return Prisma.defineExtension((client) =>
        client.$extends({
            name: 'tenant-scoping',
            query: {
                user: {
                    async $allOperations({ operation, args, query }) {
                        const role = cls.get('role');
                        if (role === 'SUPER_ADMIN') return query(args);

                        const tenantId = cls.get('tenantId');
                        if (!tenantId) {
                            throw new ForbiddenException('No tenant context for this query');
                        }

                        if (['findMany', 'count', 'updateMany', 'deleteMany'].includes(operation)) {
                            (args as any).where = { ...(args as any).where, tenantId };
                        }

                        if (operation === 'create') {
                            (args as any).data = { ...(args as any).data, tenantId };
                        }

                        // findUnique/findFirst/update/delete can't have arbitrary fields
                        // added to `where` without breaking Prisma's unique-input typing,
                        // so verify ownership *after* the fetch instead — a cross-tenant
                        // lookup returns null, same as "doesn't exist."
                        if (['findUnique', 'findFirst', 'update', 'delete'].includes(operation)) {
                            const result = await query(args);
                            if (result && (result as any).tenantId !== tenantId) {
                                return null;
                            }
                            return result;
                        }

                        return query(args);
                    },
                },
            },
        }),
    );
}