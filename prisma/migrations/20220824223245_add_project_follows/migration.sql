-- CreateTable
CREATE TABLE "user_follows" (
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "followed_at" TIMESTAMP(3),
    "unfollowed_at" TIMESTAMP(3),

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("user_id","project_id")
);

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
