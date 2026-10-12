import { IsEmail, IsIn, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class SubmitJoinRequestDto {
    @IsString()
    @Length(8, 12) // 8 characters, optionally typed with the hyphen
    joinCode: string;

    @IsEmail()
    email: string;

    @IsString() @MinLength(2) @MaxLength(100)
    fullName: string;

    @IsString() @Matches(/^\+?[0-9 ()-]{7,20}$/, { message: 'Enter a valid phone number' })
    phone: string;

    @IsString()
    @MinLength(8)
    @MaxLength(72)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
        message: 'Password must contain uppercase, lowercase, and a number',
    })
    password: string;

    @IsIn(['DISPATCHER', 'DRIVER'])
    requestedRole: 'DISPATCHER' | 'DRIVER';
}