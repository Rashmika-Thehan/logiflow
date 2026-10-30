import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { loadGatewayConfig } from './gateway.config';

@Controller('health')
export class HealthController {
    @Get()
    live() {
        return { status: 'ok', uptimeSeconds: Math.round(process.uptime()) };
    }

    // Any HTTP response (even a 401) means the process is up and accepting connections.
    // 'degraded' still returns 200: a gateway that can serve some routes shouldn't be restarted
    // in a loop because one backend is having trouble. Only "everything is down" returns 503.
    @Get('ready')
    async ready(@Res({ passthrough: true }) res: Response) {
        const { services } = loadGatewayConfig();
        const checks = await Promise.all(
            services.map(async (s) => {
                const started = Date.now();
                try {
                    await fetch(s.target, { signal: AbortSignal.timeout(1500) });
                    return [s.name, { up: true, ms: Date.now() - started }] as const;
                } catch {
                    return [s.name, { up: false }] as const;
                }
            }),
        );
        const up = checks.filter(([, r]) => r.up).length;
        const status = up === checks.length ? 'ok' : up === 0 ? 'down' : 'degraded';
        if (status === 'down') res.status(503);
        return { status, services: Object.fromEntries(checks) };
    }
}