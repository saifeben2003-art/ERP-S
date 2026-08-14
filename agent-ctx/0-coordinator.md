# Heavy Lift WMS - Coordination & Fixes

## Summary
Reviewed the existing Heavy Lift WMS codebase, identified 9 issues/improvements, and implemented all of them.

## Issues Fixed

### 1. ESLint Configuration (Critical)
- Removed empty `eslint.config.js` that was shadowing `eslint.config.mjs`
- Added `.vercel/**` and `src/generated/**` to ignores

### 2. ThemeProvider & StoreInitializer (Critical)
- Added `ThemeProvider` from `next-themes` wrapping the entire app in `layout.tsx`
- Added `StoreInitializer` component for theme/locale sync
- Set `defaultTheme="dark"` and `disableTransitionOnChange`
- Set initial `lang="ar" dir="rtl"` on `<html>`

### 3. Translation Helper Functions (Bug Fix)
- `translateCommodity()`, `translateEquipmentType()`, `translateLocationType()`, `translateSyncStatus()`, `translateSyncDirection()` all now accept optional `locale` parameter for proper English support

### 4. Missing Arabic Translation Key
- Added `'appTitle': 'نظام إدارة المستودعات'` to Arabic translations

### 5. TypeScript Type Fix
- Added `weightByCategory` and `movementsByDay` fields to `DashboardStats` interface

### 6. RTL-Aware Toast Position
- Changed Toaster `position` from `top-right` to `top-center` (works for both LTR and RTL)

### 7. Sidebar Persistence
- Sidebar now uses Zustand store's `sidebarCollapsed` state (persisted to localStorage)
- Page layout dynamically adjusts margin based on collapsed state
- Added light mode support to all sidebar styles

### 8. Light/Dark Mode Support
- Updated `page.tsx`: header, footer, system online badge, loading states
- Updated `app-sidebar.tsx`: all navigation, mobile sheet, collapse toggle
- Updated `projects-page.tsx`: cards, table, dialog, tabs, buttons
- Updated `locations-page.tsx`: cards, badges, dialogs, type filter buttons
- Updated `equipment-page.tsx`: table, filters, dialogs, tooltips
- Updated `movements-page.tsx`: filter card, table, dialog
- Updated `integration-page.tsx`: config card, event mapping table, sync log
- Updated `cargo-page.tsx`: header, filter card, select dropdowns
- Updated `dashboard-page.tsx`: header text

## Files Modified
- `src/app/layout.tsx` - Added ThemeProvider + StoreInitializer
- `src/app/page.tsx` - Hydration guard, sidebar collapse awareness, light mode classes
- `src/lib/translations.ts` - Fixed all translate* functions, added appTitle
- `src/types/wms.ts` - Extended DashboardStats type
- `src/components/wms/app-sidebar.tsx` - Zustand persistence, light mode
- `src/components/wms/projects-page.tsx` - Full light mode support
- `src/components/wms/locations-page.tsx` - Full light mode support
- `src/components/wms/equipment-page.tsx` - Full light mode support
- `src/components/wms/movements-page.tsx` - Full light mode support
- `src/components/wms/integration-page.tsx` - Full light mode support
- `src/components/wms/cargo-page.tsx` - Header + filters light mode
- `src/components/wms/dashboard-page.tsx` - Header light mode
- `eslint.config.mjs` - Fixed ignores
