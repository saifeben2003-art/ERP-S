import { PrismaClient } from '@/generated/client'
import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

let _db: PrismaClient | null = null

function getDb(): PrismaClient {
  if (!_db) {
    const databaseUrl = process.env.DATABASE_URL || ''

    if (databaseUrl.startsWith('libsql://')) {
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

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getDb()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') return value.bind(client)
    return value
  },
})
