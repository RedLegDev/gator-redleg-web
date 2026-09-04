import { processInboundEmail, normalizeEmailAddress } from "@/lib/board/inbound-email";
import { getDb, secret } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

type InboundPayload = {
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  to?: string;
};

/** Legacy HTTP webhook (optional). Prefer Cloudflare Email Routing → Worker email(). */
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
  const from = normalizeEmailAddress(String(body.from ?? ""));
  const to = normalizeEmailAddress(String(body.to ?? "webhook@gatorredleg.org"));
  const subject = String(body.subject ?? "(no subject)").trim();
  const text = String(body.text ?? body.html ?? "").trim();
  if (!from || !text) {
    return Response.json(
      { ok: false, error: "from and text required" },
      { status: 400 }
    );
  }

  try {
    const result = await processInboundEmail(getDb(), {
      from,
      to,
      subject,
      text,
    });
    return Response.json(
      { ok: true, data: { id: result.boardMessageId, inboundId: result.inboundId } },
      { status: 201 }
    );
  } catch (err) {
    console.error("inbound webhook failed", err);
    return Response.json({ ok: false, error: "Processing failed" }, { status: 422 });
  }
}
