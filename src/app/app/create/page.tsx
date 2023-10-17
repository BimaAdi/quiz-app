import Link from "next/link";
import QuizEditorList from "@/client/components/quiz/QuizEditorList";

export default function AppCreatePage() {
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Link className="py-2.5 cursor-pointer" href="/app">&lt;Back</Link>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Quiz Title" required />
        <button
          type="button"
          className="w-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save
        </button>
        <button
          type="button"
          className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Delete
        </button>
      </div>
      <QuizEditorList
        listQuiz={[
          {
            quiz_id: "1",
            no: "1",
            question: "Who is the first president of america?",
            answer: [
              {
                answer_id: "a",
                tag: "A",
                answer: "Joko Widodo",
                isCorrectAnswer: false,
              },
              {
                answer_id: "b",
                tag: "B",
                answer: "Kim Jong Un",
                isCorrectAnswer: false,
              },
              {
                answer_id: "c",
                tag: "C",
                answer: "Barack Obama",
                isCorrectAnswer: false,
              },
              {
                answer_id: "d",
                tag: "D",
                answer: "Abraham lincoln",
                isCorrectAnswer: true,
              },
            ],
          },
          {
            quiz_id: "2",
            no: "2",
            question: "1 * 2 * 3 * 4 =",
            answer: [
              {
                answer_id: "a2",
                tag: "A",
                answer: "24",
                isCorrectAnswer: true,
              },
              {
                answer_id: "b2",
                tag: "B",
                answer: "6",
                isCorrectAnswer: false,
              },
              {
                answer_id: "c2",
                tag: "C",
                answer: "12",
                isCorrectAnswer: false,
              },
              {
                answer_id: "d2",
                tag: "D",
                answer: "36",
                isCorrectAnswer: false,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
