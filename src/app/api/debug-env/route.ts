import { NextResponse } from 'next/server';

export async function GET() {
  // Direct Prisma + adapter test — no db.ts involved
  let result = { version: 'v5-direct-adapter', prismaOk: false, error: '' as string };
  try {
    const { PrismaClient } = await import('@/generated/client');
    const { createClient } = await import('@libsql/client');
    const { PrismaLibSQL } = await import('@/lib/custom-libsql-adapter');

    const config = {
      url: process.env.DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN || '',
    };
    const libsql = createClient(config);
    const adapter = new PrismaLibSQL(libsql, config);
    const client = new PrismaClient({ adapter });
    const count = await client.cargoItem.count();
    result = { version: 'v5-direct-adapter', prismaOk: true, error: '' };
    await client.$disconnect();
  } catch (e: unknown) {
    result = { version: 'v5-direct-adapter', prismaOk: false, error: (e instanceof Error ? e.message : String(e)).substring(0, 500) };
  }

  return NextResponse.json(result);
}
