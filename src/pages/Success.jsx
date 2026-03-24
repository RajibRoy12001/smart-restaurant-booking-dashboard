import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const Success = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const reservationId = location.state?.reservationId;

  return (

    <div className="min-h-screen bg-[#021B1E] flex items-center justify-center">

      <Confetti />

      <div className="bg-[#03252A] p-12 rounded-xl text-center max-w-md shadow-xl">

        <h1 className="text-4xl text-[#d4af37] mb-4">
          Reservation Confirmed 
        </h1>

        <p className="text-gray-300 mb-4">
          Thank you for choosing AKANTE.
        </p>

        <div className="bg-black/40 p-4 rounded-lg mb-6">

          <p className="text-gray-400 text-sm">
            Reservation Number
          </p>

          <p className="text-[#d4af37] text-xl font-semibold">
            {reservationId}
          </p>

        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-[#d4af37] text-black px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Back to Home
        </button>

      </div>

    </div>
  );
};

export default Success;