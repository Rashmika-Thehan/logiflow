import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
    constructor() {
        super({
            host: process.env.REDIS_HOST ?? 'localhost',
            port: Number(process.env.REDIS_PORT ?? 6379),
        });
    }

    onModuleDestroy() {
        this.disconnect();
    }

    blacklistToken(jti: string, ttlSeconds: number) {
        return this.set(`blacklist:${jti}`, '1', 'EX', ttlSeconds);
    }

    async isBlacklisted(jti: string) {
        return (await this.exists(`blacklist:${jti}`)) === 1;
    }
}