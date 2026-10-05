/// <reference types="multer" />
import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, UseGuards, BadRequestException, NotFoundException, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Roles, RolesGuard } from '@app/common';
import { Inject } from '@nestjs/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { parseImportFile } from './parsers';

const MAX_ROWS = 5000;

@Controller('shipments/batch-import')
@UseGuards(RolesGuard)
export class BatchImportController {
    constructor(
        @InjectQueue('shipment-batch-import') private readonly queue: Queue,
        @Inject(TENANT_PRISMA) private readonly db: any,
    ) { }

    @Roles('BUSINESS_ADMIN')
    @Post()
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
    async upload(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
        if (!file) throw new BadRequestException('No file uploaded');

        const rows = parseImportFile(file.buffer, file.originalname);
        if (rows.length === 0) throw new BadRequestException('File contains no rows');
        if (rows.length > MAX_ROWS) {
            throw new BadRequestException(`File exceeds the ${MAX_ROWS}-row limit (got ${rows.length})`);
        }

        const job = await this.db.batchImportJob.create({
            data: { fileName: file.originalname, totalRows: rows.length, status: 'PENDING' },
        });

        // tenantId/role captured here, from the authenticated request — the
        // worker has no request of its own to read these from.
        await this.queue.add('process', {
            batchImportJobId: job.id,
            tenantId: req.user.tenantId,
            role: req.user.role,
            rows,
        });

        return { batchImportJobId: job.id, status: job.status, totalRows: job.totalRows };
    }

    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get(':id')
    async getStatus(@Param('id') id: string) {
        const job = await this.db.batchImportJob.findUnique({ where: { id } });
        if (!job) throw new NotFoundException('Import job not found');
        return job;
    }
}