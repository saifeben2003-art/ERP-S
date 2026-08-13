'use client';

import { useState, useEffect } from 'react';
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
import { useTranslation } from '@/lib/translations';

export default function WmsApp() {
  const [activePage, setActivePage] = useState<WmsPage>('dashboard');
  const [seeded, setSeeded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;
    fetch('/api/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ force: true }) })
      .then(() => { if (mounted) setSeeded(true); })
      .catch(() => { if (mounted) setSeeded(true); });
    return () => { mounted = false; };
  }, []);

  const headerMap: Record<WmsPage, string> = {
    dashboard: t('header.dashboard'),
    cargo: t('header.cargoManagement'),
    projects: t('header.projectCargo'),
    locations: t('header.locations'),
    equipment: t('header.equipmentLifting'),
    movements: t('header.movementLog'),
    integration: t('header.sapIntegration'),
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage onNavigate={setActivePage} />;
      case 'cargo': return <CargoPage />;
      case 'projects': return <ProjectsPage />;
      case 'locations': return <LocationsPage />;
      case 'equipment': return <EquipmentPage />;
      case 'movements': return <MovementsPage />;
      case 'integration': return <IntegrationPage />;
      default: return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0e1019]" dir="rtl">
      <AppSidebar activePage={activePage} onPageChange={setActivePage} />
      
      {/* Main content area */}
      <main
        className={cn(
          'flex-1 min-h-screen transition-all duration-300',
          'lg:mr-64'
        )}
      >
        {/* Mobile top padding for fixed header */}
        <div className="h-14 lg:hidden" />
        
        {/* Page header */}
        <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-[#0e1019]/80 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-slate-100">
                {headerMap[activePage]}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-800/50 px-3 py-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-400">{t('common.systemOnline')}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-6">
          {seeded ? renderPage() : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="h-8 w-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-400">{t('init.wmsSystem')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800/60 bg-[#0e1019]/80 backdrop-blur-md">
          <div className="flex h-12 items-center justify-between px-6">
            <p className="text-[11px] text-slate-600">{t('footer.left')}</p>
            <p className="text-[11px] text-slate-600">{t('footer.right')}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
