import { PrismaClient } from '@/generated/client'
import { createClient } from '@libsql/client'
import { PrismaLibSQL } from '@/lib/custom-libsql-adapter'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createDb(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL || ''
  const isTurso = dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://')

  if (isTurso && typeof window === 'undefined') {
    try {
      const config = {
        url: dbUrl,
        authToken: process.env.TURSO_AUTH_TOKEN || '',
      }
      const libsql = createClient(config)
      const adapter = new PrismaLibSQL(libsql, config)

      return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    } catch (err) {
      console.error('Failed to initialize Turso adapter, falling back to plain client:', err)
    }
  }

  // Local development or fallback: use plain SQLite PrismaClient
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createDb()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
