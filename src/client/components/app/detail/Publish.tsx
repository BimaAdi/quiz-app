"use client";
import { trpc } from "@/client/utils/trpc";
import { useRouter } from "next/navigation";

export default function Publish({
  id,
  start_at: start_date,
  end_at: end_date,
}: {
  id: string;
  start_at: Date;
  end_at: Date;
}) {
  const router = useRouter();
  const finishQuizMutation = trpc.quiz.finishQuiz.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-2 items-end">
      {/* <div className="flex flex-col md:flex-row items-center justify-start gap-2 w-full">
        <div className="flex gap-2 justify-start items-center w-full">
          <div className="py-2">From: {start_date.toString()}</div>
        </div>
        <div className="flex gap-2 justify-start items-center w-full">
          <div className="py-2">To: {end_date.toString()}</div>
        </div>
      </div> */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => finishQuizMutation.mutate(id)}
          className="max-w-[200px] focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Finish Quiz
        </button>
      </div>
    </div>
  );
}
