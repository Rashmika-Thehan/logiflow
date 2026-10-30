import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { RateRule } from './gateway.config';
import { normalizePath, sendError } from './http-utils';

const logger = new Logger('Gateway');
const SAFE_ID = /^[A-Za-z0-9._-]{8,64}$/;
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function requestContext(req: Request, res: Response, next: NextFunction) {
    const incoming = req.headers['x-request-id'];
    const id = typeof incoming === 'string' && SAFE_ID.test(incoming) ? incoming : randomUUID();
    req.headers['x-request-id'] = id;
    res.locals.requestId = id;
    res.setHeader('x-request-id', id);

    const started = process.hrtime.bigint();
    res.on('finish', () => {
        const ms = Number(process.hrtime.bigint() - started) / 1e6;
        const path = req.originalUrl.split('?')[0]; // never the query string: OAuth callbacks carry codes there
        logger.log(`${id} ${req.method} ${path} -> ${res.statusCode} ${ms.toFixed(0)}ms${res.locals.service ? ` [${res.locals.service}]` : ''}`);
    });
    next();
}

export function tieredRateLimit(rules: RateRule[], fallback: { windowMs: number; limit: number }) {
    const make = (windowMs: number, limit: number) =>
        rateLimit({
            windowMs, limit,
            standardHeaders: 'draft-7',
            legacyHeaders: false,
            handler: (_req, res) => sendError(res, 429, 'Too Many Requests', 'Too many requests. Please slow down and retry shortly.'),
        });
    const tiers = rules.map((rule) => ({ rule, run: make(rule.windowMs, rule.limit) }));
    const general = make(fallback.windowMs, fallback.limit);

    return (req: Request, res: Response, next: NextFunction) => {
        const path = normalizePath(req.originalUrl);
        const tier = tiers.find((t) => t.rule.match(req.method, path));
        (tier ? tier.run : general)(req, res, next);
    };
}

// CSRF defence for cookie auth. Non-browser clients send no Origin and can't be CSRF'd;
// browsers always send one on cross-origin writes.
export function originGuard(allowed: Set<string>) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (SAFE_METHODS.has(req.method)) return next();
        const origin = req.headers.origin;
        if (origin !== undefined && !allowed.has(origin)) return sendError(res, 403, 'Forbidden', 'Origin not allowed');
        next();
    };
}

// Bodies stream straight through, so the limit is enforced from Content-Length. The services keep their own limits.
export function bodyLimit(rules: { prefix: string; bytes: number }[], defaultBytes: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!BODY_METHODS.has(req.method)) return next();
        const max = rules.find((r) => normalizePath(req.originalUrl).startsWith(r.prefix))?.bytes ?? defaultBytes;
        const length = req.headers['content-length'];
        if (length === undefined) {
            if (req.headers['transfer-encoding']) return sendError(res, 411, 'Length Required', 'Content-Length is required');
            return next(); // no body
        }
        const bytes = Number(length);
        if (!Number.isFinite(bytes)) return sendError(res, 400, 'Bad Request', 'Invalid Content-Length');
        if (bytes > max) return sendError(res, 413, 'Payload Too Large', `Request body exceeds ${max} bytes`);
        next();
    };
}