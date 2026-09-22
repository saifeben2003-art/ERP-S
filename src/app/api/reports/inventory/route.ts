import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateExcelReport } from '@/lib/report-templates/excel-utils';
import { generateWordReport } from '@/lib/report-templates/word-utils';
import { InventoryReportPDF } from '@/lib/report-templates/pdf-templates';
import { renderToBuffer } from '@react-pdf/renderer';

// GET /api/reports/inventory?format=pdf|excel|word
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'excel';

    const [cargoItems, locations] = await Promise.all([
      db.cargoItem.findMany({
        where: { isDeleted: false },
        include: { location: true },
        orderBy: { cargoCode: 'asc' },
      }),
      db.location.findMany(),
    ]);

    const totalWeight = cargoItems.reduce((sum, c) => sum + c.weight, 0);
    const totalVolume = cargoItems.reduce((sum, c) => sum + (c.volume || 0), 0);

    const today = new Date().toISOString().split('T')[0];

    // Common column definitions
    const columns = [
      { header: 'Code', key: 'code', width: 16 },
      { header: 'Description', key: 'desc', width: 30 },
      { header: 'Status', key: 'status', width: 14 },
      { header: 'Location', key: 'location', width: 12 },
      { header: 'Weight (kg)', key: 'weight', width: 14 },
      { header: 'Category', key: 'category', width: 14 },
      { header: 'Type', key: 'type', width: 14 },
      { header: 'Customs', key: 'customs', width: 14 },
    ];

    const mappedRows = cargoItems.map(c => ({
      code: c.cargoCode,
      desc: c.description,
      status: c.status,
      location: c.location?.code || '—',
      weight: c.weight,
      category: c.liftCategory,
      type: c.commodityType,
      customs: c.customsStatus,
    }));

    const summaryRows = [
      { code: 'TOTAL', desc: '', status: '', location: '', weight: totalWeight, category: '', type: '', customs: `${cargoItems.length} items` },
    ];

    // ---- PDF format ----
    if (format === 'pdf') {
      const pdfData = {
        totalCargo: cargoItems.length,
        totalWeight,
        totalVolume,
        items: cargoItems.map(c => ({
          cargoCode: c.cargoCode,
          description: c.description,
          status: c.status,
          location: c.location?.code || '—',
          weight: c.weight,
          liftCategory: c.liftCategory,
          commodityType: c.commodityType,
          customsStatus: c.customsStatus,
        })),
      };
      const pdfDoc = InventoryReportPDF({ data: pdfData });
      const buffer = await renderToBuffer(pdfDoc);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="inventory-report-${today}.pdf"`,
        },
      });
    }

    // ---- Word format ----
    if (format === 'word') {
      const buffer = await generateWordReport(
        'Inventory Report',
        `CL WMS — ${cargoItems.length} items | ${totalWeight.toLocaleString()} kg`,
        columns,
        mappedRows,
        summaryRows
      );
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="inventory-report-${today}.docx"`,
        },
      });
    }

    // ---- Excel format (default) ----
    const buffer = await generateExcelReport(
      'Inventory Report',
      `CL WMS — ${cargoItems.length} items | ${totalWeight.toLocaleString()} kg`,
      columns,
      mappedRows,
      summaryRows
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="inventory-report-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Inventory report error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
