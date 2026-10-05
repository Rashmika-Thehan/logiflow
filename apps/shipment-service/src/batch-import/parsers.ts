import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { BadRequestException } from '@nestjs/common';

const DATE_FIELDS = ['deliveryWindowStart', 'deliveryWindowEnd'];

function normalizeDateFields(row: Record<string, any>) {
    const normalized = { ...row };
    for (const field of DATE_FIELDS) {
        if (normalized[field] instanceof Date) {
            normalized[field] = normalized[field].toISOString();
        }
    }
    return normalized;
}

export function parseImportFile(buffer: Buffer, filename: string): Record<string, any>[] {
    const isExcel = /\.xlsx?$/i.test(filename);
    const isCsv = /\.csv$/i.test(filename);
    if (!isExcel && !isCsv) {
        throw new BadRequestException('Only .csv, .xls, and .xlsx files are supported');
    }

    try {
        if (isExcel) {
            // cellDates: true — date cells become real JS Date objects instead of
            // Excel's numeric serial values, so normalizeDateFields can convert
            // them to proper ISO strings before they ever reach validation.
            const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            if (!sheet) throw new Error('Workbook has no sheets');
            return (XLSX.utils.sheet_to_json(sheet, { defval: '' }) as Record<string, any>[]).map(normalizeDateFields);
        }
        return parse(buffer, { columns: true, skip_empty_lines: true, trim: true });
    } catch (err: any) {
        // A malformed CSV (unclosed quote, ragged columns) or a corrupt
        // workbook should be a 400, not a 500 — this is a client mistake.
        throw new BadRequestException(`Could not parse file: ${err.message}`);
    }
}