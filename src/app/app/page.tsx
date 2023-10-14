import QuizCard from "@/client/components/app/QuizCard";

export default function AppPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-w-[1300px] mx-auto">
      <QuizCard type="draft" title="Algrebra 4" />
      <QuizCard type="publish" title="Algebra 3" />
      <QuizCard type="publish" title="Algebra 2" />
      <QuizCard type="publish" title="Algrebra 1" />
      <QuizCard type="finish" title="kkkkkkkkkkkkkkkkkkkkkk" />
      <QuizCard type="finish" title="Information and Technology" />
      <QuizCard type="add" />
    </div>
  );
}
