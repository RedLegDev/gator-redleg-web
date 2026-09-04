import { cookies } from "next/headers";
import { SESSION_COOKIE, hashToken, signSession } from "@/lib/board/auth";
import {
  boardSessionCookieOptions,
  SESSION_TTL_SECONDS,
} from "@/lib/board/cookie-options";
import {
  canMemberLogin,
  consumeLoginToken,
  getActiveMemberByEmail,
  touchMemberLastSeen,
} from "@/lib/board/db";
import { getDb, secret } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

async function readToken(request: Request): Promise<string> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as { token?: string };
    return String(body.token ?? "").trim();
  }
  const form = await request.formData().catch(() => null);
  return String(form?.get("token") ?? "").trim();
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("content-type") ?? "").includes("application/json");
}

function loginError(request: Request) {
  return Response.redirect(new URL("/board/login?error=1", request.url), 303);
}

export async function POST(request: Request) {
  const signingKey = secret("BOARD_SESSION_SECRET");
  if (!signingKey) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const token = await readToken(request);
  if (!token) {
    return wantsJson(request)
      ? Response.json({ ok: false, error: "token required" }, { status: 400 })
      : loginError(request);
  }

  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const email = await consumeLoginToken(db, await hashToken(token), now);
  if (!email) {
    return wantsJson(request)
      ? Response.json({ ok: false, error: "Invalid token" }, { status: 401 })
      : loginError(request);
  }

  const allowed = await canMemberLogin(db, email, {
    allowlist: secret("BOARD_ALLOWLIST"),
    presidentAllowlist: secret("BOARD_PRESIDENT_ALLOWLIST"),
  });
  if (!allowed) {
    return wantsJson(request)
      ? Response.json({ ok: false, error: "Forbidden" }, { status: 403 })
      : loginError(request);
  }

  const member = await getActiveMemberByEmail(db, email);
  if (!member) {
    return wantsJson(request)
      ? Response.json({ ok: false, error: "Forbidden" }, { status: 403 })
      : loginError(request);
  }
  await touchMemberLastSeen(db, member.id);

  const cookie = await signSession(email, now + SESSION_TTL_SECONDS, signingKey);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, cookie, boardSessionCookieOptions(request));

  if (wantsJson(request)) {
    return Response.json({ ok: true });
  }
  return Response.redirect(new URL("/board", request.url), 303);
}
