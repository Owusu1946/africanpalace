"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";



export default function HomeGallerySection() {
    return (
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 font-sans">
            <div className="max-w-[1400px] mx-auto flex flex-col space-y-10 md:space-y-12 transition-all duration-300">

                {/* === Header Row === */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 text-center md:text-left">

                    {/* Headline */}
                    <h2 className="text-black text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.2] md:leading-[1.1] max-w-2xl">
                        Explore the Home Gallery <br className="hidden md:block" />
                        and Signature Details
                    </h2>

                    {/* Right Content: Text & Button */}
                    <div className="flex flex-col items-center md:items-end space-y-5 md:space-y-6 md:text-right max-w-sm md:max-w-md">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            Discover curated corners of the space, from design accents to cozy comforts,
                            crafted to make your stay feel effortless.
                        </p>

                        <Link
                            href="/gallery"
                            className="group flex items-center gap-3 border border-gray-300 rounded-full pl-6 pr-2 py-2 hover:bg-gray-50 transition-all duration-300"
                            aria-label="View Gallery"
                        >
                            <span className="text-black font-bold text-sm">
                                View Gallery
                            </span>
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* === Mosaic Grid === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[600px] lg:h-[700px]">

                    {/* 1) Far Left: Living Room Wide (Tall) */}
                    <div className="relative w-full h-[320px] md:h-full rounded-[24px] overflow-hidden group shadow-sm">
                        <Image
                            src="/Gallery/photo_1_2026-02-03_05-58-55.jpg"
                            alt="Warm minimalist living room"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* 2) Middle Column: Stacked Images */}
                    <div className="flex flex-col gap-4 md:gap-6 h-full">

                        {/* Top: Kitchen Detail */}
                        <div className="relative w-full h-[280px] md:h-1/2 rounded-[24px] overflow-hidden group shadow-sm">
                            <Image
                                src="/Gallery/photo_2_2026-02-03_05-58-55.jpg"
                                alt="Kitchen detail with coffee setup"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Bottom: Bathroom Spa Detail */}
                        <div className="relative w-full h-[280px] md:h-1/2 rounded-[24px] overflow-hidden group shadow-sm">
                            <Image
                                src="/Gallery/photo_3_2026-02-03_05-58-55.jpg"
                                alt="Bathroom spa details"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* 3) Far Right: Bedroom Corner (Tall) */}
                    <div className="relative w-full h-[320px] md:h-full rounded-[24px] overflow-hidden group shadow-sm">
                        <Image
                            src="/Gallery/photo_5_2026-02-03_05-58-55.jpg"
                            alt="Cozy bedroom corner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
