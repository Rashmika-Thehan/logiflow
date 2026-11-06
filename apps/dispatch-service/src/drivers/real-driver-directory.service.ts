import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DriverCandidate, DriverDirectoryPort } from './driver-directory.port';
import { PLATFORM_TENANT_ID } from '@app/contracts';

@Injectable()
export class RealDriverDirectoryService implements DriverDirectoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async listCandidates(tenantId: string, opts: { includePlatform?: boolean } = {}): Promise<DriverCandidate[]> {
        const tenants = opts.includePlatform ? [tenantId, PLATFORM_TENANT_ID] : [tenantId];
        const views = await this.prisma.driverCandidateView.findMany({ where: { tenantId: { in: tenants } } });

        // Workload is counted per driver across ALL tenants: a platform driver's other jobs belong to other businesses.
        const ids = views.map((v) => v.driverId);
        const active = ids.length
            ? await this.prisma.assignment.groupBy({
                by: ['driverId'],
                where: { driverId: { in: ids }, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
                _count: { _all: true },
            })
            : [];
        const counts = new Map<string | null, number>(active.map((a) => [a.driverId, a._count._all]));

        return views.map((v) => ({
            driverId: v.driverId,
            status: v.status as DriverCandidate['status'],
            lat: v.lat, lng: v.lng,
            maxWeightKg: v.maxWeightKg,
            currentActiveAssignments: counts.get(v.driverId) ?? 0,
            pool: v.tenantId === PLATFORM_TENANT_ID ? 'PLATFORM' : 'OWN',
        }));
    }
}
