import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/board/auth";
import { clearBoardSessionCookieOptions } from "@/lib/board/cookie-options";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", clearBoardSessionCookieOptions(request));
  return Response.json({ ok: true });
}
