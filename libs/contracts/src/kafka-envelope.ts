export interface KafkaEnvelope<T = unknown> {
    type: string;
    tenantId: string;
    occurredAt: string;
    payload: T;
}