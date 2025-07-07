import React from "react";
import { useApp } from "../lib/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookings = () => {
    const { bookings, removeBooking } = useApp();

    const handleCancelBooking = (booking) => {
        removeBooking(booking.id);
        toast.success(`Booking for ${booking.movieTitle} on ${booking.date} has been cancelled`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatBookingDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (bookings.length === 0) {
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                            />
                        </svg>
                        <h2 className="text-3xl font-bold mb-4 text-[#f84565]">No Bookings Yet</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Start booking movies to see your upcoming shows here!
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
            <section className="max-w-6xl mx-auto px-6 md:px-0 mt-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#f84565]">
                        My Bookings ({bookings.length})
                    </h2>
                </div>
                
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                {/* Movie Poster */}
                                <div className="md:w-48 flex-shrink-0">
                                    <Link to={`/movies/${booking.movieId}`}>
                                        <img 
                                            src={booking.moviePoster} 
                                            alt={booking.movieTitle} 
                                            className="w-full h-48 md:h-full object-cover hover:opacity-80 transition" 
                                        />
                                    </Link>
                                </div>
                                
                                {/* Booking Details */}
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between h-full">
                                        <div className="flex-1">
                                            <Link to={`/movies/${booking.movieId}`}>
                                                <h3 className="text-2xl font-bold mb-2 hover:text-[#f84565] transition">
                                                    {booking.movieTitle}
                                                </h3>
                                            </Link>
                                            
                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-[#f84565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-gray-300">
                                                        <strong>Show Date:</strong> {formatBookingDate(booking.date)}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-[#f84565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-gray-300">
                                                        <strong>Show Time:</strong> {booking.time || "TBD"}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-[#f84565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-gray-300">
                                                        <strong>Seats:</strong> {booking.seats?.join(", ") || "TBD"}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-[#f84565]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <span className="text-gray-300">
                                                        <strong>Booked on:</strong> {formatDate(booking.bookingDate)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="bg-[#f84565]/20 text-[#f84565] px-2 py-1 rounded-full font-semibold">
                                                    Booking ID: {booking.id.slice(-8)}
                                                </span>
                                                <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                                                    Confirmed
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-3 mt-4 md:mt-0 md:ml-6">
                                            <Link 
                                                to={`/movies/${booking.movieId}`}
                                                className="px-6 py-2 bg-[#232326] hover:bg-[#f84565]/20 text-white rounded-lg font-semibold transition text-center"
                                            >
                                                View Movie
                                            </Link>
                                            <button 
                                                onClick={() => handleCancelBooking(booking)}
                                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MyBookings;