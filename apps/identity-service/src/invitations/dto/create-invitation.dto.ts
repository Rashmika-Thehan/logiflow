import { IsEmail, IsIn } from 'class-validator';

export class CreateInvitationDto {
    @IsEmail()
    email: string;

    // Deliberately NOT BUSINESS_ADMIN or SUPER_ADMIN, otherwise this endpoint
    // is a privilege-escalation route.
    @IsIn(['DISPATCHER', 'DRIVER'])
    role: 'DISPATCHER' | 'DRIVER';
}