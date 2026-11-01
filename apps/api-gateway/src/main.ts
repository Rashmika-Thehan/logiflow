import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import helmet from 'helmet';
import { ApiGatewayModule } from './api-gateway.module';
import { loadGatewayConfig } from './gateway.config';
import { clientIp, sendError } from './http-utils';
import { bodyLimit, originGuard, requestContext, tieredRateLimit } from './middleware';
import { createServiceProxy } from './proxy.factory';

async function bootstrap() {
  // bodyParser: false is deliberate. A parsed body can't be proxied (the stream is already
  // consumed), and streaming keeps CSV uploads out of the gateway's memory.
  const app = await NestFactory.create<NestExpressApplication>(ApiGatewayModule, { bodyParser: false });
  const cfg = loadGatewayConfig();
  const logger = new Logger('Gateway');
  const allowed = new Set(cfg.allowedOrigins);

  app.disable('x-powered-by');
  app.set('trust proxy', cfg.trustProxyHops); // 0 = trust nobody; 1 = behind one TLS proxy
  app.enableShutdownHooks();

  app.use(requestContext);
  app.use(helmet({ contentSecurityPolicy: false })); // an API: no HTML to protect with a CSP
  app.use(cors({
    origin: (origin, cb) => cb(null, origin === undefined || allowed.has(origin)),
    credentials: true,
    maxAge: 600,
    exposedHeaders: ['x-request-id', 'retry-after', 'ratelimit', 'ratelimit-policy'],
  })); // answers preflights itself; they never reach a service
  app.use(
    ['/api/v1', '/socket.io'],
    tieredRateLimit(cfg.rateRules, cfg.defaultRate),
    originGuard(allowed),
    bodyLimit(cfg.bodyLimits, cfg.defaultBodyBytes),
  );

  // ---- REST: /api/v1/<prefix>/... -> service ----
  const tag = (name: string) => (_req: any, res: any, next: () => void) => { res.locals.service = name; next(); };
  for (const svc of cfg.services) {
    const base = { target: svc.target, trustedHops: cfg.trustProxyHops, rewriteApiPrefix: true };
    // streams first: the more specific path has to be mounted before its parent prefix
    for (const p of svc.streamPrefixes ?? []) {
      app.use(`/api/v1/${p}`, tag(svc.name), createServiceProxy({ ...base, proxyTimeoutMs: 0 }));
    }
    const proxy = createServiceProxy({ ...base, proxyTimeoutMs: svc.proxyTimeoutMs });
    for (const p of svc.prefixes) app.use(`/api/v1/${p}`, tag(svc.name), proxy);
  }

  // ---- Socket.IO (polling over HTTP; WebSocket upgrades handled below) ----
  const tracking = cfg.services.find((s) => s.name === 'tracking')!;
  const socketProxy = createServiceProxy({
    target: tracking.target, trustedHops: cfg.trustProxyHops, proxyTimeoutMs: 0, rewriteApiPrefix: false,
  });
  app.use('/socket.io', tag('tracking'), socketProxy);

  app.use('/api/v1', (_req, res) => sendError(res, 404, 'Not Found', 'No such API route.'));

  // ---- WebSocket upgrades bypass Express middleware, so the checks live here ----
  const server = app.getHttpServer();
  const openSockets = new Map<string, number>();
  server.on('upgrade', (req, socket, head) => {
    socket.on('error', () => socket.destroy());

    // Not an open WebSocket proxy: only the Socket.IO path is forwarded.
    if (!req.url?.startsWith('/socket.io/')) return socket.destroy();

    // Socket.IO doesn't enforce Origin on the WebSocket transport, so a malicious page could
    // open a cookie-authenticated socket (cross-site WebSocket hijacking). Block it here.
    const origin = req.headers.origin;
    if (origin !== undefined && !allowed.has(origin)) {
      socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
      return socket.destroy();
    }

    const ip = clientIp(req, cfg.trustProxyHops);
    const open = openSockets.get(ip) ?? 0;
    if (open >= cfg.maxSocketsPerIp) {
      socket.write('HTTP/1.1 429 Too Many Requests\r\n\r\n');
      return socket.destroy();
    }
    openSockets.set(ip, open + 1);
    socket.once('close', () => {
      const left = (openSockets.get(ip) ?? 1) - 1;
      if (left <= 0) openSockets.delete(ip); else openSockets.set(ip, left);
    });

    req.headers['x-request-id'] = randomUUID();
    (socketProxy as any).upgrade(req, socket, head);
  });

  // Longer than a typical proxy's idle timeout, so a reverse proxy never reuses a connection we just closed.
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;

  await app.listen(cfg.port);
  logger.log(`(trusting ${cfg.trustProxyHops} proxy hop(s))`);
  console.log("===============================================");
  console.log("Api-Gateway is running on port ", process.env.GATEWAY_PORT ?? 3000);
  console.log("===============================================");
  for (const s of cfg.services) {
    logger.log(`  ${s.prefixes.map((p) => `/api/v1/${p}`).join(', ')} -> ${s.name} ${s.target}`);
  }
}
bootstrap();
