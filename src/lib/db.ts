import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || ''

  // Use libsql adapter for Turso cloud database
  if (databaseUrl.startsWith('libsql://')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@libsql/client')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaLibSQL } = require('@prisma/adapter-libsql')

    const authToken = process.env.TURSO_AUTH_TOKEN
    const url = authToken ? `${databaseUrl}?authToken=${authToken}` : databaseUrl

    const libsql = createClient({ url })
    const adapter = new PrismaLibSQL(libsql)

    return new PrismaClient({ adapter, log: ['query'] })
  }

  // Local SQLite file
  return new PrismaClient({ log: ['query'] })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
