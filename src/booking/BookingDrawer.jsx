import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DatePickerField from "./DatePickerField";
import TimeSlots from "./TimeSlots";
import GuestSelector from "./GuestSelector";
import OccasionSelector from "./OccasionSelector";
import Input from "../ui/Input";

const BookingDrawer = ({ open, setOpen, user  }) => {
  const navigate = useNavigate();


  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // ✅ Load user safely
  useEffect(() => {
  if (user && open) {
    console.log("🔥 Autofill APPLY:", user);

    setForm((prev) => {
      // prevent unnecessary overwrite
      if (
        prev.name === user.name &&
        prev.email === user.email &&
        prev.phone === user.mobile
      ) {
        return prev;
      }

      return {
        name: user.name || "",
        email: prev.email || user.email || ""   ,
        phone: user.mobile || ""
      };
    });
  }
}, [user, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Check login
    if (!user) {
      alert("Please login first");
      return;
    }

    // ✅ Validation
    if (!time || !form.name || !form.phone || !form.email) {
      alert("Please fill all required details");
      return;
    }

    const reservationId =
      "AK-" + Math.floor(100000 + Math.random() * 900000);

    navigate("/select-table", {
      state: {
        reservationId,
        date,
        time,
        guests,
        occasion,
        form
      }
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-[#03252A] z-50 shadow-xl transform transition-transform duration-500 overflow-hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col gap-4 h-full overflow-y-auto">
          <h2 className="text-3xl text-[#d4af37] mb-4">
            Reserve a Table
          </h2>
              {/* Overlay */}
     {user && (
  <h3 className="text-lg text-gray-300">
    Booking as{" "}
    <span className="text-[#d4af37] font-semibold">
      {user.name}
    </span>
  </h3>
)}


          <DatePickerField
            selectedDate={date}
            setSelectedDate={setDate}
          />

          <TimeSlots
            selectedTime={time}
            setSelectedTime={setTime}
          />

          <GuestSelector
            guests={guests}
            setGuests={setGuests}
          />

          <OccasionSelector
            occasion={occasion}
            setOccasion={setOccasion}
          />

          <Input
            label="Full Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled
        
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled
        
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          
          />

          <button
            onClick={handleSubmit}
            disabled={!time || !form.name || !form.phone || !form.email}
            className={`py-3 rounded-lg mt-4 transition-all duration-200 ${
  !time || !form.name || !form.phone || !form.email
    ? "bg-gray-600 cursor-not-allowed"
    : "bg-[#d4af37] text-black hover:scale-[1.03] hover:shadow-lg hover:shadow-[#d4af37]/20"
}`}
          >
           Confirm Reservation →
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingDrawer;