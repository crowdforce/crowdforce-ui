-- CreateEnum
CREATE TYPE "project_status" AS ENUM ('Init', 'Active');

-- CreateTable
CREATE TABLE "viewports" (
    "id" TEXT NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "zoom" DOUBLE PRECISION NOT NULL,
    "min_zoom" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "max_zoom" DOUBLE PRECISION NOT NULL DEFAULT 22,
    "pitch" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "min_pitch" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "max_pitch" DOUBLE PRECISION NOT NULL DEFAULT 85,
    "bearing" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "is_flat" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viewports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "status" "project_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "viewportId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_viewportId_fkey" FOREIGN KEY ("viewportId") REFERENCES "viewports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
