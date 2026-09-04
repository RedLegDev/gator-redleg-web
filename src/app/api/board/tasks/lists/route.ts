import { createTaskList, listTaskLists, recordActivity } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const lists = await listTaskLists(getDb());
  return Response.json({ ok: true, data: lists });
}

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    description?: string;
  };
  const name = String(body.name ?? "").trim();
  if (!name) {
    return Response.json({ ok: false, error: "name required" }, { status: 400 });
  }

  const db = getDb();
  const list = await createTaskList(
    db,
    name,
    body.description?.trim() || null
  );
  await recordActivity(db, auth.id, "created", "task_list", list.id, name);

  return Response.json(
    {
      ok: true,
      data: { ...list, open_count: 0, total_count: 0 },
    },
    { status: 201 }
  );
}
