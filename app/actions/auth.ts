"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { encrypt } from "@/lib/auth";

import { sendOTPEmail } from "@/lib/email";

export async function requestOTP(formData: any) {
    const { name, email, password } = formData;

    const client = await clientPromise;
    const db = client.db("seyramz");
    const usersCollection = db.collection("users");
    const otpsCollection = db.collection("otps");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return { error: "User already exists" };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Hash password before storing in OTP collection
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save OTP and user data for verification
    await otpsCollection.updateOne(
        { email },
        {
            $set: {
                otp,
                expires,
                userData: { name, email, password: hashedPassword }
            }
        },
        { upsert: true }
    );

    // Send Email
    try {
        await sendOTPEmail(email, otp, name);
        return { success: true };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { error: "Failed to send verification email. Please try again." };
    }
}

export async function resendOTP(email: string) {
    const client = await clientPromise;
    const db = client.db("seyramz");
    const otpsCollection = db.collection("otps");

    const otpData = await otpsCollection.findOne({ email });
    if (!otpData) return { error: "No pending verification found" };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await otpsCollection.updateOne(
        { email },
        { $set: { otp, expires } }
    );

    try {
        await sendOTPEmail(email, otp, otpData.userData.name);
        return { success: true };
    } catch (error) {
        return { error: "Failed to resend email" };
    }
}

export async function verifyAndSignup(email: string, otp: string) {
    const client = await clientPromise;
    const db = client.db("seyramz");
    const otpsCollection = db.collection("otps");
    const usersCollection = db.collection("users");

    const otpData = await otpsCollection.findOne({ email, otp });

    if (!otpData) {
        return { error: "Invalid verification code" };
    }

    if (new Date() > otpData.expires) {
        return { error: "Verification code has expired" };
    }

    const { userData } = otpData;

    // Create user
    const result = await usersCollection.insertOne({
        ...userData,
        avatar: "/Gallery/photo_1_2026-02-03_05-58-55.jpg",
        createdAt: new Date(),
    });

    // Delete OTP
    await otpsCollection.deleteOne({ email });

    // Create session
    const sessionExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
        user: {
            id: result.insertedId.toString(),
            name: userData.name,
            email: userData.email,
            avatar: "/Gallery/photo_1_2026-02-03_05-58-55.jpg"
        },
        expires: sessionExpires
    });

    (await cookies()).set("session", session, { expires: sessionExpires, httpOnly: true });

    return {
        success: true,
        user: {
            name: userData.name,
            email: userData.email,
            avatar: "/Gallery/photo_1_2026-02-03_05-58-55.jpg"
        }
    };
}

export async function login(formData: any) {
    const { email, password } = formData;

    const client = await clientPromise;
    const db = client.db("seyramz");
    const usersCollection = db.collection("users");

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) {
        return { error: "Invalid email or password" };
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return { error: "Invalid email or password" };
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar || "/Gallery/photo_1_2026-02-03_05-58-55.jpg"
        },
        expires
    });

    // Save session in cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });

    return {
        success: true,
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatar || "/Gallery/photo_1_2026-02-03_05-58-55.jpg"
        }
    };
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0) });
    return { success: true };
}

export async function getCurrentUser() {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const { decrypt } = await import("@/lib/auth");
        const payload = await decrypt(sessionCookie);
        return payload.user;
    } catch (e) {
        return null;
    }
}

export async function requestPasswordReset(email: string) {
    const client = await clientPromise;
    const db = client.db("seyramz");
    const usersCollection = db.collection("users");
    const resetsCollection = db.collection("password_resets");

    const user = await usersCollection.findOne({ email });
    if (!user) {
        return { error: "No account found with this email" };
    }

    // Generate a secure token
    const token = require("crypto").randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await resetsCollection.updateOne(
        { email },
        { $set: { token, expires } },
        { upsert: true }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${token}&email=${email}`;

    try {
        const { sendResetEmail } = await import("@/lib/email");
        await sendResetEmail(email, resetLink, user.name);
        return { success: true };
    } catch (error) {
        console.error("Reset email failed:", error);
        return { error: "Failed to send reset email" };
    }
}

export async function resetPassword(formData: any) {
    const { email, token, password } = formData;

    const client = await clientPromise;
    const db = client.db("seyramz");
    const resetsCollection = db.collection("password_resets");
    const usersCollection = db.collection("users");

    const resetData = await resetsCollection.findOne({ email, token });

    if (!resetData) {
        return { error: "Invalid or expired reset link" };
    }

    if (new Date() > resetData.expires) {
        return { error: "Reset link has expired" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await usersCollection.updateOne(
        { email },
        { $set: { password: hashedPassword } }
    );

    // Delete the reset token
    await resetsCollection.deleteOne({ email, token });

    return { success: true };
}
