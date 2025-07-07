import React from "react";
import { assets, dummyShowsData } from "../assets/assets";
import { Link } from "react-router-dom";
import { useApp } from "../lib/AppContext";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const Movies = () => {
    const { addFavorite, removeFavorite, isFavorite } = useApp();
    const { user } = useUser();

    const handleFavoriteToggle = (movie, e) => {
        e.preventDefault(); // Prevent navigation when clicking the favorite button
        e.stopPropagation();
        
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

    return (
        <div className="pt-24 pb-8 min-h-screen bg-black text-white">
            <section className="max-w-7xl mx-auto px-6 md:px-0 mt-4">
                <h2 className="text-3xl font-bold mb-8 text-[#f84565]">All Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {dummyShowsData.map((movie) => (
                        <div key={movie.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform group relative">
                            <Link to={`/movies/${movie.id}`} className="block">
                                <img src={movie.poster_path} alt={movie.title} className="w-full h-56 object-cover group-hover:opacity-80 transition" />
                            </Link>
                            
                            {/* Favorite Button */}
                            <button
                                onClick={(e) => handleFavoriteToggle(movie, e)}
                                className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                                    isFavorite(movie.id) 
                                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                                        : 'bg-black/50 hover:bg-black/70 text-white'
                                }`}
                                title={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <svg className="w-5 h-5" fill={isFavorite(movie.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            
                            <div className="p-4">
                                <Link to={`/movies/${movie.id}`}>
                                    <h3 className="text-lg font-semibold mb-1 truncate hover:text-[#f84565] transition" title={movie.title}>{movie.title}</h3>
                                </Link>
                                <p className="text-sm text-gray-400 mb-2 truncate" title={movie.tagline}>{movie.tagline}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full font-bold">★ {movie.vote_average}</span>
                                    <span>{movie.genres.map(g => g.name).join(", ")}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Movies;