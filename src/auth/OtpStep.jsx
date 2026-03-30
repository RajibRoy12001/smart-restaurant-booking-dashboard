import { useState, useEffect } from "react";

const OtpStep = ({ auth }) => {

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  //  countdown logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  //  verify OTP
  const handleVerify = async () => {
     console.log(" Entered OTP:", otp);
  if (!otp) {
    setError("Please enter OTP");
    return;
  }

  if (otp.length < 4) {
    setError("Invalid OTP");
    return;
  }

  setError("");

  await auth.verifyOtp(); // assume it returns true/false
};

  //  resend OTP
  const handleResend = () => {
    setTimer(30);
    setOtp("");
    setError("");
    auth.sendOtp(auth.mobile); // reuse same function
  };

  return (
    <div className="flex flex-col">

      {/* Info */}
      <p className="mb-2 text-gray-300 text-sm">
        OTP sent to{" "}
        <span className="text-[#d4af37]">{auth.mobile}</span>
      </p>

      {/* OTP Input */}
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="
          w-full bg-transparent 
          border border-gray-600 
          text-white 
          p-2 rounded mb-2 
          focus:border-[#d4af37] 
          outline-none
        "
      />

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-2">
          {error}
        </p>
      )}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={!otp}
        className={`
          w-full py-2 rounded transition mb-2
          ${!otp
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#d4af37] text-black hover:scale-105"}
        `}
      >
        Verify
      </button>

      {/* Timer / Resend */}
      <div className="text-sm text-center text-gray-400">

        {timer > 0 ? (
          <p>
            Resend OTP in{" "}
            <span className="text-[#d4af37]">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-[#d4af37] hover:underline"
          >
            Resend OTP
          </button>
        )}

      </div>

    </div>
  );
};

export default OtpStep;