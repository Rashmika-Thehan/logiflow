import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsOptional()
    @IsString()
    currentPassword?: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
        message: 'Password must contain uppercase, lowercase, and a number',
    })
    newPassword!: string;
}
