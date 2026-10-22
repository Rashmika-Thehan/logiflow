import { OnGatewayConnection, OnGatewayInit, ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { MAX_BATCH } from '../ingest/ping';
import { IngestionService } from '../ingest/ingestion.service';
import { estimateEta } from '../ingest/eta';
import { PositionStore } from '../ingest/position-store';
import { TripsService } from '../trips/trips.service';
import { Principal, WsAuthService } from '../ws/ws-auth.service';
import { LiveFeed } from './live-feed';

// Sockets outlive nothing: when the access token expires the server drops the
// connection and the client reconnects with a fresh one.
function disconnectAtExpiry(socket: Socket, exp?: number) {
    if (!exp) return;
    const timer = setTimeout(() => { socket.emit('auth_expired'); socket.disconnect(true); }, Math.max(exp * 1000 - Date.now(), 0));
    socket.once('disconnect', () => clearTimeout(timer));
}

const authMiddleware = (auth: WsAuthService, roles: string[]) =>
    async (socket: Socket, next: (err?: Error) => void) => {
        try {
            const p = await auth.authenticate(socket.handshake);
            if (!p.role || !roles.includes(p.role) || !p.tenantId) return next(new Error('forbidden'));
            socket.data.principal = p;
            disconnectAtExpiry(socket, p.exp);
            next();
        } catch {
            next(new Error('unauthorized'));
        }
    };

// ---- drivers send pings (FR-TRK-01) ----
@WebSocketGateway({ namespace: '/ingest' })
export class IngestGateway implements OnGatewayInit {
    constructor(private readonly auth: WsAuthService, private readonly ingestion: IngestionService) { }

    afterInit(ns: Namespace) { ns.use(authMiddleware(this.auth, ['DRIVER'])); }

    // socket.emit('ping', { pings: [...] }, (ack) => ...): the ack tells the client what was stored.
    @SubscribeMessage('ping')
    async onPing(@ConnectedSocket() socket: Socket, @MessageBody() body: unknown) {
        const p = socket.data.principal as Principal;
        const items = Array.isArray(body) ? body : Array.isArray((body as any)?.pings) ? (body as any).pings : [body];
        if (items.length > MAX_BATCH) return { error: `Batch too large (max ${MAX_BATCH})` };
        return this.ingestion.ingest({ driverId: p.userId, tenantId: p.tenantId! }, items);
    }
}

// ---- dispatcher dashboards: every driver in their tenant (FR-TRK-08) ----
@WebSocketGateway({ namespace: '/live' })
export class LiveGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(private readonly auth: WsAuthService, private readonly feed: LiveFeed) { }

    afterInit(ns: Namespace) {
        ns.use(authMiddleware(this.auth, ['DISPATCHER', 'BUSINESS_ADMIN']));
        this.feed.positions$.subscribe((u) =>
            ns.to(`tenant:${u.tenantId}`).emit('position', {
                driverId: u.driverId, lat: u.lat, lng: u.lng, ts: u.ts, speedKmh: u.speedKmh, heading: u.heading,
            }),
        );
    }

    handleConnection(socket: Socket) {
        socket.join(`tenant:${(socket.data.principal as Principal).tenantId}`);
    }
}

// ---- public recipient page (FR-TRK-08) ----
@WebSocketGateway({ namespace: '/track' })
export class TrackGateway implements OnGatewayInit {
    constructor(
        private readonly feed: LiveFeed,
        private readonly trips: TripsService,
        private readonly positions: PositionStore,
    ) { }

    afterInit(ns: Namespace) {
        this.feed.positions$.subscribe((u) => {
            for (const t of u.trips) {
                // Deliberately no driverId, no speed: the recipient sees a dot and an ETA.
                ns.to(`trip:${t.shipmentId}`).emit('position', { lat: u.lat, lng: u.lng, ts: u.ts, heading: u.heading, eta: t.eta });
            }
        });
        this.feed.tripEnded$.subscribe(({ shipmentId, status }) => {
            const room = `trip:${shipmentId}`;
            ns.to(room).emit('ended', { status });
            ns.in(room).socketsLeave(room);
        });
    }

    @SubscribeMessage('subscribe')
    async subscribe(@ConnectedSocket() socket: Socket, @MessageBody() body: { trackingCode?: string }) {
        // The tracking code is the credential here, so cap guesses per connection.
        socket.data.attempts = (socket.data.attempts ?? 0) + 1;
        if (socket.data.attempts > 5) { socket.disconnect(true); return { ok: false }; }

        const code = typeof body?.trackingCode === 'string' ? body.trackingCode.trim().toUpperCase() : '';
        if (!/^LF-[0-9A-F]{12}$/.test(code)) return { ok: false, error: 'invalid_tracking_code' };

        const trip = await this.trips.findPublicByTrackingCode(code);
        if (!trip) return { ok: false, error: 'not_found' };
        // A driver's location is only shared while the package is actually out for delivery.
        if (trip.status !== 'IN_TRANSIT' || !trip.driverId) return { ok: true, live: false, status: trip.status };

        if (socket.data.room) await socket.leave(socket.data.room);
        socket.data.room = `trip:${trip.shipmentId}`;
        await socket.join(socket.data.room);

        // Send the current position immediately so the page isn't blank until the next ping.
        const pos = await this.positions.get(trip.driverId, trip.tenantId);
        if (pos) {
            socket.emit('position', {
                lat: pos.lat, lng: pos.lng, ts: pos.ts, heading: pos.heading,
                eta: trip.destLat != null && trip.destLng != null
                    ? estimateEta(pos.lat, pos.lng, trip.destLat, trip.destLng, pos.avgSpeedKmh)
                    : undefined,
            });
        }
        return { ok: true, live: true, status: trip.status };
    }
}