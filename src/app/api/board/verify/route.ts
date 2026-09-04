import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  hashOtp,
  normalizeOtpCode,
  OTP_LENGTH,
  signSession,
} from "@/lib/board/auth";
import {
  boardSessionCookieOptions,
  SESSION_TTL_SECONDS,
} from "@/lib/board/cookie-options";
import {
  canMemberLogin,
  consumeLoginToken,
  countRecentOtpAttempts,
  getActiveMemberByEmail,
  invalidateOpenLoginTokens,
  recordOtpAttempt,
  touchMemberLastSeen,
} from "@/lib/board/db";
import { getDb, secret } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

const VERIFY_RATE_LIMIT = 8;
const VERIFY_RATE_WINDOW_SEC = 15 * 60;

export async function POST(request: Request) {
  const signingKey = secret("BOARD_SESSION_SECRET");
  if (!signingKey) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    code?: string;
  };
  const email = String(body.email ?? "").trim().toLowerCase();
  const code = normalizeOtpCode(String(body.code ?? ""));

  if (!email || code.length !== OTP_LENGTH) {
    return Response.json(
      { ok: false, error: "Email and 6-digit code required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const now = Math.floor(Date.now() / 1000);

  const attempts = await countRecentOtpAttempts(
    db,
    email,
    now - VERIFY_RATE_WINDOW_SEC
  );
  if (attempts >= VERIFY_RATE_LIMIT) {
    await invalidateOpenLoginTokens(db, email, now);
    return Response.json(
      { ok: false, error: "Too many attempts. Request a new code." },
      { status: 429 }
    );
  }

  const consumedEmail = await consumeLoginToken(
    db,
    await hashOtp(email, code),
    now
  );
  if (!consumedEmail || consumedEmail !== email) {
    await recordOtpAttempt(db, email, now);
    return Response.json(
      { ok: false, error: "Invalid or expired code" },
      { status: 401 }
    );
  }

  const allowed = await canMemberLogin(db, email, {
    allowlist: secret("BOARD_ALLOWLIST"),
    presidentAllowlist: secret("BOARD_PRESIDENT_ALLOWLIST"),
  });
  if (!allowed) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const member = await getActiveMemberByEmail(db, email);
  if (!member) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  await touchMemberLastSeen(db, member.id);

  const cookie = await signSession(email, now + SESSION_TTL_SECONDS, signingKey);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, cookie, boardSessionCookieOptions(request));

  return Response.json({ ok: true });
}
