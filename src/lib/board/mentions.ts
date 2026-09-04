import type { Member } from "./types";

/** Find @email and @Name mentions in markdown-ish text. */
export function resolveMentionedMembers(
  text: string,
  members: Member[],
  authorId: string
): Member[] {
  const haystack = text.toLowerCase();
  const found = new Map<string, Member>();

  for (const member of members) {
    if (member.id === authorId || member.status !== "active") continue;
    if (haystack.includes(`@${member.email.toLowerCase()}`)) {
      found.set(member.id, member);
    }
  }

  const byName = [...members]
    .filter((m) => m.id !== authorId && m.status === "active")
    .sort((a, b) => b.name.length - a.name.length);

  for (const member of byName) {
    if (haystack.includes(`@${member.name.toLowerCase()}`)) {
      found.set(member.id, member);
    }
  }

  const firstNames = new Map<string, Member>();
  for (const member of members) {
    if (member.status !== "active") continue;
    const first = member.name.split(/\s+/)[0]?.toLowerCase();
    if (!first || first.length < 2) continue;
    if (firstNames.has(first) && firstNames.get(first)?.id !== member.id) {
      firstNames.set(first, { ...member, id: "__ambiguous__" });
    } else if (!firstNames.has(first)) {
      firstNames.set(first, member);
    }
  }

  for (const [first, member] of firstNames) {
    if (member.id === "__ambiguous__" || member.id === authorId) continue;
    if (haystack.includes(`@${first}`)) {
      found.set(member.id, member);
    }
  }

  return [...found.values()];
}
