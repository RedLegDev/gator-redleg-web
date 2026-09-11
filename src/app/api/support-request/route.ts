import { publishFormToBoard } from "@/lib/board/form-intake";
import {
  buildBoardSubject,
  buildEmailHtml,
  buildEmailText,
  isValidProgram,
  type SupportRequestData,
} from "@/lib/support-request";

const REQUIRED_FIELDS: (keyof SupportRequestData)[] = [
  "requesterName",
  "unit",
  "email",
  "eventDate",
  "requestType",
  "description",
];

export async function POST(request: Request) {
  let body: Partial<SupportRequestData>;
  try {
    body = (await request.json()) as Partial<SupportRequestData>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: SupportRequestData = {
    requesterName: String(body.requesterName ?? "").trim(),
    unit: String(body.unit ?? "").trim(),
    email: String(body.email ?? "").trim(),
    eventDate: String(body.eventDate ?? "").trim(),
    requestType: String(body.requestType ?? "").trim(),
    amount: String(body.amount ?? "").trim(),
    description: String(body.description ?? "").trim(),
  };

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]);
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }
  if (!isValidProgram(data.requestType)) {
    return Response.json({ error: "Unknown support program." }, { status: 400 });
  }

  try {
    await publishFormToBoard({
      from: data.email,
      subject: buildBoardSubject(data),
      subjectPrefix: "[Support]",
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";
    console.error(`Support request board post failed: ${code}`, error);
    return Response.json(
      { error: "Unable to send the request right now." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
