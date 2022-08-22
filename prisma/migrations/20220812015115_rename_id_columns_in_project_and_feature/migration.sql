/*
  Warnings:

  - You are about to drop the column `projectId` on the `features` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `viewportId` on the `projects` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `features` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewport_id` to the `projects` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "features" DROP CONSTRAINT "features_projectId_fkey";
ALTER TABLE "projects" DROP CONSTRAINT "projects_ownerId_fkey";
ALTER TABLE "projects" DROP CONSTRAINT "projects_viewportId_fkey";

-- AlterTable
ALTER TABLE "features" RENAME COLUMN "projectId" TO "project_id";
ALTER TABLE "projects" RENAME COLUMN "ownerId" TO "owner_id";
ALTER TABLE "projects" RENAME COLUMN "viewportId" TO "viewport_id";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "projects" ADD CONSTRAINT "projects_viewport_id_fkey" FOREIGN KEY ("viewport_id") REFERENCES "viewports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "features" ADD CONSTRAINT "features_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
