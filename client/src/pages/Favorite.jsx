import React from "react";
import { useApp } from "../lib/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Favorite = () => {
    const { favorites, removeFavorite } = useApp();

    const handleRemoveFavorite = (movie) => {
        removeFavorite(movie.id);
        toast.success(`${movie.title} removed from favorites`);
    };

    if (favorites.length === 0) {
        return (
            <div className="pt-24 pb-8 min-h-screen bg-black text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-8">
                        <svg 
                            className="mx-auto h-24 w-24 text-gray-600 mb-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1} 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                        </svg>
                        <h2 className="text-3xl font-bold mb-4 text-[#f84565]">No Favorites Yet</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Start adding movies to your favorites to see them here!
                        </p>
                        <Link 
                            to="/movies" 
                            className="inline-block px-8 py-3 bg-[#f84565] hover:bg-[#d63854] text-white rounded-full font-semibold text-lg transition"
                        >
                            Browse Movies
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-8 min-h-screen bg-black text-white">
            <section className="max-w-7xl mx-auto px-6 md:px-0 mt-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#f84565]">
                        My Favorites ({favorites.length})
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform group relative">
                            <Link to={`/movies/${movie.id}`}>
                                <img 
                                    src={movie.poster_path} 
                                    alt={movie.title} 
                                    className="w-full h-56 object-cover group-hover:opacity-80 transition" 
                                />
                            </Link>
                            
                            <div className="p-4">
                                <Link to={`/movies/${movie.id}`}>
                                    <h3 className="text-lg font-semibold mb-1 truncate hover:text-[#f84565] transition" 
                                         title={movie.title}>
                                        {movie.title}
                                    </h3>
                                </Link>
                                
                                <p className="text-sm text-gray-400 mb-2 truncate" title={movie.tagline}>
                                    {movie.tagline}
                                </p>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                                    <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full font-bold">
                                        ★ {movie.vote_average}
                                    </span>
                                    <span>{movie.genres.map(g => g.name).join(", ")}</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Link 
                                        to={`/movies/${movie.id}`}
                                        className="flex-1 px-3 py-2 bg-[#232326] hover:bg-[#f84565]/20 text-white rounded-lg font-semibold text-sm transition text-center"
                                    >
                                        View Details
                                    </Link>
                                    <button 
                                        onClick={() => handleRemoveFavorite(movie)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition"
                                        title="Remove from favorites"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Favorite;