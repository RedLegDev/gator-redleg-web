/**
 * OTP login codes and board session cookies.
 * WebCrypto only — runs on Cloudflare Workers.
 */

export const SESSION_COOKIE = "rl_board";
export const OTP_LENGTH = 6;
export const OTP_TTL_SECONDS = 15 * 60;

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Six-digit numeric code (000000–999999), crypto-random. */
export function generateOtpCode(): string {
  const buf = crypto.getRandomValues(new Uint32Array(1));
  const n = buf[0]! % 1_000_000;
  return String(n).padStart(OTP_LENGTH, "0");
}

export function normalizeOtpCode(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, OTP_LENGTH);
}

/** Bind code to email so hashes are not reusable across accounts. */
export function otpStorageKey(email: string, code: string): string {
  return `${email.trim().toLowerCase()}:${normalizeOtpCode(code)}`;
}

export async function hashToken(token: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(token)));
}

export async function hashOtp(email: string, code: string): Promise<string> {
  return hashToken(otpStorageKey(email, code));
}

export function parseAllowlist(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowed(email: string, allowlist: string[]): boolean {
  return allowlist.includes(email.trim().toLowerCase());
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(
  email: string,
  expSec: number,
  secret: string
): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ e: email, x: expSec })));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return `${payload}.${b64url(new Uint8Array(sig))}`;
}

export async function verifySession(
  value: string,
  secret: string,
  nowSec: number
): Promise<string | null> {
  const parts = value.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;

  const key = await hmacKey(secret);
  const expected = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  if (b64url(new Uint8Array(expected)) !== sig) return null;

  try {
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const parsed = JSON.parse(json) as { e?: unknown; x?: unknown };
    if (typeof parsed.e !== "string" || typeof parsed.x !== "number") {
      return null;
    }
    if (parsed.x <= nowSec) return null;
    return parsed.e;
  } catch {
    return null;
  }
}

export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
