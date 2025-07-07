import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../lib/AppContext";
import { useUser } from "@clerk/clerk-react";

const UserProfile = () => {
  const { user } = useUser();
  if (!user) return null;
  const { favorites, bookings } = useApp();

  const stats = [
    {
      title: "Favorite Movies",
      count: favorites.length,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: "/favorite",
      color: "text-red-500"
    },
    {
      title: "Active Bookings",
      count: bookings.length,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/my-bookings",
      color: "text-blue-500"
    },
    {
      title: "Movies Watched",
      count: Math.floor(bookings.length * 0.8), // Simulated watched movies
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      link: "/movies",
      color: "text-green-500"
    }
  ];

  return (
    <div className="bg-[#18181b] rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Your Profile</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-[#232326] rounded-lg p-4 hover:bg-[#f84565]/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} group-hover:text-[#f84565] transition-colors`}>
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-white">{stat.count}</span>
            </div>
            <p className="text-gray-400 text-sm group-hover:text-white transition-colors">
              {stat.title}
            </p>
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-3">Quick Actions</h4>
        
        <Link
          to="/movies"
          className="flex items-center justify-between p-3 bg-[#232326] rounded-lg hover:bg-[#f84565]/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">Browse Movies</span>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          to="/favorite"
          className="flex items-center justify-between p-3 bg-[#232326] rounded-lg hover:bg-[#f84565]/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">View Favorites</span>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          to="/my-bookings"
          className="flex items-center justify-between p-3 bg-[#232326] rounded-lg hover:bg-[#f84565]/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-300 group-hover:text-white transition-colors">My Bookings</span>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#f84565] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile; 