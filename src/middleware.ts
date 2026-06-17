import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/study", "/profile", "/settings"];

// Routes that are only accessible when logged out
const authRoutes = ["/login", "/register", "/forgot-password"];

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login
  if (
    !session &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all protected and auth routes
    "/dashboard/:path*",
    "/study/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
