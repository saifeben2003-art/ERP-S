import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const STATUS_WORKFLOW: Record<string, string[]> = {
  PLANNED: ['RECEIVING'],
  RECEIVING: ['IN_STORAGE', 'STAGING'],
  IN_STORAGE: ['STAGING', 'LOADED'],
  STAGING: ['LOADED', 'IN_STORAGE'],
  LOADED: ['SHIPPED', 'STAGING'],
  SHIPPED: ['COMPLETED'],
  COMPLETED: [],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const existing = await db.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const allowedTransitions = STATUS_WORKFLOW[existing.status] || [];
    if (existing.status !== status && !allowedTransitions.includes(status)) {
      return NextResponse.json({
        error: `Cannot transition from ${existing.status} to ${status}. Allowed: ${allowedTransitions.join(', ') || 'none'}`,
      }, { status: 400 });
    }

    const project = await db.project.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      data: project,
      message: `Project status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    const message = error instanceof Error ? error.message : 'Failed to update project status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
