-- CreateTable
CREATE TABLE "TopProjects" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TopProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopProjects" ADD CONSTRAINT "TopProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
