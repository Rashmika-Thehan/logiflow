-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('OFFLINE', 'AVAILABLE', 'ON_BREAK', 'BUSY');

-- CreateEnum
CREATE TYPE "MaintenanceState" AS ENUM ('OPERATIONAL', 'IN_MAINTENANCE');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PENDING_ACCEPTANCE', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AttemptOutcome" AS ENUM ('ARRIVED_AT_PICKUP', 'PACKAGE_COLLECTED', 'START_DELIVERY', 'DELIVERED', 'FAILED');

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "shiftStatus" "ShiftStatus" NOT NULL DEFAULT 'OFFLINE',
    "currentLat" DOUBLE PRECISION,
    "currentLng" DOUBLE PRECISION,
    "assignedVehicleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "vehicleClass" TEXT NOT NULL,
    "maxWeightKg" DOUBLE PRECISION NOT NULL,
    "volumeM3" DOUBLE PRECISION NOT NULL,
    "maintenanceState" "MaintenanceState" NOT NULL DEFAULT 'OPERATIONAL',
    "insuranceValid" BOOLEAN NOT NULL DEFAULT true,
    "assignedDriverId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentOffer" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'PENDING_ACCEPTANCE',
    "respondBy" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryAttempt" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "outcome" "AttemptOutcome" NOT NULL,
    "reasonCode" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliveryAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutboxEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- CreateIndex
CREATE INDEX "AssignmentOffer_driverId_status_idx" ON "AssignmentOffer"("driverId", "status");

-- CreateIndex
CREATE INDEX "OutboxEvent_publishedAt_idx" ON "OutboxEvent"("publishedAt");
