import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

// CORS is set here, at runtime, because a @WebSocketGateway({ cors }) decorator is
// evaluated at import time, before ConfigModule has loaded .env.
export class CorsIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions) {
        const origin = (process.env.FRONTEND_URL ?? 'http://localhost:5173').split(
            ',',
        );
        return super.createIOServer(port, {
            ...options,
            cors: { origin, credentials: true },
            maxHttpBufferSize: 100_000, // a 100-ping batch is ~10 KB
        });
    }
}