import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const hasToken = !!(process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN);
  return NextResponse.json({ 
    message: "WMS API is running",
    dbUrlSet: dbUrl !== 'NOT_SET',
    dbUrlPrefix: dbUrl.substring(0, 15) + '...',
    hasTursoToken: hasToken,
    nodeEnv: process.env.NODE_ENV,
  });
}