# LogiFlow 🚚

> **Multi-Tenant Logistics & Real-Time Fleet Management Platform**

LogiFlow is an event-driven, multi-tenant logistics platform designed to manage the end-to-end delivery lifecycle. Built with a modular **NestJS microservices monorepo**, LogiFlow orchestrates high-volume order ingestion, automated heuristic driver dispatching, live GPS telemetry streaming, driver workflows with Proof of Delivery (PoD), and operational analytics.

---

## 🏗️ System Architecture

LogiFlow adopts a decoupled microservices architecture powered by **Apache Kafka** (KRaft mode) for asynchronous event-driven communication and **Polyglot Persistence**.

```
                           ┌─────────────────────────┐
                           │   Clients (Web / PWA)   │
                           └────────────┬────────────┘
                                        │ HTTP / WS
                                        ▼
                      ┌───────────────────────────────────┐
                      │        API Gateway (:3000)        │
                      └─────────────────┬─────────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
  │   Identity Service  │    │  Shipment Service   │    │  Dispatch Service   │
  │     (Port 3001)     │    │     (Port 3002)     │    │     (Port 3003)     │
  │ (PostgreSQL/Prisma) │    │ (PostgreSQL/Prisma) │    │ (PostgreSQL/Prisma) │
  └──────────┬──────────┘    └──────────┬──────────┘    └──────────┬──────────┘
             │                          │                          │
             └───────────────────► Apache Kafka ◄──────────────────┘
                                 (Event Backbone)
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
  │   Driver Service    │    │  Tracking Service   │    │Notification Service │
  │     (Port 3004)     │    │     (Port 3005)     │    │     (Port 3006)     │
  │ (PostgreSQL/Prisma) │    │  (Redis + MongoDB)  │    │ (BullMQ / Resend)   │
  └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

---

## 📦 Microservices Breakdown

### 1. `api-gateway` (Port `3000`)
- **Technology**: NestJS, Express, `http-proxy-middleware`, `express-rate-limit`, `helmet`
- **Responsibilities**:
  - Centralized reverse-proxy routing requests under `/api/v1/*` to downstream services.
  - Granular context-aware rate limiting (stricter for auth/onboarding, relaxed for tracking).
  - Client IP spoofing protection by sanitizing incoming `X-Forwarded-*` headers.
  - WebSocket proxying for live telemetry and driver ingestion.
  - Streaming SSE pass-through without upstream timeouts.
  - Request body limits (e.g., 11MB for CSV batch imports, 1MB default).

### 2. `identity-service` (Port `3001`)
- **Database**: PostgreSQL (`logiflow_identity`) via Prisma ORM
- **Responsibilities**:
  - Multi-tenant authentication (JWT access tokens with cookie extraction, refresh tokens).
  - Token blacklisting and instant revocation using Redis.
  - Google OAuth 2.0 integration.
  - Role-Based Access Control (RBAC): `SUPER_ADMIN`, `BUSINESS_ADMIN`, `DISPATCHER`, `DRIVER`.
  - Organization join requests, join codes, and 6-digit email verification flow.
  - Scoped API key management with bcrypt/SHA-256 hashing and IP allowlists.
  - Tenant branch management.

### 3. `shipment-service` (Port `3002`)
- **Database**: PostgreSQL (`logiflow_shipment`) via Prisma ORM
- **Responsibilities**:
  - Strict Finite State Machine: `PENDING` $\rightarrow$ `DISPATCHING` $\rightarrow$ `ASSIGNED` $\rightarrow$ `PICKED_UP` $\rightarrow$ `IN_TRANSIT` $\rightarrow$ `DELIVERED` (or `CANCELLED` / `FAILED`).
  - Cryptographically secure tracking code (`LF-XXXXXXXXXXXX`) and 4-digit delivery OTP generation.
  - Timing-safe delivery OTP verification (`crypto.timingSafeEqual`) with attempt counters.
  - High-volume batch CSV/Excel shipment imports processed asynchronously via BullMQ.
  - Transactional Outbox publishing for shipment state events.

### 4. `dispatch-service` (Port `3003`)
- **Database**: PostgreSQL (`logiflow_dispatch`) via Prisma ORM
- **Responsibilities**:
  - Heuristic candidate scoring algorithm:
    $$\text{Score} = w_{\text{proximity}} \cdot \text{Proximity} + w_{\text{capacity}} \cdot \text{Capacity} + w_{\text{workload}} \cdot \text{Workload}$$
  - Driver candidate projection (`DriverCandidateView`) synced via Kafka driver feed.
  - Automatic escalation from tenant private fleet to freelance platform drivers after `maxOwnAttempts`.
  - Concurrency-safe dispatching with PostgreSQL transaction-level advisory locks (`pg_advisory_xact_lock`).
  - Background timeout checker automatically expiring unanswered offers and triggering re-dispatching.
  - Manual dispatcher override and candidate preview dry-runs.

### 5. `driver-service` (Port `3004`)
- **Database**: PostgreSQL (`logiflow_driver`) via Prisma ORM
- **Responsibilities**:
  - Driver onboarding, licensing validation, and vehicle asset registry.
  - Vehicle maintenance state (`OPERATIONAL`, `IN_MAINTENANCE`) and insurance validation.
  - Shift state machine (`OFFLINE`, `AVAILABLE`, `ON_BREAK`, `BUSY`) with automatic idle release.
  - Driver assignment offer view (`AssignmentOffer`) and response processing (`ACCEPT` / `REJECT`).
  - Delivery milestone execution: `ARRIVED_AT_PICKUP`, `PACKAGE_COLLECTED`, `START_DELIVERY`.
  - Proof of Delivery (PoD) flow via OTP confirmation or failure with reason code and photo URL.

### 6. `tracking-service` (Port `3005`)
- **Databases**:
  - **Redis 7**: In-memory geospatial indexing (`GEOADD`), driver live position cache, and speed/ETA calculation.
  - **MongoDB 7**: Historical GPS breadcrumbs collection with automatic 30-day TTL expiration index.
- **Responsibilities**:
  - Real-time Socket.IO namespaces:
    - `/ingest`: High-throughput GPS ping ingestion from mobile driver apps with batch deduplication.
    - `/live`: Tenant-scoped real-time driver tracking for dispatchers.
    - `/track`: Public tracking page showing live delivery progress with ETA and guess rate limiting.
  - Out-of-order ping sorting and historical telemetry storage.
  - Trip read-model tracking picked-up and completed orders.

### 7. `notification-service` (Port `3006`)
- **Database**: PostgreSQL (`logiflow_notification`) via Prisma ORM
- **Responsibilities**:
  - Asynchronous email delivery backed by BullMQ Redis queues.
  - Resend API and SMTP transport with dev mode fallback (emails logged to console if unconfigured).
  - Handlebars email templates (Delivery OTP, Delivery Receipt, Organization Invitation, Join Request Approval/Rejection/Verification).
  - Real-time Server-Sent Events (SSE) stream (`/api/v1/alerts/stream`) pushing in-app alerts to dispatchers.
  - Alert deduplication via idempotent keys and dispatch acknowledgment tracking.

---

## 📚 Shared Libraries (`libs/`)

- **`@app/common`**:
  - `ClsService` integration (`nestjs-cls`) for AsyncLocalStorage-based tenant context propagation.
  - `buildTenantScopingExtension`: Transparent Prisma client extension enforcing multi-tenant isolation and driver-level row scoping.
  - `FieldCrypto`: Authenticated field-level encryption (**AES-256-GCM**) with Associated Data (AAD) and key rotation support.
  - JWT Passport strategy, RBAC guards (`RolesGuard`), scope guards (`ScopeGuard`), and public route decorators.
  - Centralized Redis service for token blacklists and distributed locks.
- **`@app/contracts`**:
  - Centralized Kafka topic names (`shipment.events`, `dispatch.events`, `driver.events`, `tracking.events`, `notification.requests`).
  - Standardized Kafka message envelope (`KafkaEnvelope`) with correlation metadata.
  - Typed DTOs, event payload schemas, notification templates, and RBAC permission scopes.

---

## 🛠️ Technology Stack

- **Framework**: [NestJS 11](https://nestjs.com/) & [Node.js](https://nodejs.org/) (LTS v20+)
- **Package Manager & Monorepo**: [pnpm](https://pnpm.io/) workspaces
- **Databases**:
  - **PostgreSQL 16**: Relational business data, transactions, and multi-tenant scoping.
  - **MongoDB 7**: Telemetry store for GPS breadcrumb time-series data.
  - **Redis 7**: In-memory cache, token blacklists, BullMQ job queues, and geospatial coordinates.
- **Event Bus**: **Apache Kafka 7.6 (KRaft mode)**
- **ORM / ODM**: [Prisma ORM 6](https://www.prisma.io/) & [Mongoose](https://mongoosejs.com/)
- **Templating & Email**: Handlebars & Nodemailer / Resend

---

## ⚙️ Environment Variables

| Variable | Description |
| :--- | :--- |
| `FRONTEND_URL` | Allowed CORS origin for web clients |
| `IDENTITY_DATABASE_URL` | PostgreSQL connection for Identity Service | 
| `SHIPMENT_DATABASE_URL` | PostgreSQL connection for Shipment Service | 
| `DRIVER_DATABASE_URL` | PostgreSQL connection for Driver Service | 
| `DISPATCH_DATABASE_URL` | PostgreSQL connection for Dispatch Service |
| `NOTIFICATION_DATABASE_URL` | PostgreSQL connection for Notification Service |
| `REDIS_HOST` | Redis server hostname |
| `REDIS_PORT` | Redis server port | 
| `MONGO_URI` | MongoDB connection string for GPS telemetry |
| `KAFKA_BROKER` | Kafka bootstrap broker address | 
| `JWT_SECRET` | 256-bit secret used to sign JWT access tokens | 
| `JWT_EXPIRES_IN` | Access token lifespan | 
| `JWT_REFRESH_SECRET` | Secret used to sign refresh tokens |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifespan |
| `ACCESS_COOKIE_NAME` | Name of HTTP-only cookie storing access token |
| `GATEWAY_PORT` | Port for the API Gateway | `3000` |
| `IDENTITY_PORT` | Port for Identity Service | `3001` |
| `SHIPMENT_PORT` | Port for Shipment Service | `3002` |
| `DISPATCH_PORT` | Port for Dispatch Service | `3003` |
| `DRIVER_PORT` | Port for Driver Service | `3004` |
| `TRACKING_PORT` | Port for Tracking Service | `3005` |
| `NOTIFICATION_PORT` | Port for Notification Service | `3006` |
| `DSP_WEIGHT_PROXIMITY` | Candidate matching weight for distance |
| `DSP_WEIGHT_CAPACITY` | Candidate matching weight for vehicle capacity | 
| `DSP_WEIGHT_WORKLOAD` | Candidate matching weight for driver workload | 
| `DSP_ASSIGNMENT_TIMEOUT_SECONDS` | Timeout before an unaccepted offer expires |
| `RESEND_API_KEY` | Resend API key for outbound transactional emails | Optional (falls back to console log) |
| `SMTP_HOST` / `SMTP_PORT` | Custom SMTP configuration | Optional |
| `EMAIL_FROM` | Default "from" email address |
| `FIELD_KEY_V1` | 32-byte base64 key for AES-256-GCM encryption |
| `FIELD_KEY_CURRENT` | Identifier of active encryption key |
| `TRUST_PROXY_HOPS` | Number of trusted proxy hops behind reverse proxies |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v20 or higher
- **pnpm**: `npm install -g pnpm`
- **Docker & Docker Compose**

### 2. Start Backing Infrastructure
Start PostgreSQL, Redis, MongoDB, Kafka (KRaft mode), and Kafka UI:

```bash
pnpm run docker:up
```

Access services locally:
- **Kafka UI**: [http://localhost:8080](http://localhost:8080)
- **PostgreSQL**: `localhost:5432` (User: `logiflow_admin`, Password: `password123`)
- **Redis**: `localhost:6379`
- **MongoDB**: `localhost:27017`

### 3. Install Dependencies
```bash
pnpm install
```

## 📜 All NPM Scripts

### Infrastructure Commands
| Command | Description |
| :--- | :--- |
| `pnpm run docker:up` | Starts Postgres, Redis, MongoDB, Kafka, and Kafka UI in background |
| `pnpm run docker:down` | Stops and removes all Docker containers |
| `pnpm run docker:logs` | Streams live logs from all running Docker containers |

### Microservices Development Commands
| Command | Service | Port | Description |
| :--- | :--- | :--- | :--- |
| `pnpm run start:dev:gateway` | API Gateway | `3000` | Gateway reverse proxy, routing & rate limiter |
| `pnpm run start:dev:identity` | Identity Service | `3001` | Auth, tenants, RBAC & API keys |
| `pnpm run start:dev:shipment` | Shipment Service | `3002` | Shipments, FSM & batch imports |
| `pnpm run start:dev:dispatch` | Dispatch Service | `3003` | Heuristic matching & timeout checker |
| `pnpm run start:dev:driver` | Driver Service | `3004` | Fleet, shifts & delivery confirmation |
| `pnpm run start:dev:tracking` | Tracking Service | `3005` | GPS ingestion & Socket.IO live gateways |
| `pnpm run start:dev:notification`| Notification Service | `3006` | BullMQ email worker & SSE alerts |

### Database & Prisma Commands
| Command | Port | Description |
| :--- | :--- | :--- |
| `pnpm run prisma:identity:migrate` | - | Run migrations for Identity database |
| `pnpm run prisma:identity:studio` | `5555` | Open Prisma Studio for Identity records |
| `pnpm run prisma:shipment:migrate` | - | Run migrations for Shipment database |
| `pnpm run prisma:shipment:studio` | `5556` | Open Prisma Studio for Shipment records |
| `pnpm run prisma:dispatch:migrate` | - | Run migrations for Dispatch database |
| `pnpm run prisma:dispatch:studio` | `5557` | Open Prisma Studio for Dispatch records |
| `pnpm run prisma:driver:migrate` | - | Run migrations for Driver database |
| `pnpm run prisma:driver:studio` | `5558` | Open Prisma Studio for Driver records |
| `pnpm run prisma:notification:migrate`| - | Run migrations for Notification database |
| `pnpm run prisma:notification:studio` | `5559` | Open Prisma Studio for Notification logs |

### Build, Quality & Testing Commands
| Command | Description |
| :--- | :--- |
| `pnpm run build` | Builds all apps and libraries with Webpack |
| `pnpm run lint` | Runs ESLint across all TypeScript sources |
| `pnpm run format` | Runs Prettier across `apps` and `libs` |
| `pnpm run test` | Runs Jest unit tests across all projects |
| `pnpm run test:watch` | Runs Jest in interactive watch mode |
| `pnpm run test:cov` | Generates Jest test coverage reports |

### CLI Simulation & Telemetry Scripts
A CLI script is available in `scripts/tracking-demo.mjs` to simulate GPS drive telemetry:

```bash
# 1. Simulate a driver sending live GPS pings from a start to destination
node scripts/tracking-demo.mjs drive <driverToken> <startLat> <startLng> <destLat> <destLng>

# 2. Connect as a dispatcher to listen to tenant live fleet positions
node scripts/tracking-demo.mjs live <dispatcherToken>

# 3. Connect as a public customer tracking a delivery code
node scripts/tracking-demo.mjs track <trackingCode>
```

---

## 🔄 End-to-End Delivery Flow

```
1. Customer / Admin creates Shipment  ───►  ShipmentCreated (Kafka)
                                                      │
                                                      ▼
2. Dispatch Service matches candidate  ◄──  Heuristic Scoring Engine
                                                      │
                                                      ▼
3. Driver receives AssignmentOffer     ◄─── DriverAssigned (Kafka)
   (Driver accepts offer)
                                                      │
                                                      ▼
4. Driver arrives, collects package    ───► PackageCollected (Kafka)
                                                      │
                                                      ▼
5. Telemetry stream emits live GPS     ───► Redis Live Store & MongoDB
   (Dispatcher & Recipient view map)
                                                      │
                                                      ▼
6. Driver confirms OTP at door         ───► DeliveryCompleted (Kafka)
   (Recipient receives email receipt)
```