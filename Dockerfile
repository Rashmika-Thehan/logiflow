# ==============================================================================
# Multi-Stage Dockerfile for LogiFlow NestJS Monorepo (Debian Slim + pnpm)
# Optimized for Webpack monorepos via shamefully-hoist dependency resolution
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Base Environment
# ------------------------------------------------------------------------------
FROM node:20-slim AS base
WORKDIR /app

# Install OpenSSL and CA certificates needed for native database drivers & Prisma
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Enable and configure pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# ------------------------------------------------------------------------------
# Stage 2: Workspace Dependencies (Heavily cached by Docker)
# ------------------------------------------------------------------------------
FROM base AS dependencies

# Copy monorepo manifests first so module installation is cached
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./

# Copy each sub-project's package.json
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY apps/identity-service/package.json ./apps/identity-service/
COPY apps/shipment-service/package.json ./apps/shipment-service/
COPY apps/dispatch-service/package.json ./apps/dispatch-service/
COPY apps/driver-service/package.json ./apps/driver-service/
COPY apps/tracking-service/package.json ./apps/tracking-service/
COPY apps/notification-service/package.json ./apps/notification-service/
COPY libs/common/package.json ./libs/common/
COPY libs/contracts/package.json ./libs/contracts/

# Install dependencies with shamefully-hoist so Webpack at monorepo root resolves sub-package modules
RUN pnpm install --no-frozen-lockfile --shamefully-hoist

# ------------------------------------------------------------------------------
# Stage 3: Build the Target Microservice
# ------------------------------------------------------------------------------
FROM dependencies AS builder
ARG APP_NAME
RUN test -n "$APP_NAME" || (echo "ERROR: APP_NAME build argument is required! (e.g. --build-arg APP_NAME=api-gateway)" && exit 1)

# Copy configuration and source trees
COPY nest-cli.json tsconfig.json tsconfig.build.json webpack.config.js* ./
COPY apps/ ./apps/
COPY libs/ ./libs/

# Generate Prisma client ONLY if the target microservice has a Prisma schema
RUN if [ -f "apps/${APP_NAME}/prisma/schema.prisma" ]; then \
      echo "==> Generating Prisma client for ${APP_NAME}..." && \
      ./node_modules/.bin/prisma generate --schema="apps/${APP_NAME}/prisma/schema.prisma"; \
    else \
      echo "==> No Prisma schema for ${APP_NAME}, skipping Prisma generation."; \
    fi

# Build the specific target service with Nest Webpack builder
RUN ./node_modules/.bin/nest build ${APP_NAME}

# Prune devDependencies — keep only what Node needs at runtime
# This runs AFTER the build so the full toolchain (TypeScript, Webpack, NestJS CLI) is available during build
RUN pnpm prune --prod

# ------------------------------------------------------------------------------
# Stage 4: Lean Production Runner (inherits base so apt-get is cached)
# ------------------------------------------------------------------------------
FROM base AS runner
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
ENV NODE_ENV=production
WORKDIR /app

# Run as non-root user
USER node

# Copy only production node_modules (devDependencies were pruned in builder)
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Webpack bundled all @app/* libs into main.js — only the Prisma migrations folder
# needs to be present for services that have a Prisma schema (used by prisma migrate deploy)
COPY --from=builder --chown=node:node /app/apps/${APP_NAME}/prisma* ./apps/${APP_NAME}/

# Copy compiled JavaScript bundle (single main.js from Webpack)
COPY --from=builder --chown=node:node /app/dist/apps/${APP_NAME} ./dist/apps/${APP_NAME}

# Dynamic execution of the compiled entrypoint
CMD ["sh", "-c", "node dist/apps/${APP_NAME}/main.js"]
