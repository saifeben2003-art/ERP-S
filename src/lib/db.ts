import { PrismaClient } from '@/generated/client'
import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

let _db: PrismaClient | null = null

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!_db) {
      const databaseUrl = process.env.DATABASE_URL || ''
      try {
        if (databaseUrl.startsWith('libsql://')) {
          const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
          const libsql = createClient({ url: databaseUrl, authToken })
          const adapter = new PrismaLibSQL(libsql)
          _db = new PrismaClient({ adapter })
        } else {
          _db = new PrismaClient({ datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } } })
        }
      } catch (err: any) {
        // If adapter fails, try without it as fallback
        console.error('[db] Adapter init failed:', err.message)
        _db = new PrismaClient({ datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } } })
      }
    }
    const value = Reflect.get(_db, prop, receiver)
    if (typeof value === 'function') return value.bind(_db)
    return value
  },
})
