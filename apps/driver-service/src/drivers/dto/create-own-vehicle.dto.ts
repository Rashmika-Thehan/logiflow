import { IsNumber, IsPositive, IsString } from 'class-validator';

// No insurance field: a platform admin sets that after reviewing the certificate.
export class CreateOwnVehicleDto {
    @IsString() licensePlate: string;
    @IsString() vehicleClass: string;
    @IsNumber() @IsPositive() maxWeightKg: number;
    @IsNumber() @IsPositive() volumeM3: number;
}