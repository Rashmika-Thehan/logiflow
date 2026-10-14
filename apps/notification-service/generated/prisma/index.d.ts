
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
 * Model NotificationLog
 * 
 */
export type NotificationLog = $Result.DefaultSelection<Prisma.$NotificationLogPayload>
/**
 * Model InAppNotification
 * 
 */
export type InAppNotification = $Result.DefaultSelection<Prisma.$InAppNotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NotificationStatus: {
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const AlertSeverity: {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]

}

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

export type AlertSeverity = $Enums.AlertSeverity

export const AlertSeverity: typeof $Enums.AlertSeverity

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more NotificationLogs
 * const notificationLogs = await prisma.notificationLog.findMany()
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
   * // Fetch zero or more NotificationLogs
   * const notificationLogs = await prisma.notificationLog.findMany()
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
   * `prisma.notificationLog`: Exposes CRUD operations for the **NotificationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationLogs
    * const notificationLogs = await prisma.notificationLog.findMany()
    * ```
    */
  get notificationLog(): Prisma.NotificationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inAppNotification`: Exposes CRUD operations for the **InAppNotification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InAppNotifications
    * const inAppNotifications = await prisma.inAppNotification.findMany()
    * ```
    */
  get inAppNotification(): Prisma.InAppNotificationDelegate<ExtArgs, ClientOptions>;
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
    NotificationLog: 'NotificationLog',
    InAppNotification: 'InAppNotification'
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
      modelProps: "notificationLog" | "inAppNotification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      NotificationLog: {
        payload: Prisma.$NotificationLogPayload<ExtArgs>
        fields: Prisma.NotificationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          findMany: {
            args: Prisma.NotificationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          create: {
            args: Prisma.NotificationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          createMany: {
            args: Prisma.NotificationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          delete: {
            args: Prisma.NotificationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          update: {
            args: Prisma.NotificationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>[]
          }
          upsert: {
            args: Prisma.NotificationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationLog>
          }
          groupBy: {
            args: Prisma.NotificationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationLogCountAggregateOutputType> | number
          }
        }
      }
      InAppNotification: {
        payload: Prisma.$InAppNotificationPayload<ExtArgs>
        fields: Prisma.InAppNotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InAppNotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InAppNotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          findFirst: {
            args: Prisma.InAppNotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InAppNotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          findMany: {
            args: Prisma.InAppNotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>[]
          }
          create: {
            args: Prisma.InAppNotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          createMany: {
            args: Prisma.InAppNotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InAppNotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>[]
          }
          delete: {
            args: Prisma.InAppNotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          update: {
            args: Prisma.InAppNotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          deleteMany: {
            args: Prisma.InAppNotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InAppNotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InAppNotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>[]
          }
          upsert: {
            args: Prisma.InAppNotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InAppNotificationPayload>
          }
          aggregate: {
            args: Prisma.InAppNotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInAppNotification>
          }
          groupBy: {
            args: Prisma.InAppNotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InAppNotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InAppNotificationCountArgs<ExtArgs>
            result: $Utils.Optional<InAppNotificationCountAggregateOutputType> | number
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
    notificationLog?: NotificationLogOmit
    inAppNotification?: InAppNotificationOmit
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
   * Model NotificationLog
   */

  export type AggregateNotificationLog = {
    _count: NotificationLogCountAggregateOutputType | null
    _avg: NotificationLogAvgAggregateOutputType | null
    _sum: NotificationLogSumAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  export type NotificationLogAvgAggregateOutputType = {
    attempts: number | null
  }

  export type NotificationLogSumAggregateOutputType = {
    attempts: number | null
  }

  export type NotificationLogMinAggregateOutputType = {
    id: string | null
    dedupeKey: string | null
    tenantId: string | null
    channel: string | null
    template: string | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    attempts: number | null
    lastError: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationLogMaxAggregateOutputType = {
    id: string | null
    dedupeKey: string | null
    tenantId: string | null
    channel: string | null
    template: string | null
    recipient: string | null
    status: $Enums.NotificationStatus | null
    attempts: number | null
    lastError: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationLogCountAggregateOutputType = {
    id: number
    dedupeKey: number
    tenantId: number
    channel: number
    template: number
    recipient: number
    status: number
    attempts: number
    lastError: number
    sentAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationLogAvgAggregateInputType = {
    attempts?: true
  }

  export type NotificationLogSumAggregateInputType = {
    attempts?: true
  }

  export type NotificationLogMinAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    channel?: true
    template?: true
    recipient?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationLogMaxAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    channel?: true
    template?: true
    recipient?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationLogCountAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    channel?: true
    template?: true
    recipient?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLog to aggregate.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationLogs
    **/
    _count?: true | NotificationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationLogMaxAggregateInputType
  }

  export type GetNotificationLogAggregateType<T extends NotificationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationLog[P]>
      : GetScalarType<T[P], AggregateNotificationLog[P]>
  }




  export type NotificationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationLogWhereInput
    orderBy?: NotificationLogOrderByWithAggregationInput | NotificationLogOrderByWithAggregationInput[]
    by: NotificationLogScalarFieldEnum[] | NotificationLogScalarFieldEnum
    having?: NotificationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationLogCountAggregateInputType | true
    _avg?: NotificationLogAvgAggregateInputType
    _sum?: NotificationLogSumAggregateInputType
    _min?: NotificationLogMinAggregateInputType
    _max?: NotificationLogMaxAggregateInputType
  }

  export type NotificationLogGroupByOutputType = {
    id: string
    dedupeKey: string
    tenantId: string
    channel: string
    template: string
    recipient: string
    status: $Enums.NotificationStatus
    attempts: number
    lastError: string | null
    sentAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationLogCountAggregateOutputType | null
    _avg: NotificationLogAvgAggregateOutputType | null
    _sum: NotificationLogSumAggregateOutputType | null
    _min: NotificationLogMinAggregateOutputType | null
    _max: NotificationLogMaxAggregateOutputType | null
  }

  type GetNotificationLogGroupByPayload<T extends NotificationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    channel?: boolean
    template?: boolean
    recipient?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    channel?: boolean
    template?: boolean
    recipient?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    channel?: boolean
    template?: boolean
    recipient?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationLog"]>

  export type NotificationLogSelectScalar = {
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    channel?: boolean
    template?: boolean
    recipient?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dedupeKey" | "tenantId" | "channel" | "template" | "recipient" | "status" | "attempts" | "lastError" | "sentAt" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationLog"]>

  export type $NotificationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dedupeKey: string
      tenantId: string
      channel: string
      template: string
      recipient: string
      status: $Enums.NotificationStatus
      attempts: number
      lastError: string | null
      sentAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationLog"]>
    composites: {}
  }

  type NotificationLogGetPayload<S extends boolean | null | undefined | NotificationLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationLogPayload, S>

  type NotificationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationLogCountAggregateInputType | true
    }

  export interface NotificationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationLog'], meta: { name: 'NotificationLog' } }
    /**
     * Find zero or one NotificationLog that matches the filter.
     * @param {NotificationLogFindUniqueArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationLogFindUniqueArgs>(args: SelectSubset<T, NotificationLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationLogFindFirstArgs>(args?: SelectSubset<T, NotificationLogFindFirstArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindFirstOrThrowArgs} args - Arguments to find a NotificationLog
     * @example
     * // Get one NotificationLog
     * const notificationLog = await prisma.notificationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany()
     * 
     * // Get first 10 NotificationLogs
     * const notificationLogs = await prisma.notificationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationLogFindManyArgs>(args?: SelectSubset<T, NotificationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationLog.
     * @param {NotificationLogCreateArgs} args - Arguments to create a NotificationLog.
     * @example
     * // Create one NotificationLog
     * const NotificationLog = await prisma.notificationLog.create({
     *   data: {
     *     // ... data to create a NotificationLog
     *   }
     * })
     * 
     */
    create<T extends NotificationLogCreateArgs>(args: SelectSubset<T, NotificationLogCreateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationLogs.
     * @param {NotificationLogCreateManyArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationLogCreateManyArgs>(args?: SelectSubset<T, NotificationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationLogs and returns the data saved in the database.
     * @param {NotificationLogCreateManyAndReturnArgs} args - Arguments to create many NotificationLogs.
     * @example
     * // Create many NotificationLogs
     * const notificationLog = await prisma.notificationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationLog.
     * @param {NotificationLogDeleteArgs} args - Arguments to delete one NotificationLog.
     * @example
     * // Delete one NotificationLog
     * const NotificationLog = await prisma.notificationLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationLogDeleteArgs>(args: SelectSubset<T, NotificationLogDeleteArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationLog.
     * @param {NotificationLogUpdateArgs} args - Arguments to update one NotificationLog.
     * @example
     * // Update one NotificationLog
     * const notificationLog = await prisma.notificationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationLogUpdateArgs>(args: SelectSubset<T, NotificationLogUpdateArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationLogs.
     * @param {NotificationLogDeleteManyArgs} args - Arguments to filter NotificationLogs to delete.
     * @example
     * // Delete a few NotificationLogs
     * const { count } = await prisma.notificationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationLogDeleteManyArgs>(args?: SelectSubset<T, NotificationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationLogUpdateManyArgs>(args: SelectSubset<T, NotificationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationLogs and returns the data updated in the database.
     * @param {NotificationLogUpdateManyAndReturnArgs} args - Arguments to update many NotificationLogs.
     * @example
     * // Update many NotificationLogs
     * const notificationLog = await prisma.notificationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationLogs and only return the `id`
     * const notificationLogWithIdOnly = await prisma.notificationLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationLog.
     * @param {NotificationLogUpsertArgs} args - Arguments to update or create a NotificationLog.
     * @example
     * // Update or create a NotificationLog
     * const notificationLog = await prisma.notificationLog.upsert({
     *   create: {
     *     // ... data to create a NotificationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationLogUpsertArgs>(args: SelectSubset<T, NotificationLogUpsertArgs<ExtArgs>>): Prisma__NotificationLogClient<$Result.GetResult<Prisma.$NotificationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogCountArgs} args - Arguments to filter NotificationLogs to count.
     * @example
     * // Count the number of NotificationLogs
     * const count = await prisma.notificationLog.count({
     *   where: {
     *     // ... the filter for the NotificationLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationLogCountArgs>(
      args?: Subset<T, NotificationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationLogAggregateArgs>(args: Subset<T, NotificationLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationLogAggregateType<T>>

    /**
     * Group by NotificationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationLogGroupByArgs} args - Group by arguments.
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
      T extends NotificationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationLog model
   */
  readonly fields: NotificationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NotificationLog model
   */
  interface NotificationLogFieldRefs {
    readonly id: FieldRef<"NotificationLog", 'String'>
    readonly dedupeKey: FieldRef<"NotificationLog", 'String'>
    readonly tenantId: FieldRef<"NotificationLog", 'String'>
    readonly channel: FieldRef<"NotificationLog", 'String'>
    readonly template: FieldRef<"NotificationLog", 'String'>
    readonly recipient: FieldRef<"NotificationLog", 'String'>
    readonly status: FieldRef<"NotificationLog", 'NotificationStatus'>
    readonly attempts: FieldRef<"NotificationLog", 'Int'>
    readonly lastError: FieldRef<"NotificationLog", 'String'>
    readonly sentAt: FieldRef<"NotificationLog", 'DateTime'>
    readonly createdAt: FieldRef<"NotificationLog", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationLog findUnique
   */
  export type NotificationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findUniqueOrThrow
   */
  export type NotificationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog findFirst
   */
  export type NotificationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findFirstOrThrow
   */
  export type NotificationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLog to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationLogs.
     */
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog findMany
   */
  export type NotificationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter, which NotificationLogs to fetch.
     */
    where?: NotificationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationLogs to fetch.
     */
    orderBy?: NotificationLogOrderByWithRelationInput | NotificationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationLogs.
     */
    cursor?: NotificationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationLogs.
     */
    skip?: number
    distinct?: NotificationLogScalarFieldEnum | NotificationLogScalarFieldEnum[]
  }

  /**
   * NotificationLog create
   */
  export type NotificationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationLog.
     */
    data: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
  }

  /**
   * NotificationLog createMany
   */
  export type NotificationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog createManyAndReturn
   */
  export type NotificationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationLogs.
     */
    data: NotificationLogCreateManyInput | NotificationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationLog update
   */
  export type NotificationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationLog.
     */
    data: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationLog to update.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog updateMany
   */
  export type NotificationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog updateManyAndReturn
   */
  export type NotificationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The data used to update NotificationLogs.
     */
    data: XOR<NotificationLogUpdateManyMutationInput, NotificationLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationLogs to update
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to update.
     */
    limit?: number
  }

  /**
   * NotificationLog upsert
   */
  export type NotificationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationLog to update in case it exists.
     */
    where: NotificationLogWhereUniqueInput
    /**
     * In case the NotificationLog found by the `where` argument doesn't exist, create a new NotificationLog with this data.
     */
    create: XOR<NotificationLogCreateInput, NotificationLogUncheckedCreateInput>
    /**
     * In case the NotificationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationLogUpdateInput, NotificationLogUncheckedUpdateInput>
  }

  /**
   * NotificationLog delete
   */
  export type NotificationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
    /**
     * Filter which NotificationLog to delete.
     */
    where: NotificationLogWhereUniqueInput
  }

  /**
   * NotificationLog deleteMany
   */
  export type NotificationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationLogs to delete
     */
    where?: NotificationLogWhereInput
    /**
     * Limit how many NotificationLogs to delete.
     */
    limit?: number
  }

  /**
   * NotificationLog without action
   */
  export type NotificationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationLog
     */
    select?: NotificationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationLog
     */
    omit?: NotificationLogOmit<ExtArgs> | null
  }


  /**
   * Model InAppNotification
   */

  export type AggregateInAppNotification = {
    _count: InAppNotificationCountAggregateOutputType | null
    _min: InAppNotificationMinAggregateOutputType | null
    _max: InAppNotificationMaxAggregateOutputType | null
  }

  export type InAppNotificationMinAggregateOutputType = {
    id: string | null
    dedupeKey: string | null
    tenantId: string | null
    severity: $Enums.AlertSeverity | null
    title: string | null
    body: string | null
    shipmentId: string | null
    acknowledgedAt: Date | null
    acknowledgedById: string | null
    createdAt: Date | null
  }

  export type InAppNotificationMaxAggregateOutputType = {
    id: string | null
    dedupeKey: string | null
    tenantId: string | null
    severity: $Enums.AlertSeverity | null
    title: string | null
    body: string | null
    shipmentId: string | null
    acknowledgedAt: Date | null
    acknowledgedById: string | null
    createdAt: Date | null
  }

  export type InAppNotificationCountAggregateOutputType = {
    id: number
    dedupeKey: number
    tenantId: number
    severity: number
    title: number
    body: number
    shipmentId: number
    acknowledgedAt: number
    acknowledgedById: number
    createdAt: number
    _all: number
  }


  export type InAppNotificationMinAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    severity?: true
    title?: true
    body?: true
    shipmentId?: true
    acknowledgedAt?: true
    acknowledgedById?: true
    createdAt?: true
  }

  export type InAppNotificationMaxAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    severity?: true
    title?: true
    body?: true
    shipmentId?: true
    acknowledgedAt?: true
    acknowledgedById?: true
    createdAt?: true
  }

  export type InAppNotificationCountAggregateInputType = {
    id?: true
    dedupeKey?: true
    tenantId?: true
    severity?: true
    title?: true
    body?: true
    shipmentId?: true
    acknowledgedAt?: true
    acknowledgedById?: true
    createdAt?: true
    _all?: true
  }

  export type InAppNotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InAppNotification to aggregate.
     */
    where?: InAppNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InAppNotifications to fetch.
     */
    orderBy?: InAppNotificationOrderByWithRelationInput | InAppNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InAppNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InAppNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InAppNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InAppNotifications
    **/
    _count?: true | InAppNotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InAppNotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InAppNotificationMaxAggregateInputType
  }

  export type GetInAppNotificationAggregateType<T extends InAppNotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateInAppNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInAppNotification[P]>
      : GetScalarType<T[P], AggregateInAppNotification[P]>
  }




  export type InAppNotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InAppNotificationWhereInput
    orderBy?: InAppNotificationOrderByWithAggregationInput | InAppNotificationOrderByWithAggregationInput[]
    by: InAppNotificationScalarFieldEnum[] | InAppNotificationScalarFieldEnum
    having?: InAppNotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InAppNotificationCountAggregateInputType | true
    _min?: InAppNotificationMinAggregateInputType
    _max?: InAppNotificationMaxAggregateInputType
  }

  export type InAppNotificationGroupByOutputType = {
    id: string
    dedupeKey: string
    tenantId: string
    severity: $Enums.AlertSeverity
    title: string
    body: string
    shipmentId: string | null
    acknowledgedAt: Date | null
    acknowledgedById: string | null
    createdAt: Date
    _count: InAppNotificationCountAggregateOutputType | null
    _min: InAppNotificationMinAggregateOutputType | null
    _max: InAppNotificationMaxAggregateOutputType | null
  }

  type GetInAppNotificationGroupByPayload<T extends InAppNotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InAppNotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InAppNotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InAppNotificationGroupByOutputType[P]>
            : GetScalarType<T[P], InAppNotificationGroupByOutputType[P]>
        }
      >
    >


  export type InAppNotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    severity?: boolean
    title?: boolean
    body?: boolean
    shipmentId?: boolean
    acknowledgedAt?: boolean
    acknowledgedById?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inAppNotification"]>

  export type InAppNotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    severity?: boolean
    title?: boolean
    body?: boolean
    shipmentId?: boolean
    acknowledgedAt?: boolean
    acknowledgedById?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inAppNotification"]>

  export type InAppNotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    severity?: boolean
    title?: boolean
    body?: boolean
    shipmentId?: boolean
    acknowledgedAt?: boolean
    acknowledgedById?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inAppNotification"]>

  export type InAppNotificationSelectScalar = {
    id?: boolean
    dedupeKey?: boolean
    tenantId?: boolean
    severity?: boolean
    title?: boolean
    body?: boolean
    shipmentId?: boolean
    acknowledgedAt?: boolean
    acknowledgedById?: boolean
    createdAt?: boolean
  }

  export type InAppNotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dedupeKey" | "tenantId" | "severity" | "title" | "body" | "shipmentId" | "acknowledgedAt" | "acknowledgedById" | "createdAt", ExtArgs["result"]["inAppNotification"]>

  export type $InAppNotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InAppNotification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dedupeKey: string
      tenantId: string
      severity: $Enums.AlertSeverity
      title: string
      body: string
      shipmentId: string | null
      acknowledgedAt: Date | null
      acknowledgedById: string | null
      createdAt: Date
    }, ExtArgs["result"]["inAppNotification"]>
    composites: {}
  }

  type InAppNotificationGetPayload<S extends boolean | null | undefined | InAppNotificationDefaultArgs> = $Result.GetResult<Prisma.$InAppNotificationPayload, S>

  type InAppNotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InAppNotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InAppNotificationCountAggregateInputType | true
    }

  export interface InAppNotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InAppNotification'], meta: { name: 'InAppNotification' } }
    /**
     * Find zero or one InAppNotification that matches the filter.
     * @param {InAppNotificationFindUniqueArgs} args - Arguments to find a InAppNotification
     * @example
     * // Get one InAppNotification
     * const inAppNotification = await prisma.inAppNotification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InAppNotificationFindUniqueArgs>(args: SelectSubset<T, InAppNotificationFindUniqueArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InAppNotification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InAppNotificationFindUniqueOrThrowArgs} args - Arguments to find a InAppNotification
     * @example
     * // Get one InAppNotification
     * const inAppNotification = await prisma.inAppNotification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InAppNotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, InAppNotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InAppNotification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationFindFirstArgs} args - Arguments to find a InAppNotification
     * @example
     * // Get one InAppNotification
     * const inAppNotification = await prisma.inAppNotification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InAppNotificationFindFirstArgs>(args?: SelectSubset<T, InAppNotificationFindFirstArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InAppNotification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationFindFirstOrThrowArgs} args - Arguments to find a InAppNotification
     * @example
     * // Get one InAppNotification
     * const inAppNotification = await prisma.inAppNotification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InAppNotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, InAppNotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InAppNotifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InAppNotifications
     * const inAppNotifications = await prisma.inAppNotification.findMany()
     * 
     * // Get first 10 InAppNotifications
     * const inAppNotifications = await prisma.inAppNotification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inAppNotificationWithIdOnly = await prisma.inAppNotification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InAppNotificationFindManyArgs>(args?: SelectSubset<T, InAppNotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InAppNotification.
     * @param {InAppNotificationCreateArgs} args - Arguments to create a InAppNotification.
     * @example
     * // Create one InAppNotification
     * const InAppNotification = await prisma.inAppNotification.create({
     *   data: {
     *     // ... data to create a InAppNotification
     *   }
     * })
     * 
     */
    create<T extends InAppNotificationCreateArgs>(args: SelectSubset<T, InAppNotificationCreateArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InAppNotifications.
     * @param {InAppNotificationCreateManyArgs} args - Arguments to create many InAppNotifications.
     * @example
     * // Create many InAppNotifications
     * const inAppNotification = await prisma.inAppNotification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InAppNotificationCreateManyArgs>(args?: SelectSubset<T, InAppNotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InAppNotifications and returns the data saved in the database.
     * @param {InAppNotificationCreateManyAndReturnArgs} args - Arguments to create many InAppNotifications.
     * @example
     * // Create many InAppNotifications
     * const inAppNotification = await prisma.inAppNotification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InAppNotifications and only return the `id`
     * const inAppNotificationWithIdOnly = await prisma.inAppNotification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InAppNotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, InAppNotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InAppNotification.
     * @param {InAppNotificationDeleteArgs} args - Arguments to delete one InAppNotification.
     * @example
     * // Delete one InAppNotification
     * const InAppNotification = await prisma.inAppNotification.delete({
     *   where: {
     *     // ... filter to delete one InAppNotification
     *   }
     * })
     * 
     */
    delete<T extends InAppNotificationDeleteArgs>(args: SelectSubset<T, InAppNotificationDeleteArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InAppNotification.
     * @param {InAppNotificationUpdateArgs} args - Arguments to update one InAppNotification.
     * @example
     * // Update one InAppNotification
     * const inAppNotification = await prisma.inAppNotification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InAppNotificationUpdateArgs>(args: SelectSubset<T, InAppNotificationUpdateArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InAppNotifications.
     * @param {InAppNotificationDeleteManyArgs} args - Arguments to filter InAppNotifications to delete.
     * @example
     * // Delete a few InAppNotifications
     * const { count } = await prisma.inAppNotification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InAppNotificationDeleteManyArgs>(args?: SelectSubset<T, InAppNotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InAppNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InAppNotifications
     * const inAppNotification = await prisma.inAppNotification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InAppNotificationUpdateManyArgs>(args: SelectSubset<T, InAppNotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InAppNotifications and returns the data updated in the database.
     * @param {InAppNotificationUpdateManyAndReturnArgs} args - Arguments to update many InAppNotifications.
     * @example
     * // Update many InAppNotifications
     * const inAppNotification = await prisma.inAppNotification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InAppNotifications and only return the `id`
     * const inAppNotificationWithIdOnly = await prisma.inAppNotification.updateManyAndReturn({
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
    updateManyAndReturn<T extends InAppNotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, InAppNotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InAppNotification.
     * @param {InAppNotificationUpsertArgs} args - Arguments to update or create a InAppNotification.
     * @example
     * // Update or create a InAppNotification
     * const inAppNotification = await prisma.inAppNotification.upsert({
     *   create: {
     *     // ... data to create a InAppNotification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InAppNotification we want to update
     *   }
     * })
     */
    upsert<T extends InAppNotificationUpsertArgs>(args: SelectSubset<T, InAppNotificationUpsertArgs<ExtArgs>>): Prisma__InAppNotificationClient<$Result.GetResult<Prisma.$InAppNotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InAppNotifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationCountArgs} args - Arguments to filter InAppNotifications to count.
     * @example
     * // Count the number of InAppNotifications
     * const count = await prisma.inAppNotification.count({
     *   where: {
     *     // ... the filter for the InAppNotifications we want to count
     *   }
     * })
    **/
    count<T extends InAppNotificationCountArgs>(
      args?: Subset<T, InAppNotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InAppNotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InAppNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InAppNotificationAggregateArgs>(args: Subset<T, InAppNotificationAggregateArgs>): Prisma.PrismaPromise<GetInAppNotificationAggregateType<T>>

    /**
     * Group by InAppNotification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InAppNotificationGroupByArgs} args - Group by arguments.
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
      T extends InAppNotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InAppNotificationGroupByArgs['orderBy'] }
        : { orderBy?: InAppNotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InAppNotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInAppNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InAppNotification model
   */
  readonly fields: InAppNotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InAppNotification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InAppNotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the InAppNotification model
   */
  interface InAppNotificationFieldRefs {
    readonly id: FieldRef<"InAppNotification", 'String'>
    readonly dedupeKey: FieldRef<"InAppNotification", 'String'>
    readonly tenantId: FieldRef<"InAppNotification", 'String'>
    readonly severity: FieldRef<"InAppNotification", 'AlertSeverity'>
    readonly title: FieldRef<"InAppNotification", 'String'>
    readonly body: FieldRef<"InAppNotification", 'String'>
    readonly shipmentId: FieldRef<"InAppNotification", 'String'>
    readonly acknowledgedAt: FieldRef<"InAppNotification", 'DateTime'>
    readonly acknowledgedById: FieldRef<"InAppNotification", 'String'>
    readonly createdAt: FieldRef<"InAppNotification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InAppNotification findUnique
   */
  export type InAppNotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter, which InAppNotification to fetch.
     */
    where: InAppNotificationWhereUniqueInput
  }

  /**
   * InAppNotification findUniqueOrThrow
   */
  export type InAppNotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter, which InAppNotification to fetch.
     */
    where: InAppNotificationWhereUniqueInput
  }

  /**
   * InAppNotification findFirst
   */
  export type InAppNotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter, which InAppNotification to fetch.
     */
    where?: InAppNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InAppNotifications to fetch.
     */
    orderBy?: InAppNotificationOrderByWithRelationInput | InAppNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InAppNotifications.
     */
    cursor?: InAppNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InAppNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InAppNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InAppNotifications.
     */
    distinct?: InAppNotificationScalarFieldEnum | InAppNotificationScalarFieldEnum[]
  }

  /**
   * InAppNotification findFirstOrThrow
   */
  export type InAppNotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter, which InAppNotification to fetch.
     */
    where?: InAppNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InAppNotifications to fetch.
     */
    orderBy?: InAppNotificationOrderByWithRelationInput | InAppNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InAppNotifications.
     */
    cursor?: InAppNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InAppNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InAppNotifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InAppNotifications.
     */
    distinct?: InAppNotificationScalarFieldEnum | InAppNotificationScalarFieldEnum[]
  }

  /**
   * InAppNotification findMany
   */
  export type InAppNotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter, which InAppNotifications to fetch.
     */
    where?: InAppNotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InAppNotifications to fetch.
     */
    orderBy?: InAppNotificationOrderByWithRelationInput | InAppNotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InAppNotifications.
     */
    cursor?: InAppNotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InAppNotifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InAppNotifications.
     */
    skip?: number
    distinct?: InAppNotificationScalarFieldEnum | InAppNotificationScalarFieldEnum[]
  }

  /**
   * InAppNotification create
   */
  export type InAppNotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a InAppNotification.
     */
    data: XOR<InAppNotificationCreateInput, InAppNotificationUncheckedCreateInput>
  }

  /**
   * InAppNotification createMany
   */
  export type InAppNotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InAppNotifications.
     */
    data: InAppNotificationCreateManyInput | InAppNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InAppNotification createManyAndReturn
   */
  export type InAppNotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * The data used to create many InAppNotifications.
     */
    data: InAppNotificationCreateManyInput | InAppNotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InAppNotification update
   */
  export type InAppNotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a InAppNotification.
     */
    data: XOR<InAppNotificationUpdateInput, InAppNotificationUncheckedUpdateInput>
    /**
     * Choose, which InAppNotification to update.
     */
    where: InAppNotificationWhereUniqueInput
  }

  /**
   * InAppNotification updateMany
   */
  export type InAppNotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InAppNotifications.
     */
    data: XOR<InAppNotificationUpdateManyMutationInput, InAppNotificationUncheckedUpdateManyInput>
    /**
     * Filter which InAppNotifications to update
     */
    where?: InAppNotificationWhereInput
    /**
     * Limit how many InAppNotifications to update.
     */
    limit?: number
  }

  /**
   * InAppNotification updateManyAndReturn
   */
  export type InAppNotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * The data used to update InAppNotifications.
     */
    data: XOR<InAppNotificationUpdateManyMutationInput, InAppNotificationUncheckedUpdateManyInput>
    /**
     * Filter which InAppNotifications to update
     */
    where?: InAppNotificationWhereInput
    /**
     * Limit how many InAppNotifications to update.
     */
    limit?: number
  }

  /**
   * InAppNotification upsert
   */
  export type InAppNotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the InAppNotification to update in case it exists.
     */
    where: InAppNotificationWhereUniqueInput
    /**
     * In case the InAppNotification found by the `where` argument doesn't exist, create a new InAppNotification with this data.
     */
    create: XOR<InAppNotificationCreateInput, InAppNotificationUncheckedCreateInput>
    /**
     * In case the InAppNotification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InAppNotificationUpdateInput, InAppNotificationUncheckedUpdateInput>
  }

  /**
   * InAppNotification delete
   */
  export type InAppNotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
    /**
     * Filter which InAppNotification to delete.
     */
    where: InAppNotificationWhereUniqueInput
  }

  /**
   * InAppNotification deleteMany
   */
  export type InAppNotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InAppNotifications to delete
     */
    where?: InAppNotificationWhereInput
    /**
     * Limit how many InAppNotifications to delete.
     */
    limit?: number
  }

  /**
   * InAppNotification without action
   */
  export type InAppNotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InAppNotification
     */
    select?: InAppNotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InAppNotification
     */
    omit?: InAppNotificationOmit<ExtArgs> | null
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


  export const NotificationLogScalarFieldEnum: {
    id: 'id',
    dedupeKey: 'dedupeKey',
    tenantId: 'tenantId',
    channel: 'channel',
    template: 'template',
    recipient: 'recipient',
    status: 'status',
    attempts: 'attempts',
    lastError: 'lastError',
    sentAt: 'sentAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationLogScalarFieldEnum = (typeof NotificationLogScalarFieldEnum)[keyof typeof NotificationLogScalarFieldEnum]


  export const InAppNotificationScalarFieldEnum: {
    id: 'id',
    dedupeKey: 'dedupeKey',
    tenantId: 'tenantId',
    severity: 'severity',
    title: 'title',
    body: 'body',
    shipmentId: 'shipmentId',
    acknowledgedAt: 'acknowledgedAt',
    acknowledgedById: 'acknowledgedById',
    createdAt: 'createdAt'
  };

  export type InAppNotificationScalarFieldEnum = (typeof InAppNotificationScalarFieldEnum)[keyof typeof InAppNotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AlertSeverity'
   */
  export type EnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity'>
    


  /**
   * Reference to a field of type 'AlertSeverity[]'
   */
  export type ListEnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type NotificationLogWhereInput = {
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    id?: StringFilter<"NotificationLog"> | string
    dedupeKey?: StringFilter<"NotificationLog"> | string
    tenantId?: StringFilter<"NotificationLog"> | string
    channel?: StringFilter<"NotificationLog"> | string
    template?: StringFilter<"NotificationLog"> | string
    recipient?: StringFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusFilter<"NotificationLog"> | $Enums.NotificationStatus
    attempts?: IntFilter<"NotificationLog"> | number
    lastError?: StringNullableFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }

  export type NotificationLogOrderByWithRelationInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    template?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dedupeKey?: string
    AND?: NotificationLogWhereInput | NotificationLogWhereInput[]
    OR?: NotificationLogWhereInput[]
    NOT?: NotificationLogWhereInput | NotificationLogWhereInput[]
    tenantId?: StringFilter<"NotificationLog"> | string
    channel?: StringFilter<"NotificationLog"> | string
    template?: StringFilter<"NotificationLog"> | string
    recipient?: StringFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusFilter<"NotificationLog"> | $Enums.NotificationStatus
    attempts?: IntFilter<"NotificationLog"> | number
    lastError?: StringNullableFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeFilter<"NotificationLog"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationLog"> | Date | string
  }, "id" | "dedupeKey">

  export type NotificationLogOrderByWithAggregationInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    template?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationLogCountOrderByAggregateInput
    _avg?: NotificationLogAvgOrderByAggregateInput
    _max?: NotificationLogMaxOrderByAggregateInput
    _min?: NotificationLogMinOrderByAggregateInput
    _sum?: NotificationLogSumOrderByAggregateInput
  }

  export type NotificationLogScalarWhereWithAggregatesInput = {
    AND?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    OR?: NotificationLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationLogScalarWhereWithAggregatesInput | NotificationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationLog"> | string
    dedupeKey?: StringWithAggregatesFilter<"NotificationLog"> | string
    tenantId?: StringWithAggregatesFilter<"NotificationLog"> | string
    channel?: StringWithAggregatesFilter<"NotificationLog"> | string
    template?: StringWithAggregatesFilter<"NotificationLog"> | string
    recipient?: StringWithAggregatesFilter<"NotificationLog"> | string
    status?: EnumNotificationStatusWithAggregatesFilter<"NotificationLog"> | $Enums.NotificationStatus
    attempts?: IntWithAggregatesFilter<"NotificationLog"> | number
    lastError?: StringNullableWithAggregatesFilter<"NotificationLog"> | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"NotificationLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NotificationLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationLog"> | Date | string
  }

  export type InAppNotificationWhereInput = {
    AND?: InAppNotificationWhereInput | InAppNotificationWhereInput[]
    OR?: InAppNotificationWhereInput[]
    NOT?: InAppNotificationWhereInput | InAppNotificationWhereInput[]
    id?: StringFilter<"InAppNotification"> | string
    dedupeKey?: StringFilter<"InAppNotification"> | string
    tenantId?: StringFilter<"InAppNotification"> | string
    severity?: EnumAlertSeverityFilter<"InAppNotification"> | $Enums.AlertSeverity
    title?: StringFilter<"InAppNotification"> | string
    body?: StringFilter<"InAppNotification"> | string
    shipmentId?: StringNullableFilter<"InAppNotification"> | string | null
    acknowledgedAt?: DateTimeNullableFilter<"InAppNotification"> | Date | string | null
    acknowledgedById?: StringNullableFilter<"InAppNotification"> | string | null
    createdAt?: DateTimeFilter<"InAppNotification"> | Date | string
  }

  export type InAppNotificationOrderByWithRelationInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    body?: SortOrder
    shipmentId?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    acknowledgedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type InAppNotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dedupeKey?: string
    AND?: InAppNotificationWhereInput | InAppNotificationWhereInput[]
    OR?: InAppNotificationWhereInput[]
    NOT?: InAppNotificationWhereInput | InAppNotificationWhereInput[]
    tenantId?: StringFilter<"InAppNotification"> | string
    severity?: EnumAlertSeverityFilter<"InAppNotification"> | $Enums.AlertSeverity
    title?: StringFilter<"InAppNotification"> | string
    body?: StringFilter<"InAppNotification"> | string
    shipmentId?: StringNullableFilter<"InAppNotification"> | string | null
    acknowledgedAt?: DateTimeNullableFilter<"InAppNotification"> | Date | string | null
    acknowledgedById?: StringNullableFilter<"InAppNotification"> | string | null
    createdAt?: DateTimeFilter<"InAppNotification"> | Date | string
  }, "id" | "dedupeKey">

  export type InAppNotificationOrderByWithAggregationInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    body?: SortOrder
    shipmentId?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    acknowledgedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InAppNotificationCountOrderByAggregateInput
    _max?: InAppNotificationMaxOrderByAggregateInput
    _min?: InAppNotificationMinOrderByAggregateInput
  }

  export type InAppNotificationScalarWhereWithAggregatesInput = {
    AND?: InAppNotificationScalarWhereWithAggregatesInput | InAppNotificationScalarWhereWithAggregatesInput[]
    OR?: InAppNotificationScalarWhereWithAggregatesInput[]
    NOT?: InAppNotificationScalarWhereWithAggregatesInput | InAppNotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InAppNotification"> | string
    dedupeKey?: StringWithAggregatesFilter<"InAppNotification"> | string
    tenantId?: StringWithAggregatesFilter<"InAppNotification"> | string
    severity?: EnumAlertSeverityWithAggregatesFilter<"InAppNotification"> | $Enums.AlertSeverity
    title?: StringWithAggregatesFilter<"InAppNotification"> | string
    body?: StringWithAggregatesFilter<"InAppNotification"> | string
    shipmentId?: StringNullableWithAggregatesFilter<"InAppNotification"> | string | null
    acknowledgedAt?: DateTimeNullableWithAggregatesFilter<"InAppNotification"> | Date | string | null
    acknowledgedById?: StringNullableWithAggregatesFilter<"InAppNotification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InAppNotification"> | Date | string
  }

  export type NotificationLogCreateInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    channel: string
    template: string
    recipient: string
    status?: $Enums.NotificationStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationLogUncheckedCreateInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    channel: string
    template: string
    recipient: string
    status?: $Enums.NotificationStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogCreateManyInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    channel: string
    template: string
    recipient: string
    status?: $Enums.NotificationStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InAppNotificationCreateInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    severity: $Enums.AlertSeverity
    title: string
    body: string
    shipmentId?: string | null
    acknowledgedAt?: Date | string | null
    acknowledgedById?: string | null
    createdAt?: Date | string
  }

  export type InAppNotificationUncheckedCreateInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    severity: $Enums.AlertSeverity
    title: string
    body: string
    shipmentId?: string | null
    acknowledgedAt?: Date | string | null
    acknowledgedById?: string | null
    createdAt?: Date | string
  }

  export type InAppNotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InAppNotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InAppNotificationCreateManyInput = {
    id?: string
    dedupeKey: string
    tenantId: string
    severity: $Enums.AlertSeverity
    title: string
    body: string
    shipmentId?: string | null
    acknowledgedAt?: Date | string | null
    acknowledgedById?: string | null
    createdAt?: Date | string
  }

  export type InAppNotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InAppNotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dedupeKey?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    shipmentId?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acknowledgedById?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
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

  export type NotificationLogCountOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    template?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationLogAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type NotificationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    template?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationLogMinOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    template?: SortOrder
    recipient?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationLogSumOrderByAggregateInput = {
    attempts?: SortOrder
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

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
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

  export type EnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type InAppNotificationCountOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    body?: SortOrder
    shipmentId?: SortOrder
    acknowledgedAt?: SortOrder
    acknowledgedById?: SortOrder
    createdAt?: SortOrder
  }

  export type InAppNotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    body?: SortOrder
    shipmentId?: SortOrder
    acknowledgedAt?: SortOrder
    acknowledgedById?: SortOrder
    createdAt?: SortOrder
  }

  export type InAppNotificationMinOrderByAggregateInput = {
    id?: SortOrder
    dedupeKey?: SortOrder
    tenantId?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    body?: SortOrder
    shipmentId?: SortOrder
    acknowledgedAt?: SortOrder
    acknowledgedById?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumAlertSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AlertSeverity
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

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
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

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
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

  export type NestedEnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
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