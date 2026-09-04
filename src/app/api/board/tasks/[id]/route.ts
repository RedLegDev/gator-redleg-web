import {
  addComment,
  getMemberById,
  getTask,
  listComments,
  recordActivity,
  updateTask,
} from "@/lib/board/db";
import { parseOptionalDate } from "@/lib/board/format";
import { boardLink, notifyMember, notifyMentions } from "@/lib/board/notify";
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
      const link = boardLink(`/board/tasks/${task.list_id}`);
      await notifyMember(assignee, {
        subject: `[Board] Task assigned: ${task.title}`,
        text: `${auth.name} assigned you: ${task.title}\n\n${link}`,
        html: `<p><strong>${auth.name}</strong> assigned you: ${task.title}</p><p><a href="${link}">View list</a></p>`,
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
  await recordActivity(db, auth.id, "commented", "task", id, task.title);

  const link = boardLink(`/board/tasks/${task.list_id}`);
  const mentionEmails = await notifyMentions({
    bodyMd,
    author: auth,
    contextLabel: `comment on task: ${task.title}`,
    link,
  }).catch(() => [] as string[]);

  if (task.assignee_id && task.assignee_id !== auth.id) {
    const assignee = await getMemberById(db, task.assignee_id);
    if (
      assignee?.status === "active" &&
      !mentionEmails.includes(assignee.email)
    ) {
      await notifyMember(assignee, {
        subject: `[Board] Comment on your task: ${task.title}`,
        text: `${auth.name} commented on: ${task.title}\n\n${link}`,
        html: `<p><strong>${auth.name}</strong> commented on your task: ${task.title}</p><p><a href="${link}">View list</a></p>`,
      }).catch(() => {});
    }
  }

  return Response.json(
    { ok: true, data: { ...comment, author_name: auth.name } },
    { status: 201 }
  );
}
