-- AlterTable
ALTER TABLE "JoinRequest" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifyAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verifyCodeExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verifyCodeHash" TEXT,
ADD COLUMN     "verifyCodeSentAt" TIMESTAMP(3),
ADD COLUMN     "verifyResends" INTEGER NOT NULL DEFAULT 0;
