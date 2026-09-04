import {
  generateOtpCode,
  hashOtp,
  OTP_TTL_SECONDS,
} from "@/lib/board/auth";
import {
  canMemberLogin,
  countRecentLoginRequests,
  insertLoginToken,
  invalidateOpenLoginTokens,
} from "@/lib/board/db";
import { BOARD_EMAIL_FROM, buildOtpEmail } from "@/lib/board/email";
import { secret, getDb } from "@/lib/board/secrets";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

const LOGIN_RATE_LIMIT = 3;
const LOGIN_RATE_WINDOW_SEC = 15 * 60;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string };
  const email = String(body.email ?? "").trim().toLowerCase();
  // Always-ok response — do not reveal whether the email is on the roster.
  const ok = Response.json({ ok: true });
  if (!email) return ok;

  if (!secret("BOARD_SESSION_SECRET")) return ok;

  const db = getDb();
  const allowed = await canMemberLogin(db, email, {
    allowlist: secret("BOARD_ALLOWLIST"),
    presidentAllowlist: secret("BOARD_PRESIDENT_ALLOWLIST"),
  });
  if (!allowed) return ok;

  const now = Math.floor(Date.now() / 1000);
  const recent = await countRecentLoginRequests(
    db,
    email,
    now - LOGIN_RATE_WINDOW_SEC
  );
  if (recent >= LOGIN_RATE_LIMIT) return ok;

  const code = generateOtpCode();
  await invalidateOpenLoginTokens(db, email, now);
  await insertLoginToken(
    db,
    await hashOtp(email, code),
    email,
    now + OTP_TTL_SECONDS,
    now
  );

  const mail = buildOtpEmail(code);
  const { env } = getCloudflareContext();
  await env.SEND_EMAIL.send({
    from: BOARD_EMAIL_FROM,
    to: email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });

  return ok;
}
