export const NOTIFICATION_TEMPLATES = {
    DELIVERY_OTP: 'DELIVERY_OTP',
    DELIVERY_RECEIPT: 'DELIVERY_RECEIPT',
} as const;

export type NotificationTemplate = (typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES];

// What a service publishes on `notification.requests` to ask for a message
// to be delivered. Producers own the data; notification-service owns delivery.
export interface SendNotificationPayload {
    channel: 'EMAIL'; // 'SMS' can be added later without changing producers
    template: NotificationTemplate;
    to: { email: string; name?: string };
    data: Record<string, unknown>;
}