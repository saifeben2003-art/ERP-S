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
    const url = authToken ? `${databaseUrl}?authToken=${authToken}` : databaseUrl

    const libsql = createClient({ url, authToken })
    const adapter = new PrismaLibSql(libsql)

    return new PrismaClient({ adapter, log: ['query'] })
  }

  // Local SQLite file
  return new PrismaClient({ log: ['query'] })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
