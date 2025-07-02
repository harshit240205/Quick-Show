import React from "react";
import { assets, dummyShowsData } from "../assets/assets";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="pt-24 pb-8 min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 lg:px-36 py-12">
                <div className="flex-1 z-10">
                    <img src={assets.logo} alt="QuickShow Logo" className="w-48 mb-6" />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Book Your Next <span className="text-[#f84565]">Movie Night</span> Instantly
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg">
                        Discover new releases, trending movies, and seamless ticketing with QuickShow. Your next movie night is just a click away!
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Link to="/movies">
                            <button className="px-7 py-3 bg-[#f84565] hover:bg-[#d63854] transition rounded-full font-semibold text-lg shadow-lg">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center relative z-0">
                    <img src={assets.screenImage} alt="Cinema Screen" className="w-full max-w-md opacity-90" />
                </div>
            </section>

            {/* Trending Movies */}
            <section className="max-w-7xl mx-auto px-6 md:px-0 mt-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#f84565]">Trending Now</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {dummyShowsData.slice(0, 5).map((movie) => (
                        <div key={movie.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform group">
                            <img src={movie.poster_path} alt={movie.title} className="w-full h-56 object-cover group-hover:opacity-80 transition" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 truncate" title={movie.title}>{movie.title}</h3>
                                <p className="text-sm text-gray-400 mb-2 truncate" title={movie.tagline}>{movie.tagline}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                    <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-0.5 rounded-full font-bold">★ {movie.vote_average}</span>
                                    <span>{movie.genres.map(g => g.name).join(", ")}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <Link to="/movies" className="text-[#f84565] hover:underline font-semibold">See all movies →</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;