import { env } from "cloudflare:workers";
import { resolveMentionedMembers } from "./mentions";
import { listActiveMembers } from "./db";
import { getDb } from "./secrets";
import { BOARD_EMAIL_FROM } from "./email";
import { buildBoardNotificationEmail } from "./notification-email";
import { replyAddressesFor, type ReplyTarget } from "./reply-address";
import type { Member } from "./types";

type NotificationContent = { subject: string; text: string; html: string };

/** Per-member Reply-To so an email reply lands as a comment on `target`. */
async function memberReplyTo(
  target: ReplyTarget | undefined,
  memberIds: string[]
): Promise<Map<string, string>> {
  if (!target) return new Map();
  return replyAddressesFor(getDb(), target, "member", memberIds).catch(
    (err) => {
      console.error("reply address lookup failed", err);
      return new Map<string, string>();
    }
  );
}

export async function notifyBoard(
  args: NotificationContent & {
    excludeEmails?: string[];
    replyTarget?: ReplyTarget;
  }
): Promise<void> {
  const exclude = new Set(
    (args.excludeEmails ?? []).map((e) => e.trim().toLowerCase())
  );
  const members = await listActiveMembers(getDb());
  const recipients = members.filter((m) => !exclude.has(m.email));
  const replyTo = await memberReplyTo(
    args.replyTarget,
    recipients.map((m) => m.id)
  );

  await Promise.allSettled(
    recipients.map((member) =>
      env.SEND_EMAIL.send({
        from: BOARD_EMAIL_FROM,
        to: member.email,
        replyTo: replyTo.get(member.id),
        subject: args.subject,
        text: args.text,
        html: args.html,
      })
    )
  );
}

export async function notifyMember(
  member: Pick<Member, "id" | "email" | "name">,
  args: NotificationContent & { replyTarget?: ReplyTarget }
): Promise<void> {
  const replyTo = await memberReplyTo(args.replyTarget, [member.id]);
  await env.SEND_EMAIL.send({
    from: BOARD_EMAIL_FROM,
    to: member.email,
    replyTo: replyTo.get(member.id),
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
  author: Pick<Member, "id" | "name">;
  /** e.g. "a comment on" / "a task comment on" — followed by the title. */
  contextLabel: string;
  title: string;
  link: string;
  replyTarget: ReplyTarget;
}): Promise<string[]> {
  const members = await listActiveMembers(getDb());
  const mentioned = resolveMentionedMembers(
    args.bodyMd,
    members,
    args.author.id
  );
  if (mentioned.length === 0) return [];

  const content = {
    subject: `[Board] ${args.author.name} mentioned you`,
    ...buildBoardNotificationEmail({
      heading: "YOU WERE MENTIONED",
      summary: `${args.author.name} mentioned you in ${args.contextLabel}`,
      title: args.title,
      bodyMd: args.bodyMd,
      link: args.link,
      linkLabel: "View on board hub",
    }),
  };
  await Promise.allSettled(
    mentioned.map((member) =>
      notifyMember(member, { ...content, replyTarget: args.replyTarget })
    )
  );

  return mentioned.map((m) => m.email);
}
