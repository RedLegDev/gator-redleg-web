// After a comment is stored: activity + mention/board/assignee emails.
// Shared by the hub comment routes and email replies (worker/inbound-email.ts).

import { getMemberById, recordActivity } from "./db";
import { taskPath } from "./format";
import { buildBoardNotificationEmail } from "./notification-email";
import { boardLink, notifyBoard, notifyMember, notifyMentions } from "./notify";
import type { Member, MessageRow, TaskRow } from "./types";

type Author = Pick<Member, "id" | "name" | "email">;

export async function announceMessageComment(
  db: D1Database,
  args: {
    message: Pick<MessageRow, "id" | "subject">;
    author: Author;
    bodyMd: string;
    /** false = post quietly (hub "don't notify" toggle). */
    notify?: boolean;
  }
): Promise<void> {
  const { message, author, bodyMd } = args;
  await recordActivity(db, author.id, "commented", "message", message.id, message.subject);

  const link = boardLink(`/board/messages/${message.id}`);
  const replyTarget = { parentType: "message", parentId: message.id } as const;
  const mentionEmails = await notifyMentions({
    bodyMd,
    author,
    contextLabel: "a comment on:",
    title: message.subject,
    link,
    replyTarget,
  }).catch(() => [] as string[]);

  if (args.notify === false) return;
  await notifyBoard({
    subject: `[Board] Re: ${message.subject}`,
    ...buildBoardNotificationEmail({
      heading: "NEW COMMENT",
      summary: `${author.name} commented on:`,
      title: message.subject,
      bodyMd,
      link,
      linkLabel: "View thread",
    }),
    excludeEmails: [author.email, ...mentionEmails],
    replyTarget,
  }).catch(() => {});
}

export async function announceTaskComment(
  db: D1Database,
  args: {
    task: Pick<TaskRow, "id" | "list_id" | "title" | "assignee_id">;
    author: Author;
    bodyMd: string;
  }
): Promise<void> {
  const { task, author, bodyMd } = args;
  await recordActivity(db, author.id, "commented", "task", task.id, task.title);

  const link = boardLink(taskPath(task));
  const replyTarget = { parentType: "task", parentId: task.id } as const;
  const mentionEmails = await notifyMentions({
    bodyMd,
    author,
    contextLabel: "a comment on task:",
    title: task.title,
    link,
    replyTarget,
  }).catch(() => [] as string[]);

  if (!task.assignee_id || task.assignee_id === author.id) return;
  const assignee = await getMemberById(db, task.assignee_id);
  if (assignee?.status !== "active" || mentionEmails.includes(assignee.email)) {
    return;
  }
  await notifyMember(assignee, {
    subject: `[Board] Comment on your task: ${task.title}`,
    ...buildBoardNotificationEmail({
      heading: "NEW COMMENT",
      summary: `${author.name} commented on your task:`,
      title: task.title,
      bodyMd,
      link,
      linkLabel: "View task",
    }),
    replyTarget,
  }).catch(() => {});
}
