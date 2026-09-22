'use client';

import { useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { Sun, Moon, Languages, Download, RefreshCw, Loader2, Search, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { AppSidebar } from '@/components/wms/app-sidebar';
import { DashboardPage } from '@/components/wms/dashboard-page';

// Lazy-loaded pages — only fetched when the user navigates to them
const CargoPage = lazy(() => import('@/components/wms/cargo-page').then(m => ({ default: m.CargoPage })));
const ProjectsPage = lazy(() => import('@/components/wms/projects-page').then(m => ({ default: m.ProjectsPage })));
const LocationsPage = lazy(() => import('@/components/wms/locations-page').then(m => ({ default: m.LocationsPage })));
const EquipmentPage = lazy(() => import('@/components/wms/equipment-page').then(m => ({ default: m.EquipmentPage })));
const MovementsPage = lazy(() => import('@/components/wms/movements-page').then(m => ({ default: m.MovementsPage })));
const IntegrationPage = lazy(() => import('@/components/wms/integration-page').then(m => ({ default: m.IntegrationPage })));
const InvoicesPage = lazy(() => import('@/components/wms/invoices-page').then(m => ({ default: m.InvoicesPage })));
const StandardsPage = lazy(() => import('@/components/wms/standards-page').then(m => ({ default: m.StandardsPage })));
const ReportsPage = lazy(() => import('@/components/wms/reports-page').then(m => ({ default: m.ReportsPage })));
const ScannerPage = lazy(() => import('@/components/wms/scanner-page').then(m => ({ default: m.ScannerPage })));

/** Skeleton shown while a lazy-loaded page chunk is being fetched */
function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg" />
    </div>
  );
}
import { LoginPage } from '@/components/wms/login-page';
import { RegisterPage } from '@/components/wms/register-page';
import type { WmsPage } from '@/types/wms';
import { cn } from '@/lib/utils';
import { useTranslation, translate } from '@/lib/translations';
import { useAppStore, type ThemeMode } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { exportCargoToCsv, exportProjectsToCsv, exportLocationsToCsv, exportEquipmentToCsv, exportMovementsToCsv } from '@/lib/export-utils';
import { NotificationsPanel } from '@/components/wms/notifications-panel';

function ExportBtn({ page }: { page: WmsPage }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  if (page === 'dashboard' || page === 'integration' || page === 'scanner' || page === 'reports') return null;
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

/** Auth gate — shows login/register when unauthenticated, WMS app when authenticated */
function AuthGate() {
  const { status } = useSession();
  const [showRegister, setShowRegister] = useState(false);

  // Loading state while session is being checked
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#0a0c14] bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm dark:text-slate-500 text-slate-400">CL WMS</p>
        </div>
      </div>
    );
  }

  // Unauthenticated — show login or register
  if (status === 'unauthenticated') {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
  }

  // Authenticated — show the WMS app
  return <WmsApp />;
}

export default function Page() {
  return <AuthGate />;
}

function WmsApp() {
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
  const globalSearch = useAppStore((s) => s.globalSearch);
  const setGlobalSearch = useAppStore((s) => s.setGlobalSearch);
  const globalSearchInput = useAppStore((s) => s.globalSearchInput);
  const setGlobalSearchInput = useAppStore((s) => s.setGlobalSearchInput);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Clear global search when switching pages
  const handlePageChange = useCallback((page: WmsPage) => {
    setGlobalSearch('');
    setGlobalSearchInput('');
    setActivePage(page);
  }, [setGlobalSearch, setGlobalSearchInput]);

  // Seed only once per browser session (not on every mount / HMR refresh)
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('wms-seeded')) {
      setSeeded(true);
      return;
    }
    let m = true;
    fetch('/api/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ force: true }) })
      .then(() => {
        if (m) {
          sessionStorage.setItem('wms-seeded', '1');
          setSeeded(true);
        }
      })
      .catch(() => { if (m) setSeeded(true); });
    return () => { m = false; };
  }, []);

  const onTheme = useCallback((v: ThemeMode) => { setAppTheme(v); setTheme(v === 'system' ? 'system' : v); }, [setAppTheme, setTheme]);

  const hm: Record<WmsPage, string> = { dashboard: t('header.dashboard'), cargo: t('header.cargoManagement'), projects: t('header.projectCargo'), locations: t('header.locations'), equipment: t('header.equipmentLifting'), movements: t('header.movementLog'), invoices: t('header.invoices'), scanner: t('header.scanner'), reports: t('header.reports'), standards: t('header.standards'), integration: t('header.sapIntegration') };
  // Memoize the page key so the component only re-mounts on actual page/refresh change
  const pageKey = useMemo(() => `${activePage}-${rk}`, [activePage, rk]);

  const pg = useCallback(() => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage key={pageKey} onNavigate={handlePageChange} />;
      case 'cargo': return <CargoPage key={pageKey} />;
      case 'projects': return <ProjectsPage key={pageKey} />;
      case 'locations': return <LocationsPage key={pageKey} />;
      case 'equipment': return <EquipmentPage key={pageKey} />;
      case 'movements': return <MovementsPage key={pageKey} />;
      case 'invoices': return <InvoicesPage key={pageKey} />;
      case 'scanner': return <ScannerPage key={pageKey} />;
      case 'reports': return <ReportsPage key={pageKey} />;
      case 'standards': return <StandardsPage key={pageKey} />;
      case 'integration': return <IntegrationPage key={pageKey} />;
      default: return <DashboardPage key={pageKey} onNavigate={handlePageChange} />;
    }
  }, [activePage, pageKey, handlePageChange]);

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
      <AppSidebar activePage={activePage} onPageChange={handlePageChange} />
      <main className={cn('flex-1 min-h-screen transition-all duration-300', sidebarCollapsed ? 'lg:ms-[68px]' : 'lg:ms-64')}>
        <div className="h-14 lg:hidden" />
        <header className={cn('sticky top-0 z-20 border-b backdrop-blur-md', 'dark:border-slate-800/60 border-slate-200', 'dark:bg-[#0e1019]/80 bg-white/80')}>
          <div className="flex h-14 items-center justify-between px-4 md:px-6">
            <h1 className={cn('text-lg font-semibold', 'dark:text-slate-100 text-slate-900')}>{hm[activePage]}</h1>
            {/* Global Search */}
            <div className={cn('flex-1 flex justify-center max-w-md mx-2 sm:mx-4 transition-all duration-200', searchFocused && 'max-w-lg')}>
              <div className="relative w-full">
                <Search className={cn('absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors', searchFocused ? 'text-amber-500' : 'dark:text-slate-500 text-slate-400')} />
                <Input
                  placeholder={t('common.search') + '...'}
                  value={globalSearchInput}
                  onChange={(e) => setGlobalSearchInput(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn('h-9 w-full text-sm ps-9 transition-all duration-200', 'dark:border-slate-700 border-slate-300', searchFocused ? 'dark:bg-slate-800 bg-slate-100 border-amber-500/50 dark:border-amber-500/50' : 'dark:bg-slate-800/50 bg-slate-100/80', 'dark:text-slate-200 text-slate-800 placeholder:dark:text-slate-600 placeholder:text-slate-400 focus-visible:ring-amber-500/30')}
                />
                {globalSearchInput && (
                  <button
                    onClick={() => { setGlobalSearch(''); setGlobalSearchInput(''); }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400 hover:dark:text-slate-300 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ExportBtn page={activePage} />
              <NotificationsPanel />
              <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700" onClick={() => setRk((k) => k + 1)}><RefreshCw className="h-3.5 w-3.5" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600 gap-1.5 h-8 px-2"><Languages className="h-3.5 w-3.5" /><span className="text-xs font-medium uppercase">{locale}</span></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => setLocale('ar')} className={locale === 'ar' ? 'bg-amber-500/10 text-amber-400' : ''}><span className="ms-2">العربية</span></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale('en')} className={locale === 'en' ? 'bg-amber-500/10 text-amber-400' : ''}><span className="ms-2">English</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 dark:text-slate-400 text-slate-500 dark:hover:text-amber-400 hover:text-amber-600">{theme === 'light' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => onTheme('dark')} className={theme === 'dark' ? 'bg-amber-500/10 text-amber-400' : ''}><Moon className="h-4 w-4 ms-2" /><span>{t('common.dark')}</span></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onTheme('light')} className={theme === 'light' ? 'bg-amber-500/10 text-amber-400' : ''}><Sun className="h-4 w-4 ms-2" /><span>{t('common.light')}</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className={cn('hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5', 'dark:bg-slate-800/50 bg-slate-100')}><div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><span className={cn('text-xs font-medium', 'dark:text-slate-400 text-slate-500')}>{t('common.systemOnline')}</span></div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6">{seeded ? <Suspense fallback={<PageSkeleton />}>{pg()}</Suspense> : <div className="flex items-center justify-center min-h-[60vh]"><div className="text-center"><div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-sm dark:text-slate-400 text-slate-500">{t('init.wmsSystem')}</p></div></div>}</div>
        <footer className={cn('mt-auto border-t backdrop-blur-md', 'dark:border-slate-800/60 border-slate-200', 'dark:bg-[#0e1019]/80 bg-white/80')}><div className="flex h-12 items-center justify-between px-6"><p className={cn('text-[11px]', 'dark:text-slate-600 text-slate-400')}>{t('footer.left')}</p><p className={cn('text-[11px]', 'dark:text-slate-600 text-slate-400')}>{t('footer.right')}</p></div></footer>
      </main>
    </div>
  );
}
