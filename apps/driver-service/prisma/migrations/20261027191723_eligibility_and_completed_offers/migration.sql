/*
  Warnings:

  - You are about to drop the column `insuranceValid` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OfferStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseVerifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "insuranceValid",
ADD COLUMN     "insuranceExpiry" TIMESTAMP(3);
