import React from "react";
import Image from "next/image";
import FeatureWheel from "./FeatureWheel";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[100svh] flex flex-col font-sans overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/hero/main.jpg"
                    alt="Dark Moody Hotel Lobby"
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-grow w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:grid lg:grid-cols-2 pointer-events-none pt-24 md:pt-32 lg:pt-0">

                {/* Left Column / Mobile Bottom: Headline */}
                <div className="flex flex-col flex-grow justify-center lg:justify-end pb-12 lg:pb-16 pointer-events-auto">
                    <h2 className="text-white font-medium text-4xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.1] lg:leading-[1.0] drop-shadow-2xl text-center lg:text-left transition-all duration-300">
                        <span className="block">Book Your</span>
                        <span className="block">Comfort Room</span>
                        <span className="block">Today!</span>
                    </h2>
                </div>

                {/* Right Column / Mobile Middle: Marketing Text & Feature Wheel */}
                <div className="flex flex-col items-center lg:items-end justify-between lg:h-full lg:pt-32 lg:pb-24 pointer-events-auto space-y-12 lg:space-y-0 pb-16 lg:pb-0">

                    {/* Marketing Text */}
                    <div className="max-w-md lg:max-w-xs text-center lg:text-right space-y-4 order-2 lg:order-1">
                        <p className="text-white/90 text-sm md:text-lg leading-relaxed font-light drop-shadow-md lg:pr-2">
                            Get Ready for an Adventure! Reserve <br className="hidden lg:block" />
                            Your Spot Now and Embark on Your <br className="hidden lg:block" />
                            Hobbit Journey!
                        </p>
                    </div>

                    {/* Feature Wheel */}
                    <div className="relative lg:mr-8 scale-75 md:scale-100 order-1 lg:order-2">
                        <FeatureWheel />
                    </div>
                </div>
            </div>
        </section>
    );
}
