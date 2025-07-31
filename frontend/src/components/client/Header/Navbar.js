"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Logo from "@/public/Logo.svg";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const store = useSelector((state) => state.misoran);
    const menuRef = useRef(null);

    console.log(store);

    useEffect(() => {
        const menuEl = menuRef.current;
        if (!menuEl) return;

        const handleMenuHeight = () => {
            if (isOpen || window.innerWidth > 768) {
                menuEl.style.maxHeight = `${menuEl.scrollHeight}px`;
                menuEl.style.opacity = "1";
            } else {
                menuEl.style.maxHeight = "0px";
                menuEl.style.opacity = "0";
            }
        };

        handleMenuHeight();
        window.addEventListener("resize", handleMenuHeight);
        return () => window.removeEventListener("resize", handleMenuHeight);
    }, [isOpen]);

    // Skip nav animation on auth/admin pages
    if (pathname === "/signin" || pathname === "/signup" || pathname.startsWith("/admin")) return null;

    return (
        <nav className="w-full z-50 backdrop-blur-md bg-[#fefbfb] dark:bg-black/30 shadow transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href={"/"}>
                    <Image src={Logo} alt="Logo" width={80} height={100} />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 text-lg font-medium">
                    {["Project", "Services", "About", "Contact"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} className="relative text-gray-800 dark:text-white transition duration-300 group">
                            {item}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}

                    {store.authenticated && store.decodedToken.role === "admin" && (
                        <Link href={`/admin`} className="relative text-gray-800 dark:text-white transition duration-300 group">
                            Admin Panel
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </Link>
                    )}

                    {store.authenticated && store.decodedToken.role === "admin" ? (
                        <Link href={`/logout`} className="relative text-gray-800 dark:text-white transition duration-300 group">
                            Logout
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ) : (
                        <Link href={`/signin`} className="relative text-gray-800 dark:text-white transition duration-300 group">
                            Signin
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </Link>
                    )}
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
            <div ref={menuRef} className="md:hidden overflow-hidden transition-all duration-500 ease-in-out backdrop-blur-lg bg-white/30 dark:bg-black/30" style={{ maxHeight: "0px", opacity: 0 }}>
                <div className="flex flex-col items-center space-y-4 py-4 text-lg font-medium">
                    {["Project", "Services", "About", "Contact"].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-pink-500 transition">
                            {item}
                        </Link>
                    ))}

                    {store.authenticated && store.decodedToken.role === "admin" && (
                        <Link href={`/admin`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-pink-500 transition">
                            Admin Panel
                        </Link>
                    )}

                    {store.authenticated && store.decodedToken.role === "admin" ? (
                        <Link href={`/logout`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-pink-500 transition">
                            Logout
                        </Link>
                    ) : (
                        <Link href={`/signin`} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-white hover:text-pink-500 transition">
                            Signin
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
