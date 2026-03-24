import { useState } from "react";

export const useAuth = () => {
  const [step, setStep] = useState("login");
  const [mobile, setMobile] = useState("");

  const sendOtp = (phone) => {
    if (!phone) return;
    console.log("🚀 Sending OTP to:", phone);
    setMobile(phone);
    setStep("otp");
  };

const verifyOtp = () => {
  setStep("signup");
  console.log("✅ OTP Verified for:", mobile);
  return true;
};

  const reset = () => {
    setStep("login");
    setMobile("");
  };

  return {
    step,
    mobile,
    sendOtp,
    verifyOtp,
    reset
  };
};