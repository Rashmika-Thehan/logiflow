export interface ServiceRoute {
    name: string;
    target: string;
    prefixes: string[];        // public paths under /api/v1 that belong to this service
    streamPrefixes?: string[]; // long-lived responses (SSE): no upstream timeout
    proxyTimeoutMs: number;
}

export interface RateRule {
    name: string;
    windowMs: number;
    limit: number;
    match: (method: string, path: string) => boolean; // path is lowercased, without query or trailing slash
}

const upstream = (urlVar: string, portVar: string, fallbackPort: number) =>
    process.env[urlVar] ?? `http://127.0.0.1:${process.env[portVar] ?? fallbackPort}`;

const MIN = 60_000;

// Read at call time, not import time: .env is loaded by ConfigModule after this file is imported.
export function loadGatewayConfig() {
    const services: ServiceRoute[] = [
        {
            name: 'identity', target: upstream('IDENTITY_URL', 'IDENTITY_PORT', 3001), proxyTimeoutMs: 30_000,
            prefixes: ['auth', 'users', 'branches', 'api-keys', 'invitations', 'join-requests', 'tenant'],
        },
        { name: 'shipment', target: upstream('SHIPMENT_URL', 'SHIPMENT_PORT', 3002), proxyTimeoutMs: 60_000, prefixes: ['shipments'] },
        { name: 'dispatch', target: upstream('DISPATCH_URL', 'DISPATCH_PORT', 3003), proxyTimeoutMs: 30_000, prefixes: ['assignments'] },
        {
            name: 'driver', target: upstream('DRIVER_URL', 'DRIVER_PORT', 3004), proxyTimeoutMs: 30_000,
            prefixes: ['drivers', 'vehicles', 'assignment-offers', 'deliveries'],
        },
        { name: 'tracking', target: upstream('TRACKING_URL', 'TRACKING_PORT', 3005), proxyTimeoutMs: 30_000, prefixes: ['tracking'] },
        {
            name: 'notification', target: upstream('NOTIFICATION_URL', 'NOTIFICATION_PORT', 3006), proxyTimeoutMs: 30_000,
            prefixes: ['alerts'], streamPrefixes: ['alerts/stream'],
        },
    ];

    const rateRules: RateRule[] = [
        {
            name: 'auth', windowMs: MIN, limit: 30,
            match: (m, p) =>
                (m === 'POST' && /^\/api\/v1\/auth\/(login|register|refresh)$/.test(p)) ||
                (m === 'GET' && p.startsWith('/api/v1/auth/google')),
        },
        {
            name: 'public-onboarding', windowMs: MIN, limit: 20,
            match: (m, p) =>
                (m === 'POST' && (p === '/api/v1/join-requests' || p === '/api/v1/invitations/accept')) ||
                /^\/api\/v1\/join-requests\/[^/]+\/(status|verify-email|resend-code)$/.test(p),
        },
        { name: 'public-tracking', windowMs: MIN, limit: 120, match: (_m, p) => p.startsWith('/api/v1/shipments/track/') },
        { name: 'socket-polling', windowMs: MIN, limit: 900, match: (_m, p) => p.startsWith('/socket.io') },
    ];

    return {
        port: Number(process.env.GATEWAY_PORT ?? 3000),
        trustProxyHops: Number(process.env.TRUST_PROXY_HOPS ?? 0),
        allowedOrigins: (process.env.FRONTEND_URL ?? 'http://localhost:5173').split(',').map((s) => s.trim()).filter(Boolean),
        services,
        rateRules,
        defaultRate: { windowMs: MIN, limit: 600 },
        bodyLimits: [{ prefix: '/api/v1/shipments/batch-import', bytes: 11 * 1024 * 1024 }],
        defaultBodyBytes: 1024 * 1024,
        maxSocketsPerIp: 50,
    };
}