import {
  getMemberById,
  listTasksNeedingDueReminder,
  markDueReminderSent,
} from "@/lib/board/db";
import { boardLink, notifyMember } from "@/lib/board/notify";
import { secret, getDb } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const key = secret("BOARD_CRON_SECRET");
  if (!key) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${key}`;
}

/** Daily due-soon reminders. Trigger via CF cron or: curl -H "Authorization: Bearer $SECRET" ... */
export async function POST(request: Request) {
  if (!authorized(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const tasks = await listTasksNeedingDueReminder(db);
  let sent = 0;

  for (const task of tasks) {
    if (!task.assignee_id) continue;
    const assignee = await getMemberById(db, task.assignee_id);
    if (!assignee || assignee.status !== "active") continue;

    const link = boardLink(`/board/tasks/${task.list_id}`);
    await notifyMember(assignee, {
      subject: `[Board] Due soon: ${task.title}`,
      text: `Reminder: "${task.title}" is due ${task.due_date}.\n\n${link}`,
      html: `<p>Reminder: <strong>${task.title}</strong> is due ${task.due_date}.</p><p><a href="${link}">View list</a></p>`,
    }).catch(() => {});
    await markDueReminderSent(db, task.id);
    sent += 1;
  }

  return Response.json({ ok: true, sent });
}

export async function GET(request: Request) {
  return POST(request);
}
