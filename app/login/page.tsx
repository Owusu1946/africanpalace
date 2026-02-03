"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const formData = { email, password };
            const result = await login(formData);

            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result?.success) {
                // For immediate client-side updates (Header)
                localStorage.setItem("user", JSON.stringify(result.user));
                window.dispatchEvent(new Event("storage_user_change"));

                router.push(callbackUrl);
                router.refresh(); // Ensure server components re-render with session
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">Sign In</h1>
                <p className="text-gray-500">Access your private bookings and preferences.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-6">
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="space-y-2 group relative">
                        <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                            Password
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
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-shake">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                        <span className="text-sm text-gray-500 group-hover:text-black transition-colors">Keep me signed in</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-black hover:opacity-60 transition-opacity">
                        Forgot Password?
                    </Link>
                </div>

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
                            <span>Signing In...</span>
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>

            <div className="text-center pt-8 border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                    New to the Palace?{" "}
                    <Link href={`/signup${callbackUrl !== '/' ? `?callbackUrl=${callbackUrl}` : ''}`} className="text-black font-bold hover:underline decoration-2 underline-offset-4">
                        Join as Member
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="relative min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Cinematic Visual */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/Gallery/photo_3_2026-02-03_05-58-55.jpg"
                    alt="African Palace Interior"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="space-y-6">
                        <span className="text-white/60 text-xs tracking-[0.5em] uppercase font-bold">
                            Welcome Back
                        </span>
                        <h2 className="text-white text-6xl font-serif italic leading-tight">
                            Return to <br />
                            Your Palace.
                        </h2>
                        <div className="w-12 h-1px bg-white/30 mx-auto" />
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                            Experience the seamless blend of Tamale's heritage and modern luxury once again.
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

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
                {/* Mobile Brand Link */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex flex-col items-start">
                        <span className="text-black text-lg font-serif tracking-[0.2em] uppercase">African Palace</span>
                    </Link>
                </div>

                <Suspense fallback={<div>Loading access...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
