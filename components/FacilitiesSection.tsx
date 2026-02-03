"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/*
  NOTE: This component uses remote images from Unsplash.
  Ensure 'images.unsplash.com' is allowed in next.config.ts / next.config.js.
*/

const facilities = [
    {
        name: "Laundry Service",
        image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1471&auto=format&fit=crop",
        size: "small",
    },
    {
        name: "Fully Equipped Kitchen",
        image: "/facilities/kitchen.jpg",
        size: "medium",
    },
    {
        name: "Living Room",
        image: "/facilities/living-room.jpg",
        size: "medium",
    },
    {
        name: "Sports Court (Soccer & Volleyball)",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1593&auto=format&fit=crop",
        size: "large",
    },
    {
        name: "Dining Area",
        image: "/facilities/dining.jpg",
        size: "medium",
    },
    {
        name: "Study & Workspace",
        image: "/facilities/workspace.jpeg",
        size: "medium",
    },
    {
        name: "Basketball Hoop",
        image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1422&auto=format&fit=crop",
        size: "small",
    },
];

export default function FacilitiesSection() {

    // Helper to determine dimensions based on size category
    const getCardClasses = (size: string) => {
        switch (size) {
            case "large":
                return "w-72 md:w-80 h-[400px] md:h-[480px] z-20 shadow-2xl";
            case "medium":
                return "w-60 md:w-68 h-[360px] md:h-[420px] opacity-90 hover:opacity-100 z-10";
            case "small":
                return "w-48 md:w-56 h-[320px] md:h-[360px] opacity-80 hover:opacity-100 z-0";
            default:
                return "w-60 h-80";
        }
    };

    const getTransformStyle = (index: number) => {
        switch (index) {
            case 0: // Far Left
                return "md:[transform:rotateY(25deg)_rotateZ(-4deg)] md:origin-right";
            case 1: // Mid Left
                return "md:[transform:rotateY(15deg)_rotateZ(-2deg)] md:origin-right";
            case 2: // Inner Left
                return "md:[transform:rotateY(8deg)_rotateZ(-1deg)] md:origin-right";
            case 3: // Center
                return "md:[transform:translateZ(40px)] z-30 scale-110 shadow-2xl shadow-black/20";
            case 4: // Inner Right
                return "md:[transform:rotateY(-8deg)_rotateZ(1deg)] md:origin-left";
            case 5: // Mid Right
                return "md:[transform:rotateY(-15deg)_rotateZ(2deg)] md:origin-left";
            case 6: // Far Right
                return "md:[transform:rotateY(-25deg)_rotateZ(4deg)] md:origin-left";
            default:
                return "";
        }
    };

    return (
        <section className="w-full bg-white py-16 md:py-32 overflow-hidden font-sans">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative flex flex-col space-y-12 md:space-y-24">

                {/* === Header Row === */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-4">
                    {/* Left Text */}
                    <div className="max-w-sm pt-2 text-center md:text-left">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            Designed for total relaxation and active living. <br className="hidden lg:block" />
                            Everything you need for a perfect stay.
                        </p>
                    </div>

                    {/* Right Heading */}
                    <div className="text-center md:text-right max-w-lg">
                        <h2 className="text-black text-3xl md:text-5xl font-medium tracking-tight leading-[1.2] md:leading-[1.1]">
                            Unrivaled Facilities and <br />
                            Modern Amenities
                        </h2>
                    </div>
                </div>

                {/* === Cards Poster Row === */}
                <div
                    className="
            flex flex-row items-center gap-2 md:gap-4 overflow-x-auto pt-10 md:pt-20 pb-10 md:pb-20 px-2 md:px-0 md:justify-center 
            snap-x snap-mandatory -mx-6 md:mx-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            md:[perspective:2000px] md:[transform-style:preserve-3d]
          "
                >
                    {facilities.map((facility, idx) => (
                        <div
                            key={idx}
                            className={`
                relative flex-shrink-0 transition-all duration-700 ease-out rounded-[24px] md:rounded-[32px] overflow-hidden group snap-center
                border border-black/5 bg-white
                ${getCardClasses(facility.size)}
                ${getTransformStyle(idx)}
              `}
                        >
                            <Image
                                src={facility.image}
                                alt={facility.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />

                            {/* Label */}
                            <div className="absolute bottom-8 w-full px-4 text-center z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                                <span className="text-white text-base md:text-lg font-bold tracking-tight drop-shadow-lg">
                                    {facility.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* === Bottom Button === */}
                <div className="flex justify-center">
                    <Link
                        href="/facilities"
                        className="px-8 py-3 rounded-full border border-gray-300 text-black font-bold text-sm hover:bg-gray-50 transition-colors uppercase tracking-widest"
                        aria-label="See all facilities"
                    >
                        See All
                    </Link>
                </div>

            </div>
        </section>
    );
}
