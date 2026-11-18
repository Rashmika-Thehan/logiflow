import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { EmailJobData, NOTIFICATIONS_QUEUE } from './email-job';
import { TemplateService } from '../email/template.service';
import { maskEmail, TemplateDataError } from '../email/email-utils';
import { decryptField, FieldCryptoError } from '@app/common';
import { notificationAad } from '@app/contracts';

@Processor(NOTIFICATIONS_QUEUE, { concurrency: 5 })
export class EmailProcessor extends WorkerHost {
    private readonly logger = new Logger(EmailProcessor.name);
    constructor(
        private readonly prisma: PrismaService, // unscoped: a queue worker has no request and no tenant context
        private readonly email: EmailService,
        private readonly templates: TemplateService,
    ) {
        super();
    }

    async process(job: Job<EmailJobData>) {
        const { dedupeKey, tenantId, template, to, data, secrets } = job.data;

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
            const resolved: Record<string, unknown> = { ...data };
            for (const [name, blob] of Object.entries(secrets ?? {})) {
                resolved[name] = decryptField(blob, notificationAad(template, to.email));
            }
            const mail = this.templates.render(template, resolved);
            await this.email.send(to, mail);

        } catch (err: any) {
            await this.prisma.notificationLog.update({
                where: { dedupeKey },
                data: { status: 'FAILED', lastError: String(err.message).slice(0, 500) },
            });
            this.logger.error(`Email to ${maskEmail(to.email)} failed (template ${template}): ${String(err.message).slice(0, 300)}`);
            // A bad template or permanent provider rejection should not be retried.
            // Brevo API 429/5xx and SMTP 4xx responses may be transient.
            const permanentProviderError = err.provider === 'brevo-api'
                ? (err.responseCode >= 400 && err.responseCode < 500 && err.responseCode !== 429)
                : (err.responseCode >= 500 && err.responseCode < 600);
            const permanent = err instanceof TemplateDataError || err instanceof FieldCryptoError || permanentProviderError;
            if (permanent) throw new UnrecoverableError(err.message);
            throw err; // transient: BullMQ retries with exponential backoff
        }

        await this.prisma.notificationLog.update({
            where: { dedupeKey },
            data: { status: 'SENT', sentAt: new Date(), lastError: null },
        });
    }
}
