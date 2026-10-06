export interface DriverCandidate {
    driverId: string;
    status: 'AVAILABLE' | 'ON_BREAK' | 'BUSY' | 'OFFLINE';
    lat: number;
    lng: number;
    maxWeightKg: number;
    currentActiveAssignments: number;
}

export const DRIVER_DIRECTORY_PORT = 'DRIVER_DIRECTORY_PORT';

export interface DriverDirectoryPort {
    /** All candidates for a tenant, regardless of eligibility — filtering happens in matching.service. */
    listCandidates(tenantId: string): Promise<DriverCandidate[]>;
}