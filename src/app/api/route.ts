import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

  let result: Record<string, string> = {};

  try {
    // Dynamic imports only
    const { createClient } = await import('@libsql/client');
    const { PrismaLibSQL } = await import('@prisma/adapter-libsql');
    const { PrismaClient } = await import('@/generated/client');

    result.step1 = 'imports_ok';

    const libsql = createClient({ url: dbUrl, authToken });
    const adapter = new PrismaLibSQL(libsql);
    result.step2 = 'adapter_ok:' + adapter.adapterName + ',' + adapter.provider;

    const client = new (PrismaClient as any)({ adapter });
    result.step3 = 'client_created';

    // Try to connect
    await (client as any).$connect();
    result.step4 = 'connected';

    const count = await (client as any).cargoItem.count();
    result.step5 = 'count:' + count;
  } catch (e: any) {
    result.error = e.message?.substring(0, 400);
    result.stack = e.stack?.substring(0, 200);
  }

  return NextResponse.json(result);
}