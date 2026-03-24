const StepIndicator = ({step}) => {

  return (
    <div className="flex justify-between mb-6 text-sm">

      <div className={step>=1 ? "text-[#d4af37]" : "text-gray-500"}>
        1. Select Date
      </div>

      <div className={step>=2 ? "text-[#d4af37]" : "text-gray-500"}>
        2. Details
      </div>

      <div className={step>=3 ? "text-[#d4af37]" : "text-gray-500"}>
        3. Confirm
      </div>

    </div>
  );
};

export default StepIndicator;