import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    tenantName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
        message: 'Password must contain uppercase, lowercase, and a number',
    })
    password: string;
}