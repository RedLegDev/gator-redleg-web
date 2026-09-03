import { listTaskLists } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const lists = await listTaskLists(getDb());
  return Response.json({ ok: true, data: lists });
}
