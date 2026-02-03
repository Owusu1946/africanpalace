"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-white pt-16 md:pt-24 pb-12 md:pb-16 px-6 font-sans">
            <div className="max-w-[1280px] mx-auto flex flex-col">

                {/* === Top Row === */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16 md:mb-24">

                    {/* Left Block: Description */}
                    <div className="flex flex-col items-start max-w-sm lg:w-[45%]">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 font-light">
                            The African Palace is Tamale’s most luxurious and highly reviewed Airbnb, designed for comfort, privacy, and unforgettable stays.
                        </p>
                        <div className="flex flex-row flex-wrap items-center gap-4">
                            <Link
                                href="#"
                                className="text-black font-medium text-sm md:text-base border-b border-black/20 hover:border-black transition-colors"
                            >
                                Go to Details
                            </Link>
                            <Link
                                href="https://www.airbnb.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 border border-black/10 rounded-full text-[10px] md:text-sm font-medium text-gray-500 hover:text-black hover:border-black/40 transition-all focus-visible:ring-2 focus-visible:ring-black"
                            >
                                Find us on Airbnb
                            </Link>
                        </div>
                    </div>

                    {/* Right Block: Link Columns */}
                    <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8 md:gap-x-12 w-full lg:w-auto">

                        {/* Column 1: About */}
                        <div className="flex flex-col space-y-4 md:space-y-5">
                            <h4 className="text-black font-semibold text-xs md:text-sm tracking-wide uppercase md:normal-case">About</h4>
                            <nav className="flex flex-col space-y-2 md:space-y-3">
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Career</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Experience</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Direction</Link>
                            </nav>
                        </div>

                        {/* Column 2: Package */}
                        <div className="flex flex-col space-y-4 md:space-y-5">
                            <h4 className="text-black font-semibold text-xs md:text-sm tracking-wide uppercase md:normal-case">Package</h4>
                            <nav className="flex flex-col space-y-2 md:space-y-3">
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Family Stay</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Long Stay</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Celebration</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Workspace</Link>
                            </nav>
                        </div>

                        {/* Column 3: Keep in Touch */}
                        <div className="flex flex-col space-y-4 md:space-y-5">
                            <h4 className="text-black font-semibold text-xs md:text-sm tracking-wide uppercase md:normal-case">Keep in Touch</h4>
                            <nav className="flex flex-col space-y-2 md:space-y-3">
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Instagram</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Twitter</Link>
                                <Link href="#" className="text-gray-500 hover:text-black text-sm transition-colors">TikTok</Link>
                                <a href="tel:+233202223335" className="text-gray-500 hover:text-black text-sm transition-colors">Call Us</a>
                            </nav>
                        </div>

                    </div>
                </div>

                {/* === Bottom Row === */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 pt-8 gap-6 md:gap-4">

                    {/* Copyright */}
                    <div className="text-gray-400 text-[10px] md:text-sm font-light order-2 md:order-1">
                        Copyright © The African Palace 2026
                    </div>

                    {/* Tagline */}
                    <div className="text-gray-400 text-[10px] md:text-sm font-light text-center md:text-right order-1 md:order-2 italic md:not-italic">
                        Tamale’s finest stay, thoughtfully hosted.
                    </div>

                </div>

            </div>
        </footer>
    );
}
