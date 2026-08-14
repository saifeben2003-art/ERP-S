import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/reports - Comprehensive WMS analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly';
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    // Determine date range
    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date(now.getTime() + 24 * 60 * 60 * 1000); // include today

    if (startDateParam && endDateParam) {
      startDate = new Date(startDateParam);
      endDate = new Date(endDateParam);
    } else {
      const periodMap: Record<string, number> = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
      };
      const days = periodMap[period] || 30;
      startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    }

    // 1. Cargo Flow Analysis - movements grouped by date
    const movements = await db.movement.findMany({
      where: {
        createdAt: { gte: startDate, lt: endDate },
      },
      select: {
        type: true,
        createdAt: true,
      },
    });

    // Build date-keyed map for cargo flow
    const flowMap: Record<string, { date: string; inbound: number; outbound: number; inYard: number; inWarehouse: number }> = {};
    const dayMs = 24 * 60 * 60 * 1000;
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / dayMs);

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate.getTime() + i * dayMs);
      const key = d.toISOString().split('T')[0];
      flowMap[key] = { date: key, inbound: 0, outbound: 0, inYard: 0, inWarehouse: 0 };
    }

    movements.forEach((m) => {
      const key = m.createdAt.toISOString().split('T')[0];
      if (flowMap[key]) {
        if (m.type === 'RECEIVE') flowMap[key].inbound++;
        if (m.type === 'DISPATCH') flowMap[key].outbound++;
      }
    });

    // For inYard/inWarehouse counts, get current snapshot (not historical)
    const currentYardCount = await db.cargoItem.count({
      where: { status: 'IN_YARD', isDeleted: false },
    });
    const currentWarehouseCount = await db.cargoItem.count({
      where: { status: 'IN_WAREHOUSE', isDeleted: false },
    });

    // Spread current counts across all days
    Object.values(flowMap).forEach((entry) => {
      entry.inYard = currentYardCount;
      entry.inWarehouse = currentWarehouseCount;
    });

    const cargoFlow = Object.values(flowMap);

    // 2. Dwell Time Analysis
    const allCargo = await db.cargoItem.findMany({
      where: { isDeleted: false },
      select: {
        receivedAt: true,
        createdAt: true,
      },
    });

    const nowMs = Date.now();
    const dwellDays = allCargo
      .filter((c) => c.receivedAt || c.createdAt)
      .map((c) => {
        const ref = c.receivedAt || c.createdAt;
        return Math.max(0, Math.floor((nowMs - ref.getTime()) / dayMs));
      });

    const avgDwellDays = dwellDays.length > 0
      ? Math.round((dwellDays.reduce((a, b) => a + b, 0) / dwellDays.length) * 10) / 10
      : 0;
    const maxDwellDays = dwellDays.length > 0 ? Math.max(...dwellDays) : 0;
    const criticalItems = dwellDays.filter((d) => d > 30).length;

    const dwellTime = {
      avgDays: avgDwellDays,
      maxDays: maxDwellDays,
      critical: criticalItems,
    };

    // 3. Location Utilization
    const locations = await db.location.findMany({
      where: { isActive: true },
      select: {
        code: true,
        name: true,
        maxWeight: true,
        area: true,
        currentLoad: true,
        cargoItems: { where: { isDeleted: false } },
      },
    });

    const locationUtilization = locations.map((loc) => {
      // Use area as capacity proxy if available, else use 100
      const capacity = loc.area ? Math.floor(loc.area / 50) : 100; // rough: 50sqm per item slot
      const used = loc.cargoItems.length;
      const percentage = capacity > 0 ? Math.round((used / capacity) * 100) : 0;
      return {
        location: loc.code,
        name: loc.name,
        capacity,
        used,
        percentage: Math.min(percentage, 100),
      };
    });

    // 4. Weight Statistics
    const cargoWithWeight = await db.cargoItem.findMany({
      where: { isDeleted: false },
      select: {
        weight: true,
        commodityType: true,
      },
    });

    const totalWeight = cargoWithWeight.reduce((sum, c) => sum + c.weight, 0);
    const avgWeight = cargoWithWeight.length > 0
      ? Math.round((totalWeight / cargoWithWeight.length) * 10) / 10
      : 0;
    const maxWeight = cargoWithWeight.length > 0 ? Math.max(...cargoWithWeight.map((c) => c.weight)) : 0;

    // Group by category
    const categoryMap: Record<string, number> = {};
    cargoWithWeight.forEach((c) => {
      const cat = c.commodityType || 'UNKNOWN';
      categoryMap[cat] = (categoryMap[cat] || 0) + c.weight;
    });

    const byCategory = Object.entries(categoryMap)
      .map(([category, weight]) => ({ category, weight: Math.round(weight * 10) / 10 }))
      .sort((a, b) => b.weight - a.weight);

    const weightStats = {
      total: Math.round(totalWeight * 10) / 10,
      avg: avgWeight,
      max: maxWeight,
      byCategory,
    };

    // 5. Status Distribution
    const statusGroups = await db.cargoItem.groupBy({
      by: ['status'],
      where: { isDeleted: false },
      _count: { status: true },
    });

    const totalItems = statusGroups.reduce((sum, g) => sum + g._count.status, 0);
    const statusDistribution = statusGroups
      .map((g) => ({
        status: g.status,
        count: g._count.status,
        percentage: totalItems > 0 ? Math.round((g._count.status / totalItems) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // 6. Top Clients
    const clientGroups = await db.cargoItem.groupBy({
      by: ['clientName'],
      where: { isDeleted: false, clientName: { not: null } },
      _count: { clientName: true },
      _sum: { weight: true },
    });

    const topClients = clientGroups
      .map((g) => ({
        client: g.clientName as string,
        items: g._count.clientName,
        weight: Math.round((g._sum.weight || 0) * 10) / 10,
      }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10);

    // 7. Movement Stats
    const totalMovements = await db.movement.count({
      where: { createdAt: { gte: startDate, lt: endDate } },
    });

    const movementTypeGroups = await db.movement.groupBy({
      by: ['type'],
      where: { createdAt: { gte: startDate, lt: endDate } },
      _count: { type: true },
    });

    const byType = movementTypeGroups
      .map((g) => ({ type: g.type, count: g._count.type }))
      .sort((a, b) => b.count - a.count);

    const movementStats = {
      total: totalMovements,
      byType,
    };

    return NextResponse.json({
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      cargoFlow,
      dwellTime,
      locationUtilization,
      weightStats,
      statusDistribution,
      topClients,
      movementStats,
    });
  } catch (error) {
    console.error('Error generating reports:', error);
    return NextResponse.json(
      { error: 'Failed to generate report data' },
      { status: 500 },
    );
  }
}
