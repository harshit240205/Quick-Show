import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { SignInButton, useUser, UserButton } from "@clerk/clerk-react";
import { useApp } from "../lib/AppContext";

const Navbar = () => {
    const { user } = useUser();
    const location = useLocation();
    const { favorites, bookings } = useApp();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/movies", label: "Movies" },
        { to: "/favorite", label: "Favorites" },
        { to: "/my-bookings", label: "My Bookings" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black flex items-center justify-between px-8 py-4 border-b border-[#18181b]">
            {/* Logo as styled text */}
            <Link to="/" className="flex items-center gap-2 select-none">
                <span className="text-3xl font-extrabold">
                    <span className="text-[#f84565]">t</span>
                    <span className="text-white">icketo</span>
                </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`text-lg font-bold transition-colors px-2 py-1 rounded ${
                            isActive(link.to)
                                ? "text-[#f84565]"
                                : "text-white hover:text-[#f84565]"
                        }`}
                    >
                        {link.label}
                        {link.label === "Favorites" && favorites.length > 0 && (
                            <span className="ml-2 bg-[#f84565] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center align-middle">
                                {favorites.length}
                            </span>
                        )}
                        {link.label === "My Bookings" && bookings.length > 0 && (
                            <span className="ml-2 bg-[#f84565] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center align-middle">
                                {bookings.length}
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            {/* Search and User */}
            <div className="flex items-center gap-6">
                <SearchIcon className="w-6 h-6 text-white cursor-pointer" />
                {!user ? (
                    <SignInButton mode="modal">
                        <button className="w-8 h-8 rounded-full bg-[#f84565] flex items-center justify-center text-white font-bold text-lg">
                            ?
                        </button>
                    </SignInButton>
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
