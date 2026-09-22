import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateExcelReport } from '@/lib/report-templates/excel-utils';
import { generateWordReport } from '@/lib/report-templates/word-utils';
import { GenericReportPDF } from '@/lib/report-templates/pdf-templates';
import { renderToBuffer } from '@react-pdf/renderer';

// GET /api/reports/invoices?format=pdf|excel|word
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'excel';

    const invoices = await db.invoice.findMany({
      include: {
        items: true,
        payments: true,
      },
      orderBy: { issueDate: 'desc' },
      take: 200,
    });

    const today = new Date().toISOString().split('T')[0];

    const totalSubtotal = invoices.reduce((s, i) => s + i.subtotal, 0);
    const totalTax = invoices.reduce((s, i) => s + i.taxAmount, 0);
    const totalAmount = invoices.reduce((s, i) => s + i.totalAmount, 0);
    const totalPaid = invoices.reduce((s, i) => s + i.paidAmount, 0);
    const totalOutstanding = invoices.reduce((s, i) => s + i.balanceDue, 0);

    // Column definitions
    const columns = [
      { header: 'Invoice #', key: 'invoiceNo', width: 20 },
      { header: 'Client', key: 'client', width: 20 },
      { header: 'Type', key: 'type', width: 12 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Subtotal', key: 'subtotal', width: 12 },
      { header: 'VAT (5%)', key: 'tax', width: 10 },
      { header: 'Total (AED)', key: 'total', width: 12 },
      { header: 'Paid', key: 'paid', width: 10 },
      { header: 'Balance', key: 'balance', width: 10 },
      { header: 'Due Date', key: 'dueDate', width: 12 },
    ];

    const mappedRows = invoices.map(inv => ({
      invoiceNo: inv.invoiceNumber,
      client: inv.clientName,
      type: inv.type,
      status: inv.status,
      subtotal: inv.subtotal.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      tax: inv.taxAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      total: inv.totalAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      paid: inv.paidAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      balance: inv.balanceDue.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      dueDate: inv.dueDate.toISOString().split('T')[0],
    }));

    const summaryRows = [
      {
        invoiceNo: 'TOTAL',
        client: '',
        type: '',
        status: '',
        subtotal: totalSubtotal.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        tax: totalTax.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        total: totalAmount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        paid: totalPaid.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        balance: totalOutstanding.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        dueDate: '',
      },
    ];

    // ---- PDF format ----
    if (format === 'pdf') {
      const pdfData = {
        title: 'Invoice Report',
        subtitle: `CL WMS — ${invoices.length} invoices | All amounts in AED`,
        columns: columns.map(c => c.header),
        rows: mappedRows.map(row => columns.map(c => String(row[c.key as keyof typeof row] ?? ''))),
        summary: [
          { label: 'Total Invoices', value: String(invoices.length) },
          { label: 'Total Amount (AED)', value: totalAmount.toLocaleString('en-AE', { minimumFractionDigits: 2 }) },
          { label: 'Total Paid (AED)', value: totalPaid.toLocaleString('en-AE', { minimumFractionDigits: 2 }) },
          { label: 'Outstanding (AED)', value: totalOutstanding.toLocaleString('en-AE', { minimumFractionDigits: 2 }) },
        ],
      };
      const pdfDoc = GenericReportPDF({ data: pdfData });
      const buffer = await renderToBuffer(pdfDoc);
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="invoice-report-${today}.pdf"`,
        },
      });
    }

    // ---- Word format ----
    if (format === 'word') {
      const buffer = await generateWordReport(
        'Invoice Report',
        `CL WMS — ${invoices.length} invoices | All amounts in AED`,
        columns,
        mappedRows,
        summaryRows
      );
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="invoice-report-${today}.docx"`,
        },
      });
    }

    // ---- Excel format (default) ----
    const buffer = await generateExcelReport(
      'Invoice Report',
      `CL WMS — ${invoices.length} invoices | All amounts in AED`,
      columns,
      mappedRows,
      summaryRows
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="invoice-report-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Invoice report error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice report' }, { status: 500 });
  }
}
