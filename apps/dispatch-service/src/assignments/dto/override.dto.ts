import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class OverrideAssignmentDto {
    @IsString() shipmentId: string;
    @IsString() driverId: string;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    @IsPositive()
    weightKg: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    recipientLat: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    recipientLng: number;
}