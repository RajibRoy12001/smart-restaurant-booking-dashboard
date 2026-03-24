import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const EmailConfirmation = () => {

  const navigate = useNavigate();

  return (

    <div
      className="min-h-screen flex items-center justify-center px-6 relative bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/hero.jpg')" }}
    >

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#03252A]/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center"
      >

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-6 mb-8 text-sm">

          <div className="flex items-center gap-2 text-green-400">
            <FaCheckCircle />
            <span>Booking</span>
          </div>

          <div className="w-10 h-[1px] bg-gray-500"></div>

          <div className="flex items-center gap-2 text-green-400">
            <FaCheckCircle />
            <span>Confirmation</span>
          </div>

          <div className="w-10 h-[1px] bg-gray-500"></div>

          <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
            <BsEnvelopeCheckFill />
            <span>Email</span>
          </div>

        </div>


        {/* Icon */}
        <div className="flex justify-center mb-4">
          <BsEnvelopeCheckFill className="text-[#d4af37] text-6xl"/>
        </div>


        {/* Title */}
        <h1 className="text-4xl text-[#d4af37] mb-4">
          Thank You for Your Reservation
        </h1>


        {/* Highlight */}
        <p className="text-lg text-[#d4af37] font-semibold mb-6">
          Please check your email for confirmation.
        </p>


        {/* Message */}
        <p className="text-gray-300 mb-4">
          We are very happy that you chose 
          <span className="text-[#d4af37] font-semibold"> AKANTE Café & Restaurant</span>.
          Your table has been successfully reserved.
        </p>

        <p className="text-gray-300 mb-6">
          Visit us on your selected date and time. Our team will do their best
          to provide you with excellent service and a wonderful dining experience.
        </p>


        {/* Quote */}
        <p className="italic text-gray-400 mb-8">
          “Great food and warm hospitality await you in the heart of Siliguri.”
        </p>


        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="border border-[#d4af37] px-8 py-3 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
        >
          Back to Home
        </button>


        {/* Divider */}
        <div className="w-20 h-[2px] bg-[#d4af37] mx-auto mt-8 mb-4"></div>


        {/* Footer */}
        <p className="text-gray-400 text-sm">
          AKANTE Café & Restaurant • Siliguri, West Bengal
        </p>

      </motion.div>

    </div>

  );

};

export default EmailConfirmation;