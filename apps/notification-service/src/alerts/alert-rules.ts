import { EVENT_TYPES } from '@app/contracts';

export interface AlertDraft {
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    title: string;
    body: string;
    shipmentId?: string;
}

// Which domain events deserve a dispatcher's attention (FR-NTF-05).
export function alertForEvent(type: string, payload: any): AlertDraft | null {
    switch (type) {
        case EVENT_TYPES.DISPATCH_FAILED:
            return {
                severity: 'CRITICAL',
                title: 'No driver available',
                body: `No eligible driver could be found for shipment ${payload?.shipmentId}. It needs manual assignment.`,
                shipmentId: payload?.shipmentId,
            };
        case EVENT_TYPES.DRIVER_UNASSIGNED:
            // Timeouts are routine re-dispatches, not alerts. Only breakdowns are.
            return payload?.reason === 'BREAKDOWN'
                ? {
                    severity: 'WARNING',
                    title: 'Driver breakdown',
                    body: `Driver ${payload?.driverId} reported a breakdown on shipment ${payload?.shipmentId}. It is being re-dispatched.`,
                    shipmentId: payload?.shipmentId,
                }
                : null;
        case EVENT_TYPES.DELIVERY_FAILED:
            return {
                severity: 'WARNING',
                title: 'Delivery failed',
                body: `Shipment ${payload?.shipmentId} failed: ${payload?.reasonCode ?? 'no reason given'}.`,
                shipmentId: payload?.shipmentId,
            };
        default:
            return null;
    }
}