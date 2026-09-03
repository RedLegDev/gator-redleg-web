import { newId, nowSec } from "./ids";
import type { AttachmentRow } from "./types";

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS_PER_POST = 5;

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
]);

export function isAllowedAttachmentType(contentType: string): boolean {
  return ALLOWED_TYPES.has(contentType.toLowerCase());
}

export function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "file";
  const cleaned = base.replace(/[^\w.\-() ]+/g, "_").trim();
  return cleaned.slice(0, 120) || "file";
}

export function attachmentR2Key(id: string, filename: string): string {
  return `attachments/${id}/${sanitizeFilename(filename)}`;
}

export function attachmentServePath(id: string): string {
  return `/api/board/attachments/${id}`;
}

export function isImageAttachment(contentType: string): boolean {
  return contentType.toLowerCase().startsWith("image/");
}

export async function storeAttachment(
  db: D1Database,
  r2: R2Bucket,
  args: {
    uploaderId: string;
    filename: string;
    contentType: string;
    sizeBytes: number;
    body: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob;
  }
): Promise<AttachmentRow> {
  const id = newId();
  const ts = nowSec();
  const safeName = sanitizeFilename(args.filename);
  const contentType = args.contentType.toLowerCase();
  const r2Key = attachmentR2Key(id, safeName);

  await r2.put(r2Key, args.body, {
    httpMetadata: { contentType },
  });

  await db
    .prepare(
      `INSERT INTO attachments
         (id, parent_type, parent_id, uploader_id, filename, content_type, size_bytes, r2_key, created_at)
       VALUES (?1, NULL, NULL, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
    .bind(
      id,
      args.uploaderId,
      safeName,
      contentType,
      args.sizeBytes,
      r2Key,
      ts
    )
    .run();

  return {
    id,
    parent_type: null,
    parent_id: null,
    uploader_id: args.uploaderId,
    filename: safeName,
    content_type: contentType,
    size_bytes: args.sizeBytes,
    r2_key: r2Key,
    created_at: ts,
  };
}

export async function listThreadAttachments(
  db: D1Database,
  messageId: string,
  commentIds: string[]
): Promise<{
  message: AttachmentRow[];
  byCommentId: Record<string, AttachmentRow[]>;
}> {
  const message = await listAttachments(db, "message", messageId);
  const byCommentId: Record<string, AttachmentRow[]> = {};
  for (const commentId of commentIds) {
    byCommentId[commentId] = await listAttachments(db, "comment", commentId);
  }
  return { message, byCommentId };
}

export async function linkAttachments(
  db: D1Database,
  attachmentIds: string[],
  parentType: "message" | "comment",
  parentId: string,
  uploaderId: string
): Promise<boolean> {
  if (attachmentIds.length === 0) return true;
  if (attachmentIds.length > MAX_ATTACHMENTS_PER_POST) return false;

  for (const attachmentId of attachmentIds) {
    const result = await db
      .prepare(
        `UPDATE attachments
            SET parent_type = ?2, parent_id = ?3
          WHERE id = ?1
            AND uploader_id = ?4
            AND parent_id IS NULL`
      )
      .bind(attachmentId, parentType, parentId, uploaderId)
      .run();
    if ((result.meta.changes ?? 0) !== 1) return false;
  }
  return true;
}

export async function listAttachments(
  db: D1Database,
  parentType: "message" | "comment",
  parentId: string
): Promise<AttachmentRow[]> {
  const { results } = await db
    .prepare(
      `SELECT id, parent_type, parent_id, uploader_id, filename, content_type,
              size_bytes, r2_key, created_at
       FROM attachments
       WHERE parent_type = ?1 AND parent_id = ?2
       ORDER BY created_at ASC`
    )
    .bind(parentType, parentId)
    .all<AttachmentRow>();
  return results ?? [];
}

export async function getAttachment(
  db: D1Database,
  id: string
): Promise<AttachmentRow | null> {
  return db
    .prepare(
      `SELECT id, parent_type, parent_id, uploader_id, filename, content_type,
              size_bytes, r2_key, created_at
       FROM attachments WHERE id = ?1`
    )
    .bind(id)
    .first<AttachmentRow>();
}
