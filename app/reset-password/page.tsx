"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/auth";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!token || !email) {
            setError("Invalid reset link. Please request a new one.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await resetPassword({ email, token, password });
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else {
                setIsSuccess(true);
                setIsLoading(false);
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-12">
            {!isSuccess ? (
                <>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">New Password</h1>
                        <p className="text-gray-500">Choose a secure password for your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Password Field */}
                            <div className="space-y-2 group relative">
                                <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                                    New Password
                                </label>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b border-gray-200 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 bottom-3 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    )}
                                </button>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2 group relative">
                                <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                                    Confirm New Password
                                </label>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b border-gray-200 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-0 bottom-3 text-gray-400 hover:text-black transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    )}
                                </button>
                            </div>
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
                                    <span>Updating...</span>
                                </>
                            ) : (
                                "Reset Password"
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
                        <h1 className="text-4xl font-serif text-black leading-tight">Password Updated</h1>
                        <p className="text-gray-500">Your password has been reset successfully. You will be redirected to the login page shortly.</p>
                    </div>
                    <div className="pt-8">
                        <Link
                            href="/login"
                            className="text-black font-bold hover:underline decoration-2 underline-offset-4 tracking-widest uppercase text-sm"
                        >
                            Back to Login Now
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="relative min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Cinematic Visual */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/Gallery/photo_11_2026-02-03_05-59-57.jpg"
                    alt="African Palace Exterior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="space-y-6">
                        <span className="text-white/60 text-xs tracking-[0.5em] uppercase font-bold">
                            Secure Return
                        </span>
                        <h2 className="text-white text-6xl font-serif italic leading-tight">
                            A Fresh <br />
                            Begining.
                        </h2>
                        <div className="w-12 h-1px bg-white/30 mx-auto" />
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                            Upgrade your security and get back to exploring the finer details of The Palace.
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

                <Suspense fallback={<div className="text-gray-400">Loading reset session...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </main>
    );
}
