"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-white w-full overflow-x-hidden font-sans">
            <Header />

            {/* === Section 1: Hero === */}
            <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="/Gallery/photo_4_2026-02-03_05-58-55.jpg"
                    alt="The African Palace Interior"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                />

                <div className="relative z-20 text-center px-6 max-w-4xl">
                    <span className="text-white/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-6 block">
                        Our Heritage
                    </span>
                    <h1 className="text-4xl md:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-8">
                        The Story of <br />
                        The African Palace
                    </h1>
                </div>
            </section>

            {/* === Section 2: Our Story === */}
            <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-white">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-medium text-black tracking-tight leading-tight">
                            Redefining Luxury in <br />
                            the Heart of Tamale
                        </h2>
                        <div className="w-16 h-1 bg-black/10" />
                        <div className="space-y-6 text-gray-500 text-base md:text-lg leading-relaxed font-light">
                            <p>
                                Founded in 2024, The African Palace was born from a vision to create a sanctuary
                                that bridges the gap between traditional Northern hospitality and modern luxury.
                            </p>
                            <p>
                                What began as an ambitious architectural dream has evolved into Tamale's
                                most sought-after Airbnb experience. We believe that a stay should be more
                                than just a bed; it should be a cultural immersion wrapped in uncompromising comfort.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] rounded-[32px] overflow-hidden bg-gray-100 mt-12">
                            <img src="/Gallery/photo_1_2026-02-03_05-58-55.jpg" alt="Palace Detail" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-[3/4] rounded-[32px] overflow-hidden bg-gray-100">
                            <img src="/Gallery/photo_3_2026-02-03_05-58-55.jpg" alt="Luxury Interior" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* === Section 3: The Vision === */}
            <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-neutral-900 text-white rounded-[40px] md:rounded-[80px] my-10 mx-auto max-w-[1400px]">
                <div className="max-w-[1000px] mx-auto text-center space-y-12">
                    <h2 className="text-3xl md:text-6xl font-medium tracking-tight">The Vision for 2026</h2>
                    <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed">
                        "To be the gateway for refined travelers exploring the Sahel, providing a haven of
                        unrivaled tranquility and authentic African character."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                        <div className="space-y-4">
                            <div className="text-4xl font-serif text-white italic">01.</div>
                            <h4 className="text-lg font-medium">Authenticity</h4>
                            <p className="text-white/40 text-sm">Every detail honors the local craftsmanship and spirit of Tamale.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-4xl font-serif text-white italic">02.</div>
                            <h4 className="text-lg font-medium">Service</h4>
                            <p className="text-white/40 text-sm">Personalized hosting that anticipates every guest's needs.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="text-4xl font-serif text-white italic">03.</div>
                            <h4 className="text-lg font-medium">Comfort</h4>
                            <p className="text-white/40 text-sm">Blending high-end amenities with the warmth of a private home.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* === Section 4: Experience === */}
            <section className="w-full py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1200px] mx-auto text-center space-y-12">
                    <h2 className="text-black text-3xl md:text-5xl font-medium tracking-tight">Hosted with Passion</h2>
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-50 shadow-xl">
                        <img src="/Gallery/photo_9_2026-02-03_05-58-55.jpg" alt="The Host" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-gray-500 text-lg italic leading-relaxed">
                            "Welcome to the Palace. We've designed every inch of this home to ensure you feel
                            at peace the moment you step through our gates."
                        </p>
                        <h4 className="text-black font-semibold mt-6 tracking-widest uppercase text-sm">Seyram — Principal Host</h4>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
