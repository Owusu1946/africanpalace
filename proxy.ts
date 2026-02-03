import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = ["/profile"];
// Routes that are only accessible to guests
const guestRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

export default async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isGuestRoute = guestRoutes.some(route => path.startsWith(route));

    const cookie = request.cookies.get("session")?.value;
    let session = null;

    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch (e) {
            // Invalid session
        }
    }

    // 1. Redirect to /login if the user is not authenticated and trying to access a protected route
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // 2. Redirect to / if the user is authenticated and trying to access a guest route
    if (isGuestRoute && session) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

// Optional: config can be used to filter routes
// However, proxy.ts usually runs on all routes unless configured
// To match middleware behavior:
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
