import React from "react";
import { assets, dummyShowsData } from "../assets/assets";
import { Link } from "react-router-dom";

const Movies = () => {
    return (
        <div className="pt-24 pb-8 min-h-screen bg-black text-white">
            <section className="max-w-7xl mx-auto px-6 md:px-0 mt-4">
                <h2 className="text-3xl font-bold mb-8 text-[#f84565]">All Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {dummyShowsData.map((movie) => (
                        <Link to={`/movies/${movie.id}`} key={movie.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform group block">
                            <img src={movie.poster_path} alt={movie.title} className="w-full h-56 object-cover group-hover:opacity-80 transition" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 truncate" title={movie.title}>{movie.title}</h3>
                                <p className="text-sm text-gray-400 mb-2 truncate" title={movie.tagline}>{movie.tagline}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full font-bold">★ {movie.vote_average}</span>
                                    <span>{movie.genres.map(g => g.name).join(", ")}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Movies;