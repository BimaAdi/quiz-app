"use client";

import { useState } from "react";

export type QuizType = {
  quiz_id: string;
  no: string;
  question: string;
  answer: {
    answer_id: string;
    tag: string;
    answer: string;
    isCorrectAnswer: boolean;
  }[];
  onQuestionChange: (quiz_id: string, value: string) => void;
  onAnswerChange: (quiz_id: string, answer_id: string, value: string) => void;
  onCheckedClick: (quiz_id: string, answer_id: string) => void;
};

export default function QuizEditorItem(props: QuizType) {
  // const [quiz, setQuiz] = useState<QuizType>({
  //   quiz_id: "1",
  //   no: "1",
  //   question: "Who is the first president of america?",
  //   answer: [
  //     {
  //       answer_id: "a",
  //       tag: "A",
  //       answer: "Joko Widodo",
  //       isCorrectAnswer: false,
  //     },
  //     {
  //       answer_id: "b",
  //       tag: "B",
  //       answer: "Kim Jong Un",
  //       isCorrectAnswer: false,
  //     },
  //     {
  //       answer_id: "c",
  //       tag: "C",
  //       answer: "Barack Obama",
  //       isCorrectAnswer: false,
  //     },
  //     {
  //       answer_id: "d",
  //       tag: "D",
  //       answer: "Abraham lincoln",
  //       isCorrectAnswer: true,
  //     },
  //   ],
  // });

  // const onQuestionChange = (value: string) => {
  //   setQuiz({ ...quiz, question: value });
  // };

  // const onAnswerChange = (id: string, value: string) => {
  //   setQuiz({
  //     ...quiz,
  //     answer: quiz.answer.map((x) => {
  //       if (x.id === id) {
  //         x.answer = value;
  //       }
  //       return x;
  //     }),
  //   });
  // };

  // const onCheckedClick = (id: string) => {
  //   setQuiz({
  //     ...quiz,
  //     answer: quiz.answer.map((x) => {
  //       x.isCorrectAnswer = x.id === id;
  //       return x;
  //     }),
  //   });
  // };

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow py-6">
      <div className="px-6 pb-3 flex gap-2">
        <div>{props.no}.</div>
        <textarea
          className="w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={props.question}
          onChange={(e) => props.onQuestionChange(props.quiz_id, e.target.value)}
        ></textarea>
      </div>
      {props.answer.map((x) => (
        <div
          key={x.answer_id}
          className="px-6 py-3 flex gap-2 justify-between items-center"
        >
          <div className="flex gap-2 w-full items-center">
            <div>{x.tag}.</div>
            <input
              type="text"
              value={x.answer}
              onChange={(e) => props.onAnswerChange(props.quiz_id, x.answer_id, e.target.value)}
              className="w-full p-1.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <input
            type="checkbox"
            defaultValue={x.answer_id}
            readOnly
            checked={x.isCorrectAnswer}
            onClick={() => props.onCheckedClick(props.quiz_id, x.answer_id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
