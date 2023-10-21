import QuizEditorListCreate from "@/client/components/quiz/QuizEditorListCreate";

export default function AppCreatePage() {
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
      <QuizEditorListCreate
        listQuiz={[]}
      />
    </div>
  );
}
