'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Pencil, Eye, Trash2, ArrowRight, MapPin, Package, Weight, Move, CheckCircle2, Clock, Truck, Warehouse, CircleDot, ChevronLeft, ChevronRight, Loader2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useTranslation, translateStatus, translateCategory, translateCommodity, translateMovementType } from '@/lib/translations';
import type { CargoItem, LiftCategory, CommodityType, CargoStatus, Location, Project, Movement } from '@/types/wms';

const statusStyles: Record<CargoStatus, string> = {
  IN_YARD: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  IN_TRANSIT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  DISPATCHED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  RECEIVED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  IN_WAREHOUSE: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  DELIVERED: 'bg-slate-400/10 text-slate-500 border-slate-400/20',
};

const statusIcons: Record<CargoStatus, React.ElementType> = {
  IN_TRANSIT: Truck,
  RECEIVED: CheckCircle2,
  IN_YARD: MapPin,
  IN_WAREHOUSE: Warehouse,
  DISPATCHED: CircleDot,
  DELIVERED: CheckCircle2,
};

const STATUS_WORKFLOW: Record<CargoStatus, CargoStatus[]> = {
  IN_TRANSIT: ['RECEIVED'],
  RECEIVED: ['IN_YARD', 'IN_WAREHOUSE'],
  IN_YARD: ['IN_WAREHOUSE', 'DISPATCHED'],
  IN_WAREHOUSE: ['IN_YARD', 'DISPATCHED'],
  DISPATCHED: ['DELIVERED'],
  DELIVERED: [],
};

const ALL_STATUSES: CargoStatus[] = ['IN_TRANSIT', 'RECEIVED', 'IN_YARD', 'IN_WAREHOUSE', 'DISPATCHED', 'DELIVERED'];

const categoryStyles: Record<LiftCategory, string> = {
  HEAVY_LIFT: 'bg-red-500/10 text-red-400 border-red-500/20',
  OVERSIZE: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  STANDARD: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PROJECT_CARGO: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const movementTypeStyles: Record<string, string> = {
  RECEIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  MOVE: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  DISPATCH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  INSPECT: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

interface CargoListResponse {
  items: CargoItem[];
  total: number;
  page: number;
  totalPages: number;
}

interface CargoDetail extends CargoItem {
  movements?: Movement[];
}

const emptyForm = {
  description: '', weight: '', length: '', width: '', height: '',
  liftCategory: '' as string, commodityType: '' as string,
  specialHandling: '', clientName: '', poReference: '', blReference: '',
  centerOfGravity: '', liftingPoints: '', projectId: '',
};

export function CargoPage() {
  const [cargo, setCargo] = useState<CargoItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<CargoItem | null>(null);
  const [deleting, setDeleting] = useState<CargoItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Detail sheet state
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailCargo, setDetailCargo] = useState<CargoDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [assigningLocation, setAssigningLocation] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState('');

  const { t } = useTranslation();

  const fetchCargo = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page), limit: '20',
      ...(search && { search }),
      ...(statusFilter && { status: statusFilter }),
      ...(categoryFilter && { liftCategory: categoryFilter }),
      ...(commodityFilter && { commodityType: commodityFilter }),
    });
    try {
      const res = await fetch(`/api/cargo?${params}`);
      const data: CargoListResponse = await res.json();
      if (!res.ok) { setCargo([]); return; }
      setCargo(data.items || []);
      setTotalPages(data.totalPages);
    } catch { toast.error(t('cargo.toast.fetchFailed')); } finally { setLoading(false); }
  }, [page, search, statusFilter, categoryFilter, commodityFilter, t]);

  const fetchLookups = useCallback(async () => {
    try {
      const [locRes, projRes] = await Promise.all([fetch('/api/locations?limit=100'), fetch('/api/projects?limit=100')]);
      const locData = await locRes.json();
      const projData = await projRes.json();
      setLocations(locData.items || []);
      setProjects(projData.items || []);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchCargo(); }, [fetchCargo]);
  useEffect(() => { fetchLookups(); }, [fetchLookups]);
  useEffect(() => { setPage(1); }, [search, statusFilter, categoryFilter, commodityFilter]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, unknown> = {
      description: form.description, weight: parseFloat(form.weight) || 0,
      length: parseFloat(form.length) || 0, width: parseFloat(form.width) || 0, height: parseFloat(form.height) || 0,
      liftCategory: form.liftCategory, commodityType: form.commodityType,
      specialHandling: form.specialHandling || null, clientName: form.clientName || null,
      poReference: form.poReference || null, blReference: form.blReference || null,
      centerOfGravity: form.centerOfGravity || null, liftingPoints: form.liftingPoints ? parseInt(form.liftingPoints) : null,
      projectId: form.projectId && form.projectId !== '_none' ? form.projectId : null,
    };
    try {
      const url = editing ? `/api/cargo/${editing.id}` : '/api/cargo';
      const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(editing ? t('cargo.toast.updated') : t('cargo.toast.created'));
      setShowAdd(false); setEditing(null); setForm(emptyForm); fetchCargo();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('cargo.toast.saveFailed')); } finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await fetch(`/api/cargo/${deleting.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('cargo.toast.deleted')); setDeleting(null); fetchCargo();
    } catch { toast.error(t('cargo.toast.deleteFailed')); }
  };

  const openEdit = (item: CargoItem) => {
    setEditing(item);
    setForm({
      description: item.description, weight: String(item.weight), length: String(item.length),
      width: String(item.width), height: String(item.height), liftCategory: item.liftCategory,
      commodityType: item.commodityType, specialHandling: item.specialHandling || '',
      clientName: item.clientName || '', poReference: item.poReference || '', blReference: item.blReference || '',
      centerOfGravity: item.centerOfGravity || '', liftingPoints: item.liftingPoints ? String(item.liftingPoints) : '',
      projectId: item.projectId || '',
    });
  };

  const openDetail = async (item: CargoItem) => {
    setDetailOpen(true);
    setDetailLoading(true);
    setDetailCargo(null);
    setSelectedLocationId(item.locationId || '');
    try {
      const res = await fetch(`/api/cargo/${item.id}`);
      const data = await res.json();
      if (data.data) {
        setDetailCargo(data.data);
        setSelectedLocationId(data.data.locationId || '');
      } else {
        setDetailCargo(item);
      }
    } catch { setDetailCargo(item); } finally { setDetailLoading(false); }
  };

  const handleStatusChange = async (newStatus: CargoStatus) => {
    if (!detailCargo) return;
    setStatusChanging(true);
    try {
      const res = await fetch(`/api/cargo/${detailCargo.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('detail.statusChanged'));
      openDetail(detailCargo); // refresh
      fetchCargo();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('detail.statusChangeFailed')); } finally { setStatusChanging(false); }
  };

  const handleAssignLocation = async () => {
    if (!detailCargo || !selectedLocationId) return;
    setAssigningLocation(true);
    try {
      const res = await fetch(`/api/cargo/${detailCargo.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: selectedLocationId }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('detail.locationAssigned'));
      openDetail(detailCargo);
      fetchCargo();
    } catch { toast.error(t('detail.statusChangeFailed')); } finally { setAssigningLocation(false); }
  };

  const currentStep = detailCargo ? ALL_STATUSES.indexOf(detailCargo.status) : -1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{t('cargo.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('cargo.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">
          <Plus className="h-4 w-4 ml-2" /> {t('cargo.addCargo')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input placeholder={t('cargo.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
                className="border-slate-700 bg-slate-800 pr-9 text-slate-200 placeholder:text-slate-600" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-300"><SelectValue placeholder={t('common.allStatuses')} /></SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                {ALL_STATUSES.map((s) => (<SelectItem key={s} value={s} className="text-slate-300 focus:bg-slate-700 focus:text-slate-100">{translateStatus(s)}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-300"><SelectValue placeholder={t('common.allCategories')} /></SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                {['HEAVY_LIFT', 'OVERSIZE', 'STANDARD', 'PROJECT_CARGO'].map((c) => (<SelectItem key={c} value={c} className="text-slate-300 focus:bg-slate-700 focus:text-slate-100">{translateCategory(c)}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={commodityFilter} onValueChange={setCommodityFilter}>
              <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-300"><SelectValue placeholder={t('common.allCommodities')} /></SelectTrigger>
              <SelectContent className="border-slate-700 bg-slate-800">
                {['GENERAL', 'MACHINERY', 'STEEL', 'EQUIPMENT', 'MODULE'].map((c) => (<SelectItem key={c} value={c} className="text-slate-300 focus:bg-slate-700 focus:text-slate-100">{translateCommodity(c)}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-xs text-slate-500">{t('cargo.table.code')}</TableHead>
                  <TableHead className="text-xs text-slate-500">{t('cargo.table.description')}</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden md:table-cell">{t('cargo.table.weight')}</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden lg:table-cell">{t('cargo.table.category')}</TableHead>
                  <TableHead className="text-xs text-slate-500">{t('cargo.table.status')}</TableHead>
                  <TableHead className="text-xs text-slate-500 hidden lg:table-cell">{t('cargo.table.location')}</TableHead>
                  <TableHead className="text-xs text-slate-500 text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-800 hover:bg-transparent">
                    {Array.from({ length: 7 }).map((_, j) => (<TableCell key={j} className="py-3"><Skeleton className="h-4 w-16 bg-slate-800" /></TableCell>))}
                  </TableRow>
                )) : cargo.length === 0 ? (
                  <TableRow className="border-slate-800 hover:bg-transparent"><TableCell colSpan={7} className="text-center py-8 text-slate-500">{t('cargo.noCargoFound')}</TableCell></TableRow>
                ) : cargo.map((item) => (
                  <TableRow key={item.id} className="border-slate-800 hover:bg-slate-800/50 cursor-pointer" onClick={() => openDetail(item)}>
                    <TableCell className="py-3 text-xs font-mono font-medium text-amber-400/80">{item.cargoCode}</TableCell>
                    <TableCell className="py-3 text-xs text-slate-300 max-w-[200px] truncate">{item.description}</TableCell>
                    <TableCell className="py-3 text-xs text-slate-400 hidden md:table-cell">{item.weight.toLocaleString()}</TableCell>
                    <TableCell className="py-3 hidden lg:table-cell">
                      <Badge variant="outline" className={`text-[10px] ${categoryStyles[item.liftCategory]}`}>{translateCategory(item.liftCategory)}</Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className={`text-[10px] ${statusStyles[item.status]}`}>{translateStatus(item.status)}</Badge>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-slate-400 hidden lg:table-cell">{item.location?.code || '—'}</TableCell>
                    <TableCell className="py-3 text-left" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-start gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-cyan-400" onClick={() => openDetail(item)}><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-amber-400" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-red-400" onClick={() => setDeleting(item)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">{t('common.previous')}</Button>
          <span className="text-xs text-slate-500">{t('common.page')} {page} {t('common.of')} {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">{t('common.next')}</Button>
        </div>
      )}

      {/* ========== DETAIL SHEET ========== */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent side="left" className="w-full sm:max-w-xl border-slate-700 bg-slate-900 p-0 overflow-hidden flex flex-col">
          {detailLoading ? (
            <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-amber-400" /></div>
          ) : detailCargo ? (
            <>
              <SheetHeader className="p-4 border-b border-slate-800 shrink-0">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-sm font-mono text-amber-400">{detailCargo.cargoCode}</SheetTitle>
                  <Badge variant="outline" className={`text-[10px] ${statusStyles[detailCargo.status]}`}>{translateStatus(detailCargo.status)}</Badge>
                </div>
                <p className="text-sm text-slate-200 mt-1 font-medium">{detailCargo.description}</p>
              </SheetHeader>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-5">
                  {/* Status Workflow Stepper */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <h3 className="text-xs font-semibold text-slate-400 mb-3">{t('detail.workflow.title')}</h3>
                    <div className="flex items-center gap-1 overflow-x-auto pb-1">
                      {ALL_STATUSES.map((s, idx) => {
                        const Icon = statusIcons[s];
                        const isCompleted = idx <= currentStep;
                        const isCurrent = idx === currentStep;
                        const isNext = STATUS_WORKFLOW[detailCargo.status]?.includes(s);
                        return (
                          <div key={s} className="flex items-center shrink-0">
                            <button
                              disabled={!isNext || statusChanging}
                              onClick={() => isNext && handleStatusChange(s)}
                              className={`flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] ${
                                isCurrent ? 'bg-amber-500/15 ring-1 ring-amber-500/40' :
                                isCompleted ? 'opacity-60' :
                                isNext ? 'hover:bg-slate-800 cursor-pointer' : 'opacity-30'
                              }`}
                            >
                              <Icon className={`h-4 w-4 ${isCurrent ? 'text-amber-400' : isCompleted ? 'text-emerald-400' : isNext ? 'text-slate-400' : 'text-slate-600'}`} />
                              <span className={`text-[9px] leading-tight text-center ${isCurrent ? 'text-amber-400 font-semibold' : 'text-slate-500'}`}>{translateStatus(s)}</span>
                            </button>
                            {idx < ALL_STATUSES.length - 1 && (
                              <ChevronLeft className={`h-3 w-3 mx-0.5 shrink-0 ${idx < currentStep ? 'text-emerald-400' : 'text-slate-700'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <h3 className="text-xs font-semibold text-slate-400 mb-3">{t('detail.info.specifications')}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.weight')}</span><p className="text-slate-200 font-medium mt-0.5">{detailCargo.weight.toLocaleString()} kg</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.dimensions')}</span><p className="text-slate-200 font-mono mt-0.5">{detailCargo.length}×{detailCargo.width}×{detailCargo.height} m</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.category')}</span><div className="mt-1"><Badge variant="outline" className={`text-[10px] ${categoryStyles[detailCargo.liftCategory]}`}>{translateCategory(detailCargo.liftCategory)}</Badge></div></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.commodity')}</span><p className="text-slate-200 mt-0.5">{translateCommodity(detailCargo.commodityType)}</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.cog')}</span><p className="text-slate-200 mt-0.5">{detailCargo.centerOfGravity || '—'}</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.liftingPoints')}</span><p className="text-slate-200 mt-0.5">{detailCargo.liftingPoints ?? '—'}</p></div>
                      {detailCargo.volume && <div className="col-span-2"><span className="text-slate-500 text-xs">{t('detail.info.volume')}</span><p className="text-slate-200 mt-0.5">{detailCargo.volume.toFixed(1)} m³</p></div>}
                    </div>
                  </div>

                  {/* Location Assignment */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <h3 className="text-xs font-semibold text-slate-400 mb-3">{t('detail.assignLocation')}</h3>
                    <div className="flex items-center gap-2">
                      <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                        <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 flex-1"><SelectValue placeholder={t('common.select')} /></SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800 max-h-60">
                          {locations.map((l) => (<SelectItem key={l.id} value={l.id} className="text-slate-200 focus:bg-slate-700">{l.code} — {l.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" onClick={handleAssignLocation} disabled={assigningLocation || !selectedLocationId || selectedLocationId === detailCargo.locationId} className="bg-amber-500 hover:bg-amber-600 text-slate-900 shrink-0">
                        {assigningLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                      </Button>
                    </div>
                    {detailCargo.location && (
                      <p className="text-xs text-slate-500 mt-2">{t('common.location')}: <span className="text-slate-300">{detailCargo.location.code} — {detailCargo.location.name}</span></p>
                    )}
                  </div>

                  {/* References */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <h3 className="text-xs font-semibold text-slate-400 mb-3">{t('detail.info.references')}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.project')}</span><p className="text-slate-200 mt-0.5">{detailCargo.project?.name || t('cargo.details.unassigned')}</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.client')}</span><p className="text-slate-200 mt-0.5">{detailCargo.clientName || '—'}</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.poRef')}</span><p className="text-slate-200 font-mono mt-0.5">{detailCargo.poReference || '—'}</p></div>
                      <div><span className="text-slate-500 text-xs">{t('cargo.details.blRef')}</span><p className="text-slate-200 font-mono mt-0.5">{detailCargo.blReference || '—'}</p></div>
                    </div>
                  </div>

                  {/* Special Handling */}
                  {detailCargo.specialHandling && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                      <h3 className="text-xs font-semibold text-slate-400 mb-2">{t('cargo.details.specialHandling')}</h3>
                      <p className="text-xs text-slate-300 bg-slate-800 rounded-lg p-3 leading-relaxed">{detailCargo.specialHandling}</p>
                    </div>
                  )}

                  {/* Movement Timeline */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                    <h3 className="text-xs font-semibold text-slate-400 mb-3">{t('detail.movementHistory')}</h3>
                    {detailCargo.movements && detailCargo.movements.length > 0 ? (
                      <div className="space-y-3">
                        {detailCargo.movements.map((m, idx) => (
                          <div key={m.id} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${idx === 0 ? 'bg-amber-400' : 'bg-slate-600'} mt-1`} />
                              {idx < detailCargo.movements!.length - 1 && <div className="w-px flex-1 bg-slate-800" />}
                            </div>
                            <div className="flex-1 pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className={`text-[10px] ${movementTypeStyles[m.type] || ''}`}>{translateMovementType(m.type)}</Badge>
                                <span className="text-[10px] text-slate-600">{new Date(m.createdAt).toLocaleDateString()} {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                {m.fromLocation && <span>{m.fromLocation.code}</span>}
                                {m.fromLocation && m.toLocation && <ArrowRight className="h-3 w-3" />}
                                {m.toLocation && <span>{m.toLocation.code}</span>}
                              </div>
                              {m.remarks && <p className="text-[11px] text-slate-500 mt-1">{m.remarks}</p>}
                              {(m.operatorName || m.equipmentUsed) && (
                                <div className="flex gap-3 mt-1 text-[10px] text-slate-600">
                                  {m.operatorName && <span>{m.operatorName}</span>}
                                  {m.equipmentUsed && <span>{m.equipmentUsed}</span>}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 text-center py-4">{t('detail.noMovements')}</p>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      {/* ========== ADD/EDIT DIALOG ========== */}
      <Dialog open={showAdd || !!editing} onOpenChange={(open) => { if (!open) { setShowAdd(false); setEditing(null); setForm(emptyForm); } }}>
        <DialogContent className="border-slate-700 bg-slate-900 max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader><DialogTitle className="text-slate-100">{editing ? t('cargo.editCargo') : t('cargo.addNewCargo')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label className="text-slate-400">{t('cargo.form.description')}</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('cargo.form.weight')}</Label><Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('cargo.form.dimensions')}</Label><div className="grid grid-cols-3 gap-2 mt-1"><Input placeholder="L" type="number" value={form.length} onChange={(e) => setForm({ ...form, length: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 text-center" /><Input placeholder="W" type="number" value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 text-center" /><Input placeholder="H" type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 text-center" /></div></div>
            <div><Label className="text-slate-400">{t('cargo.form.liftCategory')}</Label><Select value={form.liftCategory} onValueChange={(v) => setForm({ ...form, liftCategory: v })}><SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 mt-1"><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className="border-slate-700 bg-slate-800">{(['HEAVY_LIFT', 'OVERSIZE', 'STANDARD', 'PROJECT_CARGO'] as LiftCategory[]).map((c) => (<SelectItem key={c} value={c} className="text-slate-200 focus:bg-slate-700">{translateCategory(c)}</SelectItem>))}</SelectContent></Select></div>
            <div><Label className="text-slate-400">{t('cargo.form.commodityType')}</Label><Select value={form.commodityType} onValueChange={(v) => setForm({ ...form, commodityType: v })}><SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 mt-1"><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className="border-slate-700 bg-slate-800">{(['GENERAL', 'MACHINERY', 'STEEL', 'EQUIPMENT', 'MODULE'] as CommodityType[]).map((c) => (<SelectItem key={c} value={c} className="text-slate-200 focus:bg-slate-700">{translateCommodity(c)}</SelectItem>))}</SelectContent></Select></div>
            <div><Label className="text-slate-400">{t('cargo.form.project')}</Label><Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}><SelectTrigger className="border-slate-700 bg-slate-800 text-slate-200 mt-1"><SelectValue placeholder={t('common.none')} /></SelectTrigger><SelectContent className="border-slate-700 bg-slate-800"><SelectItem value="_none" className="text-slate-200 focus:bg-slate-700">{t('common.none')}</SelectItem>{projects.map((p) => (<SelectItem key={p.id} value={p.id} className="text-slate-200 focus:bg-slate-700">{p.name}</SelectItem>))}</SelectContent></Select></div>
            <div><Label className="text-slate-400">{t('cargo.form.clientName')}</Label><Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('cargo.form.poReference')}</Label><Input value={form.poReference} onChange={(e) => setForm({ ...form, poReference: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('cargo.form.blReference')}</Label><Input value={form.blReference} onChange={(e) => setForm({ ...form, blReference: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('cargo.form.centerOfGravity')}</Label><Input value={form.centerOfGravity} onChange={(e) => setForm({ ...form, centerOfGravity: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" placeholder={t('cargo.form.cogPlaceholder')} /></div>
            <div><Label className="text-slate-400">{t('cargo.form.liftingPoints')}</Label><Input type="number" value={form.liftingPoints} onChange={(e) => setForm({ ...form, liftingPoints: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" placeholder={t('cargo.form.liftingPointsPlaceholder')} /></div>
            <div className="sm:col-span-2"><Label className="text-slate-400">{t('cargo.form.specialHandling')}</Label><Textarea value={form.specialHandling} onChange={(e) => setForm({ ...form, specialHandling: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1 min-h-[80px]" placeholder={t('cargo.form.specialHandlingPlaceholder')} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm); }} className="border-slate-700 text-slate-300 hover:bg-slate-800">{t('common.cancel')}</Button>
            <Button onClick={handleSubmit} disabled={submitting || !form.description || !form.weight || !form.liftCategory || !form.commodityType} className="bg-amber-500 hover:bg-amber-600 text-slate-900">{submitting ? t('common.saving') : editing ? t('common.update') : t('common.create')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <DialogContent className="border-slate-700 bg-slate-900 max-w-md">
          <DialogHeader><DialogTitle className="text-slate-100">{t('common.confirmDelete')}</DialogTitle></DialogHeader>
          <p className="text-sm text-slate-400">{t('cargo.delete.message')} <span className="text-amber-400 font-medium">{deleting?.cargoCode}</span>{t('cargo.delete.cannotUndo')}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)} className="border-slate-700 text-slate-300 hover:bg-slate-800">{t('common.cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
