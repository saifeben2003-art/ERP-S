import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const hasToken = !!(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN);
  
  // Test raw libsql connection first
  let libsqlTest = 'not_run';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@libsql/client');
    const client = createClient({ 
      url: dbUrl, 
      authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
    });
    const result = await client.execute('SELECT 1 as test');
    libsqlTest = 'ok:' + JSON.stringify(result.rows);
  } catch (e: any) {
    libsqlTest = 'err:' + e.message?.substring(0, 200);
  }

  // Test adapter module
  let adapterTest = 'not_run';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const adapterModule = require('@prisma/adapter-libsql');
    const AdapterClass = adapterModule.PrismaLibSQL || adapterModule.PrismaLibSql;
    adapterTest = 'found:' + (AdapterClass?.name || 'no name') + ' keys:' + Object.keys(adapterModule).join(',');
  } catch (e: any) {
    adapterTest = 'err:' + e.message?.substring(0, 200);
  }

  // Test Prisma
  let prismaTest = 'not_run';
  try {
    const db = getDb();
    const count = await db.cargoItem.count();
    prismaTest = 'ok:' + count;
  } catch (e: any) {
    prismaTest = 'err:' + e.message?.substring(0, 300);
  }
  
  return NextResponse.json({ 
    dbUrlSet: dbUrl !== 'NOT_SET',
    dbUrlPrefix: dbUrl.substring(0, 20),
    hasTursoToken: hasToken,
    libsqlTest,
    adapterTest,
    prismaTest,
  });
}