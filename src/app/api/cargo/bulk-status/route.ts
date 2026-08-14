import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface BulkStatusRequestBody {
  ids: string[];
  status: string;
  remarks?: string;
}

// Valid cargo statuses
const VALID_STATUSES = [
  'IN_TRANSIT',
  'RECEIVED',
  'IN_YARD',
  'IN_WAREHOUSE',
  'DISPATCHED',
  'DELIVERED',
];

// POST /api/cargo/bulk-status - Update multiple cargo items' status at once
export async function POST(request: NextRequest) {
  try {
    const body: BulkStatusRequestBody = await request.json();
    const { ids, status, remarks } = body;

    // Validate required fields
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'ids array is required and must not be empty' },
        { status: 400 },
      );
    }

    if (!status || typeof status !== 'string') {
      return NextResponse.json(
        { error: 'status is required' },
        { status: 400 },
      );
    }

    // Validate status value
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 },
      );
    }

    // Limit batch size
    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Batch size limited to 100 items per request' },
        { status: 400 },
      );
    }

    // Verify all cargo items exist and are not deleted
    const existingItems = await db.cargoItem.findMany({
      where: {
        id: { in: ids },
        isDeleted: false,
      },
      select: {
        id: true,
        cargoCode: true,
        status: true,
        locationId: true,
      },
    });

    const foundIds = new Set(existingItems.map((item) => item.id));
    const notFound = ids.filter((id) => !foundIds.has(id));

    if (notFound.length > 0) {
      return NextResponse.json(
        { error: 'Some cargo items not found or deleted', notFound },
        { status: 404 },
      );
    }

    // Determine movement type based on new status
    const movementTypeMap: Record<string, string> = {
      RECEIVED: 'RECEIVE',
      DISPATCHED: 'DISPATCH',
      DELIVERED: 'DISPATCH',
    };
    const movementType = movementTypeMap[status] || 'INSPECT';

    // Generate base movement reference
    const year = new Date().getFullYear();
    const movementCount = await db.movement.count();
    let movementIndex = movementCount + 1;

    // Execute in a transaction
    const result = await db.$transaction(async (tx) => {
      // Update all cargo items' status
      const updateResult = await tx.cargoItem.updateMany({
        where: {
          id: { in: ids },
          isDeleted: false,
        },
        data: { status },
      });

      // Create individual movement records
      const movements = [];
      for (const item of existingItems) {
        // Skip if status hasn't actually changed
        if (item.status === status) continue;

        const movementRef = `MOV-${year}-${String(movementIndex++).padStart(3, '0')}`;
        const movement = await tx.movement.create({
          data: {
            movementRef,
            cargoItemId: item.id,
            cargoCode: item.cargoCode,
            type: movementType,
            fromLocationId: item.locationId,
            toLocationId: item.locationId, // status change, not a location move
            remarks: remarks || `Bulk status update: ${item.status} → ${status}`,
            performedBy: 'SYSTEM',
          },
        });
        movements.push(movement);
      }

      return { updatedCount: updateResult.count, movements };
    });

    return NextResponse.json({
      message: `Successfully updated ${result.updatedCount} cargo items to status: ${status}`,
      updatedCount: result.updatedCount,
      movementsCreated: result.movements.length,
    });
  } catch (error) {
    console.error('Error in bulk status update:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to update cargo statuses' },
      { status: 500 },
    );
  }
}
