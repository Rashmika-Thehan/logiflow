-- CreateTable
CREATE TABLE "BatchImportRowResult" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "batchImportJobId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,
    "shipmentId" TEXT,
    "errors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchImportRowResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BatchImportRowResult_batchImportJobId_rowNumber_key" ON "BatchImportRowResult"("batchImportJobId", "rowNumber");
