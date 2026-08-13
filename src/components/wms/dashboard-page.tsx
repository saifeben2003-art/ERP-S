'use client';

import { useEffect, useState } from 'react';
import { Package, Warehouse, FolderKanban, MapPin, Wrench, Weight, Truck, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { useTranslation, translateStatus, translateCategory, translateMovementType, welcomeGuideSteps } from '@/lib/translations';
import type { DashboardStats, Movement, WmsPage } from '@/types/wms';

const statusColors: Record<string, string> = {
  IN_YARD: 'bg-emerald-500',
  IN_WAREHOUSE: 'bg-teal-500',
  IN_TRANSIT: 'bg-amber-500',
  RECEIVED: 'bg-cyan-500',
  DISPATCHED: 'bg-slate-500',
  DELIVERED: 'bg-slate-400',
  STAGING: 'bg-orange-500',
  LOADED: 'bg-yellow-600',
};

const movementTypeColor: Record<string, string> = {
  RECEIVE: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  MOVE: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  DISPATCH: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  INSPECT: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

function KpiCard({ icon: Icon, label, value, suffix, loading, color = 'text-amber-400' }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  suffix?: string;
  loading: boolean;
  color?: string;
}) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {loading ? (
              <>
                <Skeleton className="h-4 w-24 bg-slate-800" />
                <Skeleton className="h-7 w-16 bg-slate-800" />
              </>
            ) : (
              <>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-slate-100">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                  {suffix && <span className="text-sm font-medium text-slate-500 mr-1">{suffix}</span>}
                </p>
              </>
            )}
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBreakdown({ data, loading, t }: { data: { status: string; count: number }[]; loading: boolean; t: (k: string) => string }) {
  const total = data.reduce((s, d) => s + d.count, 0);

  if (loading) return <Skeleton className="h-8 w-full bg-slate-800" />;

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.cargoStatusBreakdown')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-800">
          {data.map((item) => (
            <div
              key={item.status}
              className={statusColors[item.status] || 'bg-slate-600'}
              style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              title={`${translateStatus(item.status)}: ${item.count}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <div key={item.status} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${statusColors[item.status] || 'bg-slate-600'}`} />
              <span className="text-xs text-slate-400">
                {translateStatus(item.status)}{' '}
                <span className="font-semibold text-slate-300">{item.count}</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCards({ data, loading, t }: { data: { category: string; count: number }[]; loading: boolean; t: (k: string) => string }) {
  const categories = [
    { key: 'HEAVY_LIFT', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { key: 'OVERSIZE', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { key: 'STANDARD', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { key: 'PROJECT_CARGO', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.liftCategoryDistribution')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((cat) => {
            const found = data.find((d) => d.category === cat.key);
            const count = found?.count || 0;
            return (
              <div
                key={cat.key}
                className={`rounded-lg border ${cat.border} ${cat.bg} p-3 text-center`}
              >
                {loading ? (
                  <Skeleton className="mx-auto mb-1 h-6 w-8 bg-slate-700" />
                ) : (
                  <p className={`text-xl font-bold ${cat.color}`}>{count}</p>
                )}
                <p className="text-[11px] font-medium text-slate-400 mt-1">{translateCategory(cat.key)}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentMovements({ movements, loading, t }: { movements: Movement[]; loading: boolean; t: (k: string) => string }) {
  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.recentMovements')}</CardTitle>
          <ArrowLeftRight className="h-4 w-4 text-slate-600" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-xs text-slate-500">{t('dashboard.ref')}</TableHead>
                <TableHead className="text-xs text-slate-500">{t('dashboard.cargo')}</TableHead>
                <TableHead className="text-xs text-slate-500">{t('dashboard.type')}</TableHead>
                <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('dashboard.from')}</TableHead>
                <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('dashboard.to')}</TableHead>
                <TableHead className="text-xs text-slate-500">{t('common.date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-slate-800 hover:bg-transparent">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j} className="py-2">
                          <Skeleton className="h-4 w-16 bg-slate-800" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : movements.map((m) => (
                    <TableRow key={m.id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="py-2 text-xs font-mono text-slate-400">{m.movementRef}</TableCell>
                      <TableCell className="py-2 text-xs text-slate-300">{m.cargoCode}</TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className={`text-[10px] ${movementTypeColor[m.type] || ''}`}>
                          {translateMovementType(m.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 text-xs text-slate-400 hidden sm:table-cell">
                        {m.fromLocation?.code || '—'}
                      </TableCell>
                      <TableCell className="py-2 text-xs text-slate-400 hidden sm:table-cell">
                        {m.toLocation?.code || '—'}
                      </TableCell>
                      <TableCell className="py-2 text-xs text-slate-500">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectProgress({ projects, loading, t }: { projects: { name: string; total: number; received: number; status: string }[]; loading: boolean; t: (k: string) => string }) {
  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.projectProgress')}</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40 bg-slate-800" />
                  <Skeleton className="h-4 w-12 bg-slate-800" />
                </div>
                <Skeleton className="h-2 w-full bg-slate-800" />
              </div>
            ))
          : projects.map((p) => {
              const pct = p.total > 0 ? Math.round((p.received / p.total) * 100) : 0;
              return (
                <div key={p.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300 truncate max-w-[200px] sm:max-w-[300px]">{p.name}</span>
                    <span className="text-xs text-slate-500 shrink-0 mr-2">{p.received}/{p.total}</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Package,
  FolderKanban,
  MapPin,
  Wrench,
  ArrowLeftRight,
};

const pageMap: Record<number, WmsPage> = {
  0: 'cargo',
  1: 'projects',
  2: 'locations',
  3: 'equipment',
  4: 'movements',
};

interface DashboardPageProps {
  onNavigate?: (page: WmsPage) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((data) => {
        setStats(data.data || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{t('dashboard.title')}</h1>
        <p className="text-sm text-slate-500 mt-1">{t('dashboard.subtitle')}</p>
      </div>

      {/* Welcome Guide */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {welcomeGuideSteps.map((step, idx) => {
          const StepIcon = iconMap[step.icon] || Package;
          return (
            <Card
              key={idx}
              className="border-slate-800 bg-slate-900/50 cursor-pointer hover:border-amber-500/30 hover:bg-slate-900/80 transition-all duration-200 group"
              onClick={() => onNavigate?.(pageMap[idx])}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <StepIcon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">{step.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon={Package} label={t('dashboard.totalCargo')} value={stats?.totalCargo ?? 0} loading={loading} color="text-amber-400" />
        <KpiCard icon={Warehouse} label={t('dashboard.inYardStorage')} value={(stats?.inYard ?? 0) + (stats?.inWarehouse ?? 0)} loading={loading} color="text-emerald-400" />
        <KpiCard icon={FolderKanban} label={t('dashboard.activeProjects')} value={stats?.activeProjects ?? 0} loading={loading} color="text-orange-400" />
        <KpiCard icon={Wrench} label={t('dashboard.equipmentAvail')} value={stats?.equipmentAvailable ?? 0} loading={loading} color="text-teal-400" />
        <KpiCard icon={Weight} label={t('dashboard.totalWeight')} value={stats?.totalWeight ?? 0} suffix={t('common.tonnes')} loading={loading} color="text-red-400" />
        <KpiCard icon={Truck} label={t('dashboard.pendingDispatch')} value={stats?.pendingDispatch ?? 0} loading={loading} color="text-yellow-400" />
      </div>

      {/* Status Breakdown + Category Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusBreakdown data={stats?.statusBreakdown ?? []} loading={loading} t={t} />
        <CategoryCards data={stats?.categoryBreakdown ?? []} loading={loading} t={t} />
      </div>

      {/* Recent Movements + Project Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMovements movements={stats?.recentMovements ?? []} loading={loading} t={t} />
        <ProjectProgress projects={stats?.projectProgress ?? []} loading={loading} t={t} />
      </div>
    </div>
  );
}
