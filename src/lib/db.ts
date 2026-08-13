import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let _db: PrismaClient | undefined

function getPrismaClient(): PrismaClient {
  if (_db) return _db

  const databaseUrl = process.env.DATABASE_URL || ''

  if (databaseUrl.startsWith('libsql://')) {
    // Dynamic import for Vercel serverless compatibility
    const { createClient } = require('@libsql/client')
    const { PrismaLibSql } = require('@prisma/adapter-libsql')

    const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

    const libsql = createClient({
      url: databaseUrl,
      authToken,
    })
    const adapter = new PrismaLibSql(libsql)

    _db = new PrismaClient({
      adapter,
      datasources: { db: { url: 'libsql://dummy' } },
    })
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
  // In dev, eagerly initialize for better error messages
  getPrismaClient()
}
