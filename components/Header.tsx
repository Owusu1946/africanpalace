"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(variant === "dark");
    const [isPillMode, setIsPillMode] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setIsPillMode(scrollPos > 50);
            // On dark variants, we're always technically "scrolled" (black text)
            setIsScrolled(scrollPos > 50 || variant === "dark");
        };

        handleScroll(); // Check immediately on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [variant]);

    const textColorClass = isScrolled ? "text-black" : "text-white";
    const subtextColorClass = isScrolled ? "text-black/60" : "text-white/70";

    // Pill background and border depends on if it's condensed (isPillMode) OR if it's a subpage (variant="dark")
    const pillBgClass = isPillMode
        ? "bg-white/80 shadow-md"
        : (variant === "dark" ? "bg-black/5" : "bg-white/10");

    const pillBorderClass = isPillMode
        ? "border-black/10"
        : (variant === "dark" ? "border-black/5" : "border-white/20");

    const navItemActiveLabel = isScrolled ? "bg-black text-white" : "bg-white text-black";
    const navItemInactiveLabel = isScrolled ? "text-black/70 hover:text-black hover:bg-black/5" : "text-white/80 hover:text-white hover:bg-white/10";

    return (
        <>
            <header className={`
                fixed top-0 left-0 w-full z-[100] px-4 py-3 md:px-10 md:py-6 flex items-center justify-between pointer-events-none transition-all duration-500
                bg-transparent
            `}>
                {/* Brand - Hidden only on actual scroll (Pill Mode) */}
                <div className={`flex flex-col items-start pointer-events-auto transition-all duration-500 ${isPillMode ? "opacity-0 -translate-x-4 pointer-events-none" : "opacity-100 translate-x-0"}`}>
                    <h1 className={`${textColorClass} text-lg md:text-2xl font-serif tracking-[0.2em] uppercase leading-none transition-colors duration-500`}>
                        African Palace
                    </h1>
                    <span className={`${subtextColorClass} text-[8px] md:text-xs tracking-widest uppercase mt-1 transition-colors duration-500`}>
                        tamale's best airbnb
                    </span>
                </div>

                {/* Desktop Navigation Pill - Always Visible */}
                <nav className="pointer-events-auto hidden md:block">
                    <div className={`
                        ${pillBgClass} backdrop-blur-md border ${pillBorderClass} rounded-full py-1.5 px-2 flex items-center gap-1 shadow-lg transition-all duration-500
                    `}>
                        {["Home", "Rooms", "Gallery", "Facilities", "Contact", "About"].map(
                            (item) => {
                                const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                                const isActive = pathname === href || (pathname === "" && item === "Home");
                                return (
                                    <Link
                                        key={item}
                                        href={href}
                                        className={`
                                            px-5 py-2 rounded-full text-sm font-bold transition-all duration-500
                                            ${isActive
                                                ? `${navItemActiveLabel} shadow-sm`
                                                : `${navItemInactiveLabel}`
                                            }
                                        `}
                                    >
                                        {item}
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
                    {/* Booking Button - Hidden on actual scroll (Pill Mode) */}
                    <Link
                        href="/rooms"
                        className={`
                            group flex items-center gap-2 md:gap-3 ${pillBgClass} backdrop-blur-md border ${pillBorderClass} rounded-full pl-4 md:pl-6 pr-1.5 md:pr-2 py-1.5 md:py-2 transition-all duration-500 
                            ${isPillMode ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-x-0 hover:bg-black/10"}
                        `}
                        aria-label="Book a room"
                    >
                        <span className={`${textColorClass} text-[12px] md:text-sm font-bold tracking-wide transition-colors duration-500`}>
                            Booking
                        </span>
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${isScrolled ? "bg-black" : "bg-white"} flex items-center justify-center transition-colors duration-500`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={isScrolled ? "text-white" : "text-black"}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden w-10 h-10 flex items-center justify-center ${pillBgClass} backdrop-blur-md border ${pillBorderClass} rounded-full ${textColorClass} transition-all duration-500`}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-5 h-4">
                            <span className={`absolute left-0 block w-full h-0.5 ${isScrolled ? "bg-black" : "bg-white"} transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                            <span className={`absolute left-0 block w-full h-0.5 ${isScrolled ? "bg-black" : "bg-white"} transition-all duration-300 top-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`absolute left-0 block w-full h-0.5 ${isScrolled ? "bg-black" : "bg-white"} transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45' : 'top-3'}`} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`
                fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
            `}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {["Home", "Rooms", "Gallery", "Facilities", "Contact", "About"].map((item, i) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-3xl font-medium tracking-wide hover:text-white/70 transition-colors"
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="pt-8">
                        <span className="text-white/40 text-xs tracking-widest uppercase">Tamale's Finest Stay</span>
                    </div>
                </div>
            </div>
        </>
    );
}
