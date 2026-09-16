import { NextResponse } from 'next/server';

export async function GET() {
  // Direct Prisma + adapter test — no db.ts involved
  let result = { version: 'v5-direct-adapter', prismaOk: false, error: '' as string };
  try {
    const { PrismaClient } = await import('@prisma/client');
    const { createClient } = await import('@libsql/client');
    const { PrismaLibSql } = await import('@prisma/adapter-libsql');

    const libsql = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN!,
    });

    const client = new PrismaClient({ adapter: new PrismaLibSql(libsql) });
    const count = await client.cargoItem.count();
    result = { version: 'v5-direct-adapter', prismaOk: true, error: '' };
    await client.$disconnect();
  } catch (e: unknown) {
    result = { version: 'v5-direct-adapter', prismaOk: false, error: (e instanceof Error ? e.message : String(e)).substring(0, 500) };
  }

  return NextResponse.json(result);
}