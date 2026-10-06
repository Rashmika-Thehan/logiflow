import { IsString, IsNumber } from 'class-validator';

export class OverrideAssignmentDto {
    @IsString() shipmentId: string;
    @IsString() driverId: string;
    @IsNumber() weightKg: number;
    @IsNumber() recipientLat: number;
    @IsNumber() recipientLng: number;
}