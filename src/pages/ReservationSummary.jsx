import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUsers, FaUtensils } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const ReservationSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get all data safely
  const data = location.state || {};

  const {
    reservationId,
    date,
    time,
    guests,
    form,
    table,
    occasion   // ✅ added
  } = data;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // ✅ If user refreshes or no data
  if (!data || !time) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#021B1E]">
        <p>No reservation data found.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#021B1E] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Processing your reservation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/hero.jpg')"
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#03252A]/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-10 max-w-xl w-full"
      >

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BsCheckCircleFill className="text-[#d4af37] text-6xl drop-shadow-lg"/>
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-4xl text-[#d4af37] text-center mb-2">
          Reservation Confirmed
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Your table has been successfully reserved at AKANTE.
        </p>

        {/* Divider */}
        <div className="w-20 h-[2px] bg-[#d4af37] mx-auto mb-8"></div>

        {/* Reservation Details */}
        <div className="bg-[#043437] p-6 rounded-xl shadow-lg space-y-4">

          <h2 className="text-[#d4af37] text-lg mb-3">
            Reservation Details
          </h2>

          {/* Name */}
          <div className="flex justify-between text-gray-300">
            <span>Name</span>
            <span className="text-white">{form?.name}</span>
          </div>

          {/* Email */}
          <div className="flex justify-between text-gray-300">
            <span>Email</span>
            <span className="text-white">{form?.email}</span>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-300">
              <FaCalendarAlt />
              <span>Date</span>
            </div>
            <span className="text-white">
              {date ? new Date(date).toLocaleDateString() : "N/A"}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-300">
              <FaClock />
              <span>Time</span>
            </div>
            <span className="text-white">{time}</span>
          </div>

          {/* Guests */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-300">
              <FaUsers />
              <span>Guests</span>
            </div>
            <span className="text-white">{guests}</span>
          </div>

          {/* Occasion ✅ */}
          <div className="flex justify-between text-gray-300">
            <span>Occasion</span>
            <span className="text-white">
              {occasion || "Not specified"}
            </span>
          </div>

          {/* Table (FIXED) ✅ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-300">
              <FaUtensils />
              <span>Table</span>
            </div>
            <span className="text-white font-semibold">
              {table || "Not Selected"}
            </span>
          </div>

          {/* Reference ID */}
          <div className="border-t border-gray-600 pt-3 flex justify-between">
            <span className="text-gray-400">
              Reference ID
            </span>
            <span className="text-[#d4af37] font-semibold">
              {reservationId || "AK-XXXXXX"}
            </span>
          </div>

        </div>

        {/* Reservation Status */}
        <div className="mt-8">

          <h2 className="text-[#d4af37] mb-4 text-lg">
            Reservation Status
          </h2>

          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
              <p className="text-gray-300">
                Reservation Request Received
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
              <p className="text-gray-300">
                Table Assigned
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
              <p className="text-gray-300">
                Confirmation Email Sent
              </p>
            </div>

          </div>

        </div>

        {/* Restaurant Info */}
        <div className="mt-8 bg-[#043437] p-6 rounded-xl">

          <h3 className="text-[#d4af37] text-lg mb-2">
            AKANTE Restaurant
          </h3>

          <p className="text-gray-400 text-sm">
            Please arrive 10 minutes before your reservation time.
            Our team will be ready to welcome you.
          </p>

        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/email-confirmation")}
          className="mt-8 w-full bg-[#d4af37] text-black py-3 rounded-lg hover:scale-105 transition font-semibold"
        >
          Next
        </button>

      </motion.div>
    </div>
  );
};

export default ReservationSummary;