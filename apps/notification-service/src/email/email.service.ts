import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RenderedEmail, maskEmail } from './email-utils';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: nodemailer.Transporter;
    private readonly from = process.env.EMAIL_FROM ?? 'LogiFlow <onboarding@resend.dev>';
    private readonly devMode: boolean;

    constructor() {
        const apiKey = process.env.RESEND_API_KEY;
        const host = process.env.SMTP_HOST ?? (apiKey ? 'smtp.resend.com' : undefined);

        // No provider configured: print emails instead of sending, so the whole
        // flow is testable locally without a Resend account.
        this.devMode = !host;
        if (this.devMode && process.env.NODE_ENV === 'production') {
            throw new Error('No email provider configured (set SMTP_HOST or RESEND_API_KEY)');
        }
        if (this.devMode) {
            this.logger.warn('No email provider configured: emails are logged, not sent');
        }
        this.transporter = host
            ? nodemailer.createTransport({
                host,
                port: Number(process.env.SMTP_PORT ?? 587),
                secure: process.env.SMTP_SECURE === 'true',
                requireTLS: !!apiKey,
                auth: apiKey ? { user: process.env.SMTP_USER ?? 'resend', pass: apiKey } : undefined,
            })
            : nodemailer.createTransport({ jsonTransport: true });
    }

    async send(to: { email: string; name?: string }, mail: RenderedEmail) {
        const info = await this.transporter.sendMail({
            from: this.from,
            to: to.name ? { name: to.name, address: to.email } : to.email,
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
        });
        if (this.devMode) {
            this.logger.log(`[DEV email to ${to.email}] ${mail.subject}\n${mail.text}`);
        } else {
            this.logger.log(`Sent "${mail.subject}" to ${maskEmail(to.email)} (${info.response})`);
        }
    }
}