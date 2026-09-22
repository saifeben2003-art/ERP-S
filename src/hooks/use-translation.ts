import { useI18nStore, type Language } from '@/lib/i18n-store';
import translations from '@/lib/translations';

function getNestedValue(obj: unknown, path: string): string {
  if (!obj || typeof obj !== 'object') return path;
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function useTranslation() {
  const language = useI18nStore((s) => s.language);

  const t = (key: string): string => {
    try {
      const dict = translations[language] as unknown as Record<string, unknown>;
      return getNestedValue(dict, key);
    } catch {
      return key;
    }
  };

  const isRTL = language === 'ar';

  return { t, lang: language, isRTL };
}