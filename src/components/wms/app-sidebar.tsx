'use client';

import { Box, LayoutDashboard, Package, FolderKanban, MapPin, Wrench, ArrowLeftRight, Plug, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/translations';
import { useAppStore } from '@/lib/store';
import type { WmsPage } from '@/types/wms';

interface SidebarProps {
  activePage: WmsPage;
  onPageChange: (page: WmsPage) => void;
}

interface NavItem {
  page: WmsPage;
  labelKey: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { page: 'dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { page: 'cargo', labelKey: 'nav.cargoItems', icon: Package },
  { page: 'projects', labelKey: 'nav.projects', icon: FolderKanban },
  { page: 'locations', labelKey: 'nav.locations', icon: MapPin },
  { page: 'equipment', labelKey: 'nav.equipment', icon: Wrench },
  { page: 'movements', labelKey: 'nav.movements', icon: ArrowLeftRight },
  { page: 'integration', labelKey: 'nav.sapIntegration', icon: Plug },
];

function NavButton({ item, active, onClick, collapsed, t }: { item: NavItem; active: boolean; onClick: () => void; collapsed: boolean; t: (k: string) => string }) {
  const Icon = item.icon;

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200',
              active
                ? 'bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10'
                : 'dark:text-slate-400 text-slate-500 dark:hover:bg-slate-700/50 hover:bg-slate-100 hover:dark:text-slate-200 hover:text-slate-900'
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="dark:border-slate-700 border-slate-200 dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-700">
          {t(item.labelKey)}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10'
          : 'dark:text-slate-400 text-slate-500 dark:hover:bg-slate-700/50 hover:bg-slate-100 dark:hover:text-slate-200 hover:text-slate-900'
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{t(item.labelKey)}</span>
      {active && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />
      )}
    </button>
  );
}

export function AppSidebar({ activePage, onPageChange }: SidebarProps) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const setCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile hamburger */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 border-b dark:border-slate-800 border-slate-200 dark:bg-slate-900 bg-white px-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-900">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 dark:border-slate-800 border-slate-200 dark:bg-slate-900 bg-white p-0">
            <SheetHeader className="dark:border-b-slate-800 border-b-slate-200 px-4 py-4">
              <SheetTitle className="flex items-center gap-3 text-right">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                  <Box className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-base font-bold dark:text-slate-100 text-slate-900">{t('appTitle')}</span>
                  <p className="text-[11px] font-medium dark:text-slate-500 text-slate-400">{t('sidebar.subtitle')}</p>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onPageChange(item.page)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    activePage === item.page
                      ? 'bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10'
                      : 'dark:text-slate-400 text-slate-500 dark:hover:bg-slate-700/50 hover:bg-slate-100 dark:hover:text-slate-200 hover:text-slate-900'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto dark:border-t-slate-800 border-t-slate-200 p-4">
              <p className="text-[11px] dark:text-slate-600 text-slate-400 leading-tight">{t('sidebar.footer')}</p>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-bold dark:text-slate-100 text-slate-900">{t('appTitle')}</span>
        </div>
      </div>

      {/* Desktop sidebar - RIGHT side for RTL */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-30 hidden lg:flex flex-col transition-all duration-300',
          'dark:border-l-slate-800 border-l-slate-200 dark:bg-slate-900 bg-white',
          collapsed ? 'w-[68px]' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-3 dark:border-b-slate-800 border-b-slate-200 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
            <Box className="h-5 w-5 text-amber-400" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-base font-bold dark:text-slate-100 text-slate-900">{t('appTitle')}</span>
              <p className="text-[11px] font-medium dark:text-slate-500 text-slate-400">{t('sidebar.subtitle')}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavButton
              key={item.page}
              item={item}
              active={activePage === item.page}
              onClick={() => onPageChange(item.page)}
              collapsed={collapsed}
              t={t}
            />
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="dark:border-t-slate-800 border-t-slate-200 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center dark:text-slate-500 text-slate-400 dark:hover:text-slate-300 hover:text-slate-600 dark:hover:bg-slate-800 hover:bg-slate-100"
          >
            {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {!collapsed && <span className="mr-2 text-xs">{t('common.collapse')}</span>}
          </Button>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="dark:border-t-slate-800 border-t-slate-200 p-4">
            <p className="text-[11px] dark:text-slate-600 text-slate-400 leading-tight">{t('sidebar.footer')}</p>
          </div>
        )}
      </aside>
    </>
  );
}
