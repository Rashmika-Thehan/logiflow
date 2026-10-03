import { BadRequestException } from '@nestjs/common';

const TRANSITIONS: Record<string, string[]> = {
    PENDING: ['DISPATCHING', 'CANCELLED'],
    DISPATCHING: ['ASSIGNED', 'CANCELLED', 'FAILED'],
    ASSIGNED: ['PICKED_UP', 'CANCELLED', 'FAILED'],
    PICKED_UP: ['IN_TRANSIT', 'FAILED'],
    IN_TRANSIT: ['DELIVERED', 'FAILED'],
    DELIVERED: [],
    CANCELLED: [],
    FAILED: [],
};

export function assertValidTransition(from: string, to: string) {
    if (!(TRANSITIONS[from] ?? []).includes(to)) {
        throw new BadRequestException(`Cannot transition shipment from ${from} to ${to}`);
    }
}

// FR-SHP-06: cancellation is only legal strictly before PICKED_UP.
export function canCancel(status: string) {
    return ['PENDING', 'DISPATCHING', 'ASSIGNED'].includes(status);
}