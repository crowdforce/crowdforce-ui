/*
  Custom migration to prevent data loss
*/
ALTER TABLE "TopProjects" RENAME TO "top_projects";

-- AlterTable
ALTER TABLE "top_projects" RENAME CONSTRAINT "TopProjects_pkey" TO "top_projects_pkey";

-- RenameForeignKey
ALTER TABLE "top_projects" RENAME CONSTRAINT "TopProjects_projectId_fkey" TO "top_projects_projectId_fkey";
