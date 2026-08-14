'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Plus, Package, Ship, MapPin, ArrowRight, Weight, Volume2, Users, Calendar, Loader2,
  Pencil, Download, ArrowLeft, ClipboardCheck, Warehouse, ArrowRightLeft, PackageCheck,
  CheckCircle2, Truck, MoveRight, Clock, UserCircle, Eye,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useTranslation, translateStatus, translateCategory, translateMovementType } from '@/lib/translations';
import type { Project, ProjectStatus, CargoItem, Movement } from '@/types/wms';

// ==================== CONSTANTS ====================

const PROJECT_STATUSES: ProjectStatus[] = ['PLANNED', 'RECEIVING', 'IN_STORAGE', 'STAGING', 'LOADED', 'SHIPPED', 'COMPLETED'];

const PROJECT_WORKFLOW: Record<ProjectStatus, ProjectStatus[]> = {
  PLANNED: ['RECEIVING'],
  RECEIVING: ['IN_STORAGE', 'STAGING'],
  IN_STORAGE: ['STAGING', 'LOADED'],
  STAGING: ['LOADED', 'IN_STORAGE'],
  LOADED: ['SHIPPED', 'STAGING'],
  SHIPPED: ['COMPLETED'],
  COMPLETED: [],
};

const STATUS_ICON_MAP: Record<ProjectStatus, React.ReactNode> = {
  PLANNED: <ClipboardCheck className="h-4 w-4" />,
  RECEIVING: <Download className="h-4 w-4" />,
  IN_STORAGE: <Warehouse className="h-4 w-4" />,
  STAGING: <ArrowRightLeft className="h-4 w-4" />,
  LOADED: <PackageCheck className="h-4 w-4" />,
  SHIPPED: <Ship className="h-4 w-4" />,
  COMPLETED: <CheckCircle2 className="h-4 w-4" />,
};

const STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string; border: string; accent: string }> = {
  PLANNED: { bg: 'bg-slate-500/10 dark:bg-slate-400/10', text: 'text-slate-400 dark:text-slate-300', border: 'border-slate-500/20 dark:border-slate-500/30', accent: 'bg-slate-500' },
  RECEIVING: { bg: 'bg-amber-500/10 dark:bg-amber-400/10', text: 'text-amber-400 dark:text-amber-500', border: 'border-amber-500/20 dark:border-amber-500/30', accent: 'bg-amber-500' },
  IN_STORAGE: { bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', text: 'text-emerald-400 dark:text-emerald-500', border: 'border-emerald-500/20 dark:border-emerald-500/30', accent: 'bg-emerald-500' },
  STAGING: { bg: 'bg-orange-500/10 dark:bg-orange-400/10', text: 'text-orange-400 dark:text-orange-500', border: 'border-orange-500/20 dark:border-orange-500/30', accent: 'bg-orange-500' },
  LOADED: { bg: 'bg-yellow-600/10 dark:bg-yellow-500/10', text: 'text-yellow-500 dark:text-yellow-400', border: 'border-yellow-600/20 dark:border-yellow-500/30', accent: 'bg-yellow-500' },
  SHIPPED: { bg: 'bg-cyan-500/10 dark:bg-cyan-400/10', text: 'text-cyan-400 dark:text-cyan-500', border: 'border-cyan-500/20 dark:border-cyan-500/30', accent: 'bg-cyan-500' },
  COMPLETED: { bg: 'bg-teal-500/10 dark:bg-teal-400/10', text: 'text-teal-400 dark:text-teal-500', border: 'border-teal-500/20 dark:border-teal-500/30', accent: 'bg-teal-500' },
};

const CARGO_STATUS_COLORS: Record<string, { bg: string; text: string; border: string; donut: string }> = {
  IN_YARD: { bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', text: 'text-emerald-400 dark:text-emerald-500', border: 'border-emerald-500/20', donut: '#10b981' },
  IN_TRANSIT: { bg: 'bg-amber-500/10 dark:bg-amber-400/10', text: 'text-amber-400 dark:text-amber-500', border: 'border-amber-500/20', donut: '#f59e0b' },
  DISPATCHED: { bg: 'bg-slate-500/10 dark:bg-slate-400/10', text: 'text-slate-400 dark:text-slate-300', border: 'border-slate-500/20', donut: '#64748b' },
  RECEIVED: { bg: 'bg-cyan-500/10 dark:bg-cyan-400/10', text: 'text-cyan-400 dark:text-cyan-500', border: 'border-cyan-500/20', donut: '#06b6d4' },
  IN_WAREHOUSE: { bg: 'bg-teal-500/10 dark:bg-teal-400/10', text: 'text-teal-400 dark:text-teal-500', border: 'border-teal-500/20', donut: '#14b8a6' },
  DELIVERED: { bg: 'bg-slate-400/10 dark:bg-slate-300/10', text: 'text-slate-500 dark:text-slate-400', border: 'border-slate-400/20', donut: '#94a3b8' },
  STAGING: { bg: 'bg-orange-500/10 dark:bg-orange-400/10', text: 'text-orange-400 dark:text-orange-500', border: 'border-orange-500/20', donut: '#f97316' },
};

const MOVEMENT_TYPE_COLORS: Record<string, string> = {
  RECEIVE: 'bg-emerald-500 dark:bg-emerald-400',
  MOVE: 'bg-amber-500 dark:bg-amber-400',
  DISPATCH: 'bg-slate-500 dark:bg-slate-400',
  INSPECT: 'bg-cyan-500 dark:bg-cyan-400',
};

const statusTabsKeys = [
  { value: '', key: 'common.all' },
  { value: 'PLANNED', key: 'status.PLANNED' },
  { value: 'RECEIVING', key: 'status.RECEIVING' },
  { value: 'IN_STORAGE', key: 'status.IN_STORAGE' },
  { value: 'STAGING', key: 'status.STAGING' },
  { value: 'LOADED', key: 'status.LOADED' },
  { value: 'SHIPPED', key: 'status.SHIPPED' },
  { value: 'COMPLETED', key: 'status.COMPLETED' },
];

const emptyForm = {
  name: '', description: '', clientName: '', clientContact: '',
  destination: '', shippingLine: '', vesselName: '', etd: '', eta: '',
};

interface ProjectListResponse { items: Project[]; total: number; }

// ==================== COMPONENT ====================

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectCargo, setProjectCargo] = useState<CargoItem[]>([]);
  const [projectMovements, setProjectMovements] = useState<Movement[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '100', ...(statusFilter && { status: statusFilter }) });
    try {
      const res = await fetch(`/api/projects?${params}`);
      const data: ProjectListResponse = await res.json();
      if (!res.ok) { setProjects([]); return; }
      setProjects(data.items || []);
    } catch { toast.error(t('projects.toast.fetchFailed')); } finally { setLoading(false); }
  }, [statusFilter, t]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, description: form.description || null, clientName: form.clientName, clientContact: form.clientContact || null, destination: form.destination || null, shippingLine: form.shippingLine || null, vesselName: form.vesselName || null, etd: form.etd || null, eta: form.eta || null }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('projects.toast.created')); setShowAdd(false); setForm(emptyForm); fetchProjects();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('projects.toast.createFailed')); } finally { setSubmitting(false); }
  };

  const openProjectDetail = async (project: Project) => {
    setSelectedProject(project);
    setDetailLoading(true);
    try {
      const [cargoRes, moveRes] = await Promise.all([
        fetch(`/api/cargo?projectId=${project.id}&limit=200`),
        fetch(`/api/movements?limit=100`),
      ]);
      const cargoData = await cargoRes.json();
      const moveData = await moveRes.json();
      const allMoves: Movement[] = moveData.items || [];
      const cargoIds = new Set((cargoData.items || []).map((c: CargoItem) => c.id));
      setProjectCargo(cargoData.items || []);
      setProjectMovements(allMoves.filter((m) => cargoIds.has(m.cargoItemId)));
    } catch { toast.error(t('projects.toast.cargoFetchFailed')); } finally { setDetailLoading(false); }
  };

  const handleProjectStatusChange = async (newStatus: ProjectStatus) => {
    if (!selectedProject) return;
    setStatusChanging(true);
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Failed'); }
      toast.success(t('detail.project.statusChanged'));
      const data = await res.json();
      setSelectedProject(data.data);
      fetchProjects();
    } catch (e: unknown) { toast.error(e instanceof Error ? e.message : t('detail.statusChangeFailed')); } finally { setStatusChanging(false); }
  };

  const currentStep = selectedProject ? PROJECT_STATUSES.indexOf(selectedProject.status) : -1;

  const cargoStatusCounts = useMemo(() => 
    projectCargo.reduce((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; }, {} as Record<string, number>),
    [projectCargo]
  );

  const completionPct = useMemo(() => {
    if (projectCargo.length === 0) return 0;
    const completed = projectCargo.filter((c) => c.status === 'DISPATCHED' || c.status === 'DELIVERED').length;
    return Math.round((completed / projectCargo.length) * 100);
  }, [projectCargo]);

  // Donut chart data
  const donutData = useMemo(() => {
    const entries = Object.entries(cargoStatusCounts).sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((s, [, c]) => s + c, 0);
    let cumulative = 0;
    return entries.map(([status, count]) => {
      const start = (cumulative / total) * 100;
      cumulative += count;
      const end = (cumulative / total) * 100;
      const color = CARGO_STATUS_COLORS[status]?.donut || '#64748b';
      return { status, count, start, end, color };
    });
  }, [cargoStatusCounts]);

  const donutGradient = useMemo(() => {
    if (donutData.length === 0) return '';
    return donutData.map((d) => `${d.color} ${d.start}% ${d.end}%`).join(', ');
  }, [donutData]);

  // ETD/ETA timeline calculations
  const etdEtaInfo = useMemo(() => {
    if (!selectedProject?.etd || !selectedProject?.eta) return null;
    const etd = new Date(selectedProject.etd).getTime();
    const eta = new Date(selectedProject.eta).getTime();
    const now = Date.now();
    const totalDays = Math.max(1, Math.ceil((eta - etd) / (1000 * 60 * 60 * 24)));
    const elapsed = Math.ceil((now - etd) / (1000 * 60 * 60 * 24));
    const pct = Math.min(100, Math.max(0, (elapsed / totalDays) * 100));
    const remaining = Math.max(0, Math.ceil((eta - now) / (1000 * 60 * 60 * 24)));
    return { totalDays, elapsed, pct, remaining, isOverdue: now > eta };
  }, [selectedProject]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900">{t('projects.title')}</h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">{t('projects.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/30">
          <Plus className="h-4 w-4 ml-2" /> {t('projects.addProject')}
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="dark:bg-slate-800/50 bg-slate-100 dark:border-slate-700/50 border border-slate-200 h-auto p-1 flex-wrap gap-1">
          {statusTabsKeys.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-500 dark:text-slate-400 text-slate-500 text-xs px-3 py-1.5">{t(tab.key)}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ========== PROJECT DETAIL VIEW ========== */}
      {selectedProject ? (
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => setSelectedProject(null)} className="dark:text-slate-400 text-slate-500 hover:dark:text-slate-200 hover:text-slate-900 -mr-2 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 ml-2" /> {t('projects.backToProjects')}
          </Button>

          {/* ===== Hero Header ===== */}
          <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden">
            {/* Gradient top accent bar */}
            <div className={`h-1.5 w-full ${STATUS_COLORS[selectedProject.status].accent}`} />
            <CardContent className="p-6 pt-5">
              <div className="flex flex-col gap-5">
                {/* Top row: avatar, info, actions */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Client avatar */}
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${STATUS_COLORS[selectedProject.status].bg} ${STATUS_COLORS[selectedProject.status].text}`}>
                      {selectedProject.clientName?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl font-bold dark:text-slate-100 text-slate-900">{selectedProject.name}</h2>
                        <Badge variant="outline" className={`shrink-0 text-xs ${STATUS_COLORS[selectedProject.status].bg} ${STATUS_COLORS[selectedProject.status].text} ${STATUS_COLORS[selectedProject.status].border}`}>
                          {translateStatus(selectedProject.status)}
                        </Badge>
                      </div>
                      <p className="text-sm font-mono dark:text-slate-500 text-slate-400 mt-0.5">{selectedProject.projectCode}</p>
                      {selectedProject.description && <p className="text-sm dark:text-slate-400 text-slate-500 mt-2 max-w-xl leading-relaxed">{selectedProject.description}</p>}
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200">
                      <Pencil className="h-3.5 w-3.5 ml-1.5" /> {t('detail.project.editProject')}
                    </Button>
                    <Button variant="outline" size="sm" className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100 transition-all duration-200">
                      <Download className="h-3.5 w-3.5 ml-1.5" /> {t('detail.project.exportReport')}
                    </Button>
                  </div>
                </div>

                {/* Shipping Info Row */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 dark:text-amber-400 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider dark:text-slate-600 text-slate-400">{t('detail.project.overview.client')}</p>
                      <p className="dark:text-slate-200 text-slate-800 font-medium">{selectedProject.clientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center">
                      <Ship className="h-4 w-4 dark:text-amber-400 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider dark:text-slate-600 text-slate-400">{t('detail.project.overview.vessel')}</p>
                      <p className="dark:text-slate-200 text-slate-800 font-medium">{selectedProject.vesselName || t('projects.tbd')}</p>
                    </div>
                  </div>
                  {(selectedProject.etd || selectedProject.eta) && (
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center">
                        <Calendar className="h-4 w-4 dark:text-amber-400 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider dark:text-slate-600 text-slate-400">ETD / ETA</p>
                        <p className="dark:text-slate-200 text-slate-800 font-medium">
                          {selectedProject.etd ? new Date(selectedProject.etd).toLocaleDateString() : '—'} / {selectedProject.eta ? new Date(selectedProject.eta).toLocaleDateString() : '—'}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedProject.shippingLine && (
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center">
                        <Ship className="h-4 w-4 dark:text-amber-400 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider dark:text-slate-600 text-slate-400">{t('detail.project.overview.shippingLine')}</p>
                        <p className="dark:text-slate-200 text-slate-800 font-medium">{selectedProject.shippingLine}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ETD/ETA Visual Timeline Bar */}
                {etdEtaInfo && (
                  <div className="rounded-xl dark:border-slate-800 border-slate-200 border dark:bg-slate-900/60 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 dark:text-amber-400 text-amber-600" />
                        <span className="text-xs font-semibold dark:text-slate-300 text-slate-700">{t('detail.project.shippingTimeline')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="dark:text-slate-500 text-slate-400">{etdEtaInfo.elapsed} {t('detail.project.daysElapsed')}</span>
                        <span className={etdEtaInfo.isOverdue ? 'text-red-400 dark:text-red-400' : 'dark:text-slate-500 text-slate-400'}>
                          {etdEtaInfo.isOverdue ? 'Overdue' : `${etdEtaInfo.remaining} ${t('detail.project.daysRemaining')}`}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full dark:bg-slate-800 bg-slate-200">
                      {/* Elapsed bar */}
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${etdEtaInfo.isOverdue ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-amber-500 to-orange-400'}`}
                        style={{ width: `${Math.min(etdEtaInfo.pct, 100)}%` }}
                      />
                      {/* Current position dot */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-white dark:border-slate-900 shadow-lg transition-all duration-700 ${etdEtaInfo.isOverdue ? 'bg-red-400' : 'bg-amber-400'}`}
                        style={{ left: `calc(${Math.min(etdEtaInfo.pct, 100)}% - 10px)` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] dark:text-slate-600 text-slate-400">
                      <span>ETD: {new Date(selectedProject.etd!).toLocaleDateString()}</span>
                      <span>ETA: {new Date(selectedProject.eta!).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                {/* ===== Visual Status Workflow Stepper ===== */}
                <div className="rounded-xl dark:border-slate-800 border-slate-200 border dark:bg-slate-900/60 bg-slate-50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold dark:text-slate-300 text-slate-700 uppercase tracking-wider">{t('detail.project.statusManagement')}</h3>
                    {statusChanging && <Loader2 className="h-3.5 w-3.5 animate-spin dark:text-amber-400 text-amber-600" />}
                  </div>
                  <div className="flex items-center gap-0 overflow-x-auto pb-2">
                    {PROJECT_STATUSES.map((s, idx) => {
                      const isCompleted = idx <= currentStep;
                      const isCurrent = idx === currentStep;
                      const isNext = PROJECT_WORKFLOW[selectedProject.status]?.includes(s);
                      const colors = STATUS_COLORS[s];
                      return (
                        <div key={s} className="flex items-center shrink-0">
                          <button
                            disabled={!isNext || statusChanging}
                            onClick={() => isNext && handleProjectStatusChange(s)}
                            className={`flex flex-col items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 min-w-[72px] ${
                              isCurrent
                                ? `relative ${colors.bg} ring-2 ring-offset-2 ring-offset-transparent ${colors.text.replace('text-', 'ring-')}`
                                : isCompleted
                                  ? 'opacity-60'
                                  : isNext
                                    ? 'dark:hover:bg-slate-800 hover:bg-slate-200 cursor-pointer opacity-70 hover:opacity-100'
                                    : 'opacity-25 pointer-events-none'
                            }`}
                          >
                            {/* Pulsing ring for current step */}
                            {isCurrent && (
                              <span className="absolute inset-0 rounded-xl animate-ping opacity-10" style={{ animationDuration: '2s' }} />
                            )}
                            {/* Icon circle */}
                            <div className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCurrent
                                ? `${colors.bg} ${colors.text} shadow-lg`
                                : isCompleted
                                  ? 'dark:bg-emerald-500/20 bg-emerald-500/20 dark:text-emerald-400 text-emerald-600'
                                  : 'dark:bg-slate-800 bg-slate-200 dark:text-slate-600 text-slate-400'
                            }`}>
                              {isCompleted && !isCurrent ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                STATUS_ICON_MAP[s]
                              )}
                            </div>
                            <span className={`text-[10px] leading-tight text-center font-medium ${
                              isCurrent ? colors.text : isCompleted ? 'dark:text-emerald-400 text-emerald-600' : 'dark:text-slate-500 text-slate-400'
                            }`}>
                              {translateStatus(s)}
                            </span>
                            {/* Hover arrow for next step */}
                            {isNext && (
                              <MoveRight className={`h-3 w-3 absolute -top-1 -right-1 ${colors.text} opacity-60`} />
                            )}
                          </button>
                          {/* Connecting line */}
                          {idx < PROJECT_STATUSES.length - 1 && (
                            <div className="relative w-8 lg:w-12 flex items-center justify-center mx-0.5">
                              <div className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                                idx < currentStep
                                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-400/50 dark:from-emerald-500 dark:to-emerald-500/50'
                                  : idx === currentStep
                                    ? 'bg-gradient-to-r from-amber-400 to-amber-400/30 dark:from-amber-500 dark:to-amber-500/30'
                                    : 'dark:bg-slate-800 bg-slate-200'
                              }`} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===== Enhanced KPI Cards ===== */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Items */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="h-full border-l-4 border-l-amber-500 dark:border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg dark:bg-amber-500/10 bg-amber-500/10 flex items-center justify-center">
                      <Package className="h-4.5 w-4.5 dark:text-amber-400 text-amber-600" />
                    </div>
                    <div className="flex items-end gap-0.5 h-8">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="w-1 rounded-t-sm dark:bg-amber-500/40 bg-amber-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 mt-3">{selectedProject.totalItems}</p>
                  <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{t('detail.project.stats.totalItems')}</p>
                </CardContent>
              </div>
            </Card>

            {/* Total Weight */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="h-full border-l-4 border-l-emerald-500 dark:border-l-emerald-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg dark:bg-emerald-500/10 bg-emerald-500/10 flex items-center justify-center">
                      <Weight className="h-4.5 w-4.5 dark:text-emerald-400 text-emerald-600" />
                    </div>
                    <div className="flex items-end gap-0.5 h-8">
                      {[60, 80, 55, 70, 85, 50, 95].map((h, i) => (
                        <div key={i} className="w-1 rounded-t-sm dark:bg-emerald-500/40 bg-emerald-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 mt-3">
                    {selectedProject.totalWeight.toLocaleString()}
                    <span className="text-sm font-normal dark:text-slate-500 text-slate-400 ml-1">{t('common.tonnes')}</span>
                  </p>
                  <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{t('detail.project.stats.totalWeight')}</p>
                </CardContent>
              </div>
            </Card>

            {/* Total Volume */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="h-full border-l-4 border-l-cyan-500 dark:border-l-cyan-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg dark:bg-cyan-500/10 bg-cyan-500/10 flex items-center justify-center">
                      <Volume2 className="h-4.5 w-4.5 dark:text-cyan-400 text-cyan-600" />
                    </div>
                    <div className="flex items-end gap-0.5 h-8">
                      {[50, 70, 60, 85, 75, 65, 80].map((h, i) => (
                        <div key={i} className="w-1 rounded-t-sm dark:bg-cyan-500/40 bg-cyan-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 mt-3">
                    {selectedProject.totalVolume}
                    <span className="text-sm font-normal dark:text-slate-500 text-slate-400 ml-1">m³</span>
                  </p>
                  <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{t('detail.project.stats.totalVolume')}</p>
                </CardContent>
              </div>
            </Card>

            {/* Completion % */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="h-full border-l-4 border-l-purple-500 dark:border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-lg dark:bg-purple-500/10 bg-purple-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4.5 w-4.5 dark:text-purple-400 text-purple-600" />
                    </div>
                    <div className="flex items-end gap-0.5 h-8">
                      {[20, 35, 50, 60, 70, 80, completionPct].map((h, i) => (
                        <div key={i} className="w-1 rounded-t-sm dark:bg-purple-500/40 bg-purple-500/30" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-slate-100 text-slate-900 mt-3">{completionPct}%</p>
                  <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">{t('detail.project.stats.completion')}</p>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* ===== Cargo Table + Donut Chart ===== */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Cargo Items Table */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white lg:col-span-2 transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-800">{t('projects.cargoItems')}</h3>
                  <span className="text-xs dark:text-slate-500 text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{projectCargo.length} {t('common.items')}</span>
                </div>
                {detailLoading ? (
                  <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 dark:bg-slate-800 bg-slate-100" />)}</div>
                ) : projectCargo.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mb-3">
                      <Package className="h-5 w-5 dark:text-slate-600 text-slate-400" />
                    </div>
                    <p className="text-sm dark:text-slate-500 text-slate-400">{t('projects.noCargoItems')}</p>
                  </div>
                ) : (
                  <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                    <Table>
                      <TableHeader>
                        <TableRow className="dark:border-slate-800 border-slate-200 hover:bg-transparent">
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium">{t('projects.table.code')}</TableHead>
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium">{t('cargo.table.description')}</TableHead>
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium hidden sm:table-cell">{t('cargo.table.weight')}</TableHead>
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium hidden md:table-cell">{t('cargo.table.category')}</TableHead>
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium">{t('cargo.table.status')}</TableHead>
                          <TableHead className="text-xs dark:text-slate-500 text-slate-400 font-medium hidden lg:table-cell">{t('cargo.table.location')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectCargo.map((c) => {
                          const cs = CARGO_STATUS_COLORS[c.status] || { bg: 'dark:bg-slate-700/50 bg-slate-100', text: 'dark:text-slate-400 text-slate-500', border: 'border-slate-600' };
                          return (
                            <TableRow key={c.id} className="dark:border-slate-800 border-slate-200 dark:hover:bg-slate-800/50 hover:bg-slate-50 cursor-pointer group transition-colors duration-150">
                              <TableCell className="py-2.5 text-xs font-mono dark:text-amber-400/80 text-amber-600 group-hover:dark:text-amber-400 group-hover:text-amber-600 transition-colors">{c.cargoCode}</TableCell>
                              <TableCell className="py-2.5 text-xs dark:text-slate-300 text-slate-700 max-w-[180px] truncate">{c.description}</TableCell>
                              <TableCell className="py-2.5 text-xs dark:text-slate-400 text-slate-500 hidden sm:table-cell">
                                {c.weight.toLocaleString()} <span className="dark:text-slate-600 text-slate-300">{t('detail.cargo.weightUnit')}</span>
                              </TableCell>
                              <TableCell className="py-2.5 hidden md:table-cell">
                                <Badge variant="outline" className="text-[10px] dark:bg-slate-800/50 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-slate-700 border-slate-200">{translateCategory(c.liftCategory)}</Badge>
                              </TableCell>
                              <TableCell className="py-2.5">
                                <Badge variant="outline" className={`text-[10px] ${cs.bg} ${cs.text} ${cs.border} flex items-center gap-1 w-fit`}>{translateStatus(c.status)}</Badge>
                              </TableCell>
                              <TableCell className="py-2.5 text-xs dark:text-slate-400 text-slate-500 hidden lg:table-cell font-mono">{c.location?.code || '—'}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cargo Status Donut Chart */}
            <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white transition-all duration-200">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-800 mb-5">{t('detail.project.cargoStatusBreakdown')}</h3>
                {projectCargo.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="h-10 w-10 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mb-2">
                      <Package className="h-4 w-4 dark:text-slate-600 text-slate-400" />
                    </div>
                    <p className="text-xs dark:text-slate-500 text-slate-400">{t('projects.noCargoItems')}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {/* Donut Chart using conic-gradient */}
                    <div className="relative h-44 w-44 mb-5">
                      <div
                        className="h-full w-full rounded-full"
                        style={{
                          background: donutData.length > 0
                            ? `conic-gradient(${donutGradient})`
                            : 'conic-gradient(dark:bg-slate-800 bg-slate-100 0% 100%)',
                        }}
                      />
                      {/* Center circle (donut hole) */}
                      <div className="absolute inset-0 m-auto h-28 w-28 rounded-full dark:bg-slate-900/50 bg-white shadow-inner flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold dark:text-slate-100 text-slate-900">{projectCargo.length}</p>
                        <p className="text-[10px] dark:text-slate-500 text-slate-400">{t('common.items')}</p>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="w-full space-y-2.5">
                      {Object.entries(cargoStatusCounts).sort((a, b) => b[1] - a[1]).map(([status, count]) => {
                        const pct = Math.round((count / projectCargo.length) * 100);
                        const color = CARGO_STATUS_COLORS[status]?.donut || '#64748b';
                        return (
                          <div key={status} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                              <span className="dark:text-slate-300 text-slate-600">{translateStatus(status)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="dark:text-slate-200 text-slate-800 font-medium">{count}</span>
                              <span className="dark:text-slate-600 text-slate-300 w-9 text-right">({pct}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ===== Activity Timeline ===== */}
          <Card className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white transition-all duration-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-800">{t('detail.project.timeline')}</h3>
                <span className="text-xs dark:text-slate-500 text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">{projectMovements.length} {t('common.all')}</span>
              </div>
              {projectMovements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-12 w-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 dark:text-slate-600 text-slate-400" />
                  </div>
                  <p className="text-sm dark:text-slate-500 text-slate-400">{t('detail.project.noActivity')}</p>
                </div>
              ) : (
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="relative pl-8">
                    {/* Vertical connecting line */}
                    <div className="absolute left-3 top-2 bottom-2 w-px dark:bg-slate-800 bg-slate-200" />
                    {projectMovements.slice(0, 20).map((m, idx) => {
                      const dotColor = MOVEMENT_TYPE_COLORS[m.type] || 'dark:bg-slate-500 bg-slate-400';
                      return (
                        <div key={m.id} className={`relative pb-6 last:pb-0 ${idx === 0 ? 'pt-0' : ''}`}>
                          {/* Timeline dot */}
                          <div className={`absolute left-0 top-1 h-6 w-6 rounded-full ${dotColor} flex items-center justify-center shadow-sm`}>
                            {m.type === 'RECEIVE' && <Download className="h-3 w-3 text-white" />}
                            {m.type === 'MOVE' && <MoveRight className="h-3 w-3 text-white" />}
                            {m.type === 'DISPATCH' && <Truck className="h-3 w-3 text-white" />}
                            {m.type === 'INSPECT' && <Eye className="h-3 w-3 text-white" />}
                          </div>
                          {/* Content card */}
                          <div className="ml-4 p-3 rounded-xl dark:bg-slate-900/40 bg-slate-50 border dark:border-slate-800 border-slate-200 transition-colors duration-150 dark:hover:bg-slate-900/60 hover:bg-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium dark:text-slate-200 text-slate-800">{translateMovementType(m.type)}</span>
                                <span className="text-xs font-mono dark:text-amber-400/70 text-amber-600">{m.cargoCode}</span>
                              </div>
                              <div className="flex items-center gap-3 text-[11px] dark:text-slate-500 text-slate-400">
                                {m.operatorName && (
                                  <div className="flex items-center gap-1">
                                    <UserCircle className="h-3 w-3" />
                                    <span>{m.operatorName}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(m.createdAt).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1.5 text-xs dark:text-slate-400 text-slate-500">
                              {m.fromLocation?.code && (
                                <span>{m.fromLocation.code}</span>
                              )}
                              {(m.fromLocation?.code && m.toLocation?.code) && (
                                <ArrowRight className="h-3 w-3" />
                              )}
                              {m.toLocation?.code && (
                                <span>{m.toLocation.code}</span>
                              )}
                              {m.equipmentUsed && (
                                <span className="dark:text-slate-600 text-slate-300 ml-2">
                                  <span className="dark:text-slate-600 text-slate-300">·</span> {m.equipmentUsed}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* ========== PROJECT CARDS GRID ========== */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white">
              <CardContent className="p-5 space-y-4">
                <Skeleton className="h-5 w-3/4 dark:bg-slate-800 bg-slate-100" />
                <Skeleton className="h-4 w-1/2 dark:bg-slate-800 bg-slate-100" />
                <Skeleton className="h-4 w-full dark:bg-slate-800 bg-slate-100" />
                <Skeleton className="h-2 w-full dark:bg-slate-800 bg-slate-100" />
              </CardContent>
            </Card>
          )) : projects.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="h-14 w-14 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 dark:text-slate-600 text-slate-400" />
              </div>
              <p className="dark:text-slate-500 text-slate-400">{t('projects.noProjectsFound')}</p>
            </div>
          ) : projects.map((p) => {
            const received = p.cargoItems?.filter((c) => c.status === 'RECEIVED' || c.status === 'IN_YARD' || c.status === 'IN_WAREHOUSE').length || 0;
            const total = p.totalItems || 0;
            const pct = total > 0 ? Math.round((received / total) * 100) : 0;
            const statusColor = STATUS_COLORS[p.status];
            return (
              <Card
                key={p.id}
                className="dark:border-slate-800 border-slate-200 dark:bg-slate-900/50 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:dark:border-slate-700 hover:border-slate-300 group relative overflow-hidden"
                onClick={() => openProjectDetail(p)}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardContent className="p-5 space-y-4 relative z-10">
                  {/* Header: name, code, status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold dark:text-slate-100 text-slate-900 truncate group-hover:dark:text-amber-400 group-hover:text-amber-600 transition-colors duration-200">{p.name}</h3>
                      <p className="text-[11px] font-mono dark:text-slate-600 text-slate-400 mt-0.5">{p.projectCode}</p>
                    </div>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                      {translateStatus(p.status)}
                    </Badge>
                  </div>

                  {/* Client & Vessel */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 dark:text-slate-400 text-slate-500">
                      <Users className="h-3 w-3 dark:text-slate-600 text-slate-300" />
                      <span className="truncate">{p.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 dark:text-slate-400 text-slate-500">
                      <Ship className="h-3 w-3 dark:text-slate-600 text-slate-300" />
                      <span className="truncate">{p.vesselName || t('projects.tbd')}</span>
                    </div>
                  </div>

                  {/* Quick stats row */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 dark:text-amber-500/60 text-amber-500" />
                      <span className="dark:text-slate-300 text-slate-700 font-medium">{total}</span>
                      <span className="dark:text-slate-600 text-slate-400">{t('projects.card.items')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Weight className="h-3.5 w-3.5 dark:text-amber-500/60 text-amber-500" />
                      <span className="dark:text-slate-300 text-slate-700 font-medium">{p.totalWeight}</span>
                      <span className="dark:text-slate-600 text-slate-400">{t('projects.card.weight')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 dark:text-amber-500/60 text-amber-500" />
                      <span className="dark:text-slate-300 text-slate-700 font-medium">{p.totalVolume}</span>
                      <span className="dark:text-slate-600 text-slate-400">m³</span>
                    </div>
                  </div>

                  {/* ETD/ETA dates */}
                  {(p.etd || p.eta) && (
                    <div className="flex gap-4 text-[11px] dark:text-slate-500 text-slate-400">
                      {p.etd && <span>ETD {new Date(p.etd).toLocaleDateString()}</span>}
                      {p.eta && <span>ETA {new Date(p.eta).toLocaleDateString()}</span>}
                    </div>
                  )}

                  {/* Progress bar with percentage */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="dark:text-slate-500 text-slate-400">{t('common.progress')}</span>
                      <span className="dark:text-slate-300 text-slate-600 font-medium">{received}/{total} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full dark:bg-slate-800 bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : pct >= 40 ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 'bg-gradient-to-r from-amber-500/60 to-amber-400/60'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Project Dialog */}
      <Dialog open={showAdd} onOpenChange={(open) => { if (!open) { setShowAdd(false); setForm(emptyForm); } }}>
        <DialogContent className="dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white max-w-lg">
          <DialogHeader><DialogTitle className="dark:text-slate-100 text-slate-900">{t('projects.addNewProject')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.projectName')}</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.description')}</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1 min-h-[60px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.clientName')}</Label>
                <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.clientContact')}</Label>
                <Input value={form.clientContact} onChange={(e) => setForm({ ...form, clientContact: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
            </div>
            <div>
              <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.destination')}</Label>
              <Input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.shippingLine')}</Label>
                <Input value={form.shippingLine} onChange={(e) => setForm({ ...form, shippingLine: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.vesselName')}</Label>
                <Input value={form.vesselName} onChange={(e) => setForm({ ...form, vesselName: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.etd')}</Label>
                <Input type="date" value={form.etd} onChange={(e) => setForm({ ...form, etd: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
              <div>
                <Label className="dark:text-slate-400 text-slate-500">{t('projects.form.eta')}</Label>
                <Input type="date" value={form.eta} onChange={(e) => setForm({ ...form, eta: e.target.value })} className="dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-900 mt-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setForm(emptyForm); }} className="dark:border-slate-700 border-slate-300 dark:text-slate-300 text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100">{t('common.cancel')}</Button>
            <Button onClick={handleCreate} disabled={submitting || !form.name || !form.clientName} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">{submitting ? t('common.creating') : t('common.create')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
