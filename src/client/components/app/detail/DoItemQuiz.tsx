"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/client/utils/trpc";

const generateArray = (x: number): number[] => {
  let res = [];
  for (let i = 1; i <= x; i++) {
    res.push(i);
  }
  return res;
};

export default function DoQuiz({
  quiz_id,
  question_id,
  no,
  numQuestion,
  question,
  choices,
  yourAnswer,
}: {
  quiz_id: string;
  question_id: string;
  no: number;
  numQuestion: number;
  question: string;
  choices: { id: string; tag: string; answer: string }[];
  yourAnswer: string | null;
}) {
  const router = useRouter();
  const [choicesState] = useState<typeof choices>(choices);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    yourAnswer
  );

  const onClickPrevMutation = trpc.doQuiz.answerQuestion.useMutation({
    onSuccess: () => {
      router.push(`/app/${quiz_id}/${no - 1}`);
      router.refresh();
    },
  });

  const onClickNextMutation = trpc.doQuiz.answerQuestion.useMutation({
    onSuccess: () => {
      router.push(`/app/${quiz_id}/${no + 1}`);
      router.refresh();
    },
  });

  const finishMutation = trpc.doQuiz.finishQuiz.useMutation({
    onSuccess: () => {
      router.push(`/app`);
      router.refresh();
    },
  });

  const onClickFinishMutation = trpc.doQuiz.answerQuestion.useMutation({
    onSuccess: () => {
      finishMutation.mutate(quiz_id);
    },
  });

  const onPrevClick = () => {
    if (selectedAnswer !== yourAnswer) {
      onClickPrevMutation.mutate({
        quiz_id: quiz_id,
        quiz_question_id: question_id,
        answer: selectedAnswer,
      });
      return;
    }
    router.push(`/app/${quiz_id}/${no - 1}`);
    router.refresh();
  };

  const onNoChange = (no: number) => {
    router.push(`/app/${quiz_id}/${no}`);
    router.refresh();
  };

  const onNextClick = () => {
    if (selectedAnswer !== yourAnswer) {
      onClickNextMutation.mutate({
        quiz_id: quiz_id,
        quiz_question_id: question_id,
        answer: selectedAnswer,
      });
      return;
    }
    router.push(`/app/${quiz_id}/${no + 1}`);
    router.refresh();
  };

  const onFinishClick = () => {
    onClickFinishMutation.mutate({
      quiz_id: quiz_id,
      quiz_question_id: question_id,
      answer: selectedAnswer,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="min-h-[150px] flex items-center justify-start gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div>{no}.</div>
        <div className="w-full p-2.5">{question}</div>
      </div>

      {choicesState.map((choice) => {
        if (choice.answer === selectedAnswer) {
          return (
            <div
              key={choice.id}
              className="min-h-[50px] flex items-center justify-start gap-2 p-6 bg-white border border-blue-500 rounded-lg shadow cursor-pointer"
            >
              <div>{choice.tag}.</div>
              <div className="w-full p-2.5">{choice.answer}</div>
            </div>
          );
        }

        return (
          <div
            key={choice.id}
            onClick={() => setSelectedAnswer(choice.answer)}
            className="min-h-[50px] flex items-center justify-start gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer"
          >
            <div>{choice.tag}.</div>
            <div className="w-full p-2.5">{choice.answer}</div>
          </div>
        );
      })}

      <div className="flex flex-col items-center">
        <div className="inline-flex items-center mt-2 xs:mt-0 gap-1">
          {no !== 1 ? (
            <button
              onClick={onPrevClick}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-400 rounded-l hover:bg-gray-900"
            >
              Prev
            </button>
          ) : (
            <></>
          )}
          <select
            defaultValue={no}
            onChange={(e) => onNoChange(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
          >
            {generateArray(numQuestion).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {no !== numQuestion ? (
            <button
              onClick={onNextClick}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-400 border-0 border-l rounded-r hover:bg-gray-900"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onFinishClick}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-500 border-0 border-l rounded-r hover:bg-gray-900"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
