import { useState } from "react";
import { CheckCircle } from "lucide-react";

const SignupStep = ({ auth, onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    console.log(" First:", firstName);
    console.log(" Last:", lastName);
    console.log(" Email:", email);
    console.log(" Mobile:", auth.mobile);

    //  validation
    if (!firstName || !lastName || !email) {
      setError("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }

    setError("");

    //  combine name
    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      mobile: auth.mobile
    };

    console.log(" Saving:", userData);

    localStorage.setItem("user", JSON.stringify(userData));

    onSuccess?.();
  };

  return (
    <div className="flex flex-col gap-3">

      {/* First + Last Name */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-1/2 p-3 bg-black text-white border border-gray-700 rounded-md focus:border-[#d4af37]"
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-1/2 p-3 bg-black text-white border border-gray-700 rounded-md focus:border-[#d4af37]"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 bg-black text-white border border-gray-700 rounded-md focus:border-[#d4af37]"
      />

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Button */}
      <button
        onClick={handleSignup}
        disabled={!firstName || !lastName || !email}
        className={`py-3 rounded flex items-center justify-center gap-2 transition ${
          !firstName || !lastName || !email
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#d4af37] text-black hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/20"
        }`}
      >
        <CheckCircle size={18} />
        Complete Signup
      </button>
    </div>
  );
};

export default SignupStep;