'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Languages, Download, RefreshCw, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AppSidebar } from '@/components/wms/app-sidebar';
import { DashboardPage } from '@/components/wms/dashboard-page';
import { CargoPage } from '@/components/wms/cargo-page';
import { ProjectsPage } from '@/components/wms/projects-page';
import { LocationsPage } from '@/components/wms/locations-page';
import { EquipmentPage } from '@/components/wms/equipment-page';
import { MovementsPage } from '@/components/wms/movements-page';
import { IntegrationPage } from '@/components/wms/integration-page';
import type { WmsPage } from '@/types/wms';
import { cn } from '@/lib/utils';
import { useTranslation, translate } from '@/lib/translations';
import { useAppStore, type ThemeMode } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { exportCargoToCsv, exportProjectsToCsv, exportLocationsToCsv, exportEquipmentToCsv, exportMovementsToCsv } from '@/lib/export-utils';

function ExportBtn({ page }: { page: WmsPage }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  if (page === 'dashboard' || page === 'integration') return null;
  const doExport = async () => {
    setLoading(true);
    try {
      const urls: Record<string, string> = { cargo: '/api/cargo?limit=9999', projects: '/api/projects?limit=9999', locations: '/api/locations?limit=9999', equipment: '/api/equipment?limit=9999', movements: '/api/movements?limit=9999' };
      const res = await fetch(urls[page] || '');
      const json = await res.json();
      const data = json.data?.items || json.items || json.data || [];
      const fns: Record<string, (d: Record<string, unknown>[]) => void> = { cargo: exportCargoToCsv, projects: exportProjectsToCsv, locations: exportLocationsToCsv, equipment: exportEquipmentToCsv, movements: exportMovementsToCsv };
      fns[page]?.(data as Record<string, unknown>[]);
      toast.success(t(`${page}.toast.exported`));
    } catch { toast.error('Export failed'); }
    finally { setLoading(false); }
  };
  return (
    <Button variant="ghost" size="sm" onClick={doExport} disabled={loading} className="dark:text-slate-400 text-slate-500 dark:hover:text-emerald-400 hover:text-emerald-600 dark:hover:bg-slate-800/50 hover:bg-slate-100 gap-1.5 h-8 px-3">
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline text-xs">{t('common.export')}</span>
    </Button>
  );
}

export default function WmsApp() {
  const [activePage, setActivePage] = useState<WmsPage>('dashboard');
  const [seeded, setSeeded] = useState(false);
  const [rk, setRk] = useState(0);
  const { t, locale } = useTranslation();
  const setLocale = useAppStore((s) => s.setLocale);
  const theme = useAppStore((s) => s.theme);
  const setAppTheme = useAppStore((s) => s.setTheme);
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    let m = true;
    fetch('/api/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ force: true }) }).then(() => { if (m) setSeeded(true); }).catch(() => { if (m) setSeeded(true); });
    return () => { m = false; };
  }, []);

  const onTheme = useCallback((v: ThemeMode) => { setAppTheme(v); setTheme(v === 'system' ? 'system' : v); }, [setAppTheme, setTheme]);

  const hm: Record<WmsPage, string> = { dashboard: t('header.dashboard'), cargo: t('header.cargoManagement'), projects: t('header.projectCargo'), locations: t('header.locations'), equipment: t('header.equipmentLifting'), movements: t('header.movementLog'), integration: t('header.sapIntegration') };
  const pg = () => { const k = `${activePage}-${rk}`; switch (activePage) { case 'dashboard': return <DashboardPage key={k} onNavigate={setActivePage} />; case 'cargo': return <CargoPage key={k} />; case 'projects': return <ProjectsPage key={k} />; case 'locations': return <LocationsPage key={k} />; case 'equipment': return <EquipmentPage key={k} />; case 'movements': return <MovementsPage key={k} />; case 'integration': return <IntegrationPage key={k} />; default: return <DashboardPage key={k} onNavigate={setActivePage} />; } };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#0e1019] bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm dark:text-slate-500 text-slate-400">{t('init.wmsSystem')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen flex', 'dark:bg-[#0e1019] bg-slate-50', 'dark:text-slate-100 text-slate-900')} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <AppSidebar activePage={activePage} onPageChange={setActivePage} />
      <main className={cn('flex-1 min-h-screen transition-all duration-300', sidebarCollapsed ? (locale === 'ar' ? 'lg:mr-[68px]' : 'lg:ml-[68px]') : (locale === 'ar' ? 'lg:mr-64' : 'lg:ml-64'))}>
        <div className="h-14 lg:hidden" />
        <header className={cn('sticky top-0 z-20 border-b backdrop-blur-md', 'dark:border-slate-800/60 border-slate-200', 'dark:bg-[#0e1019]/80 bg-white/80')}>
          <div className="flex h-14 items-center justify-between px-4 md:px-6">
            <h1 className={cn('text-lg font-semibold', 'dark:text-slate-100 text-slate-900')}>{hm[activePage]}</h1>
            <div className="flex items-center gap-1.5">
              <ExportBtn page={activePage} />
              <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700" onClick={() => setRk((k) => k + 1)}><RefreshCw className="h-3.5 w-3.5" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600 gap-1.5 h-8 px-2"><Languages className="h-3.5 w-3.5" /><span className="text-xs font-medium uppercase">{locale}</span></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => setLocale('ar')} className={locale === 'ar' ? 'bg-amber-500/10 text-amber-400' : ''}><span className="ml-2">العربية</span></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale('en')} className={locale === 'en' ? 'bg-amber-500/10 text-amber-400' : ''}><span className="ml-2">English</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600">{theme === 'light' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => onTheme('dark')} className={theme === 'dark' ? 'bg-amber-500/10 text-amber-400' : ''}><Moon className="h-4 w-4 ml-2" /><span>{t('common.dark')}</span></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTheme('light')} className={theme === 'light' ? 'bg-amber-500/10 text-amber-400' : ''}><Sun className="h-4 w-4 ml-2" /><span>{t('common.light')}</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className={cn('hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5', 'dark:bg-slate-800/50 bg-slate-100')}><div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><span className={cn('text-xs font-medium', 'dark:text-slate-400 text-slate-500')}>{t('common.systemOnline')}</span></div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6">{seeded ? pg() : <div className="flex items-center justify-center min-h-[60vh]"><div className="text-center"><div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-sm dark:text-slate-400 text-slate-500">{t('init.wmsSystem')}</p></div></div>}</div>
        <footer className={cn('mt-auto border-t backdrop-blur-md', 'dark:border-slate-800/60 border-slate-200', 'dark:bg-[#0e1019]/80 bg-white/80')}><div className="flex h-12 items-center justify-between px-6"><p className={cn('text-[11px]', 'dark:text-slate-600 text-slate-400')}>{t('footer.left')}</p><p className={cn('text-[11px]', 'dark:text-slate-600 text-slate-400')}>{t('footer.right')}</p></div></footer>
      </main>
    </div>
  );
}