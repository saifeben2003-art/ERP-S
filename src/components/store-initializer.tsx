'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/lib/store';

export function StoreInitializer() {
  const { setTheme } = useTheme();
  const appTheme = useAppStore((s) => s.theme);
  const appLocale = useAppStore((s) => s.locale);

  // Sync store theme with next-themes
  useEffect(() => {
    if (appTheme === 'system') {
      setTheme('system');
    } else {
      setTheme(appTheme);
    }
  }, [appTheme, setTheme]);

  // Update document dir/lang based on locale
  useEffect(() => {
    const html = document.documentElement;
    html.lang = appLocale;
    html.dir = appLocale === 'ar' ? 'rtl' : 'ltr';
  }, [appLocale]);

  return null;
}
