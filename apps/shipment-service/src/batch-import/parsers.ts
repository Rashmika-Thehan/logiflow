import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { BadRequestException } from '@nestjs/common';

/** Parses a CSV or XLSX buffer into an array of plain row objects keyed by header. */
export function parseImportFile(buffer: Buffer, filename: string): Record<string, string>[] {
    const isExcel = /\.xlsx?$/i.test(filename);

    if (isExcel) {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json(sheet, { defval: '' });
    }

    if (/\.csv$/i.test(filename)) {
        return parse(buffer, { columns: true, skip_empty_lines: true, trim: true });
    }

    throw new BadRequestException('Only .csv, .xls, and .xlsx files are supported');
}