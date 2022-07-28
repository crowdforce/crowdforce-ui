/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telegramId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "telegram_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "verificationtokens";

-- CreateTable
CREATE TABLE "telegram_accounts" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "auth_date" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "telegram_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_telegramId_fkey" FOREIGN KEY ("telegram_id") REFERENCES "telegram_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
