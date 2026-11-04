ALTER TABLE "AssignmentOffer" ADD COLUMN "shipmentTenantId" TEXT;
UPDATE "AssignmentOffer" SET "shipmentTenantId" = "tenantId";
ALTER TABLE "AssignmentOffer" ALTER COLUMN "shipmentTenantId" SET NOT NULL;
ALTER TABLE "AssignmentOffer" ADD COLUMN "preview" JSONB;