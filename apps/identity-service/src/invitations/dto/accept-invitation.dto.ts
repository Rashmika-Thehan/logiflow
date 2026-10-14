import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AcceptInvitationDto {
    @IsString()
    token: string;

    @IsString() @MinLength(2) @MaxLength(100)
    fullName: string;

    @IsString() @Matches(/^\+?[0-9 ()-]{7,20}$/, { message: 'Enter a valid phone number' })
    phone: string;

    @IsString()
    @MinLength(8)
    @MaxLength(72) // bcrypt ignores bytes past 72; better to reject than silently truncate
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, {
        message: 'Password must contain uppercase, lowercase, and a number',
    })
    password: string;
}