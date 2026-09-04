import {
  createMessage,
  listMessages,
  recordActivity,
} from "@/lib/board/db";
import { linkAttachments } from "@/lib/board/attachments";
import { boardLink, notifyBoard, notifyMentions, notifyMember } from "@/lib/board/notify";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const messages = await listMessages(getDb());
  return Response.json({ ok: true, data: messages });
}

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as {
    subject?: string;
    bodyMd?: string;
    attachmentIds?: string[];
  };
  const subject = String(body.subject ?? "").trim();
  const bodyMd = String(body.bodyMd ?? "").trim();
  const attachmentIds = Array.isArray(body.attachmentIds)
    ? body.attachmentIds.map(String)
    : [];
  if (!subject || !bodyMd) {
    return Response.json(
      { ok: false, error: "subject and bodyMd required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const message = await createMessage(db, subject, bodyMd, auth.id);
  const linked = await linkAttachments(
    db,
    attachmentIds,
    "message",
    message.id,
    auth.id
  );
  if (!linked) {
    return Response.json(
      { ok: false, error: "Invalid attachments" },
      { status: 400 }
    );
  }
  await recordActivity(
    db,
    auth.id,
    "posted",
    "message",
    message.id,
    subject
  );

  const link = boardLink(`/board/messages/${message.id}`);
  const mentionEmails = await notifyMentions({
    bodyMd,
    author: auth,
    contextLabel: `message: ${subject}`,
    link,
  }).catch(() => [] as string[]);

  await notifyBoard({
    subject: `[Board] ${subject}`,
    text: `${auth.name} posted: ${subject}\n\n${link}`,
    html: `<p><strong>${auth.name}</strong> posted: ${subject}</p><p><a href="${link}">View on board hub</a></p>`,
    excludeEmails: [auth.email, ...mentionEmails],
  }).catch(() => {});

  return Response.json({ ok: true, data: message }, { status: 201 });
}
