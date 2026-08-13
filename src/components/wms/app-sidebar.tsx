'use client';

import { useState } from 'react';
import { Box, LayoutDashboard, Package, FolderKanban, MapPin, Wrench, ArrowLeftRight, Plug, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/translations';
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
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="border-slate-700 bg-slate-800 text-slate-200">
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
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
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
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile hamburger */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-slate-800 bg-slate-900 p-0">
            <SheetHeader className="border-b border-slate-800 px-4 py-4">
              <SheetTitle className="flex items-center gap-3 text-right">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                  <Box className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-100">{t('appTitle')}</span>
                  <p className="text-[11px] font-medium text-slate-500">{t('sidebar.subtitle')}</p>
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
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{t(item.labelKey)}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto border-t border-slate-800 p-4">
              <p className="text-[11px] text-slate-600 leading-tight">{t('sidebar.footer')}</p>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-amber-400" />
          <span className="text-sm font-bold text-slate-100">{t('appTitle')}</span>
        </div>
      </div>

      {/* Desktop sidebar - RIGHT side for RTL */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-30 hidden lg:flex flex-col border-l border-slate-800 bg-slate-900 transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-3 border-b border-slate-800 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
            <Box className="h-5 w-5 text-amber-400" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-base font-bold text-slate-100">{t('appTitle')}</span>
              <p className="text-[11px] font-medium text-slate-500">{t('sidebar.subtitle')}</p>
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
        <div className="border-t border-slate-800 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center text-slate-500 hover:text-slate-300 hover:bg-slate-800"
          >
            {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {!collapsed && <span className="mr-2 text-xs">{t('common.collapse')}</span>}
          </Button>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-slate-800 p-4">
            <p className="text-[11px] text-slate-600 leading-tight">{t('sidebar.footer')}</p>
          </div>
        )}
      </aside>
    </>
  );
}
