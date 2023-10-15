import QuizEditorList from "@/client/components/quiz/QuizEditorList";

export default function AppCreatePage() {
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
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
