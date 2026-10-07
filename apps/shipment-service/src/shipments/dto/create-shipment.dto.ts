import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PriorityTier {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    URGENT = 'URGENT',
}

export class CreateShipmentDto {
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
}