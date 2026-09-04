import { createMessage, getMemberByEmail, recordActivity } from "./db";
import { newId, nowSec } from "./ids";

export type ParsedInboundEmail = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

const SYSTEM_AUTHOR_EMAIL = "matt@redleg.dev";

function normalizeAddress(raw: string): string {
  const match = raw.match(/<([^>]+)>/);
  const email = (match?.[1] ?? raw).trim().toLowerCase();
  return email;
}

export function normalizeEmailAddress(raw: string): string {
  return normalizeAddress(raw);
}

export async function processInboundEmail(
  db: D1Database,
  parsed: ParsedInboundEmail
): Promise<{ inboundId: string; boardMessageId: string }> {
  const from = normalizeAddress(parsed.from);
  const to = normalizeAddress(parsed.to);
  const subject = parsed.subject.trim() || "(no subject)";
  const text = parsed.text.trim();

  if (!from || !text) {
    throw new Error("Inbound email missing from or body");
  }

  let author = await getMemberByEmail(db, from);
  if (!author || author.status !== "active") {
    author = await getMemberByEmail(db, SYSTEM_AUTHOR_EMAIL);
  }
  if (!author || author.status !== "active") {
    throw new Error("No active member to attribute inbound post");
  }

  const boardMessage = await createMessage(
    db,
    `[Email] ${subject}`,
    `From: ${from}\nTo: ${to}\n\n${text}`,
    author.id
  );

  const inboundId = newId();
  const receivedAt = nowSec();
  await db
    .prepare(
      `INSERT INTO inbound_emails
         (id, from_address, to_address, subject, body_text, board_message_id, received_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
    .bind(
      inboundId,
      from,
      to,
      subject,
      text,
      boardMessage.id,
      receivedAt
    )
    .run();

  await recordActivity(
    db,
    author.id,
    "imported",
    "message",
    boardMessage.id,
    subject
  );

  return { inboundId, boardMessageId: boardMessage.id };
}
