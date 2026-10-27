import { IsDateString, IsString } from 'class-validator';

export class UpdateLicenseDto {
    @IsString() licenseNumber: string;
    @IsDateString() licenseExpiry: string;
}