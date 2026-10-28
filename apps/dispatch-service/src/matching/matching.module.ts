import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { DriversModule } from '../drivers/drivers.module';
import { AssignmentLifecycleService } from './assignment-lifecycle.service';

@Module({
    imports: [DriversModule],
    providers: [MatchingService, AssignmentLifecycleService],
    exports: [MatchingService, AssignmentLifecycleService],
})
export class MatchingModule { }