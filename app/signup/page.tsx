"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { requestOTP, verifyAndSignup, resendOTP } from "@/app/actions/auth";

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [step, setStep] = useState<"form" | "verification">("form");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsLoading(true);
        setError("");

        try {
            const result = await requestOTP({ name, email, password });
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else {
                setStep("verification");
                setIsLoading(false);
                setResendCooldown(60);
            }
        } catch (err) {
            setError("Failed to send verification code. Please try again.");
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length < 6) {
            setError("Please enter the full 6-digit code");
            return;
        }
        setIsLoading(true);
        setError("");

        try {
            const result = await verifyAndSignup(email, otpString);
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result?.success) {
                localStorage.setItem("user", JSON.stringify(result.user));
                window.dispatchEvent(new Event("storage_user_change"));
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            setError("Verification failed. Please try again.");
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;
        setIsLoading(true);
        setError("");
        try {
            const result = await resendOTP(email);
            if (result?.error) {
                setError(result.error);
            } else {
                setResendCooldown(60);
                setError("");
            }
        } catch (err) {
            setError("Failed to resend code");
        }
        setIsLoading(false);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="w-full max-w-md space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">
                    {step === "form" ? "Create Account" : "Verify Email"}
                </h1>
                <p className="text-gray-500">
                    {step === "form" ? "Start your premium journey with us." : "Secure your heritage with the code sent to your inbox."}
                </p>
            </div>

            {step === "form" ? (
                <form onSubmit={handleRequestOTP} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                                Full Name
                            </label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                            />
                        </div>

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

                        <div className="space-y-2 group relative">
                            <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold group-focus-within:text-black transition-colors">
                                Confirm Password
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
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            By creating an account, you agree to our
                            <button type="button" className="text-black font-bold mx-1 hover:underline underline-offset-2">Terms</button>
                            and
                            <button type="button" className="text-black font-bold mx-1 hover:underline underline-offset-2">Privacy Policy</button>.
                        </p>
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full py-5 rounded-full bg-black text-white font-bold tracking-widest uppercase text-sm transition-all hover:bg-black/90 active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Sending Code...</span>
                            </>
                        ) : (
                            "Continue to Verification"
                        )}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerify} className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { otpRefs.current[i] = el; }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-16 md:w-16 md:h-20 bg-gray-50 border-b-2 border-gray-200 text-center text-3xl font-serif text-black focus:outline-none focus:border-black transition-all rounded-t-lg"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <p className="text-sm text-gray-500 text-center">
                            Didn't receive the code?{" "}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || isLoading}
                                className={`font-bold transition-opacity ${resendCooldown > 0 ? "text-gray-300" : "text-black hover:opacity-60"}`}
                            >
                                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                            </button>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full py-5 rounded-full bg-black text-white font-bold tracking-widest uppercase text-sm transition-all hover:bg-black/90 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Verify & Join"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep("form")}
                            className="w-full text-center text-gray-400 text-sm font-medium hover:text-black transition-colors"
                        >
                            Back to Signup
                        </button>
                    </div>
                </form>
            )}

            <div className="text-center pt-8 border-t border-gray-100">
                <p className="text-gray-500 text-sm">
                    Already a member?{" "}
                    <Link href={`/login${callbackUrl !== '/' ? `?callbackUrl=${callbackUrl}` : ''}`} className="text-black font-bold hover:underline decoration-2 underline-offset-4">
                        Sign In here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <main className="relative min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Left Side: Cinematic Visual */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/Gallery/photo_4_2026-02-03_05-59-19.jpg"
                    alt="African Palace Ambience"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
                    <div className="space-y-6">
                        <span className="text-white/60 text-xs tracking-[0.5em] uppercase font-bold">
                            Join the Heritage
                        </span>
                        <h2 className="text-white text-6xl font-serif italic leading-tight">
                            Become a <br /> Member.
                        </h2>
                        <div className="w-12 h-1px bg-white/30 mx-auto" />
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                            Enjoy exclusive benefits, preferred booking rates, and personalized services tailored to your taste.
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

            {/* Right Side: Signup Form / Verification */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white relative">
                {/* Mobile Brand Link */}
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex flex-col items-start">
                        <span className="text-black text-lg font-serif tracking-[0.2em] uppercase">African Palace</span>
                    </Link>
                </div>

                <Suspense fallback={<div>Loading residency...</div>}>
                    <SignupForm />
                </Suspense>
            </div>
        </main>
    );
}
