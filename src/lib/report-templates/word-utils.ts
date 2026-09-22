// ==================== Word/DOCX Report Utilities ====================
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, HeadingLevel,
  ShadingType, Footer, PageNumber,
} from 'docx';

export interface WordReportColumn {
  header: string;
  key: string;
  width?: number; // percentage of page width
}

const COLORS = {
  primary: '0F172A',
  accent: '059669',
  muted: '64748B',
  border: 'E2E8F0',
  altRow: 'F8FAFC',
  white: 'FFFFFF',
  headerBg: '0F172A',
  summaryBg: 'F0FDF4',
};

// Default column widths (percentage) that sum to 100
function normalizeWidths(columns: WordReportColumn[]): number[] {
  const total = columns.reduce((s, c) => s + (c.width || 15), 0);
  return columns.map(c => Math.round(((c.width || 15) / total) * 100));
}

export async function generateWordReport(
  title: string,
  subtitle: string,
  columns: WordReportColumn[],
  rows: Record<string, unknown>[],
  summaryRows?: Record<string, unknown>[]
): Promise<Buffer> {
  const widths = normalizeWidths(columns);
  const today = new Date().toISOString().split('T')[0];

  // ---- Header rows ----
  const headerParagraphs: Paragraph[] = [
    // Company name
    new Paragraph({
      children: [
        new TextRun({
          text: 'CL WMS — Combi Lift',
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: COLORS.primary,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 80 },
    }),
    // Report title
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 26, // 13pt
          font: 'Calibri',
          color: COLORS.primary,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 60 },
    }),
    // Subtitle + date
    new Paragraph({
      children: [
        new TextRun({
          text: `${subtitle} | Generated: ${today}`,
          size: 18, // 9pt
          font: 'Calibri',
          color: COLORS.muted,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
    }),
  ];

  // ---- Table header row ----
  const tableHeaderRow = new TableRow({
    tableHeader: true,
    children: columns.map((col, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.PERCENTAGE },
        shading: {
          type: ShadingType.SOLID,
          color: COLORS.headerBg,
          fill: COLORS.headerBg,
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: col.header,
                bold: true,
                size: 18, // 9pt
                font: 'Calibri',
                color: COLORS.white,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 40 },
          }),
        ],
        borders: {
          bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.border },
        },
      })
    ),
  });

  // ---- Data rows ----
  const dataRows: TableRow[] = rows.map((row, rowIdx) => {
    const isAlt = rowIdx % 2 === 1;
    return new TableRow({
      children: columns.map((col, colIdx) =>
        new TableCell({
          width: { size: widths[colIdx], type: WidthType.PERCENTAGE },
          shading: isAlt
            ? { type: ShadingType.SOLID, color: COLORS.altRow, fill: COLORS.altRow }
            : undefined,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: String(row[col.key] ?? ''),
                  size: 18, // 9pt
                  font: 'Calibri',
                  color: '334155',
                }),
              ],
              spacing: { before: 30, after: 30 },
            }),
          ],
          borders: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.border },
          },
        })
      ),
    });
  });

  // ---- Summary rows ----
  const summaryRowObjects: TableRow[] = [];
  if (summaryRows && summaryRows.length > 0) {
    // Add a small spacer row (empty, no borders — just spacing)
    // Then summary header-style row
    summaryRows.forEach((row) => {
      summaryRowObjects.push(
        new TableRow({
          children: columns.map((col, colIdx) =>
            new TableCell({
              width: { size: widths[colIdx], type: WidthType.PERCENTAGE },
              shading: {
                type: ShadingType.SOLID,
                color: COLORS.summaryBg,
                fill: COLORS.summaryBg,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: String(row[col.key] ?? ''),
                      bold: true,
                      size: 18, // 9pt
                      font: 'Calibri',
                      color: '334155',
                    }),
                  ],
                  spacing: { before: 30, after: 30 },
                }),
              ],
              borders: {
                bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent },
              },
            })
          ),
        })
      );
    });
  }

  // ---- Build Document ----
  const doc = new Document({
    creator: 'CL WMS',
    title,
    description: subtitle,
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 20, // 10pt default
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'CL WMS — Combi Lift | Confidential  |  ',
                    size: 14, // 7pt
                    font: 'Calibri',
                    color: COLORS.muted,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 14,
                    font: 'Calibri',
                    color: COLORS.muted,
                  }),
                  new TextRun({
                    text: ' / ',
                    size: 14,
                    font: 'Calibri',
                    color: COLORS.muted,
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 14,
                    font: 'Calibri',
                    color: COLORS.muted,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 100 },
              }),
            ],
          }),
        },
        children: [
          ...headerParagraphs,
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [tableHeaderRow, ...dataRows, ...summaryRowObjects],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
