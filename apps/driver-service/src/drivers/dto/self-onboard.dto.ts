import { IsDateString, IsString } from 'class-validator';

export class SelfOnboardDto {
    @IsString() licenseNumber: string;
    @IsDateString() licenseExpiry: string;
    @IsString() emergencyContactName: string;
    @IsString() emergencyContactPhone: string;
}