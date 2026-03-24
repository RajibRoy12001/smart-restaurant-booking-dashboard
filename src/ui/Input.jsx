const Input = ({ label, type = "text", name, value, onChange,disabled }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 text-sm">{label}</label>

      <input
        type={type}
        name={name}
        value={value || ""}        // ✅ CRITICAL FIX
        onChange={onChange}  
        disabled={disabled}
  className={`p-3 bg-black text-white border rounded-md ${
    disabled
  ? "border-gray-800 opacity-60 cursor-not-allowed"
  : "border-gray-700 focus:border-[#d4af37] hover:border-[#d4af37]/50"
  }`}
      />
    </div>
  );
};

export default Input;