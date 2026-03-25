import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FiXCircle } from "react-icons/fi";


const BookingDetails = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        date: "2026-03-25",
        time: "7:00 PM",
        guests: 2,
        status: "upcoming",
      },
      {
        id: 2,
        date: "2026-03-10",
        time: "8:30 PM",
        guests: 4,
        status: "completed",
      },
    ];

    setBookings(dummy);
  }, []);

  const current = bookings.filter(b => b.status === "upcoming");
 const previous = bookings.filter(
  b => b.status === "completed" || b.status === "cancelled"
);

  return (
    <div className="min-h-screen px-20 py-20 bg-[#021B1E] text-white">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-lg font-medium text-[#d4af37] flex items-center gap-2 group"
      >
        <span>←</span>
        <span className="group-hover:underline group-hover:text-white transition">
          Back
        </span>
      </button>

      <h1 className="text-3xl text-[#d4af37] font-bold mb-8">
        Your Bookings
      </h1>

      {/* 🔥 Current Booking */}
      <section className="mb-10">
        <h2 className="text-xl mb-4 text-[#d4af37]">Current Booking</h2>

        {current.length === 0 ? (
          <p className="text-gray-400">No active bookings</p>
        ) : (
          current.map(b => (
            <div
              key={b.id}
              className="bg-black/70 border border-[#d4af37] p-5 rounded-xl mb-4 flex items-center justify-between"
            >
              <div>
                <p>Date: {b.date}</p>
                <p>Time: {b.time}</p>
                <p>Guests: {b.guests}</p>
              </div>
              <button
  onClick={() => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(prev =>
        prev.map(item =>
          item.id === b.id ? { ...item, status: "cancelled" } : item
        )
      );
    }
  }}
  className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-red-400 border border-red-400 rounded-md hover:bg-red-500 hover:text-white transition duration-200 hover:shadow-[0_0_8px_rgba(255,0,0,0.6)]"
>
  <FiXCircle size={16} />
  Cancel
</button>
            </div>
          ))
        )}
      </section>

      {/* 🔥 Previous Booking */}
      <section>
        <h2 className="text-xl mb-4 text-[#d4af37]">Previous Bookings</h2>

        {previous.length === 0 ? (
          <p className="text-gray-400">No past bookings</p>
        ) : (
          previous.map(b => (
            <div
              key={b.id}
              className="bg-black/60 border border-gray-600 p-5 rounded-xl mb-4 flex items-center justify-between"
            >
              <div>
                <p>Date: {b.date}</p>
                <p>Time: {b.time}</p>
                <p>Guests: {b.guests}</p>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {b.status === "completed" ? (
  <FiCheckCircle size={26} className="text-green-500" />
) : (
  <FiXCircle size={26} className="text-red-500" />
)}
              </motion.div>
            </div>
          ))
        )}
      </section>

    </div>
  );
};

export default BookingDetails;