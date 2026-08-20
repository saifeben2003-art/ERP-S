'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus, Pencil, Eye, Trash2, AlertTriangle, X, Wrench, ShieldCheck,
  ClipboardCheck, CalendarCheck, Printer, Gauge, MapPin, CheckCircle2,
  XCircle, Clock, Loader2, Search, PackageOpen, Hash, Factory, Settings2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
import { useTranslation, translateEquipmentType, translateStatus } from '@/lib/translations';
import type { Equipment, EquipmentType, EquipmentStatus } from '@/types/wms';

// ==================== CONSTANTS ====================

const statusStyles: Record<EquipmentStatus, string> = {
  AVAILABLE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  IN_USE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  MAINTENANCE: 'bg-red-500/10 text-red-400 border-red-500/20',
  OUT_OF_SERVICE: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const typeStyles: Record<EquipmentType, string> = {
  CRANE: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  FORKLIFT: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  SPREADER_BAR: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  SLING: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  SHACKLE: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  BEAM: 'bg-red-500/10 text-red-400 border-red-500/20',
  JACK: 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  ROLLER: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

type CertStatus = 'valid' | 'expiring' | 'expired' | 'none';

function getCertStatus(dateStr: string | null): CertStatus {
  if (!dateStr) return 'none';
  const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return 'expired';
  if (diff <= 30) return 'expiring';
  return 'valid';
}

function getCertDays(dateStr: string | null): number {
  if (!dateStr) return 0;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

const equipmentTypes: EquipmentType[] = ['CRANE', 'FORKLIFT', 'SPREADER_BAR', 'SLING', 'SHACKLE', 'BEAM', 'JACK', 'ROLLER'];
const equipmentStatuses: EquipmentStatus[] = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'];

const emptyForm = {
  name: '', type: '' as string, capacity: '', manufacturer: '',
  model: '', serialNumber: '', status: 'AVAILABLE' as string,
  currentLocation: '', lastInspection: '', nextInspection: '',
  certificationId: '', certExpiry: '',
};

interface EquipmentListResponse { items: Equipment[]; total: number; }

// ==================== MAIN COMPONENT ====================

export function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [deleting, setDeleting] = useState<Equipment | null>(null);
  const [detailEquip, setDetailEquip] = useState<Equipment | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [statusChanging, setStatusChanging] = useState(false);
  const { t } = useTranslation();

  const cardBorder = 'dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white';
  const textPrimary = 'dark:text-slate-100 text-slate-900';
  const textSecondary = 'dark:text-slate-400 text-slate-500';
  const textTertiary = 'dark:text-slate-500 text-slate-400';
  const inputCls = 'dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900';
  const selectContentCls = 'dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white';
  const selectItemCls = 'dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100';
  const headCls = 'text-xs dark:text-slate-500 text-slate-400';
  const cellCls = 'py-3 text-xs';
  const rowBorder = 'dark:border-slate-800 border-slate-200';

  const fetchEquipment = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      limit: '100',
      ...(typeFilter && { type: typeFilter }),
      ...(statusFilter && { status: statusFilter }),
    });
    try {
      const res = await fetch(`/api/equipment?${params}`);
      const data: EquipmentListResponse = await res.json();
      if (!res.ok) { setEquipment([]); return; }
      setEquipment(data.items || []);
    } catch { toast.error(t('equipment.toast.fetchFailed')); }
    finally { setLoading(false); }
  }, [typeFilter, statusFilter, t]);

  useEffect(() => { fetchEquipment(); }, [fetchEquipment]);

  const filteredEquipment = useMemo(() => {
    if (!searchQuery) return equipment;
    const q = searchQuery.toLowerCase();
    return equipment.filter(
      (eq) =>
        eq.name.toLowerCase().includes(q) ||
        eq.equipmentCode.toLowerCase().includes(q) ||
        (eq.manufacturer && eq.manufacturer.toLowerCase().includes(q)) ||
        (eq.model && eq.model.toLowerCase().includes(q))
    );
  }, [equipment, searchQuery]);

  const handleDetailStatusChange = async (newStatus: string) => {
    if (!detailEquip || newStatus === detailEquip.status) return;
    setStatusChanging(true);
    try {
      const res = await fetch(`/api/equipment/${detailEquip.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('detail.equipment.statusChanged'));
      setDetailEquip({ ...detailEquip, status: newStatus as EquipmentStatus });
      fetchEquipment();
    } catch { toast.error(t('detail.equipment.statusChangeFailed')); }
    finally { setStatusChanging(false); }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, unknown> = {
      name: form.name, type: form.type,
      capacity: form.capacity ? parseFloat(form.capacity) : null,
      manufacturer: form.manufacturer || null, model: form.model || null,
      serialNumber: form.serialNumber || null, status: form.status,
      currentLocation: form.currentLocation || null,
      lastInspection: form.lastInspection || null, nextInspection: form.nextInspection || null,
      certificationId: form.certificationId || null, certExpiry: form.certExpiry || null,
    };
    try {
      const res = await fetch(editing ? `/api/equipment/${editing.id}` : '/api/equipment', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(editing ? t('equipment.toast.updated') : t('equipment.toast.created'));
      setShowAdd(false); setEditing(null); setForm(emptyForm); fetchEquipment();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await fetch(`/api/equipment/${deleting.id}`, { method: 'DELETE' });
      toast.success(t('equipment.toast.deleted'));
      setDeleting(null); setDetailEquip(null); fetchEquipment();
    } catch { toast.error(t('equipment.toast.deleteFailed')); }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(Array.from(selectedRows).map(id => fetch(`/api/equipment/${id}`, { method: 'DELETE' })));
      toast.success(t('equipment.toast.deleted'));
      setSelectedRows(new Set()); fetchEquipment();
    } catch { toast.error(t('equipment.toast.deleteFailed')); }
  };

  const openEdit = (eq: Equipment) => {
    setEditing(eq);
    setForm({
      name: eq.name, type: eq.type,
      capacity: eq.capacity ? String(eq.capacity) : '',
      manufacturer: eq.manufacturer || '', model: eq.model || '',
      serialNumber: eq.serialNumber || '', status: eq.status,
      currentLocation: eq.currentLocation || '',
      lastInspection: eq.lastInspection ? eq.lastInspection.split('T')[0] : '',
      nextInspection: eq.nextInspection ? eq.nextInspection.split('T')[0] : '',
      certificationId: eq.certificationId || '',
      certExpiry: eq.certExpiry ? eq.certExpiry.split('T')[0] : '',
    });
  };

  const toggleSelectAll = () => {
    const fEq = Array.isArray(filteredEquipment) ? filteredEquipment : [];
    if (selectedRows.size === fEq.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(fEq.map(e => e.id)));
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedRows(next);
  };

  // Detail sheet computations
  const detailCertStatus = detailEquip ? getCertStatus(detailEquip.certExpiry) : 'none';
  const detailCertDays = detailEquip ? getCertDays(detailEquip.certExpiry) : 0;

  const inspectionProgress = useMemo(() => {
    if (!detailEquip?.lastInspection || !detailEquip.nextInspection) return null;
    const last = new Date(detailEquip.lastInspection).getTime();
    const next = new Date(detailEquip.nextInspection).getTime();
    const now = Date.now();
    const total = next - last;
    if (total <= 0) return 100;
    return Math.min(100, Math.max(0, ((now - last) / total) * 100));
  }, [detailEquip]);

  // Capacity utilization (simulated at 65% of max when available)
  const capacityUtil = useMemo(() => {
    if (!detailEquip?.capacity) return null;
    return Math.round(detailEquip.capacity * 0.65);
  }, [detailEquip]);

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>{t('equipment.title')}</h1>
          <p className={`text-sm ${textSecondary} mt-1`}>{t('equipment.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium transition-all duration-200 hover:shadow-md">
          <Plus className="h-4 w-4 ml-2" /> {t('equipment.addEquipment')}
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textTertiary}`} />
          <Input placeholder={t('equipment.subtitle')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${inputCls} pl-3 pr-9 text-sm`} />
        </div>
        <Select value={typeFilter || 'ALL'} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className={`w-44 ${inputCls} text-sm`}><SelectValue placeholder={t('common.allTypes')} /></SelectTrigger>
          <SelectContent className={selectContentCls}>
            <SelectItem value="ALL" className={selectItemCls}>{t('common.allTypes')}</SelectItem>
            {equipmentTypes.map((et) => <SelectItem key={et} value={et} className={selectItemCls}>{translateEquipmentType(et)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter || 'ALL'} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className={`w-44 ${inputCls} text-sm`}><SelectValue placeholder={t('common.allStatuses')} /></SelectTrigger>
          <SelectContent className={selectContentCls}>
            <SelectItem value="ALL" className={selectItemCls}>{t('common.allStatuses')}</SelectItem>
            {equipmentStatuses.map((s) => <SelectItem key={s} value={s} className={selectItemCls}>{translateStatus(s)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedRows.size > 0 && (
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${cardBorder} border transition-all duration-200`}>
          <span className={`text-sm font-medium ${textSecondary}`}>{selectedRows.size} {t('common.selected')}</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="text-xs">
            <Trash2 className="h-3.5 w-3.5 ml-1" /> {t('common.delete')}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedRows(new Set())} className={`text-xs ${inputCls} border transition-all duration-200`}>
            <X className="h-3.5 w-3.5 ml-1" /> {t('common.clear')}
          </Button>
        </div>
      )}

      {/* Table */}
      <Card className={`${cardBorder} transition-all duration-200`}>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className={`${rowBorder} hover:bg-transparent`}>
                  <TableHead className="w-10">
                    <Checkbox checked={Array.isArray(filteredEquipment) && filteredEquipment.length > 0 && selectedRows.size === filteredEquipment.length} onCheckedChange={toggleSelectAll} className="dark:border-slate-600 border-slate-300" />
                  </TableHead>
                  <TableHead className={headCls}>{t('equipment.table.code')}</TableHead>
                  <TableHead className={headCls}>{t('equipment.table.name')}</TableHead>
                  <TableHead className={`${headCls} hidden sm:table-cell`}>{t('equipment.table.type')}</TableHead>
                  <TableHead className={`${headCls} hidden md:table-cell`}>{t('equipment.table.capacity')}</TableHead>
                  <TableHead className={`${headCls} hidden lg:table-cell`}>{t('equipment.table.manufacturer')}</TableHead>
                  <TableHead className={headCls}>{t('equipment.table.status')}</TableHead>
                  <TableHead className={`${headCls} hidden xl:table-cell`}>{t('equipment.table.location')}</TableHead>
                  <TableHead className={`${headCls} hidden xl:table-cell`}>{t('equipment.table.certExpiry')}</TableHead>
                  <TableHead className={`${headCls} text-left w-24`}>{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className={`${rowBorder} hover:bg-transparent`}>
                        <TableCell className="py-3"><Skeleton className="h-4 w-4 dark:bg-slate-800 bg-slate-100" /></TableCell>
                        {Array.from({ length: 8 }).map((_, j) => <TableCell key={j} className="py-3"><Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-100" /></TableCell>)}
                      </TableRow>
                    ))
                  : !Array.isArray(filteredEquipment) || filteredEquipment.length === 0
                    ? <TableRow className={`${rowBorder} hover:bg-transparent`}>
                        <TableCell colSpan={10} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <PackageOpen className={`h-10 w-10 ${textTertiary}`} />
                            <p className={`text-sm ${textSecondary}`}>{t('detail.equipment.emptyState')}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    : filteredEquipment.map((eq) => (
                      <TableRow key={eq.id} className={`${rowBorder} dark:hover:bg-slate-800/50 hover:bg-slate-50 cursor-pointer transition-all duration-200 group ${selectedRows.has(eq.id) ? 'dark:bg-amber-500/5 bg-amber-50' : ''} ${detailEquip?.id === eq.id ? 'dark:bg-amber-500/10 bg-amber-100/50' : ''}`} onClick={() => setDetailEquip(eq)}>
                        <TableCell className={cellCls} onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={selectedRows.has(eq.id)} onCheckedChange={() => toggleRow(eq.id)} className="dark:border-slate-600 border-slate-300" />
                        </TableCell>
                        <TableCell className={`${cellCls} font-mono font-medium text-amber-400/80 group-hover:text-amber-400 transition-colors duration-200`}>{eq.equipmentCode}</TableCell>
                        <TableCell className={`${cellCls} ${textPrimary} font-medium group-hover:text-amber-400 transition-colors duration-200`}>{eq.name}</TableCell>
                        <TableCell className={`${cellCls} hidden sm:table-cell`}>
                          <Badge variant="outline" className={`text-[10px] ${typeStyles[eq.type]} transition-all duration-200`}>{translateEquipmentType(eq.type)}</Badge>
                        </TableCell>
                        <TableCell className={`${cellCls} ${textSecondary} hidden md:table-cell`}>{eq.capacity ? `${eq.capacity}t` : '—'}</TableCell>
                        <TableCell className={`${cellCls} ${textSecondary} hidden lg:table-cell`}>{eq.manufacturer || '—'}</TableCell>
                        <TableCell className={cellCls}>
                          <Badge variant="outline" className={`text-[10px] ${statusStyles[eq.status]} transition-all duration-200`}>{translateStatus(eq.status)}</Badge>
                        </TableCell>
                        <TableCell className={`${cellCls} ${textSecondary} hidden xl:table-cell`}>{eq.currentLocation || '—'}</TableCell>
                        <TableCell className={`${cellCls} hidden xl:table-cell`}>
                          <div className="flex items-center gap-1.5">
                            {getCertStatus(eq.certExpiry) === 'expired' && <Tooltip><TooltipTrigger><AlertTriangle className="h-3.5 w-3.5 text-red-400" /></TooltipTrigger><TooltipContent className="bg-red-900 border-red-700 text-red-200">{t('equipment.certExpired')}</TooltipContent></Tooltip>}
                            {getCertStatus(eq.certExpiry) === 'expiring' && <Tooltip><TooltipTrigger><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /></TooltipTrigger><TooltipContent className="bg-amber-900 border-amber-700 text-amber-200">{t('equipment.certExpiringSoon')}</TooltipContent></Tooltip>}
                            <span className={`${cellCls} ${textSecondary}`}>{eq.certExpiry ? new Date(eq.certExpiry).toLocaleDateString() : '—'}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`${cellCls} text-left`} onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-start gap-1">
                            <Button variant="ghost" size="icon" className={`h-7 w-7 ${textTertiary} dark:hover:text-amber-400 hover:text-amber-600 transition-all duration-200`} onClick={() => setDetailEquip(eq)}><Eye className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className={`h-7 w-7 ${textTertiary} dark:hover:text-amber-400 hover:text-amber-600 transition-all duration-200`} onClick={() => openEdit(eq)}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className={`h-7 w-7 ${textTertiary} dark:hover:text-red-400 hover:text-red-600 transition-all duration-200`} onClick={() => setDeleting(eq)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ==================== DETAIL SHEET ==================== */}
      <Sheet open={!!detailEquip} onOpenChange={(open) => { if (!open) setDetailEquip(null); }}>
        <SheetContent side="left" className={`${inputCls} w-full sm:max-w-lg p-0 overflow-hidden`}>
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {detailEquip && (<>
                {/* Sheet Header */}
                <SheetHeader className="text-right">
                  <SheetTitle className={`${textPrimary} text-lg`}>{detailEquip.name}</SheetTitle>
                  <div className="flex items-center gap-2 mt-1 justify-end">
                    <span className={`text-xs font-mono ${textTertiary}`}>{detailEquip.equipmentCode}</span>
                    <Badge variant="outline" className={`text-[10px] ${typeStyles[detailEquip.type]}`}>{translateEquipmentType(detailEquip.type)}</Badge>
                    <Badge variant="outline" className={`text-[10px] ${statusStyles[detailEquip.status]}`}>{translateStatus(detailEquip.status)}</Badge>
                  </div>
                </SheetHeader>

                <Separator className="dark:bg-slate-800 bg-slate-200" />

                {/* ===== Equipment Profile Card ===== */}
                <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                  <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                    <Settings2 className="h-4 w-4 text-amber-400" />
                    {t('detail.equipment.profile')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ProfileField icon={Gauge} label={t('detail.equipment.capacityTons')} value={detailEquip.capacity ? `${detailEquip.capacity} ${t('common.tons')}` : '—'} />
                    <ProfileField icon={Factory} label={t('detail.equipment.manufacturer')} value={detailEquip.manufacturer || '—'} />
                    <ProfileField icon={Settings2} label={t('detail.equipment.model')} value={detailEquip.model || '—'} />
                    <ProfileField icon={Hash} label={t('detail.equipment.serialNumber')} value={detailEquip.serialNumber || '—'} />
                    <ProfileField icon={MapPin} label={t('detail.equipment.currentLocation')} value={detailEquip.currentLocation || t('detail.equipment.noLocation')} />
                  </div>
                </div>

                {/* ===== Certification Status Card ===== */}
                <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                  <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                    {t('detail.equipment.certification')}
                  </h3>
                  <CertStatusCard certStatus={detailCertStatus} certDays={detailCertDays} certId={detailEquip.certificationId} certExpiry={detailEquip.certExpiry} t={t} textPrimary={textPrimary} textSecondary={textSecondary} textTertiary={textTertiary} />
                </div>

                {/* ===== Maintenance Schedule ===== */}
                <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                  <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                    <Wrench className="h-4 w-4 text-amber-400" />
                    {t('detail.equipment.maintenance')}
                  </h3>
                  {detailEquip.lastInspection || detailEquip.nextInspection ? (
                    <div className="space-y-4">
                      {/* Timeline Visual */}
                      <div className="relative">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-center flex-1">
                            <p className={`text-[10px] ${textTertiary} mb-1`}>{t('detail.equipment.lastInspection')}</p>
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
                            </div>
                            <p className={`text-xs font-medium mt-1.5 ${textPrimary}`}>
                              {detailEquip.lastInspection ? new Date(detailEquip.lastInspection).toLocaleDateString() : '—'}
                            </p>
                          </div>
                          <div className="flex-1 flex items-center pt-5 px-2">
                            <div className="w-full h-2 rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  inspectionProgress !== null && inspectionProgress > 80 ? 'bg-red-400' :
                                  inspectionProgress !== null && inspectionProgress > 60 ? 'bg-amber-400' :
                                  'bg-emerald-400'
                                }`}
                                style={{ width: `${inspectionProgress ?? 0}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-center flex-1">
                            <p className={`text-[10px] ${textTertiary} mb-1`}>{t('detail.equipment.nextInspection')}</p>
                            <div className={`flex items-center justify-center gap-1.5 ${
                              detailEquip.nextInspection && new Date(detailEquip.nextInspection) < new Date()
                                ? 'animate-pulse' : ''
                            }`}>
                              <div className={`w-3 h-3 rounded-full ${
                                detailEquip.nextInspection && new Date(detailEquip.nextInspection) < new Date()
                                  ? 'bg-red-400 ring-2 ring-red-400/30' : 'bg-amber-400 ring-2 ring-amber-400/20'
                              }`} />
                            </div>
                            <p className={`text-xs font-medium mt-1.5 ${textPrimary}`}>
                              {detailEquip.nextInspection ? new Date(detailEquip.nextInspection).toLocaleDateString() : '—'}
                            </p>
                          </div>
                        </div>
                        {inspectionProgress !== null && (
                          <p className={`text-center text-[10px] ${textTertiary}`}>
                            {t('detail.equipment.inspectionProgress')}: {Math.round(inspectionProgress)}%
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-xs ${textTertiary} text-center py-4`}>{t('detail.equipment.noNextInspection')}</p>
                  )}
                </div>

                {/* ===== Capacity Utilization ===== */}
                {capacityUtil !== null && (
                  <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                    <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <Gauge className="h-4 w-4 text-amber-400" />
                      {t('detail.equipment.capacity')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${textSecondary}`}>{t('detail.equipment.currentLoad')}</span>
                        <span className={`text-xs font-mono font-medium ${textPrimary}`}>{capacityUtil}t / {detailEquip.capacity}t</span>
                      </div>
                      <div className="w-full h-3 rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            capacityUtil / detailEquip.capacity! > 0.8 ? 'bg-red-400' :
                            capacityUtil / detailEquip.capacity! > 0.6 ? 'bg-amber-400' :
                            'bg-emerald-400'
                          }`}
                          style={{ width: `${Math.min(100, (capacityUtil / detailEquip.capacity!) * 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] ${textTertiary}`}>{t('detail.equipment.utilization')}</span>
                        <span className={`text-[10px] ${textSecondary}`}>{Math.round((capacityUtil / detailEquip.capacity!) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== Status Management ===== */}
                <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                  <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${textPrimary}`}>
                    <ClipboardCheck className="h-4 w-4 text-amber-400" />
                    {t('detail.equipment.statusManagement')}
                  </h3>
                  <Select value={detailEquip.status} onValueChange={handleDetailStatusChange} disabled={statusChanging}>
                    <SelectTrigger className={`w-full ${inputCls} text-sm`}>
                      {statusChanging ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      {equipmentStatuses.map((s) => <SelectItem key={s} value={s} className={selectItemCls}>{translateStatus(s)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* ===== Quick Actions ===== */}
                <div className={`rounded-xl border p-5 ${cardBorder} transition-all duration-200`}>
                  <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                    <Wrench className="h-4 w-4 text-amber-400" />
                    {t('detail.quickActions')}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <QuickActionButton
                      icon={ClipboardCheck}
                      label={t('detail.equipment.recordInspection')}
                      color="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/20"
                      onClick={() => toast.info(t('detail.equipment.recordInspection'))}
                    />
                    <QuickActionButton
                      icon={CalendarCheck}
                      label={t('detail.equipment.scheduleMaintenance')}
                      color="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 dark:hover:bg-amber-500/20"
                      onClick={() => toast.info(t('detail.equipment.scheduleMaintenance'))}
                    />
                    <QuickActionButton
                      icon={Printer}
                      label={t('detail.equipment.printCertificate')}
                      color="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 dark:hover:bg-cyan-500/20"
                      onClick={() => toast.info(t('detail.equipment.printCertificate'))}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className={`flex-1 ${inputCls} border transition-all duration-200`}
                    onClick={() => { openEdit(detailEquip); setDetailEquip(null); }}
                  >
                    <Pencil className="h-4 w-4 ml-2" /> {t('detail.equipment.editEquipment')}
                  </Button>
                  <Button
                    variant="outline"
                    className={`dark:border-red-800 border-red-300 dark:text-red-400 text-red-600 dark:hover:bg-red-500/10 hover:bg-red-50 transition-all duration-200`}
                    onClick={() => { setDeleting(detailEquip); }}
                  >
                    <Trash2 className="h-4 w-4 ml-2" /> {t('common.delete')}
                  </Button>
                </div>
              </>)}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* ==================== ADD/EDIT DIALOG ==================== */}
      <Dialog open={showAdd || !!editing} onOpenChange={(open) => { if (!open) { setShowAdd(false); setEditing(null); setForm(emptyForm); } }}>
        <DialogContent className={`dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-h-[90vh] overflow-y-auto max-w-lg`}>
          <DialogHeader>
            <DialogTitle className={textPrimary}>{editing ? t('equipment.editEquipment') : t('equipment.addNewEquipment')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            {/* Basic Info */}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${textTertiary}`}>{t('equipment.form.specifications')}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={textSecondary}>{t('equipment.form.name')}</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${inputCls} mt-1`} />
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.type')}</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger className={`${inputCls} mt-1`}><SelectValue placeholder={t('common.select')} /></SelectTrigger>
                    <SelectContent className={selectContentCls}>{equipmentTypes.map((et) => <SelectItem key={et} value={et} className={selectItemCls}>{translateEquipmentType(et)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.capacity')}</Label>
                  <div className="mt-1 space-y-2">
                    <Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={inputCls} />
                    {form.capacity && (
                      <div className="space-y-1">
                        <div className="w-full h-2 rounded-full dark:bg-slate-800 bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-300"
                            style={{ width: `${Math.min(100, (parseFloat(form.capacity) / 500) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className={`text-[10px] ${textTertiary}`}>0t</span>
                          <span className={`text-[10px] ${textTertiary}`}>500t</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.status')}</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger className={`${inputCls} mt-1`}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentCls}>{equipmentStatuses.map((s) => <SelectItem key={s} value={s} className={selectItemCls}>{translateStatus(s)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="dark:bg-slate-800 bg-slate-200" />

            {/* Manufacturer / Model */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={textSecondary}>{t('equipment.form.manufacturer')}</Label>
                <Input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} className={`${inputCls} mt-1`} />
              </div>
              <div>
                <Label className={textSecondary}>{t('equipment.form.model')}</Label>
                <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className={`${inputCls} mt-1`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className={textSecondary}>{t('equipment.form.serialNumber')}</Label>
                <Input value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} className={`${inputCls} mt-1`} />
              </div>
              <div>
                <Label className={textSecondary}>{t('equipment.form.currentLocation')}</Label>
                <Input value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} className={`${inputCls} mt-1`} />
              </div>
            </div>

            <Separator className="dark:bg-slate-800 bg-slate-200" />

            {/* Inspection & Certification */}
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${textTertiary}`}>{t('equipment.form.inspectionCertification')}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={textSecondary}>{t('equipment.form.lastInspection')}</Label>
                  <Input type="date" value={form.lastInspection} onChange={(e) => setForm({ ...form, lastInspection: e.target.value })} className={`${inputCls} mt-1`} />
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.nextInspection')}</Label>
                  <Input type="date" value={form.nextInspection} onChange={(e) => setForm({ ...form, nextInspection: e.target.value })} className={`${inputCls} mt-1`} />
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.certificationId')}</Label>
                  <Input value={form.certificationId} onChange={(e) => setForm({ ...form, certificationId: e.target.value })} className={`${inputCls} mt-1`} />
                </div>
                <div>
                  <Label className={textSecondary}>{t('equipment.form.certExpiry')}</Label>
                  <Input type="date" value={form.certExpiry} onChange={(e) => setForm({ ...form, certExpiry: e.target.value })} className={`${inputCls} mt-1`} />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm); }} className={`dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200`}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSubmit} disabled={submitting || !form.name || !form.type} className="bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all duration-200 hover:shadow-md">
              {submitting ? t('common.saving') : editing ? t('common.update') : t('common.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DELETE DIALOG ==================== */}
      <Dialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <DialogContent className={`dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-w-md`}>
          <DialogHeader><DialogTitle className={textPrimary}>{t('common.confirmDelete')}</DialogTitle></DialogHeader>
          <p className={`text-sm ${textSecondary}`}>
            {t('equipment.delete.message')} <span className="text-amber-400 font-medium">{deleting?.equipmentCode}</span>{t('equipment.delete.cannotUndo')}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)} className={`dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200`}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 transition-all duration-200">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================

function ProfileField({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] dark:text-slate-500 text-slate-400">{label}</span>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 dark:text-slate-500 text-slate-400 shrink-0" />
        <span className="text-xs font-medium dark:text-slate-200 text-slate-700 truncate">{value}</span>
      </div>
    </div>
  );
}

function CertStatusCard({ certStatus, certDays, certId, certExpiry, t, textPrimary, textSecondary, textTertiary }: {
  certStatus: CertStatus;
  certDays: number;
  certId: string | null;
  certExpiry: string | null;
  t: (key: string) => string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
}) {
  const config = {
    valid: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle2, label: t('detail.equipment.certValid') },
    expiring: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: Clock, label: t('detail.equipment.certExpiring') },
    expired: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', icon: XCircle, label: t('detail.equipment.certExpired') },
    none: { bg: 'dark:bg-slate-800 bg-slate-100', border: 'dark:border-slate-700 border-slate-200', text: textTertiary, icon: ShieldCheck, label: t('detail.equipment.certNone') },
  }[certStatus];

  const IconComp = config.icon;

  return (
    <div className="space-y-3">
      {/* Main status indicator */}
      <div className={`flex items-center gap-3 p-3 rounded-lg border ${config.bg} ${config.border} transition-all duration-200`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} shrink-0`}>
          <IconComp className={`h-5 w-5 ${config.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold ${config.text}`}>{config.label}</p>
          {certStatus !== 'none' && certExpiry && (
            <p className={`text-[10px] ${textTertiary} mt-0.5`}>
              {certStatus === 'expired'
                ? `${Math.abs(certDays)} ${t('detail.equipment.daysOverdue')}`
                : `${certDays} ${t('detail.equipment.daysRemaining')}`}
            </p>
          )}
        </div>
      </div>
      {/* Cert details */}
      {certId && (
        <div className="flex items-center justify-between">
          <span className={`text-[10px] ${textTertiary}`}>{t('detail.equipment.certId')}</span>
          <span className={`text-xs font-mono ${textPrimary}`}>{certId}</span>
        </div>
      )}
      {certExpiry && (
        <div className="flex items-center justify-between">
          <span className={`text-[10px] ${textTertiary}`}>{t('detail.equipment.certExpiryDate')}</span>
          <span className={`text-xs ${textPrimary}`}>{new Date(certExpiry).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, color, onClick }: {
  icon: React.ComponentType<{ className?: string }>; label: string; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-lg border dark:border-slate-800 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50 transition-all duration-200 hover:shadow-md group cursor-pointer`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} transition-all duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[10px] dark:text-slate-400 text-slate-500 group-hover:dark:text-slate-300 group-hover:text-slate-600 transition-colors duration-200 text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
