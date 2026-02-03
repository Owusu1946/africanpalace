import React from "react";
import Image from "next/image";

/* 
  NOTE: This component uses remote images from Unsplash.
  Ensure 'images.unsplash.com' is added to your next.config.js / next.config.ts 
  under images.remotePatterns for these images to load correctly.
*/

const rooms = [
    {
        name: "Deluxe Room",
        image: "/Rooms/deluxe.jpg",
    },
    {
        name: "Super Deluxe Room",
        image: "/Rooms/super-deluxe.jpg",
    },
];

export default function RoomsAndAvailabilitySection() {
    // Calendar Data Generation for March 2024
    // March 1, 2024 is a Friday. 
    // 31 Days total.
    // Visual grid: Mon, Tue, Wed, Thu, Fri, Sat, Sun

    const daysInMonth = 31;
    const startingDayIndex = 4; // Friday is 5th day, index 4 (0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri)

    // Create array for the calendar grid
    // We need empty slots for Mon-Thu before the 1st
    const calendarGrid = [];

    // Fill empty slots
    for (let i = 0; i < startingDayIndex; i++) {
        calendarGrid.push(null);
    }

    // Fill days 1-31
    for (let i = 1; i <= daysInMonth; i++) {
        calendarGrid.push(i);
    }

    // Helper for calendar styling
    const getDayStyle = (day: number | null) => {
        if (!day) return "invisible"; // Spacer

        // Highlight logic based on screenshot
        if (day === 10) return "bg-red-100 text-red-500 font-medium";
        if (day === 22 || day === 23) return "bg-green-100 text-green-600 font-medium";

        // Default active day style
        return "bg-gray-50 text-gray-600 hover:bg-gray-100";
    };

    return (
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 font-sans">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-24">

                {/* === Left Column === */}
                <div className="flex flex-col space-y-10 md:space-y-12 order-2 lg:order-1">

                    {/* Room Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {rooms.map((room, idx) => (
                            <div
                                key={idx}
                                className="relative aspect-[4/3] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm"
                            >
                                <Image
                                    src={room.image}
                                    alt={room.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Detail Pill */}
                                <div className="absolute top-4 left-4 border border-white/50 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                                    Detail
                                </div>

                                {/* Gradient Overlay & Name */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                    <span className="text-white font-medium text-sm md:text-base">
                                        {room.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Headline & Content Area */}
                    <div className="relative">
                        <div className="flex flex-col gap-4 md:gap-6 max-w-lg">
                            <h2 className="text-black text-3xl md:text-5xl font-medium leading-[1.2] md:leading-tight tracking-tight text-center lg:text-left">
                                Choose the Best Room <br />
                                for Your Perfect Stay!
                            </h2>

                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
                                Experience the ultimate in comfort and style by choosing <br className="hidden md:block" />
                                the perfect room tailored to your needs.
                            </p>

                            {/* Booking Button */}
                            <div className="flex justify-center lg:justify-start">
                                <button
                                    className="group w-fit flex items-center justify-between gap-6 border border-gray-300 rounded-full pl-6 pr-2 py-2 mt-2 md:mt-4 hover:border-black transition-colors"
                                    aria-label="Book a room now"
                                >
                                    <span className="text-black font-medium text-sm">Booking</span>
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7" />
                                            <polyline points="7 7 17 7 17 17" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Navigation Chevrons (Absolute positioned to right of headline) */}
                        <div className="absolute top-2 right-0 hidden lg:flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors" aria-label="Previous">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors" aria-label="Next">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* === Right Column: Calendar === */}
                <div className="flex flex-col items-center lg:items-end space-y-8 order-1 lg:order-2">
                    {/* Section Title */}
                    <h3 className="text-black text-2xl md:text-3xl text-center lg:text-right font-medium leading-snug tracking-tight">
                        Check Your Availability Room <br className="hidden md:block" />
                        On This Calendar
                    </h3>

                    {/* Calendar Card */}
                    <div className="w-full max-w-sm bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">

                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-8">
                            <button className="text-gray-400 hover:text-black" aria-label="Previous Month">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <span className="text-black font-semibold text-base md:text-lg">February 2026</span>
                            <button className="text-gray-400 hover:text-black" aria-label="Next Month">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 mb-4 text-center">
                            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                                <span key={i} className="text-gray-400 text-xs font-medium uppercase">{day}</span>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-2 gap-x-1 justify-items-center">
                            {calendarGrid.map((day, index) => (
                                <div
                                    key={index}
                                    className={`
                       w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xs md:text-sm cursor-pointer transition-colors
                       ${getDayStyle(day)}
                     `}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
