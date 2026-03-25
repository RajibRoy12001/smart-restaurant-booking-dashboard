import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";

import firstOrder from "../assets/firstorderfree.jpg";
import todaysMenu from "../assets/todaysMenu.jpg";
import off10 from "../assets/10off.jpg";

const offers = [
  {
    id: 1,
    code: "RRDEAL",
    title: "Save Flat 10% on Your Favourite Meals",
    description: "Get 10% off on meals! Prepay for orders above Rs.399",
    img:off10,
  },
  {
    id: 2,
    code: "FIRST100",
    title: "Rs.100 Cashback on First Order",
    description: "Rs.100 cashback on first order",
    img: firstOrder,
  },
  {
    id: 3,
    code: "FREEDELIVERY",
    title: "Flat 5% OFF",
    description: "Discount on all orders through mobile app",
    img: todaysMenu,
  },
  {
    id: 4,
    code: "RRP10",
    title: "Get 10% off on Prepaid Orders",
    description: "",
    img: off10,
  },
];

const OfferCard = ({ offer }) => {
   const navigate = useNavigate();
  return (
    <div className="bg-gray-300 rounded-xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition mt-25">

      {/* Image */}
      <img
        src={offer.img}
        alt={offer.code}
        className="w-full h-80 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">

        {/* Coupon Code */}
        <div className="border-2 border-dashed border-blue-400 text-blue-600 text-center py-1 font-semibold rounded-md">
          {offer.code}
        </div>

        {/* Text */}
        <p className="text-gray-700 text-sm font-medium">
          {offer.title}
        </p>

        {offer.description && (
          <p className="text-gray-500 text-sm">
            {offer.description}
          </p>
        )}

        {/* Button */}
        <button className="mt-2 border-2 border-[#d4af37] text-white bg-[#021B1E]  hover:bg-[#d4af37] hover:text-black py-2 rounded-md hover:opacity-90 transition"
        onClick={()=>{
          navigate("")
        }}>
          APPLY
        </button>
      </div>
    </div>
  );
};
function Offer() {
   const navigate = useNavigate();
  return (
    <>
      <div className='min-h-screen bg-[#021B1E] p-4 relative'>
        <button
        onClick={() => navigate("/")}
        className="mb-6  absolute top-23 left-16 text-lg font-medium text-[#d4af37] flex items-center gap-2 group"
      >
        <span>←</span>
        <span className="group-hover:underline group-hover:text-white transition">
          Back
        </span>
      </button>


        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Offer