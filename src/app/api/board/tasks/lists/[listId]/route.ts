import { getTaskList, listTasksInList } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ listId: string }> };

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { listId } = await params;
  const db = getDb();
  const list = await getTaskList(db, listId);
  if (!list) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const tasks = await listTasksInList(db, listId);
  return Response.json({ ok: true, data: { list, tasks } });
}
