import { Injectable } from '@nestjs/common';
import { DriverDirectoryPort, DriverCandidate } from './driver-directory.port';

/**
 * Stands in for driver-fleet-service + tracking-service, which don't exist
 * yet. Returns a fixed small fleet near Colombo so matching/timeout/scoring
 * logic is fully exercisable now. Swap this for an HTTP or Kafka-backed
 * adapter once driver-fleet-service is built — DriverDirectoryPort is the
 * only thing matching.service depends on, so nothing else needs to change.
 */
@Injectable()
export class StubDriverDirectoryService implements DriverDirectoryPort {
    private readonly fleet: DriverCandidate[] = [
        { driverId: 'stub-driver-1', status: 'AVAILABLE', lat: 6.9271, lng: 79.8612, maxWeightKg: 50, currentActiveAssignments: 0 },
        { driverId: 'stub-driver-2', status: 'AVAILABLE', lat: 6.9147, lng: 79.8730, maxWeightKg: 20, currentActiveAssignments: 1 },
        { driverId: 'stub-driver-3', status: 'BUSY', lat: 6.9355, lng: 79.8487, maxWeightKg: 100, currentActiveAssignments: 2 },
    ];

    async listCandidates(_tenantId: string): Promise<DriverCandidate[]> {
        return this.fleet;
    }
}