import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface TransferRequestBody {
  toLocationId: string;
  remarks?: string;
  equipmentUsed?: string;
  operatorName?: string;
  scannedBarcode?: string;
}

// PATCH /api/cargo/[id]/transfer - Transfer cargo to a new location
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: TransferRequestBody = await request.json();
    const { toLocationId, remarks, equipmentUsed, operatorName, scannedBarcode } = body;

    // Validate required fields
    if (!toLocationId) {
      return NextResponse.json(
        { error: 'toLocationId is required' },
        { status: 400 },
      );
    }

    // Fetch the cargo item
    const cargo = await db.cargoItem.findUnique({
      where: { id },
      select: { id: true, cargoCode: true, locationId: true, status: true, isDeleted: true },
    });

    if (!cargo || cargo.isDeleted) {
      return NextResponse.json(
        { error: 'Cargo item not found' },
        { status: 404 },
      );
    }

    // Prevent transfer to the same location
    if (cargo.locationId === toLocationId) {
      return NextResponse.json(
        { error: 'Cargo is already at the specified location' },
        { status: 400 },
      );
    }

    // Validate destination location exists and is active
    const destLocation = await db.location.findUnique({
      where: { id: toLocationId },
      select: { id: true, code: true, name: true, isActive: true },
    });

    if (!destLocation || !destLocation.isActive) {
      return NextResponse.json(
        { error: 'Destination location not found or inactive' },
        { status: 404 },
      );
    }

    // Generate movement reference
    const year = new Date().getFullYear();
    const movementCount = await db.movement.count();
    const movementRef = `MOV-${year}-${String(movementCount + 1).padStart(3, '0')}`;

    // Execute the transfer in a transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Update cargo location
      const updatedCargo = await tx.cargoItem.update({
        where: { id },
        data: {
          locationId: toLocationId,
          status: destLocation.type === 'WAREHOUSE' ? 'IN_WAREHOUSE' : 'IN_YARD',
        },
        include: {
          location: true,
          project: { select: { id: true, projectCode: true, name: true } },
        },
      });

      // 2. Decrement old location's currentLoad (if existed)
      if (cargo.locationId) {
        await tx.location.update({
          where: { id: cargo.locationId },
          data: { currentLoad: { decrement: 1 } },
        });
      }

      // 3. Increment new location's currentLoad
      await tx.location.update({
        where: { id: toLocationId },
        data: { currentLoad: { increment: 1 } },
      });

      // 4. Create movement record
      const movement = await tx.movement.create({
        data: {
          movementRef,
          cargoItemId: id,
          cargoCode: cargo.cargoCode,
          type: 'MOVE',
          fromLocationId: cargo.locationId,
          toLocationId,
          equipmentUsed: equipmentUsed || null,
          operatorName: operatorName || null,
          remarks: remarks || null,
          scannedBarcode: scannedBarcode || null,
          isScanned: !!scannedBarcode,
          performedBy: 'SYSTEM',
        },
        include: {
          fromLocation: { select: { id: true, code: true, name: true } },
          toLocation: { select: { id: true, code: true, name: true } },
        },
      });

      return { cargo: updatedCargo, movement };
    });

    return NextResponse.json({
      message: 'Cargo transferred successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error transferring cargo:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to transfer cargo' },
      { status: 500 },
    );
  }
}
