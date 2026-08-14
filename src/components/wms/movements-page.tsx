'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, ArrowLeftRight, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useTranslation, translateMovementType } from '@/lib/translations';
import type { Movement, MovementType, CargoItem, Location, Equipment } from '@/types/wms';

const typeStyles: Record<MovementType, string> = {
  RECEIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  MOVE: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  DISPATCH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  INSPECT: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const movementTypes: MovementType[] = ['RECEIVE', 'MOVE', 'DISPATCH', 'INSPECT'];
const emptyForm = { cargoItemId: '', type: '' as string, fromLocationId: '', toLocationId: '', equipmentUsed: '', liftMethod: '', operatorName: '', actualWeight: '', remarks: '' };

export function MovementsPage() {
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
  const { t } = useTranslation();

  const ic = 'dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900 mt-1';
  const sc = 'dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white';
  const si = 'dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100';
  const rb = 'dark:border-slate-800 border-slate-200';
  const rh = 'dark:hover:bg-slate-800/50 hover:bg-slate-50';
  const th = 'text-xs dark:text-slate-500 text-slate-400';
  const tc = 'py-3 text-xs';

  const fetchMovements = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100', ...(search && { search }), ...(typeFilter && { type: typeFilter }), ...(dateFrom && { dateFrom }), ...(dateTo && { dateTo }) });
    try {
      const res = await fetch(`/api/movements?${params}`);
      const data = await res.json();
      if (!res.ok) { setMovements([]); return; }
      setMovements(data.items || []);
    } catch { toast.error(t('movements.toast.fetchFailed')); }
    finally { setLoading(false); }
  }, [search, typeFilter, dateFrom, dateTo, t]);

  const fetchLookups = useCallback(async () => {
    try {
      const [cr, lr, er] = await Promise.all([fetch('/api/cargo?limit=200'), fetch('/api/locations?limit=100'), fetch('/api/equipment?limit=100&status=AVAILABLE')]);
      setCargoItems((await cr.json()).items || []);
      setLocations((await lr.json()).items || []);
      setEquipment((await er.json()).items || []);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchMovements(); }, [fetchMovements]);
  useEffect(() => { fetchLookups(); }, [fetchLookups]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/movements', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargoItemId: form.cargoItemId, type: form.type,
          fromLocationId: form.fromLocationId !== 'NONE' ? form.fromLocationId : null,
          toLocationId: form.toLocationId !== 'NONE' ? form.toLocationId : null,
          equipmentUsed: form.equipmentUsed !== 'NONE' ? form.equipmentUsed : null,
          liftMethod: form.liftMethod || null, operatorName: form.operatorName || null,
          actualWeight: form.actualWeight ? parseFloat(form.actualWeight) : null, remarks: form.remarks || null,
        }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('movements.toast.recorded')); setShowAdd(false); setForm(emptyForm); fetchMovements();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('movements.toast.recordFailed')); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('movements.title')}</h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{t('movements.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">
          <Plus className="h-4 w-4 ml-2" /> {t('movements.recordMovement')}
        </Button>
      </div>

      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 dark:text-slate-500 text-slate-400" />
              <Input placeholder={t('movements.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 pr-9 dark:text-slate-200 text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400" />
            </div>
            <Select value={typeFilter || 'ALL'} onValueChange={(v) => setTypeFilter(v === 'ALL' ? '' : v)}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-300 text-slate-600"><SelectValue placeholder={t('common.allTypes')} /></SelectTrigger>
              <SelectContent className={sc}><SelectItem value="ALL" className={si}>{t('common.allTypes')}</SelectItem>{movementTypes.map((mt) => <SelectItem key={mt} value={mt} className={si}>{translateMovementType(mt)}</SelectItem>)}</SelectContent>
            </Select>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900" />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-slate-50 dark:text-slate-200 text-slate-900" />
            <Button variant="outline" onClick={() => { setSearch(''); setTypeFilter(''); setDateFrom(''); setDateTo(''); }} className="dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100 dark:hover:text-slate-300 hover:text-slate-700">
              <Filter className="h-4 w-4 ml-2" /> {t('common.clear')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className={`${rb} hover:bg-transparent`}>
                  <TableHead className={th}>{t('movements.table.ref')}</TableHead>
                  <TableHead className={`${th} hidden sm:table-cell`}>{t('movements.table.dateTime')}</TableHead>
                  <TableHead className={th}>{t('movements.table.cargo')}</TableHead>
                  <TableHead className={th}>{t('movements.table.type')}</TableHead>
                  <TableHead className={`${th} hidden md:table-cell`}>{t('movements.table.from')}</TableHead>
                  <TableHead className={`${th} hidden md:table-cell`}>{t('movements.table.to')}</TableHead>
                  <TableHead className={`${th} hidden lg:table-cell`}>{t('movements.table.equipment')}</TableHead>
                  <TableHead className={`${th} hidden xl:table-cell`}>{t('movements.table.operator')}</TableHead>
                  <TableHead className={`${th} hidden lg:table-cell`}>{t('movements.table.weight')}</TableHead>
                  <TableHead className={`${th} hidden xl:table-cell`}>{t('movements.table.remarks')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (<TableRow key={i} className={`${rb} hover:bg-transparent`}>{Array.from({ length: 10 }).map((_, j) => <TableCell key={j} className="py-3"><Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-100" /></TableCell>)}</TableRow>))
                  : movements.length === 0
                    ? <TableRow className={`${rb} hover:bg-transparent`}><TableCell colSpan={10} className="text-center py-8 dark:text-slate-500 text-slate-400">{t('movements.noMovementsFound')}</TableCell></TableRow>
                    : movements.map((m) => (
                      <TableRow key={m.id} className={`${rb} ${rh}`}>
                        <TableCell className={`${tc} font-mono text-amber-400/80`}>{m.movementRef}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden sm:table-cell`}>{new Date(m.createdAt).toLocaleDateString()} {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                        <TableCell className={`${tc} font-mono dark:text-slate-300 text-slate-700`}>{m.cargoCode}</TableCell>
                        <TableCell className={tc}><Badge variant="outline" className={`text-[10px] ${typeStyles[m.type]}`}>{translateMovementType(m.type)}</Badge></TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden md:table-cell`}>{m.fromLocation?.code || '—'}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden md:table-cell`}>{m.toLocation?.code || '—'}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden lg:table-cell`}>{m.equipmentUsed || '—'}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden xl:table-cell`}>{m.operatorName || '—'}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-400 text-slate-500 hidden lg:table-cell`}>{m.actualWeight ? `${m.actualWeight.toLocaleString()} kg` : '—'}</TableCell>
                        <TableCell className={`${tc} dark:text-slate-500 text-slate-400 hidden xl:table-cell max-w-[150px] truncate`}>{m.remarks || '—'}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAdd} onOpenChange={(open) => { if (!open) { setShowAdd(false); setForm(emptyForm); } }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-h-[90vh] overflow-y-auto max-w-lg">
          <DialogHeader><DialogTitle className="dark:text-slate-100 text-slate-900">{t('movements.recordNewMovement')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.cargoItem')}</Label>
              <Select value={form.cargoItemId} onValueChange={(v) => setForm({ ...form, cargoItemId: v })}>
                <SelectTrigger className={ic}><SelectValue placeholder={t('movements.form.cargoPlaceholder')} /></SelectTrigger>
                <SelectContent className={`${sc} max-h-60`}>{cargoItems.map((c) => <SelectItem key={c.id} value={c.id} className={si}><span className="font-mono text-amber-400">{c.cargoCode}</span> — {c.description}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.movementType')}</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}><SelectTrigger className={ic}><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className={sc}>{movementTypes.map((mt) => <SelectItem key={mt} value={mt} className={si}>{translateMovementType(mt)}</SelectItem>)}</SelectContent></Select></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.liftMethod')}</Label><Input value={form.liftMethod} onChange={(e) => setForm({ ...form, liftMethod: e.target.value })} className={ic} placeholder={t('movements.form.liftMethodPlaceholder')} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.fromLocation')}</Label>
                <Select value={form.fromLocationId} onValueChange={(v) => setForm({ ...form, fromLocationId: v })}><SelectTrigger className={ic}><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className={sc}><SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>{locations.map((l) => <SelectItem key={l.id} value={l.id} className={si}>{l.code} — {l.name}</SelectItem>)}</SelectContent></Select></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.toLocation')}</Label>
                <Select value={form.toLocationId} onValueChange={(v) => setForm({ ...form, toLocationId: v })}><SelectTrigger className={ic}><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className={sc}><SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>{locations.map((l) => <SelectItem key={l.id} value={l.id} className={si}>{l.code} — {l.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.equipmentUsed')}</Label>
                <Select value={form.equipmentUsed} onValueChange={(v) => setForm({ ...form, equipmentUsed: v })}><SelectTrigger className={ic}><SelectValue placeholder={t('common.select')} /></SelectTrigger><SelectContent className={sc}><SelectItem value="NONE" className="dark:text-slate-500 text-slate-400 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>{equipment.map((eq) => <SelectItem key={eq.id} value={eq.equipmentCode} className={si}>{eq.equipmentCode} — {eq.name}</SelectItem>)}</SelectContent></Select></div>
              <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.operatorName')}</Label><Input value={form.operatorName} onChange={(e) => setForm({ ...form, operatorName: e.target.value })} className={ic} /></div>
            </div>
            <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.actualWeight')}</Label><Input type="number" value={form.actualWeight} onChange={(e) => setForm({ ...form, actualWeight: e.target.value })} className={ic} /></div>
            <div><Label className="dark:text-slate-400 text-slate-500">{t('movements.form.remarks')}</Label><Textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className={ic + ' min-h-[60px]'} placeholder={t('movements.form.remarksPlaceholder')} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setForm(emptyForm); }} className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100">{t('common.cancel')}</Button>
            <Button onClick={handleSubmit} disabled={submitting || !form.cargoItemId || !form.type} className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              {submitting ? t('common.recording') : t('movements.recordMovement')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
