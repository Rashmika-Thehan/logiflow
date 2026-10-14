export interface RenderedEmail { subject: string; html: string; text: string }

export class TemplateDataError extends Error { }

export const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local?.[0] ?? '*'}***@${domain ?? ''}`;
};