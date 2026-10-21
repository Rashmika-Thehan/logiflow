import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DriverCandidate, DriverDirectoryPort } from './driver-directory.port';

@Injectable()
export class RealDriverDirectoryService implements DriverDirectoryPort {
    constructor(private readonly prisma: PrismaService) { }

    async listCandidates(tenantId: string): Promise<DriverCandidate[]> {
        const views = await this.prisma.driverCandidateView.findMany({ where: { tenantId } });
        const active = await this.prisma.assignment.groupBy({
            by: ['driverId'],
            where: { tenantId, status: { in: ['PENDING_ACCEPTANCE', 'ACCEPTED'] } },
            _count: { _all: true },
        });
        const counts = new Map<string | null, number>(active.map((a: any) => [a.driverId, a._count._all]));

        return views.map((v) => ({
            driverId: v.driverId,
            status: v.status as DriverCandidate['status'],
            lat: v.lat,
            lng: v.lng,
            maxWeightKg: v.maxWeightKg,
            currentActiveAssignments: counts.get(v.driverId) ?? 0,
        }));
    }
}
