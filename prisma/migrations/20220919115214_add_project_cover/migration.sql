-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "cover_id" TEXT;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
