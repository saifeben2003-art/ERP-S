import { NextResponse } from 'next/server';

/**
 * POST /api/migrate — Adds missing columns to the Turso/production database
 * This handles the case where Prisma schema was updated but the remote DB wasn't synced.
 */
export async function POST() {
  const results: string[] = [];

  try {
    const { createClient } = await import('@libsql/client');
    const dbUrl = process.env.DATABASE_URL || '';
    const isTurso = dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://');

    if (!isTurso) {
      results.push('Local SQLite — schema already in sync via db:push');
      return NextResponse.json({ success: true, results });
    }

    const config = {
      url: dbUrl,
      authToken: process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || '',
    };

    const client = createClient(config);

    // Add missing columns to CargoItem
    const cargoItemColumns = [
      { name: 'airWaybillNumber', type: 'TEXT' },
      { name: 'billOfLadingNumber', type: 'TEXT' },
      { name: 'shippingLine', type: 'TEXT' },
      { name: 'eta', type: 'TEXT' },
      { name: 'etd', type: 'TEXT' },
      { name: 'portOfLoading', type: 'TEXT' },
      { name: 'portOfDischarge', type: 'TEXT' },
    ];

    for (const col of cargoItemColumns) {
      try {
        await client.execute({
          sql: `ALTER TABLE CargoItem ADD COLUMN "${col.name}" ${col.type}`,
          args: [],
        });
        results.push(`Added CargoItem.${col.name}`);
      } catch (err: unknown) {
        const msg = String(err instanceof Error ? err.message : err || '');
        if (msg.includes('duplicate column name') || msg.includes('already exists')) {
          results.push(`CargoItem.${col.name} already exists — OK`);
        } else {
          results.push(`CargoItem.${col.name}: ${msg.substring(0, 100)}`);
        }
      }
    }

    // Ensure Invoice tables exist (CREATE TABLE IF NOT EXISTS)
    const tableSqls: Array<{ table: string; sql: string }> = [
      {
        table: 'Invoice',
        sql: `CREATE TABLE IF NOT EXISTS "Invoice" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "invoiceNumber" TEXT NOT NULL UNIQUE,
          "type" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'DRAFT',
          "clientId" TEXT NOT NULL,
          "clientName" TEXT NOT NULL,
          "clientEmail" TEXT,
          "clientAddress" TEXT,
          "periodStart" TEXT NOT NULL,
          "periodEnd" TEXT NOT NULL,
          "issueDate" TEXT NOT NULL DEFAULT (datetime('now')),
          "dueDate" TEXT NOT NULL,
          "subtotal" REAL NOT NULL,
          "taxRate" REAL NOT NULL DEFAULT 0.05,
          "taxAmount" REAL NOT NULL,
          "totalAmount" REAL NOT NULL,
          "paidAmount" REAL NOT NULL DEFAULT 0,
          "balanceDue" REAL NOT NULL,
          "currency" TEXT NOT NULL DEFAULT 'AED',
          "projectId" TEXT,
          "poReference" TEXT,
          "contractRef" TEXT,
          "paymentTerms" TEXT NOT NULL DEFAULT 'NET_30',
          "notes" TEXT,
          "branch" TEXT NOT NULL DEFAULT 'DXB',
          "createdBy" TEXT NOT NULL DEFAULT 'SYSTEM',
          "approvedBy" TEXT,
          "approvedAt" TEXT,
          "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
          "updatedAt" TEXT NOT NULL DEFAULT (datetime('now'))
        )`,
      },
      {
        table: 'InvoiceItem',
        sql: `CREATE TABLE IF NOT EXISTS "InvoiceItem" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "invoiceId" TEXT NOT NULL,
          "lineNumber" INTEGER NOT NULL,
          "description" TEXT NOT NULL,
          "quantity" REAL NOT NULL,
          "unit" TEXT NOT NULL DEFAULT 'DAY',
          "unitPrice" REAL NOT NULL,
          "discountPercent" REAL NOT NULL DEFAULT 0,
          "lineTotal" REAL NOT NULL,
          "cargoItemId" TEXT,
          "locationId" TEXT,
          "equipmentId" TEXT,
          "movementId" TEXT,
          FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )`,
      },
      {
        table: 'InvoicePayment',
        sql: `CREATE TABLE IF NOT EXISTS "InvoicePayment" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "invoiceId" TEXT NOT NULL,
          "amount" REAL NOT NULL,
          "method" TEXT NOT NULL,
          "reference" TEXT,
          "paymentDate" TEXT NOT NULL DEFAULT (datetime('now')),
          "notes" TEXT,
          FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )`,
      },
    ];

    for (const { table, sql } of tableSqls) {
      try {
        await client.execute({ sql, args: [] });
        results.push(`Table ${table} ensured`);
      } catch (err: unknown) {
        const msg = String(err instanceof Error ? err.message : err || '');
        results.push(`Table ${table}: ${msg.substring(0, 100)}`);
      }
    }

    // Add indexes
    const indexSqls = [
      'CREATE INDEX IF NOT EXISTS "Invoice_clientId_idx" ON "Invoice"("clientId")',
      'CREATE INDEX IF NOT EXISTS "Invoice_status_idx" ON "Invoice"("status")',
      'CREATE INDEX IF NOT EXISTS "Invoice_type_idx" ON "Invoice"("type")',
      'CREATE INDEX IF NOT EXISTS "Invoice_dueDate_idx" ON "Invoice"("dueDate")',
      'CREATE INDEX IF NOT EXISTS "Invoice_branch_idx" ON "Invoice"("branch")',
      'CREATE INDEX IF NOT EXISTS "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId")',
      'CREATE INDEX IF NOT EXISTS "InvoicePayment_invoiceId_idx" ON "InvoicePayment"("invoiceId")',
    ];

    for (const sql of indexSqls) {
      try {
        await client.execute({ sql, args: [] });
      } catch {
        // Index might already exist, that's OK
      }
    }
    results.push('Indexes ensured');

    client.close();
    return NextResponse.json({ success: true, results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Migration failed';
    console.error('Migration error:', error);
    return NextResponse.json({ success: false, error: message, results }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to /api/migrate to run database migrations and add missing columns',
    neededColumns: ['airWaybillNumber', 'billOfLadingNumber', 'shippingLine', 'eta', 'etd', 'portOfLoading', 'portOfDischarge'],
  });
}
