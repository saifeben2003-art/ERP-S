import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || ''

  // Use libsql adapter for Turso cloud database
  if (databaseUrl.startsWith('libsql://')) {
    const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

    const libsql = createClient({
      url: databaseUrl,
      authToken,
    })
    const adapter = new PrismaLibSql(libsql)

    return new PrismaClient({
      adapter,
      datasources: { db: { url: 'libsql://dummy' } },
    })
  }

  // Local SQLite file
  return new PrismaClient({
    log: ['query'],
    datasources: { db: { url: databaseUrl || 'file:./db/custom.db' } },
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
