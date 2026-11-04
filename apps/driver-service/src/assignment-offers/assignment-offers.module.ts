import { Module } from '@nestjs/common';
import { DispatchEventsConsumer } from './dispatch-events.consumer';
import { AssignmentOffersController } from './assignment-offers.controller';
import { AssignmentOffersService } from './assignment-offers.service';
import { DriversModule } from '../drivers/drivers.module';

@Module({
    imports: [DriversModule],
    controllers: [AssignmentOffersController],
    providers: [AssignmentOffersService, DispatchEventsConsumer],
})
export class AssignmentOffersModule { }