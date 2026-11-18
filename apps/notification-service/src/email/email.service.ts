import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RenderedEmail, maskEmail } from './email-utils';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: nodemailer.Transporter;
    private readonly from = process.env.EMAIL_FROM ?? 'LogiFlow <onboarding@resend.dev>';
    private readonly brevoApiKey = process.env.BREVO_API_KEY;
    private readonly devMode: boolean;

    constructor() {
        // Resend shortcut kept for backwards compatibility; any SMTP relay
        // (e.g. Brevo: smtp-relay.brevo.com) works via SMTP_HOST/SMTP_USER/SMTP_PASS.
        const resendApiKey = process.env.RESEND_API_KEY;
        const host = process.env.SMTP_HOST ?? (resendApiKey ? 'smtp.resend.com' : undefined);
        const user = resendApiKey ? (process.env.SMTP_USER ?? 'resend') : process.env.SMTP_USER;
        const pass = resendApiKey ?? process.env.SMTP_PASS;

        // No provider configured: print emails instead of sending, so the whole
        // flow is testable locally without an email provider account.
        this.devMode = !this.brevoApiKey && !host;
        if (this.devMode && process.env.NODE_ENV === 'production') {
            throw new Error('No email provider configured (set BREVO_API_KEY, SMTP_HOST, or RESEND_API_KEY)');
        }
        if (this.devMode) {
            this.logger.warn('No email provider configured: emails are logged, not sent');
        }
        this.transporter = host
            ? nodemailer.createTransport({
                host,
                port: Number(process.env.SMTP_PORT ?? 587),
                secure: process.env.SMTP_SECURE === 'true',
                requireTLS: !!user,
                auth: user && pass ? { user, pass } : undefined,
            })
            : nodemailer.createTransport({ jsonTransport: true });
    }

    async send(to: { email: string; name?: string }, mail: RenderedEmail) {
        if (this.brevoApiKey) {
            const sender = this.parseSender(this.from);
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': this.brevoApiKey,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sender,
                    to: [{ email: to.email, ...(to.name ? { name: to.name } : {}) }],
                    subject: mail.subject,
                    htmlContent: mail.html,
                    textContent: mail.text,
                }),
                signal: AbortSignal.timeout(15_000),
            });

            if (!response.ok) {
                const details = (await response.text()).slice(0, 300);
                const error: any = new Error(`Brevo API request failed (${response.status}): ${details}`);
                error.responseCode = response.status;
                error.provider = 'brevo-api';
                throw error;
            }

            this.logger.log(`Sent "${mail.subject}" to ${maskEmail(to.email)} via Brevo API`);
            return;
        }

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

    private parseSender(value: string): { email: string; name?: string } {
        const match = value.match(/^\s*(.*?)\s*<([^<>]+)>\s*$/);
        if (match) return { name: match[1].replace(/^['"]|['"]$/g, ''), email: match[2].trim() };
        return { email: value.trim() };
    }
}
