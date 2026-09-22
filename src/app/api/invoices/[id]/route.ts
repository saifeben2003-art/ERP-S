import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/invoices/[id] — Get single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = await db.invoice.findUnique({
      where: { id },
      include: { items: true, payments: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ data: invoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

// PATCH /api/invoices/[id] — Update invoice (issue, cancel, record payment)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, paymentAmount, paymentMethod, paymentReference, paymentNotes } = body;

    const existing = await db.invoice.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    if (action === 'issue') {
      // DRAFT → ISSUED
      if (existing.status !== 'DRAFT') {
        return NextResponse.json({ error: 'Only draft invoices can be issued' }, { status: 400 });
      }
      const invoice = await db.invoice.update({
        where: { id },
        data: { status: 'ISSUED' },
        include: { items: true },
      });
      return NextResponse.json({ data: invoice });
    }

    if (action === 'cancel') {
      if (existing.status === 'PAID') {
        return NextResponse.json({ error: 'Cannot cancel a paid invoice' }, { status: 400 });
      }
      const invoice = await db.invoice.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      return NextResponse.json({ data: invoice });
    }

    if (action === 'payment') {
      // Record a payment
      if (!paymentAmount || paymentAmount <= 0) {
        return NextResponse.json({ error: 'Payment amount must be positive' }, { status: 400 });
      }

      const newPaidAmount = existing.paidAmount + paymentAmount;
      const newBalanceDue = Math.max(0, existing.totalAmount - newPaidAmount);
      const newStatus = newBalanceDue <= 0 ? 'PAID' : 'PARTIAL';

      const [invoice] = await Promise.all([
        db.invoice.update({
          where: { id },
          data: {
            paidAmount: newPaidAmount,
            balanceDue: newBalanceDue,
            status: newStatus,
          },
          include: { items: true, payments: true },
        }),
        db.invoicePayment.create({
          data: {
            invoiceId: id,
            amount: paymentAmount,
            method: paymentMethod || 'BANK_TRANSFER',
            reference: paymentReference,
            notes: paymentNotes,
          },
        }),
      ]);

      return NextResponse.json({ data: invoice });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}
