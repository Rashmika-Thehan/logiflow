import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateShipmentDto } from '../shipments/dto/create-shipment.dto';

export interface RowResult {
    ok: boolean;
    dto?: CreateShipmentDto;
    errors?: string[];
}

export async function validateRow(raw: Record<string, string>): Promise<RowResult> {
    // enableImplicitConversion: CSV/Excel cells arrive as strings; this coerces
    // "2.5" -> 2.5 against CreateShipmentDto's @IsNumber() fields using the
    // reflected TS types (works because emitDecoratorMetadata is on).
    const dto = plainToInstance(CreateShipmentDto, raw, { enableImplicitConversion: true });
    const violations = await validate(dto, { whitelist: true });

    if (violations.length > 0) {
        const errors = violations.flatMap((v) => Object.values(v.constraints ?? {}));
        return { ok: false, errors };
    }
    return { ok: true, dto };
}