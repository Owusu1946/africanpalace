"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await requestPasswordReset(email);
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else {
                setIsSent(true);
                setIsLoading(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Cinematic Visual */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/Gallery/photo_1_2026-02-03_05-58-55.jpg"
                    alt="African Palace Interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="space-y-6">
                        <span className="text-white/60 text-xs tracking-[0.5em] uppercase font-bold">
                            Security First
                        </span>
                        <h2 className="text-white text-6xl font-serif italic leading-tight">
                            Restore Your <br />
                            Access.
                        </h2>
                        <div className="w-12 h-1px bg-white/30 mx-auto" />
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                            Don't worry, your heritage is safe. We'll help you get back to your palace in no time.
                        </p>
                    </div>
                </div>
                {/* Brand Logo floating */}
                <div className="absolute top-12 left-12">
                    <Link href="/" className="flex flex-col items-start group">
                        <span className="text-white text-xl font-serif tracking-[0.2em] uppercase">African Palace</span>
                        <span className="text-white/50 text-[8px] tracking-widest uppercase mt-1">tamale's best stay</span>
                    </Link>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
                {/* Mobile Brand Link */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex flex-col items-start">
                        <span className="text-black text-lg font-serif tracking-[0.2em] uppercase">African Palace</span>
                    </Link>
                </div>

                <div className="w-full max-w-md space-y-12">
                    {!isSent ? (
                        <>
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">Forgot Password?</h1>
                                <p className="text-gray-500">Enter your email and we'll send you a link to reset your password.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                                        Email Address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-transparent border-b border-gray-200 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                        <p className="text-red-700 text-sm">{error}</p>
                                    </div>
                                )}

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className={`
                                        w-full py-5 rounded-full bg-black text-white font-bold tracking-widest uppercase text-sm
                                        transition-all hover:bg-black/90 active:scale-[0.98] flex items-center justify-center gap-3
                                        ${isLoading ? "opacity-70 cursor-not-allowed" : "opacity-100"}
                                    `}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending Link...</span>
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="space-y-8 text-center">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif text-black leading-tight">Check Your Email</h1>
                                <p className="text-gray-500">
                                    We've sent a secure password reset link to <span className="text-black font-bold">{email}</span>.
                                    Please check your inbox and follow the instructions.
                                </p>
                            </div>
                            <div className="pt-8">
                                <Link
                                    href="/login"
                                    className="text-black font-bold hover:underline decoration-2 underline-offset-4 tracking-widest uppercase text-sm"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}

                    {!isSent && (
                        <div className="text-center pt-8 border-t border-gray-100">
                            <p className="text-gray-500 text-sm">
                                Remembered your password?{" "}
                                <Link href="/login" className="text-black font-bold hover:underline decoration-2 underline-offset-4">
                                    Sign In here
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
