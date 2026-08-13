import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const hasToken = !!(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN);
  
  // Test actual db connection
  let dbTest = 'not_run';
  try {
    const count = await db.cargoItem.count();
    dbTest = `ok:${count}`;
  } catch (e: any) {
    dbTest = `err:${e.message?.substring(0, 200)}`;
  }
  
  return NextResponse.json({ 
    message: "WMS API is running",
    dbUrlSet: dbUrl !== 'NOT_SET',
    dbUrlPrefix: dbUrl.substring(0, 20),
    hasTursoToken: hasToken,
    nodeEnv: process.env.NODE_ENV,
    dbTest,
  });
}
