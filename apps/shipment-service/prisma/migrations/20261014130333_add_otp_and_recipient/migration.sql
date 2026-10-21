-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "otpAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recipientEmail" TEXT;
