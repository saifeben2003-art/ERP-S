import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/scanner?barcode=XXX - Look up cargo or location by barcode
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const barcode = searchParams.get('barcode');

    if (!barcode || barcode.trim().length === 0) {
      return NextResponse.json(
        { error: 'Barcode query parameter is required' },
        { status: 400 },
      );
    }

    const trimmedBarcode = barcode.trim();

    // Try to find as CargoItem (by barcode OR cargoCode)
    const cargoItem = await db.cargoItem.findFirst({
      where: {
        isDeleted: false,
        OR: [
          { barcode: trimmedBarcode },
          { cargoCode: trimmedBarcode },
        ],
      },
      include: {
        location: true,
        project: {
          select: {
            id: true,
            projectCode: true,
            name: true,
            status: true,
          },
        },
        movements: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            fromLocation: { select: { id: true, code: true, name: true } },
            toLocation: { select: { id: true, code: true, name: true } },
          },
        },
      },
    });

    if (cargoItem) {
      // Calculate storage days
      const ref = cargoItem.receivedAt || cargoItem.createdAt;
      const storageDays = Math.max(0, Math.floor((Date.now() - ref.getTime()) / (24 * 60 * 60 * 1000)));

      return NextResponse.json({
        type: 'CARGO',
        data: {
          ...cargoItem,
          storageDays,
          lastMovement: cargoItem.movements[0] || null,
          movements: undefined, // remove raw movements array
        },
      });
    }

    // Try to find as Location (by barcode OR code)
    const location = await db.location.findFirst({
      where: {
        isActive: true,
        OR: [
          { barcode: trimmedBarcode },
          { code: trimmedBarcode },
        ],
      },
      include: {
        cargoItems: {
          where: { isDeleted: false },
          select: {
            id: true,
            cargoCode: true,
            barcode: true,
            description: true,
            weight: true,
            status: true,
            clientName: true,
            commodityType: true,
          },
          take: 50,
        },
      },
    });

    if (location) {
      return NextResponse.json({
        type: 'LOCATION',
        data: {
          ...location,
          currentItems: location.cargoItems.length,
          items: location.cargoItems,
          cargoItems: undefined, // remove raw relation
        },
      });
    }

    return NextResponse.json(
      { error: `No cargo item or location found for barcode: ${trimmedBarcode}` },
      { status: 404 },
    );
  } catch (error) {
    console.error('Error scanning barcode:', error);
    return NextResponse.json(
      { error: 'Failed to process barcode scan' },
      { status: 500 },
    );
  }
}
