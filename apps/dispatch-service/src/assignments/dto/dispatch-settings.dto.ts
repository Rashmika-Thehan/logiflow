import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateDispatchSettingsDto {
    @IsOptional() @IsBoolean() allowPlatformDrivers?: boolean;

    // Required when turning the pool on: customer details go to independent drivers.
    @IsOptional() @IsBoolean() acknowledgeDataSharing?: boolean;

    // How many own-driver offers may be rejected or time out before the pool is used.
    @IsOptional() @IsInt() @Min(1) @Max(10) maxOwnAttempts?: number;
}