import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Handlebars from 'handlebars';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { RenderedEmail, TemplateDataError } from './email-utils';

interface TemplateDef {
    file: string;       // reads <file>.hbs (HTML) and <file>.txt.hbs (plain text)
    subject: string;    // a Handlebars string, so it can use data too
    required: string[]; // fields that must be present, or the job is rejected as permanent
}

// Keys match NOTIFICATION_TEMPLATES in @app/contracts.
const TEMPLATES: Record<string, TemplateDef> = {
    DELIVERY_OTP: {
        file: 'delivery-otp',
        subject: 'Your package is on its way: delivery code inside',
        required: ['trackingCode', 'otp'],
    },
    DELIVERY_RECEIPT: {
        file: 'delivery-receipt',
        subject: 'Delivered: package {{trackingCode}}',
        required: ['trackingCode'],
    },
    TEAM_INVITATION: {
        file: 'team-invitation',
        subject: "You're invited to join {{organizationName}} on LogiFlow",
        required: ['token', 'organizationName', 'role'],
    },
    JOIN_REQUEST_VERIFICATION: {
        file: 'join-request-verification',
        subject: 'Your LogiFlow verification code',
        required: ['code', 'organizationName'],
    },
    JOIN_REQUEST_APPROVED: {
        file: 'join-request-approved',
        subject: 'Your request to join {{organizationName}} was approved',
        required: ['organizationName', 'role'],
    },
    JOIN_REQUEST_REJECTED: {
        file: 'join-request-rejected',
        subject: 'Update on your request to join {{organizationName}}',
        required: ['organizationName'],
    },
};

type Compiled = { subject: HandlebarsTemplateDelegate; html: HandlebarsTemplateDelegate; text: HandlebarsTemplateDelegate };

@Injectable()
export class TemplateService implements OnModuleInit {
    private readonly logger = new Logger(TemplateService.name);
    private readonly hbs = Handlebars.create(); // isolated instance, no global state
    private readonly compiled = new Map<string, Compiled>();

    onModuleInit() {
        const dir = process.env.EMAIL_TEMPLATES_DIR ?? join(__dirname, 'email/templates');
        const read = (name: string) => {
            const path = join(dir, name);
            if (!existsSync(path)) {
                // Fail at boot, not when the first OTP is due.
                throw new Error(`Email template missing: ${path} (check the "assets" entry in nest-cli.json)`);
            }
            return readFileSync(path, 'utf8');
        };

        this.hbs.registerPartial('layout', read('layout.hbs'));

        for (const [name, def] of Object.entries(TEMPLATES)) {
            this.compiled.set(name, {
                // Plain-text parts and the subject must not HTML-escape (an apostrophe would become &#x27;).
                subject: this.hbs.compile(def.subject, { noEscape: true }),
                html: this.hbs.compile(read(`${def.file}.hbs`)),
                text: this.hbs.compile(read(`${def.file}.txt.hbs`), { noEscape: true }),
            });
        }
        this.logger.log(`Loaded ${this.compiled.size} email templates from ${dir}`);
    }

    render(name: string, data: Record<string, any>): RenderedEmail {
        const def = TEMPLATES[name];
        const compiled = this.compiled.get(name);
        if (!def || !compiled) throw new TemplateDataError(`Unknown template: ${name}`);

        for (const key of def.required) {
            if (data[key] === undefined || data[key] === null || data[key] === '') {
                throw new TemplateDataError(`Missing template field: ${key}`);
            }
        }

        const base = (process.env.FRONTEND_URL ?? 'http://localhost:5173').replace(/\/$/, '');
        const ROLE_LABELS: Record<string, string> = { DISPATCHER: 'Dispatcher', DRIVER: 'Driver' };
        const context = {
            ...data,
            greeting: data.recipientName || 'there',
            acceptUrl: data.token ? `${base}/accept-invite#token=${encodeURIComponent(String(data.token))}` : undefined,
            loginUrl: `${base}/login`,
            roleLabel: ROLE_LABELS[data.role] ?? data.role,
            isDriver: data.role === 'DRIVER',
            expiresAtText: data.expiresAt ? new Date(data.expiresAt).toUTCString() : undefined,
            trackingUrl: data.trackingCode ? `${base}/track/${encodeURIComponent(String(data.trackingCode))}` : undefined,
            deliveredAtText: data.deliveredAt ? new Date(data.deliveredAt).toUTCString() : undefined,
        };

        const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').slice(0, 200);
        return { subject: oneLine(compiled.subject(context)), html: compiled.html(context), text: compiled.text(context) };
    }
}