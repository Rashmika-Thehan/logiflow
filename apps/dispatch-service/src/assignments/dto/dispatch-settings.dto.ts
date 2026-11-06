import { IsBoolean, IsInt, Max, Min, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

const StrictBoolean = () =>
    Transform(({ value }) => {
        if (value === true || value === 'true') return true;
        if (value === false || value === 'false') return false;
        return value;
    });

export class UpdateDispatchSettingsDto {
    @ValidateIf((_, val) => val !== undefined)
    @StrictBoolean()
    @IsBoolean()
    allowPlatformDrivers?: boolean;

    @ValidateIf((_, val) => val !== undefined)
    @StrictBoolean()
    @IsBoolean()
    acknowledgeDataSharing?: boolean;

    @ValidateIf((_, val) => val !== undefined)
    @IsInt()
    @Min(1)
    @Max(10)
    maxOwnAttempts?: number;
}