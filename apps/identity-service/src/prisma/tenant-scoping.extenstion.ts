import { ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

const TENANT_SCOPED_MODELS = ['user', 'branch', 'apiKey'] as const;

function scopedHandler(cls: ClsService) {
    return async ({ operation, args, query }: any) => {
        const role = cls.get('role');
        if (role === 'SUPER_ADMIN') return query(args);

        const tenantId = cls.get('tenantId');
        if (!tenantId) {
            throw new ForbiddenException('No tenant context for this query');
        }

        if (['findMany', 'count', 'updateMany', 'deleteMany'].includes(operation)) {
            args.where = { ...args.where, tenantId };
        }

        if (operation === 'create') {
            args.data = { ...args.data, tenantId };
        }

        if (['findUnique', 'findFirst', 'update', 'delete'].includes(operation)) {
            const result = await query(args);
            if (result && result.tenantId !== tenantId) return null;
            return result;
        }

        return query(args);
    };
}

export function withTenantScoping(cls: ClsService) {
    const handler = scopedHandler(cls);
    return Prisma.defineExtension((client) =>
        client.$extends({
            name: 'tenant-scoping',
            query: {
                user: { $allOperations: handler },
                branch: { $allOperations: handler },
                apiKey: { $allOperations: handler },
            },
        }),
    );
}