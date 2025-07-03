import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";

const timings = [
  "06:30", "09:30", "12:00", "04:30", "08:00"
];

// Example seat map: 2 rows front, 3 main rows, 2 back rows
const seatRows = [
  { label: "A", count: 10 },
  { label: "B", count: 10 },
  { label: "C", count: 20 },
  { label: "D", count: 20 },
  { label: "E", count: 20 },
  { label: "F", count: 20 },
  { label: "G", count: 20 },
];

// Example occupied seats
const occupied = ["C7", "C8", "D12", "D13", "E5"];

const SeatLayout = () => {
  const { id, date } = useParams();
  const movie = dummyShowsData.find(m => String(m.id) === String(id));
  const [selectedTiming, setSelectedTiming] = useState(timings[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, num) => {
    const seatId = `${row}${num}`;
    if (occupied.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white flex justify-center items-start px-4 pb-12">
      {/* Timings Sidebar */}
      <div className="bg-[#18181b] rounded-xl p-6 mr-12 mt-8 min-w-[180px] shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-gray-200">Available Timings</h3>
        <div className="flex flex-col gap-3">
          {timings.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTiming(time)}
              className={`px-4 py-2 rounded-lg text-left font-medium transition-all border border-transparent ${
                selectedTiming === time
                  ? "bg-[#f84565] text-white" : "bg-[#232326] text-gray-300 hover:bg-[#232326]/80"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Main Seat Layout */}
      <div className="flex-1 flex flex-col items-center mt-8">
        <h2 className="text-2xl font-bold mb-2">Select Your Seat</h2>
        {movie && (
          <div className="flex items-center gap-4 mb-4">
            <img src={movie.poster_path} alt={movie.title} className="w-16 h-24 object-cover rounded-lg border border-[#232326]" />
            <div>
              <div className="font-bold text-lg">{movie.title}</div>
              <div className="text-xs text-gray-400">{date}</div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-72 md:w-[420px] h-2 bg-gradient-to-r from-[#f84565]/30 via-[#f84565]/60 to-[#f84565]/30 rounded-full mb-2 mt-4" />
          <span className="text-xs text-gray-400 tracking-widest mb-6">SCREEN SIDE</span>
        </div>
        <div className="flex flex-col gap-3 mb-10">
          {seatRows.map((row, idx) => (
            <div key={row.label} className="flex items-center justify-center gap-2">
              <span className="w-6 text-right mr-2 text-gray-500 font-mono select-none">{row.label}</span>
              {[...Array(row.count)].map((_, i) => {
                const seatNum = i + 1;
                const seatId = `${row.label}${seatNum}`;
                const isOccupied = occupied.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(row.label, seatNum)}
                    disabled={isOccupied}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center text-xs font-bold mx-0.5 border transition-all
                      ${isOccupied
                        ? "bg-[#f84565]/40 border-[#f84565] text-[#f84565] cursor-not-allowed"
                        : isSelected
                        ? "bg-[#f84565] border-[#f84565] text-white"
                        : "bg-[#232326] border-[#232326] text-gray-300 hover:bg-[#f84565]/30 hover:border-[#f84565] hover:text-[#f84565]"}
                    `}
                    style={{ boxShadow: isSelected ? "0 0 8px #f84565aa" : undefined }}
                  >
                    {seatNum}
                  </button>
                );
              })}
            </div>
          ))}
          {/* Seat numbers below */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-6" />
            {[...Array(20)].map((_, i) => (
              <span key={i} className="w-7 md:w-8 text-xs text-gray-600 text-center select-none">
                {i < 9 ? i + 1 : i + 1}
              </span>
            ))}
          </div>
        </div>
        <button
          className="mt-8 px-8 py-3 bg-[#f84565] hover:bg-[#d63854] transition rounded-full font-semibold text-lg shadow-lg flex items-center gap-2"
          disabled={selectedSeats.length === 0}
        >
          Proceed to checkout
          <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;