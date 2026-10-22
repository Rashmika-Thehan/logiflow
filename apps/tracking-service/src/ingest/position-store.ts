import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@app/common';
import { haversineKm } from './eta';
import { Ping } from './ping';

const POS_TTL_SECONDS = 15 * 60;
const TRIPS_TTL_SECONDS = 24 * 60 * 60;
const STALE_MS = 2 * 60 * 1000; // a driver unheard-from for 2 minutes isn't "nearby"
const SCAN_LIMIT = 200;

// One geo set per tenant (members are driver ids): a radius query can only ever see its own
// tenant's drivers. 'free' is reserved for a future freelance pool.
export const geoKey = (tenantId: string | null) => (tenantId ? `trk:geo:t:${tenantId}` : 'trk:geo:free');
export const posKey = (driverId: string) => `trk:pos:${driverId}`;
export const tripsKey = (driverId: string) => `trk:trips:${driverId}`;

// Atomic "only move forward": compares the stored device timestamp and, if the
// new ping is newer, updates the hash and the geo set in one round trip.
// KEYS: pos hash, geo set, trips hash
// ARGV: ts, lat, lng, speed, heading, tenantId, ttl, driverId, seenAt
const UPDATE_POSITION = `
local prevTs = tonumber(redis.call('HGET', KEYS[1], 'ts'))
if prevTs and prevTs >= tonumber(ARGV[1]) then return {0} end
local speed = tonumber(ARGV[4])
local avg = tonumber(redis.call('HGET', KEYS[1], 'avgSpeed'))
if speed >= 3 then
  if avg then avg = avg * 0.8 + speed * 0.2 else avg = speed end
end
redis.call('HSET', KEYS[1], 'ts', ARGV[1], 'lat', ARGV[2], 'lng', ARGV[3], 'speed', ARGV[4], 'heading', ARGV[5], 'tenantId', ARGV[6], 'seen', ARGV[9])
if avg then redis.call('HSET', KEYS[1], 'avgSpeed', tostring(avg)) end
redis.call('EXPIRE', KEYS[1], ARGV[7])
redis.call('GEOADD', KEYS[2], ARGV[3], ARGV[2], ARGV[8])
local trips = redis.call('HGETALL', KEYS[3])
local out = {1, avg and tostring(avg) or ''}
for i = 1, #trips do out[#out + 1] = trips[i] end
return out
`;

export interface ActiveTrip { shipmentId: string; destLat?: number; destLng?: number }
export interface PositionResult { accepted: boolean; avgSpeedKmh?: number; trips: ActiveTrip[] }
export interface NearbyDriver {
    driverId: string; distanceKm: number; lat: number; lng: number;
    lastSeenSecondsAgo: number; speedKmh: number; heading: number | null; status: string | null;
}

function parseDest(value: unknown): { destLat?: number; destLng?: number } {
    const [a, b] = String(value ?? '').split(',');
    if (!a || !b) return {};
    const lat = Number(a), lng = Number(b);
    return Number.isFinite(lat) && Number.isFinite(lng) ? { destLat: lat, destLng: lng } : {};
}

@Injectable()
export class PositionStore implements OnModuleInit {
    constructor(private readonly redis: RedisService) { }

    onModuleInit() {
        this.redis.defineCommand('trkUpdatePosition', { numberOfKeys: 3, lua: UPDATE_POSITION });
    }

    async update(driverId: string, tenantId: string, p: Ping): Promise<PositionResult> {
        const res = await (this.redis as any).trkUpdatePosition(
            posKey(driverId), geoKey(tenantId), tripsKey(driverId),
            String(p.ts), String(p.lat), String(p.lng), String(p.speedKmh ?? 0), String(p.heading ?? -1),
            tenantId, String(POS_TTL_SECONDS), driverId, String(Date.now()),
        );
        if (!res || res[0] !== 1) return { accepted: false, trips: [] };

        const trips: ActiveTrip[] = [];
        for (let i = 2; i + 1 < res.length; i += 2) {
            trips.push({ shipmentId: res[i], ...parseDest(res[i + 1]) });
        }
        return { accepted: true, avgSpeedKmh: res[1] ? Number(res[1]) : undefined, trips };
    }

    async setStatus(driverId: string, status: string) {
        await this.redis.multi().hset(posKey(driverId), 'status', status).expire(posKey(driverId), POS_TTL_SECONDS).exec();
    }

    async addTrip(driverId: string, shipmentId: string, destLat?: number, destLng?: number) {
        const value = destLat != null && destLng != null ? `${destLat},${destLng}` : '';
        await this.redis.multi().hset(tripsKey(driverId), shipmentId, value).expire(tripsKey(driverId), TRIPS_TTL_SECONDS).exec();
    }

    async removeTrip(driverId: string, shipmentId: string) {
        await this.redis.hdel(tripsKey(driverId), shipmentId);
    }

    // The tenant check means a wrong-tenant id looks exactly like "no such driver".
    async get(driverId: string, tenantId: string) {
        const h = await this.redis.hgetall(posKey(driverId));
        if (!h.ts || h.tenantId !== tenantId) return null;
        return {
            driverId,
            lat: Number(h.lat), lng: Number(h.lng), ts: Number(h.ts),
            speedKmh: Number(h.speed),
            heading: Number(h.heading) >= 0 ? Number(h.heading) : null,
            avgSpeedKmh: h.avgSpeed ? Number(h.avgSpeed) : undefined,
            lastSeenSecondsAgo: Math.round((Date.now() - Number(h.seen)) / 1000),
            status: h.status ?? null,
        };
    }

    // FR-TRK-04, radius form.
    async nearby(tenantId: string, lat: number, lng: number, radiusKm: number, limit: number) {
        const rows = (await this.redis.geosearch(
            geoKey(tenantId), 'FROMLONLAT', lng, lat, 'BYRADIUS', radiusKm, 'km', 'ASC', 'COUNT', SCAN_LIMIT, 'WITHDIST',
        )) as unknown as [string, string][];
        return this.hydrate(tenantId, rows, limit);
    }

    // FR-TRK-04, bounding-box form.
    async inBox(tenantId: string, minLat: number, minLng: number, maxLat: number, maxLng: number, limit: number) {
        const cLat = (minLat + maxLat) / 2;
        const cLng = (minLng + maxLng) / 2;
        const width = haversineKm(cLat, minLng, cLat, maxLng);
        const height = haversineKm(minLat, cLng, maxLat, cLng);
        const rows = (await this.redis.geosearch(
            geoKey(tenantId), 'FROMLONLAT', cLng, cLat, 'BYBOX', width, height, 'km', 'ASC', 'COUNT', SCAN_LIMIT, 'WITHDIST',
        )) as unknown as [string, string][];
        return this.hydrate(tenantId, rows, limit);
    }

    private async hydrate(tenantId: string, rows: [string, string][], limit: number): Promise<NearbyDriver[]> {
        if (rows.length === 0) return [];
        const pipe = this.redis.pipeline();
        for (const [id] of rows) pipe.hmget(posKey(id), 'lat', 'lng', 'speed', 'heading', 'status', 'seen');
        const results = await pipe.exec();

        const now = Date.now();
        const out: NearbyDriver[] = [];
        const zombies: string[] = [];
        rows.forEach(([id, dist], i) => {
            const [err, vals] = (results?.[i] ?? [new Error('no result'), null]) as [Error | null, (string | null)[] | null];
            if (err || !vals) return;
            const [lat, lng, speed, heading, status, seen] = vals;
            if (lat === null || seen === null) { zombies.push(id); return; } // hash expired: gone silent long ago
            if (now - Number(seen) > STALE_MS) return;
            if (status === 'OFFLINE') return;
            out.push({
                driverId: id,
                distanceKm: Math.round(Number(dist) * 100) / 100,
                lat: Number(lat), lng: Number(lng),
                lastSeenSecondsAgo: Math.round((now - Number(seen)) / 1000),
                speedKmh: Number(speed),
                heading: Number(heading) >= 0 ? Number(heading) : null,
                status: status ?? null,
            });
        });
        if (zombies.length) void this.redis.zrem(geoKey(tenantId), ...zombies);
        return out.slice(0, limit);
    }
}