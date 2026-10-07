import { Module } from '@nestjs/common';
import { DispatchEventsConsumer } from './dispatch-events.consumer';
import { ShipmentsModule } from '../shipments/shipments.module';

@Module({
    imports: [ShipmentsModule],
    providers: [DispatchEventsConsumer],
})
export class ConsumersModule { }