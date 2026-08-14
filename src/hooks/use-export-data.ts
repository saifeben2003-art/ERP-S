'use client';

import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook that registers data for CSV export via the header export button.
 * Call this in any page component with the current data to enable the export button.
 */
export function useExportData(data: Record<string, unknown>[]) {
  const setDataRef = useRef<((d: Record<string, unknown>[]) => void) | null>(null);

  useEffect(() => {
    setDataRef.current = (window as Record<string, unknown>).__wmsExportData as ((d: Record<string, unknown>[]) => void) | null;
  }, []);

  useEffect(() => {
    setDataRef.current?.(data);
  }, [data]);

  return useCallback((newData: Record<string, unknown>[]) => {
    setDataRef.current?.(newData);
  }, []);
}