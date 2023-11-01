"use client";
import { useRouter } from "next/navigation";

export default function SolveQuiz({
  id,
  status,
}: {
  id: string;
  status: "continue" | "finish";
}) {
  const router = useRouter();

  if (status === "continue") {
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
      <div className="w-full focus:outline-none text-white text-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
        Quiz Finished
      </div>
    );
  }
}
