import { ForbiddenException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

const WHERE_SCOPED_OPERATIONS = [
    'findMany', 'findFirst', 'findFirstOrThrow', 'findUnique', 'findUniqueOrThrow',
    'count', 'aggregate', 'groupBy',
    'update', 'updateMany', 'delete', 'deleteMany', 'upsert',
];

function scopedHandler(cls: ClsService) {
    return async ({ operation, args, query }: any) => {
        const role = cls.get('role');
        if (role === 'SUPER_ADMIN') return query(args);

        const tenantId = cls.get('tenantId');
        if (!tenantId) {
            throw new ForbiddenException('No tenant context for this query');
        }

        // tenantId goes into `where` before the query runs — not checked on the
        // result afterward. A write to a row outside this tenant now simply
        // matches zero rows, instead of running against the real row first.
        if (WHERE_SCOPED_OPERATIONS.includes(operation)) {
            args.where = { ...args.where, tenantId };
        }

        if (operation === 'create') {
            args.data = { ...args.data, tenantId };
        }
        if (operation === 'createMany') {
            args.data = [].concat(args.data).map((d: any) => ({ ...d, tenantId }));
        }
        if (operation === 'upsert') {
            args.create = { ...args.create, tenantId };
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