ALTER TABLE "Branch" ADD COLUMN "isDefault" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "Branch_one_default_per_tenant"
ON "Branch" ("tenantId")
WHERE "isDefault" = true;
