
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
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model AssignmentOffer
 * 
 */
export type AssignmentOffer = $Result.DefaultSelection<Prisma.$AssignmentOfferPayload>
/**
 * Model DeliveryAttempt
 * 
 */
export type DeliveryAttempt = $Result.DefaultSelection<Prisma.$DeliveryAttemptPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShiftStatus: {
  OFFLINE: 'OFFLINE',
  AVAILABLE: 'AVAILABLE',
  ON_BREAK: 'ON_BREAK',
  BUSY: 'BUSY'
};

export type ShiftStatus = (typeof ShiftStatus)[keyof typeof ShiftStatus]


export const MaintenanceState: {
  OPERATIONAL: 'OPERATIONAL',
  IN_MAINTENANCE: 'IN_MAINTENANCE'
};

export type MaintenanceState = (typeof MaintenanceState)[keyof typeof MaintenanceState]


export const OfferStatus: {
  PENDING_ACCEPTANCE: 'PENDING_ACCEPTANCE',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus]


export const AttemptOutcome: {
  ARRIVED_AT_PICKUP: 'ARRIVED_AT_PICKUP',
  PACKAGE_COLLECTED: 'PACKAGE_COLLECTED',
  START_DELIVERY: 'START_DELIVERY',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED'
};

export type AttemptOutcome = (typeof AttemptOutcome)[keyof typeof AttemptOutcome]

}

export type ShiftStatus = $Enums.ShiftStatus

export const ShiftStatus: typeof $Enums.ShiftStatus

export type MaintenanceState = $Enums.MaintenanceState

export const MaintenanceState: typeof $Enums.MaintenanceState

export type OfferStatus = $Enums.OfferStatus

export const OfferStatus: typeof $Enums.OfferStatus

export type AttemptOutcome = $Enums.AttemptOutcome

export const AttemptOutcome: typeof $Enums.AttemptOutcome

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Drivers
 * const drivers = await prisma.driver.findMany()
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
   * // Fetch zero or more Drivers
   * const drivers = await prisma.driver.findMany()
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
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignmentOffer`: Exposes CRUD operations for the **AssignmentOffer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssignmentOffers
    * const assignmentOffers = await prisma.assignmentOffer.findMany()
    * ```
    */
  get assignmentOffer(): Prisma.AssignmentOfferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryAttempt`: Exposes CRUD operations for the **DeliveryAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryAttempts
    * const deliveryAttempts = await prisma.deliveryAttempt.findMany()
    * ```
    */
  get deliveryAttempt(): Prisma.DeliveryAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;
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
    Driver: 'Driver',
    Vehicle: 'Vehicle',
    AssignmentOffer: 'AssignmentOffer',
    DeliveryAttempt: 'DeliveryAttempt',
    OutboxEvent: 'OutboxEvent'
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
      modelProps: "driver" | "vehicle" | "assignmentOffer" | "deliveryAttempt" | "outboxEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DriverUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      AssignmentOffer: {
        payload: Prisma.$AssignmentOfferPayload<ExtArgs>
        fields: Prisma.AssignmentOfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentOfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentOfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          findFirst: {
            args: Prisma.AssignmentOfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentOfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          findMany: {
            args: Prisma.AssignmentOfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>[]
          }
          create: {
            args: Prisma.AssignmentOfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          createMany: {
            args: Prisma.AssignmentOfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentOfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>[]
          }
          delete: {
            args: Prisma.AssignmentOfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          update: {
            args: Prisma.AssignmentOfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentOfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentOfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentOfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentOfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentOfferPayload>
          }
          aggregate: {
            args: Prisma.AssignmentOfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignmentOffer>
          }
          groupBy: {
            args: Prisma.AssignmentOfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentOfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentOfferCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentOfferCountAggregateOutputType> | number
          }
        }
      }
      DeliveryAttempt: {
        payload: Prisma.$DeliveryAttemptPayload<ExtArgs>
        fields: Prisma.DeliveryAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          findFirst: {
            args: Prisma.DeliveryAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          findMany: {
            args: Prisma.DeliveryAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>[]
          }
          create: {
            args: Prisma.DeliveryAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          createMany: {
            args: Prisma.DeliveryAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>[]
          }
          delete: {
            args: Prisma.DeliveryAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          update: {
            args: Prisma.DeliveryAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryAttemptPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryAttempt>
          }
          groupBy: {
            args: Prisma.DeliveryAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryAttemptCountAggregateOutputType> | number
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
    driver?: DriverOmit
    vehicle?: VehicleOmit
    assignmentOffer?: AssignmentOfferOmit
    deliveryAttempt?: DeliveryAttemptOmit
    outboxEvent?: OutboxEventOmit
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
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverAvgAggregateOutputType = {
    currentLat: number | null
    currentLng: number | null
  }

  export type DriverSumAggregateOutputType = {
    currentLat: number | null
    currentLng: number | null
  }

  export type DriverMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    licenseNumber: string | null
    licenseExpiry: Date | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    shiftStatus: $Enums.ShiftStatus | null
    currentLat: number | null
    currentLng: number | null
    assignedVehicleId: string | null
    createdAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    licenseNumber: string | null
    licenseExpiry: Date | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    shiftStatus: $Enums.ShiftStatus | null
    currentLat: number | null
    currentLng: number | null
    assignedVehicleId: string | null
    createdAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    tenantId: number
    licenseNumber: number
    licenseExpiry: number
    emergencyContactName: number
    emergencyContactPhone: number
    shiftStatus: number
    currentLat: number
    currentLng: number
    assignedVehicleId: number
    createdAt: number
    _all: number
  }


  export type DriverAvgAggregateInputType = {
    currentLat?: true
    currentLng?: true
  }

  export type DriverSumAggregateInputType = {
    currentLat?: true
    currentLng?: true
  }

  export type DriverMinAggregateInputType = {
    id?: true
    tenantId?: true
    licenseNumber?: true
    licenseExpiry?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    shiftStatus?: true
    currentLat?: true
    currentLng?: true
    assignedVehicleId?: true
    createdAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    tenantId?: true
    licenseNumber?: true
    licenseExpiry?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    shiftStatus?: true
    currentLat?: true
    currentLng?: true
    assignedVehicleId?: true
    createdAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    tenantId?: true
    licenseNumber?: true
    licenseExpiry?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    shiftStatus?: true
    currentLat?: true
    currentLng?: true
    assignedVehicleId?: true
    createdAt?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _avg?: DriverAvgAggregateInputType
    _sum?: DriverSumAggregateInputType
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: string
    tenantId: string
    licenseNumber: string
    licenseExpiry: Date
    emergencyContactName: string
    emergencyContactPhone: string
    shiftStatus: $Enums.ShiftStatus
    currentLat: number | null
    currentLng: number | null
    assignedVehicleId: string | null
    createdAt: Date
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licenseNumber?: boolean
    licenseExpiry?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    shiftStatus?: boolean
    currentLat?: boolean
    currentLng?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licenseNumber?: boolean
    licenseExpiry?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    shiftStatus?: boolean
    currentLat?: boolean
    currentLng?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licenseNumber?: boolean
    licenseExpiry?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    shiftStatus?: boolean
    currentLat?: boolean
    currentLng?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    tenantId?: boolean
    licenseNumber?: boolean
    licenseExpiry?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    shiftStatus?: boolean
    currentLat?: boolean
    currentLng?: boolean
    assignedVehicleId?: boolean
    createdAt?: boolean
  }

  export type DriverOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "licenseNumber" | "licenseExpiry" | "emergencyContactName" | "emergencyContactPhone" | "shiftStatus" | "currentLat" | "currentLng" | "assignedVehicleId" | "createdAt", ExtArgs["result"]["driver"]>

  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      licenseNumber: string
      licenseExpiry: Date
      emergencyContactName: string
      emergencyContactPhone: string
      shiftStatus: $Enums.ShiftStatus
      currentLat: number | null
      currentLng: number | null
      assignedVehicleId: string | null
      createdAt: Date
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {DriverUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.updateManyAndReturn({
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
    updateManyAndReturn<T extends DriverUpdateManyAndReturnArgs>(args: SelectSubset<T, DriverUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
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
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Driver model
   */
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'String'>
    readonly tenantId: FieldRef<"Driver", 'String'>
    readonly licenseNumber: FieldRef<"Driver", 'String'>
    readonly licenseExpiry: FieldRef<"Driver", 'DateTime'>
    readonly emergencyContactName: FieldRef<"Driver", 'String'>
    readonly emergencyContactPhone: FieldRef<"Driver", 'String'>
    readonly shiftStatus: FieldRef<"Driver", 'ShiftStatus'>
    readonly currentLat: FieldRef<"Driver", 'Float'>
    readonly currentLng: FieldRef<"Driver", 'Float'>
    readonly assignedVehicleId: FieldRef<"Driver", 'String'>
    readonly createdAt: FieldRef<"Driver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver updateManyAndReturn
   */
  export type DriverUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to update.
     */
    limit?: number
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
    /**
     * Limit how many Drivers to delete.
     */
    limit?: number
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Driver
     */
    omit?: DriverOmit<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    maxWeightKg: number | null
    volumeM3: number | null
  }

  export type VehicleSumAggregateOutputType = {
    maxWeightKg: number | null
    volumeM3: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    licensePlate: string | null
    vehicleClass: string | null
    maxWeightKg: number | null
    volumeM3: number | null
    maintenanceState: $Enums.MaintenanceState | null
    insuranceValid: boolean | null
    assignedDriverId: string | null
    createdAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    licensePlate: string | null
    vehicleClass: string | null
    maxWeightKg: number | null
    volumeM3: number | null
    maintenanceState: $Enums.MaintenanceState | null
    insuranceValid: boolean | null
    assignedDriverId: string | null
    createdAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    tenantId: number
    licensePlate: number
    vehicleClass: number
    maxWeightKg: number
    volumeM3: number
    maintenanceState: number
    insuranceValid: number
    assignedDriverId: number
    createdAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    maxWeightKg?: true
    volumeM3?: true
  }

  export type VehicleSumAggregateInputType = {
    maxWeightKg?: true
    volumeM3?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    tenantId?: true
    licensePlate?: true
    vehicleClass?: true
    maxWeightKg?: true
    volumeM3?: true
    maintenanceState?: true
    insuranceValid?: true
    assignedDriverId?: true
    createdAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    licensePlate?: true
    vehicleClass?: true
    maxWeightKg?: true
    volumeM3?: true
    maintenanceState?: true
    insuranceValid?: true
    assignedDriverId?: true
    createdAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    tenantId?: true
    licensePlate?: true
    vehicleClass?: true
    maxWeightKg?: true
    volumeM3?: true
    maintenanceState?: true
    insuranceValid?: true
    assignedDriverId?: true
    createdAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    tenantId: string
    licensePlate: string
    vehicleClass: string
    maxWeightKg: number
    volumeM3: number
    maintenanceState: $Enums.MaintenanceState
    insuranceValid: boolean
    assignedDriverId: string | null
    createdAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licensePlate?: boolean
    vehicleClass?: boolean
    maxWeightKg?: boolean
    volumeM3?: boolean
    maintenanceState?: boolean
    insuranceValid?: boolean
    assignedDriverId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licensePlate?: boolean
    vehicleClass?: boolean
    maxWeightKg?: boolean
    volumeM3?: boolean
    maintenanceState?: boolean
    insuranceValid?: boolean
    assignedDriverId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    licensePlate?: boolean
    vehicleClass?: boolean
    maxWeightKg?: boolean
    volumeM3?: boolean
    maintenanceState?: boolean
    insuranceValid?: boolean
    assignedDriverId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    licensePlate?: boolean
    vehicleClass?: boolean
    maxWeightKg?: boolean
    volumeM3?: boolean
    maintenanceState?: boolean
    insuranceValid?: boolean
    assignedDriverId?: boolean
    createdAt?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "licensePlate" | "vehicleClass" | "maxWeightKg" | "volumeM3" | "maintenanceState" | "insuranceValid" | "assignedDriverId" | "createdAt", ExtArgs["result"]["vehicle"]>

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      licensePlate: string
      vehicleClass: string
      maxWeightKg: number
      volumeM3: number
      maintenanceState: $Enums.MaintenanceState
      insuranceValid: boolean
      assignedDriverId: string | null
      createdAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
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
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
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
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly tenantId: FieldRef<"Vehicle", 'String'>
    readonly licensePlate: FieldRef<"Vehicle", 'String'>
    readonly vehicleClass: FieldRef<"Vehicle", 'String'>
    readonly maxWeightKg: FieldRef<"Vehicle", 'Float'>
    readonly volumeM3: FieldRef<"Vehicle", 'Float'>
    readonly maintenanceState: FieldRef<"Vehicle", 'MaintenanceState'>
    readonly insuranceValid: FieldRef<"Vehicle", 'Boolean'>
    readonly assignedDriverId: FieldRef<"Vehicle", 'String'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
  }


  /**
   * Model AssignmentOffer
   */

  export type AggregateAssignmentOffer = {
    _count: AssignmentOfferCountAggregateOutputType | null
    _min: AssignmentOfferMinAggregateOutputType | null
    _max: AssignmentOfferMaxAggregateOutputType | null
  }

  export type AssignmentOfferMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    driverId: string | null
    shipmentId: string | null
    status: $Enums.OfferStatus | null
    respondBy: Date | null
    createdAt: Date | null
  }

  export type AssignmentOfferMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    driverId: string | null
    shipmentId: string | null
    status: $Enums.OfferStatus | null
    respondBy: Date | null
    createdAt: Date | null
  }

  export type AssignmentOfferCountAggregateOutputType = {
    id: number
    tenantId: number
    driverId: number
    shipmentId: number
    status: number
    respondBy: number
    createdAt: number
    _all: number
  }


  export type AssignmentOfferMinAggregateInputType = {
    id?: true
    tenantId?: true
    driverId?: true
    shipmentId?: true
    status?: true
    respondBy?: true
    createdAt?: true
  }

  export type AssignmentOfferMaxAggregateInputType = {
    id?: true
    tenantId?: true
    driverId?: true
    shipmentId?: true
    status?: true
    respondBy?: true
    createdAt?: true
  }

  export type AssignmentOfferCountAggregateInputType = {
    id?: true
    tenantId?: true
    driverId?: true
    shipmentId?: true
    status?: true
    respondBy?: true
    createdAt?: true
    _all?: true
  }

  export type AssignmentOfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssignmentOffer to aggregate.
     */
    where?: AssignmentOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentOffers to fetch.
     */
    orderBy?: AssignmentOfferOrderByWithRelationInput | AssignmentOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssignmentOffers
    **/
    _count?: true | AssignmentOfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentOfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentOfferMaxAggregateInputType
  }

  export type GetAssignmentOfferAggregateType<T extends AssignmentOfferAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignmentOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignmentOffer[P]>
      : GetScalarType<T[P], AggregateAssignmentOffer[P]>
  }




  export type AssignmentOfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentOfferWhereInput
    orderBy?: AssignmentOfferOrderByWithAggregationInput | AssignmentOfferOrderByWithAggregationInput[]
    by: AssignmentOfferScalarFieldEnum[] | AssignmentOfferScalarFieldEnum
    having?: AssignmentOfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentOfferCountAggregateInputType | true
    _min?: AssignmentOfferMinAggregateInputType
    _max?: AssignmentOfferMaxAggregateInputType
  }

  export type AssignmentOfferGroupByOutputType = {
    id: string
    tenantId: string
    driverId: string
    shipmentId: string
    status: $Enums.OfferStatus
    respondBy: Date | null
    createdAt: Date
    _count: AssignmentOfferCountAggregateOutputType | null
    _min: AssignmentOfferMinAggregateOutputType | null
    _max: AssignmentOfferMaxAggregateOutputType | null
  }

  type GetAssignmentOfferGroupByPayload<T extends AssignmentOfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentOfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentOfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentOfferGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentOfferGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentOfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    driverId?: boolean
    shipmentId?: boolean
    status?: boolean
    respondBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assignmentOffer"]>

  export type AssignmentOfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    driverId?: boolean
    shipmentId?: boolean
    status?: boolean
    respondBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assignmentOffer"]>

  export type AssignmentOfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    driverId?: boolean
    shipmentId?: boolean
    status?: boolean
    respondBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["assignmentOffer"]>

  export type AssignmentOfferSelectScalar = {
    id?: boolean
    tenantId?: boolean
    driverId?: boolean
    shipmentId?: boolean
    status?: boolean
    respondBy?: boolean
    createdAt?: boolean
  }

  export type AssignmentOfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "driverId" | "shipmentId" | "status" | "respondBy" | "createdAt", ExtArgs["result"]["assignmentOffer"]>

  export type $AssignmentOfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssignmentOffer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      driverId: string
      shipmentId: string
      status: $Enums.OfferStatus
      respondBy: Date | null
      createdAt: Date
    }, ExtArgs["result"]["assignmentOffer"]>
    composites: {}
  }

  type AssignmentOfferGetPayload<S extends boolean | null | undefined | AssignmentOfferDefaultArgs> = $Result.GetResult<Prisma.$AssignmentOfferPayload, S>

  type AssignmentOfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentOfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentOfferCountAggregateInputType | true
    }

  export interface AssignmentOfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssignmentOffer'], meta: { name: 'AssignmentOffer' } }
    /**
     * Find zero or one AssignmentOffer that matches the filter.
     * @param {AssignmentOfferFindUniqueArgs} args - Arguments to find a AssignmentOffer
     * @example
     * // Get one AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentOfferFindUniqueArgs>(args: SelectSubset<T, AssignmentOfferFindUniqueArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssignmentOffer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentOfferFindUniqueOrThrowArgs} args - Arguments to find a AssignmentOffer
     * @example
     * // Get one AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentOfferFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentOfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssignmentOffer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferFindFirstArgs} args - Arguments to find a AssignmentOffer
     * @example
     * // Get one AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentOfferFindFirstArgs>(args?: SelectSubset<T, AssignmentOfferFindFirstArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssignmentOffer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferFindFirstOrThrowArgs} args - Arguments to find a AssignmentOffer
     * @example
     * // Get one AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentOfferFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentOfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssignmentOffers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssignmentOffers
     * const assignmentOffers = await prisma.assignmentOffer.findMany()
     * 
     * // Get first 10 AssignmentOffers
     * const assignmentOffers = await prisma.assignmentOffer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentOfferWithIdOnly = await prisma.assignmentOffer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentOfferFindManyArgs>(args?: SelectSubset<T, AssignmentOfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssignmentOffer.
     * @param {AssignmentOfferCreateArgs} args - Arguments to create a AssignmentOffer.
     * @example
     * // Create one AssignmentOffer
     * const AssignmentOffer = await prisma.assignmentOffer.create({
     *   data: {
     *     // ... data to create a AssignmentOffer
     *   }
     * })
     * 
     */
    create<T extends AssignmentOfferCreateArgs>(args: SelectSubset<T, AssignmentOfferCreateArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssignmentOffers.
     * @param {AssignmentOfferCreateManyArgs} args - Arguments to create many AssignmentOffers.
     * @example
     * // Create many AssignmentOffers
     * const assignmentOffer = await prisma.assignmentOffer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentOfferCreateManyArgs>(args?: SelectSubset<T, AssignmentOfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssignmentOffers and returns the data saved in the database.
     * @param {AssignmentOfferCreateManyAndReturnArgs} args - Arguments to create many AssignmentOffers.
     * @example
     * // Create many AssignmentOffers
     * const assignmentOffer = await prisma.assignmentOffer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssignmentOffers and only return the `id`
     * const assignmentOfferWithIdOnly = await prisma.assignmentOffer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentOfferCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentOfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssignmentOffer.
     * @param {AssignmentOfferDeleteArgs} args - Arguments to delete one AssignmentOffer.
     * @example
     * // Delete one AssignmentOffer
     * const AssignmentOffer = await prisma.assignmentOffer.delete({
     *   where: {
     *     // ... filter to delete one AssignmentOffer
     *   }
     * })
     * 
     */
    delete<T extends AssignmentOfferDeleteArgs>(args: SelectSubset<T, AssignmentOfferDeleteArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssignmentOffer.
     * @param {AssignmentOfferUpdateArgs} args - Arguments to update one AssignmentOffer.
     * @example
     * // Update one AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentOfferUpdateArgs>(args: SelectSubset<T, AssignmentOfferUpdateArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssignmentOffers.
     * @param {AssignmentOfferDeleteManyArgs} args - Arguments to filter AssignmentOffers to delete.
     * @example
     * // Delete a few AssignmentOffers
     * const { count } = await prisma.assignmentOffer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentOfferDeleteManyArgs>(args?: SelectSubset<T, AssignmentOfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssignmentOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssignmentOffers
     * const assignmentOffer = await prisma.assignmentOffer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentOfferUpdateManyArgs>(args: SelectSubset<T, AssignmentOfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssignmentOffers and returns the data updated in the database.
     * @param {AssignmentOfferUpdateManyAndReturnArgs} args - Arguments to update many AssignmentOffers.
     * @example
     * // Update many AssignmentOffers
     * const assignmentOffer = await prisma.assignmentOffer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssignmentOffers and only return the `id`
     * const assignmentOfferWithIdOnly = await prisma.assignmentOffer.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssignmentOfferUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentOfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssignmentOffer.
     * @param {AssignmentOfferUpsertArgs} args - Arguments to update or create a AssignmentOffer.
     * @example
     * // Update or create a AssignmentOffer
     * const assignmentOffer = await prisma.assignmentOffer.upsert({
     *   create: {
     *     // ... data to create a AssignmentOffer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssignmentOffer we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentOfferUpsertArgs>(args: SelectSubset<T, AssignmentOfferUpsertArgs<ExtArgs>>): Prisma__AssignmentOfferClient<$Result.GetResult<Prisma.$AssignmentOfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssignmentOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferCountArgs} args - Arguments to filter AssignmentOffers to count.
     * @example
     * // Count the number of AssignmentOffers
     * const count = await prisma.assignmentOffer.count({
     *   where: {
     *     // ... the filter for the AssignmentOffers we want to count
     *   }
     * })
    **/
    count<T extends AssignmentOfferCountArgs>(
      args?: Subset<T, AssignmentOfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentOfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssignmentOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssignmentOfferAggregateArgs>(args: Subset<T, AssignmentOfferAggregateArgs>): Prisma.PrismaPromise<GetAssignmentOfferAggregateType<T>>

    /**
     * Group by AssignmentOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentOfferGroupByArgs} args - Group by arguments.
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
      T extends AssignmentOfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentOfferGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentOfferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssignmentOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssignmentOffer model
   */
  readonly fields: AssignmentOfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssignmentOffer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentOfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AssignmentOffer model
   */
  interface AssignmentOfferFieldRefs {
    readonly id: FieldRef<"AssignmentOffer", 'String'>
    readonly tenantId: FieldRef<"AssignmentOffer", 'String'>
    readonly driverId: FieldRef<"AssignmentOffer", 'String'>
    readonly shipmentId: FieldRef<"AssignmentOffer", 'String'>
    readonly status: FieldRef<"AssignmentOffer", 'OfferStatus'>
    readonly respondBy: FieldRef<"AssignmentOffer", 'DateTime'>
    readonly createdAt: FieldRef<"AssignmentOffer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssignmentOffer findUnique
   */
  export type AssignmentOfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter, which AssignmentOffer to fetch.
     */
    where: AssignmentOfferWhereUniqueInput
  }

  /**
   * AssignmentOffer findUniqueOrThrow
   */
  export type AssignmentOfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter, which AssignmentOffer to fetch.
     */
    where: AssignmentOfferWhereUniqueInput
  }

  /**
   * AssignmentOffer findFirst
   */
  export type AssignmentOfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter, which AssignmentOffer to fetch.
     */
    where?: AssignmentOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentOffers to fetch.
     */
    orderBy?: AssignmentOfferOrderByWithRelationInput | AssignmentOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssignmentOffers.
     */
    cursor?: AssignmentOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssignmentOffers.
     */
    distinct?: AssignmentOfferScalarFieldEnum | AssignmentOfferScalarFieldEnum[]
  }

  /**
   * AssignmentOffer findFirstOrThrow
   */
  export type AssignmentOfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter, which AssignmentOffer to fetch.
     */
    where?: AssignmentOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentOffers to fetch.
     */
    orderBy?: AssignmentOfferOrderByWithRelationInput | AssignmentOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssignmentOffers.
     */
    cursor?: AssignmentOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssignmentOffers.
     */
    distinct?: AssignmentOfferScalarFieldEnum | AssignmentOfferScalarFieldEnum[]
  }

  /**
   * AssignmentOffer findMany
   */
  export type AssignmentOfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter, which AssignmentOffers to fetch.
     */
    where?: AssignmentOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentOffers to fetch.
     */
    orderBy?: AssignmentOfferOrderByWithRelationInput | AssignmentOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssignmentOffers.
     */
    cursor?: AssignmentOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentOffers.
     */
    skip?: number
    distinct?: AssignmentOfferScalarFieldEnum | AssignmentOfferScalarFieldEnum[]
  }

  /**
   * AssignmentOffer create
   */
  export type AssignmentOfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * The data needed to create a AssignmentOffer.
     */
    data: XOR<AssignmentOfferCreateInput, AssignmentOfferUncheckedCreateInput>
  }

  /**
   * AssignmentOffer createMany
   */
  export type AssignmentOfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssignmentOffers.
     */
    data: AssignmentOfferCreateManyInput | AssignmentOfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssignmentOffer createManyAndReturn
   */
  export type AssignmentOfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * The data used to create many AssignmentOffers.
     */
    data: AssignmentOfferCreateManyInput | AssignmentOfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssignmentOffer update
   */
  export type AssignmentOfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * The data needed to update a AssignmentOffer.
     */
    data: XOR<AssignmentOfferUpdateInput, AssignmentOfferUncheckedUpdateInput>
    /**
     * Choose, which AssignmentOffer to update.
     */
    where: AssignmentOfferWhereUniqueInput
  }

  /**
   * AssignmentOffer updateMany
   */
  export type AssignmentOfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssignmentOffers.
     */
    data: XOR<AssignmentOfferUpdateManyMutationInput, AssignmentOfferUncheckedUpdateManyInput>
    /**
     * Filter which AssignmentOffers to update
     */
    where?: AssignmentOfferWhereInput
    /**
     * Limit how many AssignmentOffers to update.
     */
    limit?: number
  }

  /**
   * AssignmentOffer updateManyAndReturn
   */
  export type AssignmentOfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * The data used to update AssignmentOffers.
     */
    data: XOR<AssignmentOfferUpdateManyMutationInput, AssignmentOfferUncheckedUpdateManyInput>
    /**
     * Filter which AssignmentOffers to update
     */
    where?: AssignmentOfferWhereInput
    /**
     * Limit how many AssignmentOffers to update.
     */
    limit?: number
  }

  /**
   * AssignmentOffer upsert
   */
  export type AssignmentOfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * The filter to search for the AssignmentOffer to update in case it exists.
     */
    where: AssignmentOfferWhereUniqueInput
    /**
     * In case the AssignmentOffer found by the `where` argument doesn't exist, create a new AssignmentOffer with this data.
     */
    create: XOR<AssignmentOfferCreateInput, AssignmentOfferUncheckedCreateInput>
    /**
     * In case the AssignmentOffer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentOfferUpdateInput, AssignmentOfferUncheckedUpdateInput>
  }

  /**
   * AssignmentOffer delete
   */
  export type AssignmentOfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
    /**
     * Filter which AssignmentOffer to delete.
     */
    where: AssignmentOfferWhereUniqueInput
  }

  /**
   * AssignmentOffer deleteMany
   */
  export type AssignmentOfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssignmentOffers to delete
     */
    where?: AssignmentOfferWhereInput
    /**
     * Limit how many AssignmentOffers to delete.
     */
    limit?: number
  }

  /**
   * AssignmentOffer without action
   */
  export type AssignmentOfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentOffer
     */
    select?: AssignmentOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentOffer
     */
    omit?: AssignmentOfferOmit<ExtArgs> | null
  }


  /**
   * Model DeliveryAttempt
   */

  export type AggregateDeliveryAttempt = {
    _count: DeliveryAttemptCountAggregateOutputType | null
    _min: DeliveryAttemptMinAggregateOutputType | null
    _max: DeliveryAttemptMaxAggregateOutputType | null
  }

  export type DeliveryAttemptMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    shipmentId: string | null
    driverId: string | null
    outcome: $Enums.AttemptOutcome | null
    reasonCode: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type DeliveryAttemptMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    shipmentId: string | null
    driverId: string | null
    outcome: $Enums.AttemptOutcome | null
    reasonCode: string | null
    photoUrl: string | null
    createdAt: Date | null
  }

  export type DeliveryAttemptCountAggregateOutputType = {
    id: number
    tenantId: number
    shipmentId: number
    driverId: number
    outcome: number
    reasonCode: number
    photoUrl: number
    createdAt: number
    _all: number
  }


  export type DeliveryAttemptMinAggregateInputType = {
    id?: true
    tenantId?: true
    shipmentId?: true
    driverId?: true
    outcome?: true
    reasonCode?: true
    photoUrl?: true
    createdAt?: true
  }

  export type DeliveryAttemptMaxAggregateInputType = {
    id?: true
    tenantId?: true
    shipmentId?: true
    driverId?: true
    outcome?: true
    reasonCode?: true
    photoUrl?: true
    createdAt?: true
  }

  export type DeliveryAttemptCountAggregateInputType = {
    id?: true
    tenantId?: true
    shipmentId?: true
    driverId?: true
    outcome?: true
    reasonCode?: true
    photoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type DeliveryAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryAttempt to aggregate.
     */
    where?: DeliveryAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAttempts to fetch.
     */
    orderBy?: DeliveryAttemptOrderByWithRelationInput | DeliveryAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryAttempts
    **/
    _count?: true | DeliveryAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryAttemptMaxAggregateInputType
  }

  export type GetDeliveryAttemptAggregateType<T extends DeliveryAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryAttempt[P]>
      : GetScalarType<T[P], AggregateDeliveryAttempt[P]>
  }




  export type DeliveryAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryAttemptWhereInput
    orderBy?: DeliveryAttemptOrderByWithAggregationInput | DeliveryAttemptOrderByWithAggregationInput[]
    by: DeliveryAttemptScalarFieldEnum[] | DeliveryAttemptScalarFieldEnum
    having?: DeliveryAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryAttemptCountAggregateInputType | true
    _min?: DeliveryAttemptMinAggregateInputType
    _max?: DeliveryAttemptMaxAggregateInputType
  }

  export type DeliveryAttemptGroupByOutputType = {
    id: string
    tenantId: string
    shipmentId: string
    driverId: string
    outcome: $Enums.AttemptOutcome
    reasonCode: string | null
    photoUrl: string | null
    createdAt: Date
    _count: DeliveryAttemptCountAggregateOutputType | null
    _min: DeliveryAttemptMinAggregateOutputType | null
    _max: DeliveryAttemptMaxAggregateOutputType | null
  }

  type GetDeliveryAttemptGroupByPayload<T extends DeliveryAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryAttemptGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    shipmentId?: boolean
    driverId?: boolean
    outcome?: boolean
    reasonCode?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deliveryAttempt"]>

  export type DeliveryAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    shipmentId?: boolean
    driverId?: boolean
    outcome?: boolean
    reasonCode?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deliveryAttempt"]>

  export type DeliveryAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    shipmentId?: boolean
    driverId?: boolean
    outcome?: boolean
    reasonCode?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deliveryAttempt"]>

  export type DeliveryAttemptSelectScalar = {
    id?: boolean
    tenantId?: boolean
    shipmentId?: boolean
    driverId?: boolean
    outcome?: boolean
    reasonCode?: boolean
    photoUrl?: boolean
    createdAt?: boolean
  }

  export type DeliveryAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "shipmentId" | "driverId" | "outcome" | "reasonCode" | "photoUrl" | "createdAt", ExtArgs["result"]["deliveryAttempt"]>

  export type $DeliveryAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryAttempt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      shipmentId: string
      driverId: string
      outcome: $Enums.AttemptOutcome
      reasonCode: string | null
      photoUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["deliveryAttempt"]>
    composites: {}
  }

  type DeliveryAttemptGetPayload<S extends boolean | null | undefined | DeliveryAttemptDefaultArgs> = $Result.GetResult<Prisma.$DeliveryAttemptPayload, S>

  type DeliveryAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryAttemptCountAggregateInputType | true
    }

  export interface DeliveryAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryAttempt'], meta: { name: 'DeliveryAttempt' } }
    /**
     * Find zero or one DeliveryAttempt that matches the filter.
     * @param {DeliveryAttemptFindUniqueArgs} args - Arguments to find a DeliveryAttempt
     * @example
     * // Get one DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryAttemptFindUniqueArgs>(args: SelectSubset<T, DeliveryAttemptFindUniqueArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryAttemptFindUniqueOrThrowArgs} args - Arguments to find a DeliveryAttempt
     * @example
     * // Get one DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptFindFirstArgs} args - Arguments to find a DeliveryAttempt
     * @example
     * // Get one DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryAttemptFindFirstArgs>(args?: SelectSubset<T, DeliveryAttemptFindFirstArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptFindFirstOrThrowArgs} args - Arguments to find a DeliveryAttempt
     * @example
     * // Get one DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryAttempts
     * const deliveryAttempts = await prisma.deliveryAttempt.findMany()
     * 
     * // Get first 10 DeliveryAttempts
     * const deliveryAttempts = await prisma.deliveryAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryAttemptWithIdOnly = await prisma.deliveryAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryAttemptFindManyArgs>(args?: SelectSubset<T, DeliveryAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryAttempt.
     * @param {DeliveryAttemptCreateArgs} args - Arguments to create a DeliveryAttempt.
     * @example
     * // Create one DeliveryAttempt
     * const DeliveryAttempt = await prisma.deliveryAttempt.create({
     *   data: {
     *     // ... data to create a DeliveryAttempt
     *   }
     * })
     * 
     */
    create<T extends DeliveryAttemptCreateArgs>(args: SelectSubset<T, DeliveryAttemptCreateArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryAttempts.
     * @param {DeliveryAttemptCreateManyArgs} args - Arguments to create many DeliveryAttempts.
     * @example
     * // Create many DeliveryAttempts
     * const deliveryAttempt = await prisma.deliveryAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryAttemptCreateManyArgs>(args?: SelectSubset<T, DeliveryAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryAttempts and returns the data saved in the database.
     * @param {DeliveryAttemptCreateManyAndReturnArgs} args - Arguments to create many DeliveryAttempts.
     * @example
     * // Create many DeliveryAttempts
     * const deliveryAttempt = await prisma.deliveryAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryAttempts and only return the `id`
     * const deliveryAttemptWithIdOnly = await prisma.deliveryAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryAttempt.
     * @param {DeliveryAttemptDeleteArgs} args - Arguments to delete one DeliveryAttempt.
     * @example
     * // Delete one DeliveryAttempt
     * const DeliveryAttempt = await prisma.deliveryAttempt.delete({
     *   where: {
     *     // ... filter to delete one DeliveryAttempt
     *   }
     * })
     * 
     */
    delete<T extends DeliveryAttemptDeleteArgs>(args: SelectSubset<T, DeliveryAttemptDeleteArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryAttempt.
     * @param {DeliveryAttemptUpdateArgs} args - Arguments to update one DeliveryAttempt.
     * @example
     * // Update one DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryAttemptUpdateArgs>(args: SelectSubset<T, DeliveryAttemptUpdateArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryAttempts.
     * @param {DeliveryAttemptDeleteManyArgs} args - Arguments to filter DeliveryAttempts to delete.
     * @example
     * // Delete a few DeliveryAttempts
     * const { count } = await prisma.deliveryAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryAttemptDeleteManyArgs>(args?: SelectSubset<T, DeliveryAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryAttempts
     * const deliveryAttempt = await prisma.deliveryAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryAttemptUpdateManyArgs>(args: SelectSubset<T, DeliveryAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryAttempts and returns the data updated in the database.
     * @param {DeliveryAttemptUpdateManyAndReturnArgs} args - Arguments to update many DeliveryAttempts.
     * @example
     * // Update many DeliveryAttempts
     * const deliveryAttempt = await prisma.deliveryAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryAttempts and only return the `id`
     * const deliveryAttemptWithIdOnly = await prisma.deliveryAttempt.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeliveryAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryAttempt.
     * @param {DeliveryAttemptUpsertArgs} args - Arguments to update or create a DeliveryAttempt.
     * @example
     * // Update or create a DeliveryAttempt
     * const deliveryAttempt = await prisma.deliveryAttempt.upsert({
     *   create: {
     *     // ... data to create a DeliveryAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryAttempt we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryAttemptUpsertArgs>(args: SelectSubset<T, DeliveryAttemptUpsertArgs<ExtArgs>>): Prisma__DeliveryAttemptClient<$Result.GetResult<Prisma.$DeliveryAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptCountArgs} args - Arguments to filter DeliveryAttempts to count.
     * @example
     * // Count the number of DeliveryAttempts
     * const count = await prisma.deliveryAttempt.count({
     *   where: {
     *     // ... the filter for the DeliveryAttempts we want to count
     *   }
     * })
    **/
    count<T extends DeliveryAttemptCountArgs>(
      args?: Subset<T, DeliveryAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeliveryAttemptAggregateArgs>(args: Subset<T, DeliveryAttemptAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAttemptAggregateType<T>>

    /**
     * Group by DeliveryAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAttemptGroupByArgs} args - Group by arguments.
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
      T extends DeliveryAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryAttemptGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryAttemptGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeliveryAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryAttempt model
   */
  readonly fields: DeliveryAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the DeliveryAttempt model
   */
  interface DeliveryAttemptFieldRefs {
    readonly id: FieldRef<"DeliveryAttempt", 'String'>
    readonly tenantId: FieldRef<"DeliveryAttempt", 'String'>
    readonly shipmentId: FieldRef<"DeliveryAttempt", 'String'>
    readonly driverId: FieldRef<"DeliveryAttempt", 'String'>
    readonly outcome: FieldRef<"DeliveryAttempt", 'AttemptOutcome'>
    readonly reasonCode: FieldRef<"DeliveryAttempt", 'String'>
    readonly photoUrl: FieldRef<"DeliveryAttempt", 'String'>
    readonly createdAt: FieldRef<"DeliveryAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryAttempt findUnique
   */
  export type DeliveryAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryAttempt to fetch.
     */
    where: DeliveryAttemptWhereUniqueInput
  }

  /**
   * DeliveryAttempt findUniqueOrThrow
   */
  export type DeliveryAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryAttempt to fetch.
     */
    where: DeliveryAttemptWhereUniqueInput
  }

  /**
   * DeliveryAttempt findFirst
   */
  export type DeliveryAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryAttempt to fetch.
     */
    where?: DeliveryAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAttempts to fetch.
     */
    orderBy?: DeliveryAttemptOrderByWithRelationInput | DeliveryAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryAttempts.
     */
    cursor?: DeliveryAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryAttempts.
     */
    distinct?: DeliveryAttemptScalarFieldEnum | DeliveryAttemptScalarFieldEnum[]
  }

  /**
   * DeliveryAttempt findFirstOrThrow
   */
  export type DeliveryAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryAttempt to fetch.
     */
    where?: DeliveryAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAttempts to fetch.
     */
    orderBy?: DeliveryAttemptOrderByWithRelationInput | DeliveryAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryAttempts.
     */
    cursor?: DeliveryAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryAttempts.
     */
    distinct?: DeliveryAttemptScalarFieldEnum | DeliveryAttemptScalarFieldEnum[]
  }

  /**
   * DeliveryAttempt findMany
   */
  export type DeliveryAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryAttempts to fetch.
     */
    where?: DeliveryAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryAttempts to fetch.
     */
    orderBy?: DeliveryAttemptOrderByWithRelationInput | DeliveryAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryAttempts.
     */
    cursor?: DeliveryAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryAttempts.
     */
    skip?: number
    distinct?: DeliveryAttemptScalarFieldEnum | DeliveryAttemptScalarFieldEnum[]
  }

  /**
   * DeliveryAttempt create
   */
  export type DeliveryAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * The data needed to create a DeliveryAttempt.
     */
    data: XOR<DeliveryAttemptCreateInput, DeliveryAttemptUncheckedCreateInput>
  }

  /**
   * DeliveryAttempt createMany
   */
  export type DeliveryAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryAttempts.
     */
    data: DeliveryAttemptCreateManyInput | DeliveryAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryAttempt createManyAndReturn
   */
  export type DeliveryAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryAttempts.
     */
    data: DeliveryAttemptCreateManyInput | DeliveryAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryAttempt update
   */
  export type DeliveryAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * The data needed to update a DeliveryAttempt.
     */
    data: XOR<DeliveryAttemptUpdateInput, DeliveryAttemptUncheckedUpdateInput>
    /**
     * Choose, which DeliveryAttempt to update.
     */
    where: DeliveryAttemptWhereUniqueInput
  }

  /**
   * DeliveryAttempt updateMany
   */
  export type DeliveryAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryAttempts.
     */
    data: XOR<DeliveryAttemptUpdateManyMutationInput, DeliveryAttemptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryAttempts to update
     */
    where?: DeliveryAttemptWhereInput
    /**
     * Limit how many DeliveryAttempts to update.
     */
    limit?: number
  }

  /**
   * DeliveryAttempt updateManyAndReturn
   */
  export type DeliveryAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryAttempts.
     */
    data: XOR<DeliveryAttemptUpdateManyMutationInput, DeliveryAttemptUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryAttempts to update
     */
    where?: DeliveryAttemptWhereInput
    /**
     * Limit how many DeliveryAttempts to update.
     */
    limit?: number
  }

  /**
   * DeliveryAttempt upsert
   */
  export type DeliveryAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * The filter to search for the DeliveryAttempt to update in case it exists.
     */
    where: DeliveryAttemptWhereUniqueInput
    /**
     * In case the DeliveryAttempt found by the `where` argument doesn't exist, create a new DeliveryAttempt with this data.
     */
    create: XOR<DeliveryAttemptCreateInput, DeliveryAttemptUncheckedCreateInput>
    /**
     * In case the DeliveryAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryAttemptUpdateInput, DeliveryAttemptUncheckedUpdateInput>
  }

  /**
   * DeliveryAttempt delete
   */
  export type DeliveryAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
    /**
     * Filter which DeliveryAttempt to delete.
     */
    where: DeliveryAttemptWhereUniqueInput
  }

  /**
   * DeliveryAttempt deleteMany
   */
  export type DeliveryAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryAttempts to delete
     */
    where?: DeliveryAttemptWhereInput
    /**
     * Limit how many DeliveryAttempts to delete.
     */
    limit?: number
  }

  /**
   * DeliveryAttempt without action
   */
  export type DeliveryAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryAttempt
     */
    select?: DeliveryAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryAttempt
     */
    omit?: DeliveryAttemptOmit<ExtArgs> | null
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
    claimedAt: Date | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    topic: string | null
    eventType: string | null
    claimedAt: Date | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    tenantId: number
    topic: number
    eventType: number
    payload: number
    claimedAt: number
    createdAt: number
    publishedAt: number
    _all: number
  }


  export type OutboxEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    claimedAt?: true
    createdAt?: true
    publishedAt?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    claimedAt?: true
    createdAt?: true
    publishedAt?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    topic?: true
    eventType?: true
    payload?: true
    claimedAt?: true
    createdAt?: true
    publishedAt?: true
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
    claimedAt: Date | null
    createdAt: Date
    publishedAt: Date | null
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
    claimedAt?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    claimedAt?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    claimedAt?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    topic?: boolean
    eventType?: boolean
    payload?: boolean
    claimedAt?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }

  export type OutboxEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "topic" | "eventType" | "payload" | "claimedAt" | "createdAt" | "publishedAt", ExtArgs["result"]["outboxEvent"]>

  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      topic: string
      eventType: string
      payload: Prisma.JsonValue
      claimedAt: Date | null
      createdAt: Date
      publishedAt: Date | null
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
    readonly claimedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly createdAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly publishedAt: FieldRef<"OutboxEvent", 'DateTime'>
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
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DriverScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    licenseNumber: 'licenseNumber',
    licenseExpiry: 'licenseExpiry',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    shiftStatus: 'shiftStatus',
    currentLat: 'currentLat',
    currentLng: 'currentLng',
    assignedVehicleId: 'assignedVehicleId',
    createdAt: 'createdAt'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    licensePlate: 'licensePlate',
    vehicleClass: 'vehicleClass',
    maxWeightKg: 'maxWeightKg',
    volumeM3: 'volumeM3',
    maintenanceState: 'maintenanceState',
    insuranceValid: 'insuranceValid',
    assignedDriverId: 'assignedDriverId',
    createdAt: 'createdAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const AssignmentOfferScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    driverId: 'driverId',
    shipmentId: 'shipmentId',
    status: 'status',
    respondBy: 'respondBy',
    createdAt: 'createdAt'
  };

  export type AssignmentOfferScalarFieldEnum = (typeof AssignmentOfferScalarFieldEnum)[keyof typeof AssignmentOfferScalarFieldEnum]


  export const DeliveryAttemptScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    shipmentId: 'shipmentId',
    driverId: 'driverId',
    outcome: 'outcome',
    reasonCode: 'reasonCode',
    photoUrl: 'photoUrl',
    createdAt: 'createdAt'
  };

  export type DeliveryAttemptScalarFieldEnum = (typeof DeliveryAttemptScalarFieldEnum)[keyof typeof DeliveryAttemptScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    topic: 'topic',
    eventType: 'eventType',
    payload: 'payload',
    claimedAt: 'claimedAt',
    createdAt: 'createdAt',
    publishedAt: 'publishedAt'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ShiftStatus'
   */
  export type EnumShiftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftStatus'>
    


  /**
   * Reference to a field of type 'ShiftStatus[]'
   */
  export type ListEnumShiftStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShiftStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'MaintenanceState'
   */
  export type EnumMaintenanceStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceState'>
    


  /**
   * Reference to a field of type 'MaintenanceState[]'
   */
  export type ListEnumMaintenanceStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MaintenanceState[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OfferStatus'
   */
  export type EnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus'>
    


  /**
   * Reference to a field of type 'OfferStatus[]'
   */
  export type ListEnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus[]'>
    


  /**
   * Reference to a field of type 'AttemptOutcome'
   */
  export type EnumAttemptOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttemptOutcome'>
    


  /**
   * Reference to a field of type 'AttemptOutcome[]'
   */
  export type ListEnumAttemptOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AttemptOutcome[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: StringFilter<"Driver"> | string
    tenantId?: StringFilter<"Driver"> | string
    licenseNumber?: StringFilter<"Driver"> | string
    licenseExpiry?: DateTimeFilter<"Driver"> | Date | string
    emergencyContactName?: StringFilter<"Driver"> | string
    emergencyContactPhone?: StringFilter<"Driver"> | string
    shiftStatus?: EnumShiftStatusFilter<"Driver"> | $Enums.ShiftStatus
    currentLat?: FloatNullableFilter<"Driver"> | number | null
    currentLng?: FloatNullableFilter<"Driver"> | number | null
    assignedVehicleId?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiry?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    shiftStatus?: SortOrder
    currentLat?: SortOrderInput | SortOrder
    currentLng?: SortOrderInput | SortOrder
    assignedVehicleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    tenantId?: StringFilter<"Driver"> | string
    licenseNumber?: StringFilter<"Driver"> | string
    licenseExpiry?: DateTimeFilter<"Driver"> | Date | string
    emergencyContactName?: StringFilter<"Driver"> | string
    emergencyContactPhone?: StringFilter<"Driver"> | string
    shiftStatus?: EnumShiftStatusFilter<"Driver"> | $Enums.ShiftStatus
    currentLat?: FloatNullableFilter<"Driver"> | number | null
    currentLng?: FloatNullableFilter<"Driver"> | number | null
    assignedVehicleId?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
  }, "id">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiry?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    shiftStatus?: SortOrder
    currentLat?: SortOrderInput | SortOrder
    currentLng?: SortOrderInput | SortOrder
    assignedVehicleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _avg?: DriverAvgOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
    _sum?: DriverSumOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Driver"> | string
    tenantId?: StringWithAggregatesFilter<"Driver"> | string
    licenseNumber?: StringWithAggregatesFilter<"Driver"> | string
    licenseExpiry?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    emergencyContactName?: StringWithAggregatesFilter<"Driver"> | string
    emergencyContactPhone?: StringWithAggregatesFilter<"Driver"> | string
    shiftStatus?: EnumShiftStatusWithAggregatesFilter<"Driver"> | $Enums.ShiftStatus
    currentLat?: FloatNullableWithAggregatesFilter<"Driver"> | number | null
    currentLng?: FloatNullableWithAggregatesFilter<"Driver"> | number | null
    assignedVehicleId?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    tenantId?: StringFilter<"Vehicle"> | string
    licensePlate?: StringFilter<"Vehicle"> | string
    vehicleClass?: StringFilter<"Vehicle"> | string
    maxWeightKg?: FloatFilter<"Vehicle"> | number
    volumeM3?: FloatFilter<"Vehicle"> | number
    maintenanceState?: EnumMaintenanceStateFilter<"Vehicle"> | $Enums.MaintenanceState
    insuranceValid?: BoolFilter<"Vehicle"> | boolean
    assignedDriverId?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licensePlate?: SortOrder
    vehicleClass?: SortOrder
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
    maintenanceState?: SortOrder
    insuranceValid?: SortOrder
    assignedDriverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    licensePlate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    tenantId?: StringFilter<"Vehicle"> | string
    vehicleClass?: StringFilter<"Vehicle"> | string
    maxWeightKg?: FloatFilter<"Vehicle"> | number
    volumeM3?: FloatFilter<"Vehicle"> | number
    maintenanceState?: EnumMaintenanceStateFilter<"Vehicle"> | $Enums.MaintenanceState
    insuranceValid?: BoolFilter<"Vehicle"> | boolean
    assignedDriverId?: StringNullableFilter<"Vehicle"> | string | null
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
  }, "id" | "licensePlate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licensePlate?: SortOrder
    vehicleClass?: SortOrder
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
    maintenanceState?: SortOrder
    insuranceValid?: SortOrder
    assignedDriverId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    tenantId?: StringWithAggregatesFilter<"Vehicle"> | string
    licensePlate?: StringWithAggregatesFilter<"Vehicle"> | string
    vehicleClass?: StringWithAggregatesFilter<"Vehicle"> | string
    maxWeightKg?: FloatWithAggregatesFilter<"Vehicle"> | number
    volumeM3?: FloatWithAggregatesFilter<"Vehicle"> | number
    maintenanceState?: EnumMaintenanceStateWithAggregatesFilter<"Vehicle"> | $Enums.MaintenanceState
    insuranceValid?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    assignedDriverId?: StringNullableWithAggregatesFilter<"Vehicle"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type AssignmentOfferWhereInput = {
    AND?: AssignmentOfferWhereInput | AssignmentOfferWhereInput[]
    OR?: AssignmentOfferWhereInput[]
    NOT?: AssignmentOfferWhereInput | AssignmentOfferWhereInput[]
    id?: StringFilter<"AssignmentOffer"> | string
    tenantId?: StringFilter<"AssignmentOffer"> | string
    driverId?: StringFilter<"AssignmentOffer"> | string
    shipmentId?: StringFilter<"AssignmentOffer"> | string
    status?: EnumOfferStatusFilter<"AssignmentOffer"> | $Enums.OfferStatus
    respondBy?: DateTimeNullableFilter<"AssignmentOffer"> | Date | string | null
    createdAt?: DateTimeFilter<"AssignmentOffer"> | Date | string
  }

  export type AssignmentOfferOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    driverId?: SortOrder
    shipmentId?: SortOrder
    status?: SortOrder
    respondBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AssignmentOfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssignmentOfferWhereInput | AssignmentOfferWhereInput[]
    OR?: AssignmentOfferWhereInput[]
    NOT?: AssignmentOfferWhereInput | AssignmentOfferWhereInput[]
    tenantId?: StringFilter<"AssignmentOffer"> | string
    driverId?: StringFilter<"AssignmentOffer"> | string
    shipmentId?: StringFilter<"AssignmentOffer"> | string
    status?: EnumOfferStatusFilter<"AssignmentOffer"> | $Enums.OfferStatus
    respondBy?: DateTimeNullableFilter<"AssignmentOffer"> | Date | string | null
    createdAt?: DateTimeFilter<"AssignmentOffer"> | Date | string
  }, "id">

  export type AssignmentOfferOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    driverId?: SortOrder
    shipmentId?: SortOrder
    status?: SortOrder
    respondBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AssignmentOfferCountOrderByAggregateInput
    _max?: AssignmentOfferMaxOrderByAggregateInput
    _min?: AssignmentOfferMinOrderByAggregateInput
  }

  export type AssignmentOfferScalarWhereWithAggregatesInput = {
    AND?: AssignmentOfferScalarWhereWithAggregatesInput | AssignmentOfferScalarWhereWithAggregatesInput[]
    OR?: AssignmentOfferScalarWhereWithAggregatesInput[]
    NOT?: AssignmentOfferScalarWhereWithAggregatesInput | AssignmentOfferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssignmentOffer"> | string
    tenantId?: StringWithAggregatesFilter<"AssignmentOffer"> | string
    driverId?: StringWithAggregatesFilter<"AssignmentOffer"> | string
    shipmentId?: StringWithAggregatesFilter<"AssignmentOffer"> | string
    status?: EnumOfferStatusWithAggregatesFilter<"AssignmentOffer"> | $Enums.OfferStatus
    respondBy?: DateTimeNullableWithAggregatesFilter<"AssignmentOffer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AssignmentOffer"> | Date | string
  }

  export type DeliveryAttemptWhereInput = {
    AND?: DeliveryAttemptWhereInput | DeliveryAttemptWhereInput[]
    OR?: DeliveryAttemptWhereInput[]
    NOT?: DeliveryAttemptWhereInput | DeliveryAttemptWhereInput[]
    id?: StringFilter<"DeliveryAttempt"> | string
    tenantId?: StringFilter<"DeliveryAttempt"> | string
    shipmentId?: StringFilter<"DeliveryAttempt"> | string
    driverId?: StringFilter<"DeliveryAttempt"> | string
    outcome?: EnumAttemptOutcomeFilter<"DeliveryAttempt"> | $Enums.AttemptOutcome
    reasonCode?: StringNullableFilter<"DeliveryAttempt"> | string | null
    photoUrl?: StringNullableFilter<"DeliveryAttempt"> | string | null
    createdAt?: DateTimeFilter<"DeliveryAttempt"> | Date | string
  }

  export type DeliveryAttemptOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    shipmentId?: SortOrder
    driverId?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type DeliveryAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliveryAttemptWhereInput | DeliveryAttemptWhereInput[]
    OR?: DeliveryAttemptWhereInput[]
    NOT?: DeliveryAttemptWhereInput | DeliveryAttemptWhereInput[]
    tenantId?: StringFilter<"DeliveryAttempt"> | string
    shipmentId?: StringFilter<"DeliveryAttempt"> | string
    driverId?: StringFilter<"DeliveryAttempt"> | string
    outcome?: EnumAttemptOutcomeFilter<"DeliveryAttempt"> | $Enums.AttemptOutcome
    reasonCode?: StringNullableFilter<"DeliveryAttempt"> | string | null
    photoUrl?: StringNullableFilter<"DeliveryAttempt"> | string | null
    createdAt?: DateTimeFilter<"DeliveryAttempt"> | Date | string
  }, "id">

  export type DeliveryAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    shipmentId?: SortOrder
    driverId?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DeliveryAttemptCountOrderByAggregateInput
    _max?: DeliveryAttemptMaxOrderByAggregateInput
    _min?: DeliveryAttemptMinOrderByAggregateInput
  }

  export type DeliveryAttemptScalarWhereWithAggregatesInput = {
    AND?: DeliveryAttemptScalarWhereWithAggregatesInput | DeliveryAttemptScalarWhereWithAggregatesInput[]
    OR?: DeliveryAttemptScalarWhereWithAggregatesInput[]
    NOT?: DeliveryAttemptScalarWhereWithAggregatesInput | DeliveryAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeliveryAttempt"> | string
    tenantId?: StringWithAggregatesFilter<"DeliveryAttempt"> | string
    shipmentId?: StringWithAggregatesFilter<"DeliveryAttempt"> | string
    driverId?: StringWithAggregatesFilter<"DeliveryAttempt"> | string
    outcome?: EnumAttemptOutcomeWithAggregatesFilter<"DeliveryAttempt"> | $Enums.AttemptOutcome
    reasonCode?: StringNullableWithAggregatesFilter<"DeliveryAttempt"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"DeliveryAttempt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeliveryAttempt"> | Date | string
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
    claimedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
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
    claimedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    claimedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
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
    claimedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
  }

  export type DriverCreateInput = {
    id: string
    tenantId: string
    licenseNumber: string
    licenseExpiry: Date | string
    emergencyContactName: string
    emergencyContactPhone: string
    shiftStatus?: $Enums.ShiftStatus
    currentLat?: number | null
    currentLng?: number | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
  }

  export type DriverUncheckedCreateInput = {
    id: string
    tenantId: string
    licenseNumber: string
    licenseExpiry: Date | string
    emergencyContactName: string
    emergencyContactPhone: string
    shiftStatus?: $Enums.ShiftStatus
    currentLat?: number | null
    currentLng?: number | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
  }

  export type DriverUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    emergencyContactName?: StringFieldUpdateOperationsInput | string
    emergencyContactPhone?: StringFieldUpdateOperationsInput | string
    shiftStatus?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLng?: NullableFloatFieldUpdateOperationsInput | number | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    emergencyContactName?: StringFieldUpdateOperationsInput | string
    emergencyContactPhone?: StringFieldUpdateOperationsInput | string
    shiftStatus?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLng?: NullableFloatFieldUpdateOperationsInput | number | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateManyInput = {
    id: string
    tenantId: string
    licenseNumber: string
    licenseExpiry: Date | string
    emergencyContactName: string
    emergencyContactPhone: string
    shiftStatus?: $Enums.ShiftStatus
    currentLat?: number | null
    currentLng?: number | null
    assignedVehicleId?: string | null
    createdAt?: Date | string
  }

  export type DriverUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    emergencyContactName?: StringFieldUpdateOperationsInput | string
    emergencyContactPhone?: StringFieldUpdateOperationsInput | string
    shiftStatus?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLng?: NullableFloatFieldUpdateOperationsInput | number | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    emergencyContactName?: StringFieldUpdateOperationsInput | string
    emergencyContactPhone?: StringFieldUpdateOperationsInput | string
    shiftStatus?: EnumShiftStatusFieldUpdateOperationsInput | $Enums.ShiftStatus
    currentLat?: NullableFloatFieldUpdateOperationsInput | number | null
    currentLng?: NullableFloatFieldUpdateOperationsInput | number | null
    assignedVehicleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    tenantId: string
    licensePlate: string
    vehicleClass: string
    maxWeightKg: number
    volumeM3: number
    maintenanceState?: $Enums.MaintenanceState
    insuranceValid?: boolean
    assignedDriverId?: string | null
    createdAt?: Date | string
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    tenantId: string
    licensePlate: string
    vehicleClass: string
    maxWeightKg: number
    volumeM3: number
    maintenanceState?: $Enums.MaintenanceState
    insuranceValid?: boolean
    assignedDriverId?: string | null
    createdAt?: Date | string
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    vehicleClass?: StringFieldUpdateOperationsInput | string
    maxWeightKg?: FloatFieldUpdateOperationsInput | number
    volumeM3?: FloatFieldUpdateOperationsInput | number
    maintenanceState?: EnumMaintenanceStateFieldUpdateOperationsInput | $Enums.MaintenanceState
    insuranceValid?: BoolFieldUpdateOperationsInput | boolean
    assignedDriverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    vehicleClass?: StringFieldUpdateOperationsInput | string
    maxWeightKg?: FloatFieldUpdateOperationsInput | number
    volumeM3?: FloatFieldUpdateOperationsInput | number
    maintenanceState?: EnumMaintenanceStateFieldUpdateOperationsInput | $Enums.MaintenanceState
    insuranceValid?: BoolFieldUpdateOperationsInput | boolean
    assignedDriverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateManyInput = {
    id?: string
    tenantId: string
    licensePlate: string
    vehicleClass: string
    maxWeightKg: number
    volumeM3: number
    maintenanceState?: $Enums.MaintenanceState
    insuranceValid?: boolean
    assignedDriverId?: string | null
    createdAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    vehicleClass?: StringFieldUpdateOperationsInput | string
    maxWeightKg?: FloatFieldUpdateOperationsInput | number
    volumeM3?: FloatFieldUpdateOperationsInput | number
    maintenanceState?: EnumMaintenanceStateFieldUpdateOperationsInput | $Enums.MaintenanceState
    insuranceValid?: BoolFieldUpdateOperationsInput | boolean
    assignedDriverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    licensePlate?: StringFieldUpdateOperationsInput | string
    vehicleClass?: StringFieldUpdateOperationsInput | string
    maxWeightKg?: FloatFieldUpdateOperationsInput | number
    volumeM3?: FloatFieldUpdateOperationsInput | number
    maintenanceState?: EnumMaintenanceStateFieldUpdateOperationsInput | $Enums.MaintenanceState
    insuranceValid?: BoolFieldUpdateOperationsInput | boolean
    assignedDriverId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentOfferCreateInput = {
    id: string
    tenantId: string
    driverId: string
    shipmentId: string
    status?: $Enums.OfferStatus
    respondBy?: Date | string | null
    createdAt?: Date | string
  }

  export type AssignmentOfferUncheckedCreateInput = {
    id: string
    tenantId: string
    driverId: string
    shipmentId: string
    status?: $Enums.OfferStatus
    respondBy?: Date | string | null
    createdAt?: Date | string
  }

  export type AssignmentOfferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    respondBy?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentOfferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    respondBy?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentOfferCreateManyInput = {
    id: string
    tenantId: string
    driverId: string
    shipmentId: string
    status?: $Enums.OfferStatus
    respondBy?: Date | string | null
    createdAt?: Date | string
  }

  export type AssignmentOfferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    respondBy?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentOfferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    respondBy?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAttemptCreateInput = {
    id?: string
    tenantId: string
    shipmentId: string
    driverId: string
    outcome: $Enums.AttemptOutcome
    reasonCode?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type DeliveryAttemptUncheckedCreateInput = {
    id?: string
    tenantId: string
    shipmentId: string
    driverId: string
    outcome: $Enums.AttemptOutcome
    reasonCode?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type DeliveryAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    outcome?: EnumAttemptOutcomeFieldUpdateOperationsInput | $Enums.AttemptOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    outcome?: EnumAttemptOutcomeFieldUpdateOperationsInput | $Enums.AttemptOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAttemptCreateManyInput = {
    id?: string
    tenantId: string
    shipmentId: string
    driverId: string
    outcome: $Enums.AttemptOutcome
    reasonCode?: string | null
    photoUrl?: string | null
    createdAt?: Date | string
  }

  export type DeliveryAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    outcome?: EnumAttemptOutcomeFieldUpdateOperationsInput | $Enums.AttemptOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    outcome?: EnumAttemptOutcomeFieldUpdateOperationsInput | $Enums.AttemptOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    claimedAt?: Date | string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type OutboxEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    claimedAt?: Date | string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventCreateManyInput = {
    id?: string
    tenantId: string
    topic: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    claimedAt?: Date | string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    claimedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumShiftStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusFilter<$PrismaModel> | $Enums.ShiftStatus
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiry?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    shiftStatus?: SortOrder
    currentLat?: SortOrder
    currentLng?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
  }

  export type DriverAvgOrderByAggregateInput = {
    currentLat?: SortOrder
    currentLng?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiry?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    shiftStatus?: SortOrder
    currentLat?: SortOrder
    currentLng?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licenseNumber?: SortOrder
    licenseExpiry?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    shiftStatus?: SortOrder
    currentLat?: SortOrder
    currentLng?: SortOrder
    assignedVehicleId?: SortOrder
    createdAt?: SortOrder
  }

  export type DriverSumOrderByAggregateInput = {
    currentLat?: SortOrder
    currentLng?: SortOrder
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

  export type EnumShiftStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftStatusFilter<$PrismaModel>
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

  export type EnumMaintenanceStateFilter<$PrismaModel = never> = {
    equals?: $Enums.MaintenanceState | EnumMaintenanceStateFieldRefInput<$PrismaModel>
    in?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    not?: NestedEnumMaintenanceStateFilter<$PrismaModel> | $Enums.MaintenanceState
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licensePlate?: SortOrder
    vehicleClass?: SortOrder
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
    maintenanceState?: SortOrder
    insuranceValid?: SortOrder
    assignedDriverId?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licensePlate?: SortOrder
    vehicleClass?: SortOrder
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
    maintenanceState?: SortOrder
    insuranceValid?: SortOrder
    assignedDriverId?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    licensePlate?: SortOrder
    vehicleClass?: SortOrder
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
    maintenanceState?: SortOrder
    insuranceValid?: SortOrder
    assignedDriverId?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    maxWeightKg?: SortOrder
    volumeM3?: SortOrder
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

  export type EnumMaintenanceStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaintenanceState | EnumMaintenanceStateFieldRefInput<$PrismaModel>
    in?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    not?: NestedEnumMaintenanceStateWithAggregatesFilter<$PrismaModel> | $Enums.MaintenanceState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMaintenanceStateFilter<$PrismaModel>
    _max?: NestedEnumMaintenanceStateFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
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

  export type AssignmentOfferCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    driverId?: SortOrder
    shipmentId?: SortOrder
    status?: SortOrder
    respondBy?: SortOrder
    createdAt?: SortOrder
  }

  export type AssignmentOfferMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    driverId?: SortOrder
    shipmentId?: SortOrder
    status?: SortOrder
    respondBy?: SortOrder
    createdAt?: SortOrder
  }

  export type AssignmentOfferMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    driverId?: SortOrder
    shipmentId?: SortOrder
    status?: SortOrder
    respondBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
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

  export type EnumAttemptOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptOutcome | EnumAttemptOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttemptOutcomeFilter<$PrismaModel> | $Enums.AttemptOutcome
  }

  export type DeliveryAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    shipmentId?: SortOrder
    driverId?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliveryAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    shipmentId?: SortOrder
    driverId?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliveryAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    shipmentId?: SortOrder
    driverId?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    photoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAttemptOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptOutcome | EnumAttemptOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttemptOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.AttemptOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttemptOutcomeFilter<$PrismaModel>
    _max?: NestedEnumAttemptOutcomeFilter<$PrismaModel>
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
    claimedAt?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    claimedAt?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    topic?: SortOrder
    eventType?: SortOrder
    claimedAt?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumShiftStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShiftStatus
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

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumMaintenanceStateFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceState
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumOfferStatusFieldUpdateOperationsInput = {
    set?: $Enums.OfferStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumAttemptOutcomeFieldUpdateOperationsInput = {
    set?: $Enums.AttemptOutcome
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

  export type NestedEnumShiftStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusFilter<$PrismaModel> | $Enums.ShiftStatus
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

  export type NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShiftStatus | EnumShiftStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShiftStatus[] | ListEnumShiftStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShiftStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftStatusFilter<$PrismaModel>
    _max?: NestedEnumShiftStatusFilter<$PrismaModel>
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

  export type NestedEnumMaintenanceStateFilter<$PrismaModel = never> = {
    equals?: $Enums.MaintenanceState | EnumMaintenanceStateFieldRefInput<$PrismaModel>
    in?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    not?: NestedEnumMaintenanceStateFilter<$PrismaModel> | $Enums.MaintenanceState
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumMaintenanceStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MaintenanceState | EnumMaintenanceStateFieldRefInput<$PrismaModel>
    in?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.MaintenanceState[] | ListEnumMaintenanceStateFieldRefInput<$PrismaModel>
    not?: NestedEnumMaintenanceStateWithAggregatesFilter<$PrismaModel> | $Enums.MaintenanceState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMaintenanceStateFilter<$PrismaModel>
    _max?: NestedEnumMaintenanceStateFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
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

  export type NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
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

  export type NestedEnumAttemptOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptOutcome | EnumAttemptOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttemptOutcomeFilter<$PrismaModel> | $Enums.AttemptOutcome
  }

  export type NestedEnumAttemptOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttemptOutcome | EnumAttemptOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AttemptOutcome[] | ListEnumAttemptOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumAttemptOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.AttemptOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAttemptOutcomeFilter<$PrismaModel>
    _max?: NestedEnumAttemptOutcomeFilter<$PrismaModel>
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