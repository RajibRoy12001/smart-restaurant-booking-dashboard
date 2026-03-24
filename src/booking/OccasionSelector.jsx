import { useRef } from "react";
import {
  FaBirthdayCake,
  FaGlassCheers,
  FaHeart,
  FaBriefcase,
  FaUsers,
  FaStar,
  FaBaby
} from "react-icons/fa";

const occasions = [
  { name: "Birthday", label: "Birthday", icon: FaBirthdayCake, popular: true },
  { name: "Anniversary", label: "Anniversary", icon: FaGlassCheers, popular: true },
  { name: "Date Night", label: "Date Night", icon: FaHeart, popular: true },
  { name: "Business", label: "Business", icon: FaBriefcase },
  { name: "Family Dinner", label: "Family Dinner", icon: FaUsers },
  { name: "Celebration", label: "Celebration", icon: FaStar },
  { name: "Baby Shower", label: "Baby Shower", icon: FaBaby },
  { name: "Other", label: "Other", icon: FaGlassCheers }
];

const OccasionSelector = ({ occasion, setOccasion }) => {

  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  const handleSelect = (name, index) => {

    setOccasion(name);

    const el = itemRefs.current[index];

    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  };

  return (

    <div className="flex flex-col gap-2">

      <label className="text-gray-300 text-sm">
        Occasion
      </label>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-3 snap-x snap-mandatory scroll-smooth"
      >

        {occasions.map((item, index) => {

          const Icon = item.icon;

          return (

            <button
              key={item.name}
              ref={(el) => (itemRefs.current[index] = el)}
              type="button"
              onClick={() => handleSelect(item.name, index)}
              className={`relative overflow-visible flex items-center gap-2 px-3 pt-4 py-2  rounded-lg border min-w-[120px] justify-center snap-center transition-all duration-300

              ${occasion === item.name
                ? "bg-[#d4af37] text-black border-[#d4af37] scale-105 shadow-lg"
                : "bg-[#021B1E] text-white border-gray-700 hover:border-[#d4af37] hover:scale-[1.03]"
              }`}
            >

              <Icon size={14} />

              <span className="text-sm whitespace-nowrap">
                {item.label}
              </span>

              {item.popular && (
  <span className="absolute -top-0 left-1/2 -translate-x-1/2 
    text-[7px] font-semibold 
    bg-gradient-to-r from-red-500 to-pink-500 
    text-white 
    px-2 py-[2px] 
    rounded-full 
    shadow-lg 
    tracking-wide
  ">
     Popular
  </span>
)}
            </button>

          );

        })}

      </div>

    </div>

  );

};

export default OccasionSelector;