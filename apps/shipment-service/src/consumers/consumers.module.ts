import { Module } from '@nestjs/common';
import { DispatchEventsConsumer } from './dispatch-events.consumer';
import { ShipmentsModule } from '../shipments/shipments.module';
import { DriverEventsConsumer } from './driver-events.consumer';

@Module({
    imports: [ShipmentsModule],
    providers: [DispatchEventsConsumer, DriverEventsConsumer],
})
export class ConsumersModule { }