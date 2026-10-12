// Per-recipient Reply-To addresses: reply-<token>@gatorredleg.org.
// Email Routing's catch-all delivers them to the Worker email() handler,
// which posts the reply as a comment on the board item (worker/inbound-email.ts).

import { nowSec } from "./ids";

export type ReplyParentType = "message" | "task";

export type ReplyTarget = { parentType: ReplyParentType; parentId: string };

export type ReplyAddressRow = {
  token: string;
  parent_type: ReplyParentType;
  parent_id: string;
  recipient_kind: "member" | "external";
  recipient: string;
};

const REPLY_DOMAIN = "gatorredleg.org";
const TOKEN_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";
const TOKEN_LENGTH = 20; // 100 bits — the address itself is the credential
const REPLY_ADDRESS_RE = new RegExp(
  `^reply-([${TOKEN_ALPHABET}]{${TOKEN_LENGTH}})@${REPLY_DOMAIN.replace(".", "\\.")}$`
);

function newToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(TOKEN_LENGTH));
  return Array.from(bytes, (b) => TOKEN_ALPHABET[b & 31]).join("");
}

export function replyAddress(token: string): string {
  return `reply-${token}@${REPLY_DOMAIN}`;
}

/** Token from a reply-<token>@ address, or null for any other address. */
export function parseReplyToken(address: string): string | null {
  return REPLY_ADDRESS_RE.exec(address.trim().toLowerCase())?.[1] ?? null;
}

/**
 * Reply-To address per recipient for one board item. Stable: the same
 * recipient on the same item always gets the same address.
 */
export async function replyAddressesFor(
  db: D1Database,
  target: ReplyTarget,
  kind: "member" | "external",
  recipients: string[]
): Promise<Map<string, string>> {
  const unique = [...new Set(recipients)];
  if (unique.length === 0) return new Map();

  const ts = nowSec();
  await db.batch(
    unique.map((recipient) =>
      db
        .prepare(
          `INSERT INTO email_reply_addresses
             (token, parent_type, parent_id, recipient_kind, recipient, created_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6)
           ON CONFLICT (parent_type, parent_id, recipient_kind, recipient) DO NOTHING`
        )
        .bind(newToken(), target.parentType, target.parentId, kind, recipient, ts)
    )
  );

  const placeholders = unique.map((_, i) => `?${i + 4}`).join(", ");
  const { results } = await db
    .prepare(
      `SELECT token, recipient FROM email_reply_addresses
       WHERE parent_type = ?1 AND parent_id = ?2 AND recipient_kind = ?3
         AND recipient IN (${placeholders})`
    )
    .bind(target.parentType, target.parentId, kind, ...unique)
    .all<{ token: string; recipient: string }>();

  return new Map(
    (results ?? []).map((row) => [row.recipient, replyAddress(row.token)])
  );
}

export async function getReplyAddress(
  db: D1Database,
  token: string
): Promise<ReplyAddressRow | null> {
  return db
    .prepare(
      `SELECT token, parent_type, parent_id, recipient_kind, recipient
       FROM email_reply_addresses WHERE token = ?1`
    )
    .bind(token)
    .first<ReplyAddressRow>();
}

/** Out-of-office and other machine replies must never post to the board. */
export function isAutoReply(headers: Headers, subject: string): boolean {
  const autoSubmitted = headers.get("auto-submitted")?.trim().toLowerCase();
  if (autoSubmitted && autoSubmitted !== "no") return true;
  if (headers.has("x-autoreply") || headers.has("x-autorespond")) return true;
  const precedence = headers.get("precedence")?.trim().toLowerCase();
  if (precedence && ["bulk", "junk", "list", "auto_reply"].includes(precedence)) {
    return true;
  }
  return /^(automatic reply|auto(-|\s)?reply|out of (the )?office)\b/i.test(
    subject.trim()
  );
}

const CUT_LINE_PATTERNS = [
  /^-{2,}\s*original message\s*-{2,}/i,
  /^-{2,}\s*forwarded message\s*-{2,}/i,
  /^_{10,}\s*$/, // Outlook separator above the quoted header block
  /^--\s?$/, // signature delimiter
  /^sent from my (iphone|ipad|android|mobile)/i,
  /^get outlook for (ios|android)/i,
];

/** Keep only the new text of an email reply: drop quoted history and signatures. */
export function stripQuotedReply(text: string): string {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  let end = lines.length;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    // Gmail / Apple Mail: "On <date>, <name> wrote:" — sometimes wrapped over two lines.
    const twoLines = `${line} ${lines[i + 1]?.trim() ?? ""}`;
    if (
      /^on\b.+wrote:$/i.test(line) ||
      (/^on\b/i.test(line) && /^on\b.+wrote:$/i.test(twoLines))
    ) {
      end = i;
      break;
    }
    // Outlook: "From: …" followed shortly by "Sent:" / "Date:".
    if (
      /^\*?from:\*?\s/i.test(line) &&
      lines
        .slice(i + 1, i + 5)
        .some((next) => /^\*?(sent|date):\*?\s/i.test(next.trim()))
    ) {
      end = i;
      break;
    }
    if (CUT_LINE_PATTERNS.some((re) => re.test(line))) {
      end = i;
      break;
    }
  }

  return lines
    .slice(0, end)
    .filter((line) => !line.trimStart().startsWith(">"))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
