import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailJobData, NOTIFICATIONS_QUEUE } from '../queue/email-job';

@Injectable()
export class NotificationsService {
    constructor(@InjectQueue(NOTIFICATIONS_QUEUE) private readonly queue: Queue) { }

    enqueueEmail(job: EmailJobData) {
        return this.queue.add('send-email', job, {
            // Same dedupeKey while a job exists => BullMQ ignores the duplicate add.
            jobId: `email-${job.dedupeKey}`,
            attempts: 5,
            backoff: { type: 'exponential', delay: 5_000 }, // 5s, 10s, 20s, 40s
            removeOnComplete: true, // the job data carries the OTP, so don't keep it after success
            removeOnFail: { age: 24 * 3600 },
        });
    }
}