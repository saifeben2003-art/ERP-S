'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/components/wms/auth-context';

/**
 * Client-side providers that must wrap the app.
 * - SessionProvider: NextAuth session context (required for useSession)
 * - AuthProvider: WMS auth context (uses useSession internally)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
