import { PrismaClient } from '@/generated/client'
import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@/lib/custom-libsql-adapter'

let _db: PrismaClient | null = null

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!_db) {
      const databaseUrl = process.env.DATABASE_URL || ''
      if (databaseUrl.startsWith('libsql://')) {
        const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
        const libsql = createClient({ url: databaseUrl, authToken })
        const adapter = new PrismaLibSQL(libsql, { url: databaseUrl, authToken })
        _db = new PrismaClient({ adapter })
      } else {
        _db = new PrismaClient({ datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } } })
      }
    }
    const value = Reflect.get(_db, prop, receiver)
    if (typeof value === 'function') return value.bind(_db)
    return value
  },
})
