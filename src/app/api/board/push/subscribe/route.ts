import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  deletePushSubscription,
  getVapidPublicKey,
  upsertPushSubscription,
} from "@/lib/board/push";
import { getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;
  const { env } = getCloudflareContext();
  const publicKey = getVapidPublicKey(env);
  if (!publicKey) {
    return Response.json(
      { ok: false, error: "Push not configured" },
      { status: 503 }
    );
  }
  return Response.json({ ok: true, data: { publicKey } });
}

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as {
    endpoint?: string;
    keys?: { p256dh?: string; auth?: string };
  };
  const endpoint = String(body.endpoint ?? "").trim();
  const p256dh = String(body.keys?.p256dh ?? "").trim();
  const authKey = String(body.keys?.auth ?? "").trim();
  if (!endpoint.startsWith("https://") || !p256dh || !authKey) {
    return Response.json({ ok: false, error: "Invalid subscription" }, { status: 400 });
  }

  const row = await upsertPushSubscription(getDb(), {
    memberId: auth.id,
    endpoint,
    p256dh,
    auth: authKey,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return Response.json({ ok: true, data: { id: row.id } }, { status: 201 });
}

export async function DELETE(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const body = (await request.json().catch(() => ({}))) as { endpoint?: string };
  const endpoint = String(body.endpoint ?? "").trim();
  if (!endpoint) {
    return Response.json({ ok: false, error: "endpoint required" }, { status: 400 });
  }

  await deletePushSubscription(getDb(), auth.id, endpoint);
  return Response.json({ ok: true });
}
