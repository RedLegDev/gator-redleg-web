import {
  countActiveMembersExcept,
  getMemberById,
  updateMember,
} from "@/lib/board/db";
import type { MemberStatus } from "@/lib/board/types";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const db = getDb();
  const existing = await getMemberById(db, id);
  if (!existing) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    status?: MemberStatus;
    role?: unknown;
  };

  if (body.role !== undefined) {
    return Response.json(
      { ok: false, error: "Role cannot be changed here" },
      { status: 400 }
    );
  }

  if (body.status === "revoked" && existing.id === auth.id) {
    return Response.json(
      { ok: false, error: "Cannot revoke your own access" },
      { status: 400 }
    );
  }

  if (body.status === "revoked" && existing.status === "active") {
    const others = await countActiveMembersExcept(db, id);
    if (others === 0) {
      return Response.json(
        { ok: false, error: "Cannot revoke the last active member" },
        { status: 400 }
      );
    }
  }

  const updated = await updateMember(db, id, body);
  return Response.json({ ok: true, data: updated });
}
