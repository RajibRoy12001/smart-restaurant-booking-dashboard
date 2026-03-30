import { useState } from "react";

const LoginStep = ({ auth }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  //  handle input (only digits, max 10)
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhone(value);
    }
  };

  //  send OTP with validation
  const handleSend = () => {
    if (phone.length !== 10) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    setError("");
    console.log(" Phone Entered:", phone);

    auth.sendOtp(phone);
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Phone Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-sm">Phone Number</label>

        <div className="flex items-center border border-gray-600 rounded-md overflow-hidden focus-within:border-[#d4af37] transition">

          {/* +91 Prefix */}
          <span className="px-3 bg-gray-800 text-gray-300 text-sm">
            +91
          </span>

          {/* Input */}
          <input
            type="text"
            value={phone}
            onChange={handleChange}
            placeholder="Enter 10-digit number"
            className="w-full p-3 bg-black text-white outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={handleSend}
        className="bg-[#d4af37] text-black py-2 rounded transition hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/20"
      >
        Send OTP
      </button>
    </div>
  );
};

export default LoginStep;