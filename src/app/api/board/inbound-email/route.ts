import { createMessage, getMemberByEmail, recordActivity } from "@/lib/board/db";
import { secret, getDb } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

type InboundPayload = {
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
};

/** POST inbound chapter mail → board message. Requires #12 SaaSMail + BOARD_INBOUND_WEBHOOK_SECRET. */
export async function POST(request: Request) {
  const expected = secret("BOARD_INBOUND_WEBHOOK_SECRET");
  if (!expected) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const provided = request.headers.get("x-board-webhook-secret");
  if (provided !== expected) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as InboundPayload;
  const from = String(body.from ?? "").trim().toLowerCase();
  const subject = String(body.subject ?? "(no subject)").trim();
  const text = String(body.text ?? body.html ?? "").trim();
  if (!from || !text) {
    return Response.json(
      { ok: false, error: "from and text required" },
      { status: 400 }
    );
  }

  const db = getDb();
  let member = await getMemberByEmail(db, from);
  if (!member || member.status !== "active") {
    member = await getMemberByEmail(db, "matt@redleg.dev");
  }
  if (!member || member.status !== "active") {
    return Response.json({ ok: false, error: "No author for post" }, { status: 422 });
  }

  const message = await createMessage(
    db,
    `[Email] ${subject}`,
    `From: ${from}\n\n${text}`,
    member.id
  );
  await recordActivity(
    db,
    member.id,
    "imported",
    "message",
    message.id,
    subject
  );

  return Response.json({ ok: true, data: { id: message.id } }, { status: 201 });
}
