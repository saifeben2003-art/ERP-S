'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, Check, AlertTriangle, Clock, Wrench, FileText, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslation } from '@/lib/translations';

interface Notification {
  id: string;
  type: 'cert_expiry' | 'invoice_overdue' | 'capacity_warning' | 'cargo_aging';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  read: boolean;
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      } else {
        throw new Error('API not available');
      }
    } catch {
      // Fallback: generate notifications from available data
      await generateLocalNotifications();
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Fallback: generate notifications from equipment/invoices data
  const generateLocalNotifications = async () => {
    const notifs: Notification[] = [];

    // Check equipment certs
    try {
      const eqRes = await fetch('/api/equipment');
      if (eqRes.ok) {
        const eqData = await eqRes.json();
        const equipment = eqData.data?.items || eqData.items || [];
        const now = new Date();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        equipment.forEach((eq: Record<string, unknown>) => {
          const certExpiry = eq.certExpiry as string | undefined;
          const equipmentCode = (eq.equipmentCode || eq.name || 'Unknown') as string;
          const eqType = (eq.type || 'Equipment') as string;
          if (certExpiry) {
            const expiry = new Date(certExpiry);
            const diff = expiry.getTime() - now.getTime();
            if (diff < 0) {
              notifs.push({
                id: `cert-expired-${eq.id}`,
                type: 'cert_expiry',
                title: `${t('notifications.certExpired')}: ${equipmentCode}`,
                description: `${eqType} ${t('notifications.certExpiredDesc')} ${expiry.toLocaleDateString()}`,
                severity: 'critical',
                timestamp: new Date().toISOString(),
                read: false,
              });
            } else if (diff < thirtyDays) {
              notifs.push({
                id: `cert-warning-${eq.id}`,
                type: 'cert_expiry',
                title: `${t('notifications.certExpiring')}: ${equipmentCode}`,
                description: `${eqType} ${t('notifications.certExpiringDesc')} ${Math.ceil(diff / (24 * 60 * 60 * 1000))} ${t('notifications.days')}`,
                severity: 'warning',
                timestamp: new Date().toISOString(),
                read: false,
              });
            }
          }
        });
      }
    } catch {
      // Silently skip if equipment API unavailable
    }

    // Check overdue invoices
    try {
      const invRes = await fetch('/api/invoices');
      if (invRes.ok) {
        const invData = await invRes.json();
        const invoices = invData.data?.items || invData.items || [];

        invoices.forEach((inv: Record<string, unknown>) => {
          if (inv.status === 'OVERDUE') {
            const invoiceNumber = (inv.invoiceNumber || inv.id || 'N/A') as string;
            const total = inv.total as number | undefined;
            const dueDate = inv.dueDate as string | undefined;
            notifs.push({
              id: `inv-overdue-${inv.id}`,
              type: 'invoice_overdue',
              title: `${t('notifications.invoiceOverdue')}: ${invoiceNumber}`,
              description: `AED ${total?.toLocaleString() || '0'} ${t('notifications.overdueSince')} ${dueDate ? new Date(dueDate).toLocaleDateString() : 'N/A'}`,
              severity: 'critical',
              timestamp: new Date().toISOString(),
              read: false,
            });
          }
        });
      }
    } catch {
      // Silently skip if invoices API unavailable
    }

    // Check location capacity
    try {
      const locRes = await fetch('/api/locations');
      if (locRes.ok) {
        const locData = await locRes.json();
        const locations = locData.data?.items || locData.items || [];

        locations.forEach((loc: Record<string, unknown>) => {
          const occupancy = (loc.occupancy || 0) as number;
          if (occupancy >= 90) {
            const locName = (loc.name || loc.code || 'Unknown') as string;
            notifs.push({
              id: `capacity-warning-${loc.id}`,
              type: 'capacity_warning',
              title: `${t('notifications.capacityWarning')}: ${locName}`,
              description: `${t('notifications.capacityDesc')} ${Math.round(occupancy)}%`,
              severity: occupancy >= 95 ? 'critical' : 'warning',
              timestamp: new Date().toISOString(),
              read: false,
            });
          }
        });
      }
    } catch {
      // Silently skip if locations API unavailable
    }

    // Sort by severity: critical first, then warning, then info
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    notifs.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    setNotifications(notifs);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const severityStyles = {
    info: 'text-sky-400',
    warning: 'text-amber-400',
    critical: 'text-red-400',
  };

  const severityBg = {
    info: 'bg-sky-400/10',
    warning: 'bg-amber-400/10',
    critical: 'bg-red-400/10',
  };

  const typeIcons = {
    cert_expiry: Wrench,
    invoice_overdue: FileText,
    capacity_warning: Package,
    cargo_aging: Clock,
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return t('notifications.justNow');
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -end-1 h-4 min-w-4 px-1 text-[10px] bg-red-500 text-white border-0 rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 sm:w-96 p-0 dark:border-slate-800 border-slate-200 shadow-lg"
      >
        <div className="flex items-center justify-between p-3 border-b dark:border-slate-800 border-slate-200">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold dark:text-slate-200 text-slate-800">
              {t('notifications.title')}
            </h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-[10px] dark:bg-slate-700 bg-slate-200 dark:text-slate-300 text-slate-600">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              className="h-7 text-xs text-amber-500 hover:text-amber-400 dark:text-amber-400 dark:hover:text-amber-300"
            >
              <Check className="h-3 w-3 me-1" />
              {t('notifications.markAllRead')}
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          {loading ? (
            <div className="p-6 text-center">
              <div className="h-5 w-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-2">{t('common.loading')}</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 dark:text-slate-600 text-slate-300" />
              <p className="text-sm dark:text-slate-500 text-slate-400">
                {t('notifications.empty')}
              </p>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-800/60 divide-slate-100">
              {notifications.map((notif) => {
                const Icon = typeIcons[notif.type] || AlertTriangle;
                return (
                  <button
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={`w-full flex items-start gap-3 p-3 text-start transition-colors dark:hover:bg-slate-800/50 hover:bg-slate-50 ${!notif.read ? 'dark:bg-slate-800/30 bg-amber-50/30' : ''}`}
                  >
                    <div className={`mt-0.5 shrink-0 h-7 w-7 rounded-md flex items-center justify-center ${severityBg[notif.severity]}`}>
                      <Icon className={`h-3.5 w-3.5 ${severityStyles[notif.severity]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${!notif.read ? 'dark:text-slate-200 text-slate-800' : 'dark:text-slate-400 text-slate-500'}`}>
                        {notif.title}
                      </p>
                      <p className="text-[11px] dark:text-slate-500 text-slate-400 line-clamp-2 mt-0.5">
                        {notif.description}
                      </p>
                      <p className="text-[10px] dark:text-slate-600 text-slate-300 mt-1">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="border-t dark:border-slate-800 border-slate-200 p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-7 text-xs dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600"
              onClick={() => {
                setOpen(false);
                fetchNotifications();
              }}
            >
              <RefreshCw className="h-3 w-3 me-1" />
              {t('notifications.refresh')}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

