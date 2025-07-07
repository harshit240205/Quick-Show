import React, { useState } from "react";
import { dummyShowsData } from "../assets/assets";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../lib/AppContext";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const today = new Date();
const getDateStr = (offset) => {
  const d = new Date(today);
  d.setDate(today.getDate() + offset);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
const dates = Array.from({ length: 7 }, (_, i) => getDateStr(i));

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite, addBooking } = useApp();
  const movie = dummyShowsData.find(m => String(m.id) === String(id));
  const casts = movie?.casts?.slice(0, 6) || [];
  const alsoLike = dummyShowsData.filter(m => String(m.id) !== String(id)).slice(0, 4);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [showTrailer, setShowTrailer] = useState(false);
  const { user } = useUser();

  if (!movie) return <div className="pt-24 text-center text-white">Movie not found.</div>;

  const handleFavoriteToggle = () => {
    if (!user) {
      alert("Please login to add movies to favorites.");
      return;
    }
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      toast.success(`${movie.title} removed from favorites`);
    } else {
      addFavorite(movie);
      toast.success(`${movie.title} added to favorites`);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      alert("Please login to book tickets.");
      return;
    }
    // Create a booking object
    const booking = {
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster_path,
      date: selectedDate,
      time: "7:00 PM", // Default time
      seats: ["A1", "A2"] // Default seats
    };
    
    addBooking(booking);
    toast.success(`Successfully booked ${movie.title} for ${selectedDate}`);
    navigate(`/movies/${movie.id}/${selectedDate}`);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 mb-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-60 h-80 object-cover rounded-2xl shadow-lg border border-[#232326]"
          />
        </div>
        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="uppercase text-xs tracking-widest text-[#f84565] font-bold mb-2 inline-block">{movie.genres[0]?.name || "Genre"}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{movie.title}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres.map((g) => (
                <span key={g.id} className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full text-xs font-semibold">{g.name}</span>
              ))}
            </div>
            <p className="text-gray-300 mb-4 text-sm md:text-base max-w-2xl">{movie.overview}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#f84565]/20 text-[#f84565] px-3 py-1 rounded-full font-bold text-sm">★ {movie.vote_average}</span>
              <span className="text-gray-400 text-xs">{movie.release_date} • {movie.runtime} min</span>
            </div>
            <div className="flex gap-3 mb-6">
              <button className="px-6 py-2 bg-[#232326] hover:bg-[#f84565]/20 text-white rounded-full font-semibold transition" disabled>Watch Trailer</button>
              <button 
                className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
                  isFavorite(movie.id) 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-[#232326] hover:bg-[#f84565]/20 text-white'
                }`}
                onClick={handleFavoriteToggle}
              >
                <svg className="w-5 h-5" fill={isFavorite(movie.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button 
                className="px-6 py-2 bg-[#f84565] hover:bg-[#d63854] text-white rounded-full font-semibold transition"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-[#18181b] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
          <div className="flex gap-2 flex-1 justify-center md:justify-start">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg font-medium border transition-all text-sm ${selectedDate === date ? "bg-[#f84565] text-white border-[#f84565]" : "bg-[#232326] text-gray-300 border-[#232326] hover:bg-[#f84565]/20 hover:text-[#f84565]"}`}
              >
                {date}
              </button>
            ))}
          </div>
          <button 
            className="px-8 py-3 bg-[#f84565] hover:bg-[#d63854] text-white rounded-full font-semibold text-lg transition"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Embedded Trailer - moved and resized */}
      {movie.trailerUrl && (
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-lg font-semibold mb-4">Watch Trailer</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9', minHeight: 360 }}>
            <iframe
              width="100%"
              height="100%"
              src={movie.trailerUrl.replace("watch?v=", "embed/")}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
              style={{ minHeight: 360 }}
            ></iframe>
          </div>
        </div>
      )}

      {/* Cast */}
      <div className="max-w-5xl mx-auto mb-10">
        <h3 className="text-lg font-semibold mb-4">Your Favorite Cast</h3>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {casts.map((cast, i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px]">
              <img src={cast.profile_path} alt={cast.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#232326] mb-2" />
              <span className="text-xs text-gray-200 text-center whitespace-nowrap">{cast.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* You May Also Like */}
      <div className="max-w-6xl mx-auto mb-10">
        <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {alsoLike.map((m) => (
            <div key={m.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden group">
              <img src={m.poster_path} alt={m.title} className="w-full h-44 object-cover group-hover:opacity-80 transition" />
              <div className="p-4">
                <h4 className="text-base font-semibold mb-1 truncate" title={m.title}>{m.title}</h4>
                <p className="text-xs text-gray-400 mb-2 truncate" title={m.tagline}>{m.tagline}</p>
                <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                  <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full font-bold">★ {m.vote_average}</span>
                  <span>{m.genres.map(g => g.name).join(", ")}</span>
                </div>
                <button className="mt-2 px-4 py-1 bg-[#232326] hover:bg-[#f84565]/20 text-white rounded-full font-semibold text-xs transition">See More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 bg-[#f84565] hover:bg-[#d63854] text-white rounded-full font-semibold text-lg transition">See More</button>
      </div>
    </div>
  );
};

export default MovieDetails;