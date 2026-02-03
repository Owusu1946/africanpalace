"use client";

import React from "react";
import Image from "next/image";

/*
  NOTE: This component uses remote images from Unsplash.
  Ensure 'images.unsplash.com' is allowed in next.config.ts / next.config.js.
*/

const facilities = [
    {
        name: "Mini Bar",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1470&auto=format&fit=crop",
        size: "small",
    },
    {
        name: "Workspace",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop",
        size: "medium",
    },
    {
        name: "Jacuzzi Bathroom",
        image: "https://images.unsplash.com/photo-1560185007-cde43669a43e?q=80&w=1470&auto=format&fit=crop",
        size: "large",
    },
    {
        name: "Library Room",
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1470&auto=format&fit=crop",
        size: "medium",
    },
    {
        name: "Restaurant",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
        size: "small",
    },
];

export default function FacilitiesSection() {

    // Helper to determine dimensions based on size category
    const getCardClasses = (size: string) => {
        switch (size) {
            case "large":
                return "w-72 md:w-80 h-[400px] md:h-[480px] z-20 shadow-2xl"; // Center card: widest & tallest
            case "medium":
                return "w-60 md:w-68 h-[360px] md:h-[420px] opacity-90 hover:opacity-100 z-10"; // Mid cards
            case "small":
                return "w-48 md:w-56 h-[320px] md:h-[360px] opacity-80 hover:opacity-100 z-0"; // End cards
            default:
                return "w-60 h-80";
        }
    };

    // 3D Transform styles for desktop
    const getTransformStyle = (index: number) => {
        // Only apply on desktop (logic handled via media query in className usually, but for complex transforms inline is easier)
        // We will apply these as CSS variables or direct styles and use media queries to disable them on mobile if needed, 
        // but easiest here is to use the `md:` prefix logic with Tailwind arbitrary values is extremely verbose.
        // Instead we will return a style object that we conditionally apply or let CSS handle "md".
        // Since we are in JS, we can check window width or just apply it and rely on a 'md:transform-none' equivalent if were doing utility classes.
        // Actually, simpler: Use a style object for the transform, but wrap it in a media query CSS or just apply it always and override on mobile? 
        // No, standard inline styles apply always. We need 'md:' behavior. 
        // We can use a helper class for the desktop specific 3d stuff.

        // Let's use specific arbitrary classes for the 3D rotation on md+ screens.

        switch (index) {
            case 0: // Far Left
                return "md:[transform:perspective(1000px)_rotateY(18deg)_rotateZ(-2deg)] md:origin-right";
            case 1: // Mid Left
                return "md:[transform:perspective(1000px)_rotateY(10deg)_rotateZ(-1deg)] md:origin-right";
            case 2: // Center
                return "md:[transform:perspective(1000px)_rotateY(0deg)_translateZ(20px)] z-30 scale-105";
            case 3: // Mid Right
                return "md:[transform:perspective(1000px)_rotateY(-10deg)_rotateZ(1deg)] md:origin-left";
            case 4: // Far Right
                return "md:[transform:perspective(1000px)_rotateY(-18deg)_rotateZ(2deg)] md:origin-left";
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
                            Experience the ultimate in comfort and style by choosing the <br className="hidden lg:block" />
                            perfect room tailored to your needs.
                        </p>
                    </div>

                    {/* Right Heading */}
                    <div className="text-center md:text-right max-w-lg">
                        <h2 className="text-black text-3xl md:text-5xl font-medium tracking-tight leading-[1.2] md:leading-[1.1]">
                            Premier Facilities and <br />
                            Guest Services
                        </h2>
                    </div>
                </div>

                {/* === Cards Poster Row === */}
                <div
                    className="
            flex flex-row items-center gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-12 px-2 md:px-0 md:justify-center 
            snap-x snap-mandatory -mx-6 md:mx-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            md:[perspective:2000px] md:[transform-style:preserve-3d]
          "
                >
                    {facilities.map((facility, idx) => (
                        <div
                            key={idx}
                            className={`
                relative flex-shrink-0 transition-all duration-500 ease-out rounded-[24px] md:rounded-[32px] overflow-hidden group snap-center
                border border-gray-100 bg-white
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
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                            {/* Label */}
                            <div className="absolute bottom-6 w-full text-center z-10">
                                <span className="text-white text-base md:text-lg font-medium tracking-wide drop-shadow-md">
                                    {facility.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* === Bottom Button === */}
                <div className="flex justify-center">
                    <button
                        className="px-8 py-3 rounded-full border border-gray-300 text-black font-medium text-sm hover:bg-gray-50 transition-colors"
                        aria-label="See all facilities"
                    >
                        See All
                    </button>
                </div>

            </div>
        </section>
    );
}
