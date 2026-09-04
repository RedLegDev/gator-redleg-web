import {
  countActiveMembersExcept,
  countActivePresidents,
  getMemberById,
  updateMember,
} from "@/lib/board/db";
import type { MemberRole, MemberStatus } from "@/lib/board/types";
import { getDb } from "@/lib/board/secrets";
import { requirePresidentApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requirePresidentApi();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const db = getDb();
  const existing = await getMemberById(db, id);
  if (!existing) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    role?: MemberRole;
    status?: MemberStatus;
  };

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

  if (
    existing.role === "president" &&
    existing.status === "active" &&
    body.role &&
    body.role !== "president" &&
    body.status !== "revoked"
  ) {
    const presidents = await countActivePresidents(db);
    if (presidents <= 1) {
      return Response.json(
        { ok: false, error: "Promote another president before demoting this one" },
        { status: 400 }
      );
    }
  }

  if (
    existing.role === "president" &&
    existing.status === "active" &&
    body.status === "revoked"
  ) {
    const presidents = await countActivePresidents(db);
    if (presidents <= 1) {
      return Response.json(
        { ok: false, error: "Promote another president before revoking this one" },
        { status: 400 }
      );
    }
  }

  const updated = await updateMember(db, id, body);
  return Response.json({ ok: true, data: updated });
}
