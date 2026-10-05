import { DriverCandidate } from '../drivers/driver-directory.port';

export interface ShipmentForMatching {
    weightKg: number;
    recipientLat: number | null;
    recipientLng: number | null;
}

export interface ScoredCandidate {
    driverId: string;
    score: number;
    breakdown: { proximity: number; capacity: number; workload: number };
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// FR-DSP-02: hard compatibility filters. A candidate failing any of these
// is never scored — it's simply not eligible, not just "low scoring."
export function isEligible(candidate: DriverCandidate, shipment: ShipmentForMatching): boolean {
    if (candidate.status !== 'AVAILABLE') return false;
    if (candidate.maxWeightKg < shipment.weightKg) return false;
    // Shift-covers-delivery-window check deferred — driver-fleet-service
    // doesn't model shifts in the stub yet; add once that service exists.
    return true;
}

const WEIGHTS = {
    proximity: Number(process.env.DSP_WEIGHT_PROXIMITY ?? 0.5),
    capacity: Number(process.env.DSP_WEIGHT_CAPACITY ?? 0.3),
    workload: Number(process.env.DSP_WEIGHT_WORKLOAD ?? 0.2),
};

// FR-DSP-03: S = w1*Proximity + w2*AvailableCapacity + w3*WorkloadBalance.
// Each term normalized to roughly [0, 1] so the weights are meaningfully
// comparable to each other.
export function scoreCandidate(candidate: DriverCandidate, shipment: ShipmentForMatching): ScoredCandidate {
    let proximity = 0.5; // neutral default if the shipment has no coordinates yet
    if (shipment.recipientLat != null && shipment.recipientLng != null) {
        const distanceKm = haversineKm(candidate.lat, candidate.lng, shipment.recipientLat, shipment.recipientLng);
        proximity = 1 / (1 + distanceKm); // closer => closer to 1
    }

    const capacity = Math.max(0, (candidate.maxWeightKg - shipment.weightKg) / candidate.maxWeightKg);
    const workload = 1 / (1 + candidate.currentActiveAssignments); // fewer active jobs => closer to 1

    const score =
        WEIGHTS.proximity * proximity + WEIGHTS.capacity * capacity + WEIGHTS.workload * workload;

    return { driverId: candidate.driverId, score, breakdown: { proximity, capacity, workload } };
}

export function rankCandidates(
    candidates: DriverCandidate[],
    shipment: ShipmentForMatching,
    excludeDriverIds: string[] = [],
): ScoredCandidate[] {
    return candidates
        .filter((c) => !excludeDriverIds.includes(c.driverId))
        .filter((c) => isEligible(c, shipment))
        .map((c) => scoreCandidate(c, shipment))
        .sort((a, b) => b.score - a.score);
}