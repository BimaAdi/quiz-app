-- CreateTable
CREATE TABLE "DoQuiz" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" UUID NOT NULL,
    "start_at" TIMESTAMPTZ,
    "finish_at" TIMESTAMPTZ,

    CONSTRAINT "DoQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoQuizAnswer" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" UUID NOT NULL,
    "do_quiz_id" UUID NOT NULL,
    "quiz_question_id" UUID NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "DoQuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DoQuiz_user_id_idx" ON "DoQuiz"("user_id");

-- CreateIndex
CREATE INDEX "DoQuiz_quiz_id_idx" ON "DoQuiz"("quiz_id");

-- CreateIndex
CREATE INDEX "DoQuiz_start_at_idx" ON "DoQuiz"("start_at");

-- CreateIndex
CREATE INDEX "DoQuizAnswer_user_id_quiz_question_id_idx" ON "DoQuizAnswer"("user_id", "quiz_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "DoQuizAnswer_user_id_quiz_question_id_key" ON "DoQuizAnswer"("user_id", "quiz_question_id");

-- AddForeignKey
ALTER TABLE "DoQuiz" ADD CONSTRAINT "DoQuiz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoQuiz" ADD CONSTRAINT "DoQuiz_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoQuizAnswer" ADD CONSTRAINT "DoQuizAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoQuizAnswer" ADD CONSTRAINT "DoQuizAnswer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoQuizAnswer" ADD CONSTRAINT "DoQuizAnswer_do_quiz_id_fkey" FOREIGN KEY ("do_quiz_id") REFERENCES "DoQuiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoQuizAnswer" ADD CONSTRAINT "DoQuizAnswer_quiz_question_id_fkey" FOREIGN KEY ("quiz_question_id") REFERENCES "QuizQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
