import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import DatePickerField from "./DatePickerField";
import TimeSlots from "./TimeSlots";
import GuestSelector from "./GuestSelector";
import Input from "../ui/Input";

const BookingForm = ({ step, setStep, setOpen, user }) => {

  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  // ✅ Auto-fill after login/signup
 useEffect(() => {
  if (user) {
    setForm({
      name: user.name || "",
      email: user.email || ""
    });
  }
}, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmBooking = () => {

    if (!form.name || !form.email || !time) {
      alert("Please fill all details");
      return;
    }

     navigate("/select-table", {
    state: {
      form,
      date,
      time,
      guests
    }
  });

  setOpen(false); // optional
};

  return (

    <div className="flex flex-col gap-4">

      {step === 1 && (
        <>
          <DatePickerField selectedDate={date} setSelectedDate={setDate} />
          <TimeSlots selectedTime={time} setSelectedTime={setTime} />
          <GuestSelector guests={guests} setGuests={setGuests} />

          <button
            onClick={() => setStep(2)}
            className="bg-[#d4af37] text-black py-3 rounded-lg disabled:opacity-50"
            disabled={!time}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <button
            onClick={confirmBooking}
            className="bg-[#d4af37] text-black py-3 rounded-lg disabled:opacity-50"
            disabled={!form.name || !form.email}
          >
            Confirm Booking
          </button>
        </>
      )}

    </div>
  );
};

export default BookingForm;