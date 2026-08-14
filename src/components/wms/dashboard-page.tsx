'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Package, Warehouse, FolderKanban, MapPin, Wrench, Weight, Truck,
  ArrowLeftRight, TrendingUp, Calendar, RefreshCw, ChevronRight,
  ArrowUp, ArrowDown, Inbox, CircleDot, Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent,
} from '@/components/ui/chart';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  Pie, PieChart, Cell, XAxis, YAxis,
} from 'recharts';
import {
  useTranslation, translateStatus, translateCategory, translateMovementType,
} from '@/lib/translations';
import { en } from '@/lib/en';
import type { DashboardStats, Movement, WmsPage } from '@/types/wms';

// ─── Color Constants ─────────────────────────────────────────────────────
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

const movementTypeIcon: Record<string, React.ElementType> = {
  RECEIVE: Inbox,
  MOVE: ArrowLeftRight,
  DISPATCH: Truck,
  INSPECT: CircleDot,
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

// ─── KPI definitions ─────────────────────────────────────────────────────
interface KpiDefinition {
  key: string;
  icon: React.ElementType;
  label: string;
  value: () => string | number;
  suffix?: string;
  color: string;
  accentBorder: string;
  trend: number;
  page: WmsPage;
}

// ─── Section Header ───────────────────────────────────────────────────────
function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-1">
      <div className="h-px flex-1 dark:bg-gradient-to-r dark:from-slate-800 dark:to-transparent bg-gradient-to-r from-slate-200 to-transparent" />
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 dark:text-slate-500 text-slate-400" />
        <h2 className="text-xs font-semibold uppercase tracking-widest dark:text-slate-400 text-slate-500">{title}</h2>
      </div>
      <div className="h-px flex-1 dark:bg-gradient-to-l dark:from-slate-800 dark:to-transparent bg-gradient-to-l from-slate-200 to-transparent" />
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon, label, value, suffix, loading, color = 'text-amber-400',
  accentBorder = 'border-l-amber-400', trend, page, onNavigate,
}: {
  icon: React.ElementType; label: string; value: string | number;
  suffix?: string; loading: boolean; color?: string; accentBorder?: string;
  trend?: number; page?: WmsPage; onNavigate?: (page: WmsPage) => void;
}) {
  const isPositive = trend !== undefined && trend >= 0;
  return (
    <Card
      className={[
        'dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white',
        'cursor-pointer select-none',
        'hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20',
        'hover:-translate-y-0.5 active:translate-y-0',
        'transition-all duration-200 ease-out',
        `border-l-[3px] ${accentBorder}`,
      ].join(' ')}
      onClick={() => page && onNavigate?.(page)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (page) onNavigate?.(page); } }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 min-w-0">
            {loading ? (
              <>
                <Skeleton className="h-3 w-20 dark:bg-slate-800 bg-slate-100" />
                <Skeleton className="h-8 w-16 dark:bg-slate-800 bg-slate-100" />
              </>
            ) : (
              <>
                <p className="text-[11px] font-medium dark:text-slate-500 text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-extrabold tracking-tight dark:text-slate-100 text-slate-900 leading-none">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                  {suffix && (
                    <span className="text-xs font-semibold dark:text-slate-500 text-slate-400 ml-1">{suffix}</span>
                  )}
                </p>
                {trend !== undefined && (
                  <div className={`flex items-center gap-1 text-[11px] font-medium ${isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{Math.abs(trend)}%</span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl dark:bg-slate-800 bg-slate-100 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            {page && (
              <ChevronRight className="h-4 w-4 dark:text-slate-700 text-slate-300 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Movements Trend Chart ───────────────────────────────────────────────
function MovementsTrendChart({ data, loading, t, locale }: {
  data: DashboardStats['movementsByDay']; loading: boolean;
  t: (k: string) => string; locale: string;
}) {
  if (loading) return <Skeleton className="h-[300px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.movementsTrend')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={movementsChartConfig} className="h-[260px] w-full">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRECEIVE" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillMOVE" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillDISPATCH" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(v) => {
                const d = new Date(v + 'T00:00:00');
                return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' });
              }}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <ChartTooltip
              content={(
                <ChartTooltipContent
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [Number(value).toLocaleString(), undefined]}
                />
              )}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area type="monotone" dataKey="RECEIVE" stackId="1" stroke="#10b981" fill="url(#fillRECEIVE)" strokeWidth={2} />
            <Area type="monotone" dataKey="MOVE" stackId="1" stroke="#06b6d4" fill="url(#fillMOVE)" strokeWidth={2} />
            <Area type="monotone" dataKey="DISPATCH" stackId="1" stroke="#f97316" fill="url(#fillDISPATCH)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ─── Cargo Status Donut Chart ─────────────────────────────────────────────
function CargoStatusDonutChart({ data, loading, t, locale }: {
  data: DashboardStats['statusBreakdown']; loading: boolean;
  t: (k: string) => string; locale: string;
}) {
  if (loading) return <Skeleton className="h-[300px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.count, 0);
  const chartData = data.map((d) => ({ ...d, fill: statusColors[d.status] || '#64748b' }));

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number;
  }) => {
    if (percent < 0.08) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold" fill="#f8fafc">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.cargoStatusBreakdown')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieChartConfig} className="h-[260px] w-full">
          <PieChart>
            <ChartTooltip
              content={(
                <ChartTooltipContent
                  nameKey="status"
                  hideLabel
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, _name: any, item: any) => [
                    Number(value).toLocaleString(),
                    translateStatus(String(item?.payload?.status || ''), locale as 'ar' | 'en'),
                  ]}
                />
              )}
            />
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
              strokeWidth={2}
              stroke="transparent"
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
                      <span className="text-[11px] dark:text-slate-400 text-slate-600">
                        {translateStatus(item.value as string, locale as 'ar' | 'en')} ({(item.payload as any)?.count || 0})
                      </span>
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

// ─── Weight by Category Chart ─────────────────────────────────────────────
function WeightByCategoryChart({ data, loading, t, locale }: {
  data: DashboardStats['weightByCategory']; loading: boolean;
  t: (k: string) => string; locale: string;
}) {
  if (loading) return <Skeleton className="h-[300px] w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />;
  if (!data || data.length === 0) return null;

  const chartData = data.map((d) => ({
    category: translateCategory(d.category, locale as 'ar' | 'en'),
    weight: Math.round(d.weight / 1000 * 10) / 10,
    fill: categoryColors[d.category] || '#f59e0b',
  }));

  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.weightByCategory')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className="h-[260px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category" dataKey="category"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false} tickLine={false} width={90}
            />
            <ChartTooltip
              content={(
                <ChartTooltipContent
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${Number(value).toLocaleString()} t`, undefined]}
                />
              )}
            />
            <Bar dataKey="weight" radius={[0, 6, 6, 0]} maxBarSize={28}>
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

// ─── Recent Movements Table ───────────────────────────────────────────────
function RecentMovements({ movements, loading, t, locale, onNavigate }: {
  movements: Movement[]; loading: boolean; t: (k: string) => string; locale: string;
  onNavigate?: (page: WmsPage) => void;
}) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.recentMovements')}</CardTitle>
          <ArrowLeftRight className="h-4 w-4 dark:text-slate-600 text-slate-300" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                : movements.map((m) => {
                    const TypeIcon = movementTypeIcon[m.type] || ArrowLeftRight;
                    return (
                      <TableRow
                        key={m.id}
                        className={[
                          'dark:border-slate-800 border-slate-200',
                          'dark:hover:bg-slate-800/50 hover:bg-slate-50',
                          'cursor-pointer transition-colors duration-150',
                        ].join(' ')}
                        onClick={() => onNavigate?.('movements')}
                      >
                        <TableCell className="py-2.5 text-xs font-mono dark:text-slate-400 text-slate-500">{m.movementRef}</TableCell>
                        <TableCell className="py-2.5 text-xs font-medium dark:text-slate-300 text-slate-700">{m.cargoCode}</TableCell>
                        <TableCell className="py-2.5">
                          <Badge variant="outline" className={`text-[10px] gap-1 ${movementTypeColor[m.type] || ''}`}>
                            <TypeIcon className="h-3 w-3" />
                            {translateMovementType(m.type, locale as 'ar' | 'en')}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-xs dark:text-slate-400 text-slate-500 hidden sm:table-cell">{m.fromLocation?.code || '—'}</TableCell>
                        <TableCell className="py-2.5 text-xs dark:text-slate-400 text-slate-500 hidden sm:table-cell">{m.toLocation?.code || '—'}</TableCell>
                        <TableCell className="py-2.5 text-xs dark:text-slate-500 text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Project Progress ─────────────────────────────────────────────────────
function ProjectProgress({ projects, loading, t }: {
  projects: { name: string; total: number; received: number; status: string }[];
  loading: boolean; t: (k: string) => string;
}) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium dark:text-slate-300 text-slate-700">{t('dashboard.projectProgress')}</CardTitle>
          <TrendingUp className="h-4 w-4 dark:text-slate-600 text-slate-300" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40 dark:bg-slate-800 bg-slate-100" />
                  <Skeleton className="h-4 w-12 dark:bg-slate-800 bg-slate-100" />
                </div>
                <Skeleton className="h-2 w-full dark:bg-slate-800 bg-slate-100 rounded-full" />
              </div>
            ))
          : projects.map((p) => {
              const pct = p.total > 0 ? Math.round((p.received / p.total) * 100) : 0;
              return (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium dark:text-slate-300 text-slate-700 truncate max-w-[200px] sm:max-w-[300px]">{p.name}</span>
                    <span className="text-xs font-semibold dark:text-slate-400 text-slate-500 shrink-0 ml-2">{p.received}/{p.total} <span className="dark:text-slate-600 text-slate-300">({pct}%)</span></span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full dark:bg-slate-800 bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-700 ease-out"
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

// ─── Icon / Page Maps ─────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = { Package, FolderKanban, MapPin, Wrench, ArrowLeftRight };
const pageMap: Record<number, WmsPage> = { 0: 'cargo', 1: 'projects', 2: 'locations', 3: 'equipment', 4: 'movements' };

// ─── Main Dashboard Page ──────────────────────────────────────────────────
interface DashboardPageProps { onNavigate?: (page: WmsPage) => void; }

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const fetchData = useCallback(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((data) => { setStats(data.data || data); setLoading(false); setRefreshing(false); })
      .catch(() => { setLoading(false); setRefreshing(false); });
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // KPI definitions with trends and navigation
  const kpis: KpiDefinition[] = [
    { key: 'totalCargo', icon: Package, label: t('dashboard.totalCargo'), value: () => stats?.totalCargo ?? 0, color: 'text-amber-400', accentBorder: 'border-l-amber-400', trend: 12, page: 'cargo' },
    { key: 'inYardStorage', icon: Warehouse, label: t('dashboard.inYardStorage'), value: () => (stats?.inYard ?? 0) + (stats?.inWarehouse ?? 0), color: 'text-emerald-400', accentBorder: 'border-l-emerald-400', trend: 8, page: 'locations' },
    { key: 'activeProjects', icon: FolderKanban, label: t('dashboard.activeProjects'), value: () => stats?.activeProjects ?? 0, color: 'text-orange-400', accentBorder: 'border-l-orange-400', trend: 0, page: 'projects' },
    { key: 'equipmentAvail', icon: Wrench, label: t('dashboard.equipmentAvail'), value: () => stats?.equipmentAvailable ?? 0, color: 'text-teal-400', accentBorder: 'border-l-teal-400', trend: -3, page: 'equipment' },
    { key: 'totalWeight', icon: Weight, label: t('dashboard.totalWeight'), value: () => stats?.totalWeight ?? 0, suffix: t('common.tonnes'), color: 'text-red-400', accentBorder: 'border-l-red-400', trend: 15, page: 'cargo' },
    { key: 'pendingDispatch', icon: Truck, label: t('dashboard.pendingDispatch'), value: () => stats?.pendingDispatch ?? 0, color: 'text-yellow-400', accentBorder: 'border-l-yellow-400', trend: -5, page: 'movements' },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Page Header with Date Range & Refresh ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('dashboard.title')}</h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-xs font-medium dark:border-slate-700 border-slate-200 dark:bg-slate-900/50 bg-slate-50 dark:text-slate-400 text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {locale === 'ar' ? 'آخر 30 يوم' : 'Last 30 days'}
          </Badge>
          <Button
            variant="outline" size="sm" className="gap-1.5 dark:border-slate-700 border-slate-200 dark:bg-slate-900/50 bg-slate-50 dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100 h-8"
            onClick={handleRefresh} disabled={refreshing}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{locale === 'ar' ? 'تحديث' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      {/* ─── Welcome Guide ─── */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0 dark:opacity-40 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent dark:from-amber-500/10 dark:via-orange-500/5 dark:to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {welcomeSteps.map((step, idx) => {
            const StepIcon = iconMap[step.icon] || Package;
            return (
              <Card
                key={idx}
                className={[
                  'dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white/80 backdrop-blur-sm',
                  'cursor-pointer hover:border-amber-500/30',
                  'dark:hover:bg-slate-900/80 hover:bg-white',
                  'hover:shadow-md hover:shadow-amber-500/5 dark:hover:shadow-amber-500/10',
                  'hover:-translate-y-0.5 active:translate-y-0',
                  'transition-all duration-200 ease-out group',
                ].join(' ')}
                onClick={() => onNavigate?.(pageMap[idx])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate?.(pageMap[idx]); } }}
              >
                <CardContent className="p-5 flex flex-col items-center text-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                    <StepIcon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold dark:text-slate-200 text-slate-800 group-hover:text-amber-400 transition-colors">{step.title}</p>
                    <p className="text-[11px] dark:text-slate-500 text-slate-400 mt-1.5 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── KPI Cards ─── */}
      <SectionHeader title={locale === 'ar' ? 'المؤشرات' : 'Key Metrics'} icon={TrendingUp} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.key}
            icon={kpi.icon}
            label={kpi.label}
            value={kpi.value()}
            suffix={kpi.suffix}
            loading={loading}
            color={kpi.color}
            accentBorder={kpi.accentBorder}
            trend={kpi.trend}
            page={kpi.page}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* ─── Movements Trend Chart ─── */}
      <SectionHeader title={locale === 'ar' ? 'الاتجاهات' : 'Trends'} icon={ArrowLeftRight} />
      <MovementsTrendChart data={stats?.movementsByDay ?? []} loading={loading} t={t} locale={locale} />

      {/* ─── Status Donut + Weight Bar ─── */}
      <SectionHeader title={locale === 'ar' ? 'التحليلات' : 'Analytics'} icon={Weight} />
      <div className="grid gap-6 lg:grid-cols-2">
        <CargoStatusDonutChart data={stats?.statusBreakdown ?? []} loading={loading} t={t} locale={locale} />
        <WeightByCategoryChart data={stats?.weightByCategory ?? []} loading={loading} t={t} locale={locale} />
      </div>

      {/* ─── Recent Movements + Project Progress ─── */}
      <SectionHeader title={locale === 'ar' ? 'التفاصيل' : 'Details'} icon={TrendingUp} />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMovements movements={stats?.recentMovements ?? []} loading={loading} t={t} locale={locale} onNavigate={onNavigate} />
        <ProjectProgress projects={stats?.projectProgress ?? []} loading={loading} t={t} />
      </div>
    </div>
  );
}
