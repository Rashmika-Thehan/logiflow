import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

// The scoping extension puts tenantId into every update/delete, so another tenant's id
// matches nothing and Prisma throws P2025. A wrong-tenant id should look exactly like a
// missing one: 404, not 500.
@Injectable()
export class PrismaNotFoundInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) =>
                err?.code === 'P2025' ? throwError(() => new NotFoundException('Resource not found')) : throwError(() => err),
            ),
        );
    }
}