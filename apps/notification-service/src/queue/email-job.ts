export const NOTIFICATIONS_QUEUE = 'notifications';

export interface EmailJobData {
    dedupeKey: string;
    tenantId: string;
    template: string;
    to: { email: string; name?: string };
    data: Record<string, unknown>;
}