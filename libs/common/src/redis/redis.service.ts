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

    // Atomic claim-and-blacklist: whichever concurrent caller reaches this
    // first wins (returns true); a racing duplicate with the same jti gets
    // false and must be rejected, instead of both succeeding.
    async claimOnce(jti: string, ttlSeconds: number): Promise<boolean> {
        const result = await this.set(`blacklist:${jti}`, '1', 'EX', ttlSeconds, 'NX');
        return result === 'OK';
    }
}