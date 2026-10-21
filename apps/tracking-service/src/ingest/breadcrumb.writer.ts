import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BREADCRUMB } from '../schemas';

const MAX_BUFFER = 20_000;
const FLUSH_BATCH = 1000;

// FR-TRK-06: persistence is off the ingest path. A crash loses at most ~1s of history;
// live positions (Redis) are unaffected.
@Injectable()
export class BreadcrumbWriter implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(BreadcrumbWriter.name);
    private buffer: any[] = [];
    private timer?: NodeJS.Timeout;
    private flushing = false;

    constructor(@InjectModel(BREADCRUMB) private readonly model: Model<any>) { }

    onModuleInit() {
        this.timer = setInterval(() => void this.flush(), 1000);
    }

    async onModuleDestroy() {
        if (this.timer) clearInterval(this.timer);
        await this.flush();
    }

    enqueue(docs: any[]) {
        this.buffer.push(...docs);
        const overflow = this.buffer.length - MAX_BUFFER;
        if (overflow > 0) {
            this.buffer.splice(0, overflow);
            this.logger.warn(`Breadcrumb buffer full (Mongo slow or down): dropped ${overflow} oldest points`);
        }
    }

    async flush() {
        if (this.flushing || this.buffer.length === 0) return;
        this.flushing = true;
        const batch = this.buffer.splice(0, FLUSH_BATCH);
        try {
            await this.model.collection.insertMany(batch, { ordered: false });
        } catch (err: any) {
            // A resent ping hits the unique (driverId, ts) index: expected, and the rest of the batch still inserted.
            const errors: any[] = ([] as any[]).concat(err?.writeErrors ?? err);
            const onlyDuplicates = errors.length > 0 && errors.every((e) => (e?.code ?? e?.err?.code) === 11000);
            if (!onlyDuplicates) {
                this.buffer.unshift(...batch); // Mongo unreachable or similar: keep the points, retry next tick
                this.logger.error(`Breadcrumb flush failed, will retry: ${err?.message}`);
            }
        } finally {
            this.flushing = false;
        }
    }
}