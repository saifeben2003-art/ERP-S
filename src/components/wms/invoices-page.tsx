'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FileText, DollarSign, AlertCircle, FileEdit, CheckCircle2,
  Plus, Download, Search, Filter, Loader2, ChevronLeft,
  CalendarDays, Building2, Send, CreditCard, X, Trash2,
  FileSpreadsheet, FileType, Printer,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/translations';
import { useAppStore } from '@/lib/store';

// ─── Types (matching API/DB schema) ────────────────────────────────────────
type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';
type InvoiceType = 'STORAGE' | 'HANDLING' | 'CUSTOMS' | 'TRANSPORT' | 'EQUIPMENT' | 'CREDIT_NOTE';
type Branch = 'AUH' | 'DXB' | 'SHJ' | 'AJM' | 'RAK' | 'FJR';
type PaymentTerms = 'IMMEDIATE' | 'NET_15' | 'NET_30' | 'NET_60' | 'NET_90';

interface InvoiceItem {
  id?: string;
  lineNumber: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountPercent?: number;
  lineTotal: number;
}

interface InvoicePayment {
  id: string;
  amount: number;
  method: string;
  reference?: string;
  paymentDate: string;
  notes?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  // Client
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  // Period
  periodStart: string;
  periodEnd: string;
  issueDate: string;
  dueDate: string;
  // Amounts (AED)
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  currency: string;
  // References
  projectId?: string;
  poReference?: string;
  contractRef?: string;
  // Terms
  paymentTerms: PaymentTerms;
  notes?: string;
  branch: Branch;
  // Items & Payments
  items?: InvoiceItem[];
  payments?: InvoicePayment[];
  lineItems?: InvoiceItem[]; // for backward compat with detail sheet
  // Audit
  createdBy: string;
  createdAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────
const STATUS_VARIANT: Record<InvoiceStatus, string> = {
  DRAFT: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20',
  ISSUED: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
  PAID: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  PARTIAL: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
  OVERDUE: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20',
  CANCELLED: 'bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/20',
};

const INVOICE_TYPES: InvoiceType[] = ['STORAGE', 'HANDLING', 'CUSTOMS', 'TRANSPORT', 'EQUIPMENT', 'CREDIT_NOTE'];
const BRANCHES: Branch[] = ['AUH', 'DXB', 'SHJ', 'AJM', 'RAK', 'FJR'];
const PAYMENT_TERMS: PaymentTerms[] = ['IMMEDIATE', 'NET_15', 'NET_30', 'NET_60', 'NET_90'];
const INVOICE_STATUSES: InvoiceStatus[] = ['DRAFT', 'ISSUED', 'PAID', 'PARTIAL', 'OVERDUE', 'CANCELLED'];
const PAYMENT_METHODS = ['BANK_TRANSFER', 'CHECK', 'CASH', 'CREDIT_CARD', 'WIRE'];
const UNITS = ['DAY', 'KG', 'ITEM', 'LIFT', 'CONTAINER', 'CBM'];

// ─── Helpers ──────────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('ar-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d: string) => { try { return new Date(d).toLocaleDateString('ar-AE'); } catch { return d; } };

function daysDiff(dateStr: string): number {
  return Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 86400000);
}

function agingBucket(days: number): string {
  if (days <= 0) return 'current';
  if (days <= 30) return '1-30';
  if (days <= 60) return '31-60';
  if (days <= 90) return '61-90';
  return '90+';
}

// ─── Component ────────────────────────────────────────────────────────────
export function InvoicesPage() {
  const { t } = useTranslation();

  // ── Dynamic label getters (use translation keys) ──
  const getTypeLabel = (type: string) => t(`invoices.type.${type}`);
  const getStatusLabel = (status: string) => t(`invoices.status.${status}`);
  const getBranchLabel = (branch: string) => t(`invoices.branch.${branch}`);
  const getPaymentTermsLabel = (terms: string) => t(`invoices.paymentTerms.${terms}`);
  const getPaymentMethodLabel = (method: string) => t(`invoices.paymentMethod.${method}`);
  const getUnitLabel = (unit: string) => t(`invoices.unit.${unit}`);
  const cur = t('invoices.currency');
  const globalSearch = useAppStore((s) => s.globalSearch);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [agingData, setAgingData] = useState<Record<string, number>>({ CURRENT: 0, '1-30': 0, '31-60': 0, '61-90': 0, '90+': 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const effectiveSearch = search || globalSearch;
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [paymentRef, setPaymentRef] = useState('');
  const [paying, setPaying] = useState(false);

  // Add form state
  const [form, setForm] = useState({
    type: 'STORAGE' as InvoiceType,
    clientName: '', clientEmail: '', clientId: '',
    branch: 'DXB' as Branch,
    paymentTerms: 'NET_30' as PaymentTerms,
    periodStart: '', periodEnd: '',
    notes: '',
  });
  const [lineItems, setLineItems] = useState<InvoiceItem[]>([
    { lineNumber: 1, description: '', quantity: 1, unit: 'DAY', unitPrice: 0, lineTotal: 0 },
  ]);

  // Fetch
  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/invoices?limit=100');
      if (!res.ok) throw new Error();
      const data = await res.json();
      // API returns { items, total, page, limit, totalPages, aging }
      const invoiceList = Array.isArray(data) ? data : data.items ?? [];
      setInvoices(invoiceList);
      if (data.aging) {
        setAgingData(data.aging);
      }
    } catch {
      toast.error(t('invoices.fetchFailed'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  // KPIs
  const kpis = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const outstanding = invoices.filter(i => ['ISSUED', 'PARTIAL', 'OVERDUE'].includes(i.status)).reduce((s, i) => s + (i.balanceDue || i.totalAmount || 0), 0);
    const overdue = invoices.filter(i => i.status === 'OVERDUE').length;
    const draft = invoices.filter(i => i.status === 'DRAFT').length;
    const paidThisMonth = invoices.filter(i => i.status === 'PAID' && new Date(i.createdAt).getMonth() === thisMonth && new Date(i.createdAt).getFullYear() === thisYear).reduce((s, i) => s + (i.totalAmount || 0), 0);
    return { outstanding, overdue, draft, paidThisMonth };
  }, [invoices]);

  // Aging (use server-side data when available, otherwise calculate from invoices)
  const aging = useMemo(() => {
    // If we have server-side aging data, use it
    if (agingData.CURRENT || agingData['1-30'] || agingData['31-60'] || agingData['61-90'] || agingData['90+']) {
      return {
        current: agingData.CURRENT || 0,
        '1-30': agingData['1-30'] || 0,
        '31-60': agingData['31-60'] || 0,
        '61-90': agingData['61-90'] || 0,
        '90+': agingData['90+'] || 0,
      };
    }
    // Fallback: calculate from invoices using balanceDue
    const buckets: Record<string, number> = { current: 0, '1-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };
    invoices.filter(i => ['ISSUED', 'PARTIAL', 'OVERDUE'].includes(i.status)).forEach(i => {
      buckets[agingBucket(daysDiff(i.dueDate))] += (i.balanceDue || i.totalAmount || 0);
    });
    return buckets;
  }, [invoices, agingData]);

  // Filtered
  const filtered = useMemo(() => {
    return invoices.filter(i => {
      if (statusFilter !== 'ALL' && i.status !== statusFilter) return false;
      if (typeFilter !== 'ALL' && i.type !== typeFilter) return false;
      if (effectiveSearch && !i.invoiceNumber.toLowerCase().includes(effectiveSearch.toLowerCase()) && !i.clientName.toLowerCase().includes(effectiveSearch.toLowerCase())) return false;
      return true;
    });
  }, [invoices, statusFilter, typeFilter, effectiveSearch]);

  // Add invoice — FIXED: sends `items` not `lineItems`, includes `clientId`, calculates `lineTotal`
  const handleAdd = async () => {
    if (!form.clientName.trim()) { toast.error(t('invoices.validation.clientRequired')); return; }
    const validItems = lineItems.filter(l => l.description.trim());
    if (validItems.length === 0) { toast.error(t('invoices.validation.itemRequired')); return; }
    if (!form.periodStart || !form.periodEnd) { toast.error(t('invoices.validation.periodRequired')); return; }
    setSaving(true);
    try {
      // Calculate lineTotal for each item
      const items = validItems.map((l, idx) => ({
        lineNumber: idx + 1,
        description: l.description,
        quantity: l.quantity,
        unit: l.unit,
        unitPrice: l.unitPrice,
        discountPercent: 0,
        lineTotal: Math.round(l.quantity * l.unitPrice * 100) / 100,
      }));

      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: form.type,
          clientId: form.clientId || form.clientName.replace(/\s+/g, '-').toLowerCase(),
          clientName: form.clientName,
          clientEmail: form.clientEmail || undefined,
          branch: form.branch,
          paymentTerms: form.paymentTerms,
          periodStart: form.periodStart,
          periodEnd: form.periodEnd,
          notes: form.notes || undefined,
          items,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed');
      }
      toast.success(t('invoices.addSuccess'));
      setShowAdd(false);
      resetForm();
      fetchInvoices();
    } catch (e) {
      toast.error(t('invoices.addFailed'));
    } finally {
      setSaving(false);
    }
  };

  // Issue invoice — FIXED: sends { action: 'issue' }
  const handleIssue = async (inv: Invoice) => {
    try {
      const res = await fetch(`/api/invoices/${inv.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'issue' }),
      });
      if (!res.ok) throw new Error();
      toast.success(t('invoices.issueSuccess'));
      // Refresh the selected invoice
      const detailRes = await fetch(`/api/invoices/${inv.id}`);
      if (detailRes.ok) {
        const detailData = await detailRes.json();
        setSelected(detailData.data || detailData);
      } else {
        setSelected({ ...inv, status: 'ISSUED' });
      }
      fetchInvoices();
    } catch {
      toast.error(t('invoices.issueFailed'));
    }
  };

  // Record payment — FIXED: uses PATCH with action: 'payment'
  const handleRecordPayment = async () => {
    if (!selected || !paymentAmount || +paymentAmount <= 0) {
      toast.error(t('invoices.validation.validAmount'));
      return;
    }
    setPaying(true);
    try {
      const res = await fetch(`/api/invoices/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'payment',
          paymentAmount: +paymentAmount,
          paymentMethod,
          paymentReference: paymentRef || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(t('invoices.paymentSuccess'));
      setShowPayment(false);
      setPaymentAmount('');
      setPaymentRef('');
      // Refresh
      const detailRes = await fetch(`/api/invoices/${selected.id}`);
      if (detailRes.ok) {
        const detailData = await detailRes.json();
        setSelected(detailData.data || detailData);
      }
      fetchInvoices();
    } catch {
      toast.error(t('invoices.paymentFailed'));
    } finally {
      setPaying(false);
    }
  };

  // Cancel invoice
  const handleCancel = async (inv: Invoice) => {
    try {
      const res = await fetch(`/api/invoices/${inv.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
      });
      if (!res.ok) throw new Error();
      toast.success(t('invoices.cancelSuccess'));
      setSelected({ ...inv, status: 'CANCELLED' });
      fetchInvoices();
    } catch {
      toast.error(t('invoices.cancelFailed'));
    }
  };

  // Download PDF — FIXED: uses proper endpoint
  const handleDownloadPdf = async (inv: Invoice) => {
    try {
      const res = await fetch(`/api/invoices/${inv.id}/pdf`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${inv.invoiceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t('invoices.pdfSuccess'));
    } catch {
      toast.error(t('invoices.pdfFailed'));
    }
  };

  // Export Excel
  const handleExport = () => {
    const csvRows = [
      [t('invoices.csv.invoiceNumber'), t('invoices.csv.type'), t('invoices.csv.client'), t('invoices.csv.total'), t('invoices.csv.paid'), t('invoices.csv.balanceDue'), t('invoices.csv.status'), t('invoices.csv.dueDate'), t('invoices.csv.branch')],
      ...filtered.map(i => [
        i.invoiceNumber,
        getTypeLabel(i.type),
        i.clientName,
        fmt(i.totalAmount || 0),
        fmt(i.paidAmount || 0),
        fmt(i.balanceDue || 0),
        getStatusLabel(i.status),
        fmtDate(i.dueDate),
        getBranchLabel(i.branch),
      ]),
    ];
    const csv = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'invoices.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success(t('invoices.exportSuccess'));
  };

  const resetForm = () => {
    setForm({ type: 'STORAGE', clientName: '', clientEmail: '', clientId: '', branch: 'DXB', paymentTerms: 'NET_30', periodStart: '', periodEnd: '', notes: '' });
    setLineItems([{ lineNumber: 1, description: '', quantity: 1, unit: 'DAY', unitPrice: 0, lineTotal: 0 }]);
  };

  const updateLineItem = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    setLineItems(prev => prev.map((l, i) => {
      if (i !== idx) return l;
      const updated = { ...l, [field]: value };
      // Recalculate lineTotal
      updated.lineTotal = Math.round((updated.quantity * updated.unitPrice) * 100) / 100;
      return updated;
    }));
  };

  const removeLineItem = (idx: number) => {
    if (lineItems.length <= 1) return;
    setLineItems(prev => prev.filter((_, i) => i !== idx));
  };

  const formSubtotal = lineItems.reduce((s, l) => s + (l.quantity * l.unitPrice), 0);
  const formVat = Math.round(formSubtotal * 0.05 * 100) / 100;
  const formTotal = Math.round((formSubtotal + formVat) * 100) / 100;

  // Get display items from selected invoice
  const selectedItems = selected?.items || selected?.lineItems || [];

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t('header.invoices')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('invoices.subtitle')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" /> {t('invoices.export')}
          </Button>
          <Button size="sm" onClick={() => setShowAdd(true)} className="gap-2">
            <Plus className="h-4 w-4" /> {t('invoices.addInvoice')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('invoices.kpi.outstanding'), value: `${fmt(kpis.outstanding)} ${cur}`, icon: DollarSign, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
          { label: t('invoices.kpi.overdue'), value: kpis.overdue, icon: AlertCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
          { label: t('invoices.kpi.draft'), value: kpis.draft, icon: FileEdit, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-500/10' },
          { label: t('invoices.kpi.paidThisMonth'), value: `${fmt(kpis.paidThisMonth)} ${cur}`, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((kpi, i) => (
          <Card key={i} className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aging Buckets — responsive */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('invoices.aging.title')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {([
              { key: 'current', label: t('invoices.aging.current'), color: 'bg-emerald-500' },
              { key: '1-30', label: t('invoices.aging.1-30'), color: 'bg-blue-500' },
              { key: '31-60', label: t('invoices.aging.31-60'), color: 'bg-amber-500' },
              { key: '61-90', label: t('invoices.aging.61-90'), color: 'bg-orange-500' },
              { key: '90+', label: t('invoices.aging.90+'), color: 'bg-red-500' },
            ] as const).map(b => (
              <div key={b.key} className="text-center">
                <div className={`h-2 rounded-full ${b.color} mb-2`} style={{ opacity: aging[b.key] > 0 ? 1 : 0.2 }} />
                <p className="text-xs text-slate-500 dark:text-slate-400">{b.label}</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{fmt(aging[b.key])} <span className="text-xs font-normal text-slate-400">{cur}</span></p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters — responsive */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-sm">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-slate-500 text-slate-400" />
          <Input placeholder={t('common.search') + '...'} value={search} onChange={e => setSearch(e.target.value)} className="ps-9 dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 dark:placeholder:text-slate-600 placeholder:text-slate-400" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px] dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white"><SelectValue placeholder={t('common.allStatuses')} /></SelectTrigger>
          <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
            <SelectItem value="ALL">{t('common.allStatuses')}</SelectItem>
            {INVOICE_STATUSES.map(k => <SelectItem key={k} value={k}>{getStatusLabel(k)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px] dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white"><SelectValue placeholder={t('common.allTypes')} /></SelectTrigger>
          <SelectContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white">
            <SelectItem value="ALL">{t('common.allTypes')}</SelectItem>
            {INVOICE_TYPES.map(k => <SelectItem key={k} value={k}>{getTypeLabel(k)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table — responsive with overflow and hidden columns */}
      <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>{t('invoices.noInvoices')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <TableHead className="text-slate-600 dark:text-slate-300">{t('invoices.table.invoiceNumber')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300 hidden sm:table-cell">{t('invoices.table.type')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300">{t('invoices.table.client')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300">{t('invoices.table.totalAed')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300">{t('invoices.table.balanceDueAed')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300">{t('invoices.table.status')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300 hidden md:table-cell">{t('invoices.table.dueDate')}</TableHead>
                  <TableHead className="text-slate-600 dark:text-slate-300 hidden lg:table-cell">{t('invoices.table.branch')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(inv => (
                  <TableRow
                    key={inv.id}
                    className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    onClick={() => setSelected(inv)}
                  >
                    <TableCell className="font-medium text-slate-900 dark:text-slate-100">{inv.invoiceNumber}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300 hidden sm:table-cell">{getTypeLabel(inv.type)}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">{inv.clientName}</TableCell>
                    <TableCell className="font-mono text-slate-900 dark:text-slate-100">{fmt(inv.totalAmount || 0)}</TableCell>
                    <TableCell className="font-mono text-slate-900 dark:text-slate-100">{fmt(inv.balanceDue || 0)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${STATUS_VARIANT[inv.status]} text-xs`}>
                        {getStatusLabel(inv.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 hidden md:table-cell">{fmtDate(inv.dueDate)}</TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 hidden lg:table-cell">{getBranchLabel(inv.branch)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Add Invoice Dialog — responsive */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-slate-100">{t('invoices.addDialog.title')}</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">{t('invoices.addDialog.description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.invoiceType')}</Label>
                <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as InvoiceType }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INVOICE_TYPES.map(k => <SelectItem key={k} value={k}>{getTypeLabel(k)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.paymentTerms')}</Label>
                <Select value={form.paymentTerms} onValueChange={v => setForm(p => ({ ...p, paymentTerms: v as PaymentTerms }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TERMS.map(k => <SelectItem key={k} value={k}>{getPaymentTermsLabel(k)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.clientName')}</Label>
                <Input value={form.clientName} onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))} placeholder={t('invoices.addDialog.clientNamePlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.clientEmail')}</Label>
                <Input value={form.clientEmail} onChange={e => setForm(p => ({ ...p, clientEmail: e.target.value }))} placeholder="email@example.com" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.branch')}</Label>
                <Select value={form.branch} onValueChange={v => setForm(p => ({ ...p, branch: v as Branch }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map(k => <SelectItem key={k} value={k}>{getBranchLabel(k)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.periodStart')}</Label>
                <Input type="date" value={form.periodStart} onChange={e => setForm(p => ({ ...p, periodStart: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.periodEnd')}</Label>
                <Input type="date" value={form.periodEnd} onChange={e => setForm(p => ({ ...p, periodEnd: e.target.value }))} />
              </div>
            </div>

            {/* Line Items — responsive layout */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.lineItems')}</Label>
                <Button variant="ghost" size="sm" onClick={() => setLineItems(p => [...p, { lineNumber: p.length + 1, description: '', quantity: 1, unit: 'DAY', unitPrice: 0, lineTotal: 0 }])} className="gap-1 text-xs">
                  <Plus className="h-3 w-3" /> {t('invoices.addDialog.addLineItem')}
                </Button>
              </div>
              {lineItems.map((li, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="sm:col-span-4">
                    <Label className="text-xs text-slate-500 dark:text-slate-400">{t('invoices.addDialog.lineItemDescription')}</Label>
                    <Input value={li.description} onChange={e => updateLineItem(idx, 'description', e.target.value)} placeholder={t('invoices.addDialog.descriptionPlaceholder')} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-slate-500 dark:text-slate-400">{t('invoices.addDialog.quantity')}</Label>
                    <Input type="number" value={li.quantity} onChange={e => updateLineItem(idx, 'quantity', +e.target.value)} min={0} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-slate-500 dark:text-slate-400">{t('invoices.addDialog.unit')}</Label>
                    <Select value={li.unit} onValueChange={v => updateLineItem(idx, 'unit', v)}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAY">{getUnitLabel('DAY')}</SelectItem>
                        <SelectItem value="KG">{getUnitLabel('KG')}</SelectItem>
                        <SelectItem value="ITEM">{getUnitLabel('ITEM')}</SelectItem>
                        <SelectItem value="LIFT">{getUnitLabel('LIFT')}</SelectItem>
                        <SelectItem value="CONTAINER">{getUnitLabel('CONTAINER')}</SelectItem>
                        <SelectItem value="CBM">{getUnitLabel('CBM')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-3">
                    <Label className="text-xs text-slate-500 dark:text-slate-400">{t('invoices.addDialog.unitPrice')}</Label>
                    <Input type="number" value={li.unitPrice} onChange={e => updateLineItem(idx, 'unitPrice', +e.target.value)} min={0} step="0.01" className="mt-1" />
                  </div>
                  <div className="sm:col-span-1 flex justify-center">
                    <Button variant="ghost" size="icon" onClick={() => removeLineItem(idx)} disabled={lineItems.length <= 1} className="mt-5 h-8 w-8">
                      <Trash2 className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-end pt-2 border-t border-slate-200 dark:border-slate-700 gap-1">
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('invoices.addDialog.subtotal')} </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{fmt(formSubtotal)} {cur}</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('invoices.addDialog.vat')} </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{fmt(formVat)} {cur}</span>
                </div>
                <div className="flex gap-4 text-sm font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{t('invoices.addDialog.total')} </span>
                  <span className="text-slate-900 dark:text-slate-100">{fmt(formTotal)} {cur}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); resetForm(); }}>{t('common.cancel')}</Button>
            <Button onClick={handleAdd} disabled={saving} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? t('common.creating') : t('invoices.addDialog.createInvoice')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Side Sheet — responsive width */}
      <Sheet open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <SheetContent side="left" className="w-full sm:w-[480px] sm:max-w-[480px] overflow-y-auto" dir="rtl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {selected.invoiceNumber}
                </SheetTitle>
                <SheetDescription className="text-slate-500 dark:text-slate-400">
                  {getTypeLabel(selected.type)} — {selected.clientName}
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-5">
                {/* Status badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="outline" className={`${STATUS_VARIANT[selected.status]} text-sm px-3 py-1`}>
                    {getStatusLabel(selected.status)}
                  </Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {t('invoices.detail.dueDate')} {fmtDate(selected.dueDate)}
                  </span>
                </div>

                {/* Details grid — responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    [t('invoices.detail.client'), selected.clientName],
                    [t('invoices.detail.email'), selected.clientEmail ?? '—'],
                    [t('invoices.detail.branch'), getBranchLabel(selected.branch)],
                    [t('invoices.detail.paymentTerms'), getPaymentTermsLabel(selected.paymentTerms)],
                    [t('invoices.detail.subtotal'), `${fmt(selected.subtotal || 0)} ${cur}`],
                    [t('invoices.detail.vat'), `${fmt(selected.taxAmount || 0)} ${cur}`],
                    [t('invoices.detail.total'), `${fmt(selected.totalAmount || 0)} ${cur}`],
                    [t('invoices.detail.paid'), `${fmt(selected.paidAmount || 0)} ${cur}`],
                    [t('invoices.detail.balanceDue'), `${fmt(selected.balanceDue || 0)} ${cur}`],
                    [t('invoices.detail.issueDate'), fmtDate(selected.issueDate)],
                    [t('invoices.detail.createdAt'), fmtDate(selected.createdAt)],
                  ].map(([label, value], i) => (
                    <div key={i}>
                      <p className="text-slate-500 dark:text-slate-400">{label}</p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Line Items */}
                {selectedItems.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('invoices.detail.lineItems')}</h4>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50 dark:bg-slate-900/50">
                              <TableHead className="text-xs text-slate-500 dark:text-slate-400">{t('invoices.detail.description')}</TableHead>
                              <TableHead className="text-xs text-slate-500 dark:text-slate-400 text-center">{t('invoices.detail.quantity')}</TableHead>
                              <TableHead className="text-xs text-slate-500 dark:text-slate-400 text-center hidden sm:table-cell">{t('invoices.detail.unit')}</TableHead>
                              <TableHead className="text-xs text-slate-500 dark:text-slate-400 text-left">{t('invoices.detail.unitPrice')}</TableHead>
                              <TableHead className="text-xs text-slate-500 dark:text-slate-400 text-left">{t('invoices.detail.tableTotal')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedItems.map((li: InvoiceItem, i: number) => (
                              <TableRow key={i}>
                                <TableCell className="text-sm text-slate-700 dark:text-slate-300">{li.description}</TableCell>
                                <TableCell className="text-sm text-center text-slate-700 dark:text-slate-300">{li.quantity}</TableCell>
                                <TableCell className="text-sm text-center text-slate-700 dark:text-slate-300 hidden sm:table-cell">{li.unit}</TableCell>
                                <TableCell className="text-sm font-mono text-slate-900 dark:text-slate-100">{fmt(li.unitPrice)}</TableCell>
                                <TableCell className="text-sm font-mono font-semibold text-slate-900 dark:text-slate-100">{fmt(li.lineTotal || (li.quantity * li.unitPrice))}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payments */}
                {selected.payments && selected.payments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('invoices.detail.payments')}</h4>
                    <div className="space-y-2">
                      {selected.payments.map((p: InvoicePayment, i: number) => (
                        <div key={i} className="flex items-center justify-between flex-wrap text-sm p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 gap-1">
                          <div>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{fmt(p.amount)} {cur}</span>
                            <span className="text-slate-500 dark:text-slate-400 mx-2">—</span>
                            <span className="text-slate-600 dark:text-slate-400">{getPaymentMethodLabel(p.method) || p.method}</span>
                            {p.reference && <span className="text-slate-500 dark:text-slate-400 mx-2">({p.reference})</span>}
                          </div>
                          <span className="text-xs text-slate-400">{fmtDate(p.paymentDate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <SheetFooter className="flex-col gap-2">
                {selected.status === 'DRAFT' && (
                  <Button className="w-full gap-2" onClick={() => handleIssue(selected)}>
                    <Send className="h-4 w-4" /> {t('invoices.detail.issueInvoice')}
                  </Button>
                )}
                {['ISSUED', 'PARTIAL', 'OVERDUE'].includes(selected.status) && (
                  <Button variant="outline" className="w-full gap-2" onClick={() => {
                    setPaymentAmount(String(selected.balanceDue || 0));
                    setShowPayment(true);
                  }}>
                    <CreditCard className="h-4 w-4" /> {t('invoices.detail.recordPayment')}
                  </Button>
                )}
                {selected.status === 'DRAFT' && (
                  <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-700" onClick={() => handleCancel(selected)}>
                    <X className="h-4 w-4" /> {t('invoices.detail.cancelInvoice')}
                  </Button>
                )}
                <Button variant="outline" className="w-full gap-2" onClick={() => handleDownloadPdf(selected)}>
                  <Download className="h-4 w-4" /> {t('invoices.detail.downloadPdf')}
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent dir="rtl" className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-slate-100">{t('invoices.paymentDialog.title')}</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              {t('invoices.paymentDialog.invoice')}: {selected?.invoiceNumber} — {t('invoices.paymentDialog.balanceDue')}: {fmt(selected?.balanceDue || 0)} {cur}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">{t('invoices.paymentDialog.amount')}</Label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={e => setPaymentAmount(e.target.value)}
                min={0}
                step="0.01"
                max={selected?.balanceDue || 0}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">{t('invoices.paymentDialog.method')}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map(k => (
                    <SelectItem key={k} value={k}>{getPaymentMethodLabel(k)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">{t('invoices.paymentDialog.reference')}</Label>
              <Input value={paymentRef} onChange={e => setPaymentRef(e.target.value)} placeholder={t('invoices.paymentDialog.referencePlaceholder')} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)}>{t('common.cancel')}</Button>
            <Button onClick={handleRecordPayment} disabled={paying} className="gap-2">
              {paying && <Loader2 className="h-4 w-4 animate-spin" />}
              {t('invoices.paymentDialog.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
