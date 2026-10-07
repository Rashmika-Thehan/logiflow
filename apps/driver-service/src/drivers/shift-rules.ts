import { BadRequestException } from '@nestjs/common';

// Driver-initiated transitions only. BUSY is system-controlled — set when an
// offer is accepted, cleared on delivery completion/failure — never a
// manual target.
const MANUAL_TRANSITIONS: Record<string, string[]> = {
    OFFLINE: ['AVAILABLE'],
    AVAILABLE: ['ON_BREAK', 'OFFLINE'],
    ON_BREAK: ['AVAILABLE', 'OFFLINE'],
    BUSY: [],
};

export function assertValidManualShift(from: string, to: string) {
    if (!(MANUAL_TRANSITIONS[from] ?? []).includes(to)) {
        throw new BadRequestException(`Cannot manually set shift status from ${from} to ${to}`);
    }
}