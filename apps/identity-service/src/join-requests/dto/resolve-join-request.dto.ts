import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveJoinRequestDto {
    // Optional: defaults to the role the person asked for.
    @IsOptional()
    @IsIn(['DISPATCHER', 'DRIVER'])
    role?: 'DISPATCHER' | 'DRIVER';
}

export class RejectJoinRequestDto {
    @IsOptional() @IsString() @MaxLength(300)
    reason?: string;
}

export class ListJoinRequestsQueryDto {
    @IsOptional()
    @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}