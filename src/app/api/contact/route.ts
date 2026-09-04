import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  buildEmailHtml,
  buildEmailText,
  buildSubject,
  type ContactData,
} from "@/lib/contact";

const RECIPIENT = "president@gatorredleg.org";
// Must be an address on the Cloudflare Email Sending-onboarded domain.
const FROM = { email: "noreply@gatorredleg.org", name: "Gator Redleg Contact" };

const REQUIRED_FIELDS: (keyof ContactData)[] = ["name", "email", "message"];

export async function POST(request: Request) {
  let body: Partial<ContactData>;
  try {
    body = (await request.json()) as Partial<ContactData>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: ContactData = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    subject: String(body.subject ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  const missing = REQUIRED_FIELDS.filter((f) => !data[f]);
  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const { env } = getCloudflareContext();
    await env.SEND_EMAIL.send({
      from: FROM,
      to: RECIPIENT,
      // Replies land in the sender's inbox, not a noreply void.
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
    console.error(`Contact message email failed: ${code}`, error);
    return Response.json(
      { error: "Unable to send your message right now." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
