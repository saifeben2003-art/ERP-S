import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const result: Record<string, unknown> = {
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      prefix: (process.env.DATABASE_URL ?? '').slice(0, 25),
      nodeEnv: process.env.NODE_ENV,
    },
  };

  try {
    const userCount = await db.user.count();
    result.db = { ok: true, userCount };
  } catch (e: unknown) {
    result.db = {
      ok: false,
      error: (e instanceof Error ? e.message : String(e)).slice(0, 300),
    };
  }

  return NextResponse.json(result);
}