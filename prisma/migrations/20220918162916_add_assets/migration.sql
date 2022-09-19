-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "sha256" TEXT NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER,
    "height" INTEGER,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);
