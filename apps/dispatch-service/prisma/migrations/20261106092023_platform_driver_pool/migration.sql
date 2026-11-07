-- CreateEnum
CREATE TYPE "AssignmentPool" AS ENUM ('OWN', 'PLATFORM');

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "pool" "AssignmentPool" NOT NULL DEFAULT 'OWN';

-- CreateTable
CREATE TABLE "TenantDispatchSettings" (
    "tenantId" TEXT NOT NULL,
    "allowPlatformDrivers" BOOLEAN NOT NULL DEFAULT false,
    "maxOwnAttempts" INTEGER NOT NULL DEFAULT 3,
    "platformEnabledAt" TIMESTAMP(3),
    "platformEnabledById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantDispatchSettings_pkey" PRIMARY KEY ("tenantId")
);
