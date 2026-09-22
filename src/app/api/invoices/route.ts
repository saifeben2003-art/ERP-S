import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateInvoiceNumber, calculateVAT, calculateDueDate, UAE_VAT_RATE } from '@/lib/invoice/pricing';

// GET /api/invoices — List invoices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const branch = searchParams.get('branch');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (branch) where.branch = branch;

    const [invoices, total] = await Promise.all([
      db.invoice.findMany({
        where,
        include: { items: true, _count: { select: { payments: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.invoice.count({ where }),
    ]);

    // Aging summary
    const allOutstanding = await db.invoice.findMany({
      where: { status: { in: ['ISSUED', 'PARTIAL', 'OVERDUE'] } },
      select: { balanceDue: true, dueDate: true },
    });

    const aging = { CURRENT: 0, '1-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };
    const now = new Date();
    for (const inv of allOutstanding) {
      const daysOverdue = Math.floor((now.getTime() - inv.dueDate.getTime()) / 86400000);
      if (daysOverdue <= 0) aging.CURRENT += inv.balanceDue;
      else if (daysOverdue <= 30) aging['1-30'] += inv.balanceDue;
      else if (daysOverdue <= 60) aging['31-60'] += inv.balanceDue;
      else if (daysOverdue <= 90) aging['61-90'] += inv.balanceDue;
      else aging['90+'] += inv.balanceDue;
    }

    return NextResponse.json({
      items: invoices,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      aging,
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

// POST /api/invoices — Create invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type, clientId, clientName, clientEmail, clientAddress,
      periodStart, periodEnd, branch, paymentTerms, notes,
      projectId, poReference, contractRef,
      items,
    } = body;

    if (!type || !clientId || !clientName || !items?.length) {
      return NextResponse.json({ error: 'Type, client, and items are required' }, { status: 400 });
    }

    // Calculate totals from items
    const subtotal = items.reduce((sum: number, item: { lineTotal: number }) => sum + item.lineTotal, 0);
    const taxAmount = calculateVAT(subtotal);
    const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;

    // Generate invoice number
    const typeCode = type.substring(0, 3);
    const count = await db.invoice.count({ where: { type, branch: branch || 'DXB' } });
    const invoiceNumber = generateInvoiceNumber(branch || 'DXB', typeCode, count + 1);

    const issueDate = new Date();
    const dueDate = calculateDueDate(issueDate, paymentTerms || 'NET_30');

    const invoice = await db.invoice.create({
      data: {
        invoiceNumber,
        type,
        clientId,
        clientName,
        clientEmail,
        clientAddress,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        issueDate,
        dueDate,
        subtotal,
        taxRate: UAE_VAT_RATE,
        taxAmount,
        totalAmount,
        balanceDue: totalAmount,
        branch: branch || 'DXB',
        paymentTerms: paymentTerms || 'NET_30',
        notes,
        projectId,
        poReference,
        contractRef,
        items: {
          create: items.map((item: { lineNumber: number; description: string; quantity: number; unit: string; unitPrice: number; discountPercent?: number; lineTotal: number; cargoItemId?: string; locationId?: string; equipmentId?: string }, idx: number) => ({
            lineNumber: item.lineNumber || idx + 1,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit || 'DAY',
            unitPrice: item.unitPrice,
            discountPercent: item.discountPercent || 0,
            lineTotal: item.lineTotal,
            cargoItemId: item.cargoItemId,
            locationId: item.locationId,
            equipmentId: item.equipmentId,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
