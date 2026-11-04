import { ForbiddenException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

const WHERE_SCOPED_OPERATIONS = [
    'findMany', 'findFirst', 'findFirstOrThrow', 'findUnique', 'findUniqueOrThrow',
    'count', 'aggregate', 'groupBy', 'update', 'updateMany', 'delete', 'deleteMany', 'upsert',
];

function scopedHandler(cls: ClsService, ownerField?: string) {
    return async ({ operation, args, query }: any) => {
        const role = cls.get('role');
        if (role === 'SUPER_ADMIN') return query(args);

        const tenantId = cls.get('tenantId');
        if (!tenantId) throw new ForbiddenException('No tenant context for this query');

        if (WHERE_SCOPED_OPERATIONS.includes(operation)) {
            args.where = { ...args.where, tenantId };
            // A driver only ever touches rows that are theirs, even inside a tenant shared with other drivers
            // (the platform tenant holds every freelance driver).
            if (role === 'DRIVER' && ownerField) {
                const userId = cls.get('userId');
                if (!userId) throw new ForbiddenException('No user context for this query');
                // AND, not a spread: for the Driver model the owner field is `id`, and a spread would silently
                // swap the requested id for the caller's own.
                args.where = { ...args.where, AND: [{ [ownerField]: userId }, ...([] as any[]).concat(args.where.AND ?? [])] };
            }
        }

        if (operation === 'create') args.data = { ...args.data, tenantId };
        if (operation === 'createMany' || operation === 'createManyAndReturn') {
            args.data = ([] as any[]).concat(args.data).map((d: any) => ({ ...d, tenantId }));
        }
        if (operation === 'upsert') args.create = { ...args.create, tenantId };

        return query(args);
    };
}

// ownerFields: { model: field that holds the owning user's id }. Applies to callers with the DRIVER role only.
export function buildTenantScopingExtension(models: string[], cls: ClsService, ownerFields: Record<string, string> = {}) {
    // Prisma types `query` per model from the generated schema, and a runtime list of model names can't
    // satisfy that, so the result is asserted. (This is the assertion the earlier fix had.)
    return {
        name: 'tenant-scoping',
        query: Object.fromEntries(models.map((m) => [m, { $allOperations: scopedHandler(cls, ownerFields[m]) }])),
    } as any;
}
