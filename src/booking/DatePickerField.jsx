import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DatePickerField = ({ selectedDate, setSelectedDate }) => {

  const dateRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const weekend = new Date();
  const day = weekend.getDay();
  const diff = 6 - day;
  weekend.setDate(weekend.getDate() + diff);

  return (

    <div className="flex flex-col gap-2">

      {/* DATE FIELD */}

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between bg-[#1f2a3a] px-4 py-3 rounded-lg cursor-pointer border border-gray-700 hover:border-[#d4af37]"
      >

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          onSelect={(date) => {           // ✅ FIXED
            setSelectedDate(date);
            setIsOpen(false);
          }}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          minDate={new Date()}
          dateFormat="MM/dd/yyyy"
          className="bg-transparent text-white outline-none cursor-pointer w-full"
        />

        <FaCalendarAlt className="text-gray-400 ml-3" />

      </div>

      {/* QUICK SELECT BUTTONS */}

      <div className="flex gap-2 text-xs">

        <button
          onClick={() => {
            setSelectedDate(today);
            setIsOpen(false); // ✅ FIXED
          }}
          className="px-3 py-1 rounded bg-[#1f2a3a] hover:bg-[#d4af37] hover:text-black"
        >
          Today
        </button>

        <button
          onClick={() => {
            setSelectedDate(tomorrow);
            setIsOpen(false); // ✅ FIXED
          }}
          className="px-3 py-1 rounded bg-[#1f2a3a] hover:bg-[#d4af37] hover:text-black"
        >
          Tomorrow
        </button>

        <button
          onClick={() => {
            setSelectedDate(weekend);
            setIsOpen(false); // ✅ FIXED
          }}
          className="px-3 py-1 rounded bg-[#1f2a3a] hover:bg-[#d4af37] hover:text-black"
        >
          Weekend
        </button>

      </div>

    </div>

  );
};

export default DatePickerField;