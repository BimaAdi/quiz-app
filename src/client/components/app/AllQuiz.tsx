"use client";
import { useState } from "react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/router";
import QuizCard, { quizType } from "./QuizCard";
import SubNavbar from "./SubNavbar";
import SolveQuizCard from "./SolveQuizCard";

type CreatedQuizType = inferRouterOutputs<AppRouter>['quiz']['getAllQuizUser'];
type SolveQuizType = inferRouterOutputs<AppRouter>['solveQuiz']['getListSolveQuiz'];

export default function AllQuiz({
  allCreatedQuiz,
  allSolveQuiz,
}: {
  allCreatedQuiz: CreatedQuizType;
  allSolveQuiz: SolveQuizType
}) {
  const [page, setPage] = useState<"created" | "solve">("created");

  return (
    <div>
      <div className="mb-2">
        <SubNavbar page={page} onChange={(x) => setPage(x)}/>
      </div>
      {page === "created" ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {allCreatedQuiz.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            type={quiz.QuizStatus.name as quizType}
            title={quiz.name}
          />
        ))}
        <QuizCard type="add" />
      </div> : <></>}
      {page === "solve" ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {allSolveQuiz.map((doQuiz) => (
          <SolveQuizCard
            key={doQuiz.id}
            id={doQuiz.quiz.id}
            type={doQuiz.finish_at === null ? "continue" : "finish"}
            title={doQuiz.quiz.name}
          />
        ))}
      </div> : <></>}
    </div>
  );
}
