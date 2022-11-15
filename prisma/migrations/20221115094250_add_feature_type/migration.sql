-- CreateEnum
CREATE TYPE "feature_type" AS ENUM ('Unknown', 'Border', 'Tree', 'Lawn');

-- AlterTable
ALTER TABLE "features" ADD COLUMN     "type" "feature_type" NOT NULL DEFAULT 'Unknown';
