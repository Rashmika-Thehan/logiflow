export type DriverPool = 'OWN' | 'PLATFORM';

export interface DriverCandidate {
    driverId: string;
    status: 'AVAILABLE' | 'ON_BREAK' | 'BUSY' | 'OFFLINE';
    lat: number | null;
    lng: number | null;
    maxWeightKg: number;
    currentActiveAssignments: number;
    pool: DriverPool;
}

export const DRIVER_DIRECTORY_PORT = 'DRIVER_DIRECTORY_PORT';

export interface DriverDirectoryPort {
    /** All candidates for a tenant, regardless of eligibility — filtering happens in matching.service. */
    listCandidates(tenantId: string, opts?: { includePlatform?: boolean }): Promise<DriverCandidate[]>;
}