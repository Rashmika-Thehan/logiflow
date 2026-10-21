export interface Ping { lat: number; lng: number; ts: number; speedKmh?: number; heading?: number; accuracyM?: number }

export const MAX_BATCH = 100;
// A far-future timestamp would make the monotonic check reject every real ping afterwards.
const MAX_FUTURE_MS = 30_000;
// Offline queues flush late, but not unboundedly.
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

// Hand-written on purpose: this runs once per ping at 1 Hz per driver, and
// class-transformer + class-validator would cost more than the Redis write.
export function parsePing(raw: any, now = Date.now()): Ping | null {
    if (!raw || typeof raw !== 'object') return null;
    const { lat, lng, ts, speedKmh, heading, accuracyM } = raw;
    if (!isNum(lat) || lat < -90 || lat > 90) return null;
    if (!isNum(lng) || lng < -180 || lng > 180) return null;
    if (!Number.isInteger(ts) || ts > now + MAX_FUTURE_MS || ts < now - MAX_AGE_MS) return null;

    const ping: Ping = { lat, lng, ts };
    if (isNum(speedKmh) && speedKmh >= 0 && speedKmh <= 400) ping.speedKmh = speedKmh;
    if (isNum(heading) && heading >= 0 && heading <= 360) ping.heading = heading;
    if (isNum(accuracyM) && accuracyM >= 0) ping.accuracyM = accuracyM;
    return ping;
}