import QuizCard from "@/client/components/app/QuizCard";
import SubNavbar from "@/client/components/app/SubNavbar";

export default function AppPage() {
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="mb-2">
        <SubNavbar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <QuizCard type="draft" title="Algrebra 4" />
        <QuizCard type="publish" title="Algebra 3" />
        <QuizCard type="publish" title="Algebra 2" />
        <QuizCard type="publish" title="Algrebra 1" />
        <QuizCard
          type="finish"
          title="12345678901234567890 12345678901234567890 12345678901234567890"
        />
        <QuizCard type="finish" title="Information and Technology" />
        <QuizCard type="add" />
      </div>
    </div>
  );
}
