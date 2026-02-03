import React from "react";
import Image from "next/image";

// Reusable Dot & Label component
// anchorX/Y are percentages. labelOffset is fine-tuning for the text.
const OrbitItem = ({
    label,
    left,
    top,
    delay = "0"
}: {
    label: string;
    left: string;
    top: string;
    delay?: string;
}) => (
    <div
        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer flex items-center justify-center w-4 h-4 z-20"
        style={{ left, top }}
    >
        {/* The Dot (Centered) */}
        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-150 box-content border-2 border-transparent group-hover:border-white/20" />

        {/* The Label (Absolute to the left) */}
        <span
            className={`
        absolute right-full mr-5 text-white/90 text-sm font-light uppercase tracking-widest text-[11px] whitespace-nowrap
        opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1
      `}
        >
            {label}
        </span>
    </div>
);

export default function FeatureWheel() {
    return (
        <div className="relative w-[320px] h-[320px] flex items-center justify-center select-none">
            {/* Orbit Ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 z-10 pointer-events-none" />

            {/* Orbit Dots & Labels (Clock positions: 10, 9, 8) */}

            {/* 10 o'clock: Enchanting */}
            {/* x = 6.7%, y = 25% */}
            <OrbitItem label="Enchanting" left="6.7%" top="25%" />

            {/* 9 o'clock: Unique */}
            {/* x = 0%, y = 50% */}
            <OrbitItem label="Unique" left="0%" top="50%" />

            {/* 8 o'clock: Rejuvenate */}
            {/* x = 6.7%, y = 75% */}
            <OrbitItem label="Rejuvenate" left="6.7%" top="75%" />

            {/* Central Image Container */}
            <div className="relative w-[230px] h-[230px] rounded-full overflow-hidden border border-white/10 shadow-2xl z-0">
                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                <Image
                    src="/hero/featuredwheel.jpg"
                    alt="Luxury Hotel Room"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105 select-none"
                />
            </div>
        </div>
    );
}
