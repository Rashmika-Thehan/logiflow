export const NOTIFICATION_TEMPLATES = {
    DELIVERY_OTP: 'DELIVERY_OTP',
    DELIVERY_RECEIPT: 'DELIVERY_RECEIPT',
    TEAM_INVITATION: 'TEAM_INVITATION',
    JOIN_REQUEST_APPROVED: 'JOIN_REQUEST_APPROVED',
    JOIN_REQUEST_REJECTED: 'JOIN_REQUEST_REJECTED',
    JOIN_REQUEST_VERIFICATION: 'JOIN_REQUEST_VERIFICATION',
} as const;

export type NotificationTemplate = (typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES];

// What a service publishes on `notification.requests` to ask for a message
// to be delivered. Producers own the data; notification-service owns delivery.
export interface SendNotificationPayload {
    channel: 'EMAIL'; // 'SMS' can be added later without changing producers
    template: NotificationTemplate;
    to: { email: string; name?: string };
    data: Record<string, unknown>;
    // Values that must never sit in plaintext in an outbox table, a Kafka topic or a queue job.
    // Each is encryptField(value, notificationAad(template, to.email)); the notification
    // worker decrypts them in memory at render time.
    secrets?: Record<string, string>;
}

// Binds a ciphertext to its purpose and recipient: copied into a request for a
// different address (or template), it simply fails to decrypt.
export const notificationAad = (template: string, email: string) =>
    `${template}|${email.trim().toLowerCase()}`;
