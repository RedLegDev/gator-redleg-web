import {
  addComment,
  getMessage,
  listComments,
  setMessageArchived,
  setMessagePinned,
} from "@/lib/board/db";
import { linkAttachments } from "@/lib/board/attachments";
import { announceMessageComment } from "@/lib/board/comments";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

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
  const body = (await request.json().catch(() => ({}))) as {
    pinned?: boolean;
    archived?: boolean;
  };

  const hasPinned = typeof body.pinned === "boolean";
  const hasArchived = typeof body.archived === "boolean";
  if (!hasPinned && !hasArchived) {
    return Response.json(
      { ok: false, error: "pinned or archived boolean required" },
      { status: 400 }
    );
  }

  const db = getDb();
  if (hasArchived) {
    const ok = await setMessageArchived(db, id, body.archived!);
    if (!ok) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }
  }
  if (hasPinned) {
    const ok = await setMessagePinned(db, id, body.pinned!);
    if (!ok) {
      return Response.json(
        { ok: false, error: "Not found or message is archived" },
        { status: 404 }
      );
    }
  }
  return Response.json({ ok: true });
}

export async function POST(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    bodyMd?: string;
    attachmentIds?: string[];
    notify?: boolean;
  };
  const bodyMd = String(body.bodyMd ?? "").trim();
  const attachmentIds = Array.isArray(body.attachmentIds)
    ? body.attachmentIds.map(String)
    : [];
  const notify = body.notify !== false;
  if (!bodyMd) {
    return Response.json({ ok: false, error: "bodyMd required" }, { status: 400 });
  }

  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const comment = await addComment(db, "message", id, auth.id, bodyMd);
  const linked = await linkAttachments(
    db,
    attachmentIds,
    "comment",
    comment.id,
    auth.id
  );
  if (!linked) {
    return Response.json(
      { ok: false, error: "Invalid attachments" },
      { status: 400 }
    );
  }
  await announceMessageComment(db, { message, author: auth, bodyMd, notify });

  return Response.json(
    {
      ok: true,
      data: { ...comment, author_name: auth.name },
    },
    { status: 201 }
  );
}
