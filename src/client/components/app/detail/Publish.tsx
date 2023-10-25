"use client";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
};

export default function Publish() {
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleCloseStart = (state: boolean) => {
    setShowStart(state);
  };
  const handleCloseEnd = (state: boolean) => {
    setShowEnd(state);
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex items-center">
        <Datepicker
          options={options}
          onChange={handleChange}
          show={showStart}
          setShow={handleCloseStart}
        />
        <div className="p-2">To</div>
        <Datepicker
          options={options}
          onChange={handleChange}
          show={showEnd}
          setShow={handleCloseEnd}
        />
      </div>
      <button
        type="button"
        className="w-20 focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5"
      >
        Publish
      </button>
    </div>
  );
}
