/*
  Warnings:

  - You are about to drop the `ProjectCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectCard" DROP CONSTRAINT "ProjectCard_project_id_fkey";

-- DropTable
DROP TABLE "ProjectCard";

-- CreateTable
CREATE TABLE "project_card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "project_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_card" ADD CONSTRAINT "project_card_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
