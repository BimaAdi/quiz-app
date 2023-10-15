"use client";

import { useState } from "react";
import QuizEditorItem from "./QuizEditorItem";

export type QuizListType = {
  quiz_id: string;
  no: string;
  question: string;
  answer: {
    answer_id: string;
    tag: string;
    answer: string;
    isCorrectAnswer: boolean;
  }[];
};

export default function QuizEditorList({
  listQuiz,
}: {
  listQuiz: QuizListType[];
}) {
  const [allQuiz, setAllQuiz] = useState<QuizListType[]>(listQuiz);

  const onQuestionChange = (quiz_id: string, value: string) => {
    setAllQuiz(
      allQuiz.map((quiz) => {
        if (quiz.quiz_id === quiz_id) {
          return { ...quiz, question: value };
        }
        return quiz;
      })
    );
  };

  const onAnswerChange = (
    quiz_id: string,
    asnwer_id: string,
    value: string
  ) => {
    setAllQuiz(
      allQuiz.map((quiz) => {
        if (quiz.quiz_id === quiz_id) {
          return {
            ...quiz,
            answer: quiz.answer.map((x) => {
              if (x.answer_id === asnwer_id) {
                x.answer = value;
              }
              return x;
            }),
          };
        }
        return quiz;
      })
    );
  };

  const onCheckedClick = (quiz_id: string, asnwer_id: string) => {
    setAllQuiz(
      allQuiz.map((quiz) => {
        if (quiz.quiz_id === quiz_id) {
          return {
            ...quiz,
            answer: quiz.answer.map((x) => {
              x.isCorrectAnswer = x.answer_id === asnwer_id;
              return x;
            }),
          };
        }
        return quiz;
      })
    );
  };

  return (
    <>
      {allQuiz.map((x) => (
        <QuizEditorItem
          key={x.quiz_id}
          quiz_id={x.quiz_id}
          no={x.no}
          question={x.question}
          answer={x.answer}
          onQuestionChange={onQuestionChange}
          onAnswerChange={onAnswerChange}
          onCheckedClick={onCheckedClick}
        />
      ))}
    </>
  );
}
