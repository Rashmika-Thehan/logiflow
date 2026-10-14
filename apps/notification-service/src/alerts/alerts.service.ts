import { Inject, Injectable, MessageEvent, NotFoundException } from '@nestjs/common';
import { Observable, Subject, filter, interval, map, merge } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { TENANT_PRISMA } from '../prisma/prisma.module';

@Injectable()
export class AlertsService {
    // In-process fan-out to open SSE connections. Fine for one instance; several
    // instances would need Redis pub/sub here.
    private readonly bus = new Subject<{ tenantId: string; alert: unknown }>();

    constructor(
        private readonly prisma: PrismaService, // unscoped: consumers run outside any request
        @Inject(TENANT_PRISMA) private readonly db: any, // scoped: what a dispatcher reads
    ) { }

    async create(input: {
        dedupeKey: string;
        tenantId: string;
        severity: 'INFO' | 'WARNING' | 'CRITICAL';
        title: string;
        body: string;
        shipmentId?: string;
    }) {
        try {
            const alert = await this.prisma.inAppNotification.create({ data: input });
            this.bus.next({ tenantId: input.tenantId, alert });
        } catch (err: any) {
            if (err.code === 'P2002') return; // the same event delivered twice
            throw err;
        }
    }

    list(includeAcknowledged: boolean) {
        return this.db.inAppNotification.findMany({
            where: includeAcknowledged ? {} : { acknowledgedAt: null },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }

    async acknowledge(id: string, userId: string) {
        const result = await this.db.inAppNotification.updateMany({
            where: { id, acknowledgedAt: null },
            data: { acknowledgedAt: new Date(), acknowledgedById: userId },
        });
        if (result.count === 0) throw new NotFoundException('No unacknowledged alert with that id');
        return { id, acknowledged: true };
    }

    streamFor(tenantId: string): Observable<MessageEvent> {
        const alerts$ = this.bus.pipe(
            filter((e) => e.tenantId === tenantId),
            map((e) => ({ type: 'alert', data: e.alert }) as MessageEvent),
        );
        // A comment-style ping keeps idle proxies from closing the connection.
        const keepAlive$ = interval(25_000).pipe(map(() => ({ type: 'ping', data: 'ping' }) as MessageEvent));
        return merge(alerts$, keepAlive$);
    }
}