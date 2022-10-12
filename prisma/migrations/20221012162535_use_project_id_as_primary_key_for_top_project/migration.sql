/*
  Warnings:

  - The primary key for the `TopProjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TopProjects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TopProjects" DROP CONSTRAINT "TopProjects_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TopProjects_pkey" PRIMARY KEY ("projectId");
