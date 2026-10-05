
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
 * Model Shipment
 * 
 */
export type Shipment = $Result.DefaultSelection<Prisma.$ShipmentPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>
/**
 * Model BatchImportJob
 * 
 */
export type BatchImportJob = $Result.DefaultSelection<Prisma.$BatchImportJobPayload>
/**
 * Model BatchImportRowResult
 * 
 */
export type BatchImportRowResult = $Result.DefaultSelection<Prisma.$BatchImportRowResultPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShipmentStatus: {
  PENDING: 'PENDING',
  DISPATCHING: 'DISPATCHING',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED'
};

export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus]


export const PriorityTier: {
  STANDARD: 'STANDARD',
  EXPRESS: 'EXPRESS',
  URGENT: 'URGENT'
};

export type PriorityTier = (typeof PriorityTier)[keyof typeof PriorityTier]


export const BatchImportStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type BatchImportStatus = (typeof BatchImportStatus)[keyof typeof BatchImportStatus]

}

export type ShipmentStatus = $Enums.ShipmentStatus

export const ShipmentStatus: typeof $Enums.ShipmentStatus

export type PriorityTier = $Enums.PriorityTier

export const PriorityTier: typeof $Enums.PriorityTier

export type BatchImportStatus = $Enums.BatchImportStatus

export const BatchImportStatus: typeof $Enums.BatchImportStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Shipments
 * const shipments = await prisma.shipment.findMany()
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
   * // Fetch zero or more Shipments
   * const shipments = await prisma.shipment.findMany()
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
   * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shipments
    * const shipments = await prisma.shipment.findMany()
    * ```
    */
  get shipment(): Prisma.ShipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.batchImportJob`: Exposes CRUD operations for the **BatchImportJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BatchImportJobs
    * const batchImportJobs = await prisma.batchImportJob.findMany()
    * ```
    */
  get batchImportJob(): Prisma.BatchImportJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.batchImportRowResult`: Exposes CRUD operations for the **BatchImportRowResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BatchImportRowResults
    * const batchImportRowResults = await prisma.batchImportRowResult.findMany()
    * ```
    */
  get batchImportRowResult(): Prisma.BatchImportRowResultDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
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
    Shipment: 'Shipment',
    OutboxEvent: 'OutboxEvent',
    BatchImportJob: 'BatchImportJob',
    BatchImportRowResult: 'BatchImportRowResult'
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
      modelProps: "shipment" | "outboxEvent" | "batchImportJob" | "batchImportRowResult"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Shipment: {
        payload: Prisma.$ShipmentPayload<ExtArgs>
        fields: Prisma.ShipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findFirst: {
            args: Prisma.ShipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findMany: {
            args: Prisma.ShipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          create: {
            args: Prisma.ShipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          createMany: {
            args: Prisma.ShipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          delete: {
            args: Prisma.ShipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          update: {
            args: Prisma.ShipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          deleteMany: {
            args: Prisma.ShipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          upsert: {
            args: Prisma.ShipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          aggregate: {
            args: Prisma.ShipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipment>
          }
          groupBy: {
            args: Prisma.ShipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShipmentCountArgs<ExtArgs>
            result: $Utils.Optional<ShipmentCountAggregateOutputType> | number
          }
        }
      }
      OutboxEvent: {
        payload: Prisma.$OutboxEventPayload<ExtArgs>
        fields: Prisma.OutboxEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findFirst: {
            args: Prisma.OutboxEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findMany: {
            args: Prisma.OutboxEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          create: {
            args: Prisma.OutboxEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          createMany: {
            args: Prisma.OutboxEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          delete: {
            args: Prisma.OutboxEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          update: {
            args: Prisma.OutboxEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          deleteMany: {
            args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutboxEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          upsert: {
            args: Prisma.OutboxEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          aggregate: {
            args: Prisma.OutboxEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboxEvent>
          }
          groupBy: {
            args: Prisma.OutboxEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxEventCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventCountAggregateOutputType> | number
          }
        }
      }
      BatchImportJob: {
        payload: Prisma.$BatchImportJobPayload<ExtArgs>
        fields: Prisma.BatchImportJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchImportJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchImportJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          findFirst: {
            args: Prisma.BatchImportJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchImportJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          findMany: {
            args: Prisma.BatchImportJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>[]
          }
          create: {
            args: Prisma.BatchImportJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          createMany: {
            args: Prisma.BatchImportJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchImportJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>[]
          }
          delete: {
            args: Prisma.BatchImportJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          update: {
            args: Prisma.BatchImportJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          deleteMany: {
            args: Prisma.BatchImportJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchImportJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchImportJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>[]
          }
          upsert: {
            args: Prisma.BatchImportJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportJobPayload>
          }
          aggregate: {
            args: Prisma.BatchImportJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatchImportJob>
          }
          groupBy: {
            args: Prisma.BatchImportJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchImportJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchImportJobCountArgs<ExtArgs>
            result: $Utils.Optional<BatchImportJobCountAggregateOutputType> | number
          }
        }
      }
      BatchImportRowResult: {
        payload: Prisma.$BatchImportRowResultPayload<ExtArgs>
        fields: Prisma.BatchImportRowResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchImportRowResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchImportRowResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          findFirst: {
            args: Prisma.BatchImportRowResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchImportRowResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          findMany: {
            args: Prisma.BatchImportRowResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>[]
          }
          create: {
            args: Prisma.BatchImportRowResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          createMany: {
            args: Prisma.BatchImportRowResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchImportRowResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>[]
          }
          delete: {
            args: Prisma.BatchImportRowResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          update: {
            args: Prisma.BatchImportRowResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          deleteMany: {
            args: Prisma.BatchImportRowResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchImportRowResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BatchImportRowResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>[]
          }
          upsert: {
            args: Prisma.BatchImportRowResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchImportRowResultPayload>
          }
          aggregate: {
            args: Prisma.BatchImportRowResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatchImportRowResult>
          }
          groupBy: {
            args: Prisma.BatchImportRowResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchImportRowResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchImportRowResultCountArgs<ExtArgs>
            result: $Utils.Optional<BatchImportRowResultCountAggregateOutputType> | number
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
    shipment?: ShipmentOmit
    outboxEvent?: OutboxEventOmit
    batchImportJob?: BatchImportJobOmit
    batchImportRowResult?: BatchImportRowResultOmit
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
   * Models
   */

  /**
   * Model Shipment
   */

  export type AggregateShipment = {
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  export type ShipmentAvgAggregateOutputType = {
    recipientLat: number | null
    recipientLng: number | null
    weightKg: number | null
    lengthCm: number | null
    widthCm: number | null
    heightCm: number | null
  }

  export type ShipmentSumAggregateOutputType = {
    recipientLat: number | null
    recipientLng: number | null
    weightKg: number | null
    lengthCm: number | null
    widthCm: number | null
    heightCm: number | null
  }

  export type ShipmentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trackingCode: string | null
    deliveryOtp: string | null
    status: $Enums.ShipmentStatus | null
    priority: $Enums.PriorityTier | null
    recipientName: string | null
    recipientPhone: string | null
    recipientAddress: string | null
    recipientLat: number | null
    recipientLng: number | null
    weightKg: number | null
    lengthCm: number | null
    widthCm: number | null
    heightCm: number | null
    deliveryWindowStart: Date | null
    deliveryWindowEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShipmentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trackingCode: string | null
    deliveryOtp: string | null
    status: $Enums.ShipmentStatus | null
    priority: $Enums.PriorityTier | null
    recipientName: string | null
    recipientPhone: string | null
    recipientAddress: string | null
    recipientLat: number | null
    recipientLng: number | null
    weightKg: number | null
    lengthCm: number | null
    widthCm: number | null
    heightCm: number | null
    deliveryWindowStart: Date | null
    deliveryWindowEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShipmentCountAggregateOutputType = {
    id: number
    tenantId: number
    trackingCode: number
    deliveryOtp: number
    status: number
    priority: number
    recipientName: number
    recipientPhone: number
    recipientAddress: number
    recipientLat: number
    recipientLng: number
    weightKg: number
    lengthCm: number
    widthCm: number
    heightCm: number
    deliveryWindowStart: number
    deliveryWindowEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShipmentAvgAggregateInputType = {
    recipientLat?: true
    recipientLng?: true
    weightKg?: true
    lengthCm?: true
    widthCm?: true
    heightCm?: true
  }

  export type ShipmentSumAggregateInputType = {
    recipientLat?: true
    recipientLng?: true
    weightKg?: true
    lengthCm?: true
    widthCm?: true
    heightCm?: true
  }

  export type ShipmentMinAggregateInputType = {
    id?: true
    tenantId?: true
    trackingCode?: true
    deliveryOtp?: true
    status?: true
    priority?: true
    recipientName?: true
    recipientPhone?: true
    recipientAddress?: true
    recipientLat?: true
    recipientLng?: true
    weightKg?: true
    lengthCm?: true
    widthCm?: true
    heightCm?: true
    deliveryWindowStart?: true
    deliveryWindowEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShipmentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    trackingCode?: true
    deliveryOtp?: true
    status?: true
    priority?: true
    recipientName?: true
    recipientPhone?: true
    recipientAddress?: true
    recipientLat?: true
    recipientLng?: true
    weightKg?: true
    lengthCm?: true
    widthCm?: true
    heightCm?: true
    deliveryWindowStart?: true
    deliveryWindowEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShipmentCountAggregateInputType = {
    id?: true
    tenantId?: true
    trackingCode?: true
    deliveryOtp?: true
    status?: true
    priority?: true
    recipientName?: true
    recipientPhone?: true
    recipientAddress?: true
    recipientLat?: true
    recipientLng?: true
    weightKg?: true
    lengthCm?: true
    widthCm?: true
    heightCm?: true
    deliveryWindowStart?: true
    deliveryWindowEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipment to aggregate.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shipments
    **/
    _count?: true | ShipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShipmentMaxAggregateInputType
  }

  export type GetShipmentAggregateType<T extends ShipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipment[P]>
      : GetScalarType<T[P], AggregateShipment[P]>
  }




  export type ShipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShipmentWhereInput
    orderBy?: ShipmentOrderByWithAggregationInput | ShipmentOrderByWithAggregationInput[]
    by: ShipmentScalarFieldEnum[] | ShipmentScalarFieldEnum
    having?: ShipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShipmentCountAggregateInputType | true
    _avg?: ShipmentAvgAggregateInputType
    _sum?: ShipmentSumAggregateInputType
    _min?: ShipmentMinAggregateInputType
    _max?: ShipmentMaxAggregateInputType
  }

  export type ShipmentGroupByOutputType = {
    id: string
    tenantId: string
    trackingCode: string
    deliveryOtp: string
    status: $Enums.ShipmentStatus
    priority: $Enums.PriorityTier
    recipientName: string
    recipientPhone: string
    recipientAddress: string
    recipientLat: number | null
    recipientLng: number | null
    weightKg: number
    lengthCm: number
    widthCm: number
    heightCm: number
    deliveryWindowStart: Date | null
    deliveryWindowEnd: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  type GetShipmentGroupByPayload<T extends ShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
            : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
        }
      >
    >


  export type ShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trackingCode?: boolean
    deliveryOtp?: boolean
    status?: boolean
    priority?: boolean
    recipientName?: boolean
    recipientPhone?: boolean
    recipientAddress?: boolean
    recipientLat?: boolean
    recipientLng?: boolean
    weightKg?: boolean
    lengthCm?: boolean
    widthCm?: boolean
    heightCm?: boolean
    deliveryWindowStart?: boolean
    deliveryWindowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trackingCode?: boolean
    deliveryOtp?: boolean
    status?: boolean
    priority?: boolean
    recipientName?: boolean
    recipientPhone?: boolean
    recipientAddress?: boolean
    recipientLat?: boolean
    recipientLng?: boolean
    weightKg?: boolean
    lengthCm?: boolean
    widthCm?: boolean
    heightCm?: boolean
    deliveryWindowStart?: boolean
    deliveryWindowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trackingCode?: boolean
    deliveryOtp?: boolean
    status?: boolean
    priority?: boolean
    recipientName?: boolean
    recipientPhone?: boolean
    recipientAddress?: boolean
    recipientLat?: boolean
    recipientLng?: boolean
    weightKg?: boolean
    lengthCm?: boolean
    widthCm?: boolean
    heightCm?: boolean
    deliveryWindowStart?: boolean
    deliveryWindowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    trackingCode?: boolean
    deliveryOtp?: boolean
    status?: boolean
    priority?: boolean
    recipientName?: boolean
    recipientPhone?: boolean
    recipientAddress?: boolean
    recipientLat?: boolean
    recipientLng?: boolean
    weightKg?: boolean
    lengthCm?: boolean
    widthCm?: boolean
    heightCm?: boolean
    deliveryWindowStart?: boolean
    deliveryWindowEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "trackingCode" | "deliveryOtp" | "status" | "priority" | "recipientName" | "recipientPhone" | "recipientAddress" | "recipientLat" | "recipientLng" | "weightKg" | "lengthCm" | "widthCm" | "heightCm" | "deliveryWindowStart" | "deliveryWindowEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["shipment"]>

  export type $ShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      trackingCode: string
      deliveryOtp: string
      status: $Enums.ShipmentStatus
      priority: $Enums.PriorityTier
      recipientName: string
      recipientPhone: string
      recipientAddress: string
      recipientLat: number | null
      recipientLng: number | null
      weightKg: number
      lengthCm: number
      widthCm: number
      heightCm: number
      deliveryWindowStart: Date | null
      deliveryWindowEnd: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shipment"]>
    composites: {}
  }

  type ShipmentGetPayload<S extends boolean | null | undefined | ShipmentDefaultArgs> = $Result.GetResult<Prisma.$ShipmentPayload, S>

  type ShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShipmentCountAggregateInputType | true
    }

  export interface ShipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipment'], meta: { name: 'Shipment' } }
    /**
     * Find zero or one Shipment that matches the filter.
     * @param {ShipmentFindUniqueArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShipmentFindUniqueArgs>(args: SelectSubset<T, ShipmentFindUniqueArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShipmentFindUniqueOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ShipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShipmentFindFirstArgs>(args?: SelectSubset<T, ShipmentFindFirstArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ShipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shipments
     * const shipments = await prisma.shipment.findMany()
     * 
     * // Get first 10 Shipments
     * const shipments = await prisma.shipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shipmentWithIdOnly = await prisma.shipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShipmentFindManyArgs>(args?: SelectSubset<T, ShipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shipment.
     * @param {ShipmentCreateArgs} args - Arguments to create a Shipment.
     * @example
     * // Create one Shipment
     * const Shipment = await prisma.shipment.create({
     *   data: {
     *     // ... data to create a Shipment
     *   }
     * })
     * 
     */
    create<T extends ShipmentCreateArgs>(args: SelectSubset<T, ShipmentCreateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shipments.
     * @param {ShipmentCreateManyArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShipmentCreateManyArgs>(args?: SelectSubset<T, ShipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shipments and returns the data saved in the database.
     * @param {ShipmentCreateManyAndReturnArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ShipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shipment.
     * @param {ShipmentDeleteArgs} args - Arguments to delete one Shipment.
     * @example
     * // Delete one Shipment
     * const Shipment = await prisma.shipment.delete({
     *   where: {
     *     // ... filter to delete one Shipment
     *   }
     * })
     * 
     */
    delete<T extends ShipmentDeleteArgs>(args: SelectSubset<T, ShipmentDeleteArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shipment.
     * @param {ShipmentUpdateArgs} args - Arguments to update one Shipment.
     * @example
     * // Update one Shipment
     * const shipment = await prisma.shipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShipmentUpdateArgs>(args: SelectSubset<T, ShipmentUpdateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shipments.
     * @param {ShipmentDeleteManyArgs} args - Arguments to filter Shipments to delete.
     * @example
     * // Delete a few Shipments
     * const { count } = await prisma.shipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShipmentDeleteManyArgs>(args?: SelectSubset<T, ShipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShipmentUpdateManyArgs>(args: SelectSubset<T, ShipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments and returns the data updated in the database.
     * @param {ShipmentUpdateManyAndReturnArgs} args - Arguments to update many Shipments.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ShipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shipment.
     * @param {ShipmentUpsertArgs} args - Arguments to update or create a Shipment.
     * @example
     * // Update or create a Shipment
     * const shipment = await prisma.shipment.upsert({
     *   create: {
     *     // ... data to create a Shipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipment we want to update
     *   }
     * })
     */
    upsert<T extends ShipmentUpsertArgs>(args: SelectSubset<T, ShipmentUpsertArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentCountArgs} args - Arguments to filter Shipments to count.
     * @example
     * // Count the number of Shipments
     * const count = await prisma.shipment.count({
     *   where: {
     *     // ... the filter for the Shipments we want to count
     *   }
     * })
    **/
    count<T extends ShipmentCountArgs>(
      args?: Subset<T, ShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShipmentAggregateArgs>(args: Subset<T, ShipmentAggregateArgs>): Prisma.PrismaPromise<GetShipmentAggregateType<T>>

    /**
     * Group by Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentGroupByArgs} args - Group by arguments.
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
      T extends ShipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShipmentGroupByArgs['orderBy'] }
        : { orderBy?: ShipmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipment model
   */
  readonly fields: ShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Shipment model
   */
  interface ShipmentFieldRefs {
    readonly id: FieldRef<"Shipment", 'String'>
    readonly tenantId: FieldRef<"Shipment", 'String'>
    readonly trackingCode: FieldRef<"Shipment", 'String'>
    readonly deliveryOtp: FieldRef<"Shipment", 'String'>
    readonly status: FieldRef<"Shipment", 'ShipmentStatus'>
    readonly priority: FieldRef<"Shipment", 'PriorityTier'>
    readonly recipientName: FieldRef<"Shipment", 'String'>
    readonly recipientPhone: FieldRef<"Shipment", 'String'>
    readonly recipientAddress: FieldRef<"Shipment", 'String'>
    readonly recipientLat: FieldRef<"Shipment", 'Float'>
    readonly recipientLng: FieldRef<"Shipment", 'Float'>
    readonly weightKg: FieldRef<"Shipment", 'Float'>
    readonly lengthCm: FieldRef<"Shipment", 'Float'>
    readonly widthCm: FieldRef<"Shipment", 'Float'>
    readonly heightCm: FieldRef<"Shipment", 'Float'>
    readonly deliveryWindowStart: FieldRef<"Shipment", 'DateTime'>
    readonly deliveryWindowEnd: FieldRef<"Shipment", 'DateTime'>
    readonly createdAt: FieldRef<"Shipment", 'DateTime'>
    readonly updatedAt: FieldRef<"Shipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shipment findUnique
   */
  export type ShipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findUniqueOrThrow
   */
  export type ShipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findFirst
   */
  export type ShipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findFirstOrThrow
   */
  export type ShipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findMany
   */
  export type ShipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter, which Shipments to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment create
   */
  export type ShipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Shipment.
     */
    data: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
  }

  /**
   * Shipment createMany
   */
  export type ShipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment createManyAndReturn
   */
  export type ShipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment update
   */
  export type ShipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Shipment.
     */
    data: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
    /**
     * Choose, which Shipment to update.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment updateMany
   */
  export type ShipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to update.
     */
    limit?: number
  }

  /**
   * Shipment updateManyAndReturn
   */
  export type ShipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to update.
     */
    limit?: number
  }

  /**
   * Shipment upsert
   */
  export type ShipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Shipment to update in case it exists.
     */
    where: ShipmentWhereUniqueInput
    /**
     * In case the Shipment found by the `where` argument doesn't exist, create a new Shipment with this data.
     */
    create: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
    /**
     * In case the Shipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
  }

  /**
   * Shipment delete
   */
  export type ShipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Filter which Shipment to delete.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment deleteMany
   */
  export type ShipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipments to delete
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to delete.
     */
    limit?: number
  }

  /**
   * Shipment without action
   */
  export type ShipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
  }


  /**
   * Model OutboxEvent
   */

  export type AggregateOutboxEvent = {
    _count: OutboxEventCountAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  export type OutboxEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    topic: string | null
    eventType: string | null
    createdAt: Date | null
    publishedAt: Date | null
    claimedAt: Date | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    topic: string | null
    eventType: string | null
    createdAt: Date | null
    publishedAt: Date | null
    claimedAt: Date | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    tenantId: number
    topic: number
    eventType: number
    payload: number
    createdAt: number
    publishedAt: number
    claimedAt: number
    _all: number
  }


  export type OutboxEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    createdAt?: true
    publishedAt?: true
    claimedAt?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    createdAt?: true
    publishedAt?: true
    claimedAt?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    payload?: true
    createdAt?: true
    publishedAt?: true
    claimedAt?: true
    _all?: true
  }

  export type OutboxEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvent to aggregate.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboxEvents
    **/
    _count?: true | OutboxEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxEventMaxAggregateInputType
  }

  export type GetOutboxEventAggregateType<T extends OutboxEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboxEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxEvent[P]>
      : GetScalarType<T[P], AggregateOutboxEvent[P]>
  }




  export type OutboxEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxEventWhereInput
    orderBy?: OutboxEventOrderByWithAggregationInput | OutboxEventOrderByWithAggregationInput[]
    by: OutboxEventScalarFieldEnum[] | OutboxEventScalarFieldEnum
    having?: OutboxEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxEventCountAggregateInputType | true
    _min?: OutboxEventMinAggregateInputType
    _max?: OutboxEventMaxAggregateInputType
  }

  export type OutboxEventGroupByOutputType = {
    id: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonValue
    createdAt: Date
    publishedAt: Date | null
    claimedAt: Date | null
    _count: OutboxEventCountAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  type GetOutboxEventGroupByPayload<T extends OutboxEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
        }
      >
    >


  export type OutboxEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    claimedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    claimedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    claimedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    claimedAt?: boolean
  }

  export type OutboxEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "topic" | "eventType" | "payload" | "createdAt" | "publishedAt" | "claimedAt", ExtArgs["result"]["outboxEvent"]>

  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      topic: string
      eventType: string
      payload: Prisma.JsonValue
      createdAt: Date
      publishedAt: Date | null
      claimedAt: Date | null
    }, ExtArgs["result"]["outboxEvent"]>
    composites: {}
  }

  type OutboxEventGetPayload<S extends boolean | null | undefined | OutboxEventDefaultArgs> = $Result.GetResult<Prisma.$OutboxEventPayload, S>

  type OutboxEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboxEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutboxEventCountAggregateInputType | true
    }

  export interface OutboxEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboxEvent'], meta: { name: 'OutboxEvent' } }
    /**
     * Find zero or one OutboxEvent that matches the filter.
     * @param {OutboxEventFindUniqueArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxEventFindUniqueArgs>(args: SelectSubset<T, OutboxEventFindUniqueArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutboxEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboxEventFindUniqueOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxEventFindFirstArgs>(args?: SelectSubset<T, OutboxEventFindFirstArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutboxEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany()
     * 
     * // Get first 10 OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxEventFindManyArgs>(args?: SelectSubset<T, OutboxEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutboxEvent.
     * @param {OutboxEventCreateArgs} args - Arguments to create a OutboxEvent.
     * @example
     * // Create one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.create({
     *   data: {
     *     // ... data to create a OutboxEvent
     *   }
     * })
     * 
     */
    create<T extends OutboxEventCreateArgs>(args: SelectSubset<T, OutboxEventCreateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutboxEvents.
     * @param {OutboxEventCreateManyArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxEventCreateManyArgs>(args?: SelectSubset<T, OutboxEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboxEvents and returns the data saved in the database.
     * @param {OutboxEventCreateManyAndReturnArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutboxEvent.
     * @param {OutboxEventDeleteArgs} args - Arguments to delete one OutboxEvent.
     * @example
     * // Delete one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.delete({
     *   where: {
     *     // ... filter to delete one OutboxEvent
     *   }
     * })
     * 
     */
    delete<T extends OutboxEventDeleteArgs>(args: SelectSubset<T, OutboxEventDeleteArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutboxEvent.
     * @param {OutboxEventUpdateArgs} args - Arguments to update one OutboxEvent.
     * @example
     * // Update one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxEventUpdateArgs>(args: SelectSubset<T, OutboxEventUpdateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutboxEvents.
     * @param {OutboxEventDeleteManyArgs} args - Arguments to filter OutboxEvents to delete.
     * @example
     * // Delete a few OutboxEvents
     * const { count } = await prisma.outboxEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxEventDeleteManyArgs>(args?: SelectSubset<T, OutboxEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxEventUpdateManyArgs>(args: SelectSubset<T, OutboxEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents and returns the data updated in the database.
     * @param {OutboxEventUpdateManyAndReturnArgs} args - Arguments to update many OutboxEvents.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends OutboxEventUpdateManyAndReturnArgs>(args: SelectSubset<T, OutboxEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutboxEvent.
     * @param {OutboxEventUpsertArgs} args - Arguments to update or create a OutboxEvent.
     * @example
     * // Update or create a OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.upsert({
     *   create: {
     *     // ... data to create a OutboxEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxEvent we want to update
     *   }
     * })
     */
    upsert<T extends OutboxEventUpsertArgs>(args: SelectSubset<T, OutboxEventUpsertArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventCountArgs} args - Arguments to filter OutboxEvents to count.
     * @example
     * // Count the number of OutboxEvents
     * const count = await prisma.outboxEvent.count({
     *   where: {
     *     // ... the filter for the OutboxEvents we want to count
     *   }
     * })
    **/
    count<T extends OutboxEventCountArgs>(
      args?: Subset<T, OutboxEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OutboxEventAggregateArgs>(args: Subset<T, OutboxEventAggregateArgs>): Prisma.PrismaPromise<GetOutboxEventAggregateType<T>>

    /**
     * Group by OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventGroupByArgs} args - Group by arguments.
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
      T extends OutboxEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxEventGroupByArgs['orderBy'] }
        : { orderBy?: OutboxEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OutboxEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboxEvent model
   */
  readonly fields: OutboxEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OutboxEvent model
   */
  interface OutboxEventFieldRefs {
    readonly id: FieldRef<"OutboxEvent", 'String'>
    readonly tenantId: FieldRef<"OutboxEvent", 'String'>
    readonly topic: FieldRef<"OutboxEvent", 'String'>
    readonly eventType: FieldRef<"OutboxEvent", 'String'>
    readonly payload: FieldRef<"OutboxEvent", 'Json'>
    readonly createdAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly publishedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly claimedAt: FieldRef<"OutboxEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OutboxEvent findUnique
   */
  export type OutboxEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findUniqueOrThrow
   */
  export type OutboxEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findFirst
   */
  export type OutboxEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findFirstOrThrow
   */
  export type OutboxEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findMany
   */
  export type OutboxEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvents to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent create
   */
  export type OutboxEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to create a OutboxEvent.
     */
    data: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
  }

  /**
   * OutboxEvent createMany
   */
  export type OutboxEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent createManyAndReturn
   */
  export type OutboxEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent update
   */
  export type OutboxEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to update a OutboxEvent.
     */
    data: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
    /**
     * Choose, which OutboxEvent to update.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent updateMany
   */
  export type OutboxEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent updateManyAndReturn
   */
  export type OutboxEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent upsert
   */
  export type OutboxEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The filter to search for the OutboxEvent to update in case it exists.
     */
    where: OutboxEventWhereUniqueInput
    /**
     * In case the OutboxEvent found by the `where` argument doesn't exist, create a new OutboxEvent with this data.
     */
    create: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
    /**
     * In case the OutboxEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
  }

  /**
   * OutboxEvent delete
   */
  export type OutboxEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter which OutboxEvent to delete.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent deleteMany
   */
  export type OutboxEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvents to delete
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to delete.
     */
    limit?: number
  }

  /**
   * OutboxEvent without action
   */
  export type OutboxEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
  }


  /**
   * Model BatchImportJob
   */

  export type AggregateBatchImportJob = {
    _count: BatchImportJobCountAggregateOutputType | null
    _avg: BatchImportJobAvgAggregateOutputType | null
    _sum: BatchImportJobSumAggregateOutputType | null
    _min: BatchImportJobMinAggregateOutputType | null
    _max: BatchImportJobMaxAggregateOutputType | null
  }

  export type BatchImportJobAvgAggregateOutputType = {
    totalRows: number | null
    successCount: number | null
    failureCount: number | null
  }

  export type BatchImportJobSumAggregateOutputType = {
    totalRows: number | null
    successCount: number | null
    failureCount: number | null
  }

  export type BatchImportJobMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    fileName: string | null
    status: $Enums.BatchImportStatus | null
    totalRows: number | null
    successCount: number | null
    failureCount: number | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type BatchImportJobMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    fileName: string | null
    status: $Enums.BatchImportStatus | null
    totalRows: number | null
    successCount: number | null
    failureCount: number | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type BatchImportJobCountAggregateOutputType = {
    id: number
    tenantId: number
    fileName: number
    status: number
    totalRows: number
    successCount: number
    failureCount: number
    errorManifest: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type BatchImportJobAvgAggregateInputType = {
    totalRows?: true
    successCount?: true
    failureCount?: true
  }

  export type BatchImportJobSumAggregateInputType = {
    totalRows?: true
    successCount?: true
    failureCount?: true
  }

  export type BatchImportJobMinAggregateInputType = {
    id?: true
    tenantId?: true
    fileName?: true
    status?: true
    totalRows?: true
    successCount?: true
    failureCount?: true
    createdAt?: true
    completedAt?: true
  }

  export type BatchImportJobMaxAggregateInputType = {
    id?: true
    tenantId?: true
    fileName?: true
    status?: true
    totalRows?: true
    successCount?: true
    failureCount?: true
    createdAt?: true
    completedAt?: true
  }

  export type BatchImportJobCountAggregateInputType = {
    id?: true
    tenantId?: true
    fileName?: true
    status?: true
    totalRows?: true
    successCount?: true
    failureCount?: true
    errorManifest?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type BatchImportJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchImportJob to aggregate.
     */
    where?: BatchImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportJobs to fetch.
     */
    orderBy?: BatchImportJobOrderByWithRelationInput | BatchImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BatchImportJobs
    **/
    _count?: true | BatchImportJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchImportJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchImportJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchImportJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchImportJobMaxAggregateInputType
  }

  export type GetBatchImportJobAggregateType<T extends BatchImportJobAggregateArgs> = {
        [P in keyof T & keyof AggregateBatchImportJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatchImportJob[P]>
      : GetScalarType<T[P], AggregateBatchImportJob[P]>
  }




  export type BatchImportJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchImportJobWhereInput
    orderBy?: BatchImportJobOrderByWithAggregationInput | BatchImportJobOrderByWithAggregationInput[]
    by: BatchImportJobScalarFieldEnum[] | BatchImportJobScalarFieldEnum
    having?: BatchImportJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchImportJobCountAggregateInputType | true
    _avg?: BatchImportJobAvgAggregateInputType
    _sum?: BatchImportJobSumAggregateInputType
    _min?: BatchImportJobMinAggregateInputType
    _max?: BatchImportJobMaxAggregateInputType
  }

  export type BatchImportJobGroupByOutputType = {
    id: string
    tenantId: string
    fileName: string
    status: $Enums.BatchImportStatus
    totalRows: number
    successCount: number
    failureCount: number
    errorManifest: JsonValue | null
    createdAt: Date
    completedAt: Date | null
    _count: BatchImportJobCountAggregateOutputType | null
    _avg: BatchImportJobAvgAggregateOutputType | null
    _sum: BatchImportJobSumAggregateOutputType | null
    _min: BatchImportJobMinAggregateOutputType | null
    _max: BatchImportJobMaxAggregateOutputType | null
  }

  type GetBatchImportJobGroupByPayload<T extends BatchImportJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchImportJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchImportJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchImportJobGroupByOutputType[P]>
            : GetScalarType<T[P], BatchImportJobGroupByOutputType[P]>
        }
      >
    >


  export type BatchImportJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    fileName?: boolean
    status?: boolean
    totalRows?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorManifest?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["batchImportJob"]>

  export type BatchImportJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    fileName?: boolean
    status?: boolean
    totalRows?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorManifest?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["batchImportJob"]>

  export type BatchImportJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    fileName?: boolean
    status?: boolean
    totalRows?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorManifest?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["batchImportJob"]>

  export type BatchImportJobSelectScalar = {
    id?: boolean
    tenantId?: boolean
    fileName?: boolean
    status?: boolean
    totalRows?: boolean
    successCount?: boolean
    failureCount?: boolean
    errorManifest?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type BatchImportJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "fileName" | "status" | "totalRows" | "successCount" | "failureCount" | "errorManifest" | "createdAt" | "completedAt", ExtArgs["result"]["batchImportJob"]>

  export type $BatchImportJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BatchImportJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      fileName: string
      status: $Enums.BatchImportStatus
      totalRows: number
      successCount: number
      failureCount: number
      errorManifest: Prisma.JsonValue | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["batchImportJob"]>
    composites: {}
  }

  type BatchImportJobGetPayload<S extends boolean | null | undefined | BatchImportJobDefaultArgs> = $Result.GetResult<Prisma.$BatchImportJobPayload, S>

  type BatchImportJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchImportJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchImportJobCountAggregateInputType | true
    }

  export interface BatchImportJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BatchImportJob'], meta: { name: 'BatchImportJob' } }
    /**
     * Find zero or one BatchImportJob that matches the filter.
     * @param {BatchImportJobFindUniqueArgs} args - Arguments to find a BatchImportJob
     * @example
     * // Get one BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchImportJobFindUniqueArgs>(args: SelectSubset<T, BatchImportJobFindUniqueArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BatchImportJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchImportJobFindUniqueOrThrowArgs} args - Arguments to find a BatchImportJob
     * @example
     * // Get one BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchImportJobFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchImportJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchImportJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobFindFirstArgs} args - Arguments to find a BatchImportJob
     * @example
     * // Get one BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchImportJobFindFirstArgs>(args?: SelectSubset<T, BatchImportJobFindFirstArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchImportJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobFindFirstOrThrowArgs} args - Arguments to find a BatchImportJob
     * @example
     * // Get one BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchImportJobFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchImportJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BatchImportJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BatchImportJobs
     * const batchImportJobs = await prisma.batchImportJob.findMany()
     * 
     * // Get first 10 BatchImportJobs
     * const batchImportJobs = await prisma.batchImportJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchImportJobWithIdOnly = await prisma.batchImportJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchImportJobFindManyArgs>(args?: SelectSubset<T, BatchImportJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BatchImportJob.
     * @param {BatchImportJobCreateArgs} args - Arguments to create a BatchImportJob.
     * @example
     * // Create one BatchImportJob
     * const BatchImportJob = await prisma.batchImportJob.create({
     *   data: {
     *     // ... data to create a BatchImportJob
     *   }
     * })
     * 
     */
    create<T extends BatchImportJobCreateArgs>(args: SelectSubset<T, BatchImportJobCreateArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BatchImportJobs.
     * @param {BatchImportJobCreateManyArgs} args - Arguments to create many BatchImportJobs.
     * @example
     * // Create many BatchImportJobs
     * const batchImportJob = await prisma.batchImportJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchImportJobCreateManyArgs>(args?: SelectSubset<T, BatchImportJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BatchImportJobs and returns the data saved in the database.
     * @param {BatchImportJobCreateManyAndReturnArgs} args - Arguments to create many BatchImportJobs.
     * @example
     * // Create many BatchImportJobs
     * const batchImportJob = await prisma.batchImportJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BatchImportJobs and only return the `id`
     * const batchImportJobWithIdOnly = await prisma.batchImportJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchImportJobCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchImportJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BatchImportJob.
     * @param {BatchImportJobDeleteArgs} args - Arguments to delete one BatchImportJob.
     * @example
     * // Delete one BatchImportJob
     * const BatchImportJob = await prisma.batchImportJob.delete({
     *   where: {
     *     // ... filter to delete one BatchImportJob
     *   }
     * })
     * 
     */
    delete<T extends BatchImportJobDeleteArgs>(args: SelectSubset<T, BatchImportJobDeleteArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BatchImportJob.
     * @param {BatchImportJobUpdateArgs} args - Arguments to update one BatchImportJob.
     * @example
     * // Update one BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchImportJobUpdateArgs>(args: SelectSubset<T, BatchImportJobUpdateArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BatchImportJobs.
     * @param {BatchImportJobDeleteManyArgs} args - Arguments to filter BatchImportJobs to delete.
     * @example
     * // Delete a few BatchImportJobs
     * const { count } = await prisma.batchImportJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchImportJobDeleteManyArgs>(args?: SelectSubset<T, BatchImportJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchImportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BatchImportJobs
     * const batchImportJob = await prisma.batchImportJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchImportJobUpdateManyArgs>(args: SelectSubset<T, BatchImportJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchImportJobs and returns the data updated in the database.
     * @param {BatchImportJobUpdateManyAndReturnArgs} args - Arguments to update many BatchImportJobs.
     * @example
     * // Update many BatchImportJobs
     * const batchImportJob = await prisma.batchImportJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BatchImportJobs and only return the `id`
     * const batchImportJobWithIdOnly = await prisma.batchImportJob.updateManyAndReturn({
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
    updateManyAndReturn<T extends BatchImportJobUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchImportJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BatchImportJob.
     * @param {BatchImportJobUpsertArgs} args - Arguments to update or create a BatchImportJob.
     * @example
     * // Update or create a BatchImportJob
     * const batchImportJob = await prisma.batchImportJob.upsert({
     *   create: {
     *     // ... data to create a BatchImportJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BatchImportJob we want to update
     *   }
     * })
     */
    upsert<T extends BatchImportJobUpsertArgs>(args: SelectSubset<T, BatchImportJobUpsertArgs<ExtArgs>>): Prisma__BatchImportJobClient<$Result.GetResult<Prisma.$BatchImportJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BatchImportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobCountArgs} args - Arguments to filter BatchImportJobs to count.
     * @example
     * // Count the number of BatchImportJobs
     * const count = await prisma.batchImportJob.count({
     *   where: {
     *     // ... the filter for the BatchImportJobs we want to count
     *   }
     * })
    **/
    count<T extends BatchImportJobCountArgs>(
      args?: Subset<T, BatchImportJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchImportJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BatchImportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BatchImportJobAggregateArgs>(args: Subset<T, BatchImportJobAggregateArgs>): Prisma.PrismaPromise<GetBatchImportJobAggregateType<T>>

    /**
     * Group by BatchImportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportJobGroupByArgs} args - Group by arguments.
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
      T extends BatchImportJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchImportJobGroupByArgs['orderBy'] }
        : { orderBy?: BatchImportJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BatchImportJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchImportJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BatchImportJob model
   */
  readonly fields: BatchImportJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BatchImportJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchImportJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BatchImportJob model
   */
  interface BatchImportJobFieldRefs {
    readonly id: FieldRef<"BatchImportJob", 'String'>
    readonly tenantId: FieldRef<"BatchImportJob", 'String'>
    readonly fileName: FieldRef<"BatchImportJob", 'String'>
    readonly status: FieldRef<"BatchImportJob", 'BatchImportStatus'>
    readonly totalRows: FieldRef<"BatchImportJob", 'Int'>
    readonly successCount: FieldRef<"BatchImportJob", 'Int'>
    readonly failureCount: FieldRef<"BatchImportJob", 'Int'>
    readonly errorManifest: FieldRef<"BatchImportJob", 'Json'>
    readonly createdAt: FieldRef<"BatchImportJob", 'DateTime'>
    readonly completedAt: FieldRef<"BatchImportJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BatchImportJob findUnique
   */
  export type BatchImportJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportJob to fetch.
     */
    where: BatchImportJobWhereUniqueInput
  }

  /**
   * BatchImportJob findUniqueOrThrow
   */
  export type BatchImportJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportJob to fetch.
     */
    where: BatchImportJobWhereUniqueInput
  }

  /**
   * BatchImportJob findFirst
   */
  export type BatchImportJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportJob to fetch.
     */
    where?: BatchImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportJobs to fetch.
     */
    orderBy?: BatchImportJobOrderByWithRelationInput | BatchImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchImportJobs.
     */
    cursor?: BatchImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchImportJobs.
     */
    distinct?: BatchImportJobScalarFieldEnum | BatchImportJobScalarFieldEnum[]
  }

  /**
   * BatchImportJob findFirstOrThrow
   */
  export type BatchImportJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportJob to fetch.
     */
    where?: BatchImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportJobs to fetch.
     */
    orderBy?: BatchImportJobOrderByWithRelationInput | BatchImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchImportJobs.
     */
    cursor?: BatchImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchImportJobs.
     */
    distinct?: BatchImportJobScalarFieldEnum | BatchImportJobScalarFieldEnum[]
  }

  /**
   * BatchImportJob findMany
   */
  export type BatchImportJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportJobs to fetch.
     */
    where?: BatchImportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportJobs to fetch.
     */
    orderBy?: BatchImportJobOrderByWithRelationInput | BatchImportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BatchImportJobs.
     */
    cursor?: BatchImportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportJobs.
     */
    skip?: number
    distinct?: BatchImportJobScalarFieldEnum | BatchImportJobScalarFieldEnum[]
  }

  /**
   * BatchImportJob create
   */
  export type BatchImportJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * The data needed to create a BatchImportJob.
     */
    data: XOR<BatchImportJobCreateInput, BatchImportJobUncheckedCreateInput>
  }

  /**
   * BatchImportJob createMany
   */
  export type BatchImportJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BatchImportJobs.
     */
    data: BatchImportJobCreateManyInput | BatchImportJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchImportJob createManyAndReturn
   */
  export type BatchImportJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * The data used to create many BatchImportJobs.
     */
    data: BatchImportJobCreateManyInput | BatchImportJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchImportJob update
   */
  export type BatchImportJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * The data needed to update a BatchImportJob.
     */
    data: XOR<BatchImportJobUpdateInput, BatchImportJobUncheckedUpdateInput>
    /**
     * Choose, which BatchImportJob to update.
     */
    where: BatchImportJobWhereUniqueInput
  }

  /**
   * BatchImportJob updateMany
   */
  export type BatchImportJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BatchImportJobs.
     */
    data: XOR<BatchImportJobUpdateManyMutationInput, BatchImportJobUncheckedUpdateManyInput>
    /**
     * Filter which BatchImportJobs to update
     */
    where?: BatchImportJobWhereInput
    /**
     * Limit how many BatchImportJobs to update.
     */
    limit?: number
  }

  /**
   * BatchImportJob updateManyAndReturn
   */
  export type BatchImportJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * The data used to update BatchImportJobs.
     */
    data: XOR<BatchImportJobUpdateManyMutationInput, BatchImportJobUncheckedUpdateManyInput>
    /**
     * Filter which BatchImportJobs to update
     */
    where?: BatchImportJobWhereInput
    /**
     * Limit how many BatchImportJobs to update.
     */
    limit?: number
  }

  /**
   * BatchImportJob upsert
   */
  export type BatchImportJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * The filter to search for the BatchImportJob to update in case it exists.
     */
    where: BatchImportJobWhereUniqueInput
    /**
     * In case the BatchImportJob found by the `where` argument doesn't exist, create a new BatchImportJob with this data.
     */
    create: XOR<BatchImportJobCreateInput, BatchImportJobUncheckedCreateInput>
    /**
     * In case the BatchImportJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchImportJobUpdateInput, BatchImportJobUncheckedUpdateInput>
  }

  /**
   * BatchImportJob delete
   */
  export type BatchImportJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
    /**
     * Filter which BatchImportJob to delete.
     */
    where: BatchImportJobWhereUniqueInput
  }

  /**
   * BatchImportJob deleteMany
   */
  export type BatchImportJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchImportJobs to delete
     */
    where?: BatchImportJobWhereInput
    /**
     * Limit how many BatchImportJobs to delete.
     */
    limit?: number
  }

  /**
   * BatchImportJob without action
   */
  export type BatchImportJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportJob
     */
    select?: BatchImportJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportJob
     */
    omit?: BatchImportJobOmit<ExtArgs> | null
  }


  /**
   * Model BatchImportRowResult
   */

  export type AggregateBatchImportRowResult = {
    _count: BatchImportRowResultCountAggregateOutputType | null
    _avg: BatchImportRowResultAvgAggregateOutputType | null
    _sum: BatchImportRowResultSumAggregateOutputType | null
    _min: BatchImportRowResultMinAggregateOutputType | null
    _max: BatchImportRowResultMaxAggregateOutputType | null
  }

  export type BatchImportRowResultAvgAggregateOutputType = {
    rowNumber: number | null
  }

  export type BatchImportRowResultSumAggregateOutputType = {
    rowNumber: number | null
  }

  export type BatchImportRowResultMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    batchImportJobId: string | null
    rowNumber: number | null
    success: boolean | null
    shipmentId: string | null
    createdAt: Date | null
  }

  export type BatchImportRowResultMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    batchImportJobId: string | null
    rowNumber: number | null
    success: boolean | null
    shipmentId: string | null
    createdAt: Date | null
  }

  export type BatchImportRowResultCountAggregateOutputType = {
    id: number
    tenantId: number
    batchImportJobId: number
    rowNumber: number
    success: number
    shipmentId: number
    errors: number
    createdAt: number
    _all: number
  }


  export type BatchImportRowResultAvgAggregateInputType = {
    rowNumber?: true
  }

  export type BatchImportRowResultSumAggregateInputType = {
    rowNumber?: true
  }

  export type BatchImportRowResultMinAggregateInputType = {
    id?: true
    tenantId?: true
    batchImportJobId?: true
    rowNumber?: true
    success?: true
    shipmentId?: true
    createdAt?: true
  }

  export type BatchImportRowResultMaxAggregateInputType = {
    id?: true
    tenantId?: true
    batchImportJobId?: true
    rowNumber?: true
    success?: true
    shipmentId?: true
    createdAt?: true
  }

  export type BatchImportRowResultCountAggregateInputType = {
    id?: true
    tenantId?: true
    batchImportJobId?: true
    rowNumber?: true
    success?: true
    shipmentId?: true
    errors?: true
    createdAt?: true
    _all?: true
  }

  export type BatchImportRowResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchImportRowResult to aggregate.
     */
    where?: BatchImportRowResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportRowResults to fetch.
     */
    orderBy?: BatchImportRowResultOrderByWithRelationInput | BatchImportRowResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchImportRowResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportRowResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportRowResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BatchImportRowResults
    **/
    _count?: true | BatchImportRowResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchImportRowResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchImportRowResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchImportRowResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchImportRowResultMaxAggregateInputType
  }

  export type GetBatchImportRowResultAggregateType<T extends BatchImportRowResultAggregateArgs> = {
        [P in keyof T & keyof AggregateBatchImportRowResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatchImportRowResult[P]>
      : GetScalarType<T[P], AggregateBatchImportRowResult[P]>
  }




  export type BatchImportRowResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchImportRowResultWhereInput
    orderBy?: BatchImportRowResultOrderByWithAggregationInput | BatchImportRowResultOrderByWithAggregationInput[]
    by: BatchImportRowResultScalarFieldEnum[] | BatchImportRowResultScalarFieldEnum
    having?: BatchImportRowResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchImportRowResultCountAggregateInputType | true
    _avg?: BatchImportRowResultAvgAggregateInputType
    _sum?: BatchImportRowResultSumAggregateInputType
    _min?: BatchImportRowResultMinAggregateInputType
    _max?: BatchImportRowResultMaxAggregateInputType
  }

  export type BatchImportRowResultGroupByOutputType = {
    id: string
    tenantId: string
    batchImportJobId: string
    rowNumber: number
    success: boolean
    shipmentId: string | null
    errors: JsonValue | null
    createdAt: Date
    _count: BatchImportRowResultCountAggregateOutputType | null
    _avg: BatchImportRowResultAvgAggregateOutputType | null
    _sum: BatchImportRowResultSumAggregateOutputType | null
    _min: BatchImportRowResultMinAggregateOutputType | null
    _max: BatchImportRowResultMaxAggregateOutputType | null
  }

  type GetBatchImportRowResultGroupByPayload<T extends BatchImportRowResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchImportRowResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchImportRowResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchImportRowResultGroupByOutputType[P]>
            : GetScalarType<T[P], BatchImportRowResultGroupByOutputType[P]>
        }
      >
    >


  export type BatchImportRowResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    batchImportJobId?: boolean
    rowNumber?: boolean
    success?: boolean
    shipmentId?: boolean
    errors?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["batchImportRowResult"]>

  export type BatchImportRowResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    batchImportJobId?: boolean
    rowNumber?: boolean
    success?: boolean
    shipmentId?: boolean
    errors?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["batchImportRowResult"]>

  export type BatchImportRowResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    batchImportJobId?: boolean
    rowNumber?: boolean
    success?: boolean
    shipmentId?: boolean
    errors?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["batchImportRowResult"]>

  export type BatchImportRowResultSelectScalar = {
    id?: boolean
    tenantId?: boolean
    batchImportJobId?: boolean
    rowNumber?: boolean
    success?: boolean
    shipmentId?: boolean
    errors?: boolean
    createdAt?: boolean
  }

  export type BatchImportRowResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "batchImportJobId" | "rowNumber" | "success" | "shipmentId" | "errors" | "createdAt", ExtArgs["result"]["batchImportRowResult"]>

  export type $BatchImportRowResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BatchImportRowResult"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      batchImportJobId: string
      rowNumber: number
      success: boolean
      shipmentId: string | null
      errors: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["batchImportRowResult"]>
    composites: {}
  }

  type BatchImportRowResultGetPayload<S extends boolean | null | undefined | BatchImportRowResultDefaultArgs> = $Result.GetResult<Prisma.$BatchImportRowResultPayload, S>

  type BatchImportRowResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BatchImportRowResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BatchImportRowResultCountAggregateInputType | true
    }

  export interface BatchImportRowResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BatchImportRowResult'], meta: { name: 'BatchImportRowResult' } }
    /**
     * Find zero or one BatchImportRowResult that matches the filter.
     * @param {BatchImportRowResultFindUniqueArgs} args - Arguments to find a BatchImportRowResult
     * @example
     * // Get one BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchImportRowResultFindUniqueArgs>(args: SelectSubset<T, BatchImportRowResultFindUniqueArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BatchImportRowResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BatchImportRowResultFindUniqueOrThrowArgs} args - Arguments to find a BatchImportRowResult
     * @example
     * // Get one BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchImportRowResultFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchImportRowResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchImportRowResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultFindFirstArgs} args - Arguments to find a BatchImportRowResult
     * @example
     * // Get one BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchImportRowResultFindFirstArgs>(args?: SelectSubset<T, BatchImportRowResultFindFirstArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BatchImportRowResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultFindFirstOrThrowArgs} args - Arguments to find a BatchImportRowResult
     * @example
     * // Get one BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchImportRowResultFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchImportRowResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BatchImportRowResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BatchImportRowResults
     * const batchImportRowResults = await prisma.batchImportRowResult.findMany()
     * 
     * // Get first 10 BatchImportRowResults
     * const batchImportRowResults = await prisma.batchImportRowResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchImportRowResultWithIdOnly = await prisma.batchImportRowResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchImportRowResultFindManyArgs>(args?: SelectSubset<T, BatchImportRowResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BatchImportRowResult.
     * @param {BatchImportRowResultCreateArgs} args - Arguments to create a BatchImportRowResult.
     * @example
     * // Create one BatchImportRowResult
     * const BatchImportRowResult = await prisma.batchImportRowResult.create({
     *   data: {
     *     // ... data to create a BatchImportRowResult
     *   }
     * })
     * 
     */
    create<T extends BatchImportRowResultCreateArgs>(args: SelectSubset<T, BatchImportRowResultCreateArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BatchImportRowResults.
     * @param {BatchImportRowResultCreateManyArgs} args - Arguments to create many BatchImportRowResults.
     * @example
     * // Create many BatchImportRowResults
     * const batchImportRowResult = await prisma.batchImportRowResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchImportRowResultCreateManyArgs>(args?: SelectSubset<T, BatchImportRowResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BatchImportRowResults and returns the data saved in the database.
     * @param {BatchImportRowResultCreateManyAndReturnArgs} args - Arguments to create many BatchImportRowResults.
     * @example
     * // Create many BatchImportRowResults
     * const batchImportRowResult = await prisma.batchImportRowResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BatchImportRowResults and only return the `id`
     * const batchImportRowResultWithIdOnly = await prisma.batchImportRowResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchImportRowResultCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchImportRowResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BatchImportRowResult.
     * @param {BatchImportRowResultDeleteArgs} args - Arguments to delete one BatchImportRowResult.
     * @example
     * // Delete one BatchImportRowResult
     * const BatchImportRowResult = await prisma.batchImportRowResult.delete({
     *   where: {
     *     // ... filter to delete one BatchImportRowResult
     *   }
     * })
     * 
     */
    delete<T extends BatchImportRowResultDeleteArgs>(args: SelectSubset<T, BatchImportRowResultDeleteArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BatchImportRowResult.
     * @param {BatchImportRowResultUpdateArgs} args - Arguments to update one BatchImportRowResult.
     * @example
     * // Update one BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchImportRowResultUpdateArgs>(args: SelectSubset<T, BatchImportRowResultUpdateArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BatchImportRowResults.
     * @param {BatchImportRowResultDeleteManyArgs} args - Arguments to filter BatchImportRowResults to delete.
     * @example
     * // Delete a few BatchImportRowResults
     * const { count } = await prisma.batchImportRowResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchImportRowResultDeleteManyArgs>(args?: SelectSubset<T, BatchImportRowResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchImportRowResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BatchImportRowResults
     * const batchImportRowResult = await prisma.batchImportRowResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchImportRowResultUpdateManyArgs>(args: SelectSubset<T, BatchImportRowResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BatchImportRowResults and returns the data updated in the database.
     * @param {BatchImportRowResultUpdateManyAndReturnArgs} args - Arguments to update many BatchImportRowResults.
     * @example
     * // Update many BatchImportRowResults
     * const batchImportRowResult = await prisma.batchImportRowResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BatchImportRowResults and only return the `id`
     * const batchImportRowResultWithIdOnly = await prisma.batchImportRowResult.updateManyAndReturn({
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
    updateManyAndReturn<T extends BatchImportRowResultUpdateManyAndReturnArgs>(args: SelectSubset<T, BatchImportRowResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BatchImportRowResult.
     * @param {BatchImportRowResultUpsertArgs} args - Arguments to update or create a BatchImportRowResult.
     * @example
     * // Update or create a BatchImportRowResult
     * const batchImportRowResult = await prisma.batchImportRowResult.upsert({
     *   create: {
     *     // ... data to create a BatchImportRowResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BatchImportRowResult we want to update
     *   }
     * })
     */
    upsert<T extends BatchImportRowResultUpsertArgs>(args: SelectSubset<T, BatchImportRowResultUpsertArgs<ExtArgs>>): Prisma__BatchImportRowResultClient<$Result.GetResult<Prisma.$BatchImportRowResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BatchImportRowResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultCountArgs} args - Arguments to filter BatchImportRowResults to count.
     * @example
     * // Count the number of BatchImportRowResults
     * const count = await prisma.batchImportRowResult.count({
     *   where: {
     *     // ... the filter for the BatchImportRowResults we want to count
     *   }
     * })
    **/
    count<T extends BatchImportRowResultCountArgs>(
      args?: Subset<T, BatchImportRowResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchImportRowResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BatchImportRowResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BatchImportRowResultAggregateArgs>(args: Subset<T, BatchImportRowResultAggregateArgs>): Prisma.PrismaPromise<GetBatchImportRowResultAggregateType<T>>

    /**
     * Group by BatchImportRowResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchImportRowResultGroupByArgs} args - Group by arguments.
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
      T extends BatchImportRowResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchImportRowResultGroupByArgs['orderBy'] }
        : { orderBy?: BatchImportRowResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BatchImportRowResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchImportRowResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BatchImportRowResult model
   */
  readonly fields: BatchImportRowResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BatchImportRowResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchImportRowResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BatchImportRowResult model
   */
  interface BatchImportRowResultFieldRefs {
    readonly id: FieldRef<"BatchImportRowResult", 'String'>
    readonly tenantId: FieldRef<"BatchImportRowResult", 'String'>
    readonly batchImportJobId: FieldRef<"BatchImportRowResult", 'String'>
    readonly rowNumber: FieldRef<"BatchImportRowResult", 'Int'>
    readonly success: FieldRef<"BatchImportRowResult", 'Boolean'>
    readonly shipmentId: FieldRef<"BatchImportRowResult", 'String'>
    readonly errors: FieldRef<"BatchImportRowResult", 'Json'>
    readonly createdAt: FieldRef<"BatchImportRowResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BatchImportRowResult findUnique
   */
  export type BatchImportRowResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportRowResult to fetch.
     */
    where: BatchImportRowResultWhereUniqueInput
  }

  /**
   * BatchImportRowResult findUniqueOrThrow
   */
  export type BatchImportRowResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportRowResult to fetch.
     */
    where: BatchImportRowResultWhereUniqueInput
  }

  /**
   * BatchImportRowResult findFirst
   */
  export type BatchImportRowResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportRowResult to fetch.
     */
    where?: BatchImportRowResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportRowResults to fetch.
     */
    orderBy?: BatchImportRowResultOrderByWithRelationInput | BatchImportRowResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchImportRowResults.
     */
    cursor?: BatchImportRowResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportRowResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportRowResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchImportRowResults.
     */
    distinct?: BatchImportRowResultScalarFieldEnum | BatchImportRowResultScalarFieldEnum[]
  }

  /**
   * BatchImportRowResult findFirstOrThrow
   */
  export type BatchImportRowResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportRowResult to fetch.
     */
    where?: BatchImportRowResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportRowResults to fetch.
     */
    orderBy?: BatchImportRowResultOrderByWithRelationInput | BatchImportRowResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BatchImportRowResults.
     */
    cursor?: BatchImportRowResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportRowResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportRowResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BatchImportRowResults.
     */
    distinct?: BatchImportRowResultScalarFieldEnum | BatchImportRowResultScalarFieldEnum[]
  }

  /**
   * BatchImportRowResult findMany
   */
  export type BatchImportRowResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter, which BatchImportRowResults to fetch.
     */
    where?: BatchImportRowResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BatchImportRowResults to fetch.
     */
    orderBy?: BatchImportRowResultOrderByWithRelationInput | BatchImportRowResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BatchImportRowResults.
     */
    cursor?: BatchImportRowResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BatchImportRowResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BatchImportRowResults.
     */
    skip?: number
    distinct?: BatchImportRowResultScalarFieldEnum | BatchImportRowResultScalarFieldEnum[]
  }

  /**
   * BatchImportRowResult create
   */
  export type BatchImportRowResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * The data needed to create a BatchImportRowResult.
     */
    data: XOR<BatchImportRowResultCreateInput, BatchImportRowResultUncheckedCreateInput>
  }

  /**
   * BatchImportRowResult createMany
   */
  export type BatchImportRowResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BatchImportRowResults.
     */
    data: BatchImportRowResultCreateManyInput | BatchImportRowResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchImportRowResult createManyAndReturn
   */
  export type BatchImportRowResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * The data used to create many BatchImportRowResults.
     */
    data: BatchImportRowResultCreateManyInput | BatchImportRowResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BatchImportRowResult update
   */
  export type BatchImportRowResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * The data needed to update a BatchImportRowResult.
     */
    data: XOR<BatchImportRowResultUpdateInput, BatchImportRowResultUncheckedUpdateInput>
    /**
     * Choose, which BatchImportRowResult to update.
     */
    where: BatchImportRowResultWhereUniqueInput
  }

  /**
   * BatchImportRowResult updateMany
   */
  export type BatchImportRowResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BatchImportRowResults.
     */
    data: XOR<BatchImportRowResultUpdateManyMutationInput, BatchImportRowResultUncheckedUpdateManyInput>
    /**
     * Filter which BatchImportRowResults to update
     */
    where?: BatchImportRowResultWhereInput
    /**
     * Limit how many BatchImportRowResults to update.
     */
    limit?: number
  }

  /**
   * BatchImportRowResult updateManyAndReturn
   */
  export type BatchImportRowResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * The data used to update BatchImportRowResults.
     */
    data: XOR<BatchImportRowResultUpdateManyMutationInput, BatchImportRowResultUncheckedUpdateManyInput>
    /**
     * Filter which BatchImportRowResults to update
     */
    where?: BatchImportRowResultWhereInput
    /**
     * Limit how many BatchImportRowResults to update.
     */
    limit?: number
  }

  /**
   * BatchImportRowResult upsert
   */
  export type BatchImportRowResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * The filter to search for the BatchImportRowResult to update in case it exists.
     */
    where: BatchImportRowResultWhereUniqueInput
    /**
     * In case the BatchImportRowResult found by the `where` argument doesn't exist, create a new BatchImportRowResult with this data.
     */
    create: XOR<BatchImportRowResultCreateInput, BatchImportRowResultUncheckedCreateInput>
    /**
     * In case the BatchImportRowResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchImportRowResultUpdateInput, BatchImportRowResultUncheckedUpdateInput>
  }

  /**
   * BatchImportRowResult delete
   */
  export type BatchImportRowResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
    /**
     * Filter which BatchImportRowResult to delete.
     */
    where: BatchImportRowResultWhereUniqueInput
  }

  /**
   * BatchImportRowResult deleteMany
   */
  export type BatchImportRowResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BatchImportRowResults to delete
     */
    where?: BatchImportRowResultWhereInput
    /**
     * Limit how many BatchImportRowResults to delete.
     */
    limit?: number
  }

  /**
   * BatchImportRowResult without action
   */
  export type BatchImportRowResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchImportRowResult
     */
    select?: BatchImportRowResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BatchImportRowResult
     */
    omit?: BatchImportRowResultOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ShipmentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    trackingCode: 'trackingCode',
    deliveryOtp: 'deliveryOtp',
    status: 'status',
    priority: 'priority',
    recipientName: 'recipientName',
    recipientPhone: 'recipientPhone',
    recipientAddress: 'recipientAddress',
    recipientLat: 'recipientLat',
    recipientLng: 'recipientLng',
    weightKg: 'weightKg',
    lengthCm: 'lengthCm',
    widthCm: 'widthCm',
    heightCm: 'heightCm',
    deliveryWindowStart: 'deliveryWindowStart',
    deliveryWindowEnd: 'deliveryWindowEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    topic: 'topic',
    eventType: 'eventType',
    payload: 'payload',
    createdAt: 'createdAt',
    publishedAt: 'publishedAt',
    claimedAt: 'claimedAt'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const BatchImportJobScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    fileName: 'fileName',
    status: 'status',
    totalRows: 'totalRows',
    successCount: 'successCount',
    failureCount: 'failureCount',
    errorManifest: 'errorManifest',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type BatchImportJobScalarFieldEnum = (typeof BatchImportJobScalarFieldEnum)[keyof typeof BatchImportJobScalarFieldEnum]


  export const BatchImportRowResultScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    batchImportJobId: 'batchImportJobId',
    rowNumber: 'rowNumber',
    success: 'success',
    shipmentId: 'shipmentId',
    errors: 'errors',
    createdAt: 'createdAt'
  };

  export type BatchImportRowResultScalarFieldEnum = (typeof BatchImportRowResultScalarFieldEnum)[keyof typeof BatchImportRowResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ShipmentStatus'
   */
  export type EnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus'>
    


  /**
   * Reference to a field of type 'ShipmentStatus[]'
   */
  export type ListEnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus[]'>
    


  /**
   * Reference to a field of type 'PriorityTier'
   */
  export type EnumPriorityTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityTier'>
    


  /**
   * Reference to a field of type 'PriorityTier[]'
   */
  export type ListEnumPriorityTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriorityTier[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'BatchImportStatus'
   */
  export type EnumBatchImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchImportStatus'>
    


  /**
   * Reference to a field of type 'BatchImportStatus[]'
   */
  export type ListEnumBatchImportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchImportStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type ShipmentWhereInput = {
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    id?: StringFilter<"Shipment"> | string
    tenantId?: StringFilter<"Shipment"> | string
    trackingCode?: StringFilter<"Shipment"> | string
    deliveryOtp?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFilter<"Shipment"> | $Enums.PriorityTier
    recipientName?: StringFilter<"Shipment"> | string
    recipientPhone?: StringFilter<"Shipment"> | string
    recipientAddress?: StringFilter<"Shipment"> | string
    recipientLat?: FloatNullableFilter<"Shipment"> | number | null
    recipientLng?: FloatNullableFilter<"Shipment"> | number | null
    weightKg?: FloatFilter<"Shipment"> | number
    lengthCm?: FloatFilter<"Shipment"> | number
    widthCm?: FloatFilter<"Shipment"> | number
    heightCm?: FloatFilter<"Shipment"> | number
    deliveryWindowStart?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    deliveryWindowEnd?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
  }

  export type ShipmentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trackingCode?: SortOrder
    deliveryOtp?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    recipientName?: SortOrder
    recipientPhone?: SortOrder
    recipientAddress?: SortOrder
    recipientLat?: SortOrderInput | SortOrder
    recipientLng?: SortOrderInput | SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
    deliveryWindowStart?: SortOrderInput | SortOrder
    deliveryWindowEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trackingCode?: string
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    tenantId?: StringFilter<"Shipment"> | string
    deliveryOtp?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFilter<"Shipment"> | $Enums.PriorityTier
    recipientName?: StringFilter<"Shipment"> | string
    recipientPhone?: StringFilter<"Shipment"> | string
    recipientAddress?: StringFilter<"Shipment"> | string
    recipientLat?: FloatNullableFilter<"Shipment"> | number | null
    recipientLng?: FloatNullableFilter<"Shipment"> | number | null
    weightKg?: FloatFilter<"Shipment"> | number
    lengthCm?: FloatFilter<"Shipment"> | number
    widthCm?: FloatFilter<"Shipment"> | number
    heightCm?: FloatFilter<"Shipment"> | number
    deliveryWindowStart?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    deliveryWindowEnd?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
  }, "id" | "trackingCode">

  export type ShipmentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trackingCode?: SortOrder
    deliveryOtp?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    recipientName?: SortOrder
    recipientPhone?: SortOrder
    recipientAddress?: SortOrder
    recipientLat?: SortOrderInput | SortOrder
    recipientLng?: SortOrderInput | SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
    deliveryWindowStart?: SortOrderInput | SortOrder
    deliveryWindowEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShipmentCountOrderByAggregateInput
    _avg?: ShipmentAvgOrderByAggregateInput
    _max?: ShipmentMaxOrderByAggregateInput
    _min?: ShipmentMinOrderByAggregateInput
    _sum?: ShipmentSumOrderByAggregateInput
  }

  export type ShipmentScalarWhereWithAggregatesInput = {
    AND?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    OR?: ShipmentScalarWhereWithAggregatesInput[]
    NOT?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shipment"> | string
    tenantId?: StringWithAggregatesFilter<"Shipment"> | string
    trackingCode?: StringWithAggregatesFilter<"Shipment"> | string
    deliveryOtp?: StringWithAggregatesFilter<"Shipment"> | string
    status?: EnumShipmentStatusWithAggregatesFilter<"Shipment"> | $Enums.ShipmentStatus
    priority?: EnumPriorityTierWithAggregatesFilter<"Shipment"> | $Enums.PriorityTier
    recipientName?: StringWithAggregatesFilter<"Shipment"> | string
    recipientPhone?: StringWithAggregatesFilter<"Shipment"> | string
    recipientAddress?: StringWithAggregatesFilter<"Shipment"> | string
    recipientLat?: FloatNullableWithAggregatesFilter<"Shipment"> | number | null
    recipientLng?: FloatNullableWithAggregatesFilter<"Shipment"> | number | null
    weightKg?: FloatWithAggregatesFilter<"Shipment"> | number
    lengthCm?: FloatWithAggregatesFilter<"Shipment"> | number
    widthCm?: FloatWithAggregatesFilter<"Shipment"> | number
    heightCm?: FloatWithAggregatesFilter<"Shipment"> | number
    deliveryWindowStart?: DateTimeNullableWithAggregatesFilter<"Shipment"> | Date | string | null
    deliveryWindowEnd?: DateTimeNullableWithAggregatesFilter<"Shipment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
  }

  export type OutboxEventWhereInput = {
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    id?: StringFilter<"OutboxEvent"> | string
    tenantId?: StringFilter<"OutboxEvent"> | string
    topic?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    claimedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    claimedAt?: SortOrderInput | SortOrder
  }

  export type OutboxEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    tenantId?: StringFilter<"OutboxEvent"> | string
    topic?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    claimedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    claimedAt?: SortOrderInput | SortOrder
    _count?: OutboxEventCountOrderByAggregateInput
    _max?: OutboxEventMaxOrderByAggregateInput
    _min?: OutboxEventMinOrderByAggregateInput
  }

  export type OutboxEventScalarWhereWithAggregatesInput = {
    AND?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    OR?: OutboxEventScalarWhereWithAggregatesInput[]
    NOT?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OutboxEvent"> | string
    tenantId?: StringWithAggregatesFilter<"OutboxEvent"> | string
    topic?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    payload?: JsonWithAggregatesFilter<"OutboxEvent">
    createdAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    claimedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
  }

  export type BatchImportJobWhereInput = {
    AND?: BatchImportJobWhereInput | BatchImportJobWhereInput[]
    OR?: BatchImportJobWhereInput[]
    NOT?: BatchImportJobWhereInput | BatchImportJobWhereInput[]
    id?: StringFilter<"BatchImportJob"> | string
    tenantId?: StringFilter<"BatchImportJob"> | string
    fileName?: StringFilter<"BatchImportJob"> | string
    status?: EnumBatchImportStatusFilter<"BatchImportJob"> | $Enums.BatchImportStatus
    totalRows?: IntFilter<"BatchImportJob"> | number
    successCount?: IntFilter<"BatchImportJob"> | number
    failureCount?: IntFilter<"BatchImportJob"> | number
    errorManifest?: JsonNullableFilter<"BatchImportJob">
    createdAt?: DateTimeFilter<"BatchImportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"BatchImportJob"> | Date | string | null
  }

  export type BatchImportJobOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorManifest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
  }

  export type BatchImportJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BatchImportJobWhereInput | BatchImportJobWhereInput[]
    OR?: BatchImportJobWhereInput[]
    NOT?: BatchImportJobWhereInput | BatchImportJobWhereInput[]
    tenantId?: StringFilter<"BatchImportJob"> | string
    fileName?: StringFilter<"BatchImportJob"> | string
    status?: EnumBatchImportStatusFilter<"BatchImportJob"> | $Enums.BatchImportStatus
    totalRows?: IntFilter<"BatchImportJob"> | number
    successCount?: IntFilter<"BatchImportJob"> | number
    failureCount?: IntFilter<"BatchImportJob"> | number
    errorManifest?: JsonNullableFilter<"BatchImportJob">
    createdAt?: DateTimeFilter<"BatchImportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"BatchImportJob"> | Date | string | null
  }, "id">

  export type BatchImportJobOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorManifest?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: BatchImportJobCountOrderByAggregateInput
    _avg?: BatchImportJobAvgOrderByAggregateInput
    _max?: BatchImportJobMaxOrderByAggregateInput
    _min?: BatchImportJobMinOrderByAggregateInput
    _sum?: BatchImportJobSumOrderByAggregateInput
  }

  export type BatchImportJobScalarWhereWithAggregatesInput = {
    AND?: BatchImportJobScalarWhereWithAggregatesInput | BatchImportJobScalarWhereWithAggregatesInput[]
    OR?: BatchImportJobScalarWhereWithAggregatesInput[]
    NOT?: BatchImportJobScalarWhereWithAggregatesInput | BatchImportJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BatchImportJob"> | string
    tenantId?: StringWithAggregatesFilter<"BatchImportJob"> | string
    fileName?: StringWithAggregatesFilter<"BatchImportJob"> | string
    status?: EnumBatchImportStatusWithAggregatesFilter<"BatchImportJob"> | $Enums.BatchImportStatus
    totalRows?: IntWithAggregatesFilter<"BatchImportJob"> | number
    successCount?: IntWithAggregatesFilter<"BatchImportJob"> | number
    failureCount?: IntWithAggregatesFilter<"BatchImportJob"> | number
    errorManifest?: JsonNullableWithAggregatesFilter<"BatchImportJob">
    createdAt?: DateTimeWithAggregatesFilter<"BatchImportJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"BatchImportJob"> | Date | string | null
  }

  export type BatchImportRowResultWhereInput = {
    AND?: BatchImportRowResultWhereInput | BatchImportRowResultWhereInput[]
    OR?: BatchImportRowResultWhereInput[]
    NOT?: BatchImportRowResultWhereInput | BatchImportRowResultWhereInput[]
    id?: StringFilter<"BatchImportRowResult"> | string
    tenantId?: StringFilter<"BatchImportRowResult"> | string
    batchImportJobId?: StringFilter<"BatchImportRowResult"> | string
    rowNumber?: IntFilter<"BatchImportRowResult"> | number
    success?: BoolFilter<"BatchImportRowResult"> | boolean
    shipmentId?: StringNullableFilter<"BatchImportRowResult"> | string | null
    errors?: JsonNullableFilter<"BatchImportRowResult">
    createdAt?: DateTimeFilter<"BatchImportRowResult"> | Date | string
  }

  export type BatchImportRowResultOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    batchImportJobId?: SortOrder
    rowNumber?: SortOrder
    success?: SortOrder
    shipmentId?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type BatchImportRowResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batchImportJobId_rowNumber?: BatchImportRowResultBatchImportJobIdRowNumberCompoundUniqueInput
    AND?: BatchImportRowResultWhereInput | BatchImportRowResultWhereInput[]
    OR?: BatchImportRowResultWhereInput[]
    NOT?: BatchImportRowResultWhereInput | BatchImportRowResultWhereInput[]
    tenantId?: StringFilter<"BatchImportRowResult"> | string
    batchImportJobId?: StringFilter<"BatchImportRowResult"> | string
    rowNumber?: IntFilter<"BatchImportRowResult"> | number
    success?: BoolFilter<"BatchImportRowResult"> | boolean
    shipmentId?: StringNullableFilter<"BatchImportRowResult"> | string | null
    errors?: JsonNullableFilter<"BatchImportRowResult">
    createdAt?: DateTimeFilter<"BatchImportRowResult"> | Date | string
  }, "id" | "batchImportJobId_rowNumber">

  export type BatchImportRowResultOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    batchImportJobId?: SortOrder
    rowNumber?: SortOrder
    success?: SortOrder
    shipmentId?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BatchImportRowResultCountOrderByAggregateInput
    _avg?: BatchImportRowResultAvgOrderByAggregateInput
    _max?: BatchImportRowResultMaxOrderByAggregateInput
    _min?: BatchImportRowResultMinOrderByAggregateInput
    _sum?: BatchImportRowResultSumOrderByAggregateInput
  }

  export type BatchImportRowResultScalarWhereWithAggregatesInput = {
    AND?: BatchImportRowResultScalarWhereWithAggregatesInput | BatchImportRowResultScalarWhereWithAggregatesInput[]
    OR?: BatchImportRowResultScalarWhereWithAggregatesInput[]
    NOT?: BatchImportRowResultScalarWhereWithAggregatesInput | BatchImportRowResultScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BatchImportRowResult"> | string
    tenantId?: StringWithAggregatesFilter<"BatchImportRowResult"> | string
    batchImportJobId?: StringWithAggregatesFilter<"BatchImportRowResult"> | string
    rowNumber?: IntWithAggregatesFilter<"BatchImportRowResult"> | number
    success?: BoolWithAggregatesFilter<"BatchImportRowResult"> | boolean
    shipmentId?: StringNullableWithAggregatesFilter<"BatchImportRowResult"> | string | null
    errors?: JsonNullableWithAggregatesFilter<"BatchImportRowResult">
    createdAt?: DateTimeWithAggregatesFilter<"BatchImportRowResult"> | Date | string
  }

  export type ShipmentCreateInput = {
    id?: string
    tenantId: string
    trackingCode: string
    deliveryOtp: string
    status?: $Enums.ShipmentStatus
    priority?: $Enums.PriorityTier
    recipientName: string
    recipientPhone: string
    recipientAddress: string
    recipientLat?: number | null
    recipientLng?: number | null
    weightKg: number
    lengthCm: number
    widthCm: number
    heightCm: number
    deliveryWindowStart?: Date | string | null
    deliveryWindowEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShipmentUncheckedCreateInput = {
    id?: string
    tenantId: string
    trackingCode: string
    deliveryOtp: string
    status?: $Enums.ShipmentStatus
    priority?: $Enums.PriorityTier
    recipientName: string
    recipientPhone: string
    recipientAddress: string
    recipientLat?: number | null
    recipientLng?: number | null
    weightKg: number
    lengthCm: number
    widthCm: number
    heightCm: number
    deliveryWindowStart?: Date | string | null
    deliveryWindowEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    deliveryOtp?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFieldUpdateOperationsInput | $Enums.PriorityTier
    recipientName?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    recipientAddress?: StringFieldUpdateOperationsInput | string
    recipientLat?: NullableFloatFieldUpdateOperationsInput | number | null
    recipientLng?: NullableFloatFieldUpdateOperationsInput | number | null
    weightKg?: FloatFieldUpdateOperationsInput | number
    lengthCm?: FloatFieldUpdateOperationsInput | number
    widthCm?: FloatFieldUpdateOperationsInput | number
    heightCm?: FloatFieldUpdateOperationsInput | number
    deliveryWindowStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryWindowEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    deliveryOtp?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFieldUpdateOperationsInput | $Enums.PriorityTier
    recipientName?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    recipientAddress?: StringFieldUpdateOperationsInput | string
    recipientLat?: NullableFloatFieldUpdateOperationsInput | number | null
    recipientLng?: NullableFloatFieldUpdateOperationsInput | number | null
    weightKg?: FloatFieldUpdateOperationsInput | number
    lengthCm?: FloatFieldUpdateOperationsInput | number
    widthCm?: FloatFieldUpdateOperationsInput | number
    heightCm?: FloatFieldUpdateOperationsInput | number
    deliveryWindowStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryWindowEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShipmentCreateManyInput = {
    id?: string
    tenantId: string
    trackingCode: string
    deliveryOtp: string
    status?: $Enums.ShipmentStatus
    priority?: $Enums.PriorityTier
    recipientName: string
    recipientPhone: string
    recipientAddress: string
    recipientLat?: number | null
    recipientLng?: number | null
    weightKg: number
    lengthCm: number
    widthCm: number
    heightCm: number
    deliveryWindowStart?: Date | string | null
    deliveryWindowEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    deliveryOtp?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFieldUpdateOperationsInput | $Enums.PriorityTier
    recipientName?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    recipientAddress?: StringFieldUpdateOperationsInput | string
    recipientLat?: NullableFloatFieldUpdateOperationsInput | number | null
    recipientLng?: NullableFloatFieldUpdateOperationsInput | number | null
    weightKg?: FloatFieldUpdateOperationsInput | number
    lengthCm?: FloatFieldUpdateOperationsInput | number
    widthCm?: FloatFieldUpdateOperationsInput | number
    heightCm?: FloatFieldUpdateOperationsInput | number
    deliveryWindowStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryWindowEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trackingCode?: StringFieldUpdateOperationsInput | string
    deliveryOtp?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    priority?: EnumPriorityTierFieldUpdateOperationsInput | $Enums.PriorityTier
    recipientName?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    recipientAddress?: StringFieldUpdateOperationsInput | string
    recipientLat?: NullableFloatFieldUpdateOperationsInput | number | null
    recipientLng?: NullableFloatFieldUpdateOperationsInput | number | null
    weightKg?: FloatFieldUpdateOperationsInput | number
    lengthCm?: FloatFieldUpdateOperationsInput | number
    widthCm?: FloatFieldUpdateOperationsInput | number
    heightCm?: FloatFieldUpdateOperationsInput | number
    deliveryWindowStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveryWindowEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    publishedAt?: Date | string | null
    claimedAt?: Date | string | null
  }

  export type OutboxEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    publishedAt?: Date | string | null
    claimedAt?: Date | string | null
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventCreateManyInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    publishedAt?: Date | string | null
    claimedAt?: Date | string | null
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchImportJobCreateInput = {
    id?: string
    tenantId: string
    fileName: string
    status?: $Enums.BatchImportStatus
    totalRows: number
    successCount?: number
    failureCount?: number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type BatchImportJobUncheckedCreateInput = {
    id?: string
    tenantId: string
    fileName: string
    status?: $Enums.BatchImportStatus
    totalRows: number
    successCount?: number
    failureCount?: number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type BatchImportJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchImportStatusFieldUpdateOperationsInput | $Enums.BatchImportStatus
    totalRows?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchImportJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchImportStatusFieldUpdateOperationsInput | $Enums.BatchImportStatus
    totalRows?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchImportJobCreateManyInput = {
    id?: string
    tenantId: string
    fileName: string
    status?: $Enums.BatchImportStatus
    totalRows: number
    successCount?: number
    failureCount?: number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type BatchImportJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchImportStatusFieldUpdateOperationsInput | $Enums.BatchImportStatus
    totalRows?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchImportJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchImportStatusFieldUpdateOperationsInput | $Enums.BatchImportStatus
    totalRows?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    errorManifest?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchImportRowResultCreateInput = {
    id?: string
    tenantId: string
    batchImportJobId: string
    rowNumber: number
    success: boolean
    shipmentId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type BatchImportRowResultUncheckedCreateInput = {
    id?: string
    tenantId: string
    batchImportJobId: string
    rowNumber: number
    success: boolean
    shipmentId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type BatchImportRowResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    batchImportJobId?: StringFieldUpdateOperationsInput | string
    rowNumber?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchImportRowResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    batchImportJobId?: StringFieldUpdateOperationsInput | string
    rowNumber?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchImportRowResultCreateManyInput = {
    id?: string
    tenantId: string
    batchImportJobId: string
    rowNumber: number
    success: boolean
    shipmentId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type BatchImportRowResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    batchImportJobId?: StringFieldUpdateOperationsInput | string
    rowNumber?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchImportRowResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    batchImportJobId?: StringFieldUpdateOperationsInput | string
    rowNumber?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type EnumPriorityTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityTier | EnumPriorityTierFieldRefInput<$PrismaModel>
    in?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityTierFilter<$PrismaModel> | $Enums.PriorityTier
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShipmentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trackingCode?: SortOrder
    deliveryOtp?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    recipientName?: SortOrder
    recipientPhone?: SortOrder
    recipientAddress?: SortOrder
    recipientLat?: SortOrder
    recipientLng?: SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
    deliveryWindowStart?: SortOrder
    deliveryWindowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShipmentAvgOrderByAggregateInput = {
    recipientLat?: SortOrder
    recipientLng?: SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
  }

  export type ShipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trackingCode?: SortOrder
    deliveryOtp?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    recipientName?: SortOrder
    recipientPhone?: SortOrder
    recipientAddress?: SortOrder
    recipientLat?: SortOrder
    recipientLng?: SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
    deliveryWindowStart?: SortOrder
    deliveryWindowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShipmentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trackingCode?: SortOrder
    deliveryOtp?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    recipientName?: SortOrder
    recipientPhone?: SortOrder
    recipientAddress?: SortOrder
    recipientLat?: SortOrder
    recipientLng?: SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
    deliveryWindowStart?: SortOrder
    deliveryWindowEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShipmentSumOrderByAggregateInput = {
    recipientLat?: SortOrder
    recipientLng?: SortOrder
    weightKg?: SortOrder
    lengthCm?: SortOrder
    widthCm?: SortOrder
    heightCm?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
  }

  export type EnumPriorityTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityTier | EnumPriorityTierFieldRefInput<$PrismaModel>
    in?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityTierWithAggregatesFilter<$PrismaModel> | $Enums.PriorityTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityTierFilter<$PrismaModel>
    _max?: NestedEnumPriorityTierFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OutboxEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    claimedAt?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    claimedAt?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    claimedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumBatchImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchImportStatus | EnumBatchImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchImportStatusFilter<$PrismaModel> | $Enums.BatchImportStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BatchImportJobCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    errorManifest?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type BatchImportJobAvgOrderByAggregateInput = {
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
  }

  export type BatchImportJobMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type BatchImportJobMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type BatchImportJobSumOrderByAggregateInput = {
    totalRows?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
  }

  export type EnumBatchImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchImportStatus | EnumBatchImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchImportStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchImportStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BatchImportRowResultBatchImportJobIdRowNumberCompoundUniqueInput = {
    batchImportJobId: string
    rowNumber: number
  }

  export type BatchImportRowResultCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    batchImportJobId?: SortOrder
    rowNumber?: SortOrder
    success?: SortOrder
    shipmentId?: SortOrder
    errors?: SortOrder
    createdAt?: SortOrder
  }

  export type BatchImportRowResultAvgOrderByAggregateInput = {
    rowNumber?: SortOrder
  }

  export type BatchImportRowResultMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    batchImportJobId?: SortOrder
    rowNumber?: SortOrder
    success?: SortOrder
    shipmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type BatchImportRowResultMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    batchImportJobId?: SortOrder
    rowNumber?: SortOrder
    success?: SortOrder
    shipmentId?: SortOrder
    createdAt?: SortOrder
  }

  export type BatchImportRowResultSumOrderByAggregateInput = {
    rowNumber?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumShipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentStatus
  }

  export type EnumPriorityTierFieldUpdateOperationsInput = {
    set?: $Enums.PriorityTier
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
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

  export type EnumBatchImportStatusFieldUpdateOperationsInput = {
    set?: $Enums.BatchImportStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type NestedEnumPriorityTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityTier | EnumPriorityTierFieldRefInput<$PrismaModel>
    in?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityTierFilter<$PrismaModel> | $Enums.PriorityTier
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPriorityTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriorityTier | EnumPriorityTierFieldRefInput<$PrismaModel>
    in?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriorityTier[] | ListEnumPriorityTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityTierWithAggregatesFilter<$PrismaModel> | $Enums.PriorityTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityTierFilter<$PrismaModel>
    _max?: NestedEnumPriorityTierFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumBatchImportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchImportStatus | EnumBatchImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchImportStatusFilter<$PrismaModel> | $Enums.BatchImportStatus
  }

  export type NestedEnumBatchImportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchImportStatus | EnumBatchImportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchImportStatus[] | ListEnumBatchImportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchImportStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchImportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchImportStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchImportStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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