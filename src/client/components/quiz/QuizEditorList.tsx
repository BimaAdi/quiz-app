"use client";

import { useState } from "react";
import QuizEditorItem from "./QuizEditorItem";
import { AiOutlinePlus } from "react-icons/ai";

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

  const onDeleteClick = (quiz_id: string) => {
    setAllQuiz(allQuiz.filter((quiz) => quiz.quiz_id !== quiz_id));
  };

  const addQuiz = () => {
    // setAllQuiz()
  }

  return (
    <div>
      {allQuiz.map((x) => (
        <div key={x.quiz_id} className="my-2">
          <QuizEditorItem
            quiz_id={x.quiz_id}
            no={x.no}
            question={x.question}
            answer={x.answer}
            onQuestionChange={onQuestionChange}
            onAnswerChange={onAnswerChange}
            onCheckedClick={onCheckedClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
      ))}
      <div className="my-2">
        <div 
          onClick={() => addQuiz()}
          className="grid place-items-center bg-white border border-gray-200 rounded-lg shadow py-6 hover:cursor-pointer"
        >
          <AiOutlinePlus
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
