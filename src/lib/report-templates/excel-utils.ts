// ==================== Excel Report Utilities ====================
import ExcelJS from 'exceljs';

export interface ReportColumn {
  header: string;
  key: string;
  width?: number;
  style?: Partial<ExcelJS.Style>;
}

const HEADER_STYLE: Partial<ExcelJS.Style> = {
  font: { bold: true, size: 11, color: { argb: 'FFFFFFFF' } },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } },
  alignment: { horizontal: 'center', vertical: 'middle' },
  border: {
    bottom: { style: 'thin', color: { argb: 'FF334155' } },
  },
};

const CELL_STYLE: Partial<ExcelJS.Style> = {
  font: { size: 10 },
  alignment: { vertical: 'middle' },
  border: {
    bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } },
  },
};

const ALT_ROW_FILL: Partial<ExcelJS.Style> = {
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } },
};

export async function generateExcelReport(
  title: string,
  subtitle: string,
  columns: ReportColumn[],
  rows: Record<string, unknown>[],
  summaryRows?: Record<string, unknown>[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'CL WMS';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(title);

  // Title row
  sheet.mergeCells(1, 1, 1, columns.length);
  const titleCell = sheet.getCell(1, 1);
  titleCell.value = title;
  titleCell.font = { bold: true, size: 16, color: { argb: 'FF0F172A' } };
  titleCell.alignment = { horizontal: 'center' };
  sheet.getRow(1).height = 30;

  // Subtitle row
  sheet.mergeCells(2, 1, 2, columns.length);
  const subCell = sheet.getCell(2, 1);
  subCell.value = `${subtitle} | Generated: ${new Date().toISOString().split('T')[0]}`;
  subCell.font = { size: 9, color: { argb: 'FF64748B' } };
  subCell.alignment = { horizontal: 'center' };
  sheet.getRow(2).height = 20;

  // Header row (row 4)
  const headerRow = sheet.getRow(4);
  columns.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.style = HEADER_STYLE;
  });
  headerRow.height = 24;

  // Set column widths
  columns.forEach((col, i) => {
    sheet.getColumn(i + 1).width = col.width || 15;
  });

  // Data rows
  rows.forEach((row, rowIdx) => {
    const dataRow = sheet.getRow(rowIdx + 5);
    columns.forEach((col, colIdx) => {
      const cell = dataRow.getCell(colIdx + 1);
      cell.value = String(row[col.key] ?? '');
      cell.style = { ...CELL_STYLE, ...(rowIdx % 2 === 1 ? ALT_ROW_FILL : {}) };
    });
  });

  // Summary rows (if any)
  if (summaryRows && summaryRows.length > 0) {
    const startRow = rows.length + 6;
    const sumHeaderRow = sheet.getRow(startRow);
    sumHeaderRow.height = 20;
    columns.forEach((col, i) => {
      const cell = sumHeaderRow.getCell(i + 1);
      cell.style = {
        font: { bold: true, size: 10, color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } },
      };
    });

    summaryRows.forEach((row, rowIdx) => {
      const dataRow = sheet.getRow(startRow + rowIdx + 1);
      columns.forEach((col, colIdx) => {
        const cell = dataRow.getCell(colIdx + 1);
        cell.value = String(row[col.key] ?? '');
        cell.style = {
          font: { bold: true, size: 10 },
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } },
        };
      });
    });
  }

  // Freeze header
  sheet.views = [{ state: 'frozen', ySplit: 4 }];

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
