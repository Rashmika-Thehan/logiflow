import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBranchDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsString()
    phone?: string;
}