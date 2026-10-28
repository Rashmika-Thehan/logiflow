/*
  Warnings:

  - You are about to drop the column `insuranceValid` on the `Vehicle` table. All the data in the column will be lost.

  Rollout:
  Existing records intentionally start with NULL licenseVerifiedAt and
  insuranceExpiry and fail the service eligibility checks. The old schema has
  no license verification audit or insurance expiry date to backfill safely;
  insuranceValid alone does not establish either value.
  Before returning each existing driver/vehicle to service, a BUSINESS_ADMIN
  must check the documents, call PATCH /drivers/:id/verify-license for every
  driver, and PATCH /vehicles/:id/insurance with { "insuranceExpiry": "<ISO date>" }
  for every vehicle. Renew expired licenses/insurance first.

*/
-- AlterEnum
ALTER TYPE "OfferStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseVerifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "insuranceValid",
ADD COLUMN     "insuranceExpiry" TIMESTAMP(3);
