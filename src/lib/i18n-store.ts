import { create } from 'zustand';

export type Language = 'en' | 'ar';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = 'cl-wms-language';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export const useI18nStore = create<I18nState>((set) => ({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {
    if (isBrowser()) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      } catch {
        /* storage unavailable */
      }
    }
    set({ language: lang });
  },
  toggleLanguage: () => {
    set((state) => {
      const next: Language = state.language === 'en' ? 'ar' : 'en';
      if (isBrowser()) {
        try {
          localStorage.setItem(STORAGE_KEY, next);
          document.documentElement.setAttribute('lang', next);
          document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
        } catch {
          /* storage unavailable */
        }
      }
      return { language: next };
    });
  },
}));

/** Call once on app mount to hydrate from localStorage */
export function hydrateI18n() {
  if (!isBrowser()) return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const lang: Language = stored === 'ar' ? 'ar' : 'en';
    useI18nStore.getState().setLanguage(lang);
  } catch {
    // ignore
  }
}
