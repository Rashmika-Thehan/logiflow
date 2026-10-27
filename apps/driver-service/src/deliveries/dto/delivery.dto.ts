import { IsIn, IsOptional, IsUrl, Matches, MaxLength } from 'class-validator';

export const FAILURE_REASONS = ['RECIPIENT_UNAVAILABLE', 'WRONG_ADDRESS', 'REFUSED', 'ACCESS_DENIED', 'DAMAGED', 'OTHER'] as const;

export class FailDeliveryDto {
    @IsIn(FAILURE_REASONS) reasonCode: (typeof FAILURE_REASONS)[number];

    // No upload service yet, so the client hosts the photo and sends an https link.
    @IsOptional() @IsUrl({ protocols: ['https'], require_protocol: true }) @MaxLength(500) photoUrl?: string;
}

export class ConfirmDeliveryDto {
    @Matches(/^\d{4}$/, { message: 'The delivery code is 4 digits' }) otp: string;
}