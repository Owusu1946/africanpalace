"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toggleFavorite, getFavorites } from "@/app/actions/profile";
import { createBooking } from "@/app/actions/booking";
import { roomsData } from "@/lib/data";

export default function RoomsPage() {
    const [likedRooms, setLikedRooms] = useState<Set<number>>(new Set());
    const [selectedRoom, setSelectedRoom] = useState<typeof roomsData[0] | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);

    // Booking State
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
    const [bookingStep, setBookingStep] = useState<"input" | "payment" | "processing" | "success">("input");

    // Toast State
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

    React.useEffect(() => {
        const checkUser = async () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));

                // Load favorites from localStorage immediately
                const cachedFavs = localStorage.getItem("liked_rooms");
                if (cachedFavs) {
                    setLikedRooms(new Set(JSON.parse(cachedFavs)));
                }

                // Sync with server
                const serverFavs = await getFavorites();
                if (serverFavs && Array.isArray(serverFavs)) {
                    setLikedRooms(new Set(serverFavs));
                    localStorage.setItem("liked_rooms", JSON.stringify(serverFavs));
                }
            } else {
                setUser(null);
                setLikedRooms(new Set());
                localStorage.removeItem("liked_rooms");
            }
        };
        checkUser();
        window.addEventListener("storage_user_change", checkUser);
        return () => window.removeEventListener("storage_user_change", checkUser);
    }, []);

    const handleRoomClick = (room: typeof roomsData[0]) => {
        if (!user) {
            setShowAuthModal(true);
        } else {
            setSelectedRoom(room);
        }
    };

    const showToast = (msg: string) => {
        setToast({ message: msg, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };

    // Reset booking state when modal opens/closes
    const handleCloseModal = () => {
        setSelectedRoom(null);
        setBookingStep("input");
        setCheckIn("");
        setCheckOut("");
        setGuests(1);
        setMessage("");
        setPaymentMethod("card");
    };

    const toggleLike = async (e: React.MouseEvent, id: number, roomName: string) => {
        e.stopPropagation();
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        // Optimistic Update
        const isAdding = !likedRooms.has(id);
        const newSet = new Set(likedRooms);
        if (isAdding) {
            newSet.add(id);
            showToast(`Added ${roomName} to favorites`);
        } else {
            newSet.delete(id);
            showToast(`Removed ${roomName} from favorites`);
        }
        setLikedRooms(newSet);
        localStorage.setItem("liked_rooms", JSON.stringify(Array.from(newSet)));

        // Server Update
        const result = await toggleFavorite(id);
        if (result.error) {
            console.error("Favorite sync failed:", result.error);
            // Revert if failed (optional, but better for robustness)
            // For now let's just keep it for "instant" feel if we trust the network eventually
        }
    };

    // Calculate nights and total
    const nights = checkIn && checkOut
        ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
        : 0;

    const totalPrice = selectedRoom ? selectedRoom.price * (nights || 1) : 0; // Default to 1 night price if no dates

    const handleContinue = () => {
        setBookingStep("payment");
    };

    const handleConfirmAndPay = async () => {
        if (!selectedRoom || !user) return;

        setBookingStep("processing");

        const result = await createBooking({
            roomId: selectedRoom.id,
            roomName: selectedRoom.name,
            checkIn,
            checkOut,
            guests,
            totalPrice: totalPrice + 50, // Including service fee
            paymentMethod,
            message
        });

        if (result.success) {
            setBookingStep("success");
        } else {
            showToast(result.error || "Booking failed. Please try again.");
            setBookingStep("input");
        }
    };

    return (
        <main className="relative min-h-screen bg-[#fcfcfc] w-full overflow-x-hidden font-sans">
            <Header variant="dark" />

            {/* === Hero Area === */}
            <div className="pt-32 pb-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
                    <div className="space-y-4 text-center md:text-left">
                        <span className="text-black/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold">
                            Accommodations
                        </span>
                        <h1 className="text-4xl md:text-6xl font-medium text-black tracking-tight leading-none">
                            Our Luxury Rooms
                        </h1>
                    </div>
                </div>
            </div>

            {/* === Rooms Grid === */}
            <section className="pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {roomsData.map((room) => {
                        const isLiked = likedRooms.has(room.id);
                        return (
                            <div
                                key={room.id}
                                className="group cursor-pointer"
                                onClick={() => handleRoomClick(room)}
                            >
                                {/* Card Image Wrapper */}
                                <div className="relative aspect-[10/11] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Heart/Favorite Button */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <button
                                            onClick={(e) => toggleLike(e, room.id, room.name)}
                                            className={`
                                                w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300
                                                ${isLiked
                                                    ? "bg-red-500 border-red-500 text-white scale-110"
                                                    : "bg-black/5 border-white/20 text-white hover:bg-white hover:text-black hover:scale-105"
                                                }
                                            `}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill={isLiked ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className={`transition-transform duration-300 ${isLiked ? "scale-100" : "scale-100"}`}
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Badge */}
                                    {room.rating === 5.0 && (
                                        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                            <span className="text-[10px] font-bold text-black uppercase tracking-wider">Rare Find</span>
                                        </div>
                                    )}
                                </div>

                                {/* Card Info */}
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-black text-base">{room.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                            <span className="text-sm font-medium">{room.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm line-clamp-1 font-medium">{room.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-800 font-bold py-1">
                                        <span>{room.guests} Guests</span>
                                        <span className="text-gray-400">•</span>
                                        <span>{room.beds} Bed{room.beds > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="pt-1 flex items-baseline gap-1">
                                        <span className="text-black font-extrabold text-xl font-sans">GHC {room.price}</span>
                                        <span className="text-gray-800 text-sm font-semibold">night</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* === Booking Modal Overlay === */}
            {selectedRoom && (
                <div className="fixed inset-0 z-[150] flex items-end md:items-center justify-center pointer-events-none">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
                        onClick={handleCloseModal}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full md:w-auto md:max-w-4xl bg-white rounded-t-[32px] md:rounded-[32px] p-6 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300 shadow-2xl overflow-hidden min-h-[500px] flex items-center">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 z-[200] w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-black shadow-sm transition-all"
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="w-full">
                            {bookingStep === "processing" ? (
                                <div className="flex flex-col items-center justify-center space-y-8 py-20 animate-in fade-in zoom-in-95 duration-500 w-full">
                                    <div className="relative w-24 h-24">
                                        <div className="absolute inset-0 border-4 border-rose-100 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-semibold text-black italic tracking-tight">Confirming your stay...</h3>
                                        <p className="text-gray-500">Preparing your luxury experience at The African Palace</p>
                                    </div>
                                </div>
                            ) : bookingStep === "success" ? (
                                <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500 py-10 w-full">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-black">Reserved!</h3>
                                    <p className="text-gray-700 font-medium text-center max-w-xs">
                                        Your trip to Tamale is set. <br />
                                        We've sent a confirmation email to you.
                                    </p>
                                    <button
                                        onClick={handleCloseModal}
                                        className="mt-8 px-12 py-3 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-xl"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-8 w-full">
                                    {/* Left Content (Same for Input and Payment) */}
                                    <div className="w-full md:w-80 space-y-4 shrink-0">
                                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
                                            <Image
                                                src={selectedRoom.image}
                                                alt={selectedRoom.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-black">{selectedRoom.name}</h2>
                                            <div className="flex items-baseline gap-1 mt-1">
                                                <span className="text-2xl font-black text-black">GHC {selectedRoom.price}</span>
                                                <span className="text-gray-900 font-bold text-base">/ night</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedRoom.amenities.map(amenity => (
                                                <span key={amenity} className="text-[10px] uppercase font-bold tracking-widest bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 font-medium whitespace-nowrap">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Steps */}
                                    <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">

                                        {bookingStep === "input" ? (
                                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                                <div className="space-y-4">
                                                    <h3 className="font-bold text-2xl text-black tracking-tight">Reserve your stay</h3>

                                                    {/* Date Picker UI */}
                                                    <div className="grid grid-cols-2 border border-black/10 rounded-2xl overflow-hidden divide-x divide-black/10 bg-white">
                                                        <div className="p-4 hover:bg-gray-50 transition-colors relative">
                                                            <span className="block text-[10px] uppercase font-black text-gray-900 tracking-tighter">Check-in</span>
                                                            <input
                                                                type="date"
                                                                value={checkIn}
                                                                onChange={(e) => setCheckIn(e.target.value)}
                                                                className="w-full bg-transparent border-none p-0 text-base focus:ring-0 outline-none text-black mt-1 cursor-pointer font-bold"
                                                            />
                                                        </div>
                                                        <div className="p-4 hover:bg-gray-50 transition-colors relative">
                                                            <span className="block text-[10px] uppercase font-black text-gray-900 tracking-tighter">Check-out</span>
                                                            <input
                                                                type="date"
                                                                value={checkOut}
                                                                onChange={(e) => setCheckOut(e.target.value)}
                                                                className="w-full bg-transparent border-none p-0 text-base focus:ring-0 outline-none text-black mt-1 cursor-pointer font-bold"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Guests */}
                                                    <div className="border border-black/10 rounded-2xl p-4 flex items-center justify-between bg-white">
                                                        <div>
                                                            <span className="block text-[10px] uppercase font-black text-gray-900 tracking-tighter">Guests</span>
                                                            <span className="block text-base font-bold text-black">{guests} Guest{guests > 1 ? 's' : ''}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                                                className="w-10 h-10 rounded-full border-2 border-gray-200 text-black flex items-center justify-center hover:border-black transition-all active:scale-90"
                                                            >
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                            </button>
                                                            <button
                                                                onClick={() => setGuests(Math.min(selectedRoom.guests, guests + 1))}
                                                                className="w-10 h-10 rounded-full border-2 border-gray-200 text-black flex items-center justify-center hover:border-black transition-all active:scale-90"
                                                            >
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleContinue}
                                                    disabled={!checkIn || !checkOut}
                                                    className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-2xl hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed text-lg tracking-tight"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <button
                                                        onClick={() => setBookingStep("input")}
                                                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                                                    </button>
                                                    <h3 className="font-bold text-2xl text-black tracking-tight">Confirm and Pay</h3>
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Message to Host */}
                                                    <div>
                                                        <label className="block text-[10px] uppercase font-black text-gray-900 tracking-tighter mb-2">Message the Host</label>
                                                        <textarea
                                                            placeholder="Hi! We're excited to visit The African Palace..."
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            className="w-full min-h-[100px] bg-gray-50 border border-black/5 rounded-2xl p-4 text-black font-medium focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                                                        />
                                                    </div>

                                                    {/* Payment Selector */}
                                                    <div>
                                                        <label className="block text-[10px] uppercase font-black text-gray-900 tracking-tighter mb-2">Choose Payment Method</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <button
                                                                onClick={() => setPaymentMethod("card")}
                                                                className={`p-4 border-2 rounded-2xl text-left transition-all relative ${paymentMethod === 'card' ? 'border-black bg-black text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-black hover:border-gray-300'}`}
                                                            >
                                                                <div className="text-xs font-bold mb-1">Credit Card</div>
                                                                <div className="text-[10px] opacity-70">Visa / Mastercard</div>
                                                                {paymentMethod === 'card' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></div>}
                                                            </button>
                                                            <button
                                                                onClick={() => setPaymentMethod("momo")}
                                                                className={`p-4 border-2 rounded-2xl text-left transition-all relative ${paymentMethod === 'momo' ? 'border-black bg-black text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-black hover:border-gray-300'}`}
                                                            >
                                                                <div className="text-xs font-bold mb-1">Mobile Money</div>
                                                                <div className="text-[10px] opacity-70">MTN / Telecel</div>
                                                                {paymentMethod === 'momo' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400"></div>}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Detailed Pricing */}
                                                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-black/5">
                                                        <div className="flex justify-between text-black font-bold">
                                                            <span>GHC {selectedRoom.price} x {nights} nights</span>
                                                            <span>GHC {selectedRoom.price * nights}</span>
                                                        </div>
                                                        <div className="flex justify-between text-gray-600 font-semibold text-sm">
                                                            <span>Service Fee</span>
                                                            <span>GHC 50</span>
                                                        </div>
                                                        <div className="border-t border-black/10 pt-3 flex justify-between font-black text-black text-lg">
                                                            <span>Total</span>
                                                            <span>GHC {totalPrice + 50}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleConfirmAndPay}
                                                    className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all active:scale-95 text-xl tracking-tight"
                                                >
                                                    Confirm and Pay
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* === Auth Required Modal === */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                        onClick={() => setShowAuthModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300">
                        {/* Dramatic Visual Header */}
                        <div className="relative h-40 w-full">
                            <Image
                                src="/Gallery/photo_1_2026-02-03_05-58-55.jpg"
                                alt="Palace Access"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-xs tracking-[0.4em] uppercase font-bold border-b border-white/30 pb-2">
                                    Member Exclusive
                                </span>
                            </div>
                        </div>

                        <div className="p-8 space-y-8 text-center">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif text-black italic leading-tight">Authentic Experience.</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    To reserve your stay at The African Palace, please sign in or join our membership.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    href="/login?callbackUrl=/rooms"
                                    className="block w-full py-4 bg-black text-white rounded-full font-bold tracking-widest uppercase text-xs transition-all hover:bg-neutral-800 active:scale-95 shadow-lg"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup?callbackUrl=/rooms"
                                    className="block w-full py-4 bg-gray-50 text-black border border-gray-200 rounded-full font-bold tracking-widest uppercase text-xs transition-all hover:bg-white active:scale-95"
                                >
                                    Join as Member
                                </Link>
                            </div>

                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="text-gray-400 text-xs font-bold tracking-widest uppercase hover:text-black transition-colors"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* === Toast Notification === */}
            <div className={`
                fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-out
                ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
            `}>
                <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-2xl flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-sm font-medium tracking-wide">
                        {toast.message}
                    </span>
                </div>
            </div>

            <Footer />
        </main>
    );
}

