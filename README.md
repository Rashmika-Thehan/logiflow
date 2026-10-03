# LogiFlow 🚚

> **Multi-Tenant Logistics & Real-Time Fleet Management Platform**

LogiFlow is an event-driven, multi-tenant logistics platform designed to manage the end-to-end delivery lifecycle. Built with a modular NestJS microservices monorepo architecture, LogiFlow orchestrates order ingestion, automated driver dispatching, live GPS tracking, driver workflows with Proof of Delivery (PoD), and operational analytics.

---

## 🏗️ Architecture & Core Services

LogiFlow adopts a decoupled microservices architecture powered by **Apache Kafka** for asynchronous communication and **Polyglot Persistence**.

```
                           ┌─────────────────────────┐
                           │   Clients (Web / PWA)   │
                           └────────────┬────────────┘
                                        │ HTTP / WS
                                        ▼
                           ┌─────────────────────────┐
                           │       API Gateway       │
                           └────────────┬────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                          ▼                          ▼
  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
  │   Identity Service  │    │  Shipment Service   │    │  Dispatch Service   │
  │  (PostgreSQL/Prisma)│    │  (PostgreSQL/Prisma)│    │  (Rule Engine)      │
  └──────────┬──────────┘    └──────────┬──────────┘    └──────────┬──────────┘
             │                          │                          │
             └───────────────────► Apache Kafka ◄──────────────────┘
                                 (Event Backbone)
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
  ┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
  │   Driver Service    │    │  Tracking Service   │    │Notification Service │
  │ (Shift / PoD Flow)  │    │ (Redis + MongoDB)   │    │ (BullMQ / Alerts)   │
  └─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

### Microservices Monorepo (`apps/`)

- **`api-gateway`**: Single entry point for client requests handling routing, authentication guards, and rate limiting.
- **`identity-service`**: Multi-tenant authentication, RBAC (`SUPER_ADMIN`, `BUSINESS_ADMIN`, `DISPATCHER`, `DRIVER`), API keys, and organization management.
- **`shipment-service`**: Lifecycle management of shipments (ingestion, validation, status transitions, cancellations).
- **`dispatch-service`**: Rule-based heuristic scoring engine matching shipments to available fleet capacity and driver proximity.
- **`driver-service`**: Driver profiles, vehicle assets, operational shifts, and delivery completion with OTP/Proof of Delivery.
- **`tracking-service`**: High-throughput GPS telemetry ingestion, Redis geospatial caching, MongoDB breadcrumbs, and live WebSocket streaming.
- **`notification-service`**: Omnichannel notifications (SMS, email, in-app alerts) backed by Redis queues (BullMQ).

### Shared Libraries (`libs/`)

- **`@app/common`**: Shared utilities, decorators, guards, interceptors, and database adapters.
- **`@app/contracts`**: Event definitions, DTOs, interfaces, and microservice payload schemas.

---

## 🛠️ Technology Stack

- **Runtime & Framework**: [Node.js](https://nodejs.org/) (LTS) & [NestJS](https://nestjs.com/)
- **Databases (Polyglot)**:
  - **PostgreSQL 16+** & **Prisma ORM** — Relational business data with multi-tenant scoping.
  - **MongoDB 7+** — Time-series geospatial breadcrumbs and tracking history.
  - **Redis 7+** — In-memory caching, distributed locks, and geospatial queries (`GEOADD`).
- **Event Bus**: **Apache Kafka** (KRaft mode) for event-driven sagas and outbox publishing.
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🚀 Quick Start

### 1. Prerequisites

Ensure you have the following installed:

- Node.js (v20+ recommended)
- pnpm (`npm install -g pnpm`)
- Docker & Docker Compose

### 2. Environment Configuration

Create a `.env` file in the root directory (or update the existing one):

```env
# Database Connections
IDENTITY_DATABASE_URL=""
SHIPMENT_DATABASE_URL=""
DRIVER_DATABASE_URL=""

# Redis & MongoDB
REDIS_HOST=
REDIS_PORT=
MONGO_URI=""

# Kafka Broker
KAFKA_BROKER="localhost:9092"

# Security & JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-jwt-refresh-secret"
JWT_REFRESH_EXPIRES_IN="5d"
```

### 3. Start Infrastructure

Launch PostgreSQL, Redis, MongoDB, Kafka, and Kafka UI containers:

```bash
pnpm run docker:up
```

- **Kafka UI**: Accessible at [http://localhost:8080](http://localhost:8080)
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
- **MongoDB**: `localhost:27017`

### 4. Install Dependencies & Migrate Databases

```bash
# Install dependencies
pnpm install

# Generate & apply Prisma migrations for identity service
pnpm run prisma:identity:generate
pnpm run prisma:identity:migrate
```

### 5. Running the Services

You can run individual microservices in watch mode:

```bash
# Run API Gateway
pnpm run start:dev:gateway

# Run Identity Service
pnpm run start:dev:identity

# Run Shipment Service
pnpm run start:dev:shipment

# Run Dispatch Service
pnpm run start:dev:dispatch
```

---

## 📜 Key Scripts

| Command                           | Description                                  |
| :-------------------------------- | :------------------------------------------- |
| `pnpm run docker:up`              | Starts all backing infrastructure containers |
| `pnpm run docker:down`            | Stops and removes all containers             |
| `pnpm run docker:logs`            | Streams container logs in real time          |
| `pnpm run build`                  | Builds all apps and libraries                |
| `pnpm run lint`                   | Runs ESLint with autofix                     |
| `pnpm run format`                 | Formats codebase using Prettier              |
| `pnpm run test`                   | Runs unit tests across all services          |
| `pnpm run prisma:identity:studio` | Opens Prisma Studio for Identity Database    |

---