import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        // No authenticated user → either a @Public() route or JwtAuthGuard already
        // rejected it. Not this guard's concern either way.
        if (!user) return true;

        // SUPER_ADMIN is platform-level by design, never tenant-scoped.
        if (user.role === 'SUPER_ADMIN') return true;

        // Every other role must carry a tenantId. Fail closed if it's missing.
        if (!user.tenantId) {
            throw new ForbiddenException('No tenant context on this account');
        }

        return true;
    }
}