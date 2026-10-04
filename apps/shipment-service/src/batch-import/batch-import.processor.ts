import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ClsService } from '@app/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentsService } from '../shipments/shipments.service';
import { validateRow } from './validate-row';

interface ImportJobData {
    batchImportJobId: string;
    tenantId: string;
    role: string;
    rows: Record<string, string>[];
}

@Processor('shipment-batch-import')
export class BatchImportProcessor extends WorkerHost {
    private readonly logger = new Logger(BatchImportProcessor.name);

    constructor(
        private readonly cls: ClsService,
        private readonly prisma: PrismaService,           // unscoped: used for the job-status row itself
        private readonly shipmentsService: ShipmentsService, // uses TENANT_PRISMA internally
    ) {
        super();
    }

    async process(job: Job<ImportJobData>) {
        const { batchImportJobId, tenantId, role, rows } = job.data;

        await this.prisma.batchImportJob.update({
            where: { id: batchImportJobId },
            data: { status: 'PROCESSING' },
        });

        const errorManifest: { row: number; errors: string[] }[] = [];
        let successCount = 0;

        // Everything inside here runs with CLS context manually established —
        // this is the one piece of plumbing TenantInterceptor normally handles
        // automatically for HTTP requests, done by hand because a queue job
        // isn't a request.
        await this.cls.run(async () => {
            this.cls.set('tenantId', tenantId);
            this.cls.set('role', role);

            for (let i = 0; i < rows.length; i++) {
                const rowNumber = i + 2; // +1 for 0-index, +1 for the header row
                const result = await validateRow(rows[i]);

                if (!result.ok) {
                    errorManifest.push({ row: rowNumber, errors: result.errors! });
                    continue;
                }

                try {
                    await this.shipmentsService.create(result.dto!);
                    successCount++;
                } catch (err: any) {
                    errorManifest.push({ row: rowNumber, errors: [err.message ?? 'Unknown error creating shipment'] });
                }
            }
        });

        await this.prisma.batchImportJob.update({
            where: { id: batchImportJobId },
            data: {
                status: 'COMPLETED',
                successCount,
                failureCount: errorManifest.length,
                errorManifest,
                completedAt: new Date(),
            },
        });

        this.logger.log(`Batch import ${batchImportJobId}: ${successCount} ok, ${errorManifest.length} failed`);
    }
}