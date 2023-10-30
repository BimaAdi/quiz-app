"use client";

import { trpc } from "@/client/utils/trpc";
import { useRouter } from "next/navigation";

export default function StartQuiz({
  id,
  status,
}: {
  id: string;
  status: "start" | "continue" | "finish";
}) {
  const router = useRouter();

  const startQuizMutation = trpc.doQuiz.startQuiz.useMutation({
    onSuccess: () => {
      router.push(`/app/${id}/1`);
      router.refresh();
    },
  });

  if (status === "start") {
    return (
      <button
        type="button"
        onClick={() => startQuizMutation.mutate(id)}
        className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Start Quiz
      </button>
    );
  } else if (status === "continue") {
    return (
      <button
        type="button"
        onClick={() => {
          router.push(`/app/${id}/1`);
          router.refresh();
        }}
        className="w-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Contine Quiz
      </button>
    );
  } else {
    return (
      <div className="w-full focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
        Quiz Finished
      </div>
    );
  }
}
