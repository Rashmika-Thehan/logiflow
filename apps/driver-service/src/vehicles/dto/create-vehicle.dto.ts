import { IsString, IsNumber, IsPositive, IsDateString } from 'class-validator';
export class CreateVehicleDto {
    @IsString() licensePlate: string;
    @IsString() vehicleClass: string;
    @IsNumber() @IsPositive() maxWeightKg: number;
    @IsNumber() @IsPositive() volumeM3: number;
    @IsDateString() insuranceExpiry: string;
}