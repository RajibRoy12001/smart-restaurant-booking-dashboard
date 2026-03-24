import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const TimeSlots = ({ selectedTime, setSelectedTime }) => {

  const [mealType, setMealType] = useState("lunch");
  const [slots, setSlots] = useState([]);

  const scrollRef = useRef(null);
  const slotRefs = useRef([]);

  const generateSlots = (startHour, endHour) => {

    const generated = [];

    for (let h = startHour; h < endHour; h++) {

      const start = new Date();
      start.setHours(h, 0);

      const end = new Date();
      end.setHours(h + 2, 0);

      const format = (d) =>
        d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

      generated.push({
        time: `${format(start)} - ${format(end)}`,
        price: mealType === "lunch" ? 725 : 875
      });
    }

    return generated;
  };

  useEffect(() => {

    if (mealType === "lunch") {
      setSlots(generateSlots(9, 14));
    } else {
      setSlots(generateSlots(17, 23));
    }

  }, [mealType]);

  const handleSelect = (time, index) => {

    setSelectedTime(time);

    const el = slotRefs.current[index];

    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

  };

  return (

    <div className="text-white">

      {/* Meal Type */}

      <div className="flex gap-4 mb-4">

        <button
          onClick={() => setMealType("lunch")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg transition
          ${mealType === "lunch"
          ? "bg-[#d4af37] text-black shadow-lg"
          : "bg-gray-800 hover:bg-gray-700"}`}
        >
          <FaSun />
          Lunch
        </button>

        <button
          onClick={() => setMealType("dinner")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg transition
          ${mealType === "dinner"
          ? "bg-[#d4af37] text-black shadow-lg"
          : "bg-gray-800 hover:bg-gray-700"}`}
        >
          <FaMoon />
          Dinner
        </button>

      </div>

      {/* Time Slots */}

      <div
        ref={scrollRef}
        style={{ WebkitOverflowScrolling: "touch" }}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-3 snap-x snap-mandatory"
      >

        {slots.map((slot, index) => (

          <div
            key={slot.time}
            ref={(el) => (slotRefs.current[index] = el)}
            className="min-w-[140px] snap-center text-center"
          >

            <button
              onClick={() => handleSelect(slot.time, index)}
              className={`w-full py-3 rounded-lg border text-sm font-medium transition-all duration-300

              ${selectedTime === slot.time
                ? "bg-[#d4af37] text-black border-[#d4af37] scale-105"
                : "border-gray-500 hover:border-[#d4af37]"
              }`}
            >
              {slot.time}
            </button>

            <p className="text-xs text-gray-400 mt-1">
              STARTS ₹{slot.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
};

export default TimeSlots;