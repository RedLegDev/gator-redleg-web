import {
  SESSION_COOKIE,
  hashToken,
  signSession,
} from "@/lib/board/auth";
import {
  canMemberLogin,
  consumeLoginToken,
  getActiveMemberByEmail,
  touchMemberLastSeen,
} from "@/lib/board/db";
import { getDb, secret } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;

export async function POST(request: Request) {
  const signingKey = secret("BOARD_SESSION_SECRET");
  if (!signingKey) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as { token?: string };
  const token = String(body.token ?? "").trim();
  if (!token) {
    return Response.json({ ok: false, error: "token required" }, { status: 400 });
  }

  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const email = await consumeLoginToken(db, await hashToken(token), now);
  if (!email) {
    return Response.json({ ok: false, error: "Invalid token" }, { status: 401 });
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
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=${cookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`
  );
  return response;
}
