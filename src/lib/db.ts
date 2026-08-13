import { PrismaClient } from '@prisma/client'

let _db: PrismaClient | null = null

export function getDb(): PrismaClient {
  if (!_db) {
    const databaseUrl = process.env.DATABASE_URL || ''
    console.log('[db] DATABASE_URL:', databaseUrl ? databaseUrl.substring(0, 30) + '...' : 'EMPTY')
    console.log('[db] TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN ? 'SET' : 'NOT_SET')

    if (databaseUrl.startsWith('libsql://')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createClient } = require('@libsql/client')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const adapterModule = require('@prisma/adapter-libsql')
      console.log('[db] adapter exports:', Object.keys(adapterModule))

      const AdapterClass = adapterModule.PrismaLibSQL || adapterModule.PrismaLibSql
      console.log('[db] Adapter class:', AdapterClass?.name || 'NOT FOUND')

      if (!AdapterClass) throw new Error('No adapter class found in @prisma/adapter-libsql')

      const libsql = createClient({ url: databaseUrl, authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN })
      const adapter = new AdapterClass(libsql)
      console.log('[db] Adapter created:', adapter?.constructor?.name)

      _db = new PrismaClient({ adapter })
      console.log('[db] PrismaClient created with adapter')
    } else {
      _db = new PrismaClient({
        datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } },
      })
      console.log('[db] PrismaClient created with datasource')
    }
  }
  return _db
}

// Proxy for backward compatibility
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getDb()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') return value.bind(client)
    return value
  },
})
