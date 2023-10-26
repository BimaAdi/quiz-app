"use client";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const optionsStartDate = {
  title: "StartDate",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
};

const optionsEndDate = {
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
    <div className="flex flex-col md:flex-row gap-2 items-end">
      <div className="flex flex-col md:flex-row items-center justify-start gap-2 w-full">
        <div className="flex gap-2 justify-start w-full">
          <div className="py-2 w-14">From</div>
          <Datepicker
            options={optionsStartDate}
            onChange={handleChange}
            show={showStart}
            setShow={handleCloseStart}
          />
          <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5" defaultValue={9} required />
          <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5" defaultValue={0} required />
        </div>
        <div className="flex gap-2 justify-start w-full">
          <div className="py-2 w-14">To</div>
          <Datepicker
            options={optionsEndDate}
            onChange={handleChange}
            show={showEnd}
            setShow={handleCloseEnd}
          />
          <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5" defaultValue={10} required />
          <input type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5" defaultValue={30} required />
        </div>
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
