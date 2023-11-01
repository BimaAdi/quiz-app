"use client";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";

export type quizType = "finish" | "continue";

export default function SolveQuizCard({
  id = "",
  type,
  title = "",
}: {
  id?: string;
  type: quizType;
  title?: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/app/${id}/solve`);
        router.refresh();
      }}
      className="flex flex-col justify-between min-w-[300px] min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      {type === "finish" ? (
        <div className="bg-green-500 rounded p-2 text-center text-white font-bold">
          Finish
        </div>
      ) : (
        <></>
      )}
      {type === "continue" ? (
        <div className="bg-yellow-500 rounded p-2 text-center text-white font-bold">
          Continue
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
