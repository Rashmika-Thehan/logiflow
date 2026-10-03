//the scope-based counterpart to RolesGuard, for routes meant to be driven by API keys

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

export const SCOPES_KEY = 'scopes';
export const RequireScopes = (...scopes: string[]) => SetMetadata(SCOPES_KEY, scopes);

@Injectable()
export class ScopesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!required) return true;

        const { user } = context.switchToHttp().getRequest();
        const scopes: string[] = user?.scopes ?? [];
        return required.every((s) => scopes.includes(s));
    }
}