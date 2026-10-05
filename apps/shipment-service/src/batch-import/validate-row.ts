import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateShipmentDto } from '../shipments/dto/create-shipment.dto';

export interface RowResult {
    ok: boolean;
    dto?: CreateShipmentDto;
    errors?: string[];
}

// '' from a spreadsheet cell is ambiguous: implicit conversion turns it into
// 0 for a required number (silently wrong data, passes validation) and
// leaves it as a non-undefined string for an optional field (@IsOptional()
// only skips undefined, so '' incorrectly fails). Normalizing blank cells
// to undefined first makes both cases behave correctly: required fields
// report "missing", optional fields are cleanly skipped.
function blankToUndefined(raw: Record<string, any>): Record<string, any> {
    const out: Record<string, any> = {};
    for (const [key, value] of Object.entries(raw)) {
        out[key] = value === '' ? undefined : value;
    }
    return out;
}

export async function validateRow(raw: Record<string, any>): Promise<RowResult> {
    const cleaned = blankToUndefined(raw);
    const dto = plainToInstance(CreateShipmentDto, cleaned, { enableImplicitConversion: true });
    const violations = await validate(dto, { whitelist: true });

    if (violations.length > 0) {
        const errors = violations.flatMap((v) => Object.values(v.constraints ?? {}));
        return { ok: false, errors };
    }
    return { ok: true, dto };
}