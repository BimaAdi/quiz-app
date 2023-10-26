"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import QuizEditorItem from "./QuizEditorItem";
import { trpc } from "@/client/utils/trpc";
import { useRouter } from "next/navigation";

export type QuizListType = {
  quiz_id: string;
  no: string;
  question: string;
  choice: {
    choice_id: string;
    tag: string;
    choice: string;
    isCorrectAnswer: boolean;
  }[];
};

export default function QuizEditorListEdit({
  id,
  name,
  listQuiz,
}: {
  id: string;
  name: string;
  listQuiz: QuizListType[];
}) {
  const router = useRouter();
  const [quizName, setQuizName] = useState<string>(name);
  const [allQuiz, setAllQuiz] = useState<QuizListType[]>(listQuiz);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const editQuizMutation = trpc.quiz.editQuiz.useMutation({
    onMutate: () => {
      setButtonDisable(true);
    },
    onSuccess: () => {
      router.push("/app");
      router.refresh();
    },
    onError: () => {
      setButtonDisable(false);
    }
  });

  const deleteQuizMutation = trpc.quiz.deleteQuiz.useMutation({
    onMutate: () => {
      setButtonDisable(true);
    },
    onSuccess: () => {
      router.push("/app");
      router.refresh();
    },
    onError: () => {
      setButtonDisable(false);
    }
  });

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

  const onChoiceChange = (
    quiz_id: string,
    choice_id: string,
    value: string
  ) => {
    setAllQuiz(
      allQuiz.map((quiz) => {
        if (quiz.quiz_id === quiz_id) {
          return {
            ...quiz,
            answer: quiz.choice.map((x) => {
              if (x.choice_id === choice_id) {
                x.choice = value;
              }
              return x;
            }),
          };
        }
        return quiz;
      })
    );
  };

  const onCheckedClick = (quiz_id: string, choice_id: string) => {
    setAllQuiz(
      allQuiz.map((quiz) => {
        if (quiz.quiz_id === quiz_id) {
          return {
            ...quiz,
            answer: quiz.choice.map((x) => {
              x.isCorrectAnswer = x.choice_id === choice_id;
              return x;
            }),
          };
        }
        return quiz;
      })
    );
  };

  const onDeleteClick = (quiz_id: string) => {
    setAllQuiz(
      allQuiz
        .filter((quiz) => quiz.quiz_id !== quiz_id)
        .map((quiz, index) => {
          return {
            ...quiz,
            no: (index + 1).toString(),
          };
        })
    );
  };

  const addQuiz = () => {
    setAllQuiz([
      ...allQuiz,
      {
        quiz_id: uuidv4(),
        no: (allQuiz.length + 1).toString(),
        question: "",
        choice: [
          {
            choice_id: uuidv4(),
            tag: "A",
            choice: "",
            isCorrectAnswer: true,
          },
          {
            choice_id: uuidv4(),
            tag: "B",
            choice: "",
            isCorrectAnswer: false,
          },
          {
            choice_id: uuidv4(),
            tag: "C",
            choice: "",
            isCorrectAnswer: false,
          },
          {
            choice_id: uuidv4(),
            tag: "D",
            choice: "",
            isCorrectAnswer: false,
          },
        ],
      },
    ]);
  };

  const onEditQuiz = () => {
    editQuizMutation.mutate({
      id,
      quizName,
      question: allQuiz.map((quiz) => {
        return {
          question: quiz.question,
          correct_answer: quiz.choice.filter((x) => x.isCorrectAnswer)[0]
            .choice,
          choice: quiz.choice.map((x) => x.choice),
        };
      }),
    });
  };

  const onDeleteQuiz = () => {
    deleteQuizMutation.mutate(id);
  };

  return (
    <div>
      {/* quiz bar */}
      <div className="flex gap-2 items-center">
        <Link className="py-2.5 cursor-pointer" href={`/app/${id}/detail`}>
          &lt;Back
        </Link>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Quiz Title"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={onEditQuiz}
          disabled={buttonDisable}
          className="w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDeleteQuiz}
          disabled={buttonDisable}
          className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Delete
        </button>
      </div>
      {/* quiz list */}
      {allQuiz.map((x) => (
        <div key={x.quiz_id} className="my-2">
          <QuizEditorItem
            quiz_id={x.quiz_id}
            no={x.no}
            question={x.question}
            choice={x.choice}
            onQuestionChange={onQuestionChange}
            onChoiceChange={onChoiceChange}
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
