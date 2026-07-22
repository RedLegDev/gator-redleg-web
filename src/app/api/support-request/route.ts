import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  buildEmailHtml,
  buildEmailText,
  buildSubject,
  isValidProgram,
  type SupportRequestData,
} from "@/lib/support-request";
import { BOARD_CC } from "@/lib/email";

const RECIPIENT = "president@gatorredleg.org";
// Must be an address on the Cloudflare Email Sending-onboarded domain.
const FROM = { email: "noreply@gatorredleg.org", name: "Gator Redleg Support" };

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
    const { env } = getCloudflareContext();
    await env.SEND_EMAIL.send({
      from: FROM,
      to: RECIPIENT,
      cc: BOARD_CC,
      // Replies land in the requester's inbox, not a noreply void.
      replyTo: data.email,
      subject: buildSubject(data),
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";
    console.error(`Support request email failed: ${code}`, error);
    return Response.json(
      { error: "Unable to send the request right now." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
