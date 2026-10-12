import {
  addComment,
  getMemberById,
  getTask,
  listComments,
  updateTask,
} from "@/lib/board/db";
import { parseOptionalDate, taskPath } from "@/lib/board/format";
import { buildBoardNotificationEmail } from "@/lib/board/notification-email";
import { announceTaskComment } from "@/lib/board/comments";
import { boardLink, notifyMember } from "@/lib/board/notify";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const db = getDb();
  const task = await getTask(db, id);
  if (!task) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const comments = await listComments(db, "task", id);
  return Response.json({ ok: true, data: { task, comments } });
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    descriptionMd?: string | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    completed?: boolean;
  };

  const db = getDb();
  const before = await getTask(db, id);
  if (!before) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const ok = await updateTask(db, id, {
    title: body.title,
    descriptionMd: body.descriptionMd,
    assigneeId: body.assigneeId,
    dueDate:
      body.dueDate !== undefined ? parseOptionalDate(body.dueDate) : undefined,
    completed: body.completed,
    completedBy: body.completed ? auth.id : null,
  });
  if (!ok) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const task = await getTask(db, id);

  if (
    body.assigneeId !== undefined &&
    body.assigneeId &&
    body.assigneeId !== auth.id &&
    body.assigneeId !== before.assignee_id &&
    task?.assignee_id === body.assigneeId
  ) {
    const assignee = await getMemberById(db, body.assigneeId);
    if (assignee) {
      const link = boardLink(taskPath(task));
      await notifyMember(assignee, {
        subject: `[Board] Task assigned: ${task.title}`,
        ...buildBoardNotificationEmail({
          heading: "TASK ASSIGNED",
          summary: `${auth.name} assigned you:`,
          title: task.title,
          bodyMd: task.description_md,
          details: task.due_date ? [["Due", task.due_date]] : [],
          link,
          linkLabel: "View task",
        }),
        replyTarget: { parentType: "task", parentId: task.id },
      }).catch(() => {});
    }
  }

  return Response.json({ ok: true, data: task });
}

export async function POST(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { bodyMd?: string };
  const bodyMd = String(body.bodyMd ?? "").trim();
  if (!bodyMd) {
    return Response.json({ ok: false, error: "bodyMd required" }, { status: 400 });
  }

  const db = getDb();
  const task = await getTask(db, id);
  if (!task) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const comment = await addComment(db, "task", id, auth.id, bodyMd);
  await announceTaskComment(db, { task, author: auth, bodyMd });

  return Response.json(
    { ok: true, data: { ...comment, author_name: auth.name } },
    { status: 201 }
  );
}
