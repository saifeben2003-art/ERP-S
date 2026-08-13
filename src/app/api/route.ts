import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const count = await db.cargoItem.count();
    return NextResponse.json({ ok: true, count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message?.substring(0, 500) }, { status: 500 });
  }
}