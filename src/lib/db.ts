import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let _db: PrismaClient | undefined

function getPrismaClient(): PrismaClient {
  if (_db) return _db

  const databaseUrl = process.env.DATABASE_URL || ''

  if (databaseUrl.startsWith('libsql://')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const libsqlModule = require('@libsql/client')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const adapterModule = require('@prisma/adapter-libsql')

    const createClient = libsqlModule.createClient
    const PrismaLibSQL = adapterModule.PrismaLibSQL

    if (!createClient || !PrismaLibSQL) {
      throw new Error(`Missing exports: createClient=${!!createClient}, PrismaLibSQL=${!!PrismaLibSQL}, adapterKeys=${Object.keys(adapterModule).join(',')}`)
    }

    const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

    const libsql = createClient({
      url: databaseUrl,
      authToken,
    })
    const adapter = new PrismaLibSQL(libsql)

    _db = new PrismaClient({ adapter })
  } else {
    _db = new PrismaClient({
      datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } },
    })
  }

  return _db
}

// Lazy initialization via Proxy
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient()
    const value = (client as any)[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

if (process.env.NODE_ENV !== 'production') {
  getPrismaClient()
}
