import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (user) {
            this.cls.set('tenantId', user.tenantId ?? null);
            this.cls.set('role', user.role);
            this.cls.set('userId', user.userId);
        }

        return next.handle();
    }
}