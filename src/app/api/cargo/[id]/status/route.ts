import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const STATUS_WORKFLOW: Record<string, string[]> = {
  IN_TRANSIT: ['RECEIVED'],
  RECEIVED: ['IN_YARD', 'IN_WAREHOUSE'],
  IN_YARD: ['IN_WAREHOUSE', 'DISPATCHED', 'IN_TRANSIT'],
  IN_WAREHOUSE: ['IN_YARD', 'DISPATCHED', 'STAGING'],
  DISPATCHED: ['DELIVERED'],
  DELIVERED: [],
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, locationId, remarks, equipmentUsed, operatorName } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const existing = await db.cargoItem.findUnique({
      where: { id },
      include: { location: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Cargo item not found' }, { status: 404 });
    }

    // Validate transition
    const allowedTransitions = STATUS_WORKFLOW[existing.status] || [];
    if (existing.status !== status && !allowedTransitions.includes(status)) {
      return NextResponse.json({
        error: `Cannot transition from ${existing.status} to ${status}. Allowed: ${allowedTransitions.join(', ') || 'none'}`,
      }, { status: 400 });
    }

    // Determine movement type
    let movementType = 'MOVE';
    if (status === 'RECEIVED' && existing.status === 'IN_TRANSIT') movementType = 'RECEIVE';
    else if (status === 'DISPATCHED') movementType = 'DISPATCH';
    else if (status === 'IN_WAREHOUSE' && existing.status === 'RECEIVED') movementType = 'RECEIVE';

    // Update cargo
    const updateData: Record<string, unknown> = {
      status,
    };

    if (status === 'RECEIVED' && !existing.receivedAt) {
      updateData.receivedAt = new Date();
    }
    if (status === 'DISPATCHED' && !existing.dispatchedAt) {
      updateData.dispatchedAt = new Date();
    }
    if (locationId) {
      updateData.locationId = locationId;
    }

    const cargo = await db.cargoItem.update({
      where: { id },
      data: updateData,
      include: { location: true, project: true },
    });

    // Auto-create movement record
    const movementRef = `MV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const fromLocationId = existing.locationId;
    const toLocationId = locationId || existing.locationId;

    await db.movement.create({
      data: {
        movementRef,
        cargoItemId: id,
        type: movementType,
        fromLocationId: fromLocationId || null,
        toLocationId: toLocationId || null,
        equipmentUsed: equipmentUsed || null,
        operatorName: operatorName || null,
        remarks: remarks || `Status changed: ${existing.status} → ${status}`,
        performedBy: 'system',
      },
    });

    return NextResponse.json({
      data: cargo,
      message: `Cargo status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating cargo status:', error);
    const message = error instanceof Error ? error.message : 'Failed to update cargo status';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
