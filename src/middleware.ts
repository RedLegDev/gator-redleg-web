import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Recovery for browsers that cached the broken permanent 308 from the
 * apex→www catch-all (destination was the literal string "/:path*").
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/:path*") {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
