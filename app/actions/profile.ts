"use server";

import clientPromise from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/lib/auth";

export async function uploadAvatar(base64Image: string) {
    try {
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: "african_palace_avatars",
            transformation: [
                { width: 400, height: 400, crop: "fill", gravity: "face" },
                { quality: "auto", fetch_format: "auto" }
            ]
        });

        return { url: uploadResponse.secure_url };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return { error: "Failed to upload image" };
    }
}

export async function updateProfile(data: { name?: string; avatar?: string }) {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) {
            console.error("No session cookie found");
            return { error: "Not authenticated" };
        }

        const payload = await decrypt(sessionCookie);
        console.log("Decrypted payload:", payload);

        // Handle nested user object in payload
        if (!payload || typeof payload !== 'object') {
            console.error("Invalid payload structure:", payload);
            return { error: "Invalid session" };
        }

        // Extract user from payload (it's nested)
        const user = 'user' in payload ? payload.user : payload;
        if (!user || typeof user !== 'object' || !('email' in user)) {
            console.error("Invalid user structure:", user);
            return { error: "Invalid session" };
        }

        const client = await clientPromise;
        const db = client.db("seyramz");
        const usersCollection = db.collection("users");

        const updateData: any = {};
        if (data.name) updateData.name = data.name;
        if (data.avatar) updateData.avatar = data.avatar;

        const result = await usersCollection.updateOne(
            { email: user.email },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return { error: "User not found" };
        }

        // Refresh Session Cookie with new data
        const updatedUser = await usersCollection.findOne({ email: user.email });
        if (updatedUser) {
            const newPayload = {
                user: {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    email: updatedUser.email,
                    avatar: updatedUser.avatar,
                },
                expires: payload.expires,
            };
            const newSession = await encrypt(newPayload);
            (await cookies()).set("session", newSession, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
            });

            return {
                success: true,
                user: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    avatar: updatedUser.avatar
                }
            };
        }

        return { error: "Failed to update profile" };
    } catch (error) {
        console.error("Profile update error:", error);
        return { error: "An error occurred while updating profile" };
    }
}

export async function toggleFavorite(roomId: number) {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return { error: "Not authenticated" };

        const payload = await decrypt(sessionCookie);
        const user = 'user' in payload ? payload.user : payload;
        if (!user || !('email' in user)) return { error: "Invalid session" };

        const client = await clientPromise;
        const db = client.db("seyramz");
        const usersCollection = db.collection("users");

        const userData = await usersCollection.findOne({ email: user.email });
        if (!userData) return { error: "User not found" };

        const favorites = userData.favorites || [];
        const isFavorited = favorites.includes(roomId);

        if (isFavorited) {
            await usersCollection.updateOne(
                { email: user.email },
                { $pull: { favorites: roomId } } as any
            );
            return { success: true, action: "removed" };
        } else {
            await usersCollection.updateOne(
                { email: user.email },
                { $addToSet: { favorites: roomId } } as any
            );
            return { success: true, action: "added" };
        }
    } catch (error) {
        console.error("Toggle favorite error:", error);
        return { error: "Failed to toggle favorite" };
    }
}

export async function getFavorites() {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return [];

        const payload = await decrypt(sessionCookie);
        const user = 'user' in payload ? payload.user : payload;
        if (!user || !('email' in user)) return [];

        const client = await clientPromise;
        const db = client.db("seyramz");
        const usersCollection = db.collection("users");

        const userData = await usersCollection.findOne({ email: user.email });
        return userData?.favorites || [];
    } catch (error) {
        console.error("Get favorites error:", error);
        return [];
    }
}
