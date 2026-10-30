import type { IncomingMessage, ServerResponse } from 'http';

// Express matches routes case-insensitively, so rules are matched against a normalized path.
// Otherwise /api/v1/AUTH/login or a trailing slash would slip past the strict tiers.
export function normalizePath(url: string) {
    return url.split('?')[0].toLowerCase().replace(/\/+$/, '') || '/';
}

// The client address as the gateway sees it. X-Forwarded-For is only believed for hops we run ourselves.
export function clientIp(req: IncomingMessage, trustedHops: number): string {
    let ip = req.socket.remoteAddress ?? 'unknown';
    if (trustedHops > 0) {
        const chain = String(req.headers['x-forwarded-for'] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
        ip = chain[chain.length - trustedHops] ?? ip; // the Nth address from the right was appended by our outermost trusted proxy
    }
    // The IPv4-mapped form would never match an allowlist entry like 203.0.113.7.
    return ip.replace(/^::ffff:/, '');
}

export function sendError(res: ServerResponse & { locals?: any }, status: number, error: string, message: string) {
    if (res.headersSent) return;
    res.statusCode = status;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ statusCode: status, error, message, requestId: res.locals?.requestId }));
}