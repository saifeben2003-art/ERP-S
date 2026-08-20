'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Plus, Search, Filter, Download, ArrowLeftRight, Truck, Search as SearchIcon,
  Package, Warehouse, MapPin, Building2, Container, ArrowRight, User, Wrench,
  Clock, Activity, Radio, Eye, FileText, Weight, Tag, ChevronLeft, RotateCcw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useTranslation, translateMovementType, translateCategory, translateStatus } from '@/lib/translations';
import type { Movement, MovementType, CargoItem, Location, Equipment, LiftCategory } from '@/types/wms';

// ==================== CONSTANTS ====================

const movementTypes: MovementType[] = ['RECEIVE', 'MOVE', 'DISPATCH', 'INSPECT'];

const typeStyles: Record<MovementType, string> = {
  RECEIVE: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
  MOVE: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20',
  DISPATCH: 'bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20',
  INSPECT: 'bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20',
};

const typeDotColors: Record<MovementType, string> = {
  RECEIVE: 'bg-emerald-500',
  MOVE: 'bg-cyan-500',
  DISPATCH: 'bg-orange-500',
  INSPECT: 'bg-purple-500',
};

const emptyForm = {
  cargoItemId: '', type: '' as string, fromLocationId: '', toLocationId: '',
  equipmentUsed: '', liftMethod: '', operatorName: '', actualWeight: '', remarks: '',
};

// ==================== ICONS ====================

function TypeIcon({ type, className = 'h-3.5 w-3.5' }: { type: MovementType; className?: string }) {
  switch (type) {
    case 'RECEIVE': return <Download className={className} />;
    case 'MOVE': return <ArrowLeftRight className={className} />;
    case 'DISPATCH': return <Truck className={className} />;
    case 'INSPECT': return <SearchIcon className={className} />;
  }
}

function LocationTypeIcon({ type, className = 'h-5 w-5' }: { type: string; className?: string }) {
  switch (type) {
    case 'YARD': return <Container className={className} />;
    case 'WAREHOUSE': return <Warehouse className={className} />;
    case 'STAGING': return <Building2 className={className} />;
    case 'BERTH': return <MapPin className={className} />;
    default: return <MapPin className={className} />;
  }
}

// ==================== RELATIVE TIME ====================

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ==================== STAT CARD ====================

function StatCard({ icon: Icon, label, value, accent }: {
  icon: React.ElementType; label: string; value: number; accent: string;
}) {
  return (
    <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${accent} transition-all duration-200`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 leading-none">{value}</p>
          <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== MAIN COMPONENT ====================

export function MovementsPage() {
  const { t } = useTranslation();

  // State
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [cargoItems, setCargoItems] = useState<CargoItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  // Detail sheet state
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [detailCargo, setDetailCargo] = useState<CargoItem | null>(null);
  const [cargoTimeline, setCargoTimeline] = useState<Movement[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({ today: 0, week: 0, receive: 0, dispatch: 0 });

  // Auto-refresh
  const [autoRefresh, setAutoRefresh] = useState(false);
  const refreshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Style constants
  const ic = 'dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900 mt-1';
  const sc = 'dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white';
  const si = 'dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100';
  const rb = 'dark:border-slate-800 border-slate-200';
  const rh = 'dark:hover:bg-slate-800/50 hover:bg-slate-50';
  const th = 'text-xs dark:text-slate-500 text-slate-400';
  const tc = 'py-3 text-xs';

  // ==================== DATA FETCHING ====================

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      limit: '100',
      ...(search && { search }),
      ...(typeFilter && { type: typeFilter }),
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
    });
    try {
      const res = await fetch(`/api/movements?${params}`);
      const data = await res.json();
      if (!res.ok) { setMovements([]); return; }
      const items: Movement[] = Array.isArray(data.items) ? data.items : [];
      setMovements(items);
      // Compute stats from items
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const startOfWeekISO = startOfWeek.toISOString();
      setStats({
        today: items.filter(m => m.createdAt >= startOfDay).length,
        week: items.filter(m => m.createdAt >= startOfWeekISO).length,
        receive: items.filter(m => m.type === 'RECEIVE').length,
        dispatch: items.filter(m => m.type === 'DISPATCH').length,
      });
    } catch {
      toast.error(t('movements.toast.fetchFailed'));
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, dateFrom, dateTo, t]);

  const fetchLookups = useCallback(async () => {
    try {
      const [cr, lr, er] = await Promise.all([
        fetch('/api/cargo?limit=200'),
        fetch('/api/locations?limit=100'),
        fetch('/api/equipment?limit=100&status=AVAILABLE'),
      ]);
      setCargoItems((await cr.json()).items || []);
      setLocations((await lr.json()).items || []);
      setEquipment((await er.json()).items || []);
    } catch { /* silent */ }
  }, []);

  const fetchDetailData = useCallback(async (movement: Movement) => {
    setDetailLoading(true);
    try {
      const cargoRes = await fetch(`/api/cargo/${movement.cargoItemId}`);
      if (cargoRes.ok) {
        const cargoData = await cargoRes.json();
        setDetailCargo(cargoData);
      }
      // Fetch all movements for this cargo item to build timeline
      const movRes = await fetch(`/api/movements?limit=100&search=${encodeURIComponent(movement.cargoCode)}`);
      if (movRes.ok) {
        const movData = await movRes.json();
        const cargoMovements = (movData.items || []).filter((m: Movement) => m.cargoItemId === movement.cargoItemId);
        cargoMovements.sort((a: Movement, b: Movement) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setCargoTimeline(cargoMovements);
      }
    } catch { /* silent */ }
    finally { setDetailLoading(false); }
  }, []);

  // ==================== EFFECTS ====================

  useEffect(() => { fetchMovements(); }, [fetchMovements]);
  useEffect(() => { fetchLookups(); }, [fetchLookups]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      refreshRef.current = setInterval(fetchMovements, 10000);
    } else {
      if (refreshRef.current) clearInterval(refreshRef.current);
    }
    return () => { if (refreshRef.current) clearInterval(refreshRef.current); };
  }, [autoRefresh, fetchMovements]);

  // ==================== HANDLERS ====================

  const handleRowClick = (movement: Movement) => {
    setSelectedMovement(movement);
    fetchDetailData(movement);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargoItemId: form.cargoItemId, type: form.type,
          fromLocationId: form.fromLocationId !== 'NONE' ? form.fromLocationId : null,
          toLocationId: form.toLocationId !== 'NONE' ? form.toLocationId : null,
          equipmentUsed: form.equipmentUsed !== 'NONE' ? form.equipmentUsed : null,
          liftMethod: form.liftMethod || null,
          operatorName: form.operatorName || null,
          actualWeight: form.actualWeight ? parseFloat(form.actualWeight) : null,
          remarks: form.remarks || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }
      toast.success(t('movements.toast.recorded'));
      setShowAdd(false);
      setForm(emptyForm);
      fetchMovements();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('movements.toast.recordFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  // ==================== RENDER: STATS BAR ====================

  const renderStatsBar = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard icon={Activity} label={`${t('movements.stats.today')} — ${t('movements.stats.movements')}`} value={stats.today} accent="bg-amber-500/10 text-amber-500" />
      <StatCard icon={Clock} label={`${t('movements.stats.thisWeek')} — ${t('movements.stats.movements')}`} value={stats.week} accent="bg-cyan-500/10 text-cyan-500" />
      <StatCard icon={Download} label={t('movements.stats.received')} value={stats.receive} accent="bg-emerald-500/10 text-emerald-500" />
      <StatCard icon={Truck} label={t('movements.stats.dispatched')} value={stats.dispatch} accent="bg-orange-500/10 text-orange-500" />
    </div>
  );

  // ==================== RENDER: PATH VISUALIZATION ====================

  const renderPathVisualization = (m: Movement) => {
    const from = m.fromLocation;
    const to = m.toLocation;
    return (
      <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-4">{t('detail.movement.path')}</h3>
        <div className="flex items-center gap-3 justify-center">
          {/* From card (right side in RTL, displayed first in code) */}
          <div className="flex-1 max-w-[180px]">
            <div className={`rounded-lg border p-3 transition-all duration-200 ${from
              ? 'dark:border-emerald-500/30 border-emerald-200 dark:bg-emerald-500/5 bg-emerald-50/50'
              : 'dark:border-slate-700 border-slate-200 dark:bg-slate-800/50 bg-white'
            }`}>
              <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400 mb-1.5">{t('detail.movement.fromLocation')}</p>
              {from ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-emerald-500/10">
                    <LocationTypeIcon type={from.type} className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold dark:text-slate-100 text-slate-900 truncate font-mono">{from.code}</p>
                    <p className="text-[10px] dark:text-slate-500 text-slate-400 truncate">{from.name}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs dark:text-slate-600 text-slate-400 italic">{t('detail.movement.noLocation')}</p>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
            <div className="flex items-center">
              <div className="h-px w-6 bg-gradient-to-r from-emerald-500/50 to-orange-500/50" />
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center animate-pulse">
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </div>
              <div className="h-px w-6 bg-gradient-to-r from-orange-500/50 to-emerald-500/50" />
            </div>
            <TypeIcon type={m.type} className="h-3.5 w-3.5 text-amber-500" />
          </div>

          {/* To card */}
          <div className="flex-1 max-w-[180px]">
            <div className={`rounded-lg border p-3 transition-all duration-200 ${to
              ? 'dark:border-orange-500/30 border-orange-200 dark:bg-orange-500/5 bg-orange-50/50'
              : 'dark:border-slate-700 border-slate-200 dark:bg-slate-800/50 bg-white'
            }`}>
              <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400 mb-1.5">{t('detail.movement.toLocation')}</p>
              {to ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-500/10">
                    <LocationTypeIcon type={to.type} className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold dark:text-slate-100 text-slate-900 truncate font-mono">{to.code}</p>
                    <p className="text-[10px] dark:text-slate-500 text-slate-400 truncate">{to.name}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs dark:text-slate-600 text-slate-400 italic">{t('detail.movement.noLocation')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER: CARGO INFO CARD ====================

  const renderCargoInfoCard = (m: Movement) => {
    const c = detailCargo;
    if (!c) return (
      <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3">{t('detail.movement.cargoInfo')}</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-amber-500" />
            <span className="font-mono text-sm font-medium text-amber-500">{m.cargoCode}</span>
          </div>
          <Skeleton className="h-4 w-full dark:bg-slate-800 bg-slate-100" />
          <Skeleton className="h-4 w-3/4 dark:bg-slate-800 bg-slate-100" />
        </div>
      </div>
    );
    return (
      <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3">{t('detail.movement.cargoInfo')}</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-500/10">
                <Package className="h-4 w-4 text-amber-500" />
              </div>
              <span className="font-mono text-sm font-semibold text-amber-500 dark:text-amber-400">{c.cargoCode}</span>
            </div>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20">{translateStatus(c.status)}</Badge>
          </div>
          <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed">{c.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-6 w-6 rounded bg-cyan-500/10">
                <Weight className="h-3.5 w-3.5 text-cyan-500" />
              </div>
              <div>
                <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.cargoWeight')}</p>
                <p className="text-xs font-semibold dark:text-slate-200 text-slate-800">{c.weight.toLocaleString()} {t('detail.cargo.weightUnit')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-6 w-6 rounded bg-purple-500/10">
                <Tag className="h-3.5 w-3.5 text-purple-500" />
              </div>
              <div>
                <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.cargoCategory')}</p>
                <p className="text-xs font-semibold dark:text-slate-200 text-slate-800">{translateCategory(c.liftCategory as LiftCategory)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER: MOVEMENT DETAILS CARD ====================

  const renderMovementDetailsCard = (m: Movement) => (
    <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3">{t('detail.movement.movementDetails')}</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-500/10">
            <User className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.operator')}</p>
            <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{m.operatorName || '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-500/10">
            <Wrench className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.equipment')}</p>
            <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{m.equipmentUsed || '—'}</p>
          </div>
        </div>
        {m.actualWeight && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-cyan-500/10">
              <Weight className="h-4 w-4 text-cyan-500" />
            </div>
            <div>
              <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.actualWeight')}</p>
              <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{m.actualWeight.toLocaleString()} {t('detail.cargo.weightUnit')}</p>
            </div>
          </div>
        )}
        {m.liftMethod && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-purple-500/10">
              <ArrowLeftRight className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.liftMethod')}</p>
              <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{m.liftMethod}</p>
            </div>
          </div>
        )}
        {m.remarks && (
          <div className="mt-2 pt-3 border-t dark:border-slate-800 border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <FileText className="h-3.5 w-3.5 dark:text-slate-500 text-slate-400" />
              <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('detail.movement.remarks')}</p>
            </div>
            <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-2.5">{m.remarks}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ==================== RENDER: FULL TIMELINE ====================

  const renderFullTimeline = () => {
    if (!Array.isArray(cargoTimeline) || cargoTimeline.length === 0) return (
      <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-3">{t('detail.movement.fullTimeline')}</h3>
        <p className="text-sm dark:text-slate-500 text-slate-400 text-center py-6">{t('detail.movement.noTimeline')}</p>
      </div>
    );
    return (
      <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 mb-4">{t('detail.movement.fullTimeline')}</h3>
        <div className="relative space-y-0 max-h-72 overflow-y-auto">
          {cargoTimeline.map((tm, idx) => {
            const isCurrent = selectedMovement && tm.id === selectedMovement.id;
            return (
              <div key={tm.id} className="flex gap-3 relative">
                {/* Line + dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`h-3 w-3 rounded-full border-2 transition-all duration-200 ${
                    isCurrent
                      ? 'bg-amber-500 border-amber-500 ring-4 ring-amber-500/20'
                      : typeDotColors[tm.type] + ' border-transparent'
                  }`} />
                  {Array.isArray(cargoTimeline) && idx < cargoTimeline.length - 1 && (
                    <div className={`w-0.5 h-full min-h-[24px] ${
                      isCurrent ? 'bg-amber-500/30' : 'dark:bg-slate-800 bg-slate-200'
                    }`} />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-4 flex-1 min-w-0 ${isCurrent ? '' : 'opacity-60'}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`text-[10px] ${typeStyles[tm.type]}`}>
                      <TypeIcon type={tm.type} className="h-3 w-3 mr-1" />
                      {translateMovementType(tm.type)}
                    </Badge>
                    <span className="text-[10px] dark:text-slate-500 text-slate-400">{relativeTime(tm.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs dark:text-slate-400 text-slate-500">
                    {tm.fromLocation && <span className="font-mono">{tm.fromLocation.code}</span>}
                    {tm.fromLocation && tm.toLocation && <ChevronLeft className="h-3 w-3" />}
                    {tm.toLocation && <span className="font-mono">{tm.toLocation.code}</span>}
                  </div>
                  {tm.operatorName && (
                    <p className="text-[10px] dark:text-slate-600 text-slate-400 mt-0.5">{tm.operatorName}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==================== RENDER: DETAIL SHEET ====================

  const renderDetailSheet = () => {
    if (!selectedMovement) return null;
    const m = selectedMovement;
    return (
      <Sheet open={!!selectedMovement} onOpenChange={(open) => { if (!open) { setSelectedMovement(null); setDetailCargo(null); setCargoTimeline([]); } }}>
        <SheetContent side="left" className="dark:border-slate-800 bg-slate-950 w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="space-y-4 pb-4">
            {/* Movement ref + type badge + live indicator */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <SheetTitle className="text-2xl font-bold font-mono text-amber-500 dark:text-amber-400">{m.movementRef}</SheetTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`text-xs ${typeStyles[m.type]}`}>
                    <TypeIcon type={m.type} className="h-3.5 w-3.5 mr-1.5" />
                    {translateMovementType(m.type)}
                  </Badge>
                  <span className="text-xs dark:text-slate-500 text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />{relativeTime(m.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-500">{t('movements.live')}</span>
              </div>
            </div>
          </SheetHeader>

          <Separator className="dark:bg-slate-800 bg-slate-200" />

          <div className="mt-5 space-y-4">
            {detailLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-28 w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />
                <Skeleton className="h-32 w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />
                <Skeleton className="h-24 w-full dark:bg-slate-800 bg-slate-100 rounded-xl" />
              </div>
            ) : (
              <>
                {renderPathVisualization(m)}
                {renderCargoInfoCard(m)}
                {renderMovementDetailsCard(m)}
                {renderFullTimeline()}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  // ==================== RENDER: TABLE ROW ====================

  const renderTableRow = (m: Movement) => {
    const isActive = selectedMovement?.id === m.id;
    return (
      <TableRow
        key={m.id}
        className={`${rb} ${rh} cursor-pointer transition-all duration-200 ${isActive ? 'bg-amber-500/5 dark:bg-amber-500/10' : ''}`}
        onClick={() => handleRowClick(m)}
      >
        <TableCell className={`${tc} font-mono text-amber-500/80 dark:text-amber-400 group-hover:text-amber-500 transition-colors`}>{m.movementRef}</TableCell>
        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden sm:table-cell whitespace-nowrap`}>
          <span title={new Date(m.createdAt).toLocaleString()}>{relativeTime(m.createdAt)}</span>
        </TableCell>
        <TableCell className={`${tc} font-mono dark:text-slate-300 text-slate-700 group-hover:text-amber-500 transition-colors`}>{m.cargoCode}</TableCell>
        <TableCell className={tc}>
          <Badge variant="outline" className={`text-[10px] ${typeStyles[m.type]}`}>
            <TypeIcon type={m.type} className="h-3 w-3 mr-1" />
            {translateMovementType(m.type)}
          </Badge>
        </TableCell>
        <TableCell className={`${tc} hidden md:table-cell`}>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${m.fromLocation ? 'bg-emerald-500' : 'dark:bg-slate-700 bg-slate-300'}`} />
            <span className="font-mono dark:text-slate-400 text-slate-500 text-[11px]">{m.fromLocation?.code || '—'}</span>
          </div>
        </TableCell>
        <TableCell className={`${tc} hidden md:table-cell`}>
          <div className="flex items-center gap-1">
            <span className="text-[10px] dark:text-slate-600 text-slate-400">→</span>
            <span className={`h-2 w-2 rounded-full ${m.toLocation ? 'bg-orange-500' : 'dark:bg-slate-700 bg-slate-300'}`} />
            <span className="font-mono dark:text-slate-400 text-slate-500 text-[11px]">{m.toLocation?.code || '—'}</span>
          </div>
        </TableCell>
        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden lg:table-cell`}>{m.equipmentUsed || '—'}</TableCell>
        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden xl:table-cell`}>{m.operatorName || '—'}</TableCell>
        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden lg:table-cell`}>{m.actualWeight ? `${m.actualWeight.toLocaleString()} kg` : '—'}</TableCell>
        <TableCell className={`${tc} dark:text-slate-500 text-slate-400 hidden xl:table-cell max-w-[120px] truncate`}>{m.remarks || '—'}</TableCell>
        <TableCell className={`${tc} w-10`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-amber-400 hover:text-amber-500 transition-colors"
            onClick={(e) => { e.stopPropagation(); handleRowClick(m); }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // ==================== MAIN RENDER ====================

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-500">{t('movements.live')}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('movements.title')}</h1>
            <p className="text-sm dark:text-slate-500 text-slate-400 mt-0.5">{t('movements.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              className="data-[state=checked]:bg-amber-500"
            />
            <span className="text-xs dark:text-slate-400 text-slate-500">{t('movements.autoRefresh')}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchMovements}
            className="dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => { setForm(emptyForm); setShowAdd(true); }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium transition-all duration-200 hover:shadow-md"
          >
            <Plus className="h-4 w-4 ml-2" />
            {t('movements.recordMovement')}
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      {renderStatsBar()}

      {/* Filters */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 dark:text-slate-500 text-slate-400" />
              <Input
                placeholder={t('movements.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 pr-9 dark:text-slate-200 text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400"
              />
            </div>
            <Select value={typeFilter || 'ALL'} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-300 text-slate-600">
                <SelectValue placeholder={t('common.allTypes')} />
              </SelectTrigger>
              <SelectContent className={sc}>
                <SelectItem value="ALL" className={si}>{t('common.allTypes')}</SelectItem>
                {movementTypes.map((mt) => (
                  <SelectItem key={mt} value={mt} className={si}>
                    <span className="flex items-center gap-1.5"><TypeIcon type={mt} />{translateMovementType(mt)}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <Label className="text-[10px] dark:text-slate-500 text-slate-400 absolute -top-2 right-2 bg-slate-950 dark:bg-slate-900 px-1">{t('movements.dateFrom')}</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900"
              />
            </div>
            <div className="relative">
              <Label className="text-[10px] dark:text-slate-500 text-slate-400 absolute -top-2 right-2 bg-slate-950 dark:bg-slate-900 px-1">{t('movements.dateTo')}</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => { setSearch(''); setTypeFilter(''); setDateFrom(''); setDateTo(''); }}
              className="dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100 dark:hover:text-slate-300 hover:text-slate-700 transition-all duration-200"
            >
              <Filter className="h-4 w-4 ml-2" />{t('common.clear')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className={`${rb} hover:bg-transparent`}>
                  <TableHead className={th}>{t('movements.table.ref')}</TableHead>
                  <TableHead className={`${th} hidden sm:table-cell`}>{t('movements.table.dateTime')}</TableHead>
                  <TableHead className={th}>{t('movements.table.cargo')}</TableHead>
                  <TableHead className={th}>{t('movements.table.type')}</TableHead>
                  <TableHead className={`${th} hidden md:table-cell`}>{t('movements.table.from')} → {t('movements.table.to')}</TableHead>
                  <TableHead className={`${th} hidden lg:table-cell`}>{t('movements.table.equipment')}</TableHead>
                  <TableHead className={`${th} hidden xl:table-cell`}>{t('movements.table.operator')}</TableHead>
                  <TableHead className={`${th} hidden lg:table-cell`}>{t('movements.table.weight')}</TableHead>
                  <TableHead className={`${th} w-10`}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TableRow key={i} className={`${rb} hover:bg-transparent`}>
                        {Array.from({ length: 9 }).map((_, j) => (
                          <TableCell key={j} className="py-3">
                            <Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-100" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : !Array.isArray(movements) || movements.length === 0
                    ? (
                      <TableRow className={`${rb} hover:bg-transparent`}>
                        <TableCell colSpan={9} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <ArrowLeftRight className="h-8 w-8 dark:text-slate-700 text-slate-300" />
                            <p className="dark:text-slate-500 text-slate-400">{t('movements.noMovementsFound')}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                    : movements.map(renderTableRow)
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      {renderDetailSheet()}

      {/* Add Movement Dialog */}
      <Dialog open={showAdd} onOpenChange={(open) => { if (!open) { setShowAdd(false); setForm(emptyForm); } }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-h-[90vh] overflow-y-auto max-w-lg">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100 text-slate-900">{t('movements.recordNewMovement')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.cargoItem')}</Label>
              <Select value={form.cargoItemId} onValueChange={(v) => setForm({ ...form, cargoItemId: v })}>
                <SelectTrigger className={ic}>
                  <SelectValue placeholder={t('movements.form.cargoPlaceholder')} />
                </SelectTrigger>
                <SelectContent className={`${sc} max-h-60`}>
                  {cargoItems.map((c) => (
                    <SelectItem key={c.id} value={c.id} className={si}>
                      <span className="font-mono text-amber-400">{c.cargoCode}</span> — {c.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.movementType')}</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className={ic}>
                    <SelectValue placeholder={t('common.select')} />
                  </SelectTrigger>
                  <SelectContent className={sc}>
                    {movementTypes.map((mt) => (
                      <SelectItem key={mt} value={mt} className={si}>
                        <span className="flex items-center gap-1.5"><TypeIcon type={mt} />{translateMovementType(mt)}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.liftMethod')}</Label>
                <Input
                  value={form.liftMethod}
                  onChange={(e) => setForm({ ...form, liftMethod: e.target.value })}
                  className={ic}
                  placeholder={t('movements.form.liftMethodPlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.fromLocation')}</Label>
                <Select value={form.fromLocationId} onValueChange={(v) => setForm({ ...form, fromLocationId: v })}>
                  <SelectTrigger className={ic}>
                    <SelectValue placeholder={t('common.select')} />
                  </SelectTrigger>
                  <SelectContent className={sc}>
                    <SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l.id} value={l.id} className={si}>{l.code} — {l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.toLocation')}</Label>
                <Select value={form.toLocationId} onValueChange={(v) => setForm({ ...form, toLocationId: v })}>
                  <SelectTrigger className={ic}>
                    <SelectValue placeholder={t('common.select')} />
                  </SelectTrigger>
                  <SelectContent className={sc}>
                    <SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l.id} value={l.id} className={si}>{l.code} — {l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.equipmentUsed')}</Label>
                <Select value={form.equipmentUsed} onValueChange={(v) => setForm({ ...form, equipmentUsed: v })}>
                  <SelectTrigger className={ic}>
                    <SelectValue placeholder={t('common.select')} />
                  </SelectTrigger>
                  <SelectContent className={sc}>
                    <SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>
                    {equipment.map((eq) => (
                      <SelectItem key={eq.id} value={eq.equipmentCode} className={si}>{eq.equipmentCode} — {eq.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.operatorName')}</Label>
                <Input
                  value={form.operatorName}
                  onChange={(e) => setForm({ ...form, operatorName: e.target.value })}
                  className={ic}
                />
              </div>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.actualWeight')}</Label>
              <Input
                type="number"
                value={form.actualWeight}
                onChange={(e) => setForm({ ...form, actualWeight: e.target.value })}
                className={ic}
              />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('movements.form.remarks')}</Label>
              <Textarea
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                className={ic + ' min-h-[60px]'}
                placeholder={t('movements.form.remarksPlaceholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => { setShowAdd(false); setForm(emptyForm); }}
              className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !form.cargoItemId || !form.type}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all duration-200 hover:shadow-md"
            >
              {submitting ? t('common.recording') : t('movements.recordMovement')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
