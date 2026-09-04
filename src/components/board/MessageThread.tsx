"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoardMarkdown } from "./BoardMarkdown";
import {
  BoardAttachmentList,
  BoardAttachmentPicker,
} from "./BoardAttachments";
import type { AttachmentMeta, CommentWithAuthor, MessageWithMeta } from "@/lib/board/types";
import { formatBoardTimestamp } from "@/lib/board/format";
import { boardInputClass, boardButtonPrimaryClass } from "@/lib/board/ui";

type PendingAttachment = AttachmentMeta & { url: string };

export function MessageThread({
  message,
  comments: initialComments,
  messageAttachments,
  commentAttachments,
  canPin,
}: {
  message: MessageWithMeta;
  comments: CommentWithAuthor[];
  messageAttachments: AttachmentMeta[];
  commentAttachments: Record<string, AttachmentMeta[]>;
  canPin: boolean;
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [commentAttachmentsState, setCommentAttachmentsState] =
    useState(commentAttachments);
  const [bodyMd, setBodyMd] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [pinned, setPinned] = useState(message.pinned === 1);
  const [saving, setSaving] = useState(false);

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!bodyMd.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/board/messages/${message.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bodyMd,
        attachmentIds: attachments.map((a) => a.id),
      }),
    });
    const json = (await res.json()) as {
      data?: CommentWithAuthor & { author_name?: string };
    };
    if (res.ok && json.data) {
      setComments((c) => [...c, json.data!]);
      setCommentAttachmentsState((prev) => ({
        ...prev,
        [json.data!.id]: attachments.map(({ id, filename, content_type, size_bytes }) => ({
          id,
          filename,
          content_type,
          size_bytes,
        })),
      }));
      setBodyMd("");
      setAttachments([]);
      router.refresh();
    }
    setSaving(false);
  }

  async function togglePin() {
    const res = await fetch(`/api/board/messages/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !pinned }),
    });
    if (res.ok) {
      setPinned(!pinned);
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <article className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {pinned && (
              <span className="mb-2 inline-block rounded bg-gold/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-artillery">
                Pinned
              </span>
            )}
            <h2 className="font-display text-lg font-semibold text-artillery sm:text-xl">
              {message.subject}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {message.author_name} ·{" "}
              {formatBoardTimestamp(message.created_at)}
            </p>
          </div>
          {canPin && (
            <button
              type="button"
              onClick={togglePin}
              className="text-xs font-semibold uppercase tracking-wide text-redleg hover:underline"
            >
              {pinned ? "Unpin" : "Pin"}
            </button>
          )}
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-4">
          <BoardMarkdown content={message.body_md} />
          <BoardAttachmentList attachments={messageAttachments} />
        </div>
      </article>

      <section className="space-y-4">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-600">
          Comments ({comments.length})
        </h3>
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border border-neutral-100 bg-neutral-50 p-4"
          >
            <p className="text-xs text-neutral-500">
              {c.author_name} · {formatBoardTimestamp(c.created_at)}
            </p>
            <div className="mt-2">
              <BoardMarkdown content={c.body_md} />
              <BoardAttachmentList attachments={commentAttachmentsState[c.id] ?? []} />
            </div>
          </div>
        ))}
        <form onSubmit={addComment} className="space-y-2">
          <textarea
            className={`${boardInputClass} min-h-24`}
            placeholder="Add a comment…"
            value={bodyMd}
            onChange={(e) => setBodyMd(e.target.value)}
          />
          <BoardAttachmentPicker
            value={attachments}
            onChange={setAttachments}
            disabled={saving}
          />
          <button
            type="submit"
            disabled={saving}
            className={`${boardButtonPrimaryClass} w-full bg-artillery hover:bg-neutral-800 sm:w-auto`}
          >
            {saving ? "Saving…" : "Comment"}
          </button>
        </form>
      </section>
    </div>
  );
}
