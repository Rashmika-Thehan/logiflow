import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

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

    @IsNumber() weightKg: number;
    @IsNumber() lengthCm: number;
    @IsNumber() widthCm: number;
    @IsNumber() heightCm: number;

    @IsOptional() @IsDateString() deliveryWindowStart?: string;
    @IsOptional() @IsDateString() deliveryWindowEnd?: string;

    @IsOptional() @IsEnum(PriorityTier) priority?: PriorityTier;
}