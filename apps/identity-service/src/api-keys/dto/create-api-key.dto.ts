import { IsString, IsArray, ArrayNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ALL_SCOPES } from '@app/contracts';

export class CreateApiKeyDto {
    @IsString()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsIn(ALL_SCOPES, { each: true })
    scopes: string[];

    @IsOptional()
    @IsArray()
    allowedIps?: string[];
}