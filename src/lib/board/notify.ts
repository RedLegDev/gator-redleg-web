import { env } from "cloudflare:workers";
import { resolveMentionedMembers } from "./mentions";
import { listActiveMembers } from "./db";
import { getDb } from "./secrets";
import { BOARD_EMAIL_FROM } from "./email";
import { buildBoardNotificationEmail } from "./notification-email";
import type { Member } from "./types";

export async function notifyBoard(args: {
  subject: string;
  text: string;
  html: string;
  excludeEmails?: string[];
}): Promise<void> {
  const exclude = new Set(
    (args.excludeEmails ?? []).map((e) => e.trim().toLowerCase())
  );
  const members = await listActiveMembers(getDb());
  const recipients = members
    .map((m) => m.email)
    .filter((e) => !exclude.has(e));

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

/** Send targeted emails for @mentions; returns mentioned emails (for board exclude list). */
export async function notifyMentions(args: {
  bodyMd: string;
  author: Member;
  /** e.g. "a comment on" / "a task comment on" — followed by the title. */
  contextLabel: string;
  title: string;
  link: string;
}): Promise<string[]> {
  const members = await listActiveMembers(getDb());
  const mentioned = resolveMentionedMembers(
    args.bodyMd,
    members,
    args.author.id
  );
  if (mentioned.length === 0) return [];

  await Promise.allSettled(
    mentioned.map((member) =>
      notifyMember(member, {
        subject: `[Board] ${args.author.name} mentioned you`,
        ...buildBoardNotificationEmail({
          heading: "YOU WERE MENTIONED",
          summary: `${args.author.name} mentioned you in ${args.contextLabel}`,
          title: args.title,
          bodyMd: args.bodyMd,
          link: args.link,
          linkLabel: "View on board hub",
        }),
      })
    )
  );

  return mentioned.map((m) => m.email);
}
