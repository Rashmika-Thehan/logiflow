import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsPositive, IsEmail, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PriorityTier {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    URGENT = 'URGENT',
}

export class CreateShipmentDto {
    // Optional here for batch rows, which receive the tenant's configured default in the worker.
    // The HTTP create service enforces that this is supplied for direct requests.
    @IsOptional() @IsUUID()
    pickupBranchId?: string;

    @IsString() recipientName: string;
    @IsString() recipientPhone: string;
    @IsString() recipientAddress: string;

    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    @IsNumber()
    recipientLat?: number;

    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    @IsNumber()
    recipientLng?: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    @IsPositive()
    weightKg: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    @IsPositive()
    lengthCm: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    @IsPositive()
    widthCm: number;

    @Transform(({ value }) => (value === '' ? NaN : value))
    @IsNumber()
    @IsPositive()
    heightCm: number;

    @IsOptional() @IsDateString() deliveryWindowStart?: string;
    @IsOptional() @IsDateString() deliveryWindowEnd?: string;

    @IsOptional() @IsEnum(PriorityTier) priority?: PriorityTier;

    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    @IsEmail()
    recipientEmail?: string;
}
