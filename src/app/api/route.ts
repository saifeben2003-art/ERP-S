import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const hasToken = !!(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN);

  // Test Prisma
  let prismaTest = 'not_run';
  try {
    const count = await db.cargoItem.count();
    prismaTest = 'ok:' + count;
  } catch (e: any) {
    prismaTest = 'err:' + e.message?.substring(0, 300);
  }
  
  return NextResponse.json({ 
    dbUrlSet: dbUrl !== 'NOT_SET',
    hasTursoToken: hasToken,
    prismaTest,
  });
}