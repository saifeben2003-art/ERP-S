import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/dashboard - Aggregate dashboard stats
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalCargo,
      statusBreakdownRaw,
      categoryBreakdownRaw,
      weightStats,
      activeProjects,
      pendingDispatch,
      equipmentStats,
      movementsToday,
      recentMovements,
      allProjects,
      weightByCategoryRaw,
      movementsLast30Days,
    ] = await Promise.all([
      db.cargoItem.count(),
      db.cargoItem.groupBy({ by: ['status'], _count: { id: true } }),
      db.cargoItem.groupBy({ by: ['liftCategory'], _count: { id: true } }),
      db.cargoItem.aggregate({ _sum: { weight: true, volume: true } }),
      db.project.count({ where: { status: { notIn: ['COMPLETED', 'SHIPPED'] } } }),
      db.cargoItem.count({ where: { status: { in: ['IN_YARD', 'IN_WAREHOUSE'] } } }),
      db.equipment.count({ where: { status: 'AVAILABLE' } }),
      db.movement.count({ where: { createdAt: { gte: today } } }),
      db.movement.findMany({
        take: 10,
        include: { cargoItem: true, fromLocation: true, toLocation: true },
        orderBy: { createdAt: 'desc' },
      }),
      db.project.findMany({
        include: { _count: { select: { cargoItems: true } } },
        where: { status: { notIn: ['COMPLETED', 'SHIPPED'] } },
        orderBy: { createdAt: 'desc' },
      }),
      db.cargoItem.groupBy({
        by: ['liftCategory'],
        _sum: { weight: true },
      }),
      db.movement.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { type: true, createdAt: true },
      }),
    ]);

    // Build status breakdown
    const statusBreakdown = statusBreakdownRaw.map((s) => ({
      status: s.status,
      count: s._count.id,
    }));

    // Build category breakdown
    const categoryBreakdown = categoryBreakdownRaw.map((c) => ({
      category: c.liftCategory,
      count: c._count.id,
    }));

    // Build weight by category
    const weightByCategory = weightByCategoryRaw.map((c) => ({
      category: c.liftCategory,
      weight: c._sum.weight || 0,
    }));

    // Build movements by day for the last 30 days
    const dayMap = new Map<string, { date: string; RECEIVE: number; MOVE: number; DISPATCH: number }>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      dayMap.set(key, { date: key, RECEIVE: 0, MOVE: 0, DISPATCH: 0 });
    }
    for (const m of movementsLast30Days) {
      const key = m.createdAt.toISOString().split('T')[0];
      const entry = dayMap.get(key);
      if (entry && m.type in entry) {
        (entry as Record<string, number>)[m.type] += 1;
      }
    }
    const movementsByDay = Array.from(dayMap.values());

    // Count specific statuses
    const inYard = statusBreakdown.find((s) => s.status === 'IN_YARD')?.count || 0;
    const inWarehouse = statusBreakdown.find((s) => s.status === 'IN_WAREHOUSE')?.count || 0;
    const inTransit = statusBreakdown.find((s) => s.status === 'IN_TRANSIT')?.count || 0;
    const heavyLiftCount = categoryBreakdown.find((c) => c.category === 'HEAVY_LIFT')?.count || 0;
    const oversizeCount = categoryBreakdown.find((c) => c.category === 'OVERSIZE')?.count || 0;

    // Build project progress
    const projectProgress = allProjects.map((p) => ({
      name: p.name,
      projectCode: p.projectCode,
      total: p.totalItems,
      received: p._count.cargoItems,
      status: p.status,
      clientName: p.clientName,
    }));

    const stats = {
      totalCargo,
      inYard,
      inWarehouse,
      inTransit,
      totalWeight: weightStats._sum.weight || 0,
      totalVolume: weightStats._sum.volume || 0,
      activeProjects,
      pendingDispatch,
      equipmentAvailable: equipmentStats,
      movementsToday,
      heavyLiftCount,
      oversizeCount,
      statusBreakdown,
      categoryBreakdown,
      weightByCategory,
      movementsByDay,
      recentMovements,
      projectProgress,
    };

    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch dashboard stats';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
