import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ClsModule } from '@app/common';
import { BatchImportController } from './batch-import.controller';
import { BatchImportProcessor } from './batch-import.processor';
import { ShipmentsModule } from '../shipments/shipments.module';

@Module({
    imports: [
        BullModule.registerQueue({ name: 'shipment-batch-import' }),
        ClsModule,
        ShipmentsModule, // for ShipmentsService
    ],
    controllers: [BatchImportController],
    providers: [BatchImportProcessor],
})
export class BatchImportModule { }