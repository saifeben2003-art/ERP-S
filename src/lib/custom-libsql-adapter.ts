/**
 * Custom Prisma driver adapter for libsql.
 *
 * This adapter avoids the bug in the official `@prisma/adapter-libsql` package,
 * which bundles its own nested `@libsql/client` dependency that cannot access
 * environment variables on Vercel. By importing `@libsql/client` at the top level
 * of the project, this adapter uses the correctly-resolved package that has
 * access to the runtime environment.
 *
 * Usage:
 * ```ts
 * import { createClient } from '@libsql/client'
 * import { PrismaLibSQL } from './custom-libsql-adapter'
 *
 * const config = {
 *   url: process.env.TURSO_DATABASE_URL!,
 *   authToken: process.env.TURSO_AUTH_TOKEN!,
 * }
 * const libsql = createClient(config)
 * const adapter = new PrismaLibSQL(libsql, config)
 *
 * const prisma = new PrismaClient({ adapter })
 * ```
 */

import { createClient, type Client, type Config, type Transaction as LibsqlTransaction } from '@libsql/client'
import {
  Debug,
  DriverAdapterError,
  ColumnTypeEnum,
  type IsolationLevel,
  type SqlQuery,
  type SqlResultSet,
  type SqlDriverAdapter,
  type Transaction as PrismaTransaction,
  type TransactionOptions,
  type ColumnType,
  type ArgType,
} from '@prisma/driver-adapter-utils'
import { Mutex } from 'async-mutex'

// ---------------------------------------------------------------------------
// Debug logger
// ---------------------------------------------------------------------------

const debug = Debug('prisma:driver-adapter:libsql')

// ---------------------------------------------------------------------------
// Column type mapping (SQLite declared types -> Prisma ColumnType)
// ---------------------------------------------------------------------------

function mapDeclType(declType: string): ColumnType | null {
  switch (declType.toUpperCase()) {
    case '':
      return null
    case 'DECIMAL':
      return ColumnTypeEnum.Numeric
    case 'FLOAT':
      return ColumnTypeEnum.Float
    case 'DOUBLE':
    case 'DOUBLE PRECISION':
    case 'NUMERIC':
    case 'REAL':
      return ColumnTypeEnum.Double
    case 'TINYINT':
    case 'SMALLINT':
    case 'MEDIUMINT':
    case 'INT':
    case 'INTEGER':
    case 'SERIAL':
    case 'INT2':
      return ColumnTypeEnum.Int32
    case 'BIGINT':
    case 'UNSIGNED BIG INT':
    case 'INT8':
      return ColumnTypeEnum.Int64
    case 'DATETIME':
    case 'TIMESTAMP':
      return ColumnTypeEnum.DateTime
    case 'TIME':
      return ColumnTypeEnum.Time
    case 'DATE':
      return ColumnTypeEnum.Date
    case 'TEXT':
    case 'CLOB':
    case 'CHARACTER':
    case 'VARCHAR':
    case 'VARYING CHARACTER':
    case 'NCHAR':
    case 'NATIVE CHARACTER':
    case 'NVARCHAR':
      return ColumnTypeEnum.Text
    case 'BLOB':
      return ColumnTypeEnum.Bytes
    case 'BOOLEAN':
      return ColumnTypeEnum.Boolean
    case 'JSONB':
      return ColumnTypeEnum.Json
    default:
      debug('unknown decltype:', declType)
      return null
  }
}

function mapDeclaredColumnTypes(columnTypes: string[]): [ColumnType[], Set<number>] {
  const emptyIndices = new Set<number>()
  const result = columnTypes.map((typeName, index) => {
    const mappedType = mapDeclType(typeName)
    if (mappedType === null) {
      emptyIndices.add(index)
    }
    return mappedType
  }) as ColumnType[]
  return [result, emptyIndices]
}

function getColumnTypes(declaredTypes: string[], rows: unknown[][]): ColumnType[] {
  const [columnTypes, emptyIndices] = mapDeclaredColumnTypes(declaredTypes)
  if (emptyIndices.size === 0) {
    return columnTypes
  }
  for (const columnIndex of emptyIndices) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const candidateValue = rows[rowIndex][columnIndex]
      if (candidateValue !== null) {
        columnTypes[columnIndex] = inferColumnType(candidateValue)
        break
      }
    }
    if (columnTypes[columnIndex] === null) {
      columnTypes[columnIndex] = ColumnTypeEnum.Int32
    }
  }
  return columnTypes
}

function inferColumnType(value: unknown): ColumnType {
  switch (typeof value) {
    case 'string':
      return ColumnTypeEnum.Text
    case 'bigint':
      return ColumnTypeEnum.Int64
    case 'boolean':
      return ColumnTypeEnum.Boolean
    case 'number':
      return ColumnTypeEnum.UnknownNumber
    case 'object':
      if (value instanceof ArrayBuffer) {
        return ColumnTypeEnum.Bytes
      }
      throw new UnexpectedTypeError(value)
    default:
      throw new UnexpectedTypeError(value)
  }
}

class UnexpectedTypeError extends Error {
  name = 'UnexpectedTypeError'
  constructor(value: unknown) {
    const type = typeof value
    const repr = type === 'object' ? JSON.stringify(value) : String(value)
    super(`unexpected value of type ${type}: ${repr}`)
  }
}

// ---------------------------------------------------------------------------
// Row / argument conversion
// ---------------------------------------------------------------------------

function mapRow(row: unknown[], columnTypes: ColumnType[]): unknown[] {
  const result: unknown[] = new Array(row.length)
  for (let i = 0; i < row.length; i++) {
    const value = row[i]
    if (value instanceof ArrayBuffer) {
      result[i] = Array.from(new Uint8Array(value))
      continue
    }
    if (
      typeof value === 'number' &&
      (columnTypes[i] === ColumnTypeEnum.Int32 || columnTypes[i] === ColumnTypeEnum.Int64) &&
      !Number.isInteger(value)
    ) {
      result[i] = Math.trunc(value)
      continue
    }
    if (
      (typeof value === 'number' || typeof value === 'bigint') &&
      columnTypes[i] === ColumnTypeEnum.DateTime
    ) {
      result[i] = new Date(Number(value)).toISOString()
      continue
    }
    if (typeof value === 'bigint') {
      result[i] = value.toString()
      continue
    }
    result[i] = value
  }
  return result
}

interface AdapterOptions {
  timestampFormat?: 'iso8601' | 'unixepoch-ms'
}

function mapArg(arg: unknown, argType: ArgType, options?: AdapterOptions): unknown {
  if (arg === null) {
    return null
  }
  if (typeof arg === 'string' && argType.scalarType === 'bigint') {
    return BigInt(arg)
  }
  if (typeof arg === 'string' && argType.scalarType === 'decimal') {
    return Number.parseFloat(arg)
  }
  if (typeof arg === 'string' && argType.scalarType === 'datetime') {
    arg = new Date(arg)
  }
  if (arg instanceof Date) {
    const format = options?.timestampFormat ?? 'iso8601'
    switch (format) {
      case 'unixepoch-ms':
        return arg.getTime()
      case 'iso8601':
        return arg.toISOString().replace('Z', '+00:00')
      default:
        throw new Error(`Unknown timestamp format: ${format}`)
    }
  }
  if (typeof arg === 'string' && argType.scalarType === 'bytes') {
    return Buffer.from(arg, 'base64')
  }
  if (Array.isArray(arg) && argType.scalarType === 'bytes') {
    return new Uint8Array(arg)
  }
  return arg
}

// ---------------------------------------------------------------------------
// Error conversion
// ---------------------------------------------------------------------------

const SQLITE_BUSY = 5
const PRIMARY_ERROR_CODE_MASK = 255

function isDriverError(error: unknown): error is Error & { rawCode?: number; code?: string } {
  const e = error as Record<string, unknown>
  return (
    typeof e.code === 'string' &&
    typeof e.message === 'string' &&
    (typeof e.rawCode === 'number' || e.rawCode === undefined)
  )
}

function mapDriverError(error: { rawCode?: number; cause?: { rawCode?: number }; message: string }) {
  const rawCode = error.rawCode ?? error.cause?.rawCode ?? 1
  switch (rawCode) {
    case 2067:
    case 1555: {
      const fields = error.message
        .split('constraint failed: ')[1]
        ?.split(', ')
        .map((field: string) => field.split('.').pop())
      return {
        kind: 'UniqueConstraintViolation' as const,
        constraint: fields !== undefined ? { fields } : undefined,
      }
    }
    case 1299: {
      const fields = error.message
        .split('constraint failed: ')[1]
        ?.split(', ')
        .map((field: string) => field.split('.').pop())
      return {
        kind: 'NullConstraintViolation' as const,
        constraint: fields !== undefined ? { fields } : undefined,
      }
    }
    case 787:
    case 1811:
      return {
        kind: 'ForeignKeyConstraintViolation' as const,
        constraint: { foreignKey: {} },
      }
    default:
      if (rawCode && (rawCode & PRIMARY_ERROR_CODE_MASK) === SQLITE_BUSY) {
        return { kind: 'SocketTimeout' as const }
      } else if (error.message.startsWith('no such table')) {
        return {
          kind: 'TableDoesNotExist' as const,
          table: error.message.split(': ')[1],
        }
      } else if (error.message.startsWith('no such column')) {
        return {
          kind: 'ColumnNotFound' as const,
          column: error.message.split(': ')[1],
        }
      } else if (error.message.includes('has no column named ')) {
        return {
          kind: 'ColumnNotFound' as const,
          column: error.message.split('has no column named ')[1],
        }
      }
      return {
        kind: 'sqlite' as const,
        extendedCode: rawCode,
        message: error.message,
      }
  }
}

function convertDriverError(error: unknown) {
  if (isDriverError(error)) {
    return {
      originalCode: error.rawCode?.toString(),
      originalMessage: error.message,
      ...mapDriverError({
        rawCode: error.rawCode,
        cause: undefined,
        message: error.message,
      }),
    }
  }
  throw error
}

// ---------------------------------------------------------------------------
// Queryable base class
// ---------------------------------------------------------------------------

class LibSqlQueryable {
  readonly provider = 'sqlite' as const
  readonly adapterName = '@prisma/adapter-libsql'
  protected mutex = new Mutex()

  constructor(
    protected client: Client | LibsqlTransaction,
    protected adapterOptions?: AdapterOptions,
  ) {}

  async queryRaw(query: SqlQuery): Promise<SqlResultSet> {
    const tag = '[js::query_raw]'
    debug(`${tag} %O`, query)
    const result = await this.performIO(query)
    const rows = result.rows as unknown as unknown[][]
    const columnTypes = getColumnTypes(result.columnTypes, rows)
    return {
      columnNames: result.columns,
      columnTypes,
      rows: rows.map((row) => mapRow(row, columnTypes)),
    }
  }

  async executeRaw(query: SqlQuery): Promise<number> {
    const tag = '[js::execute_raw]'
    debug(`${tag} %O`, query)
    return (await this.performIO(query)).rowsAffected ?? 0
  }

  async performIO(query: SqlQuery) {
    const release = await this.mutex.acquire()
    try {
      const result = await this.client.execute({
        sql: query.sql,
        args: query.args.map((arg, i) => mapArg(arg, query.argTypes[i], this.adapterOptions)) as any,
      })
      return result
    } catch (e) {
      this.onError(e)
    } finally {
      release()
    }
  }

  onError(error: unknown): never {
    debug('Error in performIO: %O', error)
    throw new DriverAdapterError(convertDriverError(error) as any)
  }
}

// ---------------------------------------------------------------------------
// Transaction
// ---------------------------------------------------------------------------

class LibSqlTransaction extends LibSqlQueryable {
  readonly options: TransactionOptions = {
    usePhantomQuery: true,
  }

  private unlockParent: () => void

  constructor(
    txClient: LibsqlTransaction,
    adapterOptions: AdapterOptions | undefined,
    unlockParent: () => void,
  ) {
    super(txClient, adapterOptions)
    this.unlockParent = unlockParent
  }

  async commit(): Promise<void> {
    debug('[js::commit]')
    try {
      await (this.client as LibsqlTransaction).commit()
    } finally {
      this.unlockParent()
    }
  }

  async rollback(): Promise<void> {
    debug('[js::rollback]')
    try {
      await (this.client as LibsqlTransaction).rollback()
    } catch (error) {
      debug('error in rollback:', error)
    } finally {
      this.unlockParent()
    }
  }
}

// ---------------------------------------------------------------------------
// Driver Adapter
// ---------------------------------------------------------------------------

class PrismaLibSQLAdapter extends LibSqlQueryable {
  async executeScript(script: string): Promise<void> {
    const release = await this.mutex.acquire()
    try {
      await this.client.executeMultiple(script)
    } catch (e) {
      this.onError(e)
    } finally {
      release()
    }
  }

  async startTransaction(isolationLevel?: IsolationLevel): Promise<PrismaTransaction> {
    if (isolationLevel && isolationLevel !== 'SERIALIZABLE') {
      throw new DriverAdapterError({
        kind: 'InvalidIsolationLevel',
        level: isolationLevel,
      } as any)
    }

    const tag = '[js::startTransaction]'
    debug('%s', tag)

    const release = await this.mutex.acquire()
    try {
      const tx = await (this.client as Client).transaction('deferred')
      return new LibSqlTransaction(tx, this.adapterOptions, release) as any
    } catch (e) {
      release()
      this.onError(e)
    }
  }

  dispose(): Promise<void> {
    ;(this.client as Client).close()
    return Promise.resolve()
  }
}

// ---------------------------------------------------------------------------
// Factory (exported as PrismaLibSQL)
// ---------------------------------------------------------------------------

/**
 * Options for the custom libsql adapter.
 */
export interface PrismaLibSQLOptions {
  timestampFormat?: 'iso8601' | 'unixepoch-ms'
}

/**
 * Custom Prisma driver adapter for libsql.
 *
 * Accepts a pre-created libsql Client (from the top-level `@libsql/client`)
 * and its original config. When Prisma calls `createClient()` internally
 * (e.g., for shadow DB connections), the config is merged so that
 * `undefined` values from Prisma don't overwrite the original settings.
 *
 * This fixes the Vercel deployment bug where the official adapter's bundled
 * nested `@libsql/client` cannot resolve environment variables.
 */
export class PrismaLibSQL {
  readonly adapterName = '@prisma/adapter-libsql'
  readonly provider = 'sqlite' as const

  private client: Client
  private config: Config
  private options?: PrismaLibSQLOptions

  /**
   * @param libsqlClient - A pre-created libsql Client from the top-level `@libsql/client` package
   * @param config - The original Config used to create the client (needed for merging on re-creation)
   * @param options - Optional adapter settings (e.g., timestampFormat)
   */
  constructor(libsqlClient: Client, config: Config, options?: PrismaLibSQLOptions) {
    this.client = libsqlClient
    this.config = config
    this.options = options
  }

  /**
   * Create a new libsql Client, merging the provided config with the
   * original config stored at construction time.
   *
   * This is the key fix: when Prisma calls `createClient({ url: undefined })`,
   * the `undefined` url is ignored and the original client's URL is used instead.
   */
  createClient(config: Partial<Config>): Client {
    // Build merged config: start with original, overlay non-undefined overrides
    const merged: Record<string, unknown> = { ...this.config }

    // Only copy over keys that are explicitly defined (not undefined)
    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined) {
        merged[key] = value
      }
    }

    return createClient(merged as unknown as Config)
  }

  /**
   * Connect to the database. Returns a driver adapter wrapping the
   * pre-created libsql Client.
   */
  async connect(): Promise<SqlDriverAdapter> {
    return new PrismaLibSQLAdapter(this.client, this.options) as any
  }

  /**
   * Connect to an in-memory shadow database for Prisma migrations.
   */
  async connectToShadowDb(): Promise<SqlDriverAdapter> {
    const shadowClient = this.createClient({ url: ':memory:' })
    return new PrismaLibSQLAdapter(shadowClient, this.options) as any
  }
}
