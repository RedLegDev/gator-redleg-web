import {
  addSendIdentity,
  listSendIdentitiesForMember,
  removeSendIdentity,
  setDefaultSendIdentity,
} from "@/lib/board/send-identities";
import { getMemberById } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

function canManageSendIdentities(auth: { role: string }) {
  return auth.role === "president" || auth.role === "officer";
}

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  if (id !== auth.id && !canManageSendIdentities(auth)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const db = getDb();
  const member = await getMemberById(db, id);
  if (!member) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const identities = await listSendIdentitiesForMember(db, id);
  return Response.json({ ok: true, data: identities });
}

export async function POST(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  if (!canManageSendIdentities(auth)) {
    return Response.json(
      { ok: false, error: "President or officer only" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const db = getDb();
  const member = await getMemberById(db, id);
  if (!member) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    fromAddress?: string;
    isDefault?: boolean;
  };
  const result = await addSendIdentity(
    db,
    id,
    String(body.fromAddress ?? ""),
    Boolean(body.isDefault)
  );
  if ("error" in result) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }
  return Response.json({ ok: true, data: result }, { status: 201 });
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  if (!canManageSendIdentities(auth)) {
    return Response.json(
      { ok: false, error: "President or officer only" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    identityId?: string;
    action?: string;
  };
  const identityId = String(body.identityId ?? "");
  if (!identityId) {
    return Response.json({ ok: false, error: "identityId required" }, { status: 400 });
  }

  const db = getDb();
  if (body.action === "default") {
    const ok = await setDefaultSendIdentity(db, id, identityId);
    if (!ok) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: "Unknown action" }, { status: 400 });
}

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  if (!canManageSendIdentities(auth)) {
    return Response.json(
      { ok: false, error: "President or officer only" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const url = new URL(request.url);
  const identityId = url.searchParams.get("identityId") ?? "";
  if (!identityId) {
    return Response.json({ ok: false, error: "identityId required" }, { status: 400 });
  }

  const ok = await removeSendIdentity(getDb(), id, identityId);
  if (!ok) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
