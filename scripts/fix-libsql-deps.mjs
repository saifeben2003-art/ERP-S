import { existsSync, rmSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Resolve paths
const adapterPath = join(process.cwd(), 'node_modules/@prisma/adapter-libsql/node_modules/@libsql/client');
const topLibsql = join(process.cwd(), 'node_modules/@libsql/client');

if (existsSync(adapterPath)) {
  console.log('[fix-deps] Removing nested @libsql/client from adapter...');
  rmSync(adapterPath, { recursive: true, force: true });
  mkdirSync(dirname(adapterPath), { recursive: true });
  execSync(`ln -s "${topLibsql}" "${adapterPath}"`);
  console.log('[fix-deps] Symlinked top-level @libsql/client into adapter');
} else {
  console.log('[fix-deps] No nested @libsql/client found (already hoisted)');
}
