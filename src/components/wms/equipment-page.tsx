'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useTranslation, translateEquipmentType, translateStatus } from '@/lib/translations';
import type { Equipment, EquipmentType, EquipmentStatus } from '@/types/wms';

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

const equipmentTypes: EquipmentType[] = ['CRANE', 'FORKLIFT', 'SPREADER_BAR', 'SLING', 'SHACKLE', 'BEAM', 'JACK', 'ROLLER'];
const equipmentStatuses: EquipmentStatus[] = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'];

const emptyForm = {
  name: '', type: '' as string, capacity: '', manufacturer: '',
  model: '', serialNumber: '', status: 'AVAILABLE' as string,
  currentLocation: '', lastInspection: '', nextInspection: '',
  certificationId: '', certExpiry: '',
};

interface EquipmentListResponse { items: Equipment[]; total: number; }

function isCertExpiringSoon(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return diff <= 30 && diff >= 0;
}
function isCertExpired(dateStr: string | null): boolean { if (!dateStr) return false; return new Date(dateStr) < new Date(); }

export function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [deleting, setDeleting] = useState<Equipment | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const ic = 'dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900 mt-1';
  const sc = 'dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white';
  const si = 'dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100';
  const rowBorder = 'dark:border-slate-800 border-slate-200';
  const rowHover = 'dark:hover:bg-slate-800/50 hover:bg-slate-50';
  const headCls = 'text-xs dark:text-slate-500 text-slate-400';
  const cellCls = 'py-3 text-xs';

  const fetchEquipment = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100', ...(typeFilter && { type: typeFilter }), ...(statusFilter && { status: statusFilter }) });
    try {
      const res = await fetch(`/api/equipment?${params}`);
      const data: EquipmentListResponse = await res.json();
      if (!res.ok) { setEquipment([]); return; }
      setEquipment(data.items || []);
    } catch { toast.error(t('equipment.toast.fetchFailed')); }
    finally { setLoading(false); }
  }, [typeFilter, statusFilter, t]);

  useEffect(() => { fetchEquipment(); }, [fetchEquipment]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, unknown> = {
      name: form.name, type: form.type, capacity: form.capacity ? parseFloat(form.capacity) : null,
      manufacturer: form.manufacturer || null, model: form.model || null, serialNumber: form.serialNumber || null,
      status: form.status, currentLocation: form.currentLocation || null,
      lastInspection: form.lastInspection || null, nextInspection: form.nextInspection || null,
      certificationId: form.certificationId || null, certExpiry: form.certExpiry || null,
    };
    try {
      const res = await fetch(editing ? `/api/equipment/${editing.id}` : '/api/equipment', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(editing ? t('equipment.toast.updated') : t('equipment.toast.created'));
      setShowAdd(false); setEditing(null); setForm(emptyForm); fetchEquipment();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await fetch(`/api/equipment/${deleting.id}`, { method: 'DELETE' }); toast.success(t('equipment.toast.deleted')); setDeleting(null); fetchEquipment(); }
    catch { toast.error(t('equipment.toast.deleteFailed')); }
  };

  const openEdit = (eq: Equipment) => {
    setEditing(eq);
    setForm({ name: eq.name, type: eq.type, capacity: eq.capacity ? String(eq.capacity) : '', manufacturer: eq.manufacturer || '', model: eq.model || '', serialNumber: eq.serialNumber || '', status: eq.status, currentLocation: eq.currentLocation || '', lastInspection: eq.lastInspection ? eq.lastInspection.split('T')[0] : '', nextInspection: eq.nextInspection ? eq.nextInspection.split('T')[0] : '', certificationId: eq.certificationId || '', certExpiry: eq.certExpiry ? eq.certExpiry.split('T')[0] : '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('equipment.title')}</h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{t('equipment.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">
          <Plus className="h-4 w-4 ml-2" /> {t('equipment.addEquipment')}
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={typeFilter || 'ALL'} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className="w-44 dark:border-slate-700 border-slate-300 dark:bg-slate-900/50 bg-white dark:text-slate-300 text-slate-600">
            <SelectValue placeholder={t('common.allTypes')} />
          </SelectTrigger>
          <SelectContent className={sc}>
            <SelectItem value="ALL" className={si}>{t('common.allTypes')}</SelectItem>
            {equipmentTypes.map((et) => <SelectItem key={et} value={et} className={si}>{translateEquipmentType(et)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter || 'ALL'} onValueChange={(v) => setStatusFilter(v === 'ALL' ? '' : v)}>
          <SelectTrigger className="w-44 dark:border-slate-700 border-slate-300 dark:bg-slate-900/50 bg-white dark:text-slate-300 text-slate-600">
            <SelectValue placeholder={t('common.allStatuses')} />
          </SelectTrigger>
          <SelectContent className={sc}>
            <SelectItem value="ALL" className={si}>{t('common.allStatuses')}</SelectItem>
            {equipmentStatuses.map((s) => <SelectItem key={s} value={s} className={si}>{translateStatus(s)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className={`${rowBorder} hover:bg-transparent`}>
                  <TableHead className={headCls}>{t('equipment.table.code')}</TableHead>
                  <TableHead className={headCls}>{t('equipment.table.name')}</TableHead>
                  <TableHead className={`${headCls} hidden sm:table-cell`}>{t('equipment.table.type')}</TableHead>
                  <TableHead className={`${headCls} hidden md:table-cell`}>{t('equipment.table.capacity')}</TableHead>
                  <TableHead className={`${headCls} hidden lg:table-cell`}>{t('equipment.table.manufacturer')}</TableHead>
                  <TableHead className={headCls}>{t('equipment.table.status')}</TableHead>
                  <TableHead className={`${headCls} hidden xl:table-cell`}>{t('equipment.table.location')}</TableHead>
                  <TableHead className={`${headCls} hidden xl:table-cell`}>{t('equipment.table.certExpiry')}</TableHead>
                  <TableHead className={`${headCls} text-left`}>{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className={`${rowBorder} hover:bg-transparent`}>{Array.from({ length: 9 }).map((_, j) => <TableCell key={j} className="py-3"><Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-100" /></TableCell>)}</TableRow>
                    ))
                  : equipment.length === 0
                    ? <TableRow className={`${rowBorder} hover:bg-transparent`}><TableCell colSpan={9} className="text-center py-8 dark:text-slate-500 text-slate-400">{t('equipment.noEquipmentFound')}</TableCell></TableRow>
                    : equipment.map((eq) => (
                      <TableRow key={eq.id} className={`${rowBorder} ${rowHover}`}>
                        <TableCell className={`${cellCls} font-mono font-medium text-amber-400/80`}>{eq.equipmentCode}</TableCell>
                        <TableCell className={`${cellCls} dark:text-slate-300 text-slate-700 font-medium`}>{eq.name}</TableCell>
                        <TableCell className={`${cellCls} hidden sm:table-cell`}><Badge variant="outline" className={`text-[10px] ${typeStyles[eq.type]}`}>{translateEquipmentType(eq.type)}</Badge></TableCell>
                        <TableCell className={`${cellCls} dark:text-slate-400 text-slate-500 hidden md:table-cell`}>{eq.capacity ? `${eq.capacity}t` : '—'}</TableCell>
                        <TableCell className={`${cellCls} dark:text-slate-400 text-slate-500 hidden lg:table-cell`}>{eq.manufacturer || '—'}</TableCell>
                        <TableCell className={cellCls}><Badge variant="outline" className={`text-[10px] ${statusStyles[eq.status]}`}>{translateStatus(eq.status)}</Badge></TableCell>
                        <TableCell className={`${cellCls} dark:text-slate-400 text-slate-500 hidden xl:table-cell`}>{eq.currentLocation || '—'}</TableCell>
                        <TableCell className={`${cellCls} hidden xl:table-cell`}>
                          <div className="flex items-center gap-1.5">
                            {isCertExpired(eq.certExpiry) && <Tooltip><TooltipTrigger><AlertTriangle className="h-3.5 w-3.5 text-red-400" /></TooltipTrigger><TooltipContent className="bg-red-900 border-red-700 text-red-200">{t('equipment.certExpired')}</TooltipContent></Tooltip>}
                            {isCertExpiringSoon(eq.certExpiry) && !isCertExpired(eq.certExpiry) && <Tooltip><TooltipTrigger><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /></TooltipTrigger><TooltipContent className="bg-amber-900 border-amber-700 text-amber-200">{t('equipment.certExpiringSoon')}</TooltipContent></Tooltip>}
                            <span className={`${cellCls} dark:text-slate-400 text-slate-500`}>{eq.certExpiry ? new Date(eq.certExpiry).toLocaleDateString() : '—'}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`${cellCls} text-left`}>
                          <div className="flex items-center justify-start gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-amber-400 hover:text-amber-600" onClick={() => openEdit(eq)}><Pencil className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-red-400 hover:text-red-600" onClick={() => setDeleting(eq)}><Trash2 className="h-3.5 w-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAdd || !!editing} onOpenChange={(open) => { if (!open) { setShowAdd(false); setEditing(null); setForm(emptyForm); } }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-h-[90vh] overflow-y-auto max-w-lg">
          <DialogHeader><DialogTitle className="dark:text-slate-100 text-slate-900">{editing ? t('equipment.editEquipment') : t('equipment.addNewEquipment')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.name')}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.type')}</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}><SelectTrigger className={ic}><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className={sc}>{equipmentTypes.map((et) => <SelectItem key={et} value={et} className={si}>{translateEquipmentType(et)}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.capacity')}</Label><Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.status')}</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}><SelectTrigger className={ic}><SelectValue /></SelectTrigger><SelectContent className={sc}>{equipmentStatuses.map((s) => <SelectItem key={s} value={s} className={si}>{translateStatus(s)}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.manufacturer')}</Label><Input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.model')}</Label><Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className={ic} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.serialNumber')}</Label><Input value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.currentLocation')}</Label><Input value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} className={ic} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.lastInspection')}</Label><Input type="date" value={form.lastInspection} onChange={(e) => setForm({ ...form, lastInspection: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.nextInspection')}</Label><Input type="date" value={form.nextInspection} onChange={(e) => setForm({ ...form, nextInspection: e.target.value })} className={ic} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.certificationId')}</Label><Input value={form.certificationId} onChange={(e) => setForm({ ...form, certificationId: e.target.value })} className={ic} /></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('equipment.form.certExpiry')}</Label><Input type="date" value={form.certExpiry} onChange={(e) => setForm({ ...form, certExpiry: e.target.value })} className={ic} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm); }} className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100">{t('common.cancel')}</Button>
            <Button onClick={handleSubmit} disabled={submitting || !form.name || !form.type} className="bg-amber-500 hover:bg-amber-600 text-slate-900">{submitting ? t('common.saving') : editing ? t('common.update') : t('common.create')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-w-md">
          <DialogHeader><DialogTitle className="dark:text-slate-100 text-slate-900">{t('common.confirmDelete')}</DialogTitle></DialogHeader>
          <p className="text-sm dark:text-slate-400 text-slate-500">{t('equipment.delete.message')} <span className="text-amber-400 font-medium">{deleting?.equipmentCode}</span>{t('equipment.delete.cannotUndo')}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)} className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100">{t('common.cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
