import { getAttachment } from "@/lib/board/attachments";
import { getAttachmentsBucket, getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const { id } = await params;
  const db = getDb();
  const attachment = await getAttachment(db, id);
  if (!attachment) {
    return new Response(null, { status: 404 });
  }

  const obj = await getAttachmentsBucket().get(attachment.r2_key);
  if (!obj) {
    return new Response(null, { status: 404 });
  }

  const contentType =
    obj.httpMetadata?.contentType ?? attachment.content_type ?? "application/octet-stream";
  const disposition =
    contentType.startsWith("image/") || contentType === "application/pdf"
      ? "inline"
      : "attachment";

  return new Response(obj.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${disposition}; filename="${attachment.filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=86400",
    },
  });
}
