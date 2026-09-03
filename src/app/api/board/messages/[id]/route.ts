import {
  addComment,
  getMessage,
  listComments,
  recordActivity,
  setMessagePinned,
} from "@/lib/board/db";
import { boardLink, notifyBoard } from "@/lib/board/notify";
import { getDb } from "@/lib/board/secrets";
import { isPresident, requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const comments = await listComments(db, "message", id);
  return Response.json({ ok: true, data: { message, comments } });
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { pinned?: boolean };
  if (typeof body.pinned !== "boolean") {
    return Response.json({ ok: false, error: "pinned boolean required" }, { status: 400 });
  }
  if (!isPresident(auth)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  const ok = await setMessagePinned(getDb(), id, body.pinned);
  if (!ok) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
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
  const message = await getMessage(db, id);
  if (!message) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const comment = await addComment(db, "message", id, auth.id, bodyMd);
  await recordActivity(
    db,
    auth.id,
    "commented",
    "message",
    id,
    message.subject
  );

  const link = boardLink(`/board/messages/${id}`);
  await notifyBoard({
    subject: `[Board] Re: ${message.subject}`,
    text: `${auth.name} commented on: ${message.subject}\n\n${link}`,
    html: `<p><strong>${auth.name}</strong> commented on: ${message.subject}</p><p><a href="${link}">View thread</a></p>`,
    excludeEmail: auth.email,
  }).catch(() => {});

  return Response.json(
    {
      ok: true,
      data: { ...comment, author_name: auth.name },
    },
    { status: 201 }
  );
}
