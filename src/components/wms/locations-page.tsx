'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, MapPin, Layers, Maximize, Weight, Package,
  LayoutGrid, LayoutList, Search, ArrowRightLeft, PackagePlus, Printer,
  Eye, X, MapPinned, Gauge,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useTranslation, translateLocationType, translateStatus } from '@/lib/translations';
import { cn } from '@/lib/utils';
import type { Location, LocationType, CargoItem } from '@/types/wms';

// ==================== CONSTANTS ====================

const typeStyles: Record<LocationType, string> = {
  YARD: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  WAREHOUSE: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  OPEN_AREA: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  STAGING: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  BERTH: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
};

const cargoStatusStyles: Record<string, string> = {
  IN_YARD: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  IN_TRANSIT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  DISPATCHED: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  RECEIVED: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  IN_WAREHOUSE: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  DELIVERED: 'bg-slate-400/10 text-slate-500 dark:text-slate-500 border-slate-400/20',
};

const locationTypes: LocationType[] = ['YARD', 'WAREHOUSE', 'OPEN_AREA', 'STAGING', 'BERTH'];

const emptyForm = {
  code: '', name: '', type: '' as string, zone: '',
  maxWeight: '', maxDimension: '', area: '', isActive: true,
};

interface LocationListResponse { items: Location[]; total: number; }

type ViewMode = 'grid' | 'table';

// ==================== HELPERS ====================

function loadPct(loc: Location) {
  if (!loc.maxWeight || loc.maxWeight === 0) return 0;
  return Math.min(100, Math.round((loc.currentLoad / loc.maxWeight) * 100));
}

function gaugeColor(pct: number) {
  if (pct >= 80) return { bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400', ring: 'stroke-red-500' };
  if (pct >= 50) return { bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', ring: 'stroke-amber-500' };
  return { bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', ring: 'stroke-emerald-500' };
}

function capacityBarColor(pct: number) {
  if (pct >= 80) return 'bg-red-500';
  if (pct >= 50) return 'bg-amber-500';
  return 'bg-emerald-500';
}

// ==================== SUB-COMPONENTS ====================

function ProfileField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 dark:bg-amber-500/10">
        <Icon className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{value || '—'}</p>
      </div>
    </div>
  );
}

function OccupancyGauge({ percentage }: { percentage: number }) {
  const colors = gaugeColor(percentage);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-slate-200 dark:stroke-slate-700" />
        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" strokeLinecap="round"
          className={cn('transition-all duration-700', colors.ring)}
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn('text-2xl font-bold', colors.text)}>{percentage}%</span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400">{percentage >= 80 ? 'Critical' : percentage >= 50 ? 'Warning' : 'Normal'}</span>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/30 border-amber-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/30 border-cyan-500/20',
  };
  return (
    <button
      onClick={() => toast.info(label + ' — ' + (typeof window !== 'undefined' ? 'Coming soon' : ''))}
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200',
        colorMap[color] || colorMap.amber
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function CargoCard({ cargo }: { cargo: CargoItem }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-3.5 transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 truncate">{cargo.cargoCode}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{cargo.description}</p>
        </div>
        <Badge variant="outline" className={cn('shrink-0 text-[10px]', cargoStatusStyles[cargo.status] || 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700')}>
          {translateStatus(cargo.status)}
        </Badge>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5">
        <Weight className="h-3 w-3 text-slate-400 dark:text-slate-500" />
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {cargo.weight.toLocaleString()} kg
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);
  const [deleting, setDeleting] = useState<Location | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [detailCargo, setDetailCargo] = useState<CargoItem[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const { t } = useTranslation();

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100', ...(typeFilter && { type: typeFilter }) });
    try {
      const res = await fetch('/api/locations?' + params);
      const data: LocationListResponse = await res.json();
      if (!res.ok) { setLocations([]); return; }
      setLocations(data.items || []);
    } catch { toast.error(t('locations.toast.fetchFailed')); } finally { setLoading(false); }
  }, [typeFilter, t]);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  const filteredLocations = locations.filter((loc) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return loc.code.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || (loc.zone && loc.zone.toLowerCase().includes(q));
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, unknown> = {
      code: form.code, name: form.name, type: form.type, zone: form.zone || null,
      maxWeight: form.maxWeight ? parseFloat(form.maxWeight) : null,
      maxDimension: form.maxDimension || null, area: form.area ? parseFloat(form.area) : null, isActive: form.isActive,
    };
    try {
      const url = editing ? '/api/locations/' + editing.id : '/api/locations';
      const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(editing ? t('locations.toast.updated') : t('locations.toast.created'));
      setShowAdd(false); setEditing(null); setForm(emptyForm); fetchLocations();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed'); } finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await fetch('/api/locations/' + deleting.id, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('locations.toast.deleted')); setDeleting(null); fetchLocations();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('locations.toast.deleteFailed')); }
  };

  const handleToggleActive = async (loc: Location) => {
    try {
      const res = await fetch('/api/locations/' + loc.id, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !loc.isActive }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(loc.isActive ? t('common.disabled') : t('common.enabled'));
      fetchLocations();
      if (detailLocation?.id === loc.id) {
        setDetailLocation({ ...loc, isActive: !loc.isActive });
      }
    } catch { toast.error('Failed to update status'); }
  };

  const openEdit = (loc: Location) => {
    setEditing(loc);
    setForm({ code: loc.code, name: loc.name, type: loc.type, zone: loc.zone || '', maxWeight: loc.maxWeight ? String(loc.maxWeight) : '', maxDimension: loc.maxDimension || '', area: loc.area ? String(loc.area) : '', isActive: loc.isActive });
  };

  const openDetail = async (loc: Location) => {
    setDetailLocation(loc); setDetailOpen(true); setDetailLoading(true);
    try {
      const res = await fetch('/api/cargo?locationId=' + loc.id + '&limit=200');
      const data = await res.json();
      setDetailCargo(data.items || []);
    } catch { setDetailCargo([]); } finally { setDetailLoading(false); }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === filteredLocations.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredLocations.map((l) => l.id)));
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(Array.from(selectedRows).map((id) => fetch('/api/locations/' + id, { method: 'DELETE' })));
      toast.success(t('locations.toast.deleted'));
      setSelectedRows(new Set());
      fetchLocations();
    } catch { toast.error(t('locations.toast.deleteFailed')); }
  };

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('locations.title')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('locations.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium transition-all duration-200 hover:shadow-md">
          <Plus className="h-4 w-4 ml-2" /> {t('locations.addLocation')}
        </Button>
      </div>

      {/* ===== Filters & Controls ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {locationTypes.map((lt) => (
            <Button key={lt} variant={typeFilter === lt ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(typeFilter === lt ? '' : lt)}
              className={cn(
                'transition-all duration-200',
                typeFilter === lt
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300'
              )}>
              {translateLocationType(lt)}
            </Button>
          ))}
          <Button variant={typeFilter === '' ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter('')}
            className={cn(
              'transition-all duration-200',
              typeFilter === ''
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300'
            )}>
            {t('locations.allTypes')}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute start-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <Input
              placeholder={t('locations.searchPlaceholder')}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 ps-8 text-sm"
            />
          </div>
          {/* View Toggle */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
                viewMode === 'table'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              )}
            >
              <LayoutList className="h-3.5 w-3.5" /> {t('locations.tableView')}
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
                viewMode === 'grid'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> {t('locations.gridView')}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Bulk Actions Bar ===== */}
      {selectedRows.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/5 px-4 py-2.5">
          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {selectedRows.size} {t('common.selected')}
          </span>
          <Button variant="outline" size="sm" onClick={handleBulkDelete}
            className="border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200">
            <Trash2 className="h-3.5 w-3.5 ml-1.5" /> {t('common.delete')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            {t('common.clear')}
          </Button>
        </div>
      )}

      {/* ===== Table View ===== */}
      {viewMode === 'table' && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full bg-slate-100 dark:bg-slate-800 rounded-lg" />
              ))}
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
              <MapPin className="h-10 w-10 mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">{t('detail.location.emptyState')}</p>
            </div>
          ) : (
            <div className="max-h-[520px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="w-10 ps-4">
                      <Checkbox checked={selectedRows.size === filteredLocations.length && filteredLocations.length > 0} onCheckedChange={toggleSelectAll} />
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('locations.table.code')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('locations.table.name')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('locations.table.type')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">{t('locations.table.zone')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">{t('locations.table.capacity')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">{t('locations.table.area')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('locations.table.cargoCount')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('locations.table.status')}</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-end pe-4">{t('locations.table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((loc) => {
                    const pct = loadPct(loc);
                    const isSelected = selectedRows.has(loc.id);
                    const isActiveDetail = detailLocation?.id === loc.id;
                    return (
                      <TableRow
                        key={loc.id}
                        className={cn(
                          'border-slate-200 dark:border-slate-800 cursor-pointer transition-all duration-200',
                          isSelected && 'bg-amber-500/5 dark:bg-amber-500/5',
                          isActiveDetail && 'bg-amber-500/10 dark:bg-amber-500/10',
                          !isSelected && !isActiveDetail && 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                          !loc.isActive && 'opacity-50'
                        )}
                        onClick={() => openDetail(loc)}
                      >
                        <TableCell className="ps-4" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={isSelected} onCheckedChange={() => toggleSelectRow(loc.id)} />
                        </TableCell>
                        <TableCell>
                          <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 transition-colors duration-200">{loc.code}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{loc.name}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('text-[10px]', typeStyles[loc.type])}>{translateLocationType(loc.type)}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{loc.zone || '—'}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {loc.maxWeight ? (
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div className={cn('h-full rounded-full transition-all duration-500', capacityBarColor(pct))} style={{ width: pct + '%' }} />
                              </div>
                              <span className={cn('text-[11px] font-medium', pct >= 80 ? 'text-red-600 dark:text-red-400' : pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400')}>{pct}%</span>
                            </div>
                          ) : <span className="text-xs text-slate-400 dark:text-slate-500">—</span>}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs text-slate-500 dark:text-slate-400">{loc.area ? loc.area + ' m²' : '—'}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn('text-[10px] font-medium',
                            loc.currentLoad > 0 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400')}>
                            {loc.currentLoad}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch checked={loc.isActive} onCheckedChange={() => handleToggleActive(loc)} className="scale-75" onClick={(e) => e.stopPropagation()} />
                        </TableCell>
                        <TableCell className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 dark:text-slate-500 hover:text-amber-500 transition-colors duration-200" onClick={() => openDetail(loc)}><Eye className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 dark:text-slate-500 hover:text-amber-500 transition-colors duration-200" onClick={() => openEdit(loc)}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors duration-200" onClick={() => setDeleting(loc)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* ===== Grid View ===== */}
      {viewMode === 'grid' && (
        <>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-5 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
                    <Skeleton className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded" />
                    <Skeleton className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
              <MapPin className="h-10 w-10 mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">{t('detail.location.emptyState')}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredLocations.map((loc) => {
                const pct = loadPct(loc);
                return (
                  <Card
                    key={loc.id}
                    className={cn(
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700',
                      !loc.isActive && 'opacity-50'
                    )}
                    onClick={() => openDetail(loc)}
                  >
                    <CardContent className="p-5 space-y-3" onClick={(e) => { if ((e.target as HTMLElement).closest('button')) return; }}>
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{loc.name}</h3>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{loc.code}</p>
                        </div>
                        <Badge variant="outline" className={cn('shrink-0 text-[10px]', typeStyles[loc.type])}>{translateLocationType(loc.type)}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                        {loc.zone && <div className="flex items-center gap-1.5"><Layers className="h-3 w-3 text-slate-400 dark:text-slate-500" />{loc.zone}</div>}
                        {loc.maxWeight && <div className="flex items-center gap-1.5"><Weight className="h-3 w-3 text-slate-400 dark:text-slate-500" />{loc.maxWeight}{t('common.tonnes')}</div>}
                        {loc.area && <div className="flex items-center gap-1.5"><Maximize className="h-3 w-3 text-slate-400 dark:text-slate-500" />{loc.area}m²</div>}
                        <div className="flex items-center gap-1.5">
                          <Package className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                          <span className={cn(loc.currentLoad > 0 && 'font-medium text-amber-600 dark:text-amber-400')}>{loc.currentLoad}</span> {t('common.items')}
                        </div>
                      </div>

                      {loc.maxWeight && loc.maxWeight > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 dark:text-slate-400">{t('common.load')}</span>
                            <span className={cn('font-medium', pct >= 80 ? 'text-red-600 dark:text-red-400' : pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400')}>{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className={cn('h-full rounded-full transition-all duration-500', capacityBarColor(pct))} style={{ width: pct + '%' }} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <div className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-200', loc.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600')} />
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{loc.isActive ? t('common.active') : t('common.inactive')}</span>
                        </div>
                        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 dark:text-slate-500 hover:text-amber-500 transition-colors duration-200" onClick={() => openEdit(loc)}><Pencil className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors duration-200" onClick={() => setDeleting(loc)}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ===== Location Detail Sheet ===== */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent side="left" className="w-full sm:max-w-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-0 overflow-hidden flex flex-col">
          {detailLocation && (() => {
            const pct = loadPct(detailLocation);
            const colors = gaugeColor(pct);
            return (
              <>
                {/* Sheet Header */}
                <SheetHeader className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <SheetTitle className="text-base font-bold text-slate-900 dark:text-slate-100">{detailLocation.name}</SheetTitle>
                      <p className="text-sm font-mono text-amber-600 dark:text-amber-400 mt-0.5">{detailLocation.code}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={cn('text-[10px]', typeStyles[detailLocation.type])}>{translateLocationType(detailLocation.type)}</Badge>
                      <Switch checked={detailLocation.isActive} onCheckedChange={() => handleToggleActive(detailLocation)} />
                    </div>
                  </div>
                </SheetHeader>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-5">

                    {/* ===== Capacity Overview Card ===== */}
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">{t('detail.location.capacity')}</h3>
                      <div className="flex items-center gap-6">
                        <OccupancyGauge percentage={pct} />
                        <div className="flex-1 space-y-3">
                          <ProfileField icon={Weight} label={t('detail.location.maxWeight')} value={detailLocation.maxWeight ? `${detailLocation.maxWeight} ${t('common.tonnes')}` : null} />
                          <ProfileField icon={Maximize} label={t('detail.location.area')} value={detailLocation.area ? `${detailLocation.area} m²` : null} />
                          <ProfileField icon={Layers} label={t('detail.location.zone')} value={detailLocation.zone} />
                          <ProfileField icon={Package} label={t('detail.location.currentLoad')} value={detailLocation.maxWeight ? `${detailLocation.currentLoad.toLocaleString()} ${t('detail.location.usedOf')} ${detailLocation.maxWeight.toLocaleString()} ${t('common.tonnes')}` : `${detailLocation.currentLoad} ${t('common.items')}`} />
                        </div>
                      </div>
                      {/* Capacity bar */}
                      {detailLocation.maxWeight && detailLocation.maxWeight > 0 && (
                        <div className="mt-4 space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 dark:text-slate-400">{t('detail.location.occupancyRate')}</span>
                            <span className={cn('font-semibold', colors.text)}>{pct}%</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className={cn('h-full rounded-full transition-all duration-700', colors.bar)} style={{ width: pct + '%' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ===== Cargo Inventory Grid ===== */}
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('detail.location.cargoInventory')}</h3>
                        <Badge variant="secondary" className={cn('text-[10px] font-medium',
                          detailCargo.length > 0 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400')}>
                          {detailCargo.length} {t('common.items')}
                        </Badge>
                      </div>
                      {detailLoading ? (
                        <div className="grid grid-cols-2 gap-3">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full bg-slate-100 dark:bg-slate-800 rounded-lg" />
                          ))}
                        </div>
                      ) : detailCargo.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-400 dark:text-slate-500">
                          <Package className="h-8 w-8 mb-2 text-slate-300 dark:text-slate-600" />
                          <p className="text-xs">{t('detail.location.noCargo')}</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto">
                          {detailCargo.map((c) => (
                            <CargoCard key={c.id} cargo={c} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ===== Map View Placeholder ===== */}
                    <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-8">
                      <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                          <MapPinned className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('detail.location.mapViewComingSoon')}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{t('detail.location.mapView')}</p>
                      </div>
                    </div>

                    {/* ===== Quick Actions ===== */}
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-5">
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">{t('detail.location.quickActions')}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <QuickActionButton icon={PackagePlus} label={t('detail.location.assignCargo')} color="green" />
                        <QuickActionButton icon={ArrowRightLeft} label={t('detail.location.transferAll')} color="amber" />
                        <QuickActionButton icon={Printer} label={t('detail.location.printLabel')} color="cyan" />
                      </div>
                    </div>

                    {/* ===== Edit / Delete Actions ===== */}
                    <Separator className="bg-slate-200 dark:bg-slate-800" />
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200" onClick={() => { openEdit(detailLocation); setDetailOpen(false); }}>
                        <Pencil className="h-4 w-4 ml-2" /> {t('detail.location.editLocation')}
                      </Button>
                      <Button variant="outline" className="flex-1 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200" onClick={() => { setDeleting(detailLocation); setDetailOpen(false); }}>
                        <Trash2 className="h-4 w-4 ml-2" /> {t('detail.location.deleteLocation')}
                      </Button>
                    </div>

                  </div>
                </ScrollArea>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>

      {/* ===== Add/Edit Dialog ===== */}
      <Dialog open={showAdd || !!editing} onOpenChange={(open) => { if (!open) { setShowAdd(false); setEditing(null); setForm(emptyForm); } }}>
        <DialogContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-lg">
          <DialogHeader><DialogTitle className="text-slate-900 dark:text-slate-100">{editing ? t('locations.editLocation') : t('locations.addNewLocation')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.code')}</Label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" />
              </div>
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.name')}</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.type')}</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1"><SelectValue placeholder={t('common.select')} /></SelectTrigger>
                  <SelectContent className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    {locationTypes.map((lt) => (<SelectItem key={lt} value={lt} className="text-slate-900 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-700">{translateLocationType(lt)}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.zone')}</Label>
                <Input value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.maxWeight')}</Label>
                <Input type="number" value={form.maxWeight} onChange={(e) => setForm({ ...form, maxWeight: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" />
              </div>
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.maxDimension')}</Label>
                <Input value={form.maxDimension} onChange={(e) => setForm({ ...form, maxDimension: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" placeholder={t('locations.form.maxDimensionPlaceholder')} />
              </div>
              <div>
                <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.area')}</Label>
                <Input type="number" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
              <Label className="text-slate-500 dark:text-slate-400">{t('locations.form.active')}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm); }} className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">{t('common.cancel')}</Button>
            <Button onClick={handleSubmit} disabled={submitting || !form.code || !form.name || !form.type} className="bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all duration-200 hover:shadow-md">{submitting ? t('common.saving') : editing ? t('common.update') : t('common.create')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== Delete Dialog ===== */}
      <Dialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <DialogContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-w-md">
          <DialogHeader><DialogTitle className="text-slate-900 dark:text-slate-100">{t('common.confirmDelete')}</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('locations.delete.message')} <span className="text-amber-600 dark:text-amber-400 font-medium">{deleting?.code}</span>{t('locations.delete.warning')}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)} className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">{t('common.cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 transition-all duration-200">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
