import {
  createMessage,
  getMemberById,
  listMessages,
  recordActivity,
} from "@/lib/board/db";
import { boardLink, notifyBoard } from "@/lib/board/notify";
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
  };
  const subject = String(body.subject ?? "").trim();
  const bodyMd = String(body.bodyMd ?? "").trim();
  if (!subject || !bodyMd) {
    return Response.json(
      { ok: false, error: "subject and bodyMd required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const message = await createMessage(db, subject, bodyMd, auth.id);
  await recordActivity(
    db,
    auth.id,
    "posted",
    "message",
    message.id,
    subject
  );

  const link = boardLink(`/board/messages/${message.id}`);
  await notifyBoard({
    subject: `[Board] ${subject}`,
    text: `${auth.name} posted: ${subject}\n\n${link}`,
    html: `<p><strong>${auth.name}</strong> posted: ${subject}</p><p><a href="${link}">View on board hub</a></p>`,
    excludeEmail: auth.email,
  }).catch(() => {});

  return Response.json({ ok: true, data: message }, { status: 201 });
}
