import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsPositive } from 'class-validator';

export enum PriorityTier {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    URGENT = 'URGENT',
}

export class CreateShipmentDto {
    @IsString() recipientName: string;
    @IsString() recipientPhone: string;
    @IsString() recipientAddress: string;
    @IsOptional() @IsNumber() recipientLat?: number;
    @IsOptional() @IsNumber() recipientLng?: number;

    @IsNumber() @IsPositive() weightKg: number;
    @IsNumber() @IsPositive() lengthCm: number;
    @IsNumber() @IsPositive() widthCm: number;
    @IsNumber() @IsPositive() heightCm: number;

    @IsOptional() @IsDateString() deliveryWindowStart?: string;
    @IsOptional() @IsDateString() deliveryWindowEnd?: string;

    @IsOptional() @IsEnum(PriorityTier) priority?: PriorityTier;
}