import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { EmailJobData, NOTIFICATIONS_QUEUE } from './email-job';
import { TemplateService } from '../email/template.service';
import { maskEmail, TemplateDataError } from '../email/email-utils';

@Processor(NOTIFICATIONS_QUEUE, { concurrency: 5 })
export class EmailProcessor extends WorkerHost {
    constructor(
        private readonly prisma: PrismaService, // unscoped: a queue worker has no request and no tenant context
        private readonly email: EmailService,
        private readonly templates: TemplateService,
    ) {
        super();
    }

    async process(job: Job<EmailJobData>) {
        const { dedupeKey, tenantId, template, to, data } = job.data;

        // Durable dedupe: a duplicate Kafka message that arrives after the first
        // job finished (and was removed from the queue) still finds SENT here.
        const existing = await this.prisma.notificationLog.findUnique({ where: { dedupeKey } });
        if (existing?.status === 'SENT') return;

        await this.prisma.notificationLog.upsert({
            where: { dedupeKey },
            create: { dedupeKey, tenantId, channel: 'EMAIL', template, recipient: maskEmail(to.email), status: 'SENDING', attempts: 1 },
            update: { status: 'SENDING', attempts: { increment: 1 } },
        });

        try {
            const mail = this.templates.render(template, data);
            await this.email.send(to, mail);
        } catch (err: any) {
            await this.prisma.notificationLog.update({
                where: { dedupeKey },
                data: { status: 'FAILED', lastError: String(err.message).slice(0, 500) },
            });
            // A bad template or a permanent SMTP rejection (5xx) can never succeed, so don't retry it.
            const permanent = err instanceof TemplateDataError || (err.responseCode >= 500 && err.responseCode < 600);
            if (permanent) throw new UnrecoverableError(err.message);
            throw err; // transient: BullMQ retries with exponential backoff
        }

        await this.prisma.notificationLog.update({
            where: { dedupeKey },
            data: { status: 'SENT', sentAt: new Date(), lastError: null },
        });
    }
}