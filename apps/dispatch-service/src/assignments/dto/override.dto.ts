import { IsString } from 'class-validator';

export class OverrideAssignmentDto {
    @IsString() shipmentId: string;
    @IsString() driverId: string;
}