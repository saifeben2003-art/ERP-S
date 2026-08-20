'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus, Search, Pencil, Eye, Trash2, ArrowRight, MapPin, Package, Weight, Move,
  CheckCircle2, Clock, Truck, Warehouse, CircleDot, ChevronLeft, ChevronRight,
  Loader2, X, Camera, Image as ImageIcon, FileText, Download, Upload, Box,
  Printer, QrCode, ClipboardList, Ruler, AlertTriangle, PackageSearch,
  ArrowDown, Play, Check, MoreHorizontal, Tags, Tag, FileCheck, FileSpreadsheet,
  FileBadge, Sparkles, Award, Ship, Plane, ArrowRightLeft, RefreshCw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
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
import {
  useTranslation, translateStatus, translateCategory, translateCommodity, translateMovementType,
} from '@/lib/translations';
import type {
  CargoItem, LiftCategory, CommodityType, CargoStatus, Location, Project, Movement,
} from '@/types/wms';

// ==================== STYLE MAPS ====================

const safeStatusStyle = (s: string) => (statusStyles as Record<string, string>)[s] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';
const safeCategoryStyle = (c: string) => (categoryStyles as Record<string, string>)[c] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';

const statusStyles: Record<CargoStatus, string> = {
  IN_YARD: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
  IN_TRANSIT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  DISPATCHED: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  RECEIVED: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  IN_WAREHOUSE: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  DELIVERED: 'bg-slate-400/10 text-slate-500 dark:text-slate-500 border-slate-400/20',
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
  HEAVY_LIFT: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  OVERSIZE: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  STANDARD: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  PROJECT_CARGO: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

const movementTypeStyles: Record<string, string> = {
  RECEIVE: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  MOVE: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  DISPATCH: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  INSPECT: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

// ==================== INTERFACES ====================

interface CargoListResponse {
  items: CargoItem[];
  total: number;
  page: number;
  totalPages: number;
}

interface CargoDetail extends CargoItem {
  movements?: Movement[];
}

// ==================== WEIGHT CATEGORIES ====================

interface WeightCategory {
  label: string;
  maxTonnes: number;
  color: string;
  colorDark: string;
}

const WEIGHT_CATEGORIES: WeightCategory[] = [
  { label: 'Light', maxTonnes: 5, color: 'bg-emerald-400', colorDark: 'bg-emerald-500' },
  { label: 'Medium', maxTonnes: 50, color: 'bg-amber-400', colorDark: 'bg-amber-500' },
  { label: 'Heavy', maxTonnes: 200, color: 'bg-orange-500', colorDark: 'bg-orange-500' },
  { label: 'Super Heavy', maxTonnes: 500, color: 'bg-red-500', colorDark: 'bg-red-500' },
];

function getWeightCategory(weightKg: number): WeightCategory {
  const tonnes = weightKg / 1000;
  for (let i = WEIGHT_CATEGORIES.length - 1; i >= 0; i--) {
    if (tonnes > WEIGHT_CATEGORIES[i].maxTonnes) {
      return { ...WEIGHT_CATEGORIES[i] };
    }
  }
  return WEIGHT_CATEGORIES[0];
}

function getWeightPercentage(weightKg: number): number {
  const tonnes = weightKg / 1000;
  return Math.min(100, (tonnes / 500) * 100);
}

// ==================== FORM DEFAULT ====================

const emptyForm = {
  description: '', weight: '', length: '', width: '', height: '',
  liftCategory: '' as string, commodityType: '' as string,
  specialHandling: '', clientName: '', poReference: '', blReference: '',
  centerOfGravity: '', liftingPoints: '', projectId: '',
};

// ==================== MAIN COMPONENT ====================

export function CargoPage() {
  const [error, setError] = useState<string | null>(null);
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
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Detail sheet state
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailCargo, setDetailCargo] = useState<CargoDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [assigningLocation, setAssigningLocation] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const [transferRemarks, setTransferRemarks] = useState('');
  const [transferring, setTransferring] = useState(false);

  const portLabels: Record<string, string> = {
    container: 'الحاوية',
    seal: 'الختم',
    customs: 'الجمارك',
    vessel: 'السفينة',
    voyage: 'الرحلة',
    flight: 'الرحلة الجوية',
    transportMode: 'طريقة النقل',
    arrival: 'تاريخ الوصول',
    storageDays: 'أيام التخزين',
    barcode: 'الباركود',
    type: 'النوع',
    'customs.NOT_SUBMITTED': 'لم يقدم',
    'customs.PENDING': 'قيد المراجعة',
    'customs.CLEARED': 'مخلص',
    'customs.REJECTED': 'مرفوض',
    'customs.ON_HOLD': 'معلق',
  };

  const { t } = useTranslation();

  // ==================== API CALLS ====================

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
      if (!res.ok) { setCargo([]); return; }
      const json = await res.json().catch(() => null);
      if (!json || typeof json !== 'object') { setCargo([]); return; }
      const items = Array.isArray(json.items) ? json.items : [];
      setCargo(items);
      setTotalPages(typeof json.totalPages === 'number' ? json.totalPages : 1);
    } catch (e) { console.error('fetchCargo error:', e); toast.error(t('cargo.toast.fetchFailed')); } finally { setLoading(false); }
  }, [page, search, statusFilter, categoryFilter, commodityFilter, t]);

  const fetchLookups = useCallback(async () => {
    try {
      const [locRes, projRes] = await Promise.all([
        fetch('/api/locations?limit=100'),
        fetch('/api/projects?limit=100'),
      ]);
      const locJson = await locRes.json().catch(() => ({ items: [] }));
      const projJson = await projRes.json().catch(() => ({ items: [] }));
      setLocations(Array.isArray(locJson?.items) ? locJson.items : []);
      setProjects(Array.isArray(projJson?.items) ? projJson.items : []);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchCargo(); }, [fetchCargo]);
  useEffect(() => { fetchLookups(); }, [fetchLookups]);
  useEffect(() => { setPage(1); setSelectedRows(new Set()); }, [search, statusFilter, categoryFilter, commodityFilter]);

  // ==================== CRUD HANDLERS ====================

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, unknown> = {
      description: form.description,
      weight: parseFloat(form.weight) || 0,
      length: parseFloat(form.length) || 0,
      width: parseFloat(form.width) || 0,
      height: parseFloat(form.height) || 0,
      liftCategory: form.liftCategory,
      commodityType: form.commodityType,
      specialHandling: form.specialHandling || null,
      clientName: form.clientName || null,
      poReference: form.poReference || null,
      blReference: form.blReference || null,
      centerOfGravity: form.centerOfGravity || null,
      liftingPoints: form.liftingPoints ? parseInt(form.liftingPoints) : null,
      projectId: form.projectId && form.projectId !== '_none' ? form.projectId : null,
    };
    try {
      const url = editing ? `/api/cargo/${editing.id}` : '/api/cargo';
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(editing ? t('cargo.toast.updated') : t('cargo.toast.created'));
      setShowAdd(false); setEditing(null); setForm(emptyForm); fetchCargo();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('cargo.toast.saveFailed'));
    } finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await fetch(`/api/cargo/${deleting.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('cargo.toast.deleted'));
      setDeleting(null);
      fetchCargo();
    } catch { toast.error(t('cargo.toast.deleteFailed')); }
  };

  const openEdit = (item: CargoItem) => {
    setEditing(item);
    setForm({
      description: item.description, weight: String(item.weight),
      length: String(item.length), width: String(item.width),
      height: String(item.height), liftCategory: item.liftCategory,
      commodityType: item.commodityType,
      specialHandling: item.specialHandling || '',
      clientName: item.clientName || '',
      poReference: item.poReference || '',
      blReference: item.blReference || '',
      centerOfGravity: item.centerOfGravity || '',
      liftingPoints: item.liftingPoints ? String(item.liftingPoints) : '',
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
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('detail.statusChanged'));
      openDetail(detailCargo);
      fetchCargo();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('detail.statusChangeFailed'));
    } finally { setStatusChanging(false); }
  };

  const handleAssignLocation = async () => {
    if (!detailCargo || !selectedLocationId) return;
    setAssigningLocation(true);
    try {
      const res = await fetch(`/api/cargo/${detailCargo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: selectedLocationId }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('detail.locationAssigned'));
      openDetail(detailCargo);
      fetchCargo();
    } catch { toast.error(t('detail.statusChangeFailed')); } finally { setAssigningLocation(false); }
  };

  const handleTransfer = async () => {
    if (!detailCargo || !transferTo) return;
    setTransferring(true);
    try {
      const res = await fetch(`/api/cargo/${detailCargo.id}/transfer`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toLocationId: transferTo, remarks: transferRemarks || undefined }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Transfer failed');
      }
      toast.success('تم نقل البضاعة بنجاح');
      setShowTransfer(false);
      setTransferTo('');
      setTransferRemarks('');
      openDetail(detailCargo);
      fetchCargo();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'فشل النقل');
    } finally { setTransferring(false); }
  };

  // ==================== SELECTION LOGIC ====================

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === cargo.length && cargo.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(cargo.map(c => c.id)));
    }
  };

  const isAllSelected = Array.isArray(cargo) && cargo.length > 0 && selectedRows.size === cargo.length;

  // ==================== COMPUTED ====================

  const currentStep = detailCargo ? ALL_STATUSES.indexOf(detailCargo.status as CargoStatus) : -1;

  const weightCat = useMemo(() => {
    if (!detailCargo) return null;
    return getWeightCategory(detailCargo.weight);
  }, [detailCargo]);

  const weightPct = useMemo(() => {
    if (!detailCargo) return 0;
    return getWeightPercentage(detailCargo.weight);
  }, [detailCargo]);

  // ==================== RENDER ====================

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto" />
          <p className="text-sm dark:text-slate-300 text-slate-700">{error}</p>
          <Button variant="outline" onClick={() => { setError(null); fetchCargo(); }}>
            <RefreshCw className="h-4 w-4 ml-2" />
            {t('common.refresh')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('cargo.title')}</h1>
          <p className="text-sm dark:text-slate-400 text-slate-500 mt-1">{t('cargo.subtitle')}</p>
        </div>
        <Button
          onClick={() => { setForm(emptyForm); setShowAdd(true); }}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 ml-2" />
          {t('cargo.addCargo')}
        </Button>
      </div>

      {/* ===== FILTERS ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 dark:text-slate-500 text-slate-400" />
              <Input
                placeholder={t('cargo.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 pr-9 placeholder:dark:text-slate-600 placeholder:text-slate-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700">
                <SelectValue placeholder={t('common.allStatuses')} />
              </SelectTrigger>
              <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="dark:text-slate-300 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                    {translateStatus(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700">
                <SelectValue placeholder={t('common.allCategories')} />
              </SelectTrigger>
              <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                {['HEAVY_LIFT', 'OVERSIZE', 'STANDARD', 'PROJECT_CARGO'].map((c) => (
                  <SelectItem key={c} value={c} className="dark:text-slate-300 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                    {translateCategory(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={commodityFilter} onValueChange={setCommodityFilter}>
              <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700">
                <SelectValue placeholder={t('common.allCommodities')} />
              </SelectTrigger>
              <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                {['GENERAL', 'MACHINERY', 'STEEL', 'EQUIPMENT', 'MODULE'].map((c) => (
                  <SelectItem key={c} value={c} className="dark:text-slate-300 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                    {translateCommodity(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ===== TABLE ===== */}
      <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white shadow-sm">
        <CardContent className="p-0">
          {/* Bulk actions bar */}
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5 border-b dark:border-slate-800 border-slate-200 dark:bg-slate-800/50 bg-slate-50 dark:text-slate-300 text-slate-600 text-sm">
              <span className="font-medium">{selectedRows.size} {t('common.selected')}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-800 dark:hover:bg-slate-700 hover:bg-slate-100 transition-all duration-200">
                <CheckCircle2 className="h-3.5 w-3.5 ml-1" />
                {t('common.changeStatus')}
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs dark:text-slate-400 text-slate-500 dark:hover:text-red-400 hover:text-red-600 dark:hover:bg-slate-700 hover:bg-slate-100 transition-all duration-200">
                <Trash2 className="h-3.5 w-3.5 ml-1" />
                {t('common.delete')}
              </Button>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                  <TableHead className="w-10">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleAll}
                      className="dark:border-slate-600 border-slate-300"
                    />
                  </TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500">{t('cargo.table.code')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500">{t('cargo.table.description')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500 hidden md:table-cell">{t('cargo.table.weight')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500 hidden lg:table-cell">{t('cargo.table.category')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500">{t('cargo.table.status')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500 hidden lg:table-cell">{t('cargo.table.location')}</TableHead>
                  <TableHead className="text-xs dark:text-slate-500 text-slate-500 text-left">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                      <TableCell><Skeleton className="h-4 w-4 dark:bg-slate-800 bg-slate-200" /></TableCell>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j} className="py-3"><Skeleton className="h-4 w-16 dark:bg-slate-800 bg-slate-200" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : cargo.length === 0 ? (
                  <TableRow className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                    <TableCell colSpan={8} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-14 w-14 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center">
                          <PackageSearch className="h-7 w-7 dark:text-slate-600 text-slate-400" />
                        </div>
                        <p className="text-sm dark:text-slate-400 text-slate-500 font-medium">{t('cargo.noCargoFound')}</p>
                        <p className="text-xs dark:text-slate-600 text-slate-400 max-w-xs">
                          {t('cargo.searchPlaceholder')}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  cargo.map((item) => (
                    <TableRow
                      key={item.id}
                      className={`dark:border-slate-800 border-slate-200 cursor-pointer transition-all duration-200 group ${
                        selectedRows.has(item.id)
                          ? 'dark:bg-amber-500/5 bg-amber-50'
                          : 'dark:hover:bg-slate-800/50 hover:bg-slate-50'
                      }`}
                      onClick={() => openDetail(item)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.has(item.id)}
                          onCheckedChange={() => toggleRow(item.id)}
                          className="dark:border-slate-600 border-slate-300"
                        />
                      </TableCell>
                      <TableCell className="py-3 text-xs font-mono font-semibold dark:text-amber-400/80 text-amber-600">{item.cargoCode}</TableCell>
                      <TableCell className="py-3 text-xs dark:text-slate-300 text-slate-700 max-w-[200px] truncate group-hover:dark:text-slate-100 group-hover:text-slate-900 transition-colors">{item.description}</TableCell>
                      <TableCell className="py-3 text-xs dark:text-slate-400 text-slate-500 hidden md:table-cell font-mono">{item.weight.toLocaleString()} kg</TableCell>
                      <TableCell className="py-3 hidden lg:table-cell">
                        <Badge variant="outline" className={`text-[10px] ${safeCategoryStyle(item.liftCategory)}`}>{translateCategory(item.liftCategory)}</Badge>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className={`text-[10px] ${safeStatusStyle(item.status)}`}>{translateStatus(item.status)}</Badge>
                      </TableCell>
                      <TableCell className="py-3 text-xs dark:text-slate-400 text-slate-500 hidden lg:table-cell">{item.location?.code || '—'}</TableCell>
                      <TableCell className="py-3 text-left" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-start gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-cyan-400 hover:text-cyan-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200" onClick={() => openDetail(item)}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-amber-400 hover:text-amber-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200" onClick={() => openEdit(item)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-red-400 hover:text-red-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200" onClick={() => setDeleting(item)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}
            className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700 dark:hover:bg-slate-700 hover:bg-slate-100 transition-all duration-200">
            {t('common.previous')}
          </Button>
          <span className="text-xs dark:text-slate-500 text-slate-400 px-2">
            {t('common.page')} {page} {t('common.of')} {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}
            className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700 dark:hover:bg-slate-700 hover:bg-slate-100 transition-all duration-200">
            {t('common.next')}
          </Button>
        </div>
      )}

      {/* ============================================ */}
      {/* ===== ENHANCED CARGO DETAIL SHEET =========== */}
      {/* ============================================ */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-[560px] dark:border-slate-700 border-slate-200 dark:bg-slate-950 bg-slate-50 p-0 overflow-hidden flex flex-col z-[100]"
        >
          {detailLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="text-xs dark:text-slate-500 text-slate-400">{t('common.loading')}</p>
              </div>
            </div>
          ) : detailCargo ? (
            <>
              {/* ===== DETAIL HEADER ===== */}
              <SheetHeader className="p-5 border-b dark:border-slate-800 border-slate-200 dark:bg-slate-900/80 bg-white shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <SheetTitle className="text-base font-mono font-bold dark:text-amber-400 text-amber-600">
                        {detailCargo.cargoCode}
                      </SheetTitle>
                      <Badge variant="outline" className={`text-[10px] ${safeStatusStyle(detailCargo.status)}`}>
                        {translateStatus(detailCargo.status)}
                      </Badge>
                    </div>
                    <p className="text-sm dark:text-slate-200 text-slate-800 mt-1.5 font-medium leading-relaxed line-clamp-2">
                      {detailCargo.description}
                    </p>
                    <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">
                      {new Date(detailCargo.createdAt).toLocaleDateString()} {new Date(detailCargo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600 dark:hover:bg-slate-800 hover:bg-amber-50 transition-all duration-200"
                      onClick={() => { openEdit(detailCargo); }}
                      title={t('common.edit')}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-cyan-400 hover:text-cyan-600 dark:hover:bg-slate-800 hover:bg-cyan-50 transition-all duration-200"
                      onClick={() => { /* print - UI only */ }}
                      title={t('common.print')}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200"
                      onClick={() => setDetailOpen(false)}
                      title={t('common.close')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              {/* ===== DETAIL SCROLL CONTENT ===== */}
              <ScrollArea className="flex-1">
                <div className="p-5 space-y-5">

                  {/* ===== PHOTOS / ATTACHMENTS SECTION ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5">
                        <Camera className="h-3.5 w-3.5 dark:text-amber-400 text-amber-500" />
                        {t('detail.photos.title') || 'Photos & Attachments'}
                      </h3>
                      <span className="text-[10px] dark:text-slate-500 text-slate-400">4 files</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[4/3] rounded-lg dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-200 flex flex-col items-center justify-center gap-2 group cursor-pointer transition-all duration-200 hover:dark:border-amber-500/30 hover:border-amber-400/30 hover:shadow-sm"
                        >
                          <ImageIcon className="h-6 w-6 dark:text-slate-600 text-slate-400 group-hover:dark:text-amber-400/60 group-hover:text-amber-400/60 transition-colors" />
                          <span className="text-[10px] dark:text-slate-500 text-slate-400 group-hover:dark:text-slate-400 group-hover:text-slate-500 transition-colors">
                            Photo {idx}
                          </span>
                          <div className="absolute inset-0 rounded-lg dark:bg-slate-900/60 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                            <Eye className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      ))}
                      <button
                        className="relative aspect-[4/3] rounded-lg border-2 border-dashed dark:border-slate-700 border-slate-300 dark:bg-slate-800/50 bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:dark:border-amber-500/40 hover:border-amber-400/40 hover:dark:bg-amber-500/5 hover:bg-amber-50 group"
                      >
                        <Upload className="h-5 w-5 dark:text-slate-500 text-slate-400 group-hover:dark:text-amber-400 group-hover:text-amber-500 transition-colors" />
                        <span className="text-[10px] dark:text-slate-500 text-slate-400 group-hover:dark:text-amber-400/80 group-hover:text-amber-500/80 transition-colors font-medium">
                          {t('detail.photos.upload') || 'Upload'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ===== DOCUMENTS SECTION ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <FileText className="h-3.5 w-3.5 dark:text-cyan-400 text-cyan-500" />
                      {t('detail.documents.title') || 'Documents'}
                    </h3>
                    <div className="space-y-2">
                      {[
                        { name: t('detail.documents.bl') || 'Bill of Lading', icon: FileBadge, color: 'dark:text-blue-400 text-blue-500' },
                        { name: t('detail.documents.po') || 'Purchase Order', icon: FileSpreadsheet, color: 'dark:text-emerald-400 text-emerald-500' },
                        { name: t('detail.documents.inspection') || 'Inspection Report', icon: FileCheck, color: 'dark:text-purple-400 text-purple-500' },
                        { name: t('detail.documents.certificate') || 'Certificate', icon: Award, color: 'dark:text-amber-400 text-amber-500' },
                      ].map((doc) => {
                        const DocIcon = doc.icon;
                        return (
                          <div
                            key={doc.name}
                            className="flex items-center justify-between p-2.5 rounded-lg dark:bg-slate-800/60 bg-slate-50 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded-lg dark:bg-slate-700 bg-white flex items-center justify-center shadow-sm">
                                <DocIcon className={`h-4 w-4 ${doc.color}`} />
                              </div>
                              <div>
                                <p className="text-xs font-medium dark:text-slate-200 text-slate-700 group-hover:dark:text-slate-100 group-hover:text-slate-900 transition-colors">{doc.name}</p>
                                <p className="text-[10px] dark:text-slate-500 text-slate-400">PDF • 2.4 MB</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 dark:text-slate-500 text-slate-400 dark:hover:text-cyan-400 hover:text-cyan-600 dark:hover:bg-slate-700 hover:bg-cyan-50 transition-all duration-200"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ===== QUICK ACTIONS PANEL ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Sparkles className="h-3.5 w-3.5 dark:text-amber-400 text-amber-500" />
                      {t('detail.quickActions') || 'Quick Actions'}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setShowTransfer(true)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl dark:bg-slate-800/60 bg-slate-50 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200 group cursor-pointer border dark:border-transparent border-slate-200 dark:hover:border-amber-500/20 hover:border-amber-400/30"
                      >
                        <div className="h-9 w-9 rounded-lg dark:bg-emerald-500/10 bg-emerald-50 flex items-center justify-center group-hover:dark:bg-emerald-500/20 group-hover:bg-emerald-100 transition-colors">
                          <ArrowRightLeft className="h-4 w-4 dark:text-emerald-400 text-emerald-600" />
                        </div>
                        <span className="text-[10px] font-medium dark:text-slate-300 text-slate-600 text-center leading-tight">نقل الموقع</span>
                      </button>
                      <button
                        className="flex flex-col items-center gap-2 p-3 rounded-xl dark:bg-slate-800/60 bg-slate-50 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200 group cursor-pointer border dark:border-transparent border-slate-200 dark:hover:border-amber-500/20 hover:border-amber-400/30"
                      >
                        <div className="h-9 w-9 rounded-lg dark:bg-cyan-500/10 bg-cyan-50 flex items-center justify-center group-hover:dark:bg-cyan-500/20 group-hover:bg-cyan-100 transition-colors">
                          <Printer className="h-4 w-4 dark:text-cyan-400 text-cyan-600" />
                        </div>
                        <span className="text-[10px] font-medium dark:text-slate-300 text-slate-600 text-center leading-tight">
                          {t('detail.quickActions.printLabel') || 'Print Label'}
                        </span>
                      </button>
                      <button
                        className="flex flex-col items-center gap-2 p-3 rounded-xl dark:bg-slate-800/60 bg-slate-50 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200 group cursor-pointer border dark:border-transparent border-slate-200 dark:hover:border-amber-500/20 hover:border-amber-400/30"
                      >
                        <div className="h-9 w-9 rounded-lg dark:bg-purple-500/10 bg-purple-50 flex items-center justify-center group-hover:dark:bg-purple-500/20 group-hover:bg-purple-100 transition-colors">
                          <QrCode className="h-4 w-4 dark:text-purple-400 text-purple-600" />
                        </div>
                        <span className="text-[10px] font-medium dark:text-slate-300 text-slate-600 text-center leading-tight">
                          {t('detail.quickActions.generateQR') || 'Generate QR'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ===== STATUS WORKFLOW STEPPER ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 mb-4 flex items-center gap-1.5">
                      <Play className="h-3.5 w-3.5 dark:text-amber-400 text-amber-500" />
                      {t('detail.workflow.title')}
                    </h3>
                    <div className="flex items-center gap-0 overflow-x-auto pb-1">
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
                              className={`flex flex-col items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 min-w-[64px] relative ${
                                isCurrent
                                  ? 'dark:bg-amber-500/15 bg-amber-50 ring-2 ring-amber-500/40 shadow-sm shadow-amber-500/10'
                                  : isCompleted
                                    ? 'dark:bg-emerald-500/10 bg-emerald-50 opacity-70'
                                    : isNext
                                      ? 'dark:bg-slate-800/80 bg-slate-50 dark:hover:bg-slate-700 hover:bg-slate-100 cursor-pointer hover:shadow-sm transition-all duration-200'
                                      : 'opacity-25'
                              }`}
                            >
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isCurrent
                                  ? 'dark:bg-amber-500/20 bg-amber-100'
                                  : isCompleted
                                    ? 'dark:bg-emerald-500/20 bg-emerald-100'
                                    : 'dark:bg-slate-700/50 bg-slate-100'
                              }`}>
                                {isCompleted && !isCurrent ? (
                                  <Check className="h-4 w-4 dark:text-emerald-400 text-emerald-600" />
                                ) : (
                                  <Icon className={`h-4 w-4 ${
                                    isCurrent ? 'dark:text-amber-400 text-amber-600' :
                                    isNext ? 'dark:text-slate-400 text-slate-500' :
                                    'dark:text-slate-600 text-slate-400'
                                  }`} />
                                )}
                              </div>
                              <span className={`text-[9px] leading-tight text-center font-medium ${
                                isCurrent
                                  ? 'dark:text-amber-400 text-amber-600'
                                  : isCompleted
                                    ? 'dark:text-emerald-400 text-emerald-600'
                                    : isNext
                                      ? 'dark:text-slate-400 text-slate-500'
                                      : 'dark:text-slate-600 text-slate-400'
                              }`}>
                                {translateStatus(s)}
                              </span>
                              {isNext && (
                                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full dark:bg-amber-500 bg-amber-400 flex items-center justify-center">
                                  <ArrowDown className="h-2 w-2 dark:text-slate-900 text-white" />
                                </span>
                              )}
                            </button>
                            {idx < ALL_STATUSES.length - 1 && (
                              <div className="flex items-center mx-1">
                                <div className={`h-0.5 w-4 rounded-full transition-all duration-500 ${
                                  idx < currentStep
                                    ? 'dark:bg-emerald-500/60 bg-emerald-400'
                                    : idx === currentStep
                                      ? 'dark:bg-amber-500/40 bg-amber-300'
                                      : 'dark:bg-slate-700 bg-slate-200'
                                }`} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ===== SPECIFICATIONS ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Tag className="h-3.5 w-3.5 dark:text-cyan-400 text-cyan-500" />
                      {t('detail.info.specifications')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.weight')}</span>
                        <p className="dark:text-slate-100 text-slate-900 font-semibold mt-0.5">{detailCargo.weight.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.category')}</span>
                        <div className="mt-1">
                          <Badge variant="outline" className={`text-[10px] ${safeCategoryStyle(detailCargo.liftCategory)}`}>
                            {translateCategory(detailCargo.liftCategory)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.commodity')}</span>
                        <p className="dark:text-slate-100 text-slate-900 mt-0.5">{translateCommodity(detailCargo.commodityType)}</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.liftingPoints')}</span>
                        <p className="dark:text-slate-100 text-slate-900 mt-0.5">{detailCargo.liftingPoints ?? '—'}</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.cog')}</span>
                        <p className="dark:text-slate-200 text-slate-800 mt-0.5 text-xs">{detailCargo.centerOfGravity || '—'}</p>
                      </div>
                      {detailCargo.volume && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{t('detail.info.volume')}</span>
                          <p className="dark:text-slate-100 text-slate-900 mt-0.5">{detailCargo.volume.toFixed(1)} m³</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ===== WEIGHT VISUALIZATION ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Weight className="h-3.5 w-3.5 dark:text-red-400 text-red-500" />
                      {t('common.weight')} Visualization
                    </h3>
                    {weightCat && (
                      <div className="space-y-3">
                        {/* Weight category badge */}
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-[10px] font-semibold ${
                            weightCat.colorDark === 'bg-emerald-500' ? 'dark:text-emerald-400 text-emerald-600 border-emerald-500/20 bg-emerald-500/10' :
                            weightCat.colorDark === 'bg-amber-500' ? 'dark:text-amber-400 text-amber-600 border-amber-500/20 bg-amber-500/10' :
                            weightCat.colorDark === 'bg-orange-500' ? 'dark:text-orange-400 text-orange-600 border-orange-500/20 bg-orange-500/10' :
                            'dark:text-red-400 text-red-600 border-red-500/20 bg-red-500/10'
                          }`}>
                            {weightCat.label}
                          </Badge>
                          <span className="text-xs dark:text-slate-400 text-slate-500">
                            {(detailCargo.weight / 1000).toFixed(1)} tonnes
                          </span>
                        </div>

                        {/* Visual bar */}
                        <div className="relative">
                          <div className="flex gap-0.5 h-3 rounded-full overflow-hidden dark:bg-slate-800 bg-slate-100">
                            {WEIGHT_CATEGORIES.map((cat, idx) => {
                              const catStart = idx === 0 ? 0 : WEIGHT_CATEGORIES.slice(0, idx).reduce((acc, c) => acc + c.maxTonnes, 0);
                              const catEnd = catStart + cat.maxTonnes;
                              const catPct = (cat.maxTonnes / 500) * 100;
                              const fillStart = Math.max(0, (weightPct - (catStart / 500) * 100));
                              const fillPct = Math.min(catPct, Math.max(0, fillStart));

                              return (
                                <div
                                  key={cat.label}
                                  className={`h-full relative ${idx === 0 ? 'rounded-l-full' : ''} ${idx === WEIGHT_CATEGORIES.length - 1 ? 'rounded-r-full' : ''}`}
                                  style={{ width: `${catPct}%` }}
                                >
                                  <div className="absolute inset-0 dark:bg-slate-700 bg-slate-200" />
                                  {weightPct > (catStart / 500) * 100 && (
                                    <div
                                      className={`absolute top-0 left-0 h-full ${cat.colorDark} dark:opacity-80 opacity-60 transition-all duration-700`}
                                      style={{ width: `${Math.min(100, fillPct / catPct * 100)}%` }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {/* Category labels */}
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[9px] dark:text-slate-600 text-slate-400">0t</span>
                            <span className="text-[9px] dark:text-slate-600 text-slate-400">5t</span>
                            <span className="text-[9px] dark:text-slate-600 text-slate-400">50t</span>
                            <span className="text-[9px] dark:text-slate-600 text-slate-400">200t</span>
                            <span className="text-[9px] dark:text-slate-600 text-slate-400">500t+</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ===== DIMENSIONS VISUALIZATION ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Ruler className="h-3.5 w-3.5 dark:text-purple-400 text-purple-500" />
                      {t('common.dimensions')}
                    </h3>
                    <div className="flex items-center gap-5">
                      {/* 3D Box visual */}
                      <div className="relative h-20 w-20 shrink-0">
                        {/* Back face */}
                        <div className="absolute top-1 left-1 h-14 w-14 dark:bg-slate-700 bg-slate-300 rounded-sm border dark:border-slate-600 border-slate-300" />
                        {/* Top face */}
                        <div className="absolute top-0 left-3 h-14 w-14 dark:bg-slate-600 bg-slate-400 rounded-sm border dark:border-slate-500 border-slate-400 transform -skew-x-12 origin-bottom-left" />
                        {/* Front face */}
                        <div className="absolute top-3 left-0 h-14 w-14 dark:bg-amber-500/20 bg-amber-100 rounded-sm border dark:border-amber-500/40 border-amber-400/60" />
                        {/* Labels on front face */}
                        <div className="absolute top-3 left-0 h-14 w-14 flex items-center justify-center">
                          <Box className="h-6 w-6 dark:text-amber-400/60 text-amber-500/60" />
                        </div>
                      </div>
                      {/* Dimension values */}
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <div className="text-center p-2 rounded-lg dark:bg-slate-800/60 bg-slate-50">
                          <span className="text-[9px] uppercase font-semibold dark:text-amber-400 text-amber-600 tracking-wider">L</span>
                          <p className="text-sm font-bold dark:text-slate-100 text-slate-900 font-mono mt-0.5">{detailCargo.length}</p>
                          <span className="text-[9px] dark:text-slate-500 text-slate-400">m</span>
                        </div>
                        <div className="text-center p-2 rounded-lg dark:bg-slate-800/60 bg-slate-50">
                          <span className="text-[9px] uppercase font-semibold dark:text-cyan-400 text-cyan-600 tracking-wider">W</span>
                          <p className="text-sm font-bold dark:text-slate-100 text-slate-900 font-mono mt-0.5">{detailCargo.width}</p>
                          <span className="text-[9px] dark:text-slate-500 text-slate-400">m</span>
                        </div>
                        <div className="text-center p-2 rounded-lg dark:bg-slate-800/60 bg-slate-50">
                          <span className="text-[9px] uppercase font-semibold dark:text-purple-400 text-purple-600 tracking-wider">H</span>
                          <p className="text-sm font-bold dark:text-slate-100 text-slate-900 font-mono mt-0.5">{detailCargo.height}</p>
                          <span className="text-[9px] dark:text-slate-500 text-slate-400">m</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-mono dark:text-slate-400 text-slate-500">
                        {detailCargo.length} × {detailCargo.width} × {detailCargo.height} m
                      </p>
                    </div>
                  </div>

                  {/* ===== LOCATION ASSIGNMENT ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3.5 w-3.5 dark:text-emerald-400 text-emerald-500" />
                      {t('detail.assignLocation')}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                        <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 flex-1">
                          <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white max-h-60">
                          {locations.map((l) => (
                            <SelectItem key={l.id} value={l.id} className="dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                              {l.code} — {l.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={handleAssignLocation}
                        disabled={assigningLocation || !selectedLocationId || selectedLocationId === detailCargo.locationId}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-900 shrink-0 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
                      >
                        {assigningLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                      </Button>
                    </div>
                    {detailCargo.location && (
                      <div className="mt-2.5 flex items-center gap-2 p-2 rounded-lg dark:bg-emerald-500/5 bg-emerald-50 dark:border-emerald-500/10 border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5 dark:text-emerald-400 text-emerald-600 shrink-0" />
                        <span className="text-xs dark:text-emerald-300 text-emerald-700">
                          {t('common.location')}: {detailCargo.location.code} — {detailCargo.location.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ===== REFERENCES ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Tags className="h-3.5 w-3.5 dark:text-slate-400 text-slate-500" />
                      {t('detail.info.references')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.project')}</span>
                        <p className="dark:text-slate-100 text-slate-900 mt-0.5">{detailCargo.project?.name || t('cargo.details.unassigned')}</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.client')}</span>
                        <p className="dark:text-slate-100 text-slate-900 mt-0.5">{detailCargo.clientName || '—'}</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.poRef')}</span>
                        <p className="dark:text-slate-200 text-slate-800 font-mono mt-0.5">{detailCargo.poReference || '—'}</p>
                      </div>
                      <div>
                        <span className="dark:text-slate-500 text-slate-400 text-xs">{t('cargo.details.blRef')}</span>
                        <p className="dark:text-slate-200 text-slate-800 font-mono mt-0.5">{detailCargo.blReference || '—'}</p>
                      </div>
                    </div>
                  </div>

                  {/* ===== PORT/AIRPORT INFO ===== */}
                  {(detailCargo.containerNumber || detailCargo.customsStatus || detailCargo.vesselName || detailCargo.transportMode || detailCargo.barcode) && (
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Ship className="h-3.5 w-3.5 dark:text-slate-400 text-slate-500" />
                      {portLabels.transportMode} / معلومات الميناء
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {detailCargo.containerNumber && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.container}{detailCargo.containerType && detailCargo.containerType !== 'NONE' ? ` — ${detailCargo.containerType}` : ''}</span>
                          <p className="dark:text-slate-200 text-slate-800 font-mono mt-0.5">{detailCargo.containerNumber}</p>
                        </div>
                      )}
                      {detailCargo.sealNumber && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.seal}</span>
                          <p className="dark:text-slate-200 text-slate-800 font-mono mt-0.5">{detailCargo.sealNumber}</p>
                        </div>
                      )}
                      {detailCargo.customsStatus && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.customs}</span>
                          <div className="mt-0.5">
                            <Badge className={
                              detailCargo.customsStatus === 'CLEARED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                              detailCargo.customsStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                              detailCargo.customsStatus === 'REJECTED' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                              detailCargo.customsStatus === 'ON_HOLD' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' :
                              'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                            }>
                              {portLabels[`customs.${detailCargo.customsStatus}`] || detailCargo.customsStatus}
                            </Badge>
                          </div>
                        </div>
                      )}
                      {detailCargo.transportMode && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.transportMode}</span>
                          <p className="dark:text-slate-200 text-slate-800 mt-0.5 flex items-center gap-1.5">
                            {detailCargo.transportMode === 'SEA' && <Ship className="h-3.5 w-3.5 dark:text-blue-400 text-blue-600" />}
                            {detailCargo.transportMode === 'AIR' && <Plane className="h-3.5 w-3.5 dark:text-purple-400 text-purple-600" />}
                            {detailCargo.transportMode === 'LAND' && <Truck className="h-3.5 w-3.5 dark:text-amber-400 text-amber-600" />}
                            {detailCargo.transportMode}
                          </p>
                        </div>
                      )}
                      {(detailCargo.vesselName || detailCargo.flightNumber) && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">
                            {detailCargo.transportMode === 'AIR' ? portLabels.flight : portLabels.vessel}
                          </span>
                          <p className="dark:text-slate-200 text-slate-800 mt-0.5">
                            {detailCargo.vesselName}{detailCargo.voyageNumber ? ` — ${detailCargo.voyageNumber}` : ''}
                            {detailCargo.flightNumber ? ` ${detailCargo.flightNumber}` : ''}
                          </p>
                        </div>
                      )}
                      {detailCargo.arrivalDate && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.arrival}</span>
                          <p className="dark:text-slate-200 text-slate-800 mt-0.5">{detailCargo.arrivalDate}</p>
                        </div>
                      )}
                      {detailCargo.storageDays != null && (
                        <div>
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.storageDays}</span>
                          <p className={`mt-0.5 font-semibold ${detailCargo.storageDays > 15 ? 'text-red-600 dark:text-red-400' : 'dark:text-slate-200 text-slate-800'}`}>
                            {detailCargo.storageDays} يوم
                            {detailCargo.storageDays > 15 && (
                              <span className="ml-1 text-[10px] font-normal dark:text-amber-400 text-amber-600">⚠</span>
                            )}
                          </p>
                        </div>
                      )}
                      {detailCargo.barcode && (
                        <div className="col-span-2">
                          <span className="dark:text-slate-500 text-slate-400 text-xs">{portLabels.barcode}</span>
                          <p className="dark:text-slate-200 text-slate-800 font-mono mt-0.5 text-xs">{detailCargo.barcode}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  )}

                  {/* ===== SPECIAL HANDLING ===== */}
                  {detailCargo.specialHandling && (
                    <div className="rounded-xl border dark:border-amber-500/20 border-amber-200 dark:bg-amber-500/5 bg-amber-50 p-4 shadow-sm">
                      <h3 className="text-xs font-semibold dark:text-amber-400 text-amber-600 flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {t('cargo.details.specialHandling')}
                      </h3>
                      <p className="text-xs dark:text-slate-300 text-slate-700 dark:bg-slate-800/50 bg-white rounded-lg p-3 leading-relaxed border dark:border-slate-700 border-slate-200">
                        {detailCargo.specialHandling}
                      </p>
                    </div>
                  )}

                  {/* ===== MOVEMENT TIMELINE ===== */}
                  <div className="rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white p-4 shadow-sm">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-600 flex items-center gap-1.5 mb-3">
                      <Clock className="h-3.5 w-3.5 dark:text-slate-400 text-slate-500" />
                      {t('detail.movementHistory')}
                    </h3>
                    {Array.isArray(detailCargo.movements) && detailCargo.movements.length > 0 ? (
                      <div className="space-y-3">
                        {detailCargo.movements.map((m, idx) => (
                          <div key={m.id} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`h-3 w-3 rounded-full ring-2 ${
                                idx === 0
                                  ? 'dark:bg-amber-400 bg-amber-500 dark:ring-amber-500/30 ring-amber-300'
                                  : 'dark:bg-slate-600 bg-slate-400 dark:ring-slate-800 ring-slate-200'
                              } mt-1`} />
                              {idx < (detailCargo.movements?.length || 0) - 1 && (
                                <div className="w-px flex-1 dark:bg-slate-800 bg-slate-200" />
                              )}
                            </div>
                            <div className="flex-1 pb-3">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <Badge variant="outline" className={`text-[10px] ${movementTypeStyles[m.type] || ''}`}>
                                  {translateMovementType(m.type)}
                                </Badge>
                                <span className="text-[10px] dark:text-slate-500 text-slate-400">
                                  {new Date(m.createdAt).toLocaleDateString()}{' '}
                                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1.5 text-xs dark:text-slate-400 text-slate-500">
                                {m.fromLocation && <span className="font-mono text-[11px]">{m.fromLocation.code}</span>}
                                {m.fromLocation && m.toLocation && <ArrowRight className="h-3 w-3 dark:text-slate-600 text-slate-400" />}
                                {m.toLocation && <span className="font-mono text-[11px]">{m.toLocation.code}</span>}
                              </div>
                              {m.remarks && (
                                <p className="text-[11px] dark:text-slate-500 text-slate-400 mt-1">{m.remarks}</p>
                              )}
                              {(m.operatorName || m.equipmentUsed) && (
                                <div className="flex gap-3 mt-1 text-[10px] dark:text-slate-600 text-slate-400">
                                  {m.operatorName && <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{m.operatorName}</span>}
                                  {m.equipmentUsed && <span className="flex items-center gap-1"><Weight className="h-2.5 w-2.5" />{m.equipmentUsed}</span>}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-6">
                        <div className="h-10 w-10 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center">
                          <Move className="h-5 w-5 dark:text-slate-600 text-slate-400" />
                        </div>
                        <p className="text-xs dark:text-slate-500 text-slate-400 text-center">{t('detail.noMovements')}</p>
                      </div>
                    )}
                  </div>

                  {/* Bottom padding */}
                  <div className="h-2" />
                </div>
              </ScrollArea>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      {/* ===== TRANSFER DIALOG ===== */}
      <Dialog open={showTransfer} onOpenChange={(open) => {
        if (!open) {
          setShowTransfer(false);
          setTransferTo('');
          setTransferRemarks('');
        }
      }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-w-md shadow-xl">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100 text-slate-900">نقل البضاعة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {detailCargo?.location && (
              <div className="rounded-lg dark:bg-slate-800/50 bg-slate-50 p-3">
                <span className="text-xs dark:text-slate-500 text-slate-400">الموقع الحالي</span>
                <p className="text-sm font-medium dark:text-slate-200 text-slate-800 mt-0.5">{detailCargo.location.code} — {detailCargo.location.name}</p>
              </div>
            )}
            <div>
              <Label className="dark:text-slate-400 text-slate-600">الموقع الوجهة</Label>
              <Select value={transferTo} onValueChange={setTransferTo}>
                <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1">
                  <SelectValue placeholder="اختر موقع..." />
                </SelectTrigger>
                <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                  {locations.filter(l => l.id !== detailCargo?.locationId).map((l) => (
                    <SelectItem key={l.id} value={l.id} className="dark:text-slate-200 text-slate-700">{l.code} — {l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">ملاحظات</Label>
              <Textarea value={transferRemarks} onChange={(e) => setTransferRemarks(e.target.value)}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1"
                placeholder="ملاحظات اختيارية..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransfer(false)} className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700">إلغاء</Button>
            <Button onClick={handleTransfer} disabled={!transferTo || transferring} className="bg-amber-500 hover:bg-amber-600 text-slate-900">
              {transferring ? 'جاري النقل...' : 'تأكيد النقل'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== ADD/EDIT DIALOG ===== */}
      <Dialog open={showAdd || !!editing} onOpenChange={(open) => { if (!open) { setShowAdd(false); setEditing(null); setForm(emptyForm); } }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-h-[90vh] overflow-y-auto max-w-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100 text-slate-900">
              {editing ? t('cargo.editCargo') : t('cargo.addNewCargo')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.description')}</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.weight')}</Label>
              <Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.dimensions')}</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input placeholder="L" type="number" value={form.length} onChange={(e) => setForm({ ...form, length: e.target.value })}
                  className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 text-center" />
                <Input placeholder="W" type="number" value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })}
                  className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 text-center" />
                <Input placeholder="H" type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })}
                  className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 text-center" />
              </div>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.liftCategory')}</Label>
              <Select value={form.liftCategory} onValueChange={(v) => setForm({ ...form, liftCategory: v })}>
                <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1">
                  <SelectValue placeholder={t('common.select')} />
                </SelectTrigger>
                <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                  {(['HEAVY_LIFT', 'OVERSIZE', 'STANDARD', 'PROJECT_CARGO'] as LiftCategory[]).map((c) => (
                    <SelectItem key={c} value={c} className="dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                      {translateCategory(c)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.commodityType')}</Label>
              <Select value={form.commodityType} onValueChange={(v) => setForm({ ...form, commodityType: v })}>
                <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1">
                  <SelectValue placeholder={t('common.select')} />
                </SelectTrigger>
                <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                  {(['GENERAL', 'MACHINERY', 'STEEL', 'EQUIPMENT', 'MODULE'] as CommodityType[]).map((c) => (
                    <SelectItem key={c} value={c} className="dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">
                      {translateCommodity(c)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.project')}</Label>
              <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
                <SelectTrigger className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1">
                  <SelectValue placeholder={t('common.none')} />
                </SelectTrigger>
                <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
                  <SelectItem value="_none" className="dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">{t('common.none')}</SelectItem>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="dark:text-slate-200 text-slate-700 dark:focus:bg-slate-700 focus:bg-slate-100">{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.clientName')}</Label>
              <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.poReference')}</Label>
              <Input value={form.poReference} onChange={(e) => setForm({ ...form, poReference: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.blReference')}</Label>
              <Input value={form.blReference} onChange={(e) => setForm({ ...form, blReference: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.centerOfGravity')}</Label>
              <Input value={form.centerOfGravity} onChange={(e) => setForm({ ...form, centerOfGravity: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1"
                placeholder={t('cargo.form.cogPlaceholder')} />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.liftingPoints')}</Label>
              <Input type="number" value={form.liftingPoints} onChange={(e) => setForm({ ...form, liftingPoints: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1"
                placeholder={t('cargo.form.liftingPointsPlaceholder')} />
            </div>
            <div className="sm:col-span-2">
              <Label className="dark:text-slate-400 text-slate-600">{t('cargo.form.specialHandling')}</Label>
              <Textarea value={form.specialHandling} onChange={(e) => setForm({ ...form, specialHandling: e.target.value })}
                className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1 min-h-[80px]"
                placeholder={t('cargo.form.specialHandlingPlaceholder')} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm); }}
              className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSubmit}
              disabled={submitting || !form.description || !form.weight || !form.liftCategory || !form.commodityType}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50">
              {submitting ? t('common.saving') : editing ? t('common.update') : t('common.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DELETE CONFIRMATION ===== */}
      <Dialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-w-md shadow-xl">
          <DialogHeader>
            <DialogTitle className="dark:text-slate-100 text-slate-900">{t('common.confirmDelete')}</DialogTitle>
          </DialogHeader>
          <p className="text-sm dark:text-slate-400 text-slate-500">
            {t('cargo.delete.message')}{' '}
            <span className="dark:text-amber-400 text-amber-600 font-medium">{deleting?.cargoCode}</span>
            {t('cargo.delete.cannotUndo')}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}
              className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-700 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200">
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md">
              {t('common.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
