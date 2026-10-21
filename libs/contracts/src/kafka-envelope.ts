export interface KafkaEnvelope<T = unknown> {
    eventId?: string;
    type: string;
    tenantId: string;
    occurredAt: string;
    payload: T;
}