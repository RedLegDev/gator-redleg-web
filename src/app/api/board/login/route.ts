import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  generateLoginToken,
  hashToken,
  isAllowed,
  parseAllowlist,
} from "@/lib/board/auth";
import { countRecentLoginRequests, insertLoginToken } from "@/lib/board/db";
import { BOARD_EMAIL_FROM, buildMagicLinkEmail } from "@/lib/board/email";
import { secret, getDb } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

const TOKEN_TTL_SECONDS = 15 * 60;
const LOGIN_RATE_LIMIT = 3;
const LOGIN_RATE_WINDOW_SEC = 15 * 60;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string };
  const email = String(body.email ?? "").trim().toLowerCase();
  const ok = Response.json({ ok: true });
  if (!email) return ok;

  if (!secret("BOARD_SESSION_SECRET")) return ok;

  const allowlist = parseAllowlist(secret("BOARD_ALLOWLIST"));
  if (!isAllowed(email, allowlist)) return ok;

  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const recent = await countRecentLoginRequests(
    db,
    email,
    now - LOGIN_RATE_WINDOW_SEC
  );
  if (recent >= LOGIN_RATE_LIMIT) return ok;

  const { env } = getCloudflareContext();
  const token = generateLoginToken();
  await insertLoginToken(
    db,
    await hashToken(token),
    email,
    now + TOKEN_TTL_SECONDS,
    now
  );

  const origin = new URL(request.url).origin;
  const baseUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ? origin
    : "https://www.gatorredleg.org";
  const link = `${baseUrl}/board/verify?token=${encodeURIComponent(token)}`;
  const mail = buildMagicLinkEmail(link);

  await env.SEND_EMAIL.send({
    from: BOARD_EMAIL_FROM,
    to: email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });

  return ok;
}
