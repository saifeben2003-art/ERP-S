import { NextResponse } from "next/server";
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@/generated/client';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

  // Step 1: Create adapter
  const libsql = createClient({ url: dbUrl, authToken });
  const adapter = new PrismaLibSQL(libsql);

  // Step 2: Create PrismaClient with adapter
  let step2 = 'not_run';
  try {
    const client = new PrismaClient({ adapter });
    step2 = 'client_created';

    // Step 3: Run a query
    const count = await client.cargoItem.count();
    step2 = 'ok:' + count;
  } catch (e: any) {
    step2 = 'err:' + e.message?.substring(0, 400);
  }

  return NextResponse.json({ step2 });
}