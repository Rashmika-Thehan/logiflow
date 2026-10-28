ALTER TABLE "Shipment" ADD COLUMN "assignedAssignmentId" TEXT;

CREATE TABLE "ShipmentAssignment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ShipmentAssignment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ShipmentAssignment_tenantId_shipmentId_assignedAt_idx"
ON "ShipmentAssignment"("tenantId", "shipmentId", "assignedAt");
