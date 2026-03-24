import LoginStep from "./LoginStep";
import OtpStep from "./OtpStep";
import SignupStep from "./SignupStep";
import { useAuth } from "../hooks/useAuth";
import { X } from "lucide-react";

const AuthModal = ({ open, setOpen, onSuccess }) => {
  const auth = useAuth();
  

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      
      <div className="bg-[#03252A] text-white rounded-xl w-[400px] p-6 relative shadow-2xl border border-[#d4af37]/20 transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setOpen(false);
            auth.reset();
          }}
          className="absolute right-4 top-4 text-gray-300 hover:text-[#d4af37]"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#d4af37]">
          Let’s Get Started
        </h2>

        {/* Steps */}
        {auth.step === "login" && <LoginStep auth={auth} />}
        {auth.step === "otp" && (
 <OtpStep auth={auth} />
)}
        {auth.step === "signup" && (
          <SignupStep 
            auth={auth} 
            onSuccess={() => {
              auth.reset();
              onSuccess && onSuccess();
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;