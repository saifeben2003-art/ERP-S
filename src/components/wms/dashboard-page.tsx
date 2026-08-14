'use client';

import { useEffect, useState } from 'react';
import { Package, Warehouse, FolderKanban, MapPin, Wrench, Weight, Truck, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, Cell, XAxis, YAxis } from 'recharts';
import { useTranslation, translateStatus, translateCategory, translateMovementType } from '@/lib/translations';
import { en } from '@/lib/en';
import { useAppStore } from '@/lib/store';
import type { DashboardStats, Movement, WmsPage } from '@/types/wms';

const statusColors: Record<string, string> = {
  IN_YARD: '#10b981',
  IN_WAREHOUSE: '#14b8a6',
  IN_TRANSIT: '#f59e0b',
  RECEIVED: '#06b6d4',
  DISPATCHED: '#64748b',
  DELIVERED: '#94a3b8',
};

const categoryColors: Record<string, string> = {
  HEAVY_LIFT: '#ef4444',
  OVERSIZE: '#f97316',
  STANDARD: '#10b981',
  PROJECT_CARGO: '#f59e0b',
};

const movementTypeColor: Record<string, string> = {
  RECEIVE: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  MOVE: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  DISPATCH: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  INSPECT: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

const movementsChartConfig = {
  RECEIVE: { label: 'استلام', color: '#10b981' },
  MOVE: { label: 'نقل', color: '#06b6d4' },
  DISPATCH: { label: 'إرسال', color: '#f97316' },
};

const pieChartConfig = {
  IN_YARD: { label: 'في الساحة', color: '#10b981' },
  IN_WAREHOUSE: { label: 'في المستودع', color: '#14b8a6' },
  IN_TRANSIT: { label: 'قيد النقل', color: '#f59e0b' },
  RECEIVED: { label: 'مستلم', color: '#06b6d4' },
  DISPATCHED: { label: 'مرسل', color: '#64748b' },
  DELIVERED: { label: 'تم التوصيل', color: '#94a3b8' },
};

const barChartConfig = {
  weight: { label: 'الوزن', color: '#f59e0b' },
};

function KpiCard({ icon: Icon, label, value, suffix, loading, color = 'text-amber-400' }: {
  icon: React.ElementType; label: string; value: string | number; suffix?: string; loading: boolean; color?: string;
}) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {loading ? (
              <><Skeleton className="h-4 w-24 dark:bg-slate-800 bg-slate-100" /><Skeleton className="h-7 w-16 dark:bg-slate-800 bg-slate-100" /></>
            ) : (
              <>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold dark:text-slate-100 text-slate-900">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                  {suffix && <span className="text-sm font-medium text-slate-500 mr-1">{suffix}</span>}
                </p>
              </>
            )}
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg dark:bg-slate-800 bg-slate-100 ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MovementsTrendChart({ data, loading, t, locale }: { data: DashboardStats['movementsByDay']; loading: boolean; t: (k: string) => string; locale: string }) {
  if (loading) return <Skeleton className="h-[280px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.movementsTrend')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={movementsChartConfig} className="h-[250px] w-full">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(v) => { const d = new Date(v + 'T00:00:00'); return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' }); }}
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area type="monotone" dataKey="RECEIVE" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            <Area type="monotone" dataKey="MOVE" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
            <Area type="monotone" dataKey="DISPATCH" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CargoStatusDonutChart({ data, loading, t, locale }: { data: DashboardStats['statusBreakdown']; loading: boolean; t: (k: string) => string; locale: string }) {
  if (loading) return <Skeleton className="h-[280px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.count, 0);
  const chartData = data.map((d) => ({ ...d, fill: statusColors[d.status] || '#64748b' }));

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number }) => {
    if (percent < 0.08) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-semibold" fill="#f8fafc" >{`${(percent * 100).toFixed(0)}%`}</text>;
  };

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.cargoStatusBreakdown')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieChartConfig} className="h-[250px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="count"
              nameKey="status"
              label={renderLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={({ payload }) => (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {payload?.map((item) => (
                    <div key={item.value} className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[11px] dark:text-slate-400 text-slate-600">{translateStatus(item.value as string, locale as 'ar' | 'en')} ({item.payload?.count || 0})</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function WeightByCategoryChart({ data, loading, t, locale }: { data: DashboardStats['weightByCategory']; loading: boolean; t: (k: string) => string; locale: string }) {
  if (loading) return <Skeleton className="h-[280px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  const chartData = data.map((d) => ({
    category: translateCategory(d.category, locale as 'ar' | 'en'),
    weight: Math.round(d.weight / 1000 * 10) / 10, // Convert to tonnes
    fill: categoryColors[d.category] || '#f59e0b',
  }));

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.weightByCategory')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className="h-[250px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="weight" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function RecentMovements({ movements, loading, t, locale }: { movements: Movement[]; loading: boolean; t: (k: string) => string; locale: string }) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.recentMovements')}</CardTitle>
          <ArrowLeftRight className="h-4 w-4 dark:text-slate-600 text-slate-300" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                <TableHead className="text-xs dark:text-slate-500 text-slate-400">{t('dashboard.ref')}</TableHead>
                <TableHead className="text-xs dark:text-slate-500 text-slate-400">{t('dashboard.cargo')}</TableHead>
                <TableHead className="text-xs dark:text-slate-500 text-slate-400">{t('dashboard.type')}</TableHead>
                <TableHead className="text-xs dark:text-slate-500 text-slate-400 hidden sm:table-cell">{t('dashboard.from')}</TableHead>
                <TableHead className="text-xs dark:text-slate-500 text-slate-400 hidden sm:table-cell">{t('dashboard.to')}</TableHead>
                <TableHead className="text-xs dark:text-slate-500 text-slate-400">{t('common.date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j} className="py-2"><Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-100" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                : movements.map((m) => (
                    <TableRow key={m.id} className="dark:border-slate-800 border-slate-200 dark:hover:bg-slate-800/50 hover:bg-slate-50">
                      <TableCell className="py-2 text-xs font-mono dark:text-slate-400 text-slate-500">{m.movementRef}</TableCell>
                      <TableCell className="py-2 text-xs dark:text-slate-300 text-slate-700">{m.cargoCode}</TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className={`text-[10px] ${movementTypeColor[m.type] || ''}`}>
                          {translateMovementType(m.type, locale as 'ar' | 'en')}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2 text-xs dark:text-slate-400 text-slate-500 hidden sm:table-cell">{m.fromLocation?.code || '—'}</TableCell>
                      <TableCell className="py-2 text-xs dark:text-slate-400 text-slate-500 hidden sm:table-cell">{m.toLocation?.code || '—'}</TableCell>
                      <TableCell className="py-2 text-xs dark:text-slate-500 text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</TableCell>
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
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.projectProgress')}</CardTitle>
          <TrendingUp className="h-4 w-4 dark:text-slate-600 text-slate-300" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40 dark:bg-slate-800 bg-slate-100" />
                  <Skeleton className="h-4 w-12 dark:bg-slate-800 bg-slate-100" />
                </div>
                <Skeleton className="h-2 w-full dark:bg-slate-800 bg-slate-100" />
              </div>
            ))
          : projects.map((p) => {
              const pct = p.total > 0 ? Math.round((p.received / p.total) * 100) : 0;
              return (
                <div key={p.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium dark:text-slate-300 text-slate-700 truncate max-w-[200px] sm:max-w-[300px]">{p.name}</span>
                    <span className="text-xs dark:text-slate-500 text-slate-400 shrink-0 mr-2">{p.received}/{p.total}</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full dark:bg-slate-800 bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}

const iconMap: Record<string, React.ElementType> = { Package, FolderKanban, MapPin, Wrench, ArrowLeftRight };
const pageMap: Record<number, WmsPage> = { 0: 'cargo', 1: 'projects', 2: 'locations', 3: 'equipment', 4: 'movements' };

interface DashboardPageProps { onNavigate?: (page: WmsPage) => void; }

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, locale } = useTranslation();
  const welcomeSteps = locale === 'en'
    ? (en['welcome.guideStep1.title'] ? [
        { title: en['welcome.guideStep1.title'], description: en['welcome.guideStep1.description'], icon: 'Package' as const },
        { title: en['welcome.guideStep2.title'], description: en['welcome.guideStep2.description'], icon: 'FolderKanban' as const },
        { title: en['welcome.guideStep3.title'], description: en['welcome.guideStep3.description'], icon: 'MapPin' as const },
        { title: en['welcome.guideStep4.title'], description: en['welcome.guideStep4.description'], icon: 'Wrench' as const },
        { title: en['welcome.guideStep5.title'], description: en['welcome.guideStep5.description'], icon: 'ArrowLeftRight' as const },
      ] : [
        { title: t('welcome.guideStep1.title'), description: t('welcome.guideStep1.description'), icon: 'Package' as const },
        { title: t('welcome.guideStep2.title'), description: t('welcome.guideStep2.description'), icon: 'FolderKanban' as const },
        { title: t('welcome.guideStep3.title'), description: t('welcome.guideStep3.description'), icon: 'MapPin' as const },
        { title: t('welcome.guideStep4.title'), description: t('welcome.guideStep4.description'), icon: 'Wrench' as const },
        { title: t('welcome.guideStep5.title'), description: t('welcome.guideStep5.description'), icon: 'ArrowLeftRight' as const },
      ])
    : [
        { title: t('welcome.guideStep1.title'), description: t('welcome.guideStep1.description'), icon: 'Package' as const },
        { title: t('welcome.guideStep2.title'), description: t('welcome.guideStep2.description'), icon: 'FolderKanban' as const },
        { title: t('welcome.guideStep3.title'), description: t('welcome.guideStep3.description'), icon: 'MapPin' as const },
        { title: t('welcome.guideStep4.title'), description: t('welcome.guideStep4.description'), icon: 'Wrench' as const },
        { title: t('welcome.guideStep5.title'), description: t('welcome.guideStep5.description'), icon: 'ArrowLeftRight' as const },
      ];

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((data) => { setStats(data.data || data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('dashboard.title')}</h1>
        <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{t('dashboard.subtitle')}</p>
      </div>

      {/* Welcome Guide */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {welcomeSteps.map((step, idx) => {
          const StepIcon = iconMap[step.icon] || Package;
          return (
            <Card key={idx} className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white cursor-pointer hover:border-amber-500/30 dark:hover:bg-slate-900/80 hover:bg-slate-50 transition-all duration-200 group" onClick={() => onNavigate?.(pageMap[idx])}>
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <StepIcon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold dark:text-slate-200 text-slate-800 group-hover:text-amber-400 transition-colors">{step.title}</p>
                  <p className="text-[11px] dark:text-slate-500 text-slate-400 mt-1 leading-relaxed">{step.description}</p>
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

      {/* Movements Trend Chart */}
      <MovementsTrendChart data={stats?.movementsByDay} loading={loading} t={t} locale={locale} />

      {/* Status Donut + Weight Bar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CargoStatusDonutChart data={stats?.statusBreakdown} loading={loading} t={t} locale={locale} />
        <WeightByCategoryChart data={stats?.weightByCategory} loading={loading} t={t} locale={locale} />
      </div>

      {/* Recent Movements + Project Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMovements movements={stats?.recentMovements ?? []} loading={loading} t={t} locale={locale} />
        <ProjectProgress projects={stats?.projectProgress ?? []} loading={loading} t={t} />
      </div>
    </div>
  );
}
