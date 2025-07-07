import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import { useApp } from "../lib/AppContext";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

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
  const navigate = useNavigate();
  const { addBooking } = useApp();
  const movie = dummyShowsData.find(m => String(m.id) === String(id));
  const [selectedTiming, setSelectedTiming] = useState(timings[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useUser();

  if (!movie) return <div className="pt-24 text-center text-white">Movie not found.</div>;

  const handleSeatClick = (row, num) => {
    const seatId = `${row}${num}`;
    if (occupied.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmBooking = () => {
    if (!user) {
      alert("Please login to book tickets.");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    // Create booking object
    const booking = {
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster_path,
      date: date,
      time: "7:00 PM", // Default time
      seats: selectedSeats
    };

    addBooking(booking);
    toast.success(`Successfully booked ${selectedSeats.length} seat(s) for ${movie.title}`);
    navigate('/my-bookings');
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400">Select your seats for {date}</p>
        </div>

        {/* Movie Info */}
        <div className="bg-[#18181b] rounded-xl p-6 mb-8 flex items-center gap-6">
          <img 
            src={movie.poster_path} 
            alt={movie.title} 
            className="w-20 h-28 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-1">Date: {date}</p>
            <p className="text-gray-400 text-sm mb-1">Time: 7:00 PM</p>
            <p className="text-gray-400 text-sm">Duration: {movie.runtime} minutes</p>
          </div>
        </div>

        {/* Screen */}
        <div className="text-center mb-8">
          <div className="bg-gray-600 h-2 rounded-full max-w-2xl mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">SCREEN</p>
        </div>

        {/* Seat Layout */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid gap-2">
            {seatRows.map((row) => (
              <div key={row.label} className="flex justify-center gap-2">
                <span className="w-8 text-center text-sm text-gray-400 font-semibold">{row.label}</span>
                {Array.from({ length: row.count }, (_, i) => {
                  const seatId = `${row.label}${i + 1}`;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <button
                      key={seatId}
                      onClick={() => handleSeatClick(row.label, i + 1)}
                      className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                        isSelected 
                          ? 'bg-[#f84565] text-white' 
                          : 'bg-[#232326] text-gray-300 hover:bg-[#f84565]/20 hover:text-[#f84565]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#232326] rounded"></div>
            <span className="text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#f84565] rounded"></div>
            <span className="text-gray-400">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span className="text-gray-400">Occupied</span>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-[#18181b] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Movie:</span>
              <span>{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time:</span>
              <span>7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Selected Seats:</span>
              <span>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Price:</span>
              <span className="text-[#f84565] font-semibold">${selectedSeats.length * 12}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="px-8 py-3 bg-[#232326] hover:bg-[#f84565]/20 text-white rounded-full font-semibold transition"
          >
            Back to Movie
          </button>
          <button 
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              selectedSeats.length > 0 
                ? 'bg-[#f84565] hover:bg-[#d63854] text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Booking (${selectedSeats.length * 12})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;