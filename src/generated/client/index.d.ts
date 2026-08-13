
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CargoItem
 * 
 */
export type CargoItem = $Result.DefaultSelection<Prisma.$CargoItemPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Equipment
 * 
 */
export type Equipment = $Result.DefaultSelection<Prisma.$EquipmentPayload>
/**
 * Model Movement
 * 
 */
export type Movement = $Result.DefaultSelection<Prisma.$MovementPayload>
/**
 * Model SAPIntegration
 * 
 */
export type SAPIntegration = $Result.DefaultSelection<Prisma.$SAPIntegrationPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CargoItems
 * const cargoItems = await prisma.cargoItem.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CargoItems
   * const cargoItems = await prisma.cargoItem.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cargoItem`: Exposes CRUD operations for the **CargoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CargoItems
    * const cargoItems = await prisma.cargoItem.findMany()
    * ```
    */
  get cargoItem(): Prisma.CargoItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.equipment`: Exposes CRUD operations for the **Equipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Equipment
    * const equipment = await prisma.equipment.findMany()
    * ```
    */
  get equipment(): Prisma.EquipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movement`: Exposes CRUD operations for the **Movement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movements
    * const movements = await prisma.movement.findMany()
    * ```
    */
  get movement(): Prisma.MovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sAPIntegration`: Exposes CRUD operations for the **SAPIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SAPIntegrations
    * const sAPIntegrations = await prisma.sAPIntegration.findMany()
    * ```
    */
  get sAPIntegration(): Prisma.SAPIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CargoItem: 'CargoItem',
    Location: 'Location',
    Project: 'Project',
    Equipment: 'Equipment',
    Movement: 'Movement',
    SAPIntegration: 'SAPIntegration',
    SyncLog: 'SyncLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cargoItem" | "location" | "project" | "equipment" | "movement" | "sAPIntegration" | "syncLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CargoItem: {
        payload: Prisma.$CargoItemPayload<ExtArgs>
        fields: Prisma.CargoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CargoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CargoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          findFirst: {
            args: Prisma.CargoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CargoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          findMany: {
            args: Prisma.CargoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>[]
          }
          create: {
            args: Prisma.CargoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          createMany: {
            args: Prisma.CargoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CargoItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>[]
          }
          delete: {
            args: Prisma.CargoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          update: {
            args: Prisma.CargoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          deleteMany: {
            args: Prisma.CargoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CargoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CargoItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>[]
          }
          upsert: {
            args: Prisma.CargoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CargoItemPayload>
          }
          aggregate: {
            args: Prisma.CargoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCargoItem>
          }
          groupBy: {
            args: Prisma.CargoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CargoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CargoItemCountArgs<ExtArgs>
            result: $Utils.Optional<CargoItemCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Equipment: {
        payload: Prisma.$EquipmentPayload<ExtArgs>
        fields: Prisma.EquipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EquipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EquipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          findFirst: {
            args: Prisma.EquipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EquipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          findMany: {
            args: Prisma.EquipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>[]
          }
          create: {
            args: Prisma.EquipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          createMany: {
            args: Prisma.EquipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EquipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>[]
          }
          delete: {
            args: Prisma.EquipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          update: {
            args: Prisma.EquipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          deleteMany: {
            args: Prisma.EquipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EquipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EquipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>[]
          }
          upsert: {
            args: Prisma.EquipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipmentPayload>
          }
          aggregate: {
            args: Prisma.EquipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipment>
          }
          groupBy: {
            args: Prisma.EquipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EquipmentCountArgs<ExtArgs>
            result: $Utils.Optional<EquipmentCountAggregateOutputType> | number
          }
        }
      }
      Movement: {
        payload: Prisma.$MovementPayload<ExtArgs>
        fields: Prisma.MovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          findFirst: {
            args: Prisma.MovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          findMany: {
            args: Prisma.MovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          create: {
            args: Prisma.MovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          createMany: {
            args: Prisma.MovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          delete: {
            args: Prisma.MovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          update: {
            args: Prisma.MovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          deleteMany: {
            args: Prisma.MovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          upsert: {
            args: Prisma.MovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          aggregate: {
            args: Prisma.MovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovement>
          }
          groupBy: {
            args: Prisma.MovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovementCountArgs<ExtArgs>
            result: $Utils.Optional<MovementCountAggregateOutputType> | number
          }
        }
      }
      SAPIntegration: {
        payload: Prisma.$SAPIntegrationPayload<ExtArgs>
        fields: Prisma.SAPIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SAPIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SAPIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          findFirst: {
            args: Prisma.SAPIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SAPIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          findMany: {
            args: Prisma.SAPIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>[]
          }
          create: {
            args: Prisma.SAPIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          createMany: {
            args: Prisma.SAPIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SAPIntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>[]
          }
          delete: {
            args: Prisma.SAPIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          update: {
            args: Prisma.SAPIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.SAPIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SAPIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SAPIntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>[]
          }
          upsert: {
            args: Prisma.SAPIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SAPIntegrationPayload>
          }
          aggregate: {
            args: Prisma.SAPIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSAPIntegration>
          }
          groupBy: {
            args: Prisma.SAPIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SAPIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SAPIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<SAPIntegrationCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cargoItem?: CargoItemOmit
    location?: LocationOmit
    project?: ProjectOmit
    equipment?: EquipmentOmit
    movement?: MovementOmit
    sAPIntegration?: SAPIntegrationOmit
    syncLog?: SyncLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CargoItemCountOutputType
   */

  export type CargoItemCountOutputType = {
    movements: number
  }

  export type CargoItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | CargoItemCountOutputTypeCountMovementsArgs
  }

  // Custom InputTypes
  /**
   * CargoItemCountOutputType without action
   */
  export type CargoItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItemCountOutputType
     */
    select?: CargoItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CargoItemCountOutputType without action
   */
  export type CargoItemCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    cargoItems: number
    movementsFrom: number
    movementsTo: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItems?: boolean | LocationCountOutputTypeCountCargoItemsArgs
    movementsFrom?: boolean | LocationCountOutputTypeCountMovementsFromArgs
    movementsTo?: boolean | LocationCountOutputTypeCountMovementsToArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountCargoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoItemWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountMovementsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountMovementsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    cargoItems: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItems?: boolean | ProjectCountOutputTypeCountCargoItemsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountCargoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CargoItem
   */

  export type AggregateCargoItem = {
    _count: CargoItemCountAggregateOutputType | null
    _avg: CargoItemAvgAggregateOutputType | null
    _sum: CargoItemSumAggregateOutputType | null
    _min: CargoItemMinAggregateOutputType | null
    _max: CargoItemMaxAggregateOutputType | null
  }

  export type CargoItemAvgAggregateOutputType = {
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    volume: number | null
    liftingPoints: number | null
    transportWeight: number | null
    transportLength: number | null
    transportWidth: number | null
    transportHeight: number | null
  }

  export type CargoItemSumAggregateOutputType = {
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    volume: number | null
    liftingPoints: number | null
    transportWeight: number | null
    transportLength: number | null
    transportWidth: number | null
    transportHeight: number | null
  }

  export type CargoItemMinAggregateOutputType = {
    id: string | null
    cargoCode: string | null
    description: string | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    volume: number | null
    liftCategory: string | null
    centerOfGravity: string | null
    liftingPoints: number | null
    specialHandling: string | null
    hazardClass: string | null
    commodityType: string | null
    status: string | null
    locationId: string | null
    projectId: string | null
    clientName: string | null
    poReference: string | null
    blReference: string | null
    transportWeight: number | null
    transportLength: number | null
    transportWidth: number | null
    transportHeight: number | null
    receivedAt: Date | null
    dispatchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CargoItemMaxAggregateOutputType = {
    id: string | null
    cargoCode: string | null
    description: string | null
    weight: number | null
    length: number | null
    width: number | null
    height: number | null
    volume: number | null
    liftCategory: string | null
    centerOfGravity: string | null
    liftingPoints: number | null
    specialHandling: string | null
    hazardClass: string | null
    commodityType: string | null
    status: string | null
    locationId: string | null
    projectId: string | null
    clientName: string | null
    poReference: string | null
    blReference: string | null
    transportWeight: number | null
    transportLength: number | null
    transportWidth: number | null
    transportHeight: number | null
    receivedAt: Date | null
    dispatchedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CargoItemCountAggregateOutputType = {
    id: number
    cargoCode: number
    description: number
    weight: number
    length: number
    width: number
    height: number
    volume: number
    liftCategory: number
    centerOfGravity: number
    liftingPoints: number
    specialHandling: number
    hazardClass: number
    commodityType: number
    status: number
    locationId: number
    projectId: number
    clientName: number
    poReference: number
    blReference: number
    transportWeight: number
    transportLength: number
    transportWidth: number
    transportHeight: number
    receivedAt: number
    dispatchedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CargoItemAvgAggregateInputType = {
    weight?: true
    length?: true
    width?: true
    height?: true
    volume?: true
    liftingPoints?: true
    transportWeight?: true
    transportLength?: true
    transportWidth?: true
    transportHeight?: true
  }

  export type CargoItemSumAggregateInputType = {
    weight?: true
    length?: true
    width?: true
    height?: true
    volume?: true
    liftingPoints?: true
    transportWeight?: true
    transportLength?: true
    transportWidth?: true
    transportHeight?: true
  }

  export type CargoItemMinAggregateInputType = {
    id?: true
    cargoCode?: true
    description?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    volume?: true
    liftCategory?: true
    centerOfGravity?: true
    liftingPoints?: true
    specialHandling?: true
    hazardClass?: true
    commodityType?: true
    status?: true
    locationId?: true
    projectId?: true
    clientName?: true
    poReference?: true
    blReference?: true
    transportWeight?: true
    transportLength?: true
    transportWidth?: true
    transportHeight?: true
    receivedAt?: true
    dispatchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CargoItemMaxAggregateInputType = {
    id?: true
    cargoCode?: true
    description?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    volume?: true
    liftCategory?: true
    centerOfGravity?: true
    liftingPoints?: true
    specialHandling?: true
    hazardClass?: true
    commodityType?: true
    status?: true
    locationId?: true
    projectId?: true
    clientName?: true
    poReference?: true
    blReference?: true
    transportWeight?: true
    transportLength?: true
    transportWidth?: true
    transportHeight?: true
    receivedAt?: true
    dispatchedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CargoItemCountAggregateInputType = {
    id?: true
    cargoCode?: true
    description?: true
    weight?: true
    length?: true
    width?: true
    height?: true
    volume?: true
    liftCategory?: true
    centerOfGravity?: true
    liftingPoints?: true
    specialHandling?: true
    hazardClass?: true
    commodityType?: true
    status?: true
    locationId?: true
    projectId?: true
    clientName?: true
    poReference?: true
    blReference?: true
    transportWeight?: true
    transportLength?: true
    transportWidth?: true
    transportHeight?: true
    receivedAt?: true
    dispatchedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CargoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoItem to aggregate.
     */
    where?: CargoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoItems to fetch.
     */
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CargoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CargoItems
    **/
    _count?: true | CargoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CargoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CargoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CargoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CargoItemMaxAggregateInputType
  }

  export type GetCargoItemAggregateType<T extends CargoItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCargoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCargoItem[P]>
      : GetScalarType<T[P], AggregateCargoItem[P]>
  }




  export type CargoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CargoItemWhereInput
    orderBy?: CargoItemOrderByWithAggregationInput | CargoItemOrderByWithAggregationInput[]
    by: CargoItemScalarFieldEnum[] | CargoItemScalarFieldEnum
    having?: CargoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CargoItemCountAggregateInputType | true
    _avg?: CargoItemAvgAggregateInputType
    _sum?: CargoItemSumAggregateInputType
    _min?: CargoItemMinAggregateInputType
    _max?: CargoItemMaxAggregateInputType
  }

  export type CargoItemGroupByOutputType = {
    id: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume: number | null
    liftCategory: string
    centerOfGravity: string | null
    liftingPoints: number | null
    specialHandling: string | null
    hazardClass: string | null
    commodityType: string
    status: string
    locationId: string | null
    projectId: string | null
    clientName: string | null
    poReference: string | null
    blReference: string | null
    transportWeight: number | null
    transportLength: number | null
    transportWidth: number | null
    transportHeight: number | null
    receivedAt: Date | null
    dispatchedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CargoItemCountAggregateOutputType | null
    _avg: CargoItemAvgAggregateOutputType | null
    _sum: CargoItemSumAggregateOutputType | null
    _min: CargoItemMinAggregateOutputType | null
    _max: CargoItemMaxAggregateOutputType | null
  }

  type GetCargoItemGroupByPayload<T extends CargoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CargoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CargoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CargoItemGroupByOutputType[P]>
            : GetScalarType<T[P], CargoItemGroupByOutputType[P]>
        }
      >
    >


  export type CargoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cargoCode?: boolean
    description?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    volume?: boolean
    liftCategory?: boolean
    centerOfGravity?: boolean
    liftingPoints?: boolean
    specialHandling?: boolean
    hazardClass?: boolean
    commodityType?: boolean
    status?: boolean
    locationId?: boolean
    projectId?: boolean
    clientName?: boolean
    poReference?: boolean
    blReference?: boolean
    transportWeight?: boolean
    transportLength?: boolean
    transportWidth?: boolean
    transportHeight?: boolean
    receivedAt?: boolean
    dispatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
    movements?: boolean | CargoItem$movementsArgs<ExtArgs>
    _count?: boolean | CargoItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cargoItem"]>

  export type CargoItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cargoCode?: boolean
    description?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    volume?: boolean
    liftCategory?: boolean
    centerOfGravity?: boolean
    liftingPoints?: boolean
    specialHandling?: boolean
    hazardClass?: boolean
    commodityType?: boolean
    status?: boolean
    locationId?: boolean
    projectId?: boolean
    clientName?: boolean
    poReference?: boolean
    blReference?: boolean
    transportWeight?: boolean
    transportLength?: boolean
    transportWidth?: boolean
    transportHeight?: boolean
    receivedAt?: boolean
    dispatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
  }, ExtArgs["result"]["cargoItem"]>

  export type CargoItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cargoCode?: boolean
    description?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    volume?: boolean
    liftCategory?: boolean
    centerOfGravity?: boolean
    liftingPoints?: boolean
    specialHandling?: boolean
    hazardClass?: boolean
    commodityType?: boolean
    status?: boolean
    locationId?: boolean
    projectId?: boolean
    clientName?: boolean
    poReference?: boolean
    blReference?: boolean
    transportWeight?: boolean
    transportLength?: boolean
    transportWidth?: boolean
    transportHeight?: boolean
    receivedAt?: boolean
    dispatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
  }, ExtArgs["result"]["cargoItem"]>

  export type CargoItemSelectScalar = {
    id?: boolean
    cargoCode?: boolean
    description?: boolean
    weight?: boolean
    length?: boolean
    width?: boolean
    height?: boolean
    volume?: boolean
    liftCategory?: boolean
    centerOfGravity?: boolean
    liftingPoints?: boolean
    specialHandling?: boolean
    hazardClass?: boolean
    commodityType?: boolean
    status?: boolean
    locationId?: boolean
    projectId?: boolean
    clientName?: boolean
    poReference?: boolean
    blReference?: boolean
    transportWeight?: boolean
    transportLength?: boolean
    transportWidth?: boolean
    transportHeight?: boolean
    receivedAt?: boolean
    dispatchedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CargoItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cargoCode" | "description" | "weight" | "length" | "width" | "height" | "volume" | "liftCategory" | "centerOfGravity" | "liftingPoints" | "specialHandling" | "hazardClass" | "commodityType" | "status" | "locationId" | "projectId" | "clientName" | "poReference" | "blReference" | "transportWeight" | "transportLength" | "transportWidth" | "transportHeight" | "receivedAt" | "dispatchedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["cargoItem"]>
  export type CargoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
    movements?: boolean | CargoItem$movementsArgs<ExtArgs>
    _count?: boolean | CargoItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CargoItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
  }
  export type CargoItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | CargoItem$locationArgs<ExtArgs>
    project?: boolean | CargoItem$projectArgs<ExtArgs>
  }

  export type $CargoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CargoItem"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs> | null
      project: Prisma.$ProjectPayload<ExtArgs> | null
      movements: Prisma.$MovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cargoCode: string
      description: string
      weight: number
      length: number
      width: number
      height: number
      volume: number | null
      liftCategory: string
      centerOfGravity: string | null
      liftingPoints: number | null
      specialHandling: string | null
      hazardClass: string | null
      commodityType: string
      status: string
      locationId: string | null
      projectId: string | null
      clientName: string | null
      poReference: string | null
      blReference: string | null
      transportWeight: number | null
      transportLength: number | null
      transportWidth: number | null
      transportHeight: number | null
      receivedAt: Date | null
      dispatchedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cargoItem"]>
    composites: {}
  }

  type CargoItemGetPayload<S extends boolean | null | undefined | CargoItemDefaultArgs> = $Result.GetResult<Prisma.$CargoItemPayload, S>

  type CargoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CargoItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CargoItemCountAggregateInputType | true
    }

  export interface CargoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CargoItem'], meta: { name: 'CargoItem' } }
    /**
     * Find zero or one CargoItem that matches the filter.
     * @param {CargoItemFindUniqueArgs} args - Arguments to find a CargoItem
     * @example
     * // Get one CargoItem
     * const cargoItem = await prisma.cargoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CargoItemFindUniqueArgs>(args: SelectSubset<T, CargoItemFindUniqueArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CargoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CargoItemFindUniqueOrThrowArgs} args - Arguments to find a CargoItem
     * @example
     * // Get one CargoItem
     * const cargoItem = await prisma.cargoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CargoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CargoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CargoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemFindFirstArgs} args - Arguments to find a CargoItem
     * @example
     * // Get one CargoItem
     * const cargoItem = await prisma.cargoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CargoItemFindFirstArgs>(args?: SelectSubset<T, CargoItemFindFirstArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CargoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemFindFirstOrThrowArgs} args - Arguments to find a CargoItem
     * @example
     * // Get one CargoItem
     * const cargoItem = await prisma.cargoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CargoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CargoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CargoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CargoItems
     * const cargoItems = await prisma.cargoItem.findMany()
     * 
     * // Get first 10 CargoItems
     * const cargoItems = await prisma.cargoItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cargoItemWithIdOnly = await prisma.cargoItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CargoItemFindManyArgs>(args?: SelectSubset<T, CargoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CargoItem.
     * @param {CargoItemCreateArgs} args - Arguments to create a CargoItem.
     * @example
     * // Create one CargoItem
     * const CargoItem = await prisma.cargoItem.create({
     *   data: {
     *     // ... data to create a CargoItem
     *   }
     * })
     * 
     */
    create<T extends CargoItemCreateArgs>(args: SelectSubset<T, CargoItemCreateArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CargoItems.
     * @param {CargoItemCreateManyArgs} args - Arguments to create many CargoItems.
     * @example
     * // Create many CargoItems
     * const cargoItem = await prisma.cargoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CargoItemCreateManyArgs>(args?: SelectSubset<T, CargoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CargoItems and returns the data saved in the database.
     * @param {CargoItemCreateManyAndReturnArgs} args - Arguments to create many CargoItems.
     * @example
     * // Create many CargoItems
     * const cargoItem = await prisma.cargoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CargoItems and only return the `id`
     * const cargoItemWithIdOnly = await prisma.cargoItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CargoItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CargoItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CargoItem.
     * @param {CargoItemDeleteArgs} args - Arguments to delete one CargoItem.
     * @example
     * // Delete one CargoItem
     * const CargoItem = await prisma.cargoItem.delete({
     *   where: {
     *     // ... filter to delete one CargoItem
     *   }
     * })
     * 
     */
    delete<T extends CargoItemDeleteArgs>(args: SelectSubset<T, CargoItemDeleteArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CargoItem.
     * @param {CargoItemUpdateArgs} args - Arguments to update one CargoItem.
     * @example
     * // Update one CargoItem
     * const cargoItem = await prisma.cargoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CargoItemUpdateArgs>(args: SelectSubset<T, CargoItemUpdateArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CargoItems.
     * @param {CargoItemDeleteManyArgs} args - Arguments to filter CargoItems to delete.
     * @example
     * // Delete a few CargoItems
     * const { count } = await prisma.cargoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CargoItemDeleteManyArgs>(args?: SelectSubset<T, CargoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CargoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CargoItems
     * const cargoItem = await prisma.cargoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CargoItemUpdateManyArgs>(args: SelectSubset<T, CargoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CargoItems and returns the data updated in the database.
     * @param {CargoItemUpdateManyAndReturnArgs} args - Arguments to update many CargoItems.
     * @example
     * // Update many CargoItems
     * const cargoItem = await prisma.cargoItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CargoItems and only return the `id`
     * const cargoItemWithIdOnly = await prisma.cargoItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CargoItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CargoItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CargoItem.
     * @param {CargoItemUpsertArgs} args - Arguments to update or create a CargoItem.
     * @example
     * // Update or create a CargoItem
     * const cargoItem = await prisma.cargoItem.upsert({
     *   create: {
     *     // ... data to create a CargoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CargoItem we want to update
     *   }
     * })
     */
    upsert<T extends CargoItemUpsertArgs>(args: SelectSubset<T, CargoItemUpsertArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CargoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemCountArgs} args - Arguments to filter CargoItems to count.
     * @example
     * // Count the number of CargoItems
     * const count = await prisma.cargoItem.count({
     *   where: {
     *     // ... the filter for the CargoItems we want to count
     *   }
     * })
    **/
    count<T extends CargoItemCountArgs>(
      args?: Subset<T, CargoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CargoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CargoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CargoItemAggregateArgs>(args: Subset<T, CargoItemAggregateArgs>): Prisma.PrismaPromise<GetCargoItemAggregateType<T>>

    /**
     * Group by CargoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CargoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CargoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CargoItemGroupByArgs['orderBy'] }
        : { orderBy?: CargoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CargoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCargoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CargoItem model
   */
  readonly fields: CargoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CargoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CargoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends CargoItem$locationArgs<ExtArgs> = {}>(args?: Subset<T, CargoItem$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    project<T extends CargoItem$projectArgs<ExtArgs> = {}>(args?: Subset<T, CargoItem$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movements<T extends CargoItem$movementsArgs<ExtArgs> = {}>(args?: Subset<T, CargoItem$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CargoItem model
   */
  interface CargoItemFieldRefs {
    readonly id: FieldRef<"CargoItem", 'String'>
    readonly cargoCode: FieldRef<"CargoItem", 'String'>
    readonly description: FieldRef<"CargoItem", 'String'>
    readonly weight: FieldRef<"CargoItem", 'Float'>
    readonly length: FieldRef<"CargoItem", 'Float'>
    readonly width: FieldRef<"CargoItem", 'Float'>
    readonly height: FieldRef<"CargoItem", 'Float'>
    readonly volume: FieldRef<"CargoItem", 'Float'>
    readonly liftCategory: FieldRef<"CargoItem", 'String'>
    readonly centerOfGravity: FieldRef<"CargoItem", 'String'>
    readonly liftingPoints: FieldRef<"CargoItem", 'Int'>
    readonly specialHandling: FieldRef<"CargoItem", 'String'>
    readonly hazardClass: FieldRef<"CargoItem", 'String'>
    readonly commodityType: FieldRef<"CargoItem", 'String'>
    readonly status: FieldRef<"CargoItem", 'String'>
    readonly locationId: FieldRef<"CargoItem", 'String'>
    readonly projectId: FieldRef<"CargoItem", 'String'>
    readonly clientName: FieldRef<"CargoItem", 'String'>
    readonly poReference: FieldRef<"CargoItem", 'String'>
    readonly blReference: FieldRef<"CargoItem", 'String'>
    readonly transportWeight: FieldRef<"CargoItem", 'Float'>
    readonly transportLength: FieldRef<"CargoItem", 'Float'>
    readonly transportWidth: FieldRef<"CargoItem", 'Float'>
    readonly transportHeight: FieldRef<"CargoItem", 'Float'>
    readonly receivedAt: FieldRef<"CargoItem", 'DateTime'>
    readonly dispatchedAt: FieldRef<"CargoItem", 'DateTime'>
    readonly createdAt: FieldRef<"CargoItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CargoItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CargoItem findUnique
   */
  export type CargoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter, which CargoItem to fetch.
     */
    where: CargoItemWhereUniqueInput
  }

  /**
   * CargoItem findUniqueOrThrow
   */
  export type CargoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter, which CargoItem to fetch.
     */
    where: CargoItemWhereUniqueInput
  }

  /**
   * CargoItem findFirst
   */
  export type CargoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter, which CargoItem to fetch.
     */
    where?: CargoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoItems to fetch.
     */
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoItems.
     */
    cursor?: CargoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoItems.
     */
    distinct?: CargoItemScalarFieldEnum | CargoItemScalarFieldEnum[]
  }

  /**
   * CargoItem findFirstOrThrow
   */
  export type CargoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter, which CargoItem to fetch.
     */
    where?: CargoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoItems to fetch.
     */
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CargoItems.
     */
    cursor?: CargoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CargoItems.
     */
    distinct?: CargoItemScalarFieldEnum | CargoItemScalarFieldEnum[]
  }

  /**
   * CargoItem findMany
   */
  export type CargoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter, which CargoItems to fetch.
     */
    where?: CargoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CargoItems to fetch.
     */
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CargoItems.
     */
    cursor?: CargoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CargoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CargoItems.
     */
    skip?: number
    distinct?: CargoItemScalarFieldEnum | CargoItemScalarFieldEnum[]
  }

  /**
   * CargoItem create
   */
  export type CargoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CargoItem.
     */
    data: XOR<CargoItemCreateInput, CargoItemUncheckedCreateInput>
  }

  /**
   * CargoItem createMany
   */
  export type CargoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CargoItems.
     */
    data: CargoItemCreateManyInput | CargoItemCreateManyInput[]
  }

  /**
   * CargoItem createManyAndReturn
   */
  export type CargoItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * The data used to create many CargoItems.
     */
    data: CargoItemCreateManyInput | CargoItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CargoItem update
   */
  export type CargoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CargoItem.
     */
    data: XOR<CargoItemUpdateInput, CargoItemUncheckedUpdateInput>
    /**
     * Choose, which CargoItem to update.
     */
    where: CargoItemWhereUniqueInput
  }

  /**
   * CargoItem updateMany
   */
  export type CargoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CargoItems.
     */
    data: XOR<CargoItemUpdateManyMutationInput, CargoItemUncheckedUpdateManyInput>
    /**
     * Filter which CargoItems to update
     */
    where?: CargoItemWhereInput
    /**
     * Limit how many CargoItems to update.
     */
    limit?: number
  }

  /**
   * CargoItem updateManyAndReturn
   */
  export type CargoItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * The data used to update CargoItems.
     */
    data: XOR<CargoItemUpdateManyMutationInput, CargoItemUncheckedUpdateManyInput>
    /**
     * Filter which CargoItems to update
     */
    where?: CargoItemWhereInput
    /**
     * Limit how many CargoItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CargoItem upsert
   */
  export type CargoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CargoItem to update in case it exists.
     */
    where: CargoItemWhereUniqueInput
    /**
     * In case the CargoItem found by the `where` argument doesn't exist, create a new CargoItem with this data.
     */
    create: XOR<CargoItemCreateInput, CargoItemUncheckedCreateInput>
    /**
     * In case the CargoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CargoItemUpdateInput, CargoItemUncheckedUpdateInput>
  }

  /**
   * CargoItem delete
   */
  export type CargoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    /**
     * Filter which CargoItem to delete.
     */
    where: CargoItemWhereUniqueInput
  }

  /**
   * CargoItem deleteMany
   */
  export type CargoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CargoItems to delete
     */
    where?: CargoItemWhereInput
    /**
     * Limit how many CargoItems to delete.
     */
    limit?: number
  }

  /**
   * CargoItem.location
   */
  export type CargoItem$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * CargoItem.project
   */
  export type CargoItem$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * CargoItem.movements
   */
  export type CargoItem$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * CargoItem without action
   */
  export type CargoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    maxWeight: number | null
    area: number | null
    currentLoad: number | null
  }

  export type LocationSumAggregateOutputType = {
    maxWeight: number | null
    area: number | null
    currentLoad: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    type: string | null
    zone: string | null
    maxWeight: number | null
    maxDimension: string | null
    area: number | null
    isActive: boolean | null
    currentLoad: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    type: string | null
    zone: string | null
    maxWeight: number | null
    maxDimension: string | null
    area: number | null
    isActive: boolean | null
    currentLoad: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    code: number
    name: number
    type: number
    zone: number
    maxWeight: number
    maxDimension: number
    area: number
    isActive: number
    currentLoad: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    maxWeight?: true
    area?: true
    currentLoad?: true
  }

  export type LocationSumAggregateInputType = {
    maxWeight?: true
    area?: true
    currentLoad?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    zone?: true
    maxWeight?: true
    maxDimension?: true
    area?: true
    isActive?: true
    currentLoad?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    zone?: true
    maxWeight?: true
    maxDimension?: true
    area?: true
    isActive?: true
    currentLoad?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    type?: true
    zone?: true
    maxWeight?: true
    maxDimension?: true
    area?: true
    isActive?: true
    currentLoad?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    code: string
    name: string
    type: string
    zone: string | null
    maxWeight: number | null
    maxDimension: string | null
    area: number | null
    isActive: boolean
    currentLoad: number
    createdAt: Date
    updatedAt: Date
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    zone?: boolean
    maxWeight?: boolean
    maxDimension?: boolean
    area?: boolean
    isActive?: boolean
    currentLoad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cargoItems?: boolean | Location$cargoItemsArgs<ExtArgs>
    movementsFrom?: boolean | Location$movementsFromArgs<ExtArgs>
    movementsTo?: boolean | Location$movementsToArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    zone?: boolean
    maxWeight?: boolean
    maxDimension?: boolean
    area?: boolean
    isActive?: boolean
    currentLoad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    zone?: boolean
    maxWeight?: boolean
    maxDimension?: boolean
    area?: boolean
    isActive?: boolean
    currentLoad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    type?: boolean
    zone?: boolean
    maxWeight?: boolean
    maxDimension?: boolean
    area?: boolean
    isActive?: boolean
    currentLoad?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "type" | "zone" | "maxWeight" | "maxDimension" | "area" | "isActive" | "currentLoad" | "createdAt" | "updatedAt", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItems?: boolean | Location$cargoItemsArgs<ExtArgs>
    movementsFrom?: boolean | Location$movementsFromArgs<ExtArgs>
    movementsTo?: boolean | Location$movementsToArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      cargoItems: Prisma.$CargoItemPayload<ExtArgs>[]
      movementsFrom: Prisma.$MovementPayload<ExtArgs>[]
      movementsTo: Prisma.$MovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      type: string
      zone: string | null
      maxWeight: number | null
      maxDimension: string | null
      area: number | null
      isActive: boolean
      currentLoad: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cargoItems<T extends Location$cargoItemsArgs<ExtArgs> = {}>(args?: Subset<T, Location$cargoItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    movementsFrom<T extends Location$movementsFromArgs<ExtArgs> = {}>(args?: Subset<T, Location$movementsFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    movementsTo<T extends Location$movementsToArgs<ExtArgs> = {}>(args?: Subset<T, Location$movementsToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly code: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly type: FieldRef<"Location", 'String'>
    readonly zone: FieldRef<"Location", 'String'>
    readonly maxWeight: FieldRef<"Location", 'Float'>
    readonly maxDimension: FieldRef<"Location", 'String'>
    readonly area: FieldRef<"Location", 'Float'>
    readonly isActive: FieldRef<"Location", 'Boolean'>
    readonly currentLoad: FieldRef<"Location", 'Int'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.cargoItems
   */
  export type Location$cargoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    where?: CargoItemWhereInput
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    cursor?: CargoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CargoItemScalarFieldEnum | CargoItemScalarFieldEnum[]
  }

  /**
   * Location.movementsFrom
   */
  export type Location$movementsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Location.movementsTo
   */
  export type Location$movementsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    totalItems: number | null
    totalWeight: number | null
    totalVolume: number | null
  }

  export type ProjectSumAggregateOutputType = {
    totalItems: number | null
    totalWeight: number | null
    totalVolume: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    projectCode: string | null
    name: string | null
    description: string | null
    clientName: string | null
    clientContact: string | null
    destination: string | null
    shippingLine: string | null
    vesselName: string | null
    etd: Date | null
    eta: Date | null
    status: string | null
    totalItems: number | null
    totalWeight: number | null
    totalVolume: number | null
    sapProjectId: string | null
    sapContract: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    projectCode: string | null
    name: string | null
    description: string | null
    clientName: string | null
    clientContact: string | null
    destination: string | null
    shippingLine: string | null
    vesselName: string | null
    etd: Date | null
    eta: Date | null
    status: string | null
    totalItems: number | null
    totalWeight: number | null
    totalVolume: number | null
    sapProjectId: string | null
    sapContract: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    projectCode: number
    name: number
    description: number
    clientName: number
    clientContact: number
    destination: number
    shippingLine: number
    vesselName: number
    etd: number
    eta: number
    status: number
    totalItems: number
    totalWeight: number
    totalVolume: number
    sapProjectId: number
    sapContract: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    totalItems?: true
    totalWeight?: true
    totalVolume?: true
  }

  export type ProjectSumAggregateInputType = {
    totalItems?: true
    totalWeight?: true
    totalVolume?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    projectCode?: true
    name?: true
    description?: true
    clientName?: true
    clientContact?: true
    destination?: true
    shippingLine?: true
    vesselName?: true
    etd?: true
    eta?: true
    status?: true
    totalItems?: true
    totalWeight?: true
    totalVolume?: true
    sapProjectId?: true
    sapContract?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    projectCode?: true
    name?: true
    description?: true
    clientName?: true
    clientContact?: true
    destination?: true
    shippingLine?: true
    vesselName?: true
    etd?: true
    eta?: true
    status?: true
    totalItems?: true
    totalWeight?: true
    totalVolume?: true
    sapProjectId?: true
    sapContract?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    projectCode?: true
    name?: true
    description?: true
    clientName?: true
    clientContact?: true
    destination?: true
    shippingLine?: true
    vesselName?: true
    etd?: true
    eta?: true
    status?: true
    totalItems?: true
    totalWeight?: true
    totalVolume?: true
    sapProjectId?: true
    sapContract?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    projectCode: string
    name: string
    description: string | null
    clientName: string
    clientContact: string | null
    destination: string | null
    shippingLine: string | null
    vesselName: string | null
    etd: Date | null
    eta: Date | null
    status: string
    totalItems: number
    totalWeight: number
    totalVolume: number
    sapProjectId: string | null
    sapContract: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectCode?: boolean
    name?: boolean
    description?: boolean
    clientName?: boolean
    clientContact?: boolean
    destination?: boolean
    shippingLine?: boolean
    vesselName?: boolean
    etd?: boolean
    eta?: boolean
    status?: boolean
    totalItems?: boolean
    totalWeight?: boolean
    totalVolume?: boolean
    sapProjectId?: boolean
    sapContract?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cargoItems?: boolean | Project$cargoItemsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectCode?: boolean
    name?: boolean
    description?: boolean
    clientName?: boolean
    clientContact?: boolean
    destination?: boolean
    shippingLine?: boolean
    vesselName?: boolean
    etd?: boolean
    eta?: boolean
    status?: boolean
    totalItems?: boolean
    totalWeight?: boolean
    totalVolume?: boolean
    sapProjectId?: boolean
    sapContract?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectCode?: boolean
    name?: boolean
    description?: boolean
    clientName?: boolean
    clientContact?: boolean
    destination?: boolean
    shippingLine?: boolean
    vesselName?: boolean
    etd?: boolean
    eta?: boolean
    status?: boolean
    totalItems?: boolean
    totalWeight?: boolean
    totalVolume?: boolean
    sapProjectId?: boolean
    sapContract?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    projectCode?: boolean
    name?: boolean
    description?: boolean
    clientName?: boolean
    clientContact?: boolean
    destination?: boolean
    shippingLine?: boolean
    vesselName?: boolean
    etd?: boolean
    eta?: boolean
    status?: boolean
    totalItems?: boolean
    totalWeight?: boolean
    totalVolume?: boolean
    sapProjectId?: boolean
    sapContract?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectCode" | "name" | "description" | "clientName" | "clientContact" | "destination" | "shippingLine" | "vesselName" | "etd" | "eta" | "status" | "totalItems" | "totalWeight" | "totalVolume" | "sapProjectId" | "sapContract" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItems?: boolean | Project$cargoItemsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      cargoItems: Prisma.$CargoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectCode: string
      name: string
      description: string | null
      clientName: string
      clientContact: string | null
      destination: string | null
      shippingLine: string | null
      vesselName: string | null
      etd: Date | null
      eta: Date | null
      status: string
      totalItems: number
      totalWeight: number
      totalVolume: number
      sapProjectId: string | null
      sapContract: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cargoItems<T extends Project$cargoItemsArgs<ExtArgs> = {}>(args?: Subset<T, Project$cargoItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly projectCode: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly clientName: FieldRef<"Project", 'String'>
    readonly clientContact: FieldRef<"Project", 'String'>
    readonly destination: FieldRef<"Project", 'String'>
    readonly shippingLine: FieldRef<"Project", 'String'>
    readonly vesselName: FieldRef<"Project", 'String'>
    readonly etd: FieldRef<"Project", 'DateTime'>
    readonly eta: FieldRef<"Project", 'DateTime'>
    readonly status: FieldRef<"Project", 'String'>
    readonly totalItems: FieldRef<"Project", 'Int'>
    readonly totalWeight: FieldRef<"Project", 'Float'>
    readonly totalVolume: FieldRef<"Project", 'Float'>
    readonly sapProjectId: FieldRef<"Project", 'String'>
    readonly sapContract: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.cargoItems
   */
  export type Project$cargoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CargoItem
     */
    select?: CargoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CargoItem
     */
    omit?: CargoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CargoItemInclude<ExtArgs> | null
    where?: CargoItemWhereInput
    orderBy?: CargoItemOrderByWithRelationInput | CargoItemOrderByWithRelationInput[]
    cursor?: CargoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CargoItemScalarFieldEnum | CargoItemScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Equipment
   */

  export type AggregateEquipment = {
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  export type EquipmentAvgAggregateOutputType = {
    capacity: number | null
  }

  export type EquipmentSumAggregateOutputType = {
    capacity: number | null
  }

  export type EquipmentMinAggregateOutputType = {
    id: string | null
    equipmentCode: string | null
    name: string | null
    type: string | null
    capacity: number | null
    manufacturer: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    currentLocation: string | null
    lastInspection: Date | null
    nextInspection: Date | null
    certificationId: string | null
    certExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipmentMaxAggregateOutputType = {
    id: string | null
    equipmentCode: string | null
    name: string | null
    type: string | null
    capacity: number | null
    manufacturer: string | null
    model: string | null
    serialNumber: string | null
    status: string | null
    currentLocation: string | null
    lastInspection: Date | null
    nextInspection: Date | null
    certificationId: string | null
    certExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipmentCountAggregateOutputType = {
    id: number
    equipmentCode: number
    name: number
    type: number
    capacity: number
    manufacturer: number
    model: number
    serialNumber: number
    status: number
    currentLocation: number
    lastInspection: number
    nextInspection: number
    certificationId: number
    certExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EquipmentAvgAggregateInputType = {
    capacity?: true
  }

  export type EquipmentSumAggregateInputType = {
    capacity?: true
  }

  export type EquipmentMinAggregateInputType = {
    id?: true
    equipmentCode?: true
    name?: true
    type?: true
    capacity?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    currentLocation?: true
    lastInspection?: true
    nextInspection?: true
    certificationId?: true
    certExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipmentMaxAggregateInputType = {
    id?: true
    equipmentCode?: true
    name?: true
    type?: true
    capacity?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    currentLocation?: true
    lastInspection?: true
    nextInspection?: true
    certificationId?: true
    certExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipmentCountAggregateInputType = {
    id?: true
    equipmentCode?: true
    name?: true
    type?: true
    capacity?: true
    manufacturer?: true
    model?: true
    serialNumber?: true
    status?: true
    currentLocation?: true
    lastInspection?: true
    nextInspection?: true
    certificationId?: true
    certExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EquipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to aggregate.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Equipment
    **/
    _count?: true | EquipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipmentMaxAggregateInputType
  }

  export type GetEquipmentAggregateType<T extends EquipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipment[P]>
      : GetScalarType<T[P], AggregateEquipment[P]>
  }




  export type EquipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipmentWhereInput
    orderBy?: EquipmentOrderByWithAggregationInput | EquipmentOrderByWithAggregationInput[]
    by: EquipmentScalarFieldEnum[] | EquipmentScalarFieldEnum
    having?: EquipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipmentCountAggregateInputType | true
    _avg?: EquipmentAvgAggregateInputType
    _sum?: EquipmentSumAggregateInputType
    _min?: EquipmentMinAggregateInputType
    _max?: EquipmentMaxAggregateInputType
  }

  export type EquipmentGroupByOutputType = {
    id: string
    equipmentCode: string
    name: string
    type: string
    capacity: number | null
    manufacturer: string | null
    model: string | null
    serialNumber: string | null
    status: string
    currentLocation: string | null
    lastInspection: Date | null
    nextInspection: Date | null
    certificationId: string | null
    certExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  type GetEquipmentGroupByPayload<T extends EquipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
            : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
        }
      >
    >


  export type EquipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipmentCode?: boolean
    name?: boolean
    type?: boolean
    capacity?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    currentLocation?: boolean
    lastInspection?: boolean
    nextInspection?: boolean
    certificationId?: boolean
    certExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["equipment"]>

  export type EquipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipmentCode?: boolean
    name?: boolean
    type?: boolean
    capacity?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    currentLocation?: boolean
    lastInspection?: boolean
    nextInspection?: boolean
    certificationId?: boolean
    certExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["equipment"]>

  export type EquipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    equipmentCode?: boolean
    name?: boolean
    type?: boolean
    capacity?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    currentLocation?: boolean
    lastInspection?: boolean
    nextInspection?: boolean
    certificationId?: boolean
    certExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["equipment"]>

  export type EquipmentSelectScalar = {
    id?: boolean
    equipmentCode?: boolean
    name?: boolean
    type?: boolean
    capacity?: boolean
    manufacturer?: boolean
    model?: boolean
    serialNumber?: boolean
    status?: boolean
    currentLocation?: boolean
    lastInspection?: boolean
    nextInspection?: boolean
    certificationId?: boolean
    certExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EquipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "equipmentCode" | "name" | "type" | "capacity" | "manufacturer" | "model" | "serialNumber" | "status" | "currentLocation" | "lastInspection" | "nextInspection" | "certificationId" | "certExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["equipment"]>

  export type $EquipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Equipment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      equipmentCode: string
      name: string
      type: string
      capacity: number | null
      manufacturer: string | null
      model: string | null
      serialNumber: string | null
      status: string
      currentLocation: string | null
      lastInspection: Date | null
      nextInspection: Date | null
      certificationId: string | null
      certExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["equipment"]>
    composites: {}
  }

  type EquipmentGetPayload<S extends boolean | null | undefined | EquipmentDefaultArgs> = $Result.GetResult<Prisma.$EquipmentPayload, S>

  type EquipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EquipmentCountAggregateInputType | true
    }

  export interface EquipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Equipment'], meta: { name: 'Equipment' } }
    /**
     * Find zero or one Equipment that matches the filter.
     * @param {EquipmentFindUniqueArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipmentFindUniqueArgs>(args: SelectSubset<T, EquipmentFindUniqueArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Equipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipmentFindUniqueOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipmentFindFirstArgs>(args?: SelectSubset<T, EquipmentFindFirstArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Equipment
     * const equipment = await prisma.equipment.findMany()
     * 
     * // Get first 10 Equipment
     * const equipment = await prisma.equipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const equipmentWithIdOnly = await prisma.equipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EquipmentFindManyArgs>(args?: SelectSubset<T, EquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Equipment.
     * @param {EquipmentCreateArgs} args - Arguments to create a Equipment.
     * @example
     * // Create one Equipment
     * const Equipment = await prisma.equipment.create({
     *   data: {
     *     // ... data to create a Equipment
     *   }
     * })
     * 
     */
    create<T extends EquipmentCreateArgs>(args: SelectSubset<T, EquipmentCreateArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Equipment.
     * @param {EquipmentCreateManyArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EquipmentCreateManyArgs>(args?: SelectSubset<T, EquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Equipment and returns the data saved in the database.
     * @param {EquipmentCreateManyAndReturnArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Equipment and only return the `id`
     * const equipmentWithIdOnly = await prisma.equipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EquipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EquipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Equipment.
     * @param {EquipmentDeleteArgs} args - Arguments to delete one Equipment.
     * @example
     * // Delete one Equipment
     * const Equipment = await prisma.equipment.delete({
     *   where: {
     *     // ... filter to delete one Equipment
     *   }
     * })
     * 
     */
    delete<T extends EquipmentDeleteArgs>(args: SelectSubset<T, EquipmentDeleteArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Equipment.
     * @param {EquipmentUpdateArgs} args - Arguments to update one Equipment.
     * @example
     * // Update one Equipment
     * const equipment = await prisma.equipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EquipmentUpdateArgs>(args: SelectSubset<T, EquipmentUpdateArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Equipment.
     * @param {EquipmentDeleteManyArgs} args - Arguments to filter Equipment to delete.
     * @example
     * // Delete a few Equipment
     * const { count } = await prisma.equipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EquipmentDeleteManyArgs>(args?: SelectSubset<T, EquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EquipmentUpdateManyArgs>(args: SelectSubset<T, EquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipment and returns the data updated in the database.
     * @param {EquipmentUpdateManyAndReturnArgs} args - Arguments to update many Equipment.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Equipment and only return the `id`
     * const equipmentWithIdOnly = await prisma.equipment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EquipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EquipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Equipment.
     * @param {EquipmentUpsertArgs} args - Arguments to update or create a Equipment.
     * @example
     * // Update or create a Equipment
     * const equipment = await prisma.equipment.upsert({
     *   create: {
     *     // ... data to create a Equipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Equipment we want to update
     *   }
     * })
     */
    upsert<T extends EquipmentUpsertArgs>(args: SelectSubset<T, EquipmentUpsertArgs<ExtArgs>>): Prisma__EquipmentClient<$Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentCountArgs} args - Arguments to filter Equipment to count.
     * @example
     * // Count the number of Equipment
     * const count = await prisma.equipment.count({
     *   where: {
     *     // ... the filter for the Equipment we want to count
     *   }
     * })
    **/
    count<T extends EquipmentCountArgs>(
      args?: Subset<T, EquipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipmentAggregateArgs>(args: Subset<T, EquipmentAggregateArgs>): Prisma.PrismaPromise<GetEquipmentAggregateType<T>>

    /**
     * Group by Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EquipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EquipmentGroupByArgs['orderBy'] }
        : { orderBy?: EquipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Equipment model
   */
  readonly fields: EquipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Equipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EquipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Equipment model
   */
  interface EquipmentFieldRefs {
    readonly id: FieldRef<"Equipment", 'String'>
    readonly equipmentCode: FieldRef<"Equipment", 'String'>
    readonly name: FieldRef<"Equipment", 'String'>
    readonly type: FieldRef<"Equipment", 'String'>
    readonly capacity: FieldRef<"Equipment", 'Float'>
    readonly manufacturer: FieldRef<"Equipment", 'String'>
    readonly model: FieldRef<"Equipment", 'String'>
    readonly serialNumber: FieldRef<"Equipment", 'String'>
    readonly status: FieldRef<"Equipment", 'String'>
    readonly currentLocation: FieldRef<"Equipment", 'String'>
    readonly lastInspection: FieldRef<"Equipment", 'DateTime'>
    readonly nextInspection: FieldRef<"Equipment", 'DateTime'>
    readonly certificationId: FieldRef<"Equipment", 'String'>
    readonly certExpiry: FieldRef<"Equipment", 'DateTime'>
    readonly createdAt: FieldRef<"Equipment", 'DateTime'>
    readonly updatedAt: FieldRef<"Equipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Equipment findUnique
   */
  export type EquipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment findUniqueOrThrow
   */
  export type EquipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment findFirst
   */
  export type EquipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment findFirstOrThrow
   */
  export type EquipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment findMany
   */
  export type EquipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter, which Equipment to fetch.
     */
    where?: EquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipment to fetch.
     */
    orderBy?: EquipmentOrderByWithRelationInput | EquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Equipment.
     */
    cursor?: EquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipment.
     */
    skip?: number
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * Equipment create
   */
  export type EquipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Equipment.
     */
    data: XOR<EquipmentCreateInput, EquipmentUncheckedCreateInput>
  }

  /**
   * Equipment createMany
   */
  export type EquipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Equipment.
     */
    data: EquipmentCreateManyInput | EquipmentCreateManyInput[]
  }

  /**
   * Equipment createManyAndReturn
   */
  export type EquipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * The data used to create many Equipment.
     */
    data: EquipmentCreateManyInput | EquipmentCreateManyInput[]
  }

  /**
   * Equipment update
   */
  export type EquipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Equipment.
     */
    data: XOR<EquipmentUpdateInput, EquipmentUncheckedUpdateInput>
    /**
     * Choose, which Equipment to update.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment updateMany
   */
  export type EquipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Equipment.
     */
    data: XOR<EquipmentUpdateManyMutationInput, EquipmentUncheckedUpdateManyInput>
    /**
     * Filter which Equipment to update
     */
    where?: EquipmentWhereInput
    /**
     * Limit how many Equipment to update.
     */
    limit?: number
  }

  /**
   * Equipment updateManyAndReturn
   */
  export type EquipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * The data used to update Equipment.
     */
    data: XOR<EquipmentUpdateManyMutationInput, EquipmentUncheckedUpdateManyInput>
    /**
     * Filter which Equipment to update
     */
    where?: EquipmentWhereInput
    /**
     * Limit how many Equipment to update.
     */
    limit?: number
  }

  /**
   * Equipment upsert
   */
  export type EquipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Equipment to update in case it exists.
     */
    where: EquipmentWhereUniqueInput
    /**
     * In case the Equipment found by the `where` argument doesn't exist, create a new Equipment with this data.
     */
    create: XOR<EquipmentCreateInput, EquipmentUncheckedCreateInput>
    /**
     * In case the Equipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EquipmentUpdateInput, EquipmentUncheckedUpdateInput>
  }

  /**
   * Equipment delete
   */
  export type EquipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
    /**
     * Filter which Equipment to delete.
     */
    where: EquipmentWhereUniqueInput
  }

  /**
   * Equipment deleteMany
   */
  export type EquipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to delete
     */
    where?: EquipmentWhereInput
    /**
     * Limit how many Equipment to delete.
     */
    limit?: number
  }

  /**
   * Equipment without action
   */
  export type EquipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: EquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Equipment
     */
    omit?: EquipmentOmit<ExtArgs> | null
  }


  /**
   * Model Movement
   */

  export type AggregateMovement = {
    _count: MovementCountAggregateOutputType | null
    _avg: MovementAvgAggregateOutputType | null
    _sum: MovementSumAggregateOutputType | null
    _min: MovementMinAggregateOutputType | null
    _max: MovementMaxAggregateOutputType | null
  }

  export type MovementAvgAggregateOutputType = {
    actualWeight: number | null
  }

  export type MovementSumAggregateOutputType = {
    actualWeight: number | null
  }

  export type MovementMinAggregateOutputType = {
    id: string | null
    movementRef: string | null
    cargoItemId: string | null
    cargoCode: string | null
    type: string | null
    fromLocationId: string | null
    toLocationId: string | null
    equipmentUsed: string | null
    liftMethod: string | null
    operatorName: string | null
    actualWeight: number | null
    remarks: string | null
    performedBy: string | null
    createdAt: Date | null
  }

  export type MovementMaxAggregateOutputType = {
    id: string | null
    movementRef: string | null
    cargoItemId: string | null
    cargoCode: string | null
    type: string | null
    fromLocationId: string | null
    toLocationId: string | null
    equipmentUsed: string | null
    liftMethod: string | null
    operatorName: string | null
    actualWeight: number | null
    remarks: string | null
    performedBy: string | null
    createdAt: Date | null
  }

  export type MovementCountAggregateOutputType = {
    id: number
    movementRef: number
    cargoItemId: number
    cargoCode: number
    type: number
    fromLocationId: number
    toLocationId: number
    equipmentUsed: number
    liftMethod: number
    operatorName: number
    actualWeight: number
    remarks: number
    performedBy: number
    createdAt: number
    _all: number
  }


  export type MovementAvgAggregateInputType = {
    actualWeight?: true
  }

  export type MovementSumAggregateInputType = {
    actualWeight?: true
  }

  export type MovementMinAggregateInputType = {
    id?: true
    movementRef?: true
    cargoItemId?: true
    cargoCode?: true
    type?: true
    fromLocationId?: true
    toLocationId?: true
    equipmentUsed?: true
    liftMethod?: true
    operatorName?: true
    actualWeight?: true
    remarks?: true
    performedBy?: true
    createdAt?: true
  }

  export type MovementMaxAggregateInputType = {
    id?: true
    movementRef?: true
    cargoItemId?: true
    cargoCode?: true
    type?: true
    fromLocationId?: true
    toLocationId?: true
    equipmentUsed?: true
    liftMethod?: true
    operatorName?: true
    actualWeight?: true
    remarks?: true
    performedBy?: true
    createdAt?: true
  }

  export type MovementCountAggregateInputType = {
    id?: true
    movementRef?: true
    cargoItemId?: true
    cargoCode?: true
    type?: true
    fromLocationId?: true
    toLocationId?: true
    equipmentUsed?: true
    liftMethod?: true
    operatorName?: true
    actualWeight?: true
    remarks?: true
    performedBy?: true
    createdAt?: true
    _all?: true
  }

  export type MovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movement to aggregate.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movements
    **/
    _count?: true | MovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovementMaxAggregateInputType
  }

  export type GetMovementAggregateType<T extends MovementAggregateArgs> = {
        [P in keyof T & keyof AggregateMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovement[P]>
      : GetScalarType<T[P], AggregateMovement[P]>
  }




  export type MovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithAggregationInput | MovementOrderByWithAggregationInput[]
    by: MovementScalarFieldEnum[] | MovementScalarFieldEnum
    having?: MovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovementCountAggregateInputType | true
    _avg?: MovementAvgAggregateInputType
    _sum?: MovementSumAggregateInputType
    _min?: MovementMinAggregateInputType
    _max?: MovementMaxAggregateInputType
  }

  export type MovementGroupByOutputType = {
    id: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    fromLocationId: string | null
    toLocationId: string | null
    equipmentUsed: string | null
    liftMethod: string | null
    operatorName: string | null
    actualWeight: number | null
    remarks: string | null
    performedBy: string
    createdAt: Date
    _count: MovementCountAggregateOutputType | null
    _avg: MovementAvgAggregateOutputType | null
    _sum: MovementSumAggregateOutputType | null
    _min: MovementMinAggregateOutputType | null
    _max: MovementMaxAggregateOutputType | null
  }

  type GetMovementGroupByPayload<T extends MovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovementGroupByOutputType[P]>
            : GetScalarType<T[P], MovementGroupByOutputType[P]>
        }
      >
    >


  export type MovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movementRef?: boolean
    cargoItemId?: boolean
    cargoCode?: boolean
    type?: boolean
    fromLocationId?: boolean
    toLocationId?: boolean
    equipmentUsed?: boolean
    liftMethod?: boolean
    operatorName?: boolean
    actualWeight?: boolean
    remarks?: boolean
    performedBy?: boolean
    createdAt?: boolean
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movementRef?: boolean
    cargoItemId?: boolean
    cargoCode?: boolean
    type?: boolean
    fromLocationId?: boolean
    toLocationId?: boolean
    equipmentUsed?: boolean
    liftMethod?: boolean
    operatorName?: boolean
    actualWeight?: boolean
    remarks?: boolean
    performedBy?: boolean
    createdAt?: boolean
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    movementRef?: boolean
    cargoItemId?: boolean
    cargoCode?: boolean
    type?: boolean
    fromLocationId?: boolean
    toLocationId?: boolean
    equipmentUsed?: boolean
    liftMethod?: boolean
    operatorName?: boolean
    actualWeight?: boolean
    remarks?: boolean
    performedBy?: boolean
    createdAt?: boolean
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectScalar = {
    id?: boolean
    movementRef?: boolean
    cargoItemId?: boolean
    cargoCode?: boolean
    type?: boolean
    fromLocationId?: boolean
    toLocationId?: boolean
    equipmentUsed?: boolean
    liftMethod?: boolean
    operatorName?: boolean
    actualWeight?: boolean
    remarks?: boolean
    performedBy?: boolean
    createdAt?: boolean
  }

  export type MovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "movementRef" | "cargoItemId" | "cargoCode" | "type" | "fromLocationId" | "toLocationId" | "equipmentUsed" | "liftMethod" | "operatorName" | "actualWeight" | "remarks" | "performedBy" | "createdAt", ExtArgs["result"]["movement"]>
  export type MovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }
  export type MovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }
  export type MovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cargoItem?: boolean | CargoItemDefaultArgs<ExtArgs>
    fromLocation?: boolean | Movement$fromLocationArgs<ExtArgs>
    toLocation?: boolean | Movement$toLocationArgs<ExtArgs>
  }

  export type $MovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movement"
    objects: {
      cargoItem: Prisma.$CargoItemPayload<ExtArgs>
      fromLocation: Prisma.$LocationPayload<ExtArgs> | null
      toLocation: Prisma.$LocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      movementRef: string
      cargoItemId: string
      cargoCode: string
      type: string
      fromLocationId: string | null
      toLocationId: string | null
      equipmentUsed: string | null
      liftMethod: string | null
      operatorName: string | null
      actualWeight: number | null
      remarks: string | null
      performedBy: string
      createdAt: Date
    }, ExtArgs["result"]["movement"]>
    composites: {}
  }

  type MovementGetPayload<S extends boolean | null | undefined | MovementDefaultArgs> = $Result.GetResult<Prisma.$MovementPayload, S>

  type MovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovementCountAggregateInputType | true
    }

  export interface MovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movement'], meta: { name: 'Movement' } }
    /**
     * Find zero or one Movement that matches the filter.
     * @param {MovementFindUniqueArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovementFindUniqueArgs>(args: SelectSubset<T, MovementFindUniqueArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovementFindUniqueOrThrowArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovementFindUniqueOrThrowArgs>(args: SelectSubset<T, MovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindFirstArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovementFindFirstArgs>(args?: SelectSubset<T, MovementFindFirstArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindFirstOrThrowArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovementFindFirstOrThrowArgs>(args?: SelectSubset<T, MovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movements
     * const movements = await prisma.movement.findMany()
     * 
     * // Get first 10 Movements
     * const movements = await prisma.movement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movementWithIdOnly = await prisma.movement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovementFindManyArgs>(args?: SelectSubset<T, MovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movement.
     * @param {MovementCreateArgs} args - Arguments to create a Movement.
     * @example
     * // Create one Movement
     * const Movement = await prisma.movement.create({
     *   data: {
     *     // ... data to create a Movement
     *   }
     * })
     * 
     */
    create<T extends MovementCreateArgs>(args: SelectSubset<T, MovementCreateArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movements.
     * @param {MovementCreateManyArgs} args - Arguments to create many Movements.
     * @example
     * // Create many Movements
     * const movement = await prisma.movement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovementCreateManyArgs>(args?: SelectSubset<T, MovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movements and returns the data saved in the database.
     * @param {MovementCreateManyAndReturnArgs} args - Arguments to create many Movements.
     * @example
     * // Create many Movements
     * const movement = await prisma.movement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movements and only return the `id`
     * const movementWithIdOnly = await prisma.movement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovementCreateManyAndReturnArgs>(args?: SelectSubset<T, MovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movement.
     * @param {MovementDeleteArgs} args - Arguments to delete one Movement.
     * @example
     * // Delete one Movement
     * const Movement = await prisma.movement.delete({
     *   where: {
     *     // ... filter to delete one Movement
     *   }
     * })
     * 
     */
    delete<T extends MovementDeleteArgs>(args: SelectSubset<T, MovementDeleteArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movement.
     * @param {MovementUpdateArgs} args - Arguments to update one Movement.
     * @example
     * // Update one Movement
     * const movement = await prisma.movement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovementUpdateArgs>(args: SelectSubset<T, MovementUpdateArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movements.
     * @param {MovementDeleteManyArgs} args - Arguments to filter Movements to delete.
     * @example
     * // Delete a few Movements
     * const { count } = await prisma.movement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovementDeleteManyArgs>(args?: SelectSubset<T, MovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movements
     * const movement = await prisma.movement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovementUpdateManyArgs>(args: SelectSubset<T, MovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movements and returns the data updated in the database.
     * @param {MovementUpdateManyAndReturnArgs} args - Arguments to update many Movements.
     * @example
     * // Update many Movements
     * const movement = await prisma.movement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movements and only return the `id`
     * const movementWithIdOnly = await prisma.movement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovementUpdateManyAndReturnArgs>(args: SelectSubset<T, MovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movement.
     * @param {MovementUpsertArgs} args - Arguments to update or create a Movement.
     * @example
     * // Update or create a Movement
     * const movement = await prisma.movement.upsert({
     *   create: {
     *     // ... data to create a Movement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movement we want to update
     *   }
     * })
     */
    upsert<T extends MovementUpsertArgs>(args: SelectSubset<T, MovementUpsertArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementCountArgs} args - Arguments to filter Movements to count.
     * @example
     * // Count the number of Movements
     * const count = await prisma.movement.count({
     *   where: {
     *     // ... the filter for the Movements we want to count
     *   }
     * })
    **/
    count<T extends MovementCountArgs>(
      args?: Subset<T, MovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovementAggregateArgs>(args: Subset<T, MovementAggregateArgs>): Prisma.PrismaPromise<GetMovementAggregateType<T>>

    /**
     * Group by Movement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovementGroupByArgs['orderBy'] }
        : { orderBy?: MovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movement model
   */
  readonly fields: MovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cargoItem<T extends CargoItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CargoItemDefaultArgs<ExtArgs>>): Prisma__CargoItemClient<$Result.GetResult<Prisma.$CargoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromLocation<T extends Movement$fromLocationArgs<ExtArgs> = {}>(args?: Subset<T, Movement$fromLocationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    toLocation<T extends Movement$toLocationArgs<ExtArgs> = {}>(args?: Subset<T, Movement$toLocationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movement model
   */
  interface MovementFieldRefs {
    readonly id: FieldRef<"Movement", 'String'>
    readonly movementRef: FieldRef<"Movement", 'String'>
    readonly cargoItemId: FieldRef<"Movement", 'String'>
    readonly cargoCode: FieldRef<"Movement", 'String'>
    readonly type: FieldRef<"Movement", 'String'>
    readonly fromLocationId: FieldRef<"Movement", 'String'>
    readonly toLocationId: FieldRef<"Movement", 'String'>
    readonly equipmentUsed: FieldRef<"Movement", 'String'>
    readonly liftMethod: FieldRef<"Movement", 'String'>
    readonly operatorName: FieldRef<"Movement", 'String'>
    readonly actualWeight: FieldRef<"Movement", 'Float'>
    readonly remarks: FieldRef<"Movement", 'String'>
    readonly performedBy: FieldRef<"Movement", 'String'>
    readonly createdAt: FieldRef<"Movement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Movement findUnique
   */
  export type MovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement findUniqueOrThrow
   */
  export type MovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement findFirst
   */
  export type MovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movements.
     */
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement findFirstOrThrow
   */
  export type MovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movements.
     */
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement findMany
   */
  export type MovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movements to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement create
   */
  export type MovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The data needed to create a Movement.
     */
    data: XOR<MovementCreateInput, MovementUncheckedCreateInput>
  }

  /**
   * Movement createMany
   */
  export type MovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movements.
     */
    data: MovementCreateManyInput | MovementCreateManyInput[]
  }

  /**
   * Movement createManyAndReturn
   */
  export type MovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * The data used to create many Movements.
     */
    data: MovementCreateManyInput | MovementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movement update
   */
  export type MovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The data needed to update a Movement.
     */
    data: XOR<MovementUpdateInput, MovementUncheckedUpdateInput>
    /**
     * Choose, which Movement to update.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement updateMany
   */
  export type MovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movements.
     */
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyInput>
    /**
     * Filter which Movements to update
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to update.
     */
    limit?: number
  }

  /**
   * Movement updateManyAndReturn
   */
  export type MovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * The data used to update Movements.
     */
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyInput>
    /**
     * Filter which Movements to update
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movement upsert
   */
  export type MovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The filter to search for the Movement to update in case it exists.
     */
    where: MovementWhereUniqueInput
    /**
     * In case the Movement found by the `where` argument doesn't exist, create a new Movement with this data.
     */
    create: XOR<MovementCreateInput, MovementUncheckedCreateInput>
    /**
     * In case the Movement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovementUpdateInput, MovementUncheckedUpdateInput>
  }

  /**
   * Movement delete
   */
  export type MovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter which Movement to delete.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement deleteMany
   */
  export type MovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movements to delete
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to delete.
     */
    limit?: number
  }

  /**
   * Movement.fromLocation
   */
  export type Movement$fromLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Movement.toLocation
   */
  export type Movement$toLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Movement without action
   */
  export type MovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
  }


  /**
   * Model SAPIntegration
   */

  export type AggregateSAPIntegration = {
    _count: SAPIntegrationCountAggregateOutputType | null
    _min: SAPIntegrationMinAggregateOutputType | null
    _max: SAPIntegrationMaxAggregateOutputType | null
  }

  export type SAPIntegrationMinAggregateOutputType = {
    id: string | null
    name: string | null
    endpoint: string | null
    authMethod: string | null
    apiKey: string | null
    username: string | null
    sapSystemId: string | null
    sapClient: string | null
    protocol: string | null
    isActive: boolean | null
    lastSync: Date | null
    eventMappings: string | null
    fieldMappings: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SAPIntegrationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    endpoint: string | null
    authMethod: string | null
    apiKey: string | null
    username: string | null
    sapSystemId: string | null
    sapClient: string | null
    protocol: string | null
    isActive: boolean | null
    lastSync: Date | null
    eventMappings: string | null
    fieldMappings: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SAPIntegrationCountAggregateOutputType = {
    id: number
    name: number
    endpoint: number
    authMethod: number
    apiKey: number
    username: number
    sapSystemId: number
    sapClient: number
    protocol: number
    isActive: number
    lastSync: number
    eventMappings: number
    fieldMappings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SAPIntegrationMinAggregateInputType = {
    id?: true
    name?: true
    endpoint?: true
    authMethod?: true
    apiKey?: true
    username?: true
    sapSystemId?: true
    sapClient?: true
    protocol?: true
    isActive?: true
    lastSync?: true
    eventMappings?: true
    fieldMappings?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SAPIntegrationMaxAggregateInputType = {
    id?: true
    name?: true
    endpoint?: true
    authMethod?: true
    apiKey?: true
    username?: true
    sapSystemId?: true
    sapClient?: true
    protocol?: true
    isActive?: true
    lastSync?: true
    eventMappings?: true
    fieldMappings?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SAPIntegrationCountAggregateInputType = {
    id?: true
    name?: true
    endpoint?: true
    authMethod?: true
    apiKey?: true
    username?: true
    sapSystemId?: true
    sapClient?: true
    protocol?: true
    isActive?: true
    lastSync?: true
    eventMappings?: true
    fieldMappings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SAPIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SAPIntegration to aggregate.
     */
    where?: SAPIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SAPIntegrations to fetch.
     */
    orderBy?: SAPIntegrationOrderByWithRelationInput | SAPIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SAPIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SAPIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SAPIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SAPIntegrations
    **/
    _count?: true | SAPIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SAPIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SAPIntegrationMaxAggregateInputType
  }

  export type GetSAPIntegrationAggregateType<T extends SAPIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateSAPIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSAPIntegration[P]>
      : GetScalarType<T[P], AggregateSAPIntegration[P]>
  }




  export type SAPIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SAPIntegrationWhereInput
    orderBy?: SAPIntegrationOrderByWithAggregationInput | SAPIntegrationOrderByWithAggregationInput[]
    by: SAPIntegrationScalarFieldEnum[] | SAPIntegrationScalarFieldEnum
    having?: SAPIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SAPIntegrationCountAggregateInputType | true
    _min?: SAPIntegrationMinAggregateInputType
    _max?: SAPIntegrationMaxAggregateInputType
  }

  export type SAPIntegrationGroupByOutputType = {
    id: string
    name: string
    endpoint: string
    authMethod: string
    apiKey: string | null
    username: string | null
    sapSystemId: string | null
    sapClient: string | null
    protocol: string
    isActive: boolean
    lastSync: Date | null
    eventMappings: string | null
    fieldMappings: string | null
    createdAt: Date
    updatedAt: Date
    _count: SAPIntegrationCountAggregateOutputType | null
    _min: SAPIntegrationMinAggregateOutputType | null
    _max: SAPIntegrationMaxAggregateOutputType | null
  }

  type GetSAPIntegrationGroupByPayload<T extends SAPIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SAPIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SAPIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SAPIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], SAPIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type SAPIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    endpoint?: boolean
    authMethod?: boolean
    apiKey?: boolean
    username?: boolean
    sapSystemId?: boolean
    sapClient?: boolean
    protocol?: boolean
    isActive?: boolean
    lastSync?: boolean
    eventMappings?: boolean
    fieldMappings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sAPIntegration"]>

  export type SAPIntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    endpoint?: boolean
    authMethod?: boolean
    apiKey?: boolean
    username?: boolean
    sapSystemId?: boolean
    sapClient?: boolean
    protocol?: boolean
    isActive?: boolean
    lastSync?: boolean
    eventMappings?: boolean
    fieldMappings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sAPIntegration"]>

  export type SAPIntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    endpoint?: boolean
    authMethod?: boolean
    apiKey?: boolean
    username?: boolean
    sapSystemId?: boolean
    sapClient?: boolean
    protocol?: boolean
    isActive?: boolean
    lastSync?: boolean
    eventMappings?: boolean
    fieldMappings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sAPIntegration"]>

  export type SAPIntegrationSelectScalar = {
    id?: boolean
    name?: boolean
    endpoint?: boolean
    authMethod?: boolean
    apiKey?: boolean
    username?: boolean
    sapSystemId?: boolean
    sapClient?: boolean
    protocol?: boolean
    isActive?: boolean
    lastSync?: boolean
    eventMappings?: boolean
    fieldMappings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SAPIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "endpoint" | "authMethod" | "apiKey" | "username" | "sapSystemId" | "sapClient" | "protocol" | "isActive" | "lastSync" | "eventMappings" | "fieldMappings" | "createdAt" | "updatedAt", ExtArgs["result"]["sAPIntegration"]>

  export type $SAPIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SAPIntegration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      endpoint: string
      authMethod: string
      apiKey: string | null
      username: string | null
      sapSystemId: string | null
      sapClient: string | null
      protocol: string
      isActive: boolean
      lastSync: Date | null
      eventMappings: string | null
      fieldMappings: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sAPIntegration"]>
    composites: {}
  }

  type SAPIntegrationGetPayload<S extends boolean | null | undefined | SAPIntegrationDefaultArgs> = $Result.GetResult<Prisma.$SAPIntegrationPayload, S>

  type SAPIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SAPIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SAPIntegrationCountAggregateInputType | true
    }

  export interface SAPIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SAPIntegration'], meta: { name: 'SAPIntegration' } }
    /**
     * Find zero or one SAPIntegration that matches the filter.
     * @param {SAPIntegrationFindUniqueArgs} args - Arguments to find a SAPIntegration
     * @example
     * // Get one SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SAPIntegrationFindUniqueArgs>(args: SelectSubset<T, SAPIntegrationFindUniqueArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SAPIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SAPIntegrationFindUniqueOrThrowArgs} args - Arguments to find a SAPIntegration
     * @example
     * // Get one SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SAPIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, SAPIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SAPIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationFindFirstArgs} args - Arguments to find a SAPIntegration
     * @example
     * // Get one SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SAPIntegrationFindFirstArgs>(args?: SelectSubset<T, SAPIntegrationFindFirstArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SAPIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationFindFirstOrThrowArgs} args - Arguments to find a SAPIntegration
     * @example
     * // Get one SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SAPIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, SAPIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SAPIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SAPIntegrations
     * const sAPIntegrations = await prisma.sAPIntegration.findMany()
     * 
     * // Get first 10 SAPIntegrations
     * const sAPIntegrations = await prisma.sAPIntegration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sAPIntegrationWithIdOnly = await prisma.sAPIntegration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SAPIntegrationFindManyArgs>(args?: SelectSubset<T, SAPIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SAPIntegration.
     * @param {SAPIntegrationCreateArgs} args - Arguments to create a SAPIntegration.
     * @example
     * // Create one SAPIntegration
     * const SAPIntegration = await prisma.sAPIntegration.create({
     *   data: {
     *     // ... data to create a SAPIntegration
     *   }
     * })
     * 
     */
    create<T extends SAPIntegrationCreateArgs>(args: SelectSubset<T, SAPIntegrationCreateArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SAPIntegrations.
     * @param {SAPIntegrationCreateManyArgs} args - Arguments to create many SAPIntegrations.
     * @example
     * // Create many SAPIntegrations
     * const sAPIntegration = await prisma.sAPIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SAPIntegrationCreateManyArgs>(args?: SelectSubset<T, SAPIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SAPIntegrations and returns the data saved in the database.
     * @param {SAPIntegrationCreateManyAndReturnArgs} args - Arguments to create many SAPIntegrations.
     * @example
     * // Create many SAPIntegrations
     * const sAPIntegration = await prisma.sAPIntegration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SAPIntegrations and only return the `id`
     * const sAPIntegrationWithIdOnly = await prisma.sAPIntegration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SAPIntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, SAPIntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SAPIntegration.
     * @param {SAPIntegrationDeleteArgs} args - Arguments to delete one SAPIntegration.
     * @example
     * // Delete one SAPIntegration
     * const SAPIntegration = await prisma.sAPIntegration.delete({
     *   where: {
     *     // ... filter to delete one SAPIntegration
     *   }
     * })
     * 
     */
    delete<T extends SAPIntegrationDeleteArgs>(args: SelectSubset<T, SAPIntegrationDeleteArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SAPIntegration.
     * @param {SAPIntegrationUpdateArgs} args - Arguments to update one SAPIntegration.
     * @example
     * // Update one SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SAPIntegrationUpdateArgs>(args: SelectSubset<T, SAPIntegrationUpdateArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SAPIntegrations.
     * @param {SAPIntegrationDeleteManyArgs} args - Arguments to filter SAPIntegrations to delete.
     * @example
     * // Delete a few SAPIntegrations
     * const { count } = await prisma.sAPIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SAPIntegrationDeleteManyArgs>(args?: SelectSubset<T, SAPIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SAPIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SAPIntegrations
     * const sAPIntegration = await prisma.sAPIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SAPIntegrationUpdateManyArgs>(args: SelectSubset<T, SAPIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SAPIntegrations and returns the data updated in the database.
     * @param {SAPIntegrationUpdateManyAndReturnArgs} args - Arguments to update many SAPIntegrations.
     * @example
     * // Update many SAPIntegrations
     * const sAPIntegration = await prisma.sAPIntegration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SAPIntegrations and only return the `id`
     * const sAPIntegrationWithIdOnly = await prisma.sAPIntegration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SAPIntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, SAPIntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SAPIntegration.
     * @param {SAPIntegrationUpsertArgs} args - Arguments to update or create a SAPIntegration.
     * @example
     * // Update or create a SAPIntegration
     * const sAPIntegration = await prisma.sAPIntegration.upsert({
     *   create: {
     *     // ... data to create a SAPIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SAPIntegration we want to update
     *   }
     * })
     */
    upsert<T extends SAPIntegrationUpsertArgs>(args: SelectSubset<T, SAPIntegrationUpsertArgs<ExtArgs>>): Prisma__SAPIntegrationClient<$Result.GetResult<Prisma.$SAPIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SAPIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationCountArgs} args - Arguments to filter SAPIntegrations to count.
     * @example
     * // Count the number of SAPIntegrations
     * const count = await prisma.sAPIntegration.count({
     *   where: {
     *     // ... the filter for the SAPIntegrations we want to count
     *   }
     * })
    **/
    count<T extends SAPIntegrationCountArgs>(
      args?: Subset<T, SAPIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SAPIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SAPIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SAPIntegrationAggregateArgs>(args: Subset<T, SAPIntegrationAggregateArgs>): Prisma.PrismaPromise<GetSAPIntegrationAggregateType<T>>

    /**
     * Group by SAPIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SAPIntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SAPIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SAPIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: SAPIntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SAPIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSAPIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SAPIntegration model
   */
  readonly fields: SAPIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SAPIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SAPIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SAPIntegration model
   */
  interface SAPIntegrationFieldRefs {
    readonly id: FieldRef<"SAPIntegration", 'String'>
    readonly name: FieldRef<"SAPIntegration", 'String'>
    readonly endpoint: FieldRef<"SAPIntegration", 'String'>
    readonly authMethod: FieldRef<"SAPIntegration", 'String'>
    readonly apiKey: FieldRef<"SAPIntegration", 'String'>
    readonly username: FieldRef<"SAPIntegration", 'String'>
    readonly sapSystemId: FieldRef<"SAPIntegration", 'String'>
    readonly sapClient: FieldRef<"SAPIntegration", 'String'>
    readonly protocol: FieldRef<"SAPIntegration", 'String'>
    readonly isActive: FieldRef<"SAPIntegration", 'Boolean'>
    readonly lastSync: FieldRef<"SAPIntegration", 'DateTime'>
    readonly eventMappings: FieldRef<"SAPIntegration", 'String'>
    readonly fieldMappings: FieldRef<"SAPIntegration", 'String'>
    readonly createdAt: FieldRef<"SAPIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"SAPIntegration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SAPIntegration findUnique
   */
  export type SAPIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SAPIntegration to fetch.
     */
    where: SAPIntegrationWhereUniqueInput
  }

  /**
   * SAPIntegration findUniqueOrThrow
   */
  export type SAPIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SAPIntegration to fetch.
     */
    where: SAPIntegrationWhereUniqueInput
  }

  /**
   * SAPIntegration findFirst
   */
  export type SAPIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SAPIntegration to fetch.
     */
    where?: SAPIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SAPIntegrations to fetch.
     */
    orderBy?: SAPIntegrationOrderByWithRelationInput | SAPIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SAPIntegrations.
     */
    cursor?: SAPIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SAPIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SAPIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SAPIntegrations.
     */
    distinct?: SAPIntegrationScalarFieldEnum | SAPIntegrationScalarFieldEnum[]
  }

  /**
   * SAPIntegration findFirstOrThrow
   */
  export type SAPIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SAPIntegration to fetch.
     */
    where?: SAPIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SAPIntegrations to fetch.
     */
    orderBy?: SAPIntegrationOrderByWithRelationInput | SAPIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SAPIntegrations.
     */
    cursor?: SAPIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SAPIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SAPIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SAPIntegrations.
     */
    distinct?: SAPIntegrationScalarFieldEnum | SAPIntegrationScalarFieldEnum[]
  }

  /**
   * SAPIntegration findMany
   */
  export type SAPIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SAPIntegrations to fetch.
     */
    where?: SAPIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SAPIntegrations to fetch.
     */
    orderBy?: SAPIntegrationOrderByWithRelationInput | SAPIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SAPIntegrations.
     */
    cursor?: SAPIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SAPIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SAPIntegrations.
     */
    skip?: number
    distinct?: SAPIntegrationScalarFieldEnum | SAPIntegrationScalarFieldEnum[]
  }

  /**
   * SAPIntegration create
   */
  export type SAPIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * The data needed to create a SAPIntegration.
     */
    data: XOR<SAPIntegrationCreateInput, SAPIntegrationUncheckedCreateInput>
  }

  /**
   * SAPIntegration createMany
   */
  export type SAPIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SAPIntegrations.
     */
    data: SAPIntegrationCreateManyInput | SAPIntegrationCreateManyInput[]
  }

  /**
   * SAPIntegration createManyAndReturn
   */
  export type SAPIntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many SAPIntegrations.
     */
    data: SAPIntegrationCreateManyInput | SAPIntegrationCreateManyInput[]
  }

  /**
   * SAPIntegration update
   */
  export type SAPIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * The data needed to update a SAPIntegration.
     */
    data: XOR<SAPIntegrationUpdateInput, SAPIntegrationUncheckedUpdateInput>
    /**
     * Choose, which SAPIntegration to update.
     */
    where: SAPIntegrationWhereUniqueInput
  }

  /**
   * SAPIntegration updateMany
   */
  export type SAPIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SAPIntegrations.
     */
    data: XOR<SAPIntegrationUpdateManyMutationInput, SAPIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which SAPIntegrations to update
     */
    where?: SAPIntegrationWhereInput
    /**
     * Limit how many SAPIntegrations to update.
     */
    limit?: number
  }

  /**
   * SAPIntegration updateManyAndReturn
   */
  export type SAPIntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * The data used to update SAPIntegrations.
     */
    data: XOR<SAPIntegrationUpdateManyMutationInput, SAPIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which SAPIntegrations to update
     */
    where?: SAPIntegrationWhereInput
    /**
     * Limit how many SAPIntegrations to update.
     */
    limit?: number
  }

  /**
   * SAPIntegration upsert
   */
  export type SAPIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * The filter to search for the SAPIntegration to update in case it exists.
     */
    where: SAPIntegrationWhereUniqueInput
    /**
     * In case the SAPIntegration found by the `where` argument doesn't exist, create a new SAPIntegration with this data.
     */
    create: XOR<SAPIntegrationCreateInput, SAPIntegrationUncheckedCreateInput>
    /**
     * In case the SAPIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SAPIntegrationUpdateInput, SAPIntegrationUncheckedUpdateInput>
  }

  /**
   * SAPIntegration delete
   */
  export type SAPIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
    /**
     * Filter which SAPIntegration to delete.
     */
    where: SAPIntegrationWhereUniqueInput
  }

  /**
   * SAPIntegration deleteMany
   */
  export type SAPIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SAPIntegrations to delete
     */
    where?: SAPIntegrationWhereInput
    /**
     * Limit how many SAPIntegrations to delete.
     */
    limit?: number
  }

  /**
   * SAPIntegration without action
   */
  export type SAPIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SAPIntegration
     */
    select?: SAPIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SAPIntegration
     */
    omit?: SAPIntegrationOmit<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    responseCode: number | null
    retryCount: number | null
    maxRetries: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    responseCode: number | null
    retryCount: number | null
    maxRetries: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: string | null
    integrationId: string | null
    eventType: string | null
    direction: string | null
    payload: string | null
    status: string | null
    responseCode: number | null
    responseBody: string | null
    errorMessage: string | null
    retryCount: number | null
    maxRetries: number | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: string | null
    integrationId: string | null
    eventType: string | null
    direction: string | null
    payload: string | null
    status: string | null
    responseCode: number | null
    responseBody: string | null
    errorMessage: string | null
    retryCount: number | null
    maxRetries: number | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    integrationId: number
    eventType: number
    direction: number
    payload: number
    status: number
    responseCode: number
    responseBody: number
    errorMessage: number
    retryCount: number
    maxRetries: number
    idempotencyKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    responseCode?: true
    retryCount?: true
    maxRetries?: true
  }

  export type SyncLogSumAggregateInputType = {
    responseCode?: true
    retryCount?: true
    maxRetries?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    integrationId?: true
    eventType?: true
    direction?: true
    payload?: true
    status?: true
    responseCode?: true
    responseBody?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    integrationId?: true
    eventType?: true
    direction?: true
    payload?: true
    status?: true
    responseCode?: true
    responseBody?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    integrationId?: true
    eventType?: true
    direction?: true
    payload?: true
    status?: true
    responseCode?: true
    responseBody?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: string
    integrationId: string
    eventType: string
    direction: string
    payload: string
    status: string
    responseCode: number | null
    responseBody: string | null
    errorMessage: string | null
    retryCount: number
    maxRetries: number
    idempotencyKey: string
    createdAt: Date
    updatedAt: Date
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    integrationId?: boolean
    eventType?: boolean
    direction?: boolean
    payload?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    integrationId?: boolean
    eventType?: boolean
    direction?: boolean
    payload?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    integrationId?: boolean
    eventType?: boolean
    direction?: boolean
    payload?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    integrationId?: boolean
    eventType?: boolean
    direction?: boolean
    payload?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "integrationId" | "eventType" | "direction" | "payload" | "status" | "responseCode" | "responseBody" | "errorMessage" | "retryCount" | "maxRetries" | "idempotencyKey" | "createdAt" | "updatedAt", ExtArgs["result"]["syncLog"]>

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      integrationId: string
      eventType: string
      direction: string
      payload: string
      status: string
      responseCode: number | null
      responseBody: string | null
      errorMessage: string | null
      retryCount: number
      maxRetries: number
      idempotencyKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'String'>
    readonly integrationId: FieldRef<"SyncLog", 'String'>
    readonly eventType: FieldRef<"SyncLog", 'String'>
    readonly direction: FieldRef<"SyncLog", 'String'>
    readonly payload: FieldRef<"SyncLog", 'String'>
    readonly status: FieldRef<"SyncLog", 'String'>
    readonly responseCode: FieldRef<"SyncLog", 'Int'>
    readonly responseBody: FieldRef<"SyncLog", 'String'>
    readonly errorMessage: FieldRef<"SyncLog", 'String'>
    readonly retryCount: FieldRef<"SyncLog", 'Int'>
    readonly maxRetries: FieldRef<"SyncLog", 'Int'>
    readonly idempotencyKey: FieldRef<"SyncLog", 'String'>
    readonly createdAt: FieldRef<"SyncLog", 'DateTime'>
    readonly updatedAt: FieldRef<"SyncLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CargoItemScalarFieldEnum: {
    id: 'id',
    cargoCode: 'cargoCode',
    description: 'description',
    weight: 'weight',
    length: 'length',
    width: 'width',
    height: 'height',
    volume: 'volume',
    liftCategory: 'liftCategory',
    centerOfGravity: 'centerOfGravity',
    liftingPoints: 'liftingPoints',
    specialHandling: 'specialHandling',
    hazardClass: 'hazardClass',
    commodityType: 'commodityType',
    status: 'status',
    locationId: 'locationId',
    projectId: 'projectId',
    clientName: 'clientName',
    poReference: 'poReference',
    blReference: 'blReference',
    transportWeight: 'transportWeight',
    transportLength: 'transportLength',
    transportWidth: 'transportWidth',
    transportHeight: 'transportHeight',
    receivedAt: 'receivedAt',
    dispatchedAt: 'dispatchedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CargoItemScalarFieldEnum = (typeof CargoItemScalarFieldEnum)[keyof typeof CargoItemScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    type: 'type',
    zone: 'zone',
    maxWeight: 'maxWeight',
    maxDimension: 'maxDimension',
    area: 'area',
    isActive: 'isActive',
    currentLoad: 'currentLoad',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    projectCode: 'projectCode',
    name: 'name',
    description: 'description',
    clientName: 'clientName',
    clientContact: 'clientContact',
    destination: 'destination',
    shippingLine: 'shippingLine',
    vesselName: 'vesselName',
    etd: 'etd',
    eta: 'eta',
    status: 'status',
    totalItems: 'totalItems',
    totalWeight: 'totalWeight',
    totalVolume: 'totalVolume',
    sapProjectId: 'sapProjectId',
    sapContract: 'sapContract',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const EquipmentScalarFieldEnum: {
    id: 'id',
    equipmentCode: 'equipmentCode',
    name: 'name',
    type: 'type',
    capacity: 'capacity',
    manufacturer: 'manufacturer',
    model: 'model',
    serialNumber: 'serialNumber',
    status: 'status',
    currentLocation: 'currentLocation',
    lastInspection: 'lastInspection',
    nextInspection: 'nextInspection',
    certificationId: 'certificationId',
    certExpiry: 'certExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EquipmentScalarFieldEnum = (typeof EquipmentScalarFieldEnum)[keyof typeof EquipmentScalarFieldEnum]


  export const MovementScalarFieldEnum: {
    id: 'id',
    movementRef: 'movementRef',
    cargoItemId: 'cargoItemId',
    cargoCode: 'cargoCode',
    type: 'type',
    fromLocationId: 'fromLocationId',
    toLocationId: 'toLocationId',
    equipmentUsed: 'equipmentUsed',
    liftMethod: 'liftMethod',
    operatorName: 'operatorName',
    actualWeight: 'actualWeight',
    remarks: 'remarks',
    performedBy: 'performedBy',
    createdAt: 'createdAt'
  };

  export type MovementScalarFieldEnum = (typeof MovementScalarFieldEnum)[keyof typeof MovementScalarFieldEnum]


  export const SAPIntegrationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    endpoint: 'endpoint',
    authMethod: 'authMethod',
    apiKey: 'apiKey',
    username: 'username',
    sapSystemId: 'sapSystemId',
    sapClient: 'sapClient',
    protocol: 'protocol',
    isActive: 'isActive',
    lastSync: 'lastSync',
    eventMappings: 'eventMappings',
    fieldMappings: 'fieldMappings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SAPIntegrationScalarFieldEnum = (typeof SAPIntegrationScalarFieldEnum)[keyof typeof SAPIntegrationScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    integrationId: 'integrationId',
    eventType: 'eventType',
    direction: 'direction',
    payload: 'payload',
    status: 'status',
    responseCode: 'responseCode',
    responseBody: 'responseBody',
    errorMessage: 'errorMessage',
    retryCount: 'retryCount',
    maxRetries: 'maxRetries',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CargoItemWhereInput = {
    AND?: CargoItemWhereInput | CargoItemWhereInput[]
    OR?: CargoItemWhereInput[]
    NOT?: CargoItemWhereInput | CargoItemWhereInput[]
    id?: StringFilter<"CargoItem"> | string
    cargoCode?: StringFilter<"CargoItem"> | string
    description?: StringFilter<"CargoItem"> | string
    weight?: FloatFilter<"CargoItem"> | number
    length?: FloatFilter<"CargoItem"> | number
    width?: FloatFilter<"CargoItem"> | number
    height?: FloatFilter<"CargoItem"> | number
    volume?: FloatNullableFilter<"CargoItem"> | number | null
    liftCategory?: StringFilter<"CargoItem"> | string
    centerOfGravity?: StringNullableFilter<"CargoItem"> | string | null
    liftingPoints?: IntNullableFilter<"CargoItem"> | number | null
    specialHandling?: StringNullableFilter<"CargoItem"> | string | null
    hazardClass?: StringNullableFilter<"CargoItem"> | string | null
    commodityType?: StringFilter<"CargoItem"> | string
    status?: StringFilter<"CargoItem"> | string
    locationId?: StringNullableFilter<"CargoItem"> | string | null
    projectId?: StringNullableFilter<"CargoItem"> | string | null
    clientName?: StringNullableFilter<"CargoItem"> | string | null
    poReference?: StringNullableFilter<"CargoItem"> | string | null
    blReference?: StringNullableFilter<"CargoItem"> | string | null
    transportWeight?: FloatNullableFilter<"CargoItem"> | number | null
    transportLength?: FloatNullableFilter<"CargoItem"> | number | null
    transportWidth?: FloatNullableFilter<"CargoItem"> | number | null
    transportHeight?: FloatNullableFilter<"CargoItem"> | number | null
    receivedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    dispatchedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CargoItem"> | Date | string
    updatedAt?: DateTimeFilter<"CargoItem"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    movements?: MovementListRelationFilter
  }

  export type CargoItemOrderByWithRelationInput = {
    id?: SortOrder
    cargoCode?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrderInput | SortOrder
    liftCategory?: SortOrder
    centerOfGravity?: SortOrderInput | SortOrder
    liftingPoints?: SortOrderInput | SortOrder
    specialHandling?: SortOrderInput | SortOrder
    hazardClass?: SortOrderInput | SortOrder
    commodityType?: SortOrder
    status?: SortOrder
    locationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    clientName?: SortOrderInput | SortOrder
    poReference?: SortOrderInput | SortOrder
    blReference?: SortOrderInput | SortOrder
    transportWeight?: SortOrderInput | SortOrder
    transportLength?: SortOrderInput | SortOrder
    transportWidth?: SortOrderInput | SortOrder
    transportHeight?: SortOrderInput | SortOrder
    receivedAt?: SortOrderInput | SortOrder
    dispatchedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    movements?: MovementOrderByRelationAggregateInput
  }

  export type CargoItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cargoCode?: string
    AND?: CargoItemWhereInput | CargoItemWhereInput[]
    OR?: CargoItemWhereInput[]
    NOT?: CargoItemWhereInput | CargoItemWhereInput[]
    description?: StringFilter<"CargoItem"> | string
    weight?: FloatFilter<"CargoItem"> | number
    length?: FloatFilter<"CargoItem"> | number
    width?: FloatFilter<"CargoItem"> | number
    height?: FloatFilter<"CargoItem"> | number
    volume?: FloatNullableFilter<"CargoItem"> | number | null
    liftCategory?: StringFilter<"CargoItem"> | string
    centerOfGravity?: StringNullableFilter<"CargoItem"> | string | null
    liftingPoints?: IntNullableFilter<"CargoItem"> | number | null
    specialHandling?: StringNullableFilter<"CargoItem"> | string | null
    hazardClass?: StringNullableFilter<"CargoItem"> | string | null
    commodityType?: StringFilter<"CargoItem"> | string
    status?: StringFilter<"CargoItem"> | string
    locationId?: StringNullableFilter<"CargoItem"> | string | null
    projectId?: StringNullableFilter<"CargoItem"> | string | null
    clientName?: StringNullableFilter<"CargoItem"> | string | null
    poReference?: StringNullableFilter<"CargoItem"> | string | null
    blReference?: StringNullableFilter<"CargoItem"> | string | null
    transportWeight?: FloatNullableFilter<"CargoItem"> | number | null
    transportLength?: FloatNullableFilter<"CargoItem"> | number | null
    transportWidth?: FloatNullableFilter<"CargoItem"> | number | null
    transportHeight?: FloatNullableFilter<"CargoItem"> | number | null
    receivedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    dispatchedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CargoItem"> | Date | string
    updatedAt?: DateTimeFilter<"CargoItem"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    movements?: MovementListRelationFilter
  }, "id" | "cargoCode">

  export type CargoItemOrderByWithAggregationInput = {
    id?: SortOrder
    cargoCode?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrderInput | SortOrder
    liftCategory?: SortOrder
    centerOfGravity?: SortOrderInput | SortOrder
    liftingPoints?: SortOrderInput | SortOrder
    specialHandling?: SortOrderInput | SortOrder
    hazardClass?: SortOrderInput | SortOrder
    commodityType?: SortOrder
    status?: SortOrder
    locationId?: SortOrderInput | SortOrder
    projectId?: SortOrderInput | SortOrder
    clientName?: SortOrderInput | SortOrder
    poReference?: SortOrderInput | SortOrder
    blReference?: SortOrderInput | SortOrder
    transportWeight?: SortOrderInput | SortOrder
    transportLength?: SortOrderInput | SortOrder
    transportWidth?: SortOrderInput | SortOrder
    transportHeight?: SortOrderInput | SortOrder
    receivedAt?: SortOrderInput | SortOrder
    dispatchedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CargoItemCountOrderByAggregateInput
    _avg?: CargoItemAvgOrderByAggregateInput
    _max?: CargoItemMaxOrderByAggregateInput
    _min?: CargoItemMinOrderByAggregateInput
    _sum?: CargoItemSumOrderByAggregateInput
  }

  export type CargoItemScalarWhereWithAggregatesInput = {
    AND?: CargoItemScalarWhereWithAggregatesInput | CargoItemScalarWhereWithAggregatesInput[]
    OR?: CargoItemScalarWhereWithAggregatesInput[]
    NOT?: CargoItemScalarWhereWithAggregatesInput | CargoItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CargoItem"> | string
    cargoCode?: StringWithAggregatesFilter<"CargoItem"> | string
    description?: StringWithAggregatesFilter<"CargoItem"> | string
    weight?: FloatWithAggregatesFilter<"CargoItem"> | number
    length?: FloatWithAggregatesFilter<"CargoItem"> | number
    width?: FloatWithAggregatesFilter<"CargoItem"> | number
    height?: FloatWithAggregatesFilter<"CargoItem"> | number
    volume?: FloatNullableWithAggregatesFilter<"CargoItem"> | number | null
    liftCategory?: StringWithAggregatesFilter<"CargoItem"> | string
    centerOfGravity?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    liftingPoints?: IntNullableWithAggregatesFilter<"CargoItem"> | number | null
    specialHandling?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    hazardClass?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    commodityType?: StringWithAggregatesFilter<"CargoItem"> | string
    status?: StringWithAggregatesFilter<"CargoItem"> | string
    locationId?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    projectId?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    clientName?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    poReference?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    blReference?: StringNullableWithAggregatesFilter<"CargoItem"> | string | null
    transportWeight?: FloatNullableWithAggregatesFilter<"CargoItem"> | number | null
    transportLength?: FloatNullableWithAggregatesFilter<"CargoItem"> | number | null
    transportWidth?: FloatNullableWithAggregatesFilter<"CargoItem"> | number | null
    transportHeight?: FloatNullableWithAggregatesFilter<"CargoItem"> | number | null
    receivedAt?: DateTimeNullableWithAggregatesFilter<"CargoItem"> | Date | string | null
    dispatchedAt?: DateTimeNullableWithAggregatesFilter<"CargoItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CargoItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CargoItem"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    code?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    type?: StringFilter<"Location"> | string
    zone?: StringNullableFilter<"Location"> | string | null
    maxWeight?: FloatNullableFilter<"Location"> | number | null
    maxDimension?: StringNullableFilter<"Location"> | string | null
    area?: FloatNullableFilter<"Location"> | number | null
    isActive?: BoolFilter<"Location"> | boolean
    currentLoad?: IntFilter<"Location"> | number
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    cargoItems?: CargoItemListRelationFilter
    movementsFrom?: MovementListRelationFilter
    movementsTo?: MovementListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    zone?: SortOrderInput | SortOrder
    maxWeight?: SortOrderInput | SortOrder
    maxDimension?: SortOrderInput | SortOrder
    area?: SortOrderInput | SortOrder
    isActive?: SortOrder
    currentLoad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cargoItems?: CargoItemOrderByRelationAggregateInput
    movementsFrom?: MovementOrderByRelationAggregateInput
    movementsTo?: MovementOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    type?: StringFilter<"Location"> | string
    zone?: StringNullableFilter<"Location"> | string | null
    maxWeight?: FloatNullableFilter<"Location"> | number | null
    maxDimension?: StringNullableFilter<"Location"> | string | null
    area?: FloatNullableFilter<"Location"> | number | null
    isActive?: BoolFilter<"Location"> | boolean
    currentLoad?: IntFilter<"Location"> | number
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    cargoItems?: CargoItemListRelationFilter
    movementsFrom?: MovementListRelationFilter
    movementsTo?: MovementListRelationFilter
  }, "id" | "code">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    zone?: SortOrderInput | SortOrder
    maxWeight?: SortOrderInput | SortOrder
    maxDimension?: SortOrderInput | SortOrder
    area?: SortOrderInput | SortOrder
    isActive?: SortOrder
    currentLoad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    code?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    type?: StringWithAggregatesFilter<"Location"> | string
    zone?: StringNullableWithAggregatesFilter<"Location"> | string | null
    maxWeight?: FloatNullableWithAggregatesFilter<"Location"> | number | null
    maxDimension?: StringNullableWithAggregatesFilter<"Location"> | string | null
    area?: FloatNullableWithAggregatesFilter<"Location"> | number | null
    isActive?: BoolWithAggregatesFilter<"Location"> | boolean
    currentLoad?: IntWithAggregatesFilter<"Location"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    projectCode?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    clientName?: StringFilter<"Project"> | string
    clientContact?: StringNullableFilter<"Project"> | string | null
    destination?: StringNullableFilter<"Project"> | string | null
    shippingLine?: StringNullableFilter<"Project"> | string | null
    vesselName?: StringNullableFilter<"Project"> | string | null
    etd?: DateTimeNullableFilter<"Project"> | Date | string | null
    eta?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringFilter<"Project"> | string
    totalItems?: IntFilter<"Project"> | number
    totalWeight?: FloatFilter<"Project"> | number
    totalVolume?: FloatFilter<"Project"> | number
    sapProjectId?: StringNullableFilter<"Project"> | string | null
    sapContract?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    cargoItems?: CargoItemListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    projectCode?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientContact?: SortOrderInput | SortOrder
    destination?: SortOrderInput | SortOrder
    shippingLine?: SortOrderInput | SortOrder
    vesselName?: SortOrderInput | SortOrder
    etd?: SortOrderInput | SortOrder
    eta?: SortOrderInput | SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
    sapProjectId?: SortOrderInput | SortOrder
    sapContract?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cargoItems?: CargoItemOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectCode?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    clientName?: StringFilter<"Project"> | string
    clientContact?: StringNullableFilter<"Project"> | string | null
    destination?: StringNullableFilter<"Project"> | string | null
    shippingLine?: StringNullableFilter<"Project"> | string | null
    vesselName?: StringNullableFilter<"Project"> | string | null
    etd?: DateTimeNullableFilter<"Project"> | Date | string | null
    eta?: DateTimeNullableFilter<"Project"> | Date | string | null
    status?: StringFilter<"Project"> | string
    totalItems?: IntFilter<"Project"> | number
    totalWeight?: FloatFilter<"Project"> | number
    totalVolume?: FloatFilter<"Project"> | number
    sapProjectId?: StringNullableFilter<"Project"> | string | null
    sapContract?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    cargoItems?: CargoItemListRelationFilter
  }, "id" | "projectCode">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    projectCode?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clientName?: SortOrder
    clientContact?: SortOrderInput | SortOrder
    destination?: SortOrderInput | SortOrder
    shippingLine?: SortOrderInput | SortOrder
    vesselName?: SortOrderInput | SortOrder
    etd?: SortOrderInput | SortOrder
    eta?: SortOrderInput | SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
    sapProjectId?: SortOrderInput | SortOrder
    sapContract?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    projectCode?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    clientName?: StringWithAggregatesFilter<"Project"> | string
    clientContact?: StringNullableWithAggregatesFilter<"Project"> | string | null
    destination?: StringNullableWithAggregatesFilter<"Project"> | string | null
    shippingLine?: StringNullableWithAggregatesFilter<"Project"> | string | null
    vesselName?: StringNullableWithAggregatesFilter<"Project"> | string | null
    etd?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    eta?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    status?: StringWithAggregatesFilter<"Project"> | string
    totalItems?: IntWithAggregatesFilter<"Project"> | number
    totalWeight?: FloatWithAggregatesFilter<"Project"> | number
    totalVolume?: FloatWithAggregatesFilter<"Project"> | number
    sapProjectId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    sapContract?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type EquipmentWhereInput = {
    AND?: EquipmentWhereInput | EquipmentWhereInput[]
    OR?: EquipmentWhereInput[]
    NOT?: EquipmentWhereInput | EquipmentWhereInput[]
    id?: StringFilter<"Equipment"> | string
    equipmentCode?: StringFilter<"Equipment"> | string
    name?: StringFilter<"Equipment"> | string
    type?: StringFilter<"Equipment"> | string
    capacity?: FloatNullableFilter<"Equipment"> | number | null
    manufacturer?: StringNullableFilter<"Equipment"> | string | null
    model?: StringNullableFilter<"Equipment"> | string | null
    serialNumber?: StringNullableFilter<"Equipment"> | string | null
    status?: StringFilter<"Equipment"> | string
    currentLocation?: StringNullableFilter<"Equipment"> | string | null
    lastInspection?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    nextInspection?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    certificationId?: StringNullableFilter<"Equipment"> | string | null
    certExpiry?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    createdAt?: DateTimeFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeFilter<"Equipment"> | Date | string
  }

  export type EquipmentOrderByWithRelationInput = {
    id?: SortOrder
    equipmentCode?: SortOrder
    name?: SortOrder
    type?: SortOrder
    capacity?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    lastInspection?: SortOrderInput | SortOrder
    nextInspection?: SortOrderInput | SortOrder
    certificationId?: SortOrderInput | SortOrder
    certExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    equipmentCode?: string
    AND?: EquipmentWhereInput | EquipmentWhereInput[]
    OR?: EquipmentWhereInput[]
    NOT?: EquipmentWhereInput | EquipmentWhereInput[]
    name?: StringFilter<"Equipment"> | string
    type?: StringFilter<"Equipment"> | string
    capacity?: FloatNullableFilter<"Equipment"> | number | null
    manufacturer?: StringNullableFilter<"Equipment"> | string | null
    model?: StringNullableFilter<"Equipment"> | string | null
    serialNumber?: StringNullableFilter<"Equipment"> | string | null
    status?: StringFilter<"Equipment"> | string
    currentLocation?: StringNullableFilter<"Equipment"> | string | null
    lastInspection?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    nextInspection?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    certificationId?: StringNullableFilter<"Equipment"> | string | null
    certExpiry?: DateTimeNullableFilter<"Equipment"> | Date | string | null
    createdAt?: DateTimeFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeFilter<"Equipment"> | Date | string
  }, "id" | "equipmentCode">

  export type EquipmentOrderByWithAggregationInput = {
    id?: SortOrder
    equipmentCode?: SortOrder
    name?: SortOrder
    type?: SortOrder
    capacity?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    currentLocation?: SortOrderInput | SortOrder
    lastInspection?: SortOrderInput | SortOrder
    nextInspection?: SortOrderInput | SortOrder
    certificationId?: SortOrderInput | SortOrder
    certExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EquipmentCountOrderByAggregateInput
    _avg?: EquipmentAvgOrderByAggregateInput
    _max?: EquipmentMaxOrderByAggregateInput
    _min?: EquipmentMinOrderByAggregateInput
    _sum?: EquipmentSumOrderByAggregateInput
  }

  export type EquipmentScalarWhereWithAggregatesInput = {
    AND?: EquipmentScalarWhereWithAggregatesInput | EquipmentScalarWhereWithAggregatesInput[]
    OR?: EquipmentScalarWhereWithAggregatesInput[]
    NOT?: EquipmentScalarWhereWithAggregatesInput | EquipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Equipment"> | string
    equipmentCode?: StringWithAggregatesFilter<"Equipment"> | string
    name?: StringWithAggregatesFilter<"Equipment"> | string
    type?: StringWithAggregatesFilter<"Equipment"> | string
    capacity?: FloatNullableWithAggregatesFilter<"Equipment"> | number | null
    manufacturer?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    model?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    status?: StringWithAggregatesFilter<"Equipment"> | string
    currentLocation?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    lastInspection?: DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null
    nextInspection?: DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null
    certificationId?: StringNullableWithAggregatesFilter<"Equipment"> | string | null
    certExpiry?: DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Equipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Equipment"> | Date | string
  }

  export type MovementWhereInput = {
    AND?: MovementWhereInput | MovementWhereInput[]
    OR?: MovementWhereInput[]
    NOT?: MovementWhereInput | MovementWhereInput[]
    id?: StringFilter<"Movement"> | string
    movementRef?: StringFilter<"Movement"> | string
    cargoItemId?: StringFilter<"Movement"> | string
    cargoCode?: StringFilter<"Movement"> | string
    type?: StringFilter<"Movement"> | string
    fromLocationId?: StringNullableFilter<"Movement"> | string | null
    toLocationId?: StringNullableFilter<"Movement"> | string | null
    equipmentUsed?: StringNullableFilter<"Movement"> | string | null
    liftMethod?: StringNullableFilter<"Movement"> | string | null
    operatorName?: StringNullableFilter<"Movement"> | string | null
    actualWeight?: FloatNullableFilter<"Movement"> | number | null
    remarks?: StringNullableFilter<"Movement"> | string | null
    performedBy?: StringFilter<"Movement"> | string
    createdAt?: DateTimeFilter<"Movement"> | Date | string
    cargoItem?: XOR<CargoItemScalarRelationFilter, CargoItemWhereInput>
    fromLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    toLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }

  export type MovementOrderByWithRelationInput = {
    id?: SortOrder
    movementRef?: SortOrder
    cargoItemId?: SortOrder
    cargoCode?: SortOrder
    type?: SortOrder
    fromLocationId?: SortOrderInput | SortOrder
    toLocationId?: SortOrderInput | SortOrder
    equipmentUsed?: SortOrderInput | SortOrder
    liftMethod?: SortOrderInput | SortOrder
    operatorName?: SortOrderInput | SortOrder
    actualWeight?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
    cargoItem?: CargoItemOrderByWithRelationInput
    fromLocation?: LocationOrderByWithRelationInput
    toLocation?: LocationOrderByWithRelationInput
  }

  export type MovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MovementWhereInput | MovementWhereInput[]
    OR?: MovementWhereInput[]
    NOT?: MovementWhereInput | MovementWhereInput[]
    movementRef?: StringFilter<"Movement"> | string
    cargoItemId?: StringFilter<"Movement"> | string
    cargoCode?: StringFilter<"Movement"> | string
    type?: StringFilter<"Movement"> | string
    fromLocationId?: StringNullableFilter<"Movement"> | string | null
    toLocationId?: StringNullableFilter<"Movement"> | string | null
    equipmentUsed?: StringNullableFilter<"Movement"> | string | null
    liftMethod?: StringNullableFilter<"Movement"> | string | null
    operatorName?: StringNullableFilter<"Movement"> | string | null
    actualWeight?: FloatNullableFilter<"Movement"> | number | null
    remarks?: StringNullableFilter<"Movement"> | string | null
    performedBy?: StringFilter<"Movement"> | string
    createdAt?: DateTimeFilter<"Movement"> | Date | string
    cargoItem?: XOR<CargoItemScalarRelationFilter, CargoItemWhereInput>
    fromLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    toLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }, "id">

  export type MovementOrderByWithAggregationInput = {
    id?: SortOrder
    movementRef?: SortOrder
    cargoItemId?: SortOrder
    cargoCode?: SortOrder
    type?: SortOrder
    fromLocationId?: SortOrderInput | SortOrder
    toLocationId?: SortOrderInput | SortOrder
    equipmentUsed?: SortOrderInput | SortOrder
    liftMethod?: SortOrderInput | SortOrder
    operatorName?: SortOrderInput | SortOrder
    actualWeight?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
    _count?: MovementCountOrderByAggregateInput
    _avg?: MovementAvgOrderByAggregateInput
    _max?: MovementMaxOrderByAggregateInput
    _min?: MovementMinOrderByAggregateInput
    _sum?: MovementSumOrderByAggregateInput
  }

  export type MovementScalarWhereWithAggregatesInput = {
    AND?: MovementScalarWhereWithAggregatesInput | MovementScalarWhereWithAggregatesInput[]
    OR?: MovementScalarWhereWithAggregatesInput[]
    NOT?: MovementScalarWhereWithAggregatesInput | MovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Movement"> | string
    movementRef?: StringWithAggregatesFilter<"Movement"> | string
    cargoItemId?: StringWithAggregatesFilter<"Movement"> | string
    cargoCode?: StringWithAggregatesFilter<"Movement"> | string
    type?: StringWithAggregatesFilter<"Movement"> | string
    fromLocationId?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    toLocationId?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    equipmentUsed?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    liftMethod?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    operatorName?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    actualWeight?: FloatNullableWithAggregatesFilter<"Movement"> | number | null
    remarks?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    performedBy?: StringWithAggregatesFilter<"Movement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Movement"> | Date | string
  }

  export type SAPIntegrationWhereInput = {
    AND?: SAPIntegrationWhereInput | SAPIntegrationWhereInput[]
    OR?: SAPIntegrationWhereInput[]
    NOT?: SAPIntegrationWhereInput | SAPIntegrationWhereInput[]
    id?: StringFilter<"SAPIntegration"> | string
    name?: StringFilter<"SAPIntegration"> | string
    endpoint?: StringFilter<"SAPIntegration"> | string
    authMethod?: StringFilter<"SAPIntegration"> | string
    apiKey?: StringNullableFilter<"SAPIntegration"> | string | null
    username?: StringNullableFilter<"SAPIntegration"> | string | null
    sapSystemId?: StringNullableFilter<"SAPIntegration"> | string | null
    sapClient?: StringNullableFilter<"SAPIntegration"> | string | null
    protocol?: StringFilter<"SAPIntegration"> | string
    isActive?: BoolFilter<"SAPIntegration"> | boolean
    lastSync?: DateTimeNullableFilter<"SAPIntegration"> | Date | string | null
    eventMappings?: StringNullableFilter<"SAPIntegration"> | string | null
    fieldMappings?: StringNullableFilter<"SAPIntegration"> | string | null
    createdAt?: DateTimeFilter<"SAPIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"SAPIntegration"> | Date | string
  }

  export type SAPIntegrationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    endpoint?: SortOrder
    authMethod?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    sapSystemId?: SortOrderInput | SortOrder
    sapClient?: SortOrderInput | SortOrder
    protocol?: SortOrder
    isActive?: SortOrder
    lastSync?: SortOrderInput | SortOrder
    eventMappings?: SortOrderInput | SortOrder
    fieldMappings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SAPIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SAPIntegrationWhereInput | SAPIntegrationWhereInput[]
    OR?: SAPIntegrationWhereInput[]
    NOT?: SAPIntegrationWhereInput | SAPIntegrationWhereInput[]
    endpoint?: StringFilter<"SAPIntegration"> | string
    authMethod?: StringFilter<"SAPIntegration"> | string
    apiKey?: StringNullableFilter<"SAPIntegration"> | string | null
    username?: StringNullableFilter<"SAPIntegration"> | string | null
    sapSystemId?: StringNullableFilter<"SAPIntegration"> | string | null
    sapClient?: StringNullableFilter<"SAPIntegration"> | string | null
    protocol?: StringFilter<"SAPIntegration"> | string
    isActive?: BoolFilter<"SAPIntegration"> | boolean
    lastSync?: DateTimeNullableFilter<"SAPIntegration"> | Date | string | null
    eventMappings?: StringNullableFilter<"SAPIntegration"> | string | null
    fieldMappings?: StringNullableFilter<"SAPIntegration"> | string | null
    createdAt?: DateTimeFilter<"SAPIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"SAPIntegration"> | Date | string
  }, "id" | "name">

  export type SAPIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    endpoint?: SortOrder
    authMethod?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    sapSystemId?: SortOrderInput | SortOrder
    sapClient?: SortOrderInput | SortOrder
    protocol?: SortOrder
    isActive?: SortOrder
    lastSync?: SortOrderInput | SortOrder
    eventMappings?: SortOrderInput | SortOrder
    fieldMappings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SAPIntegrationCountOrderByAggregateInput
    _max?: SAPIntegrationMaxOrderByAggregateInput
    _min?: SAPIntegrationMinOrderByAggregateInput
  }

  export type SAPIntegrationScalarWhereWithAggregatesInput = {
    AND?: SAPIntegrationScalarWhereWithAggregatesInput | SAPIntegrationScalarWhereWithAggregatesInput[]
    OR?: SAPIntegrationScalarWhereWithAggregatesInput[]
    NOT?: SAPIntegrationScalarWhereWithAggregatesInput | SAPIntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SAPIntegration"> | string
    name?: StringWithAggregatesFilter<"SAPIntegration"> | string
    endpoint?: StringWithAggregatesFilter<"SAPIntegration"> | string
    authMethod?: StringWithAggregatesFilter<"SAPIntegration"> | string
    apiKey?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    username?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    sapSystemId?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    sapClient?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    protocol?: StringWithAggregatesFilter<"SAPIntegration"> | string
    isActive?: BoolWithAggregatesFilter<"SAPIntegration"> | boolean
    lastSync?: DateTimeNullableWithAggregatesFilter<"SAPIntegration"> | Date | string | null
    eventMappings?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    fieldMappings?: StringNullableWithAggregatesFilter<"SAPIntegration"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SAPIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SAPIntegration"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    integrationId?: StringFilter<"SyncLog"> | string
    eventType?: StringFilter<"SyncLog"> | string
    direction?: StringFilter<"SyncLog"> | string
    payload?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    responseCode?: IntNullableFilter<"SyncLog"> | number | null
    responseBody?: StringNullableFilter<"SyncLog"> | string | null
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    retryCount?: IntFilter<"SyncLog"> | number
    maxRetries?: IntFilter<"SyncLog"> | number
    idempotencyKey?: StringFilter<"SyncLog"> | string
    createdAt?: DateTimeFilter<"SyncLog"> | Date | string
    updatedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    integrationId?: SortOrder
    eventType?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    responseCode?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    integrationId?: StringFilter<"SyncLog"> | string
    eventType?: StringFilter<"SyncLog"> | string
    direction?: StringFilter<"SyncLog"> | string
    payload?: StringFilter<"SyncLog"> | string
    status?: StringFilter<"SyncLog"> | string
    responseCode?: IntNullableFilter<"SyncLog"> | number | null
    responseBody?: StringNullableFilter<"SyncLog"> | string | null
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    retryCount?: IntFilter<"SyncLog"> | number
    maxRetries?: IntFilter<"SyncLog"> | number
    createdAt?: DateTimeFilter<"SyncLog"> | Date | string
    updatedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }, "id" | "idempotencyKey">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    integrationId?: SortOrder
    eventType?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    responseCode?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncLog"> | string
    integrationId?: StringWithAggregatesFilter<"SyncLog"> | string
    eventType?: StringWithAggregatesFilter<"SyncLog"> | string
    direction?: StringWithAggregatesFilter<"SyncLog"> | string
    payload?: StringWithAggregatesFilter<"SyncLog"> | string
    status?: StringWithAggregatesFilter<"SyncLog"> | string
    responseCode?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    responseBody?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    retryCount?: IntWithAggregatesFilter<"SyncLog"> | number
    maxRetries?: IntWithAggregatesFilter<"SyncLog"> | number
    idempotencyKey?: StringWithAggregatesFilter<"SyncLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
  }

  export type CargoItemCreateInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutCargoItemsInput
    project?: ProjectCreateNestedOneWithoutCargoItemsInput
    movements?: MovementCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemUncheckedCreateInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    locationId?: string | null
    projectId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    movements?: MovementUncheckedCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutCargoItemsNestedInput
    project?: ProjectUpdateOneWithoutCargoItemsNestedInput
    movements?: MovementUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: MovementUncheckedUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemCreateManyInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    locationId?: string | null
    projectId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemCreateNestedManyWithoutLocationInput
    movementsFrom?: MovementCreateNestedManyWithoutFromLocationInput
    movementsTo?: MovementCreateNestedManyWithoutToLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemUncheckedCreateNestedManyWithoutLocationInput
    movementsFrom?: MovementUncheckedCreateNestedManyWithoutFromLocationInput
    movementsTo?: MovementUncheckedCreateNestedManyWithoutToLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUpdateManyWithoutLocationNestedInput
    movementsFrom?: MovementUpdateManyWithoutFromLocationNestedInput
    movementsTo?: MovementUpdateManyWithoutToLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUncheckedUpdateManyWithoutLocationNestedInput
    movementsFrom?: MovementUncheckedUpdateManyWithoutFromLocationNestedInput
    movementsTo?: MovementUncheckedUpdateManyWithoutToLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    projectCode: string
    name: string
    description?: string | null
    clientName: string
    clientContact?: string | null
    destination?: string | null
    shippingLine?: string | null
    vesselName?: string | null
    etd?: Date | string | null
    eta?: Date | string | null
    status?: string
    totalItems?: number
    totalWeight?: number
    totalVolume?: number
    sapProjectId?: string | null
    sapContract?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    projectCode: string
    name: string
    description?: string | null
    clientName: string
    clientContact?: string | null
    destination?: string | null
    shippingLine?: string | null
    vesselName?: string | null
    etd?: Date | string | null
    eta?: Date | string | null
    status?: string
    totalItems?: number
    totalWeight?: number
    totalVolume?: number
    sapProjectId?: string | null
    sapContract?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    projectCode: string
    name: string
    description?: string | null
    clientName: string
    clientContact?: string | null
    destination?: string | null
    shippingLine?: string | null
    vesselName?: string | null
    etd?: Date | string | null
    eta?: Date | string | null
    status?: string
    totalItems?: number
    totalWeight?: number
    totalVolume?: number
    sapProjectId?: string | null
    sapContract?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipmentCreateInput = {
    id?: string
    equipmentCode: string
    name: string
    type: string
    capacity?: number | null
    manufacturer?: string | null
    model?: string | null
    serialNumber?: string | null
    status?: string
    currentLocation?: string | null
    lastInspection?: Date | string | null
    nextInspection?: Date | string | null
    certificationId?: string | null
    certExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipmentUncheckedCreateInput = {
    id?: string
    equipmentCode: string
    name: string
    type: string
    capacity?: number | null
    manufacturer?: string | null
    model?: string | null
    serialNumber?: string | null
    status?: string
    currentLocation?: string | null
    lastInspection?: Date | string | null
    nextInspection?: Date | string | null
    certificationId?: string | null
    certExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipmentCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    capacity?: NullableFloatFieldUpdateOperationsInput | number | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationId?: NullableStringFieldUpdateOperationsInput | string | null
    certExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipmentCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    capacity?: NullableFloatFieldUpdateOperationsInput | number | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationId?: NullableStringFieldUpdateOperationsInput | string | null
    certExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipmentCreateManyInput = {
    id?: string
    equipmentCode: string
    name: string
    type: string
    capacity?: number | null
    manufacturer?: string | null
    model?: string | null
    serialNumber?: string | null
    status?: string
    currentLocation?: string | null
    lastInspection?: Date | string | null
    nextInspection?: Date | string | null
    certificationId?: string | null
    certExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipmentCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    capacity?: NullableFloatFieldUpdateOperationsInput | number | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationId?: NullableStringFieldUpdateOperationsInput | string | null
    certExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    equipmentCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    capacity?: NullableFloatFieldUpdateOperationsInput | number | null
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: NullableStringFieldUpdateOperationsInput | string | null
    lastInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextInspection?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationId?: NullableStringFieldUpdateOperationsInput | string | null
    certExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementCreateInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
    cargoItem: CargoItemCreateNestedOneWithoutMovementsInput
    fromLocation?: LocationCreateNestedOneWithoutMovementsFromInput
    toLocation?: LocationCreateNestedOneWithoutMovementsToInput
  }

  export type MovementUncheckedCreateInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItem?: CargoItemUpdateOneRequiredWithoutMovementsNestedInput
    fromLocation?: LocationUpdateOneWithoutMovementsFromNestedInput
    toLocation?: LocationUpdateOneWithoutMovementsToNestedInput
  }

  export type MovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementCreateManyInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SAPIntegrationCreateInput = {
    id?: string
    name: string
    endpoint: string
    authMethod?: string
    apiKey?: string | null
    username?: string | null
    sapSystemId?: string | null
    sapClient?: string | null
    protocol?: string
    isActive?: boolean
    lastSync?: Date | string | null
    eventMappings?: string | null
    fieldMappings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SAPIntegrationUncheckedCreateInput = {
    id?: string
    name: string
    endpoint: string
    authMethod?: string
    apiKey?: string | null
    username?: string | null
    sapSystemId?: string | null
    sapClient?: string | null
    protocol?: string
    isActive?: boolean
    lastSync?: Date | string | null
    eventMappings?: string | null
    fieldMappings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SAPIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    authMethod?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    sapSystemId?: NullableStringFieldUpdateOperationsInput | string | null
    sapClient?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventMappings?: NullableStringFieldUpdateOperationsInput | string | null
    fieldMappings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SAPIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    authMethod?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    sapSystemId?: NullableStringFieldUpdateOperationsInput | string | null
    sapClient?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventMappings?: NullableStringFieldUpdateOperationsInput | string | null
    fieldMappings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SAPIntegrationCreateManyInput = {
    id?: string
    name: string
    endpoint: string
    authMethod?: string
    apiKey?: string | null
    username?: string | null
    sapSystemId?: string | null
    sapClient?: string | null
    protocol?: string
    isActive?: boolean
    lastSync?: Date | string | null
    eventMappings?: string | null
    fieldMappings?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SAPIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    authMethod?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    sapSystemId?: NullableStringFieldUpdateOperationsInput | string | null
    sapClient?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventMappings?: NullableStringFieldUpdateOperationsInput | string | null
    fieldMappings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SAPIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    authMethod?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    sapSystemId?: NullableStringFieldUpdateOperationsInput | string | null
    sapClient?: NullableStringFieldUpdateOperationsInput | string | null
    protocol?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastSync?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eventMappings?: NullableStringFieldUpdateOperationsInput | string | null
    fieldMappings?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    id?: string
    integrationId: string
    eventType: string
    direction: string
    payload: string
    status?: string
    responseCode?: number | null
    responseBody?: string | null
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncLogUncheckedCreateInput = {
    id?: string
    integrationId: string
    eventType: string
    direction: string
    payload: string
    status?: string
    responseCode?: number | null
    responseBody?: string | null
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateManyInput = {
    id?: string
    integrationId: string
    eventType: string
    direction: string
    payload: string
    status?: string
    responseCode?: number | null
    responseBody?: string | null
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SyncLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type MovementListRelationFilter = {
    every?: MovementWhereInput
    some?: MovementWhereInput
    none?: MovementWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CargoItemCountOrderByAggregateInput = {
    id?: SortOrder
    cargoCode?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrder
    liftCategory?: SortOrder
    centerOfGravity?: SortOrder
    liftingPoints?: SortOrder
    specialHandling?: SortOrder
    hazardClass?: SortOrder
    commodityType?: SortOrder
    status?: SortOrder
    locationId?: SortOrder
    projectId?: SortOrder
    clientName?: SortOrder
    poReference?: SortOrder
    blReference?: SortOrder
    transportWeight?: SortOrder
    transportLength?: SortOrder
    transportWidth?: SortOrder
    transportHeight?: SortOrder
    receivedAt?: SortOrder
    dispatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoItemAvgOrderByAggregateInput = {
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrder
    liftingPoints?: SortOrder
    transportWeight?: SortOrder
    transportLength?: SortOrder
    transportWidth?: SortOrder
    transportHeight?: SortOrder
  }

  export type CargoItemMaxOrderByAggregateInput = {
    id?: SortOrder
    cargoCode?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrder
    liftCategory?: SortOrder
    centerOfGravity?: SortOrder
    liftingPoints?: SortOrder
    specialHandling?: SortOrder
    hazardClass?: SortOrder
    commodityType?: SortOrder
    status?: SortOrder
    locationId?: SortOrder
    projectId?: SortOrder
    clientName?: SortOrder
    poReference?: SortOrder
    blReference?: SortOrder
    transportWeight?: SortOrder
    transportLength?: SortOrder
    transportWidth?: SortOrder
    transportHeight?: SortOrder
    receivedAt?: SortOrder
    dispatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoItemMinOrderByAggregateInput = {
    id?: SortOrder
    cargoCode?: SortOrder
    description?: SortOrder
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrder
    liftCategory?: SortOrder
    centerOfGravity?: SortOrder
    liftingPoints?: SortOrder
    specialHandling?: SortOrder
    hazardClass?: SortOrder
    commodityType?: SortOrder
    status?: SortOrder
    locationId?: SortOrder
    projectId?: SortOrder
    clientName?: SortOrder
    poReference?: SortOrder
    blReference?: SortOrder
    transportWeight?: SortOrder
    transportLength?: SortOrder
    transportWidth?: SortOrder
    transportHeight?: SortOrder
    receivedAt?: SortOrder
    dispatchedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CargoItemSumOrderByAggregateInput = {
    weight?: SortOrder
    length?: SortOrder
    width?: SortOrder
    height?: SortOrder
    volume?: SortOrder
    liftingPoints?: SortOrder
    transportWeight?: SortOrder
    transportLength?: SortOrder
    transportWidth?: SortOrder
    transportHeight?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CargoItemListRelationFilter = {
    every?: CargoItemWhereInput
    some?: CargoItemWhereInput
    none?: CargoItemWhereInput
  }

  export type CargoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    zone?: SortOrder
    maxWeight?: SortOrder
    maxDimension?: SortOrder
    area?: SortOrder
    isActive?: SortOrder
    currentLoad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    maxWeight?: SortOrder
    area?: SortOrder
    currentLoad?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    zone?: SortOrder
    maxWeight?: SortOrder
    maxDimension?: SortOrder
    area?: SortOrder
    isActive?: SortOrder
    currentLoad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    type?: SortOrder
    zone?: SortOrder
    maxWeight?: SortOrder
    maxDimension?: SortOrder
    area?: SortOrder
    isActive?: SortOrder
    currentLoad?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    maxWeight?: SortOrder
    area?: SortOrder
    currentLoad?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    projectCode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clientName?: SortOrder
    clientContact?: SortOrder
    destination?: SortOrder
    shippingLine?: SortOrder
    vesselName?: SortOrder
    etd?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
    sapProjectId?: SortOrder
    sapContract?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    projectCode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clientName?: SortOrder
    clientContact?: SortOrder
    destination?: SortOrder
    shippingLine?: SortOrder
    vesselName?: SortOrder
    etd?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
    sapProjectId?: SortOrder
    sapContract?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    projectCode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clientName?: SortOrder
    clientContact?: SortOrder
    destination?: SortOrder
    shippingLine?: SortOrder
    vesselName?: SortOrder
    etd?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
    sapProjectId?: SortOrder
    sapContract?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    totalItems?: SortOrder
    totalWeight?: SortOrder
    totalVolume?: SortOrder
  }

  export type EquipmentCountOrderByAggregateInput = {
    id?: SortOrder
    equipmentCode?: SortOrder
    name?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastInspection?: SortOrder
    nextInspection?: SortOrder
    certificationId?: SortOrder
    certExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type EquipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    equipmentCode?: SortOrder
    name?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastInspection?: SortOrder
    nextInspection?: SortOrder
    certificationId?: SortOrder
    certExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentMinOrderByAggregateInput = {
    id?: SortOrder
    equipmentCode?: SortOrder
    name?: SortOrder
    type?: SortOrder
    capacity?: SortOrder
    manufacturer?: SortOrder
    model?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    lastInspection?: SortOrder
    nextInspection?: SortOrder
    certificationId?: SortOrder
    certExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipmentSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type CargoItemScalarRelationFilter = {
    is?: CargoItemWhereInput
    isNot?: CargoItemWhereInput
  }

  export type MovementCountOrderByAggregateInput = {
    id?: SortOrder
    movementRef?: SortOrder
    cargoItemId?: SortOrder
    cargoCode?: SortOrder
    type?: SortOrder
    fromLocationId?: SortOrder
    toLocationId?: SortOrder
    equipmentUsed?: SortOrder
    liftMethod?: SortOrder
    operatorName?: SortOrder
    actualWeight?: SortOrder
    remarks?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementAvgOrderByAggregateInput = {
    actualWeight?: SortOrder
  }

  export type MovementMaxOrderByAggregateInput = {
    id?: SortOrder
    movementRef?: SortOrder
    cargoItemId?: SortOrder
    cargoCode?: SortOrder
    type?: SortOrder
    fromLocationId?: SortOrder
    toLocationId?: SortOrder
    equipmentUsed?: SortOrder
    liftMethod?: SortOrder
    operatorName?: SortOrder
    actualWeight?: SortOrder
    remarks?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementMinOrderByAggregateInput = {
    id?: SortOrder
    movementRef?: SortOrder
    cargoItemId?: SortOrder
    cargoCode?: SortOrder
    type?: SortOrder
    fromLocationId?: SortOrder
    toLocationId?: SortOrder
    equipmentUsed?: SortOrder
    liftMethod?: SortOrder
    operatorName?: SortOrder
    actualWeight?: SortOrder
    remarks?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementSumOrderByAggregateInput = {
    actualWeight?: SortOrder
  }

  export type SAPIntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    endpoint?: SortOrder
    authMethod?: SortOrder
    apiKey?: SortOrder
    username?: SortOrder
    sapSystemId?: SortOrder
    sapClient?: SortOrder
    protocol?: SortOrder
    isActive?: SortOrder
    lastSync?: SortOrder
    eventMappings?: SortOrder
    fieldMappings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SAPIntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    endpoint?: SortOrder
    authMethod?: SortOrder
    apiKey?: SortOrder
    username?: SortOrder
    sapSystemId?: SortOrder
    sapClient?: SortOrder
    protocol?: SortOrder
    isActive?: SortOrder
    lastSync?: SortOrder
    eventMappings?: SortOrder
    fieldMappings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SAPIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    endpoint?: SortOrder
    authMethod?: SortOrder
    apiKey?: SortOrder
    username?: SortOrder
    sapSystemId?: SortOrder
    sapClient?: SortOrder
    protocol?: SortOrder
    isActive?: SortOrder
    lastSync?: SortOrder
    eventMappings?: SortOrder
    fieldMappings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    integrationId?: SortOrder
    eventType?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    responseBody?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    responseCode?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    integrationId?: SortOrder
    eventType?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    responseBody?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    integrationId?: SortOrder
    eventType?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    responseBody?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    responseCode?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type LocationCreateNestedOneWithoutCargoItemsInput = {
    create?: XOR<LocationCreateWithoutCargoItemsInput, LocationUncheckedCreateWithoutCargoItemsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutCargoItemsInput
    connect?: LocationWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutCargoItemsInput = {
    create?: XOR<ProjectCreateWithoutCargoItemsInput, ProjectUncheckedCreateWithoutCargoItemsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCargoItemsInput
    connect?: ProjectWhereUniqueInput
  }

  export type MovementCreateNestedManyWithoutCargoItemInput = {
    create?: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput> | MovementCreateWithoutCargoItemInput[] | MovementUncheckedCreateWithoutCargoItemInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCargoItemInput | MovementCreateOrConnectWithoutCargoItemInput[]
    createMany?: MovementCreateManyCargoItemInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutCargoItemInput = {
    create?: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput> | MovementCreateWithoutCargoItemInput[] | MovementUncheckedCreateWithoutCargoItemInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCargoItemInput | MovementCreateOrConnectWithoutCargoItemInput[]
    createMany?: MovementCreateManyCargoItemInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LocationUpdateOneWithoutCargoItemsNestedInput = {
    create?: XOR<LocationCreateWithoutCargoItemsInput, LocationUncheckedCreateWithoutCargoItemsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutCargoItemsInput
    upsert?: LocationUpsertWithoutCargoItemsInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutCargoItemsInput, LocationUpdateWithoutCargoItemsInput>, LocationUncheckedUpdateWithoutCargoItemsInput>
  }

  export type ProjectUpdateOneWithoutCargoItemsNestedInput = {
    create?: XOR<ProjectCreateWithoutCargoItemsInput, ProjectUncheckedCreateWithoutCargoItemsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCargoItemsInput
    upsert?: ProjectUpsertWithoutCargoItemsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutCargoItemsInput, ProjectUpdateWithoutCargoItemsInput>, ProjectUncheckedUpdateWithoutCargoItemsInput>
  }

  export type MovementUpdateManyWithoutCargoItemNestedInput = {
    create?: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput> | MovementCreateWithoutCargoItemInput[] | MovementUncheckedCreateWithoutCargoItemInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCargoItemInput | MovementCreateOrConnectWithoutCargoItemInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutCargoItemInput | MovementUpsertWithWhereUniqueWithoutCargoItemInput[]
    createMany?: MovementCreateManyCargoItemInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutCargoItemInput | MovementUpdateWithWhereUniqueWithoutCargoItemInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutCargoItemInput | MovementUpdateManyWithWhereWithoutCargoItemInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutCargoItemNestedInput = {
    create?: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput> | MovementCreateWithoutCargoItemInput[] | MovementUncheckedCreateWithoutCargoItemInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCargoItemInput | MovementCreateOrConnectWithoutCargoItemInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutCargoItemInput | MovementUpsertWithWhereUniqueWithoutCargoItemInput[]
    createMany?: MovementCreateManyCargoItemInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutCargoItemInput | MovementUpdateWithWhereUniqueWithoutCargoItemInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutCargoItemInput | MovementUpdateManyWithWhereWithoutCargoItemInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type CargoItemCreateNestedManyWithoutLocationInput = {
    create?: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput> | CargoItemCreateWithoutLocationInput[] | CargoItemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutLocationInput | CargoItemCreateOrConnectWithoutLocationInput[]
    createMany?: CargoItemCreateManyLocationInputEnvelope
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
  }

  export type MovementCreateNestedManyWithoutFromLocationInput = {
    create?: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput> | MovementCreateWithoutFromLocationInput[] | MovementUncheckedCreateWithoutFromLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutFromLocationInput | MovementCreateOrConnectWithoutFromLocationInput[]
    createMany?: MovementCreateManyFromLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type MovementCreateNestedManyWithoutToLocationInput = {
    create?: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput> | MovementCreateWithoutToLocationInput[] | MovementUncheckedCreateWithoutToLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutToLocationInput | MovementCreateOrConnectWithoutToLocationInput[]
    createMany?: MovementCreateManyToLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type CargoItemUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput> | CargoItemCreateWithoutLocationInput[] | CargoItemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutLocationInput | CargoItemCreateOrConnectWithoutLocationInput[]
    createMany?: CargoItemCreateManyLocationInputEnvelope
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutFromLocationInput = {
    create?: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput> | MovementCreateWithoutFromLocationInput[] | MovementUncheckedCreateWithoutFromLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutFromLocationInput | MovementCreateOrConnectWithoutFromLocationInput[]
    createMany?: MovementCreateManyFromLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutToLocationInput = {
    create?: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput> | MovementCreateWithoutToLocationInput[] | MovementUncheckedCreateWithoutToLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutToLocationInput | MovementCreateOrConnectWithoutToLocationInput[]
    createMany?: MovementCreateManyToLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CargoItemUpdateManyWithoutLocationNestedInput = {
    create?: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput> | CargoItemCreateWithoutLocationInput[] | CargoItemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutLocationInput | CargoItemCreateOrConnectWithoutLocationInput[]
    upsert?: CargoItemUpsertWithWhereUniqueWithoutLocationInput | CargoItemUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: CargoItemCreateManyLocationInputEnvelope
    set?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    disconnect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    delete?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    update?: CargoItemUpdateWithWhereUniqueWithoutLocationInput | CargoItemUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: CargoItemUpdateManyWithWhereWithoutLocationInput | CargoItemUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
  }

  export type MovementUpdateManyWithoutFromLocationNestedInput = {
    create?: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput> | MovementCreateWithoutFromLocationInput[] | MovementUncheckedCreateWithoutFromLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutFromLocationInput | MovementCreateOrConnectWithoutFromLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutFromLocationInput | MovementUpsertWithWhereUniqueWithoutFromLocationInput[]
    createMany?: MovementCreateManyFromLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutFromLocationInput | MovementUpdateWithWhereUniqueWithoutFromLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutFromLocationInput | MovementUpdateManyWithWhereWithoutFromLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type MovementUpdateManyWithoutToLocationNestedInput = {
    create?: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput> | MovementCreateWithoutToLocationInput[] | MovementUncheckedCreateWithoutToLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutToLocationInput | MovementCreateOrConnectWithoutToLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutToLocationInput | MovementUpsertWithWhereUniqueWithoutToLocationInput[]
    createMany?: MovementCreateManyToLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutToLocationInput | MovementUpdateWithWhereUniqueWithoutToLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutToLocationInput | MovementUpdateManyWithWhereWithoutToLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type CargoItemUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput> | CargoItemCreateWithoutLocationInput[] | CargoItemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutLocationInput | CargoItemCreateOrConnectWithoutLocationInput[]
    upsert?: CargoItemUpsertWithWhereUniqueWithoutLocationInput | CargoItemUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: CargoItemCreateManyLocationInputEnvelope
    set?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    disconnect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    delete?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    update?: CargoItemUpdateWithWhereUniqueWithoutLocationInput | CargoItemUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: CargoItemUpdateManyWithWhereWithoutLocationInput | CargoItemUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutFromLocationNestedInput = {
    create?: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput> | MovementCreateWithoutFromLocationInput[] | MovementUncheckedCreateWithoutFromLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutFromLocationInput | MovementCreateOrConnectWithoutFromLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutFromLocationInput | MovementUpsertWithWhereUniqueWithoutFromLocationInput[]
    createMany?: MovementCreateManyFromLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutFromLocationInput | MovementUpdateWithWhereUniqueWithoutFromLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutFromLocationInput | MovementUpdateManyWithWhereWithoutFromLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutToLocationNestedInput = {
    create?: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput> | MovementCreateWithoutToLocationInput[] | MovementUncheckedCreateWithoutToLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutToLocationInput | MovementCreateOrConnectWithoutToLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutToLocationInput | MovementUpsertWithWhereUniqueWithoutToLocationInput[]
    createMany?: MovementCreateManyToLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutToLocationInput | MovementUpdateWithWhereUniqueWithoutToLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutToLocationInput | MovementUpdateManyWithWhereWithoutToLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type CargoItemCreateNestedManyWithoutProjectInput = {
    create?: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput> | CargoItemCreateWithoutProjectInput[] | CargoItemUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutProjectInput | CargoItemCreateOrConnectWithoutProjectInput[]
    createMany?: CargoItemCreateManyProjectInputEnvelope
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
  }

  export type CargoItemUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput> | CargoItemCreateWithoutProjectInput[] | CargoItemUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutProjectInput | CargoItemCreateOrConnectWithoutProjectInput[]
    createMany?: CargoItemCreateManyProjectInputEnvelope
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
  }

  export type CargoItemUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput> | CargoItemCreateWithoutProjectInput[] | CargoItemUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutProjectInput | CargoItemCreateOrConnectWithoutProjectInput[]
    upsert?: CargoItemUpsertWithWhereUniqueWithoutProjectInput | CargoItemUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CargoItemCreateManyProjectInputEnvelope
    set?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    disconnect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    delete?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    update?: CargoItemUpdateWithWhereUniqueWithoutProjectInput | CargoItemUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CargoItemUpdateManyWithWhereWithoutProjectInput | CargoItemUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
  }

  export type CargoItemUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput> | CargoItemCreateWithoutProjectInput[] | CargoItemUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CargoItemCreateOrConnectWithoutProjectInput | CargoItemCreateOrConnectWithoutProjectInput[]
    upsert?: CargoItemUpsertWithWhereUniqueWithoutProjectInput | CargoItemUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CargoItemCreateManyProjectInputEnvelope
    set?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    disconnect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    delete?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    connect?: CargoItemWhereUniqueInput | CargoItemWhereUniqueInput[]
    update?: CargoItemUpdateWithWhereUniqueWithoutProjectInput | CargoItemUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CargoItemUpdateManyWithWhereWithoutProjectInput | CargoItemUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
  }

  export type CargoItemCreateNestedOneWithoutMovementsInput = {
    create?: XOR<CargoItemCreateWithoutMovementsInput, CargoItemUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CargoItemCreateOrConnectWithoutMovementsInput
    connect?: CargoItemWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutMovementsFromInput = {
    create?: XOR<LocationCreateWithoutMovementsFromInput, LocationUncheckedCreateWithoutMovementsFromInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsFromInput
    connect?: LocationWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutMovementsToInput = {
    create?: XOR<LocationCreateWithoutMovementsToInput, LocationUncheckedCreateWithoutMovementsToInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsToInput
    connect?: LocationWhereUniqueInput
  }

  export type CargoItemUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<CargoItemCreateWithoutMovementsInput, CargoItemUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CargoItemCreateOrConnectWithoutMovementsInput
    upsert?: CargoItemUpsertWithoutMovementsInput
    connect?: CargoItemWhereUniqueInput
    update?: XOR<XOR<CargoItemUpdateToOneWithWhereWithoutMovementsInput, CargoItemUpdateWithoutMovementsInput>, CargoItemUncheckedUpdateWithoutMovementsInput>
  }

  export type LocationUpdateOneWithoutMovementsFromNestedInput = {
    create?: XOR<LocationCreateWithoutMovementsFromInput, LocationUncheckedCreateWithoutMovementsFromInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsFromInput
    upsert?: LocationUpsertWithoutMovementsFromInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutMovementsFromInput, LocationUpdateWithoutMovementsFromInput>, LocationUncheckedUpdateWithoutMovementsFromInput>
  }

  export type LocationUpdateOneWithoutMovementsToNestedInput = {
    create?: XOR<LocationCreateWithoutMovementsToInput, LocationUncheckedCreateWithoutMovementsToInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsToInput
    upsert?: LocationUpsertWithoutMovementsToInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutMovementsToInput, LocationUpdateWithoutMovementsToInput>, LocationUncheckedUpdateWithoutMovementsToInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type LocationCreateWithoutCargoItemsInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    movementsFrom?: MovementCreateNestedManyWithoutFromLocationInput
    movementsTo?: MovementCreateNestedManyWithoutToLocationInput
  }

  export type LocationUncheckedCreateWithoutCargoItemsInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    movementsFrom?: MovementUncheckedCreateNestedManyWithoutFromLocationInput
    movementsTo?: MovementUncheckedCreateNestedManyWithoutToLocationInput
  }

  export type LocationCreateOrConnectWithoutCargoItemsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutCargoItemsInput, LocationUncheckedCreateWithoutCargoItemsInput>
  }

  export type ProjectCreateWithoutCargoItemsInput = {
    id?: string
    projectCode: string
    name: string
    description?: string | null
    clientName: string
    clientContact?: string | null
    destination?: string | null
    shippingLine?: string | null
    vesselName?: string | null
    etd?: Date | string | null
    eta?: Date | string | null
    status?: string
    totalItems?: number
    totalWeight?: number
    totalVolume?: number
    sapProjectId?: string | null
    sapContract?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateWithoutCargoItemsInput = {
    id?: string
    projectCode: string
    name: string
    description?: string | null
    clientName: string
    clientContact?: string | null
    destination?: string | null
    shippingLine?: string | null
    vesselName?: string | null
    etd?: Date | string | null
    eta?: Date | string | null
    status?: string
    totalItems?: number
    totalWeight?: number
    totalVolume?: number
    sapProjectId?: string | null
    sapContract?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutCargoItemsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCargoItemsInput, ProjectUncheckedCreateWithoutCargoItemsInput>
  }

  export type MovementCreateWithoutCargoItemInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
    fromLocation?: LocationCreateNestedOneWithoutMovementsFromInput
    toLocation?: LocationCreateNestedOneWithoutMovementsToInput
  }

  export type MovementUncheckedCreateWithoutCargoItemInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutCargoItemInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput>
  }

  export type MovementCreateManyCargoItemInputEnvelope = {
    data: MovementCreateManyCargoItemInput | MovementCreateManyCargoItemInput[]
  }

  export type LocationUpsertWithoutCargoItemsInput = {
    update: XOR<LocationUpdateWithoutCargoItemsInput, LocationUncheckedUpdateWithoutCargoItemsInput>
    create: XOR<LocationCreateWithoutCargoItemsInput, LocationUncheckedCreateWithoutCargoItemsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutCargoItemsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutCargoItemsInput, LocationUncheckedUpdateWithoutCargoItemsInput>
  }

  export type LocationUpdateWithoutCargoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movementsFrom?: MovementUpdateManyWithoutFromLocationNestedInput
    movementsTo?: MovementUpdateManyWithoutToLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutCargoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movementsFrom?: MovementUncheckedUpdateManyWithoutFromLocationNestedInput
    movementsTo?: MovementUncheckedUpdateManyWithoutToLocationNestedInput
  }

  export type ProjectUpsertWithoutCargoItemsInput = {
    update: XOR<ProjectUpdateWithoutCargoItemsInput, ProjectUncheckedUpdateWithoutCargoItemsInput>
    create: XOR<ProjectCreateWithoutCargoItemsInput, ProjectUncheckedCreateWithoutCargoItemsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutCargoItemsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutCargoItemsInput, ProjectUncheckedUpdateWithoutCargoItemsInput>
  }

  export type ProjectUpdateWithoutCargoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutCargoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: StringFieldUpdateOperationsInput | string
    clientContact?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    etd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    totalWeight?: FloatFieldUpdateOperationsInput | number
    totalVolume?: FloatFieldUpdateOperationsInput | number
    sapProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    sapContract?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpsertWithWhereUniqueWithoutCargoItemInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutCargoItemInput, MovementUncheckedUpdateWithoutCargoItemInput>
    create: XOR<MovementCreateWithoutCargoItemInput, MovementUncheckedCreateWithoutCargoItemInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutCargoItemInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutCargoItemInput, MovementUncheckedUpdateWithoutCargoItemInput>
  }

  export type MovementUpdateManyWithWhereWithoutCargoItemInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutCargoItemInput>
  }

  export type MovementScalarWhereInput = {
    AND?: MovementScalarWhereInput | MovementScalarWhereInput[]
    OR?: MovementScalarWhereInput[]
    NOT?: MovementScalarWhereInput | MovementScalarWhereInput[]
    id?: StringFilter<"Movement"> | string
    movementRef?: StringFilter<"Movement"> | string
    cargoItemId?: StringFilter<"Movement"> | string
    cargoCode?: StringFilter<"Movement"> | string
    type?: StringFilter<"Movement"> | string
    fromLocationId?: StringNullableFilter<"Movement"> | string | null
    toLocationId?: StringNullableFilter<"Movement"> | string | null
    equipmentUsed?: StringNullableFilter<"Movement"> | string | null
    liftMethod?: StringNullableFilter<"Movement"> | string | null
    operatorName?: StringNullableFilter<"Movement"> | string | null
    actualWeight?: FloatNullableFilter<"Movement"> | number | null
    remarks?: StringNullableFilter<"Movement"> | string | null
    performedBy?: StringFilter<"Movement"> | string
    createdAt?: DateTimeFilter<"Movement"> | Date | string
  }

  export type CargoItemCreateWithoutLocationInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutCargoItemsInput
    movements?: MovementCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemUncheckedCreateWithoutLocationInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    projectId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    movements?: MovementUncheckedCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemCreateOrConnectWithoutLocationInput = {
    where: CargoItemWhereUniqueInput
    create: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput>
  }

  export type CargoItemCreateManyLocationInputEnvelope = {
    data: CargoItemCreateManyLocationInput | CargoItemCreateManyLocationInput[]
  }

  export type MovementCreateWithoutFromLocationInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
    cargoItem: CargoItemCreateNestedOneWithoutMovementsInput
    toLocation?: LocationCreateNestedOneWithoutMovementsToInput
  }

  export type MovementUncheckedCreateWithoutFromLocationInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutFromLocationInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput>
  }

  export type MovementCreateManyFromLocationInputEnvelope = {
    data: MovementCreateManyFromLocationInput | MovementCreateManyFromLocationInput[]
  }

  export type MovementCreateWithoutToLocationInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
    cargoItem: CargoItemCreateNestedOneWithoutMovementsInput
    fromLocation?: LocationCreateNestedOneWithoutMovementsFromInput
  }

  export type MovementUncheckedCreateWithoutToLocationInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutToLocationInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput>
  }

  export type MovementCreateManyToLocationInputEnvelope = {
    data: MovementCreateManyToLocationInput | MovementCreateManyToLocationInput[]
  }

  export type CargoItemUpsertWithWhereUniqueWithoutLocationInput = {
    where: CargoItemWhereUniqueInput
    update: XOR<CargoItemUpdateWithoutLocationInput, CargoItemUncheckedUpdateWithoutLocationInput>
    create: XOR<CargoItemCreateWithoutLocationInput, CargoItemUncheckedCreateWithoutLocationInput>
  }

  export type CargoItemUpdateWithWhereUniqueWithoutLocationInput = {
    where: CargoItemWhereUniqueInput
    data: XOR<CargoItemUpdateWithoutLocationInput, CargoItemUncheckedUpdateWithoutLocationInput>
  }

  export type CargoItemUpdateManyWithWhereWithoutLocationInput = {
    where: CargoItemScalarWhereInput
    data: XOR<CargoItemUpdateManyMutationInput, CargoItemUncheckedUpdateManyWithoutLocationInput>
  }

  export type CargoItemScalarWhereInput = {
    AND?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
    OR?: CargoItemScalarWhereInput[]
    NOT?: CargoItemScalarWhereInput | CargoItemScalarWhereInput[]
    id?: StringFilter<"CargoItem"> | string
    cargoCode?: StringFilter<"CargoItem"> | string
    description?: StringFilter<"CargoItem"> | string
    weight?: FloatFilter<"CargoItem"> | number
    length?: FloatFilter<"CargoItem"> | number
    width?: FloatFilter<"CargoItem"> | number
    height?: FloatFilter<"CargoItem"> | number
    volume?: FloatNullableFilter<"CargoItem"> | number | null
    liftCategory?: StringFilter<"CargoItem"> | string
    centerOfGravity?: StringNullableFilter<"CargoItem"> | string | null
    liftingPoints?: IntNullableFilter<"CargoItem"> | number | null
    specialHandling?: StringNullableFilter<"CargoItem"> | string | null
    hazardClass?: StringNullableFilter<"CargoItem"> | string | null
    commodityType?: StringFilter<"CargoItem"> | string
    status?: StringFilter<"CargoItem"> | string
    locationId?: StringNullableFilter<"CargoItem"> | string | null
    projectId?: StringNullableFilter<"CargoItem"> | string | null
    clientName?: StringNullableFilter<"CargoItem"> | string | null
    poReference?: StringNullableFilter<"CargoItem"> | string | null
    blReference?: StringNullableFilter<"CargoItem"> | string | null
    transportWeight?: FloatNullableFilter<"CargoItem"> | number | null
    transportLength?: FloatNullableFilter<"CargoItem"> | number | null
    transportWidth?: FloatNullableFilter<"CargoItem"> | number | null
    transportHeight?: FloatNullableFilter<"CargoItem"> | number | null
    receivedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    dispatchedAt?: DateTimeNullableFilter<"CargoItem"> | Date | string | null
    createdAt?: DateTimeFilter<"CargoItem"> | Date | string
    updatedAt?: DateTimeFilter<"CargoItem"> | Date | string
  }

  export type MovementUpsertWithWhereUniqueWithoutFromLocationInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutFromLocationInput, MovementUncheckedUpdateWithoutFromLocationInput>
    create: XOR<MovementCreateWithoutFromLocationInput, MovementUncheckedCreateWithoutFromLocationInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutFromLocationInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutFromLocationInput, MovementUncheckedUpdateWithoutFromLocationInput>
  }

  export type MovementUpdateManyWithWhereWithoutFromLocationInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutFromLocationInput>
  }

  export type MovementUpsertWithWhereUniqueWithoutToLocationInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutToLocationInput, MovementUncheckedUpdateWithoutToLocationInput>
    create: XOR<MovementCreateWithoutToLocationInput, MovementUncheckedCreateWithoutToLocationInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutToLocationInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutToLocationInput, MovementUncheckedUpdateWithoutToLocationInput>
  }

  export type MovementUpdateManyWithWhereWithoutToLocationInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutToLocationInput>
  }

  export type CargoItemCreateWithoutProjectInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutCargoItemsInput
    movements?: MovementCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemUncheckedCreateWithoutProjectInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    locationId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    movements?: MovementUncheckedCreateNestedManyWithoutCargoItemInput
  }

  export type CargoItemCreateOrConnectWithoutProjectInput = {
    where: CargoItemWhereUniqueInput
    create: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput>
  }

  export type CargoItemCreateManyProjectInputEnvelope = {
    data: CargoItemCreateManyProjectInput | CargoItemCreateManyProjectInput[]
  }

  export type CargoItemUpsertWithWhereUniqueWithoutProjectInput = {
    where: CargoItemWhereUniqueInput
    update: XOR<CargoItemUpdateWithoutProjectInput, CargoItemUncheckedUpdateWithoutProjectInput>
    create: XOR<CargoItemCreateWithoutProjectInput, CargoItemUncheckedCreateWithoutProjectInput>
  }

  export type CargoItemUpdateWithWhereUniqueWithoutProjectInput = {
    where: CargoItemWhereUniqueInput
    data: XOR<CargoItemUpdateWithoutProjectInput, CargoItemUncheckedUpdateWithoutProjectInput>
  }

  export type CargoItemUpdateManyWithWhereWithoutProjectInput = {
    where: CargoItemScalarWhereInput
    data: XOR<CargoItemUpdateManyMutationInput, CargoItemUncheckedUpdateManyWithoutProjectInput>
  }

  export type CargoItemCreateWithoutMovementsInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutCargoItemsInput
    project?: ProjectCreateNestedOneWithoutCargoItemsInput
  }

  export type CargoItemUncheckedCreateWithoutMovementsInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    locationId?: string | null
    projectId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoItemCreateOrConnectWithoutMovementsInput = {
    where: CargoItemWhereUniqueInput
    create: XOR<CargoItemCreateWithoutMovementsInput, CargoItemUncheckedCreateWithoutMovementsInput>
  }

  export type LocationCreateWithoutMovementsFromInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemCreateNestedManyWithoutLocationInput
    movementsTo?: MovementCreateNestedManyWithoutToLocationInput
  }

  export type LocationUncheckedCreateWithoutMovementsFromInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemUncheckedCreateNestedManyWithoutLocationInput
    movementsTo?: MovementUncheckedCreateNestedManyWithoutToLocationInput
  }

  export type LocationCreateOrConnectWithoutMovementsFromInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutMovementsFromInput, LocationUncheckedCreateWithoutMovementsFromInput>
  }

  export type LocationCreateWithoutMovementsToInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemCreateNestedManyWithoutLocationInput
    movementsFrom?: MovementCreateNestedManyWithoutFromLocationInput
  }

  export type LocationUncheckedCreateWithoutMovementsToInput = {
    id?: string
    code: string
    name: string
    type?: string
    zone?: string | null
    maxWeight?: number | null
    maxDimension?: string | null
    area?: number | null
    isActive?: boolean
    currentLoad?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cargoItems?: CargoItemUncheckedCreateNestedManyWithoutLocationInput
    movementsFrom?: MovementUncheckedCreateNestedManyWithoutFromLocationInput
  }

  export type LocationCreateOrConnectWithoutMovementsToInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutMovementsToInput, LocationUncheckedCreateWithoutMovementsToInput>
  }

  export type CargoItemUpsertWithoutMovementsInput = {
    update: XOR<CargoItemUpdateWithoutMovementsInput, CargoItemUncheckedUpdateWithoutMovementsInput>
    create: XOR<CargoItemCreateWithoutMovementsInput, CargoItemUncheckedCreateWithoutMovementsInput>
    where?: CargoItemWhereInput
  }

  export type CargoItemUpdateToOneWithWhereWithoutMovementsInput = {
    where?: CargoItemWhereInput
    data: XOR<CargoItemUpdateWithoutMovementsInput, CargoItemUncheckedUpdateWithoutMovementsInput>
  }

  export type CargoItemUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutCargoItemsNestedInput
    project?: ProjectUpdateOneWithoutCargoItemsNestedInput
  }

  export type CargoItemUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUpsertWithoutMovementsFromInput = {
    update: XOR<LocationUpdateWithoutMovementsFromInput, LocationUncheckedUpdateWithoutMovementsFromInput>
    create: XOR<LocationCreateWithoutMovementsFromInput, LocationUncheckedCreateWithoutMovementsFromInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutMovementsFromInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutMovementsFromInput, LocationUncheckedUpdateWithoutMovementsFromInput>
  }

  export type LocationUpdateWithoutMovementsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUpdateManyWithoutLocationNestedInput
    movementsTo?: MovementUpdateManyWithoutToLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutMovementsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUncheckedUpdateManyWithoutLocationNestedInput
    movementsTo?: MovementUncheckedUpdateManyWithoutToLocationNestedInput
  }

  export type LocationUpsertWithoutMovementsToInput = {
    update: XOR<LocationUpdateWithoutMovementsToInput, LocationUncheckedUpdateWithoutMovementsToInput>
    create: XOR<LocationCreateWithoutMovementsToInput, LocationUncheckedCreateWithoutMovementsToInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutMovementsToInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutMovementsToInput, LocationUncheckedUpdateWithoutMovementsToInput>
  }

  export type LocationUpdateWithoutMovementsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUpdateManyWithoutLocationNestedInput
    movementsFrom?: MovementUpdateManyWithoutFromLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutMovementsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    zone?: NullableStringFieldUpdateOperationsInput | string | null
    maxWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDimension?: NullableStringFieldUpdateOperationsInput | string | null
    area?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentLoad?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItems?: CargoItemUncheckedUpdateManyWithoutLocationNestedInput
    movementsFrom?: MovementUncheckedUpdateManyWithoutFromLocationNestedInput
  }

  export type MovementCreateManyCargoItemInput = {
    id?: string
    movementRef: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementUpdateWithoutCargoItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromLocation?: LocationUpdateOneWithoutMovementsFromNestedInput
    toLocation?: LocationUpdateOneWithoutMovementsToNestedInput
  }

  export type MovementUncheckedUpdateWithoutCargoItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutCargoItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoItemCreateManyLocationInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    projectId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovementCreateManyFromLocationInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    toLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type MovementCreateManyToLocationInput = {
    id?: string
    movementRef: string
    cargoItemId: string
    cargoCode: string
    type: string
    fromLocationId?: string | null
    equipmentUsed?: string | null
    liftMethod?: string | null
    operatorName?: string | null
    actualWeight?: number | null
    remarks?: string | null
    performedBy?: string
    createdAt?: Date | string
  }

  export type CargoItemUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutCargoItemsNestedInput
    movements?: MovementUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: MovementUncheckedUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpdateWithoutFromLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItem?: CargoItemUpdateOneRequiredWithoutMovementsNestedInput
    toLocation?: LocationUpdateOneWithoutMovementsToNestedInput
  }

  export type MovementUncheckedUpdateWithoutFromLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutFromLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    toLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpdateWithoutToLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cargoItem?: CargoItemUpdateOneRequiredWithoutMovementsNestedInput
    fromLocation?: LocationUpdateOneWithoutMovementsFromNestedInput
  }

  export type MovementUncheckedUpdateWithoutToLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutToLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movementRef?: StringFieldUpdateOperationsInput | string
    cargoItemId?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    fromLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    equipmentUsed?: NullableStringFieldUpdateOperationsInput | string | null
    liftMethod?: NullableStringFieldUpdateOperationsInput | string | null
    operatorName?: NullableStringFieldUpdateOperationsInput | string | null
    actualWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CargoItemCreateManyProjectInput = {
    id?: string
    cargoCode: string
    description: string
    weight: number
    length: number
    width: number
    height: number
    volume?: number | null
    liftCategory?: string
    centerOfGravity?: string | null
    liftingPoints?: number | null
    specialHandling?: string | null
    hazardClass?: string | null
    commodityType?: string
    status?: string
    locationId?: string | null
    clientName?: string | null
    poReference?: string | null
    blReference?: string | null
    transportWeight?: number | null
    transportLength?: number | null
    transportWidth?: number | null
    transportHeight?: number | null
    receivedAt?: Date | string | null
    dispatchedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CargoItemUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutCargoItemsNestedInput
    movements?: MovementUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: MovementUncheckedUpdateManyWithoutCargoItemNestedInput
  }

  export type CargoItemUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    cargoCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    length?: FloatFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    volume?: NullableFloatFieldUpdateOperationsInput | number | null
    liftCategory?: StringFieldUpdateOperationsInput | string
    centerOfGravity?: NullableStringFieldUpdateOperationsInput | string | null
    liftingPoints?: NullableIntFieldUpdateOperationsInput | number | null
    specialHandling?: NullableStringFieldUpdateOperationsInput | string | null
    hazardClass?: NullableStringFieldUpdateOperationsInput | string | null
    commodityType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    clientName?: NullableStringFieldUpdateOperationsInput | string | null
    poReference?: NullableStringFieldUpdateOperationsInput | string | null
    blReference?: NullableStringFieldUpdateOperationsInput | string | null
    transportWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    transportLength?: NullableFloatFieldUpdateOperationsInput | number | null
    transportWidth?: NullableFloatFieldUpdateOperationsInput | number | null
    transportHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    receivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dispatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}