import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentsService } from '../shipments/shipments.service';
import { validateRow } from './validate-row';

interface ImportJobData {
    batchImportJobId: string;
    tenantId: string;
    role: string;
    rows: Record<string, any>[];
}

@Processor('shipment-batch-import', { concurrency: 1 })
export class BatchImportProcessor extends WorkerHost {
    private readonly logger = new Logger(BatchImportProcessor.name);

    constructor(
        private readonly cls: ClsService,
        private readonly prisma: PrismaService,
        private readonly shipmentsService: ShipmentsService,
    ) {
        super();
    }

    async process(job: Job<ImportJobData>) {
        const { batchImportJobId, tenantId, role, rows } = job.data;

        await this.prisma.batchImportJob.update({
            where: { id: batchImportJobId },
            data: { status: 'PROCESSING' },
        });

        await this.cls.run(async () => {
            this.cls.set('tenantId', tenantId);
            this.cls.set('role', role);

            for (let i = 0; i < rows.length; i++) {
                const rowNumber = i + 2;

                // Idempotency: a stalled-job replay may have already processed this
                // exact row in a prior attempt. Skip it rather than re-creating the
                // shipment with a new tracking code and a duplicate outbox event.
                const alreadyDone = await this.prisma.batchImportRowResult.findUnique({
                    where: { batchImportJobId_rowNumber: { batchImportJobId, rowNumber } },
                });
                if (alreadyDone) continue;

                const result = await validateRow(rows[i]);

                if (!result.ok) {
                    await this.recordRow(tenantId, batchImportJobId, rowNumber, false, undefined, result.errors);
                    continue;
                }

                try {
                    const shipment = await this.shipmentsService.create(result.dto!);
                    await this.recordRow(tenantId, batchImportJobId, rowNumber, true, shipment.id);
                } catch (err: any) {
                    // A unique-constraint hit here means a concurrent attempt already
                    // recorded this exact row between our check and this write —
                    // treat it as already-done, not a new failure.
                    if (err.code === 'P2002') continue;
                    await this.recordRow(tenantId, batchImportJobId, rowNumber, false, undefined, [err.message ?? 'Unknown error']);
                }
            }
        });

        const results = await this.prisma.batchImportRowResult.findMany({ where: { batchImportJobId } });
        const failed = results.filter((r) => !r.success);

        await this.prisma.batchImportJob.update({
            where: { id: batchImportJobId },
            data: {
                status: 'COMPLETED',
                successCount: results.length - failed.length,
                failureCount: failed.length,
                errorManifest: failed.map((r) => ({ row: r.rowNumber, errors: r.errors })),
                completedAt: new Date(),
            },
        });
    }

    private async recordRow(
        tenantId: string, batchImportJobId: string, rowNumber: number,
        success: boolean, shipmentId?: string, errors?: string[],
    ) {
        try {
            await this.prisma.batchImportRowResult.create({
                data: { tenantId, batchImportJobId, rowNumber, success, shipmentId, errors: errors as any },
            });
        } catch (err: any) {
            if (err.code !== 'P2002') throw err; // ignore a racing duplicate write
        }
    }

    // Fires once BullMQ has exhausted all configured retry attempts — the one
    // place that reliably marks a job FAILED even after a worker crash
    // mid-loop, since an in-process try/catch inside process() can't run if
    // the process itself died before reaching it.
    @OnWorkerEvent('failed')
    async onFailed(job: Job<ImportJobData>) {
        if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
            await this.prisma.batchImportJob
                .update({ where: { id: job.data.batchImportJobId }, data: { status: 'FAILED', completedAt: new Date() } })
                .catch(() => this.logger.error(`Could not mark job ${job.data.batchImportJobId} FAILED`));
        }
    }
}