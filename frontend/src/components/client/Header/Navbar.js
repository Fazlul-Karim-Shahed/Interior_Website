"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-wide drop-shadow-sm">🌈 TrioInt</div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 text-lg font-medium">
                    {["Home", "Portfolio", "Services", "Contact"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="relative text-gray-800 dark:text-white transition duration-300 group">
                            {item}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col justify-between w-6 h-5 focus:outline-none" aria-label="Toggle menu">
                        <span className={`h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? "transform rotate-45 translate-y-1.5" : ""}`} />
                        <span className={`h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                        <span className={`h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${isOpen ? "transform -rotate-45 -translate-y-1.5" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out backdrop-blur-lg bg-white/30 dark:bg-black/30 ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col items-center space-y-4 py-4 text-lg font-medium">
                    {["Home", "Portfolio", "Services", "Contact"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-pink-500 transition">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
