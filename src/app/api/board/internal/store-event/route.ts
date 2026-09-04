import { createMessage, getMemberByEmail, recordActivity } from "@/lib/board/db";
import { secret, getDb } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

type StoreEventPayload = {
  type?: string;
  summary?: string;
  detail?: string;
};

/** Store/donation webhooks → board notification message (replaces Basecamp chat bot). */
export async function POST(request: Request) {
  const expected = secret("BOARD_STORE_WEBHOOK_SECRET");
  if (!expected) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const provided = request.headers.get("x-board-store-secret");
  if (provided !== expected) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as StoreEventPayload;
  const type = String(body.type ?? "store_event").trim();
  const summary = String(body.summary ?? "Store event").trim();
  const detail = String(body.detail ?? "").trim();

  const db = getDb();
  const author = await getMemberByEmail(db, "matt@redleg.dev");
  if (!author || author.status !== "active") {
    return Response.json({ ok: false, error: "No system author" }, { status: 422 });
  }

  const subject = `[Store] ${summary}`;
  const bodyMd = detail ? `${summary}\n\n${detail}` : summary;
  const message = await createMessage(db, subject, bodyMd, author.id);
  await recordActivity(db, author.id, "logged", type, message.id, summary);

  return Response.json({ ok: true, data: { id: message.id } }, { status: 201 });
}
