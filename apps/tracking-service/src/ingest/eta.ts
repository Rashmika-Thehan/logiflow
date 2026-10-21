export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DETOUR_FACTOR = 1.3; // roads are longer than the straight line
const DEFAULT_SPEED_KMH = 30;

export interface Eta { distanceKm: number; minutes: number; at: string }

// An estimate, not routing. Replace with a routing API behind this function when you want real ETAs.
export function estimateEta(fromLat: number, fromLng: number, toLat: number, toLng: number, avgSpeedKmh?: number): Eta {
    const distanceKm = haversineKm(fromLat, fromLng, toLat, toLng) * DETOUR_FACTOR;
    const speed = Math.min(80, Math.max(10, avgSpeedKmh ?? DEFAULT_SPEED_KMH));
    const minutes = Math.max(1, Math.round((distanceKm / speed) * 60));
    return { distanceKm: Math.round(distanceKm * 10) / 10, minutes, at: new Date(Date.now() + minutes * 60_000).toISOString() };
}