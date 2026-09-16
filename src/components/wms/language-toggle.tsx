'use client';

import { Globe } from 'lucide-react';
import { useI18nStore } from '@/lib/i18n-store';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  collapsed?: boolean;
}

export function LanguageToggle({ collapsed = false }: LanguageToggleProps) {
  const { language, toggleLanguage } = useI18nStore();
  const label = language === 'en' ? 'EN' : 'AR';

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg transition-all duration-200',
        'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300',
        'border border-amber-500/20 hover:border-amber-500/30',
        collapsed ? 'h-10 w-10 justify-center px-0' : 'px-3 py-2 text-sm font-medium'
      )}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
