import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxPublisherService } from './outbox-publisher.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [OutboxPublisherService],
})
export class OutboxModule { }