import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class NearbyQueryDto {
    @Type(() => Number) @IsNumber() @Min(-90) @Max(90) lat: number;
    @Type(() => Number) @IsNumber() @Min(-180) @Max(180) lng: number;
    @IsOptional() @Type(() => Number) @IsNumber() @Min(0.1) @Max(100) radiusKm: number = 5;
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 20;
}

export class InBoxQueryDto {
    @Type(() => Number) @IsNumber() @Min(-90) @Max(90) minLat: number;
    @Type(() => Number) @IsNumber() @Min(-180) @Max(180) minLng: number;
    @Type(() => Number) @IsNumber() @Min(-90) @Max(90) maxLat: number;
    @Type(() => Number) @IsNumber() @Min(-180) @Max(180) maxLng: number;
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit: number = 20;
}

export class ReplayQueryDto {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(5000) limit: number = 2000;
}