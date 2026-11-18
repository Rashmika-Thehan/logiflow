ALTER TABLE "Shipment"
ADD COLUMN "pickupBranchId" TEXT,
ADD COLUMN "pickupBranchSnapshot" JSONB;
