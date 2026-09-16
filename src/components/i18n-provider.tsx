'use client';

import { useEffect } from 'react';
import { hydrateI18n } from '@/lib/i18n-store';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    hydrateI18n();
  }, []);

  return <>{children}</>;
}
