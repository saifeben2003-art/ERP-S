import { PrismaClient } from '@prisma/client'

let _db: PrismaClient | null = null

export function getDb(): PrismaClient {
  if (!_db) {
    const databaseUrl = process.env.DATABASE_URL || ''

    if (databaseUrl.startsWith('libsql://')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createClient } = require('@libsql/client')
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaLibSQL } = require('@prisma/adapter-libsql')

      const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
      const libsql = createClient({ url: databaseUrl, authToken })
      const adapter = new PrismaLibSQL(libsql)

      _db = new PrismaClient({ adapter })
    } else {
      _db = new PrismaClient({
        datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } },
      })
    }
  }
  return _db
}

// Lazy proxy for backward compatibility with `db.cargoItem.count()` syntax
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getDb()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') return value.bind(client)
    return value
  },
})
