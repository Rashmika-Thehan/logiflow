import { Module } from '@nestjs/common';
import { ShipmentEventsConsumer } from './shipment-events.consumer';
import { DriverEventsConsumer } from './driver-events.consumer';
import { MatchingModule } from '../matching/matching.module';

@Module({
    imports: [MatchingModule],
    providers: [ShipmentEventsConsumer, DriverEventsConsumer],
})
export class ConsumersModule { }