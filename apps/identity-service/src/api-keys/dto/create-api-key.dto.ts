import { IsString, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';

export class CreateApiKeyDto {
    @IsString()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    scopes: string[]; // e.g. ["shipments:write", "shipments:read"]

    @IsOptional()
    @IsArray()
    allowedIps?: string[];
}