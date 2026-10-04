import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RequireScopes } from './scope.guard';
import { RoleOrScopeGuard } from './role-or-scope.guard';

interface AuthOptions {
    roles?: string[];
    scopes?: string[];
}

/** Allows a route via session role OR API-key scope — whichever the caller presents. */
export function Auth({ roles, scopes }: AuthOptions) {
    const decorators = [UseGuards(RoleOrScopeGuard)];
    if (roles?.length) decorators.push(Roles(...roles));
    if (scopes?.length) decorators.push(RequireScopes(...scopes));
    return applyDecorators(...decorators);
}