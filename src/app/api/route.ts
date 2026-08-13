import { NextResponse } from "next/server";
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

  // Create adapter and check its properties
  let adapterInfo = 'not_run';
  try {
    const libsql = createClient({ url: dbUrl, authToken });
    const adapter = new PrismaLibSQL(libsql);
    adapterInfo = JSON.stringify({ adapterName: adapter.adapterName, provider: adapter.provider, hasQuery: !!adapter.query });
  } catch (e: any) {
    adapterInfo = 'err:' + e.message?.substring(0, 300);
  }

  return NextResponse.json({ adapterInfo });
}