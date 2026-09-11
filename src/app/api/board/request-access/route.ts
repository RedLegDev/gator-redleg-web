import { publishFormToBoard } from "@/lib/board/form-intake";
import { countRecentAccessRequests } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import {
  buildBoardSubject,
  buildEmailHtml,
  buildEmailText,
  type AccessRequestData,
} from "@/lib/access-request";

export const dynamic = "force-dynamic";

const REQUEST_RATE_LIMIT = 3;
const REQUEST_RATE_WINDOW_SEC = 15 * 60;

const REQUIRED_FIELDS: (keyof AccessRequestData)[] = [
  "name",
  "email",
  "unit",
  "reason",
];

export async function POST(request: Request) {
  let body: Partial<AccessRequestData>;
  try {
    body = (await request.json()) as Partial<AccessRequestData>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: AccessRequestData = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    rank: String(body.rank ?? "").trim(),
    unit: String(body.unit ?? "").trim(),
    reason: String(body.reason ?? "").trim(),
  };

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]);
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Always-ok from here — do not reveal roster membership or rate-limit state.
  const ok = Response.json({ ok: true });

  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const recent = await countRecentAccessRequests(
    db,
    data.email,
    now - REQUEST_RATE_WINDOW_SEC
  );
  if (recent >= REQUEST_RATE_LIMIT) return ok;

  try {
    await publishFormToBoard({
      from: data.email,
      subject: buildBoardSubject(data),
      subjectPrefix: "[Access Request]",
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";
    console.error(`Access request board post failed: ${code}`, error);
    return Response.json(
      { error: "Unable to send your request right now." },
      { status: 502 }
    );
  }

  return ok;
}
