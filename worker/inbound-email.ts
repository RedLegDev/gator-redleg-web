import PostalMime from "postal-mime";
import {
  normalizeEmailAddress,
  processInboundEmail,
} from "../src/lib/board/inbound-email";

type ParsedMail = Awaited<ReturnType<PostalMime["parse"]>>;

function textFromParsed(parsed: ParsedMail): string {
  if (parsed.text?.trim()) return parsed.text.trim();
  if (parsed.html?.trim()) {
    return parsed.html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .trim();
  }
  return "";
}

/** Cloudflare Email Routing → board message + D1 archive. */
export async function onInboundEmail(
  message: ForwardableEmailMessage,
  env: CloudflareEnv
): Promise<void> {
  try {
    const raw = await new Response(message.raw).arrayBuffer();
    const parser = new PostalMime();
    const parsed = await parser.parse(raw);

    const from =
      normalizeEmailAddress(parsed.from?.address ?? message.from ?? "");
    const to = normalizeEmailAddress(parsed.to?.[0]?.address ?? message.to ?? "");
    const subject = parsed.subject ?? message.headers.get("subject") ?? "";
    const text = textFromParsed(parsed);

    if (!text) {
      console.warn("inbound email dropped: empty body", { from, to, subject });
      message.setReject("Empty message body");
      return;
    }

    const { boardMessageId } = await processInboundEmail(env.DB, {
      from,
      to,
      subject,
      text,
    });

    const forwardTo = env.BOARD_INBOX_FORWARD?.trim();
    if (forwardTo) {
      await message.forward(forwardTo);
    }

    console.log("inbound email processed", {
      from,
      to,
      subject,
      boardMessageId,
      forwarded: !!forwardTo,
    });
  } catch (err) {
    console.error("inbound email handler failed", err);
    message.setReject("Unable to process message");
  }
}
