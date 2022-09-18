/*
  Warnings:

  - Added the required column `filename` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "filename" TEXT NOT NULL;
