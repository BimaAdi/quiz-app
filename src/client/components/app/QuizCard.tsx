"use client";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";

export type quizType = "finish" | "publish" | "draft" | "add";

export default function QuizCard({
  id = "",
  type,
  title = "",
}: {
  id?: string;
  type: quizType;
  title?: string;
}) {
  const router = useRouter();

  if (type === "add") {
    return (
      <div
        onClick={() => router.push("/app/create")}
        className="grid place-items-center min-w-[300px] min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer"
      >
        <AiOutlinePlus
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        router.push(`/app/${id}/detail`);
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
      {type === "publish" ? (
        <div className="bg-blue-500 rounded p-2 text-center text-white font-bold">
          Publish
        </div>
      ) : (
        <></>
      )}
      {type === "draft" ? (
        <div className="bg-gray-500 rounded p-2 text-center text-white font-bold">
          Draft
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
