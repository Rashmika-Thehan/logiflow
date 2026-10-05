import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AssignmentsController } from './assignments.controller';
import { TimeoutCheckerService } from './timeout-checker.service';
import { MatchingModule } from '../matching/matching.module';

@Module({
    imports: [ScheduleModule.forRoot(), MatchingModule],
    controllers: [AssignmentsController],
    providers: [TimeoutCheckerService],
})
export class AssignmentsModule { }