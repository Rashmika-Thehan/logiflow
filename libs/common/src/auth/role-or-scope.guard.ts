import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { SCOPES_KEY } from './scope.guard';

@Injectable()
export class RoleOrScopeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Route declared neither — nothing for this guard to enforce.
        if (!requiredRoles && !requiredScopes) return true;

        const { user } = context.switchToHttp().getRequest();

        // Session caller: role present, matches one of the required roles.
        if (requiredRoles && user?.role && requiredRoles.includes(user.role)) {
            return true;
        }
        // API-key caller: scopes present, covers every required scope.
        if (requiredScopes && user?.scopes && requiredScopes.every((s: string) => user.scopes.includes(s))) {
            return true;
        }

        throw new ForbiddenException('Insufficient role or scope for this action');
    }
}