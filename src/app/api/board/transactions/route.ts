import { requireMemberApi } from "@/lib/board/session";
import { fetchStoreTransactions } from "@/lib/board/store-proxy";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const result = await fetchStoreTransactions(searchParams);
    if (!result.ok) {
      return Response.json(
        { ok: false, error: result.error },
        { status: result.status }
      );
    }
    return Response.json({ ok: true, data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load transactions";
    const status = message.includes("not configured") ? 503 : 500;
    return Response.json({ ok: false, error: message }, { status });
  }
}
