"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const facilitiesCategories = [
    {
        title: "Culinary Excellence",
        description: "Modern spaces designed for gourmet preparation and elegant dining.",
        items: [
            {
                name: "Fully Equipped Kitchen",
                image: "/facilities/kitchen.jpg",
                description: "Complete with high-end appliances, island seating, and all necessary cookware for a home-away-from-home experience."
            },
            {
                name: "Dining Area",
                image: "/facilities/dining.jpg",
                description: "A spacious and sophisticated setting for family meals, featuring designer furniture and ambient lighting."
            }
        ]
    },
    {
        title: "Living & Leisure",
        description: "Relax in style within our meticulously designed common areas.",
        items: [
            {
                name: "Living Room",
                image: "/facilities/living-room.jpg",
                description: "An expansive lounge featuring plush seating, high-end entertainment systems, and a warm, inviting atmosphere."
            },
            {
                name: "Study & Workspace",
                image: "/facilities/workspace.jpeg",
                description: "A quiet, dedicated area for focused work or reading, equipped with high-speed internet and ergonomic seating."
            }
        ]
    },
    {
        title: "Active Recreation",
        description: "Stay active with our dedicated outdoor sports facilities.",
        items: [
            {
                name: "Sports Court",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1593&auto=format&fit=crop",
                description: "A professional-grade surface suitable for both Soccer and Volleyball matches."
            },
            {
                name: "Basketball Hoop",
                image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1422&auto=format&fit=crop",
                description: "Perfect for casual shootarounds or competitive games right on the property."
            }
        ]
    },
    {
        title: "Essential Convenience",
        description: "Thoughtful services to make your stay completely effortless.",
        items: [
            {
                name: "Laundry Service",
                image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1471&auto=format&fit=crop",
                description: "Professional cleaning and pressing services to keep you looking your best throughout your stay."
            }
        ]
    }
];

export default function FacilitiesPage() {
    return (
        <main className="relative min-h-screen bg-white w-full overflow-x-hidden font-sans">
            <Header variant="dark" />

            {/* === Cinematic Hero === */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gray-100 pb-16">
                    <div className="space-y-6 max-w-2xl">
                        <span className="text-black/40 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
                            World Class Amenities
                        </span>
                        <h1 className="text-black text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight italic">
                            Elevated <br />
                            Living.
                        </h1>
                        <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
                            Discover the meticulous attention to detail and premium facilities that define the African Palace experience.
                        </p>
                    </div>
                </div>
            </section>

            {/* === Categorized Facilities === */}
            <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-32">
                <div className="space-y-40">
                    {facilitiesCategories.map((category, idx) => (
                        <div key={idx} className="space-y-12">
                            {/* Category Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-black pl-8 py-2">
                                <div className="space-y-2">
                                    <h2 className="text-2xl md:text-4xl font-serif font-medium uppercase tracking-widest text-black">
                                        {category.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm md:text-base max-w-sm">
                                        {category.description}
                                    </p>
                                </div>
                                <span className="text-black/10 text-6xl md:text-8xl font-serif font-black italic">
                                    0{idx + 1}
                                </span>
                            </div>

                            {/* Items Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="group cursor-default">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>
                                        <div className="mt-8 space-y-4">
                                            <h3 className="text-xl md:text-2xl font-serif font-medium text-black group-hover:translate-x-2 transition-transform duration-500">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-prose">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* === Booking CTA === */}
            <section className="bg-black py-32 px-6">
                <div className="max-w-[800px] mx-auto text-center space-y-10">
                    <h2 className="text-white text-4xl md:text-6xl font-serif leading-tight">
                        Ready to experience <br />
                        it all in person?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            href="/rooms"
                            className="bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-white/90 transition-all text-sm md:text-base uppercase tracking-widest"
                        >
                            Explore Our Rooms
                        </Link>
                        <Link
                            href="/contact"
                            className="text-white border border-white/20 px-10 py-5 rounded-full hover:bg-white/10 transition-all text-sm md:text-base uppercase tracking-widest"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
