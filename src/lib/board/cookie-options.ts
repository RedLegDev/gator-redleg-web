export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;

function isProdHost(hostname: string): boolean {
  return (
    hostname === "gatorredleg.org" ||
    hostname.endsWith(".gatorredleg.org")
  );
}

/** Session cookie options shared by verify + logout. */
export function boardSessionCookieOptions(request: Request) {
  const url = new URL(request.url);
  return {
    httpOnly: true as const,
    secure: url.protocol === "https:",
    sameSite: "lax" as const,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    ...(isProdHost(url.hostname) ? { domain: ".gatorredleg.org" } : {}),
  };
}

export function clearBoardSessionCookieOptions(request: Request) {
  const url = new URL(request.url);
  return {
    httpOnly: true as const,
    secure: url.protocol === "https:",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
    ...(isProdHost(url.hostname) ? { domain: ".gatorredleg.org" } : {}),
  };
}
