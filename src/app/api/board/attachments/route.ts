import {
  attachmentServePath,
  isAllowedAttachmentType,
  MAX_ATTACHMENT_BYTES,
  storeAttachment,
} from "@/lib/board/attachments";
import { getAttachmentsBucket, getDb } from "@/lib/board/secrets";
import { requireMemberApi } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await requireMemberApi();
  if (auth instanceof Response) return auth;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "file required" }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_ATTACHMENT_BYTES) {
    return Response.json(
      { ok: false, error: "File must be 5MB or smaller" },
      { status: 400 }
    );
  }

  const contentType = (file.type || "application/octet-stream").toLowerCase();
  if (!isAllowedAttachmentType(contentType)) {
    return Response.json(
      { ok: false, error: "Only PNG, JPG, and PDF files are allowed" },
      { status: 400 }
    );
  }

  const row = await storeAttachment(getDb(), getAttachmentsBucket(), {
    uploaderId: auth.id,
    filename: file.name,
    contentType,
    sizeBytes: file.size,
    body: file.stream(),
  });

  return Response.json(
    {
      ok: true,
      data: {
        id: row.id,
        filename: row.filename,
        contentType: row.content_type,
        sizeBytes: row.size_bytes,
        url: attachmentServePath(row.id),
      },
    },
    { status: 201 }
  );
}
