import type { SendIdentity } from "./types";
import { BOARD_INBOX_ADDRESS, BOARD_RESPOND_FROM } from "./email";
import { newId, nowSec } from "./ids";

const CHAPTER_DOMAIN = "@gatorredleg.org";

export function normalizeChapterFromAddress(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email.endsWith(CHAPTER_DOMAIN)) return null;
  if (!/^[a-z0-9._+-]+@gatorredleg\.org$/.test(email)) return null;
  return email;
}

/** Shared chapter From always available to every active member. */
export function sharedSendAddresses(): string[] {
  return [BOARD_RESPOND_FROM.email, BOARD_INBOX_ADDRESS].filter(
    (v, i, a) => a.indexOf(v) === i
  );
}

export async function listSendIdentitiesForMember(
  db: D1Database,
  memberId: string
): Promise<SendIdentity[]> {
  const { results } = await db
    .prepare(
      `SELECT id, member_id, from_address, is_default, created_at
       FROM member_send_identities
       WHERE member_id = ?1
       ORDER BY is_default DESC, from_address ASC`
    )
    .bind(memberId)
    .all<SendIdentity>();
  return results ?? [];
}

/** Allowed From list for Respond: shared board@ + member assignments. */
export async function listAllowedFromAddresses(
  db: D1Database,
  memberId: string
): Promise<{ addresses: string[]; defaultAddress: string }> {
  const rows = await listSendIdentitiesForMember(db, memberId);
  const assigned = rows.map((r) => r.from_address.toLowerCase());
  const addresses = [
    ...sharedSendAddresses(),
    ...assigned.filter((a) => !sharedSendAddresses().includes(a)),
  ];
  const defaultRow = rows.find((r) => r.is_default === 1);
  const defaultAddress =
    defaultRow?.from_address.toLowerCase() ?? BOARD_RESPOND_FROM.email;
  return { addresses, defaultAddress };
}

export async function addSendIdentity(
  db: D1Database,
  memberId: string,
  fromAddressRaw: string,
  makeDefault = false
): Promise<SendIdentity | { error: string }> {
  const fromAddress = normalizeChapterFromAddress(fromAddressRaw);
  if (!fromAddress) {
    return { error: "From address must be @gatorredleg.org" };
  }

  const id = newId();
  const ts = nowSec();
  if (makeDefault) {
    await db
      .prepare(
        `UPDATE member_send_identities SET is_default = 0 WHERE member_id = ?1`
      )
      .bind(memberId)
      .run();
  }

  try {
    await db
      .prepare(
        `INSERT INTO member_send_identities
           (id, member_id, from_address, is_default, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5)`
      )
      .bind(id, memberId, fromAddress, makeDefault ? 1 : 0, ts)
      .run();
  } catch {
    return { error: "That From address is already assigned to this member" };
  }

  return {
    id,
    member_id: memberId,
    from_address: fromAddress,
    is_default: makeDefault ? 1 : 0,
    created_at: ts,
  };
}

export async function removeSendIdentity(
  db: D1Database,
  memberId: string,
  identityId: string
): Promise<boolean> {
  const result = await db
    .prepare(
      `DELETE FROM member_send_identities WHERE id = ?1 AND member_id = ?2`
    )
    .bind(identityId, memberId)
    .run();
  return (result.meta.changes ?? 0) === 1;
}

export async function setDefaultSendIdentity(
  db: D1Database,
  memberId: string,
  identityId: string
): Promise<boolean> {
  const existing = await db
    .prepare(
      `SELECT id FROM member_send_identities WHERE id = ?1 AND member_id = ?2`
    )
    .bind(identityId, memberId)
    .first<{ id: string }>();
  if (!existing) return false;

  await db
    .prepare(
      `UPDATE member_send_identities SET is_default = 0 WHERE member_id = ?1`
    )
    .bind(memberId)
    .run();
  await db
    .prepare(
      `UPDATE member_send_identities SET is_default = 1 WHERE id = ?1 AND member_id = ?2`
    )
    .bind(identityId, memberId)
    .run();
  return true;
}

export function displayNameForFrom(
  fromAddress: string,
  memberName: string
): string {
  if (fromAddress === BOARD_RESPOND_FROM.email) return BOARD_RESPOND_FROM.name;
  return memberName;
}
