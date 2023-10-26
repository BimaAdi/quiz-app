"use client";
import { trpc } from "@/client/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const optionsStartDate = {
  title: "Start Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
};

const optionsEndDate = {
  title: "End Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
};

export default function Publish({ id }: { id: string }) {
  const router = useRouter();
  const [publishData, setPublishData] = useState<{
    start_date: Date;
    start_time_hour: number;
    start_time_minute: number;
    end_date: Date;
    end_time_hour: number;
    end_time_minute: number;
  }>({
    start_date: new Date(),
    start_time_hour: 9,
    start_time_minute: 0,
    end_date: new Date(),
    end_time_hour: 10,
    end_time_minute: 30,
  });
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const deleteQuizMutation = trpc.quiz.deleteQuiz.useMutation({
    onMutate: () => {
      setButtonDisable(true);
    },
    onSuccess: () => {
      router.push("/app");
      router.refresh();
    },
    onError: () => {
      setButtonDisable(false);
    },
  });

  const publishQuizMutation = trpc.quiz.publishQuiz.useMutation({
    onMutate: () => {
      setButtonDisable(true);
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      setButtonDisable(false);
    },
  });

  const handleCloseStart = (state: boolean) => {
    setShowStart(state);
  };

  const handleCloseEnd = (state: boolean) => {
    setShowEnd(state);
  };

  const onEditQuiz = () => {
    router.push(`/app/${id}/edit`);
    router.refresh();
  };

  const onDeleteQuiz = () => {
    deleteQuizMutation.mutate(id);
  };

  const onPublishQuiz = () => {
    const {
      start_date,
      start_time_hour,
      start_time_minute,
      end_date,
      end_time_hour,
      end_time_minute,
    } = publishData;
    
    const start = `${start_date.getFullYear()}-${
      start_date.getMonth() + 1
    }-${start_date.getDate()} ${start_time_hour}:${start_time_minute}:0`;
    const end = `${end_date.getFullYear()}-${
      end_date.getMonth() + 1
    }-${end_date.getDate()} ${end_time_hour}:${end_time_minute}:0`;

    publishQuizMutation.mutate({
      id,
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString()
    })
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex flex-col md:flex-row items-center justify-start gap-2 w-full">
        <div className="flex gap-2 justify-start items-center w-full">
          <div className="py-2 w-14">From</div>
          <Datepicker
            options={optionsStartDate}
            onChange={(date) => {
              setPublishData({
                ...publishData,
                start_date: date,
              });
            }}
            value={publishData.start_date}
            show={showStart}
            setShow={handleCloseStart}
          />
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5"
            onChange={(e) => {
              setPublishData({
                ...publishData,
                start_time_hour:
                  e.target.value.trim() === "" ? 0 : parseInt(e.target.value),
              });
            }}
            value={publishData.start_time_hour}
            required
          />
          <div>:</div>
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5"
            onChange={(e) => {
              setPublishData({
                ...publishData,
                start_time_minute:
                  e.target.value.trim() === "" ? 0 : parseInt(e.target.value),
              });
            }}
            value={publishData.start_time_minute}
            required
          />
        </div>
        <div className="flex gap-2 justify-start items-center w-full">
          <div className="py-2 w-14">To</div>
          <Datepicker
            options={optionsEndDate}
            value={publishData.end_date}
            onChange={(date) => {
              setPublishData({
                ...publishData,
                end_date: date,
              });
            }}
            show={showEnd}
            setShow={handleCloseEnd}
          />
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5"
            value={publishData.end_time_hour}
            onChange={(e) => {
              setPublishData({
                ...publishData,
                end_time_hour:
                  e.target.value.trim() === "" ? 0 : parseInt(e.target.value),
              });
            }}
            required
          />
          <div>:</div>
          <input
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5"
            value={publishData.end_time_minute}
            onChange={(e) => {
              setPublishData({
                ...publishData,
                end_time_minute:
                  e.target.value.trim() === "" ? 0 : parseInt(e.target.value),
              });
            }}
            required
          />
        </div>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={onEditQuiz}
          disabled={buttonDisable}
          className="w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDeleteQuiz}
          disabled={buttonDisable}
          className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onPublishQuiz}
          disabled={buttonDisable}
          className="w-20 focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
