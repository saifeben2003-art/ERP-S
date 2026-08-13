import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { createClient } = await import('@libsql/client');
    const { PrismaLibSQL } = await import('@prisma/adapter-libsql');
    const { PrismaClient } = await import('@/generated/client');

    const libsql = createClient({ 
      url: process.env.DATABASE_URL, 
      authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN 
    });
    const adapter = new PrismaLibSQL(libsql);
    const client = new PrismaClient({ adapter });
    await client.$connect();
    const count = await client.cargoItem.count();
    return NextResponse.json({ ok: true, count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message?.substring(0, 500) }, { status: 500 });
  }
}