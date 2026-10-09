import { IsString, IsDateString } from 'class-validator';

export class OnboardDriverDto {
    @IsString() userId: string; // identity-service User.id, role must already be DRIVER
    @IsString() licenseNumber: string;
    @IsDateString() licenseExpiry: string;
    @IsString() emergencyContactName: string;
    @IsString() emergencyContactPhone: string;
}