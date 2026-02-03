"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen bg-white w-full overflow-x-hidden font-sans">
            <Header />

            {/* === Hero Section === */}
            <section className="relative w-full pt-44 pb-20 px-6 md:px-12 lg:px-20 bg-neutral-900 text-white">
                <div className="max-w-[1400px] mx-auto">
                    <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight mb-6">
                        Contact the <br />
                        African Palace
                    </h1>
                    <p className="text-white/60 text-sm md:text-lg max-w-xl leading-relaxed">
                        Whether you have a question about booking, local tips, or special requests,
                        we’re here to help make your Tamale stay exceptional.
                    </p>
                </div>
            </section>

            {/* === Grid Content === */}
            <section className="w-full py-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Contact Form */}
                    <div className="flex flex-col space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-medium text-black">Send us a Message</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Adamu Fuseini"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="adamu@example.com"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="How can we help you?"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                                />
                            </div>

                            <button className="group flex items-center justify-between gap-8 bg-black text-white rounded-full pl-8 pr-2 py-2 hover:bg-neutral-800 transition-all">
                                <span className="text-sm font-medium">Send Message</span>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-45">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                </div>
                            </button>
                        </form>
                    </div>

                    {/* Right: Info & Map Placeholder */}
                    <div className="flex flex-col space-y-12">

                        {/* Info Blocks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">Our Location</h3>
                                <p className="text-black text-sm leading-relaxed">
                                    Kpalsi Last Stop, <br />
                                    Cemetery Road, Near OLIS, <br />
                                    Tamale, Northern Region, 🇬🇭
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">Quick Contact</h3>
                                <p className="text-black text-sm leading-relaxed">
                                    <a href="tel:+233202223335" className="hover:text-gray-600 transition-colors">+233 20 222-3335</a> <br />
                                    stays@theafricanpalace.com
                                </p>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gray-100 rounded-[40px] overflow-hidden border border-gray-100 shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126135.29745585501!2d-0.9095692642142278!3d9.400785160533633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021495c0c992d9d%3A0xc66519131920844!2sTamale!5e0!3m2!1sen!2sgh!4v1710000000000!5m2!1sen!2sgh"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="The African Palace Location"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
