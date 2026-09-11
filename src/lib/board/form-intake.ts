import { getCloudflareContext } from "@opennextjs/cloudflare";
import { BOARD_INBOX_ADDRESS } from "./email";
import { processInboundEmail } from "./inbound-email";
import { boardLink, notifyBoard } from "./notify";
import { fanOutInboundEmailPush } from "./push";
import { getDb } from "./secrets";

/** Public site form → board thread + member email/push. */
export async function publishFormToBoard(args: {
  from: string;
  subject: string;
  subjectPrefix: string;
  text: string;
  html: string;
}): Promise<{ boardMessageId: string }> {
  const { env } = getCloudflareContext();
  const { boardMessageId } = await processInboundEmail(getDb(), {
    from: args.from,
    to: BOARD_INBOX_ADDRESS,
    subject: args.subject,
    text: args.text,
    subjectPrefix: args.subjectPrefix,
  });

  const link = boardLink(`/board/messages/${boardMessageId}`);
  const titled = `${args.subjectPrefix} ${args.subject}`;
  const cta = `<p style="font-family:Arial,sans-serif;padding:16px 20px;"><a href="${link}">View and respond on the board hub</a></p>`;
  const html = args.html.includes("</body>")
    ? args.html.replace("</body>", `${cta}</body>`)
    : `${args.html}${cta}`;

  await notifyBoard({
    subject: titled,
    text: `${args.text}\n\n${link}`,
    html,
  }).catch((err) => {
    console.error("form board notify failed", err);
  });

  await fanOutInboundEmailPush(env, {
    subject: args.subject,
    from: args.from,
    messageId: boardMessageId,
    titlePrefix: args.subjectPrefix,
  }).catch((err) => {
    console.error("form board push failed", err);
  });

  return { boardMessageId };
}
