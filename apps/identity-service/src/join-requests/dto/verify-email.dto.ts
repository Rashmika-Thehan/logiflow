import { Matches } from 'class-validator';

export class VerifyEmailDto {
    @Matches(/^\d{6}$/, { message: 'The code is 6 digits' }) code: string;
}