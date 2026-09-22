import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const notifications: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      severity: string;
      timestamp: string;
      read: boolean;
    }> = [];

    const now = new Date();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    // Check equipment certifications
    const equipment = await db.equipment.findMany({
      where: { certExpiry: { not: null } },
      select: { id: true, equipmentCode: true, type: true, certExpiry: true },
    });

    for (const eq of equipment) {
      if (!eq.certExpiry) continue;
      const diff = eq.certExpiry.getTime() - now.getTime();
      if (diff < 0) {
        notifications.push({
          id: `cert-expired-${eq.id}`,
          type: 'cert_expiry',
          title: `Certificate Expired: ${eq.equipmentCode}`,
          description: `${eq.type} certificate expired on ${eq.certExpiry.toLocaleDateString()}`,
          severity: 'critical',
          timestamp: new Date().toISOString(),
          read: false,
        });
      } else if (diff < thirtyDays) {
        notifications.push({
          id: `cert-warning-${eq.id}`,
          type: 'cert_expiry',
          title: `Certificate Expiring: ${eq.equipmentCode}`,
          description: `${eq.type} certificate expires in ${Math.ceil(diff / (24 * 60 * 60 * 1000))} days`,
          severity: 'warning',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }
    }

    // Check overdue invoices
    try {
      const overdueInvoices = await db.invoice.findMany({
        where: { status: 'OVERDUE' },
        select: { id: true, invoiceNumber: true, totalAmount: true, dueDate: true },
      });

      for (const inv of overdueInvoices) {
        notifications.push({
          id: `inv-overdue-${inv.id}`,
          type: 'invoice_overdue',
          title: `Overdue Invoice: ${inv.invoiceNumber}`,
          description: `AED ${inv.totalAmount?.toLocaleString()} overdue`,
          severity: 'critical',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }
    } catch {
      // Invoice table might not exist in some environments
    }

    // Check location capacity
    const locations = await db.location.findMany({
      where: { isActive: true },
      include: { cargoItems: { where: { isDeleted: false } } },
    });

    for (const loc of locations) {
      const capacity = loc.area ? Math.floor(loc.area / 50) : 100;
      const used = loc.cargoItems.length;
      const pct = capacity > 0 ? (used / capacity) * 100 : 0;
      if (pct >= 95) {
        notifications.push({
          id: `cap-critical-${loc.id}`,
          type: 'capacity_warning',
          title: `Critical Capacity: ${loc.code}`,
          description: `${loc.name} is at ${Math.round(pct)}% capacity`,
          severity: 'critical',
          timestamp: new Date().toISOString(),
          read: false,
        });
      } else if (pct >= 90) {
        notifications.push({
          id: `cap-warning-${loc.id}`,
          type: 'capacity_warning',
          title: `High Capacity: ${loc.code}`,
          description: `${loc.name} is at ${Math.round(pct)}% capacity`,
          severity: 'warning',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }
    }

    // Sort by severity
    const severityOrder: Record<string, number> = { critical: 0, warning: 1, info: 2 };
    notifications.sort((a, b) => (severityOrder[a.severity] ?? 2) - (severityOrder[b.severity] ?? 2));

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ notifications: [] });
  }
}
