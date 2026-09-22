import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateExcelReport } from '@/lib/report-templates/excel-utils';
import { generateWordReport } from '@/lib/report-templates/word-utils';
import { GenericReportPDF } from '@/lib/report-templates/pdf-templates';
import { renderToBuffer } from '@react-pdf/renderer';

// GET /api/reports/aging?format=pdf|excel|word
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'excel';

    // Fetch outstanding invoices (not fully paid or cancelled)
    const invoices = await db.invoice.findMany({
      where: {
        status: { in: ['ISSUED', 'OVERDUE', 'PARTIAL'] },
      },
      include: {
        payments: true,
      },
      orderBy: { dueDate: 'asc' },
    });

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Aging buckets: 0-30, 31-60, 61-90, 91-120, 120+ days
    const BUCKETS = ['Current', '31-60 Days', '61-90 Days', '91-120 Days', '120+ Days'] as const;

    // Calculate aging per invoice
    const agingData = invoices.map(inv => {
      const daysPastDue = Math.max(0, Math.floor((today.getTime() - inv.dueDate.getTime()) / (24 * 60 * 60 * 1000)));
      let bucket: string;
      if (daysPastDue <= 30) bucket = BUCKETS[0];
      else if (daysPastDue <= 60) bucket = BUCKETS[1];
      else if (daysPastDue <= 90) bucket = BUCKETS[2];
      else if (daysPastDue <= 120) bucket = BUCKETS[3];
      else bucket = BUCKETS[4];

      return {
        invoiceNo: inv.invoiceNumber,
        client: inv.clientName,
        type: inv.type,
        originalAmount: inv.totalAmount,
        paidAmount: inv.paidAmount,
        balanceDue: inv.balanceDue,
        dueDate: inv.dueDate.toISOString().split('T')[0],
        daysPastDue,
        bucket,
      };
    });

    // Bucket totals
    const bucketTotals = BUCKETS.map(bucket => {
      const items = agingData.filter(a => a.bucket === bucket);
      return {
        bucket,
        count: items.length,
        total: items.reduce((s, i) => s + i.balanceDue, 0),
      };
    });

    const totalOutstanding = agingData.reduce((s, i) => s + i.balanceDue, 0);

    // ---- Column definitions for detail table ----
    const columns = [
      { header: 'Invoice #', key: 'invoiceNo', width: 18 },
      { header: 'Client', key: 'client', width: 18 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Original (AED)', key: 'original', width: 14 },
      { header: 'Paid (AED)', key: 'paid', width: 12 },
      { header: 'Balance (AED)', key: 'balance', width: 14 },
      { header: 'Due Date', key: 'dueDate', width: 12 },
      { header: 'Days Past Due', key: 'daysPast', width: 12 },
      { header: 'Aging Bucket', key: 'bucket', width: 14 },
    ];

    const mappedRows = agingData.map(a => ({
      invoiceNo: a.invoiceNo,
      client: a.client,
      type: a.type,
      original: a.originalAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      paid: a.paidAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      balance: a.balanceDue.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      dueDate: a.dueDate,
      daysPast: String(a.daysPastDue),
      bucket: a.bucket,
    }));

    // Summary: bucket totals
    const summaryRows = bucketTotals.map(b => ({
      invoiceNo: b.bucket,
      client: `${b.count} invoices`,
      type: '',
      original: '',
      paid: '',
      balance: b.total.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      dueDate: '',
      daysPast: '',
      bucket: '',
    }));

    // ---- PDF format ----
    if (format === 'pdf') {
      const pdfData = {
        title: 'Aging Report',
        subtitle: `CL WMS — Outstanding receivables in AED`,
        columns: columns.map(c => c.header),
        rows: mappedRows.map(row => columns.map(c => String(row[c.key as keyof typeof row] ?? ''))),
        summary: [
          { label: 'Total Outstanding (AED)', value: totalOutstanding.toLocaleString('en-AE', { minimumFractionDigits: 2 }) },
          ...bucketTotals.map(b => ({ label: b.bucket, value: `${b.count} invoices / AED ${b.total.toLocaleString('en-AE', { minimumFractionDigits: 2 })}` })),
        ],
      };
      const pdfDoc = GenericReportPDF({ data: pdfData });
      const buffer = await renderToBuffer(pdfDoc);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="aging-report-${todayStr}.pdf"`,
        },
      });
    }

    // ---- Word format ----
    if (format === 'word') {
      const buffer = await generateWordReport(
        'Aging Report',
        `CL WMS — Outstanding receivables in AED`,
        columns,
        mappedRows,
        summaryRows
      );
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="aging-report-${todayStr}.docx"`,
        },
      });
    }

    // ---- Excel format (default) ----
    const buffer = await generateExcelReport(
      'Aging Report',
      `CL WMS — Outstanding receivables in AED`,
      columns,
      mappedRows,
      summaryRows
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="aging-report-${todayStr}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Aging report error:', error);
    return NextResponse.json({ error: 'Failed to generate aging report' }, { status: 500 });
  }
}
