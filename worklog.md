---
Task ID: 1
Agent: Main Coordinator
Task: Fix expired GitHub token, push code to ERP-S, deploy to Vercel with Turso Cloud DB

Work Log:
- Tested new GitHub fine-grained PAT (github_pat_11CLARSLY0...) - returned 200 OK
- Updated erp-origin remote URL with new token
- Pushed 6 commits to ERP-S.git (TypeScript fixes, build script fix, Turso adapter, seed improvements)
- Fixed critical Vercel build error: removed `cp -r .next/standalone/...` from build script (standalone output not configured)
- Added Turso adapter to db.ts for production (uses @libsql/client + custom-libsql-adapter when DATABASE_URL starts with libsql://)
- Installed async-mutex dependency for the adapter
- Updated Vercel env vars: DATABASE_URL to new Turso URL (new-1-wms-luminous-libra-tjgequ.aws-ap-northeast-1.turso.io)
- Updated Vercel env vars: TURSO_AUTH_TOKEN with fresh token from user
- Pushed Prisma schema to new Turso database using `prisma migrate diff --from-empty --script` + libsql executeMultiple
- 7 tables created: CargoItem, Equipment, Location, Movement, Project, SAPIntegration, SyncLog
- Triggered redeployment via empty git commit push
- Vercel deployment: READY state
- Seeded Turso database via POST /api/seed - 18 cargo, 5 projects, 8 locations, 10 equipment, 20 movements
- Browser verification: Dashboard loads with Arabic RTL, all KPIs show real data
- Browser verification: Cargo page works, Add Cargo dialog works (previous "length undefined" bug FIXED)
- Browser verification: Language toggle English/Arabic works
- Browser verification: All API endpoints return correct data

Stage Summary:
- Vercel deployment URL: https://my-project-nana-d430.vercel.app
- All APIs functional: dashboard, cargo, projects, locations, equipment, movements, seed
- Arabic/English i18n with RTL support working
- Turso Cloud DB connected with fresh token
- Critical "Cannot read properties of undefined (reading 'length')" bug confirmed FIXED
- Production build succeeds, deployment in READY state
