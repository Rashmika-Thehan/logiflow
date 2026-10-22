-- CreateTable
CREATE TABLE "DriverCandidateView" (
    "driverId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "locationAt" TIMESTAMP(3),
    "maxWeightKg" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverCandidateView_pkey" PRIMARY KEY ("driverId")
);

-- CreateIndex
CREATE INDEX "DriverCandidateView_tenantId_status_idx" ON "DriverCandidateView"("tenantId", "status");
