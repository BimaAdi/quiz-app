import QuizEditorList from "@/client/components/quiz/QuizEditorList";

export default function AppCreatePage() {
  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
      <QuizEditorList
        listQuiz={[]}
      />
    </div>
  );
}
