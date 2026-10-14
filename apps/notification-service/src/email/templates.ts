export interface RenderedEmail { subject: string; html: string; text: string }
export interface RenderContext { trackingBaseUrl: string }

export class TemplateDataError extends Error { }

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
// Every interpolated value goes through this; recipient names are user-supplied.
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

const trackingUrl = (ctx: RenderContext, code: string) =>
    `${ctx.trackingBaseUrl.replace(/\/$/, '')}/track/${encodeURIComponent(code)}`;

function requireFields(data: Record<string, any>, keys: string[]) {
    for (const key of keys) {
        if (data[key] === undefined || data[key] === null || data[key] === '') {
            throw new TemplateDataError(`Missing template field: ${key}`);
        }
    }
}

const layout = (title: string, body: string) => `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;color:#222">
<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:8px;padding:24px">
<h2 style="margin-top:0">${esc(title)}</h2>${body}
<p style="color:#888;font-size:12px;margin-top:24px">LogiFlow</p>
</div></body></html>`;

type Renderer = (data: Record<string, any>, ctx: RenderContext) => RenderedEmail;

const TEMPLATES: Record<string, Renderer> = {
    DELIVERY_OTP: (data, ctx) => {
        requireFields(data, ['trackingCode', 'otp']);
        const url = trackingUrl(ctx, data.trackingCode);
        const greeting = data.recipientName ?? 'there';
        return {
            subject: 'Your package is on its way: delivery code inside',
            text:
                `Hi ${greeting},\n\nYour package ${data.trackingCode} is out for delivery.\n` +
                `Track it live: ${url}\n\nDelivery code: ${data.otp}\n` +
                `Give this code to the driver only when you have your package in hand.\n`,
            html: layout(
                'Your package is on its way',
                `<p>Hi ${esc(greeting)},</p>
<p>Your package <strong>${esc(data.trackingCode)}</strong> is out for delivery.</p>
<p><a href="${esc(url)}">Track it live</a></p>
<p style="margin-bottom:4px;color:#666">Delivery code</p>
<p style="font-size:32px;letter-spacing:6px;font-weight:bold;margin-top:0">${esc(data.otp)}</p>
<p>Give this code to the driver only when you have your package in hand.</p>`,
            ),
        };
    },

    DELIVERY_RECEIPT: (data) => {
        requireFields(data, ['trackingCode']);
        const when = data.deliveredAt ? new Date(data.deliveredAt).toUTCString() : '';
        const greeting = data.recipientName ?? 'there';
        return {
            subject: `Delivered: package ${data.trackingCode}`,
            text: `Hi ${greeting},\n\nYour package ${data.trackingCode} was delivered${when ? ` on ${when}` : ''}.\n`,
            html: layout(
                'Your package was delivered',
                `<p>Hi ${esc(greeting)},</p>
<p>Your package <strong>${esc(data.trackingCode)}</strong> was delivered${when ? ` on ${esc(when)}` : ''}.</p>`,
            ),
        };
    },
};

export function renderTemplate(name: string, data: Record<string, unknown>, ctx: RenderContext): RenderedEmail {
    const renderer = TEMPLATES[name];
    if (!renderer) throw new TemplateDataError(`Unknown template: ${name}`);
    return renderer(data, ctx);
}

export const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local?.[0] ?? '*'}***@${domain ?? ''}`;
};