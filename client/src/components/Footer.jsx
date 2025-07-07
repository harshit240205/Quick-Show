import React from "react";
import { Link } from "react-router-dom";

const socialIcons = [
    {
        href: "https://twitter.com/",
        svg: (
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.206-4.924 4.924 0 .386.044.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.724-.666 1.562-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.298.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.377 4.6 3.417A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
            </svg>
        ),
    },
    {
        href: "https://facebook.com/",
        svg: (
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
        ),
    },
    {
        href: "https://instagram.com/",
        svg: (
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.277-.353-2.45-1.32-3.417-.967-.967-2.14-1.261-3.417-1.32C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-11.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer className="bg-[#161618] text-white pt-12 pb-4 px-6 md:px-20 relative overflow-hidden">
            {/* Ticket stub effect */}
            <div className="absolute left-0 right-0 top-0 h-4 bg-gradient-to-r from-[#F31260]/30 via-transparent to-[#F31260]/30 opacity-60 pointer-events-none" />
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 relative z-10">
                {/* Left: Logo & Description */}
                <div className="flex-1 min-w-[220px]">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-[#F31260] mr-1">Q</span>
                        <span className="text-2xl font-bold text-white">uickShow</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 max-w-xs">
                        Book your favorite movies, discover new releases, and enjoy seamless ticketing with ticketo. Your next movie night is just a click away!
                    </p>
                    <div className="flex gap-3 mt-4">
                        <a href="#" className="inline-block">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10"/>
                        </a>
                        <a href="#" className="inline-block">
                            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10"/>
                        </a>
                    </div>
                    <div className="flex gap-4 mt-6">
                        {socialIcons.map((icon, idx) => (
                            <a key={idx} href={icon.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#F31260] transition">
                                {icon.svg}
                            </a>
                        ))}
                    </div>
                </div>
                {/* Center: Company Links */}
                <div className="flex-1 min-w-[180px]">
                    <h3 className="font-semibold text-lg mb-3 tracking-wide">Company</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/" className="hover:text-[#F31260] transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-[#F31260] transition">About us</Link></li>
                        <li><Link to="/contact" className="hover:text-[#F31260] transition">Contact us</Link></li>
                        <li><Link to="/privacy" className="hover:text-[#F31260] transition">Privacy policy</Link></li>
                    </ul>
                </div>
                {/* Right: Contact & Newsletter */}
                <div className="flex-1 min-w-[220px]">
                    <h3 className="font-semibold text-lg mb-3 tracking-wide">Get in touch</h3>
                    <ul className="space-y-2 text-gray-300 text-sm mb-4">
                        <li>+1-212-456-7890</li>
                        <li>contact@ticketo.com</li>
                    </ul>
                    <form className="flex items-center bg-[#232326] rounded-full px-2 py-1 mt-2 shadow-inner max-w-xs">
                        <input
                            type="email"
                            placeholder="Subscribe for updates"
                            className="bg-transparent outline-none px-3 py-1 text-sm flex-1 text-white placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="bg-[#F31260] hover:bg-[#c50e4c] text-white rounded-full px-4 py-1 text-sm font-semibold transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs tracking-wide relative z-10">
                <span className="inline-block align-middle">
                    <svg className="inline w-4 h-4 mr-1 text-[#F31260]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.5"/>
                        <rect x="3" y="7.5" width="18" height="9" rx="2"/>
                        <path d="M3 12h18"/>
                    </svg>
                </span>
                Copyright {new Date().getFullYear()} © ticketo. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;