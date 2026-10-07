import { BadRequestException } from '@nestjs/common';

const TRANSITIONS: Record<string, string[]> = {
    PENDING: ['DISPATCHING', 'CANCELLED'],
    DISPATCHING: ['ASSIGNED', 'CANCELLED', 'FAILED'],
    ASSIGNED: ['PICKED_UP', 'CANCELLED', 'FAILED', 'DISPATCHING'],
    PICKED_UP: ['IN_TRANSIT', 'FAILED'],
    IN_TRANSIT: ['DELIVERED', 'FAILED'],
    DELIVERED: [],
    CANCELLED: [],
    FAILED: [],
};

const RANK: Record<string, number> = {
    PENDING: 0, DISPATCHING: 1, ASSIGNED: 2, PICKED_UP: 3, IN_TRANSIT: 4, DELIVERED: 5,
};

const TERMINAL = ['CANCELLED', 'FAILED', 'DELIVERED'];

export function isTerminal(status: string) {
    return TERMINAL.includes(status);
}
export function rank(status: string) {
    return RANK[status] ?? -1;
}

export function assertValidTransition(from: string, to: string) {
    if (!(TRANSITIONS[from] ?? []).includes(to)) {
        throw new Error(`Cannot transition shipment from ${from} to ${to}`); // unchanged — callers already wrap this
    }
}

export function canCancel(status: string) {
    return ['PENDING', 'DISPATCHING', 'ASSIGNED'].includes(status);
}