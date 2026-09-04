import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Recovery for browsers that cached the broken permanent 308 from the
 * apex→www catch-all (destination was the literal string "/:path*").
 *
 * If "/" itself still 308s in your browser, clear site data for
 * gatorredleg.org or use a private window — permanent redirects are
 * cached client-side and never revalidate against the origin.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/:path*") {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match the literal broken URL path. Next interprets :param in matchers,
     * so we escape via a regex that equals "/:path*".
     */
    "/:path(.*)",
  ],
};
