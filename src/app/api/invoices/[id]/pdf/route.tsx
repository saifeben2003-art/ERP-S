import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Register Inter font (using Helvetica as fallback for server-side)
const COLORS = {
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#059669',
  text: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
  bg: '#F8FAFC',
  white: '#FFFFFF',
  vat: '#D97706',
};

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: COLORS.text },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, paddingBottom: 15, borderBottom: `2px solid ${COLORS.primary}` },
  headerLeft: { flexDirection: 'column' },
  company: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  subtitle: { fontSize: 9, color: COLORS.muted },
  headerRight: { flexDirection: 'column', alignItems: 'flex-end' },
  invoiceTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  invoiceNumber: { fontSize: 11, color: COLORS.accent, fontWeight: 'bold' },
  dateText: { fontSize: 9, color: COLORS.muted },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: COLORS.primary, marginTop: 15, marginBottom: 6, paddingBottom: 3, borderBottom: `1px solid ${COLORS.border}` },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoCol: { flexDirection: 'column', width: '48%' },
  infoLabel: { fontSize: 8, color: COLORS.muted, marginBottom: 2 },
  infoValue: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, marginBottom: 6 },
  table: { marginTop: 5 },
  tableHeader: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 6 },
  tableHeaderCell: { fontSize: 8, fontWeight: 'bold', color: COLORS.white },
  tableRow: { flexDirection: 'row', padding: 5, borderBottom: `0.5px solid ${COLORS.border}` },
  tableRowAlt: { flexDirection: 'row', padding: 5, borderBottom: `0.5px solid ${COLORS.border}`, backgroundColor: COLORS.bg },
  tableCell: { fontSize: 9, color: COLORS.text },
  tableCellRight: { fontSize: 9, color: COLORS.text, textAlign: 'right' },
  tableCellBold: { fontSize: 9, color: COLORS.primary, fontWeight: 'bold' },
  totalsSection: { marginTop: 10, flexDirection: 'column', alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, marginBottom: 4 },
  totalLabel: { fontSize: 9, color: COLORS.text },
  totalValue: { fontSize: 9, color: COLORS.primary, fontWeight: 'bold' },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, marginBottom: 4, paddingTop: 4, borderTop: `1px solid ${COLORS.primary}` },
  grandTotalLabel: { fontSize: 11, color: COLORS.primary, fontWeight: 'bold' },
  grandTotalValue: { fontSize: 11, color: COLORS.primary, fontWeight: 'bold' },
  vatBadge: { fontSize: 7, color: COLORS.vat, fontWeight: 'bold' },
  paymentsSection: { marginTop: 15 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 3, borderBottom: `0.5px solid ${COLORS.border}` },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', borderTop: `1px solid ${COLORS.border}`, paddingTop: 8 },
  footerText: { fontSize: 7, color: COLORS.muted },
  statusBadge: { fontSize: 9, fontWeight: 'bold', marginBottom: 5 },
});

const fmt = (n: number) => n.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const STATUS_COLORS: Record<string, string> = {
  DRAFT: COLORS.muted,
  ISSUED: '#2563EB',
  PAID: '#059669',
  PARTIAL: '#D97706',
  OVERDUE: '#DC2626',
  CANCELLED: '#6B7280',
};

const TYPE_LABELS: Record<string, string> = {
  STORAGE: 'Storage Invoice',
  HANDLING: 'Handling Invoice',
  CUSTOMS: 'Customs Invoice',
  TRANSPORT: 'Transport Invoice',
  EQUIPMENT: 'Equipment Rental Invoice',
  CREDIT_NOTE: 'Credit Note',
};

const BRANCH_NAMES: Record<string, string> = {
  AUH: 'Abu Dhabi', DXB: 'Dubai', SHJ: 'Sharjah',
  AJM: 'Ajman', RAK: 'Ras Al Khaimah', FJR: 'Fujairah',
};

const PAYMENT_LABELS: Record<string, string> = {
  NET_15: 'Net 15 Days', NET_30: 'Net 30 Days', NET_60: 'Net 60 Days',
  NET_90: 'Net 90 Days', IMMEDIATE: 'Immediate',
};

function InvoicePDF({ invoice }: { invoice: any }) {
  const items = invoice.items || [];
  const payments = invoice.payments || [];
  const colWidths = [30, 180, 50, 40, 80, 80, 55]; // #, Desc, Qty, Unit, UnitPrice, LineTotal, Disc

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>CL WMS — Combi Lift</Text>
            <Text style={styles.subtitle}>Heavy Lift Warehouse Management System</Text>
            <Text style={styles.subtitle}>{BRANCH_NAMES[invoice.branch] || invoice.branch} Branch, UAE</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>{TYPE_LABELS[invoice.type] || invoice.type}</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
            <Text style={styles.dateText}>Issued: {new Date(invoice.issueDate).toLocaleDateString('en-GB')}</Text>
            <Text style={styles.dateText}>Due: {new Date(invoice.dueDate).toLocaleDateString('en-GB')}</Text>
          </View>
        </View>

        {/* Status */}
        <Text style={{ ...styles.statusBadge, color: STATUS_COLORS[invoice.status] || COLORS.text }}>
          Status: {invoice.status}
        </Text>

        {/* Client Info */}
        <Text style={styles.sectionTitle}>Client Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>CLIENT NAME</Text>
            <Text style={styles.infoValue}>{invoice.clientName}</Text>
            <Text style={styles.infoLabel}>CLIENT ID</Text>
            <Text style={styles.infoValue}>{invoice.clientId}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>EMAIL</Text>
            <Text style={styles.infoValue}>{invoice.clientEmail || '—'}</Text>
            <Text style={styles.infoLabel}>PAYMENT TERMS</Text>
            <Text style={styles.infoValue}>{PAYMENT_LABELS[invoice.paymentTerms] || invoice.paymentTerms}</Text>
          </View>
        </View>

        {/* Period */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>PERIOD</Text>
            <Text style={styles.infoValue}>
              {new Date(invoice.periodStart).toLocaleDateString('en-GB')} — {new Date(invoice.periodEnd).toLocaleDateString('en-GB')}
            </Text>
          </View>
          <View style={styles.infoCol}>
            {invoice.poReference && (<><Text style={styles.infoLabel}>PO REFERENCE</Text><Text style={styles.infoValue}>{invoice.poReference}</Text></>)}
            {invoice.contractRef && (<><Text style={styles.infoLabel}>CONTRACT REF</Text><Text style={styles.infoValue}>{invoice.contractRef}</Text></>)}
          </View>
        </View>

        {/* Line Items */}
        <Text style={styles.sectionTitle}>Invoice Items</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: colWidths[0] }]}>#</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[1] }]}>Description</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[2] }]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[3] }]}>Unit</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[4] }]}>Unit Price</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[5] }]}>Line Total</Text>
            <Text style={[styles.tableHeaderCell, { width: colWidths[6] }]}>Disc %</Text>
          </View>
          {items.map((item: any, idx: number) => (
            <View style={idx % 2 === 1 ? styles.tableRowAlt : styles.tableRow} key={idx}>
              <Text style={[styles.tableCell, { width: colWidths[0] }]}>{item.lineNumber || idx + 1}</Text>
              <Text style={[styles.tableCell, { width: colWidths[1] }]}>{item.description}</Text>
              <Text style={[styles.tableCell, { width: colWidths[2] }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { width: colWidths[3] }]}>{item.unit}</Text>
              <Text style={[styles.tableCellRight, { width: colWidths[4] }]}>{fmt(item.unitPrice)}</Text>
              <Text style={[styles.tableCellRight, { width: colWidths[5] }]}>{fmt(item.lineTotal)}</Text>
              <Text style={[styles.tableCellRight, { width: colWidths[6] }]}>{item.discountPercent || 0}%</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>AED {fmt(invoice.subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.vatBadge]}>VAT (5% — UAE FTA)</Text>
            <Text style={styles.totalValue}>AED {fmt(invoice.taxAmount)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total Amount</Text>
            <Text style={styles.grandTotalValue}>AED {fmt(invoice.totalAmount)}</Text>
          </View>
          {invoice.paidAmount > 0 && (
            <>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Paid</Text>
                <Text style={{ ...styles.totalValue, color: COLORS.accent }}>AED {fmt(invoice.paidAmount)}</Text>
              </View>
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Balance Due</Text>
                <Text style={{ ...styles.grandTotalValue, color: '#DC2626' }}>AED {fmt(invoice.balanceDue)}</Text>
              </View>
            </>
          )}
        </View>

        {/* Payments */}
        {payments.length > 0 && (
          <View style={styles.paymentsSection}>
            <Text style={styles.sectionTitle}>Payment History</Text>
            {payments.map((p: any, idx: number) => (
              <View style={styles.paymentRow} key={idx}>
                <Text style={styles.tableCell}>{new Date(p.paymentDate).toLocaleDateString('en-GB')} — {p.method} {p.reference ? `(${p.reference})` : ''}</Text>
                <Text style={styles.tableCellBold}>AED {fmt(p.amount)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Notes */}
        {invoice.notes && (
          <View style={{ marginTop: 15 }}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={{ fontSize: 9, color: COLORS.text }}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>CL WMS — Combi Lift | {BRANCH_NAMES[invoice.branch] || invoice.branch}, UAE | Confidential</Text>
          <Text style={styles.footerText}>Currency: AED (UAE Dirham) | VAT Registration: UAE FTA | Trade License: CL-WMS-{invoice.branch}</Text>
        </View>
      </Page>
    </Document>
  );
}

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

    const buffer = await renderToBuffer(<InvoicePDF invoice={invoice} />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Invoice PDF error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
