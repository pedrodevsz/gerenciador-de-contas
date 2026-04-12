import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.startsWith("/favicon.ico")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/user")) {
        const authCookie = req.cookies.get("auth")?.value;
        if (!authCookie) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("redirectTo", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*"],
};
