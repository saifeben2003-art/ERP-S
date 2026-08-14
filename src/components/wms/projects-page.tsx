'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Package, Ship, MapPin, ArrowRight, Weight, Volume2, Users, Calendar, Loader2, Eye, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useTranslation, translateStatus, translateCategory } from '@/lib/translations';
import type { Project, ProjectStatus, CargoItem, Movement } from '@/types/wms';

const projectStatusStyles: Record<ProjectStatus, string> = {
  PLANNED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  RECEIVING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  IN_STORAGE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  STAGING: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  LOADED: 'bg-yellow-600/10 text-yellow-500 border-yellow-600/20',
  SHIPPED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  COMPLETED: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

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

const cargoStatusStyles: Record<string, string> = {
  IN_YARD: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  IN_TRANSIT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  DISPATCHED: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  RECEIVED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  IN_WAREHOUSE: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  DELIVERED: 'bg-slate-400/10 text-slate-500 border-slate-400/20',
  STAGING: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
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

  const cargoStatusCounts = projectCargo.reduce((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{t('projects.title')}</h1>
          <p className="text-sm text-slate-500 mt-1">{t('projects.subtitle')}</p>
        </div>
        <Button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">
          <Plus className="h-4 w-4 ml-2" /> {t('projects.addProject')}
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50 h-auto p-1 flex-wrap gap-1">
          {statusTabsKeys.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-400 text-slate-400 text-xs px-3 py-1.5">{t(tab.key)}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* ========== PROJECT DETAIL VIEW ========== */}
      {selectedProject ? (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-slate-200 -mr-2">
            <ArrowRight className="h-4 w-4 ml-2" /> {t('projects.backToProjects')}
          </Button>

          {/* Project Header Card */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-100">{selectedProject.name}</h2>
                  <p className="text-sm font-mono text-slate-600 mt-0.5">{selectedProject.projectCode}</p>
                  {selectedProject.description && <p className="text-xs text-slate-400 mt-2 max-w-lg">{selectedProject.description}</p>}
                </div>
                <Badge variant="outline" className={`shrink-0 text-xs ${projectStatusStyles[selectedProject.status]}`}>{translateStatus(selectedProject.status)}</Badge>
              </div>

              {/* Project Status Workflow */}
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-slate-400">{t('detail.project.statusManagement')}</h3>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {PROJECT_STATUSES.map((s, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isCurrent = idx === currentStep;
                    const isNext = PROJECT_WORKFLOW[selectedProject.status]?.includes(s);
                    return (
                      <div key={s} className="flex items-center shrink-0">
                        <button
                          disabled={!isNext || statusChanging}
                          onClick={() => isNext && handleProjectStatusChange(s)}
                          className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all min-w-[60px] ${
                            isCurrent ? 'bg-amber-500/15 ring-1 ring-amber-500/40' :
                            isCompleted ? 'opacity-50' :
                            isNext ? 'hover:bg-slate-800 cursor-pointer' : 'opacity-25'
                          }`}
                        >
                          <div className={`h-2.5 w-2.5 rounded-full ${isCurrent ? 'bg-amber-400' : isCompleted ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                          <span className={`text-[9px] leading-tight text-center ${isCurrent ? 'text-amber-400 font-semibold' : 'text-slate-500'}`}>{translateStatus(s)}</span>
                        </button>
                        {idx < PROJECT_STATUSES.length - 1 && (
                          <div className={`w-6 h-px mx-0.5 ${idx < currentStep ? 'bg-emerald-400/50' : 'bg-slate-800'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Info Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center gap-2 text-slate-500 mb-1"><Package className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider">{t('detail.project.stats.totalItems')}</span></div>
                  <p className="text-xl font-bold text-slate-100">{selectedProject.totalItems}</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center gap-2 text-slate-500 mb-1"><Weight className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider">{t('detail.project.stats.totalWeight')}</span></div>
                  <p className="text-xl font-bold text-slate-100">{selectedProject.totalWeight.toLocaleString()}<span className="text-sm font-normal text-slate-500 mr-1">{t('common.tonnes')}</span></p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center gap-2 text-slate-500 mb-1"><Volume2 className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider">{t('detail.project.stats.totalVolume')}</span></div>
                  <p className="text-xl font-bold text-slate-100">{selectedProject.totalVolume}<span className="text-sm font-normal text-slate-500 mr-1">m³</span></p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <div className="flex items-center gap-2 text-slate-500 mb-1"><MapPin className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider">{t('common.location')}</span></div>
                  <p className="text-sm font-medium text-slate-200 truncate mt-0.5">{selectedProject.destination || t('projects.tbd')}</p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4 text-sm">
                <div className="flex items-center gap-2 text-slate-400"><Users className="h-4 w-4 text-amber-500/60" /><div><p className="text-[10px] text-slate-600">{t('detail.project.overview.client')}</p><p className="text-slate-200">{selectedProject.clientName}</p></div></div>
                <div className="flex items-center gap-2 text-slate-400"><Ship className="h-4 w-4 text-amber-500/60" /><div><p className="text-[10px] text-slate-600">{t('detail.project.overview.vessel')}</p><p className="text-slate-200">{selectedProject.vesselName || t('projects.tbd')}</p></div></div>
                {(selectedProject.etd || selectedProject.eta) && (
                  <div className="flex items-center gap-2 text-slate-400"><Calendar className="h-4 w-4 text-amber-500/60" /><div><p className="text-[10px] text-slate-600">ETD / ETA</p><p className="text-slate-200">{selectedProject.etd ? new Date(selectedProject.etd).toLocaleDateString() : '—'} / {selectedProject.eta ? new Date(selectedProject.eta).toLocaleDateString() : '—'}</p></div></div>
                )}
                {selectedProject.shippingLine && (
                  <div className="flex items-center gap-2 text-slate-400"><Ship className="h-4 w-4 text-amber-500/60" /><div><p className="text-[10px] text-slate-600">{t('detail.project.overview.shippingLine')}</p><p className="text-slate-200">{selectedProject.shippingLine}</p></div></div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cargo Status Breakdown + Progress */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/50 lg:col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-300">{t('projects.cargoItems')}</h3>
                  <span className="text-xs text-slate-500">{projectCargo.length} {t('common.items')}</span>
                </div>
                {detailLoading ? (
                  <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 bg-slate-800" />)}</div>
                ) : projectCargo.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-8">{t('projects.noCargoItems')}</p>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-transparent">
                          <TableHead className="text-xs text-slate-500">{t('projects.table.code')}</TableHead>
                          <TableHead className="text-xs text-slate-500">{t('cargo.table.description')}</TableHead>
                          <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('cargo.table.weight')}</TableHead>
                          <TableHead className="text-xs text-slate-500 hidden md:table-cell">{t('cargo.table.category')}</TableHead>
                          <TableHead className="text-xs text-slate-500">{t('cargo.table.status')}</TableHead>
                          <TableHead className="text-xs text-slate-500 hidden lg:table-cell">{t('cargo.table.location')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectCargo.map((c) => (
                          <TableRow key={c.id} className="border-slate-800 hover:bg-slate-800/50 cursor-pointer">
                            <TableCell className="py-2 text-xs font-mono text-amber-400/80">{c.cargoCode}</TableCell>
                            <TableCell className="py-2 text-xs text-slate-300 max-w-[180px] truncate">{c.description}</TableCell>
                            <TableCell className="py-2 text-xs text-slate-400 hidden sm:table-cell">{c.weight.toLocaleString()}</TableCell>
                            <TableCell className="py-2 hidden md:table-cell"><Badge variant="outline" className="text-[10px] bg-slate-700/50 text-slate-300 border-slate-600">{translateCategory(c.liftCategory)}</Badge></TableCell>
                            <TableCell className="py-2"><Badge variant="outline" className={`text-[10px] ${cargoStatusStyles[c.status] || 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>{translateStatus(c.status)}</Badge></TableCell>
                            <TableCell className="py-2 text-xs text-slate-400 hidden lg:table-cell">{c.location?.code || '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Breakdown */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-4">{t('detail.project.stats.byStatus')}</h3>
                <div className="space-y-3">
                  {Object.entries(cargoStatusCounts).sort((a, b) => b[1] - a[1]).map(([status, count]) => {
                    const pct = Math.round((count / projectCargo.length) * 100);
                    return (
                      <div key={status} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`text-[10px] ${cargoStatusStyles[status] || 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>{translateStatus(status)}</Badge>
                          <span className="text-xs text-slate-400">{count} <span className="text-slate-600">({pct}%)</span></span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Project Movements */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-3">{t('detail.movementHistory')}</h3>
              {projectMovements.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">{t('detail.noMovements')}</p>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-xs text-slate-500">{t('movements.table.ref')}</TableHead>
                        <TableHead className="text-xs text-slate-500">{t('movements.table.cargo')}</TableHead>
                        <TableHead className="text-xs text-slate-500">{t('movements.table.type')}</TableHead>
                        <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('movements.table.from')}</TableHead>
                        <TableHead className="text-xs text-slate-500 hidden sm:table-cell">{t('movements.table.to')}</TableHead>
                        <TableHead className="text-xs text-slate-500">{t('common.date')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectMovements.slice(0, 20).map((m) => (
                        <TableRow key={m.id} className="border-slate-800 hover:bg-slate-800/50">
                          <TableCell className="py-2 text-xs font-mono text-amber-400/80">{m.movementRef}</TableCell>
                          <TableCell className="py-2 text-xs text-slate-300 font-mono">{m.cargoCode}</TableCell>
                          <TableCell className="py-2"><Badge variant="outline" className={`text-[10px] ${cargoStatusStyles[m.type] || 'bg-slate-700/50 text-slate-400 border-slate-600'}`}>{translateStatus(m.type)}</Badge></TableCell>
                          <TableCell className="py-2 text-xs text-slate-400 hidden sm:table-cell">{m.fromLocation?.code || '—'}</TableCell>
                          <TableCell className="py-2 text-xs text-slate-400 hidden sm:table-cell">{m.toLocation?.code || '—'}</TableCell>
                          <TableCell className="py-2 text-xs text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* ========== PROJECT CARDS GRID ========== */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-slate-800 bg-slate-900/50"><CardContent className="p-5 space-y-3"><Skeleton className="h-5 w-3/4 bg-slate-800" /><Skeleton className="h-4 w-1/2 bg-slate-800" /><Skeleton className="h-4 w-full bg-slate-800" /><Skeleton className="h-2 w-full bg-slate-800" /></CardContent></Card>
          )) : projects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">{t('projects.noProjectsFound')}</div>
          ) : projects.map((p) => {
            const received = p.cargoItems?.filter((c) => c.status === 'RECEIVED' || c.status === 'IN_YARD' || c.status === 'IN_WAREHOUSE' || c.status === 'STAGING').length || 0;
            const total = p.totalItems || 0;
            const pct = total > 0 ? Math.round((received / total) * 100) : 0;
            return (
              <Card key={p.id} className="border-slate-800 bg-slate-900/50 cursor-pointer hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-200 group" onClick={() => openProjectDetail(p)}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-100 truncate group-hover:text-amber-400 transition-colors">{p.name}</h3>
                      <p className="text-[11px] font-mono text-slate-600 mt-0.5">{p.projectCode}</p>
                    </div>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${projectStatusStyles[p.status]}`}>{translateStatus(p.status)}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-slate-600" />{p.clientName}</div>
                    <div className="flex items-center gap-1.5"><Ship className="h-3 w-3 text-slate-600" />{p.vesselName || t('projects.tbd')}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><span className="text-slate-600">{t('projects.card.itemsLabel')}</span> <span className="text-slate-300 font-medium">{total}</span></div>
                    <div><span className="text-slate-600">{t('projects.card.weightLabel')}</span> <span className="text-slate-300 font-medium">{p.totalWeight}{t('projects.card.weight')}</span></div>
                    <div><span className="text-slate-600">{t('projects.card.volLabel')}</span> <span className="text-slate-300 font-medium">{p.totalVolume}m³</span></div>
                  </div>
                  {(p.etd || p.eta) && (
                    <div className="flex gap-3 text-[11px] text-slate-500">
                      {p.etd && <span>ETD {new Date(p.etd).toLocaleDateString()}</span>}
                      {p.eta && <span>ETA {new Date(p.eta).toLocaleDateString()}</span>}
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">{t('common.progress')}</span>
                      <span className="text-slate-400">{received}/{total} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${pct}%` }} />
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
        <DialogContent className="border-slate-700 bg-slate-900 max-w-lg">
          <DialogHeader><DialogTitle className="text-slate-100">{t('projects.addNewProject')}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div><Label className="text-slate-400">{t('projects.form.projectName')}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div><Label className="text-slate-400">{t('projects.form.description')}</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1 min-h-[60px]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-slate-400">{t('projects.form.clientName')}</Label><Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
              <div><Label className="text-slate-400">{t('projects.form.clientContact')}</Label><Input value={form.clientContact} onChange={(e) => setForm({ ...form, clientContact: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            </div>
            <div><Label className="text-slate-400">{t('projects.form.destination')}</Label><Input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-slate-400">{t('projects.form.shippingLine')}</Label><Input value={form.shippingLine} onChange={(e) => setForm({ ...form, shippingLine: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
              <div><Label className="text-slate-400">{t('projects.form.vesselName')}</Label><Input value={form.vesselName} onChange={(e) => setForm({ ...form, vesselName: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-slate-400">{t('projects.form.etd')}</Label><Input type="date" value={form.etd} onChange={(e) => setForm({ ...form, etd: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
              <div><Label className="text-slate-400">{t('projects.form.eta')}</Label><Input type="date" value={form.eta} onChange={(e) => setForm({ ...form, eta: e.target.value })} className="border-slate-700 bg-slate-800 text-slate-200 mt-1" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAdd(false); setForm(emptyForm); }} className="border-slate-700 text-slate-300 hover:bg-slate-800">{t('common.cancel')}</Button>
            <Button onClick={handleCreate} disabled={submitting || !form.name || !form.clientName} className="bg-amber-500 hover:bg-amber-600 text-slate-900">{submitting ? t('common.creating') : t('common.create')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
