import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const hasToken = !!(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN);
  
  // Check adapter version
  let adapterInfo = 'not_run';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const adapterModule = require('@prisma/adapter-libsql');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkg = require('@prisma/adapter-libsql/package.json');
    adapterInfo = 'v' + pkg.version + ' exports:' + Object.keys(adapterModule).join(',');
  } catch (e: any) {
    adapterInfo = 'err:' + e.message?.substring(0, 200);
  }

  // Check generated client
  let genInfo = 'not_run';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const genPkg = require('@/generated/client/package.json');
    genInfo = 'v' + genPkg.prismaVersion + ' generated:' + genPkg.generatedAt;
  } catch (e: any) {
    genInfo = 'err:' + e.message?.substring(0, 200);
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
    adapterInfo,
    genInfo,
    prismaTest,
  });
}