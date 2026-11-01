import { Logger } from '@nestjs/common';
import { ServerResponse } from 'http';
import type { ClientRequest, IncomingMessage } from 'http';
import type { Socket } from 'net';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { clientIp, sendError } from './http-utils';

const logger = new Logger('Proxy');

interface ProxyOptions {
    target: string;
    trustedHops: number;
    proxyTimeoutMs: number; // 0 = none (streams)
    rewriteApiPrefix: boolean;
}

// Overwrite, never append: a client-supplied X-Forwarded-For must not reach the services.
// identity-service's API-key IP allowlist and its per-IP throttles trust this header.
function forwardingHeaders(proxyReq: ClientRequest, req: IncomingMessage, trustedHops: number) {
    proxyReq.setHeader('x-forwarded-for', clientIp(req, trustedHops));
    proxyReq.setHeader('x-forwarded-proto', (req as any).protocol ?? 'http');
    proxyReq.removeHeader('x-forwarded-host');
    proxyReq.removeHeader('x-forwarded-port');
    proxyReq.removeHeader('forwarded');
}

function handleError(err: NodeJS.ErrnoException, _req: IncomingMessage, res: ServerResponse | Socket) {
    if (!(res instanceof ServerResponse)) { res.destroy(); return; } // a failed WebSocket upgrade: nothing to reply with

    logger.warn(`${(res as any).locals?.requestId ?? '-'} upstream error ${err.code ?? err.message}`);
    if (res.headersSent) { res.end(); return; }

    if (['ECONNREFUSED', 'ENOTFOUND', 'EHOSTUNREACH'].includes(err.code ?? '')) {
        return sendError(res as any, 503, 'Service Unavailable', 'This service is temporarily unavailable.');
    }
    if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
        return sendError(res as any, 504, 'Gateway Timeout', 'The service took too long to respond.');
    }
    return sendError(res as any, 502, 'Bad Gateway', 'The service could not complete the request.');
}

export function createServiceProxy(o: ProxyOptions) {
    return createProxyMiddleware({
        target: o.target,
        // When mounted under /api/v1/<prefix>, the full original path is what gets rewritten.
        ...(o.rewriteApiPrefix ? { pathRewrite: { '^/api/v1': '' } } : {}),
        proxyTimeout: o.proxyTimeoutMs,
        timeout: o.proxyTimeoutMs ? o.proxyTimeoutMs + 5_000 : 0,
        on: {
            proxyReq: (proxyReq, req) => forwardingHeaders(proxyReq, req, o.trustedHops),
            proxyReqWs: (proxyReq, req) => forwardingHeaders(proxyReq, req, o.trustedHops),
            proxyRes: (proxyRes) => {
                // The gateway owns CORS. Upstream CORS headers would replace ours when copied onto the
                // response, and two sources of truth make browsers reject it.
                for (const h of Object.keys(proxyRes.headers)) if (h.startsWith('access-control-')) delete proxyRes.headers[h];
                delete proxyRes.headers['x-powered-by'];
                const vary = proxyRes.headers.vary;
                proxyRes.headers.vary = vary ? `Origin, ${vary}` : 'Origin'; // responses depend on Origin, so caches must key on it
            },
            error: (err, req, res) => handleError(err as NodeJS.ErrnoException, req, res as ServerResponse | Socket),
        },
    });
}