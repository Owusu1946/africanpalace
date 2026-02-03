import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_secret_key_change_me"
);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secret, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = await encrypt(parsed);
    (await cookies()).set({
        name: "session",
        value: res,
        httpOnly: true,
        expires: parsed.expires,
    });
}
