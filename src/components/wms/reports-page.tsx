'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  BarChart3, TrendingUp, Clock, AlertTriangle, Package,
  ArrowDownToLine, ArrowUpFromLine, Users, Weight,
  Download, Calendar, Filter, RotateCcw, Loader2, FileJson,
  Activity, Warehouse, ArrowRightLeft,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useTranslation, translateStatus, translateCategory, translateMovementType } from '@/lib/translations';
import type { ReportData } from '@/types/wms';

// ==================== LOCAL TRANSLATION MAPPING ====================
const localTranslations: Record<string, Record<string, string>> = {
  ar: {
    'reports.title': 'التقارير والتحليلات',
    'reports.subtitle': 'تحليل شامل لحركة البضائع والأداء التشغيلي',
    'reports.period': 'الفترة',
    'reports.daily': 'يومي',
    'reports.weekly': 'أسبوعي',
    'reports.monthly': 'شهري',
    'reports.yearly': 'سنوي',
    'reports.from': 'من',
    'reports.to': 'إلى',
    'reports.apply': 'تطبيق',
    'reports.reset': 'إعادة تعيين',
    'reports.kpi.movements': 'إجمالي الحركات',
    'reports.kpi.dwellTime': 'متوسط مدة البقاء',
    'reports.kpi.utilization': 'نسبة التخزين',
    'reports.kpi.critical': 'بضائع حرجة',
    'reports.cargoFlow': 'تدفق البضائع',
    'reports.cargoFlowDesc': 'حركة البضائع الواردة والصادرة خلال الفترة المحددة',
    'reports.inbound': 'وارد',
    'reports.outbound': 'صادر',
    'reports.statusDist': 'توزيع الحالات',
    'reports.statusDistDesc': 'توزيع البضائع حسب حالتها الحالية',
    'reports.locationUtil': 'استخدام المواقع',
    'reports.locationUtilDesc': 'نسبة occupancy لكل موقع تخزيني',
    'reports.topClients': 'أكبر العملاء',
    'reports.topClientsDesc': 'أكثر العملاء نشاطاً من حيث البضائع والأوزان',
    'reports.weightAnalysis': 'تحليل الأوزان',
    'reports.weightAnalysisDesc': 'توزيع الأوزان حسب فئة البضاعة',
    'reports.movementTypes': 'أنواع الحركات',
    'reports.movementTypesDesc': 'توزيع الحركات حسب النوع',
    'reports.days': 'يوم',
    'reports.items': 'قطعة',
    'reports.noData': 'لا توجد بيانات للتقرير',
    'reports.export': 'تصدير التقرير',
    'reports.exportSuccess': 'تم تصدير التقرير بنجاح',
    'reports.exportFailed': 'فشل تصدير التقرير',
    'reports.fetchFailed': 'فشل تحميل بيانات التقرير',
    'reports.total': 'الإجمالي',
    'reports.client': 'العميل',
    'reports.weight': 'الوزن (طن)',
    'reports.count': 'العدد',
    'reports.percentage': 'النسبة',
    'reports.location': 'الموقع',
    'reports.capacity': 'السعة',
    'reports.used': 'المستخدم',
    'reports.status': 'الحالة',
    'reports.date': 'التاريخ',
    'reports.category': 'الفئة',
    'reports.avgWeight': 'متوسط الوزن',
    'reports.maxWeight': 'أقصى وزن',
    'reports.storagePct': 'نسبة التخزين',
  },
  en: {
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Comprehensive analysis of cargo movement and operational performance',
    'reports.period': 'Period',
    'reports.daily': 'Daily',
    'reports.weekly': 'Weekly',
    'reports.monthly': 'Monthly',
    'reports.yearly': 'Yearly',
    'reports.from': 'From',
    'reports.to': 'To',
    'reports.apply': 'Apply',
    'reports.reset': 'Reset',
    'reports.kpi.movements': 'Total Movements',
    'reports.kpi.dwellTime': 'Avg Dwell Time',
    'reports.kpi.utilization': 'Storage Utilization',
    'reports.kpi.critical': 'Critical Cargo',
    'reports.cargoFlow': 'Cargo Flow',
    'reports.cargoFlowDesc': 'Inbound and outbound cargo movement over the selected period',
    'reports.inbound': 'Inbound',
    'reports.outbound': 'Outbound',
    'reports.statusDist': 'Status Distribution',
    'reports.statusDistDesc': 'Cargo distribution by current status',
    'reports.locationUtil': 'Location Utilization',
    'reports.locationUtilDesc': 'Occupancy rate for each storage location',
    'reports.topClients': 'Top Clients',
    'reports.topClientsDesc': 'Most active clients by cargo items and weight',
    'reports.weightAnalysis': 'Weight Analysis',
    'reports.weightAnalysisDesc': 'Weight distribution by commodity category',
    'reports.movementTypes': 'Movement Types',
    'reports.movementTypesDesc': 'Movement distribution by type',
    'reports.days': 'days',
    'reports.items': 'items',
    'reports.noData': 'No data available for this report',
    'reports.export': 'Export Report',
    'reports.exportSuccess': 'Report exported successfully',
    'reports.exportFailed': 'Failed to export report',
    'reports.fetchFailed': 'Failed to load report data',
    'reports.total': 'Total',
    'reports.client': 'Client',
    'reports.weight': 'Weight (t)',
    'reports.count': 'Count',
    'reports.percentage': 'Percentage',
    'reports.location': 'Location',
    'reports.capacity': 'Capacity',
    'reports.used': 'Used',
    'reports.status': 'Status',
    'reports.date': 'Date',
    'reports.category': 'Category',
    'reports.avgWeight': 'Avg Weight',
    'reports.maxWeight': 'Max Weight',
    'reports.storagePct': 'Storage %',
  },
};

// ==================== COLOR CONSTANTS ====================
const STATUS_COLORS: Record<string, string> = {
  IN_YARD: '#10b981',
  IN_WAREHOUSE: '#14b8a6',
  IN_TRANSIT: '#f59e0b',
  RECEIVED: '#06b6d4',
  DISPATCHED: '#64748b',
  DELIVERED: '#94a3b8',
  STAGING: '#f97316',
};

const MOVEMENT_COLORS: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  RECEIVE: { color: '#10b981', bg: 'bg-emerald-500', icon: ArrowDownToLine },
  MOVE: { color: '#06b6d4', bg: 'bg-cyan-500', icon: ArrowRightLeft },
  DISPATCH: { color: '#f97316', bg: 'bg-orange-500', icon: ArrowUpFromLine },
  INSPECT: { color: '#8b5cf6', bg: 'bg-violet-500', icon: Activity },
};

const CATEGORY_COLORS: Record<string, string> = {
  GENERAL: '#10b981',
  MACHINERY: '#3b82f6',
  STEEL: '#64748b',
  EQUIPMENT: '#f59e0b',
  MODULE: '#ef4444',
};

// ==================== HELPERS ====================
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

// ==================== SUB-COMPONENTS ====================

function SectionHeader({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center shrink-0">
          <Icon className="h-4.5 w-4.5 dark:text-amber-400 text-amber-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold dark:text-slate-100 text-slate-900">{title}</h3>
          <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon: Icon, label, value, suffix, trend, loading, colorClass, accentFrom, accentTo,
}: {
  icon: React.ElementType; label: string; value: string | number; suffix?: string;
  trend?: string; loading: boolean;
  colorClass: string; accentFrom: string; accentTo: string;
}) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden relative group transition-all duration-300 hover:dark:border-slate-700 hover:border-slate-300 hover:shadow-lg hover:dark:shadow-amber-500/5 hover:shadow-amber-500/10">
      {/* Gradient top accent */}
      <div className={`h-1 w-full bg-gradient-to-l ${accentFrom} ${accentTo} transition-all duration-300 group-hover:h-1.5`} />
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2 min-w-0">
            <p className="text-xs font-medium dark:text-slate-500 text-slate-400 uppercase tracking-wider">{label}</p>
            {loading ? (
              <Skeleton className="h-8 w-24 dark:bg-slate-800 bg-slate-200 rounded" />
            ) : (
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl sm:text-3xl font-bold dark:text-slate-100 text-slate-900 tabular-nums">{value}</p>
                {suffix && <p className="text-xs font-medium dark:text-slate-500 text-slate-400">{suffix}</p>}
              </div>
            )}
          </div>
          <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && !loading && (
          <div className="mt-3 pt-3 border-t dark:border-slate-800/50 border-slate-200/50">
            <p className="text-xs dark:text-slate-500 text-slate-400">{trend}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== MAIN COMPONENT ====================
export function ReportsPage() {
  const { t, locale } = useTranslation();

  // Local translation with fallback to Arabic
  const lt = useCallback((key: string): string => {
    return localTranslations[locale]?.[key] || localTranslations.ar[key] || key;
  }, [locale]);

  // State
  const [period, setPeriod] = useState<string>('monthly');
  const [startDate, setStartDate] = useState<string>(daysAgoISO(30));
  const [endDate, setEndDate] = useState<string>(todayISO());
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Fetch reports data
  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        period,
        startDate,
        endDate,
      });
      const res = await fetch(`/api/reports?${params}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setReportData(data);
    } catch {
      toast.error(lt('reports.fetchFailed'));
    } finally {
      setLoading(false);
    }
  }, [period, startDate, endDate, lt]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  // Reset to defaults
  const handleReset = () => {
    setPeriod('monthly');
    setStartDate(daysAgoISO(30));
    setEndDate(todayISO());
  };

  // Export as JSON
  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({ period, startDate, endDate });
      const res = await fetch(`/api/reports?${params}`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wms-report-${startDate}-${endDate}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(lt('reports.exportSuccess'));
    } catch {
      toast.error(lt('reports.exportFailed'));
    } finally {
      setExporting(false);
    }
  };

  // Calculate KPIs
  const kpis = useMemo(() => {
    if (!reportData) return { totalMovements: 0, avgDwell: 0, utilization: 0, critical: 0 };
    const totalMovements = reportData.movementStats.total;
    const avgDwell = reportData.dwellTime.avgDays;
    const locUtil = Array.isArray(reportData.locationUtilization) ? reportData.locationUtilization : [];
    const utilization = locUtil.length > 0
      ? Math.round(locUtil.reduce((s, l) => s + l.percentage, 0) / locUtil.length)
      : 0;
    const critical = reportData.dwellTime.critical;
    return { totalMovements, avgDwell, utilization, critical };
  }, [reportData]);

  // Donut chart data
  const donutData = useMemo(() => {
    if (!Array.isArray(reportData?.statusDistribution) || reportData.statusDistribution.length === 0) return { data: [], gradient: '' };
    const entries = reportData.statusDistribution;
    const total = entries.reduce((s, e) => s + e.count, 0);
    let cumulative = 0;
    const segments = entries.map((entry) => {
      const start = (cumulative / total) * 100;
      cumulative += entry.count;
      const end = (cumulative / total) * 100;
      const color = STATUS_COLORS[entry.status] || '#64748b';
      return { ...entry, start, end, color };
    });
    const gradient = segments.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(', ');
    return { data: segments, gradient };
  }, [reportData]);

  // Max values for bar charts
  const maxFlow = useMemo(() => {
    if (!reportData?.cargoFlow) return 0;
    return Math.max(1, ...reportData.cargoFlow.map((d) => Math.max(d.inbound, d.outbound)));
  }, [reportData]);

  const maxWeight = useMemo(() => {
    if (!reportData?.weightStats?.byCategory) return 0;
    return Math.max(1, ...reportData.weightStats.byCategory.map((c) => c.weight));
  }, [reportData]);

  const maxMovement = useMemo(() => {
    if (!reportData?.movementStats?.byType) return 0;
    return Math.max(1, ...reportData.movementStats.byType.map((m) => m.count));
  }, [reportData]);

  return (
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{lt('reports.title')}</h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{lt('reports.subtitle')}</p>
        </div>
        <Button
          onClick={handleExport}
          disabled={exporting || loading}
          className="bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-medium shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/30"
        >
          {exporting ? <Loader2 className="h-4 w-4 ml-2 animate-spin" /> : <FileJson className="h-4 w-4 ml-2" />}
          {lt('reports.export')}
        </Button>
      </div>

      {/* ===== FILTER BAR ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
            {/* Period selector */}
            <div className="flex flex-col gap-1.5 min-w-0 sm:w-auto">
              <label className="text-xs font-medium dark:text-slate-500 text-slate-400">{lt('reports.period')}</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full sm:w-[160px] dark:bg-slate-800/60 bg-slate-50 dark:border-slate-700 border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{lt('reports.daily')}</SelectItem>
                  <SelectItem value="weekly">{lt('reports.weekly')}</SelectItem>
                  <SelectItem value="monthly">{lt('reports.monthly')}</SelectItem>
                  <SelectItem value="yearly">{lt('reports.yearly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium dark:text-slate-500 text-slate-400">{lt('reports.from')}</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 rounded-md border dark:bg-slate-800/60 bg-slate-50 dark:border-slate-700 border-slate-300 px-3 text-sm dark:text-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium dark:text-slate-500 text-slate-400">{lt('reports.to')}</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 rounded-md border dark:bg-slate-800/60 bg-slate-50 dark:border-slate-700 border-slate-300 px-3 text-sm dark:text-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={fetchReport}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium transition-all duration-200"
              >
                {loading ? <Loader2 className="h-3.5 w-3.5 ml-1.5 animate-spin" /> : <Filter className="h-3.5 w-3.5 ml-1.5" />}
                {lt('reports.apply')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200">
                <RotateCcw className="h-3.5 w-3.5 ml-1.5" />
                {lt('reports.reset')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== KPI CARDS ROW ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={ArrowRightLeft}
          label={lt('reports.kpi.movements')}
          value={loading ? '...' : kpis.totalMovements.toLocaleString()}
          loading={loading}
          colorClass="dark:bg-emerald-500/10 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
          accentFrom="from-emerald-500"
          accentTo="to-teal-500"
          trend={loading ? undefined : `${lt('reports.total')}: ${reportData?.movementStats?.total || 0}`}
        />
        <KPICard
          icon={Clock}
          label={lt('reports.kpi.dwellTime')}
          value={loading ? '...' : kpis.avgDwell}
          suffix={lt('reports.days')}
          loading={loading}
          colorClass="dark:bg-amber-500/10 bg-amber-500/10 text-amber-500 dark:text-amber-400"
          accentFrom="from-amber-500"
          accentTo="to-yellow-500"
          trend={loading ? undefined : `Max: ${reportData?.dwellTime?.maxDays || 0} ${lt('reports.days')}`}
        />
        <KPICard
          icon={Warehouse}
          label={lt('reports.kpi.utilization')}
          value={loading ? '...' : `${kpis.utilization}%`}
          loading={loading}
          colorClass="dark:bg-teal-500/10 bg-teal-500/10 text-teal-500 dark:text-teal-400"
          accentFrom="from-teal-500"
          accentTo="to-cyan-500"
          trend={loading ? undefined : `${reportData?.locationUtilization?.length || 0} ${lt('reports.location')}`}
        />
        <KPICard
          icon={AlertTriangle}
          label={lt('reports.kpi.critical')}
          value={loading ? '...' : kpis.critical}
          suffix={lt('reports.items')}
          loading={loading}
          colorClass="dark:bg-red-500/10 bg-red-500/10 text-red-500 dark:text-red-400"
          accentFrom="from-red-500"
          accentTo="to-orange-500"
          trend={loading ? undefined : `> 30 ${lt('reports.days')}`}
        />
      </div>

      {/* ===== CARGO FLOW BAR CHART ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-l from-amber-500 to-emerald-500" />
        <CardContent className="p-4 sm:p-6">
          <SectionHeader title={lt('reports.cargoFlow')} subtitle={lt('reports.cargoFlowDesc')} icon={BarChart3} />

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-200 rounded" />
                  <div className="flex-1 flex gap-1">
                    <Skeleton className="h-6 flex-1 dark:bg-slate-800 bg-slate-200 rounded" />
                    <Skeleton className="h-6 flex-1 dark:bg-slate-800 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : !Array.isArray(reportData?.cargoFlow) || !reportData.cargoFlow.length ? (
            <EmptyState message={lt('reports.noData')} />
          ) : (
            <>
              {/* Legend */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-emerald-500" />
                  <span className="text-xs dark:text-slate-400 text-slate-500">{lt('reports.inbound')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-orange-500" />
                  <span className="text-xs dark:text-slate-400 text-slate-500">{lt('reports.outbound')}</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-2 max-h-80 overflow-y-auto pl-1 custom-scrollbar">
                {reportData.cargoFlow.slice(-14).map((item) => {
                  const inboundH = maxFlow > 0 ? (item.inbound / maxFlow) * 100 : 0;
                  const outboundH = maxFlow > 0 ? (item.outbound / maxFlow) * 100 : 0;
                  return (
                    <div key={item.date} className="flex items-center gap-2 min-h-[28px]">
                      <span className="text-[10px] font-mono dark:text-slate-500 text-slate-400 w-16 shrink-0 text-left">
                        {formatDateShort(item.date)}
                      </span>
                      <div className="flex-1 flex gap-1 h-7 items-end">
                        {/* Inbound bar */}
                        <div className="flex-1 flex items-center">
                          <div
                            className="h-full bg-gradient-to-t from-emerald-600 to-emerald-400 dark:from-emerald-700 dark:to-emerald-500 rounded-sm transition-all duration-500 ease-out min-w-[2px]"
                            style={{ width: `${Math.max(inboundH, inboundH > 0 ? 3 : 0)}%` }}
                            title={`${lt('reports.inbound')}: ${item.inbound}`}
                          />
                        </div>
                        {/* Outbound bar */}
                        <div className="flex-1 flex items-center">
                          <div
                            className="h-full bg-gradient-to-t from-orange-600 to-orange-400 dark:from-orange-700 dark:to-orange-500 rounded-sm transition-all duration-500 ease-out min-w-[2px]"
                            style={{ width: `${Math.max(outboundH, outboundH > 0 ? 3 : 0)}%` }}
                            title={`${lt('reports.outbound')}: ${item.outbound}`}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-16 shrink-0 justify-end">
                        <span className="text-[10px] font-mono dark:text-emerald-400 text-emerald-600">{item.inbound}</span>
                        <span className="text-[10px] font-mono dark:text-orange-400 text-orange-600">{item.outbound}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ===== STATUS DISTRIBUTION + LOCATION UTILIZATION (2-col) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Distribution - Donut Chart */}
        <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-l from-amber-500 to-teal-500" />
          <CardContent className="p-4 sm:p-6">
            <SectionHeader title={lt('reports.statusDist')} subtitle={lt('reports.statusDistDesc')} icon={Activity} />

            {loading ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <Skeleton className="h-40 w-40 rounded-full dark:bg-slate-800 bg-slate-200" />
                <div className="space-y-2 w-full max-w-xs">
                  <Skeleton className="h-4 w-full dark:bg-slate-800 bg-slate-200 rounded" />
                  <Skeleton className="h-4 w-3/4 dark:bg-slate-800 bg-slate-200 rounded" />
                  <Skeleton className="h-4 w-1/2 dark:bg-slate-800 bg-slate-200 rounded" />
                </div>
              </div>
            ) : !Array.isArray(donutData.data) || !donutData.data.length ? (
              <EmptyState message={lt('reports.noData')} />
            ) : (
              <div className="flex flex-col items-center gap-5">
                {/* Donut chart */}
                <div className="relative h-44 w-44">
                  <div
                    className="h-full w-full rounded-full shadow-inner"
                    style={{
                      background: `conic-gradient(${donutData.gradient})`,
                    }}
                  />
                  <div className="absolute inset-0 m-auto h-28 w-28 rounded-full dark:bg-[#0e1019] bg-white shadow-inner flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 tabular-nums">
                      {reportData?.statusDistribution.reduce((s, d) => s + d.count, 0)}
                    </p>
                    <p className="text-[10px] dark:text-slate-500 text-slate-400 uppercase tracking-wider">{lt('reports.total')}</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-xs">
                  {donutData.data.map((item) => (
                    <div key={item.status} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="text-xs dark:text-slate-400 text-slate-500 truncate">
                          {translateStatus(item.status as any)}
                        </span>
                        <span className="text-xs font-semibold dark:text-slate-300 text-slate-700 tabular-nums">
                          {item.count}
                          <span className="text-[10px] dark:text-slate-500 text-slate-400 ml-1">({item.percentage}%)</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Utilization - Horizontal bars */}
        <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-l from-teal-500 to-cyan-500" />
          <CardContent className="p-4 sm:p-6">
            <SectionHeader title={lt('reports.locationUtil')} subtitle={lt('reports.locationUtilDesc')} icon={Warehouse} />

            {loading ? (
              <div className="space-y-4 py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24 dark:bg-slate-800 bg-slate-200 rounded" />
                      <Skeleton className="h-4 w-10 dark:bg-slate-800 bg-slate-200 rounded" />
                    </div>
                    <Skeleton className="h-5 w-full dark:bg-slate-800 bg-slate-200 rounded-full" />
                  </div>
                ))}
              </div>
            ) : !Array.isArray(reportData?.locationUtilization) || !reportData.locationUtilization.length ? (
              <EmptyState message={lt('reports.noData')} />
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                {reportData.locationUtilization
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((loc) => {
                    const pct = loc.percentage;
                    const barColor = pct >= 80
                      ? 'from-red-500 to-red-400 dark:from-red-600 dark:to-red-500'
                      : pct >= 50
                        ? 'from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500'
                        : 'from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-500';
                    return (
                      <div key={loc.location} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono dark:text-slate-300 text-slate-700 font-medium">{loc.location}</span>
                            {loc.name && (
                              <span className="dark:text-slate-500 text-slate-400 truncate">{loc.name}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="dark:text-slate-500 text-slate-400">{loc.used}/{loc.capacity}</span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 py-0 font-semibold tabular-nums ${
                                pct >= 80
                                  ? 'dark:text-red-400 text-red-600 dark:border-red-500/30 border-red-300 dark:bg-red-500/10 bg-red-50'
                                  : pct >= 50
                                    ? 'dark:text-amber-400 text-amber-600 dark:border-amber-500/30 border-amber-300 dark:bg-amber-500/10 bg-amber-50'
                                    : 'dark:text-emerald-400 text-emerald-600 dark:border-emerald-500/30 border-emerald-300 dark:bg-emerald-500/10 bg-emerald-50'
                              }`}
                            >
                              {pct}%
                            </Badge>
                          </div>
                        </div>
                        <div className="h-2.5 w-full rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-l ${barColor} transition-all duration-700 ease-out`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== TOP CLIENTS TABLE ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-l from-amber-500 to-cyan-500" />
        <CardContent className="p-4 sm:p-6">
          <SectionHeader title={lt('reports.topClients')} subtitle={lt('reports.topClientsDesc')} icon={Users} />

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full dark:bg-slate-800 bg-slate-200" />
                  <Skeleton className="h-4 w-32 dark:bg-slate-800 bg-slate-200 rounded" />
                  <Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-200 rounded" />
                  <Skeleton className="h-4 w-20 dark:bg-slate-800 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : !Array.isArray(reportData?.topClients) || !reportData.topClients.length ? (
            <EmptyState message={lt('reports.noData')} />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-slate-800 border-slate-200 dark:hover:bg-slate-800/30 hover:bg-slate-50">
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs font-medium">#</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs font-medium">{lt('reports.client')}</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs font-medium text-center">{lt('reports.count')}</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs font-medium text-left">{lt('reports.weight')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.topClients.map((client, idx) => (
                    <TableRow key={client.client} className="dark:border-slate-800/50 border-slate-100 dark:hover:bg-slate-800/30 hover:bg-slate-50 transition-colors">
                      <TableCell className="dark:text-slate-500 text-slate-400 text-xs font-mono tabular-nums">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                            idx === 0 ? 'dark:bg-amber-500/15 bg-amber-500/10 dark:text-amber-400 text-amber-600'
                              : idx === 1 ? 'dark:bg-slate-500/15 bg-slate-500/10 dark:text-slate-300 text-slate-600'
                              : idx === 2 ? 'dark:bg-orange-500/15 bg-orange-500/10 dark:text-orange-400 text-orange-600'
                              : 'dark:bg-slate-800/60 bg-slate-100 dark:text-slate-400 text-slate-500'
                          }`}>
                            {client.client.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold dark:text-slate-200 text-slate-800">{client.client}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600 dark:border-cyan-500/20 border-cyan-200 text-xs font-semibold tabular-nums">
                          {client.items} {lt('reports.items')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Weight className="h-3.5 w-3.5 dark:text-slate-500 text-slate-400" />
                          <span className="text-sm font-semibold dark:text-slate-200 text-slate-800 tabular-nums">
                            {client.weight.toLocaleString()} {lt('reports.weight').replace(/ \(.*\)/, '')}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== WEIGHT ANALYSIS + MOVEMENT TYPES (2-col) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weight Analysis */}
        <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-l from-emerald-500 to-teal-500" />
          <CardContent className="p-4 sm:p-6">
            <SectionHeader title={lt('reports.weightAnalysis')} subtitle={lt('reports.weightAnalysisDesc')} icon={Weight} />

            {loading ? (
              <div className="space-y-4 py-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-4 w-20 dark:bg-slate-800 bg-slate-200 rounded" />
                    <Skeleton className="h-5 w-full dark:bg-slate-800 bg-slate-200 rounded-full" />
                  </div>
                ))}
              </div>
            ) : !Array.isArray(reportData?.weightStats?.byCategory) || !reportData.weightStats.byCategory.length ? (
              <EmptyState message={lt('reports.noData')} />
            ) : (
              <>
                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="dark:bg-slate-800/40 bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400">{lt('reports.total')}</p>
                    <p className="text-lg font-bold dark:text-slate-100 text-slate-900 tabular-nums mt-0.5">
                      {reportData.weightStats.total.toLocaleString()}
                    </p>
                  </div>
                  <div className="dark:bg-slate-800/40 bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400">{lt('reports.avgWeight')}</p>
                    <p className="text-lg font-bold dark:text-slate-100 text-slate-900 tabular-nums mt-0.5">
                      {reportData.weightStats.avg}
                    </p>
                  </div>
                  <div className="dark:bg-slate-800/40 bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400">{lt('reports.maxWeight')}</p>
                    <p className="text-lg font-bold dark:text-slate-100 text-slate-900 tabular-nums mt-0.5">
                      {reportData.weightStats.max.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Bars */}
                <div className="space-y-3">
                  {reportData.weightStats.byCategory.map((cat) => {
                    const pct = maxWeight > 0 ? (cat.weight / maxWeight) * 100 : 0;
                    const color = CATEGORY_COLORS[cat.category] || '#64748b';
                    return (
                      <div key={cat.category} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="dark:text-slate-300 text-slate-700 font-medium">
                            {translateCategory(cat.category as any)}
                          </span>
                          <span className="dark:text-slate-400 text-slate-500 font-mono tabular-nums">
                            {cat.weight.toLocaleString()} t
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${pct}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Movement Type Breakdown */}
        <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-l from-cyan-500 to-violet-500" />
          <CardContent className="p-4 sm:p-6">
            <SectionHeader title={lt('reports.movementTypes')} subtitle={lt('reports.movementTypesDesc')} icon={ArrowRightLeft} />

            {loading ? (
              <div className="space-y-4 py-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-20 dark:bg-slate-800 bg-slate-200 rounded" />
                      <Skeleton className="h-5 w-full dark:bg-slate-800 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !Array.isArray(reportData?.movementStats?.byType) || !reportData.movementStats.byType.length ? (
              <EmptyState message={lt('reports.noData')} />
            ) : (
              <>
                {/* Total badge */}
                <div className="flex items-center gap-2 mb-5">
                  <Badge variant="outline" className="dark:bg-slate-800/60 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-slate-700 border-slate-300 text-xs font-semibold px-3 py-1">
                    {lt('reports.total')}: {reportData.movementStats.total}
                  </Badge>
                </div>

                {/* Movement type cards with bars */}
                <div className="space-y-4">
                  {reportData.movementStats.byType.map((move) => {
                    const config = MOVEMENT_COLORS[move.type] || { color: '#64748b', bg: 'bg-slate-500', icon: ArrowRightLeft };
                    const IconComp = config.icon;
                    const pct = maxMovement > 0 ? (move.count / maxMovement) * 100 : 0;
                    const pctOfTotal = reportData.movementStats.total > 0
                      ? Math.round((move.count / reportData.movementStats.total) * 100)
                      : 0;
                    return (
                      <div key={move.type} className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110"
                          style={{ backgroundColor: `${config.color}15` }}
                        >
                          <IconComp className="h-5 w-5" style={{ color: config.color }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold dark:text-slate-200 text-slate-800">
                                {translateMovementType(move.type as any)}
                              </span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono tabular-nums dark:text-slate-400 text-slate-500 dark:border-slate-700 border-slate-300">
                                {move.count}
                              </Badge>
                            </div>
                            <span className="text-xs font-semibold font-mono tabular-nums" style={{ color: config.color }}>
                              {pctOfTotal}%
                            </span>
                          </div>
                          <div className="h-3 w-full rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${config.bg} transition-all duration-700 ease-out`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== CARGO FLOW DETAILED TABLE ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-l from-amber-500 via-emerald-500 to-teal-500" />
        <CardContent className="p-4 sm:p-6">
          <SectionHeader title={lt('reports.cargoFlow')} subtitle={lt('reports.cargoFlowDesc')} icon={TrendingUp} />

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full dark:bg-slate-800 bg-slate-200 rounded" />
              ))}
            </div>
          ) : !Array.isArray(reportData?.cargoFlow) || !reportData.cargoFlow.length ? (
            <EmptyState message={lt('reports.noData')} />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-slate-800 border-slate-200">
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs">{lt('reports.date')}</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs text-center">{lt('reports.inbound')}</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs text-center">{lt('reports.outbound')}</TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs text-center dark:text-emerald-400/70 text-emerald-600/70">
                      {t('status.IN_YARD')}
                    </TableHead>
                    <TableHead className="dark:text-slate-500 text-slate-400 text-xs text-center dark:text-teal-400/70 text-teal-600/70">
                      {t('status.IN_WAREHOUSE')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.cargoFlow
                    .slice()
                    .reverse()
                    .slice(0, 10)
                    .map((row) => (
                      <TableRow key={row.date} className="dark:border-slate-800/50 border-slate-100 dark:hover:bg-slate-800/30 hover:bg-slate-50 transition-colors">
                        <TableCell className="dark:text-slate-300 text-slate-700 text-xs font-mono">
                          {formatDate(row.date)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center gap-1">
                            <ArrowDownToLine className="h-3 w-3 dark:text-emerald-400 text-emerald-600" />
                            <span className="text-xs font-semibold dark:text-emerald-400 text-emerald-600 tabular-nums">{row.inbound}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="inline-flex items-center gap-1">
                            <ArrowUpFromLine className="h-3 w-3 dark:text-orange-400 text-orange-600" />
                            <span className="text-xs font-semibold dark:text-orange-400 text-orange-600 tabular-nums">{row.outbound}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-xs font-medium dark:text-emerald-300/70 text-emerald-700 tabular-nums">{row.inYard}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-xs font-medium dark:text-teal-300/70 text-teal-700 tabular-nums">{row.inWarehouse}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== Inline Styles for Scrollbar ===== */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: theme(colors.slate.700);
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: theme(colors.slate.600);
        }
      `}</style>
    </div>
  );
}

// ==================== EMPTY STATE COMPONENT ====================
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="h-14 w-14 rounded-2xl dark:bg-slate-800/60 bg-slate-100 flex items-center justify-center">
        <BarChart3 className="h-7 w-7 dark:text-slate-600 text-slate-400" />
      </div>
      <p className="text-sm dark:text-slate-500 text-slate-400 text-center">{message}</p>
    </div>
  );
}
