import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { DriversModule } from '../drivers/drivers.module';

@Module({
    imports: [DriversModule],
    controllers: [DeliveriesController],
    providers: [DeliveriesService],
})
export class DeliveriesModule { }