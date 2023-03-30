-- AlterTable
ALTER TABLE "features" ALTER COLUMN "status" SET DEFAULT 'Active';

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'Open';

-- AlterTable
ALTER TABLE "user_responses" ALTER COLUMN "status" SET DEFAULT 'Participant';
