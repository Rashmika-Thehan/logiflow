import { Matches } from 'class-validator';

export class VerifyDeliveryDto {
    @Matches(/^\d{4}$/, { message: 'Delivery code must be 4 digits' })
    otp: string;
}