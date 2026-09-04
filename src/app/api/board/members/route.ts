import {
  createMember,
  listAllMembers,
} from "@/lib/board/db";
import type { MemberRole } from "@/lib/board/types";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const db = getDb();
  const members = await listAllMembers(db);
  return Response.json({ ok: true, data: members });
}

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    name?: string;
    role?: MemberRole;
  };
  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();
  const role = (body.role ?? "member") as MemberRole;

  if (!email || !name) {
    return Response.json(
      { ok: false, error: "email and name required" },
      { status: 400 }
    );
  }
  if (!["president", "officer", "member"].includes(role)) {
    return Response.json({ ok: false, error: "invalid role" }, { status: 400 });
  }

  const result = await createMember(getDb(), email, name, role);
  if (result === "duplicate") {
    return Response.json(
      { ok: false, error: "Member already exists" },
      { status: 409 }
    );
  }
  return Response.json({ ok: true, data: result }, { status: 201 });
}
