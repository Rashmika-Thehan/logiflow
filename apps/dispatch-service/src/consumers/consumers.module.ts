import { Module } from '@nestjs/common';
import { ShipmentEventsConsumer } from './shipment-events.consumer';
import { MatchingModule } from '../matching/matching.module';

@Module({
    imports: [MatchingModule],
    providers: [ShipmentEventsConsumer],
})
export class ConsumersModule { }