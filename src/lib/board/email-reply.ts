// Email sent to a reply-<token>@ address → comment on the board item it answers.

import { announceMessageComment, announceTaskComment } from "./comments";
import { addComment, getMemberByEmail, getMemberById, getMessage, getTask } from "./db";
import { newId, nowSec } from "./ids";
import { SYSTEM_AUTHOR_EMAIL } from "./inbound-email";
import {
  getReplyAddress,
  isAutoReply,
  parseReplyToken,
  stripQuotedReply,
} from "./reply-address";

export type EmailReplyResult =
  /** Not a reply address we issued (or sender doesn't match): handle as new mail. */
  | { outcome: "not-a-reply" }
  /** A reply, but nothing to post (auto-reply, only quoted text, item gone). */
  | { outcome: "ignored"; reason: string }
  | { outcome: "posted"; parentType: "message" | "task"; parentId: string; commentId: string };

export async function processEmailReply(
  db: D1Database,
  mail: {
    from: string;
    /** Envelope recipient first, then header To/Cc. */
    recipients: string[];
    subject: string;
    text: string;
    headers: Headers;
  }
): Promise<EmailReplyResult> {
  const token = mail.recipients.map(parseReplyToken).find(Boolean);
  if (!token) return { outcome: "not-a-reply" };
  const address = await getReplyAddress(db, token);
  if (!address) return { outcome: "not-a-reply" };

  const from = mail.from.trim().toLowerCase();

  if (address.recipient_kind === "member") {
    const member = await getMemberById(db, address.recipient);
    // Only the member the address was issued to can post with it.
    if (!member || member.status !== "active" || member.email !== from) {
      return { outcome: "not-a-reply" };
    }
    if (isAutoReply(mail.headers, mail.subject)) {
      return { outcome: "ignored", reason: "auto-reply" };
    }
    const bodyMd = stripQuotedReply(mail.text);
    if (!bodyMd) return { outcome: "ignored", reason: "empty after quote strip" };

    if (address.parent_type === "message") {
      const message = await getMessage(db, address.parent_id);
      if (!message) return { outcome: "ignored", reason: "message not found" };
      const comment = await addComment(db, "message", message.id, member.id, bodyMd);
      await announceMessageComment(db, { message, author: member, bodyMd });
      return { outcome: "posted", parentType: "message", parentId: message.id, commentId: comment.id };
    }

    const task = await getTask(db, address.parent_id);
    if (!task) return { outcome: "ignored", reason: "task not found" };
    const comment = await addComment(db, "task", task.id, member.id, bodyMd);
    await announceTaskComment(db, { task, author: member, bodyMd });
    return { outcome: "posted", parentType: "task", parentId: task.id, commentId: comment.id };
  }

  // Outside correspondent answering a Respond email. The token is the
  // credential; they may reply from an alias, so the sender isn't pinned.
  if (address.parent_type !== "message") return { outcome: "not-a-reply" };
  if (isAutoReply(mail.headers, mail.subject)) {
    return { outcome: "ignored", reason: "auto-reply" };
  }
  const message = await getMessage(db, address.parent_id);
  if (!message) return { outcome: "not-a-reply" };
  const bodyMd = stripQuotedReply(mail.text);
  if (!bodyMd) return { outcome: "ignored", reason: "empty after quote strip" };

  // comments.author_id needs a member; the thread shows the sender instead
  // (inbound_emails.comment_id → listComments).
  const system = await getMemberByEmail(db, SYSTEM_AUTHOR_EMAIL);
  if (!system) throw new Error("No member to attribute email reply");
  const comment = await addComment(db, "message", message.id, system.id, bodyMd);
  await db
    .prepare(
      `INSERT INTO inbound_emails
         (id, from_address, to_address, subject, body_text, board_message_id,
          received_at, comment_id)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
    .bind(
      newId(),
      from,
      mail.recipients[0] ?? "",
      mail.subject,
      mail.text,
      message.id,
      nowSec(),
      comment.id
    )
    .run();
  await announceMessageComment(db, {
    message,
    author: { id: system.id, name: from, email: from },
    bodyMd,
  });
  return { outcome: "posted", parentType: "message", parentId: message.id, commentId: comment.id };
}
