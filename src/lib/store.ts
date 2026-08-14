import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light' | 'system';

interface AppState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: 'ar',
      setLocale: (locale) => set({ locale }),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      sidebarCollapsed: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: 'wms-app-store',
      partialize: (state) => ({ locale: state.locale, theme: state.theme }),
    }
  )
);
