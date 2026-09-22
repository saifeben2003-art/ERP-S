import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light' | 'system';

/** Debounce timer ID (module-level so it survives across store calls) */
let searchTimer: ReturnType<typeof setTimeout> | null = null;
const SEARCH_DEBOUNCE_MS = 300;

interface AppState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  /** The debounced search value — pages should read THIS for filtering */
  globalSearch: string;
  setGlobalSearch: (v: string) => void;
  /** The raw input value — the search input binds to THIS for snappy typing */
  globalSearchInput: string;
  setGlobalSearchInput: (v: string) => void;
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
      globalSearch: '',
      setGlobalSearch: (globalSearch) => set({ globalSearch }),
      globalSearchInput: '',
      /** Update the input immediately (for display), debounce the actual search value */
      setGlobalSearchInput: (v) => {
        set({ globalSearchInput: v });
        if (searchTimer) clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          set({ globalSearch: v });
          searchTimer = null;
        }, SEARCH_DEBOUNCE_MS);
      },
    }),
    {
      name: 'wms-app-store',
      partialize: (state) => ({ locale: state.locale, theme: state.theme }),
    }
  )
);
