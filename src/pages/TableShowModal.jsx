import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import bgImage from "../assets/hero.jpg"; // use same image as summary page

const TABLES = [
  { id: 1, seats: 2, x: 2, y: 6, label: "T1" },
  { id: 2, seats: 2, x: 92, y: 6, label: "T2" },
  { id: 3, seats: 2, x: 2, y: 82, label: "T3" },
  { id: 4, seats: 2, x: 92, y: 82, label: "T4" },
  { id: 5, seats: 4, x: 32, y: 6, label: "T5" },
  { id: 6, seats: 4, x:56, y: 10, label: "T6" },
  { id: 7, seats: 4, x: 32, y: 82, label: "T7" },
  { id: 8, seats: 4, x: 56, y: 78, label: "T8" },
  { id: 9, seats: 6, x: 55, y: 42, label: "T9" },
  { id: 10, seats: 6, x: 42, y: 24, label: "T10" },
  { id: 11, seats: 6, x: 42, y: 62, label: "T11" },
  { id: 12, seats: 6, x: 30, y: 43, label: "T12" },
  { id: 13, seats: 8, x: 14, y: 22, label: "T13" },
  { id: 14, seats: 8, x: 74, y: 8, label: "T14" },
  { id: 15, seats: 8, x: 14, y: 70, label: "T15" },
  { id: 16, seats: 8, x: 74, y: 82, label: "T16" },
  { id: 17, seats: 10, x: 75, y: 32, label: "T17" },
  { id: 18, seats: 10, x: 75, y: 60, label: "T18" },
];

const INITIAL_RESERVATIONS = {
  "2025-06-10": { 3: "reserved", 7: "reserved", 9: "pending" },
};

const STATUS = {
  available: "bg-green-600",
  reserved: "bg-red-600",
  pending: "bg-amber-500",
};

function getStatus(id, date, reservations) {
  return reservations[date]?.[id] || "available";
}
function availableSeats(date) {
  return TABLES.reduce((total, table) => {
    const status = getStatus(table.id, date, INITIAL_RESERVATIONS);
    return status === "available" ? total + table.seats : total;
  }, 0);
}

export default function TableShowModal({ open = true }) {
  const [selectedDate, setSelectedDate] = useState("2025-06-10");
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
const bookingData = location.state || {};

  const dates = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });
const seatsCount = availableSeats(selectedDate);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

  {/* 🔥 Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  />

  {/* 🔥 Dark Overlay (same as summary page) */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

  {/* 🔥 Content Wrapper */}
  <div className="relative flex items-center justify-center p-6 h-full">
      <div className="bg-slate-900/95 backdrop-blur-md border border-yellow-600/30 rounded-xl w-full max-w-4xl p-6 text-white shadow-2xl shadow-black/40">

       
<div className="flex justify-between items-center relative">
        <div className="date flex gap-2 flex-wrap mb-10 text-amber-50">
          {dates.map((date) => {
            const d = new Date(date);
            const active = selectedDate === date;

            return (

              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTable(null);
                }}
                className={`px-4 py-2 rounded text-sm border ${active
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "border-gray-700 bg-gray-800"
                  }`}
              >
                {d.toDateString().slice(0, 10)}
              </button>

            );

          })}
          <div className="border-gray-700 bg-gray-800 px-4 py-2 rounded text-sm border flex items-center flex-col gap-2 absolute right-0">
            <h2 className=""> Available Seates</h2>
            <p>{seatsCount}</p>
          </div>
        </div>
      </div>
       

        {/* Layout */}
        <div className="relative bg-black/40 border border-yellow-500/20 rounded-lg pt-[56%] mb-6">

          {/* Entrance */}
          <div className="h-52 w-10 border border-yellow-500/20 absolute top-1/4 flex justify-center items-center">
            <p className="rotate-90 origin-center">Entrance</p>
          </div>

          {/* Window */}
          <div className="h-52 w-10 border border-yellow-500/20 absolute top-1/4 right-0 flex justify-center items-center">
            <p className="rotate-90 origin-center">Window</p>
          </div>

          {/* Tables */}
          {TABLES.map((table) => {
            const status = getStatus(
              table.id,
              selectedDate,
              INITIAL_RESERVATIONS
            );

            const size =
              table.seats <= 2
                ? "w-12 h-12"
                : table.seats <= 4
                ? "w-19 h-14"
                 : table.seats <= 6
                 ? "w-20 h-14"
                 : table.seats <= 8
                 ? "w-22 h-14"
                 : table.seats <= 10
                 ? "w-24 h-14"
                : "w-26 h-14";

            return (
              <div
                key={table.id}
                onClick={() =>
                  status === "available" && setSelectedTable(table)
                }
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                }}
                className="absolute"
              >
                <div className="relative flex items-center justify-center">

                  {/* Chairs */}
                  {(() => {
                    const seats = table.seats;
                    const spacing = 32;
                   

                    let top = 0,
                      bottom = 0,
                      left = 0,
                      right = 0;

                    if (seats === 2) {
                      top = 1;
                      bottom = 1;
                    } else if (seats === 4) {
                      top = 1;
                      bottom = 1;
                      left = 1;
                      right = 1;
                    } else if (seats === 6) {
                      top = 2;
                      bottom = 2;
                      left = 1;
                      right = 1;
                    } else if (seats === 8) {
                      top = 2;
                      bottom = 2;
                      left = 2;
                      right = 2;
                    } else if (seats === 10) {
                      top = 3;
                      bottom = 3;
                      left = 2;
                      right = 2;
                    }

                    return (
                      <>
                        {/* Top */}
                        {Array.from({ length: top }).map((_, i) => {
                          const offset =
                            (i - (top - 1) / 2) * spacing;
                          return (
                            <div
                              key={`top-${i}`}
                              style={{
                                transform: `translate(${offset}px, -38px)`,
                              }}
                              className="absolute w-4 h-4 rounded-full bg-white/60"
                            />
                          );
                        })}

                        {/* Bottom */}
                        {Array.from({ length: bottom }).map((_, i) => {
                          const offset =
                            (i - (bottom - 1) / 2) * spacing;
                          return (
                            <div
                              key={`bottom-${i}`}
                              style={{
                                transform: `translate(${offset}px, 38px)`,
                              }}
                              className="absolute w-4 h-4 rounded-full bg-white/60"
                            />
                          );
                        })}

                        {/* Left */}
                        {Array.from({ length: left }).map((_, i) => {
                          const offset =
                            (i - (left - 1) / 2) * spacing;
                          return (
                            <div
                              key={`left-${i}`}
                              style={{
                                transform: `translate(-55px,${offset}px)`,
                              }}
                              className="absolute w-4 h-4 rounded-full bg-white/60"
                            />
                          );
                        })}

                        {/* Right */}
                        {Array.from({ length: right }).map((_, i) => {
                          const offset =
                            (i - (right - 1) / 2) * spacing;
                          return (
                            <div
                              key={`right-${i}`}
                              style={{
                                transform: `translate(55px, ${offset}px)`,
                              }}
                              className="absolute w-4 h-4 rounded-full bg-white/60"
                            />
                          );
                        })}
                      </>
                    );
                  })()}

                  {/* Table */}
                  <div
                    className={`flex flex-col items-center justify-center text-xs text-white cursor-pointer transition hover:scale-110 z-10
                      ${size}
                      ${STATUS[status]}
                      ${
                        selectedTable?.id === table.id
                          ? "ring-4 ring-yellow-400"
                          : ""
                      }
                      ${
                        table.seats <= 2
                          ? "rounded-full"
                          : "rounded-md"
                      }
                    `}
                  >
                    <div className="font-bold">{table.label}</div>
                    <div className="text-[10px] opacity-80">
                      {table.seats}p
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Table */}
        {selectedTable && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-lg flex justify-center">
            <h3 className="text-sm tracking-wider text-yellow-400 mb-4">
              Table {selectedTable.label} • {selectedTable.seats} Seats
              {selectedTable && (
  <div className="mt-4 flex justify-center">
     <button
      onClick={() =>
        navigate("/summary", {
          state: {
            ...bookingData, 
            table: selectedTable.label  // ✅ PASSING TABLE
          }
        })
      }
      className="bg-[#d4af37] text-black px-6 py-3 rounded-lg hover:scale-105 transition font-semibold"
    >
      Confirm Table →
    </button>
  </div>
)}
            </h3>
            
            
          </div>
        )}
      </div>
    </div>
    </div>  
  );
}
