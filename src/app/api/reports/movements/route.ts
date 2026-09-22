import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateExcelReport } from '@/lib/report-templates/excel-utils';
import { generateWordReport } from '@/lib/report-templates/word-utils';
import { MovementsReportPDF } from '@/lib/report-templates/pdf-templates';
import { renderToBuffer } from '@react-pdf/renderer';

// GET /api/reports/movements?format=pdf|excel|word
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'excel';

    const movements = await db.movement.findMany({
      include: { cargoItem: true, fromLocation: true, toLocation: true },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    const today = new Date().toISOString().split('T')[0];

    // Common column definitions
    const columns = [
      { header: 'Reference', key: 'ref', width: 16 },
      { header: 'Cargo', key: 'cargo', width: 16 },
      { header: 'Type', key: 'type', width: 12 },
      { header: 'From', key: 'from', width: 12 },
      { header: 'To', key: 'to', width: 12 },
      { header: 'Equipment', key: 'equip', width: 16 },
      { header: 'Operator', key: 'op', width: 14 },
      { header: 'Date', key: 'date', width: 14 },
    ];

    const mappedRows = movements.map(m => ({
      ref: m.movementRef,
      cargo: m.cargoCode,
      type: m.type,
      from: m.fromLocation?.code || '—',
      to: m.toLocation?.code || '—',
      equip: m.equipmentUsed || '—',
      op: m.operatorName || '—',
      date: m.createdAt.toISOString().split('T')[0],
    }));

    // ---- PDF format ----
    if (format === 'pdf') {
      const pdfData = {
        totalMovements: movements.length,
        movements: movements.map(m => ({
          movementRef: m.movementRef,
          cargoCode: m.cargoCode,
          type: m.type,
          fromLocation: m.fromLocation?.code || '—',
          toLocation: m.toLocation?.code || '—',
          equipment: m.equipmentUsed || '—',
          operator: m.operatorName || '—',
          date: m.createdAt.toISOString().split('T')[0],
        })),
      };
      const pdfDoc = MovementsReportPDF({ data: pdfData });
      const buffer = await renderToBuffer(pdfDoc);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="movements-report-${today}.pdf"`,
        },
      });
    }

    // ---- Word format ----
    if (format === 'word') {
      const buffer = await generateWordReport(
        'Movements Report',
        `CL WMS — ${movements.length} movements`,
        columns,
        mappedRows
      );
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="movements-report-${today}.docx"`,
        },
      });
    }

    // ---- Excel format (default) ----
    const buffer = await generateExcelReport(
      'Movements Report',
      `CL WMS — ${movements.length} movements`,
      columns,
      mappedRows
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="movements-report-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Movements report error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
