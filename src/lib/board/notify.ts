import { getCloudflareContext } from "@opennextjs/cloudflare";
import { BOARD_EMAIL_FROM } from "./email";
import { listMembers } from "./db";
import { getDb } from "./secrets";
import type { Member } from "./types";

export async function notifyBoard(args: {
  subject: string;
  text: string;
  html: string;
  excludeEmail?: string;
}): Promise<void> {
  const { env } = getCloudflareContext();
  const members = await listMembers(getDb());
  const recipients = members
    .map((m) => m.email)
    .filter((e) => e !== args.excludeEmail?.toLowerCase());

  await Promise.allSettled(
    recipients.map((to) =>
      env.SEND_EMAIL.send({
        from: BOARD_EMAIL_FROM,
        to,
        subject: args.subject,
        text: args.text,
        html: args.html,
      })
    )
  );
}

export async function notifyMember(
  member: Pick<Member, "email" | "name">,
  args: { subject: string; text: string; html: string }
): Promise<void> {
  const { env } = getCloudflareContext();
  await env.SEND_EMAIL.send({
    from: BOARD_EMAIL_FROM,
    to: member.email,
    subject: args.subject,
    text: args.text,
    html: args.html,
  });
}

export function boardLink(path: string): string {
  return `https://www.gatorredleg.org${path}`;
}
