import { ForbiddenException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

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

export function buildTenantScopingExtension(models: string[], cls: ClsService) {
    return {
        name: 'tenant-scoping',
        query: Object.fromEntries(models.map((m) => [m, { $allOperations: scopedHandler(cls) }])) as any,
    };
}