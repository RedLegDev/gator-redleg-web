import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "./auth";
import {
  bootstrapMembersFromSecrets,
  getActiveMemberByEmail,
} from "./db";
import { secret, getDb } from "./secrets";
import type { Member } from "./types";

async function legacyBootstrap(): Promise<void> {
  await bootstrapMembersFromSecrets(
    getDb(),
    secret("BOARD_ALLOWLIST"),
    secret("BOARD_PRESIDENT_ALLOWLIST")
  );
}

export async function getSessionEmail(): Promise<string | null> {
  const signingKey = secret("BOARD_SESSION_SECRET");
  if (!signingKey) return null;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  const email = await verifySession(
    value,
    signingKey,
    Math.floor(Date.now() / 1000)
  );
  if (!email) return null;
  await legacyBootstrap();
  const member = await getActiveMemberByEmail(getDb(), email);
  return member?.email ?? null;
}

export async function getMember(): Promise<Member | null> {
  const email = await getSessionEmail();
  if (!email) return null;
  return getActiveMemberByEmail(getDb(), email);
}

/** Authorization boundary for board pages and API routes. */
export async function requireMember(): Promise<Member> {
  const member = await getMember();
  if (!member) redirect("/board/login");
  return member;
}

export async function requireMemberApi(): Promise<Member | Response> {
  const member = await getMember();
  if (!member) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return member;
}

/** Display label only — board features are not gated on role. */
export function isPresident(member: Member): boolean {
  return member.role === "president";
}
