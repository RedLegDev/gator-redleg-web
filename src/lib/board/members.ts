import { displayNameFromEmail, parseAllowlist } from "./auth";
import type { Member, MemberRole, MemberStatus } from "./types";
import { newId, nowSec } from "./ids";

const MEMBER_COLS = `id, email, name, role, status`;

type MemberRow = Member;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function countActiveMembers(db: D1Database): Promise<number> {
  const row = await db
    .prepare(`SELECT COUNT(*) AS n FROM members WHERE status = 'active'`)
    .first<{ n: number }>();
  return row?.n ?? 0;
}

/** One-time import from legacy wrangler secrets when D1 roster is empty. */
export async function bootstrapMembersFromSecrets(
  db: D1Database,
  allowlistRaw: string | undefined,
  presidentRaw: string | undefined
): Promise<void> {
  if ((await countActiveMembers(db)) > 0) return;
  const emails = parseAllowlist(allowlistRaw);
  if (emails.length === 0) return;
  const presidents = new Set(parseAllowlist(presidentRaw));
  for (const email of emails) {
    await upsertMember(db, {
      email,
      name: displayNameFromEmail(email),
      role: presidents.has(email) ? "president" : "member",
      status: "active",
    });
  }
}

export async function canMemberLogin(
  db: D1Database,
  email: string,
  bootstrap?: { allowlist?: string; presidentAllowlist?: string }
): Promise<boolean> {
  if (bootstrap) {
    await bootstrapMembersFromSecrets(
      db,
      bootstrap.allowlist,
      bootstrap.presidentAllowlist
    );
  }
  const row = await db
    .prepare(
      `SELECT 1 FROM members WHERE email = ?1 AND status = 'active' LIMIT 1`
    )
    .bind(normalizeEmail(email))
    .first();
  return row != null;
}

export async function getActiveMemberByEmail(
  db: D1Database,
  email: string
): Promise<Member | null> {
  return db
    .prepare(
      `SELECT ${MEMBER_COLS} FROM members
       WHERE email = ?1 AND status = 'active' LIMIT 1`
    )
    .bind(normalizeEmail(email))
    .first<MemberRow>();
}

export async function getMemberByEmail(
  db: D1Database,
  email: string
): Promise<Member | null> {
  return db
    .prepare(`SELECT ${MEMBER_COLS} FROM members WHERE email = ?1 LIMIT 1`)
    .bind(normalizeEmail(email))
    .first<MemberRow>();
}

export async function getMemberById(
  db: D1Database,
  id: string
): Promise<Member | null> {
  return db
    .prepare(`SELECT ${MEMBER_COLS} FROM members WHERE id = ?1 LIMIT 1`)
    .bind(id)
    .first<MemberRow>();
}

export async function listActiveMembers(db: D1Database): Promise<Member[]> {
  const { results } = await db
    .prepare(
      `SELECT ${MEMBER_COLS} FROM members
       WHERE status = 'active'
       ORDER BY name COLLATE NOCASE`
    )
    .all<MemberRow>();
  return results ?? [];
}

export async function listAllMembers(db: D1Database): Promise<Member[]> {
  const { results } = await db
    .prepare(
      `SELECT ${MEMBER_COLS} FROM members ORDER BY status ASC, name COLLATE NOCASE`
    )
    .all<MemberRow>();
  return results ?? [];
}

export async function touchMemberLastSeen(
  db: D1Database,
  memberId: string
): Promise<void> {
  await db
    .prepare(`UPDATE members SET last_seen_at = ?2 WHERE id = ?1`)
    .bind(memberId, nowSec())
    .run();
}

export async function upsertMember(
  db: D1Database,
  args: {
    email: string;
    name: string;
    role: MemberRole;
    status: MemberStatus;
  }
): Promise<Member> {
  const email = normalizeEmail(args.email);
  const existing = await getMemberByEmail(db, email);
  const ts = nowSec();
  if (existing) {
    await db
      .prepare(
        `UPDATE members SET name = ?2, role = ?3, status = ?4, last_seen_at = ?5
         WHERE id = ?1`
      )
      .bind(existing.id, args.name.trim(), args.role, args.status, ts)
      .run();
    return { ...existing, name: args.name.trim(), role: args.role, status: args.status };
  }
  const id = newId();
  await db
    .prepare(
      `INSERT INTO members (id, email, name, role, status, created_at, last_seen_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)`
    )
    .bind(id, email, args.name.trim(), args.role, args.status, ts)
    .run();
  return {
    id,
    email,
    name: args.name.trim(),
    role: args.role,
    status: args.status,
  };
}

export async function createMember(
  db: D1Database,
  email: string,
  name: string,
  role: MemberRole = "member"
): Promise<Member | "duplicate"> {
  const normalized = normalizeEmail(email);
  if (await getMemberByEmail(db, normalized)) return "duplicate";
  if (role === "president") {
    await demoteOtherPresidents(db, null);
  }
  return upsertMember(db, {
    email: normalized,
    name,
    role,
    status: "active",
  });
}

export async function updateMember(
  db: D1Database,
  id: string,
  patch: { name?: string; role?: MemberRole; status?: MemberStatus }
): Promise<Member | null> {
  const existing = await getMemberById(db, id);
  if (!existing) return null;

  const name = patch.name?.trim() ?? existing.name;
  const role = patch.role ?? existing.role;
  const status = patch.status ?? existing.status;

  if (role === "president" && existing.role !== "president") {
    await demoteOtherPresidents(db, id);
  }

  await db
    .prepare(`UPDATE members SET name = ?2, role = ?3, status = ?4 WHERE id = ?1`)
    .bind(id, name, role, status)
    .run();
  return { ...existing, name, role, status };
}

async function demoteOtherPresidents(
  db: D1Database,
  exceptId: string | null
): Promise<void> {
  if (exceptId) {
    await db
      .prepare(
        `UPDATE members SET role = 'officer'
         WHERE role = 'president' AND id != ?1 AND status = 'active'`
      )
      .bind(exceptId)
      .run();
  } else {
    await db
      .prepare(
        `UPDATE members SET role = 'officer' WHERE role = 'president' AND status = 'active'`
      )
      .run();
  }
}

export async function countActivePresidents(db: D1Database): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM members
       WHERE status = 'active' AND role = 'president'`
    )
    .first<{ n: number }>();
  return row?.n ?? 0;
}

export async function countActiveMembersExcept(
  db: D1Database,
  memberId: string
): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM members
       WHERE status = 'active' AND id != ?1`
    )
    .bind(memberId)
    .first<{ n: number }>();
  return row?.n ?? 0;
}
