import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  addComment,
  getInboundEmailByMessageId,
  getMessage,
  recordActivity,
  recordOutboundEmailReply,
} from "@/lib/board/db";
import {
  BOARD_INBOX_ADDRESS,
  buildOutboundReplyEmail,
  replySubject,
} from "@/lib/board/email";
import {
  displayNameForFrom,
  listAllowedFromAddresses,
} from "@/lib/board/send-identities";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    body?: string;
    fromAddress?: string;
  };
  const bodyText = String(body.body ?? "").trim();
  if (!bodyText) {
    return Response.json({ ok: false, error: "body required" }, { status: 400 });
  }

  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const inbound = await getInboundEmailByMessageId(db, id);
  if (!inbound) {
    return Response.json(
      { ok: false, error: "Not an inbound email thread" },
      { status: 400 }
    );
  }

  const { addresses, defaultAddress } = await listAllowedFromAddresses(
    db,
    auth.id
  );
  const fromAddress = String(body.fromAddress ?? defaultAddress)
    .trim()
    .toLowerCase();
  if (!addresses.includes(fromAddress)) {
    return Response.json(
      { ok: false, error: "From address not allowed for your account" },
      { status: 403 }
    );
  }

  const subject = replySubject(inbound.subject || message.subject);
  const from = {
    email: fromAddress,
    name: displayNameForFrom(fromAddress, auth.name),
  };
  const { text, html } = buildOutboundReplyEmail({
    body: bodyText,
    senderName: auth.name,
  });

  try {
    const { env } = getCloudflareContext();
    await env.SEND_EMAIL.send({
      from,
      to: inbound.from_address,
      // Locked to shared intake so replies stay on the board (#40).
      replyTo: BOARD_INBOX_ADDRESS,
      subject,
      text,
      html,
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";
    console.error(`Board respond email failed: ${code}`, error);
    return Response.json(
      {
        ok: false,
        error: "Unable to send reply. Nothing was posted to the thread.",
      },
      { status: 502 }
    );
  }

  const comment = await addComment(db, "message", id, auth.id, bodyText);
  await recordOutboundEmailReply(db, {
    inboundEmailId: inbound.id,
    messageId: id,
    commentId: comment.id,
    toAddress: inbound.from_address,
    fromAddress,
    subject,
    bodyText,
    sentBy: auth.id,
  });
  await recordActivity(
    db,
    auth.id,
    "replied",
    "message",
    id,
    `Email reply: ${subject}`
  );

  return Response.json(
    {
      ok: true,
      data: {
        ...comment,
        author_name: auth.name,
        email_reply: {
          to_address: inbound.from_address,
          from_address: fromAddress,
          subject,
        },
      },
    },
    { status: 201 }
  );
}
