import { getDb } from "@/lib/board/secrets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getDb().prepare("SELECT 1").first();
    return Response.json({ ok: true, db: "connected" });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : "db error" },
      { status: 503 }
    );
  }
}
