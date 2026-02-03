"use server";

import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function createBooking(data: {
    roomId: number;
    roomName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    paymentMethod: string;
    message?: string;
}) {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return { error: "Not authenticated" };

        const payload = await decrypt(sessionCookie);
        const user = 'user' in payload ? payload.user : payload;
        if (!user || !('email' in user)) return { error: "Invalid session" };

        const client = await clientPromise;
        const db = client.db("seyramz");
        const bookingsCollection = db.collection("bookings");

        const booking = {
            userId: user.id || user._id,
            userEmail: user.email,
            userName: user.name,
            ...data,
            status: "confirmed",
            createdAt: new Date(),
        };

        const result = await bookingsCollection.insertOne(booking);

        // Send Confirmation Email
        try {
            await sendBookingConfirmationEmail(user.email, {
                userName: user.name,
                roomName: data.roomName,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                guests: data.guests,
                totalPrice: data.totalPrice,
                bookingId: result.insertedId.toString()
            });
        } catch (emailError) {
            console.error("Failed to send booking confirmation email:", emailError);
            // We don't block the success response if email fails
        }

        return { success: true, bookingId: result.insertedId.toString() };
    } catch (error) {
        console.error("Create booking error:", error);
        return { error: "Failed to create booking" };
    }
}

export async function getUserBookings() {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return [];

        const payload = await decrypt(sessionCookie);
        const user = 'user' in payload ? payload.user : payload;
        if (!user || !('email' in user)) return [];

        const client = await clientPromise;
        const db = client.db("seyramz");
        const bookingsCollection = db.collection("bookings");

        const bookings = await bookingsCollection
            .find({ userEmail: user.email })
            .sort({ createdAt: -1 })
            .toArray();

        return JSON.parse(JSON.stringify(bookings));
    } catch (error) {
        console.error("Get user bookings error:", error);
        return [];
    }
}
