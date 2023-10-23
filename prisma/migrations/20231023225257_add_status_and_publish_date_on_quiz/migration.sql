/*
  Warnings:

  - Added the required column `quiz_status_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "publish_end_at" TIMESTAMPTZ,
ADD COLUMN     "publish_start_at" TIMESTAMPTZ,
ADD COLUMN     "quiz_status_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuizStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuizStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizStatus_id_key" ON "QuizStatus"("id");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_quiz_status_id_fkey" FOREIGN KEY ("quiz_status_id") REFERENCES "QuizStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
