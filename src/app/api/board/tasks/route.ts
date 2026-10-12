import {
  createTask,
  getMemberById,
  listMyOpenTasks,
  recordActivity,
} from "@/lib/board/db";
import { parseOptionalDate, taskPath } from "@/lib/board/format";
import { buildBoardNotificationEmail } from "@/lib/board/notification-email";
import { boardLink, notifyMember } from "@/lib/board/notify";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  if (url.searchParams.get("mine") === "1") {
    const tasks = await listMyOpenTasks(getDb(), auth.id);
    return Response.json({ ok: true, data: tasks });
  }

  return Response.json(
    { ok: false, error: "Use /tasks/lists or ?mine=1" },
    { status: 400 }
  );
}

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as {
    listId?: string;
    title?: string;
    descriptionMd?: string;
    assigneeId?: string | null;
    dueDate?: string | null;
  };
  const listId = String(body.listId ?? "").trim();
  const title = String(body.title ?? "").trim();
  if (!listId || !title) {
    return Response.json(
      { ok: false, error: "listId and title required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const task = await createTask(
    db,
    listId,
    title,
    body.descriptionMd?.trim() || null,
    body.assigneeId ?? null,
    parseOptionalDate(body.dueDate)
  );
  await recordActivity(db, auth.id, "created", "task", task.id, title);

  if (task.assignee_id && task.assignee_id !== auth.id) {
    const assignee = await getMemberById(db, task.assignee_id);
    if (assignee) {
      const link = boardLink(taskPath(task));
      await notifyMember(assignee, {
        subject: `[Board] Task assigned: ${title}`,
        ...buildBoardNotificationEmail({
          heading: "TASK ASSIGNED",
          summary: `${auth.name} assigned you:`,
          title,
          bodyMd: task.description_md,
          details: task.due_date ? [["Due", task.due_date]] : [],
          link,
          linkLabel: "View task",
        }),
      }).catch(() => {});
    }
  }

  return Response.json({ ok: true, data: task }, { status: 201 });
}
