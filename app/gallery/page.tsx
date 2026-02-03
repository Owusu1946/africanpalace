"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// All 26 images from public/Gallery
const galleryImages = [
    "/Gallery/photo_1_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_1_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_1_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_2_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_2_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_2_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_3_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_3_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_3_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_4_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_4_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_4_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_5_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_5_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_5_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_6_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_6_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_6_2026-02-03_05-59-19.jpg",
    "/Gallery/photo_7_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_7_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_8_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_8_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_9_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_9_2026-02-03_05-59-10.jpg",
    "/Gallery/photo_10_2026-02-03_05-58-55.jpg",
    "/Gallery/photo_10_2026-02-03_05-59-10.jpg"
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleNext = useCallback(() => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
    }, [selectedImage]);

    const handlePrev = useCallback(() => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.indexOf(selectedImage);
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[prevIndex]);
    }, [selectedImage]);

    const handleClose = useCallback(() => {
        setSelectedImage(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, handleNext, handlePrev, handleClose]);

    return (
        <main className="relative min-h-screen bg-white w-full overflow-x-hidden font-sans">
            <Header variant="dark" />

            {/* === Cinematic Header === */}
            <section className="pt-32 pb-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
                    <div className="space-y-4">
                        <span className="text-black/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold">
                            Visual Journey
                        </span>
                        <h1 className="text-4xl md:text-6xl font-medium text-black tracking-tight leading-none">
                            Signature Details
                        </h1>
                    </div>
                </div>
            </section>

            {/* === Gallery Grid (Masonry Style) === */}
            <section className="pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                    {galleryImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 mb-4 md:mb-6"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* === Lightbox Modal === */}
            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl pointer-events-auto transition-opacity duration-300"
                        onClick={handleClose}
                    />

                    {/* Image Container */}
                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] pointer-events-auto animate-in fade-in zoom-in-95 duration-500 flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Lightbox view"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                        />

                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all active:scale-90"
                            aria-label="Previous"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all active:scale-90"
                            aria-label="Next"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute -top-12 right-0 md:-top-16 md:-right-12 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all active:scale-95 shadow-lg"
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>

                        {/* Counter */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest uppercase">
                            {galleryImages.indexOf(selectedImage) + 1} / {galleryImages.length}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
