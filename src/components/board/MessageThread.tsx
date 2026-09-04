"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoardMarkdown } from "./BoardMarkdown";
import {
  BoardAttachmentList,
  BoardAttachmentPicker,
} from "./BoardAttachments";
import type {
  AttachmentMeta,
  CommentWithAuthor,
  InboundEmailMeta,
  MessageWithMeta,
} from "@/lib/board/types";
import { formatBoardTimestamp } from "@/lib/board/format";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardButtonSecondaryClass,
  boardInsetPanelClass,
  boardPanelClass,
} from "@/lib/board/ui";

type PendingAttachment = AttachmentMeta & { url: string };
type ComposerMode = "comment" | "respond";

export function MessageThread({
  message,
  comments: initialComments,
  messageAttachments,
  commentAttachments,
  canPin,
  inbound,
  sendFromAddresses = [],
  defaultFromAddress = "",
}: {
  message: MessageWithMeta;
  comments: CommentWithAuthor[];
  messageAttachments: AttachmentMeta[];
  commentAttachments: Record<string, AttachmentMeta[]>;
  canPin: boolean;
  inbound: InboundEmailMeta | null;
  sendFromAddresses?: string[];
  defaultFromAddress?: string;
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [commentAttachmentsState, setCommentAttachmentsState] =
    useState(commentAttachments);
  const [bodyMd, setBodyMd] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [notifyAll, setNotifyAll] = useState(true);
  const [pinned, setPinned] = useState(message.pinned === 1);
  const [archived, setArchived] = useState(message.status === "archived");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ComposerMode>("comment");
  const [fromAddress, setFromAddress] = useState(
    defaultFromAddress || sendFromAddresses[0] || ""
  );

  const isEmailThread = Boolean(inbound);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!bodyMd.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/board/messages/${message.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bodyMd,
        attachmentIds: attachments.map((a) => a.id),
        notify: notifyAll,
      }),
    });
    const json = (await res.json()) as {
      data?: CommentWithAuthor;
      error?: string;
    };
    if (res.ok && json.data) {
      setComments((c) => [...c, json.data!]);
      setCommentAttachmentsState((prev) => ({
        ...prev,
        [json.data!.id]: attachments.map(
          ({ id, filename, content_type, size_bytes }) => ({
            id,
            filename,
            content_type,
            size_bytes,
          })
        ),
      }));
      setBodyMd("");
      setAttachments([]);
      router.refresh();
    } else {
      setError(json.error ?? "Could not save comment.");
    }
    setSaving(false);
  }

  async function submitRespond(e: React.FormEvent) {
    e.preventDefault();
    if (!bodyMd.trim() || !inbound) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/board/messages/${message.id}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: bodyMd, fromAddress }),
    });
    const json = (await res.json()) as {
      data?: CommentWithAuthor;
      error?: string;
    };
    if (res.ok && json.data) {
      setComments((c) => [...c, json.data!]);
      setBodyMd("");
      setMode("comment");
      router.refresh();
    } else {
      setError(json.error ?? "Could not send reply.");
    }
    setSaving(false);
  }

  async function togglePin() {
    if (archived) return;
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

  async function toggleArchive() {
    const next = !archived;
    const res = await fetch(`/api/board/messages/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: next }),
    });
    if (res.ok) {
      setArchived(next);
      if (next) {
        setPinned(false);
        // Leave the thread so it disappears from the default (active) list
        router.push("/board/messages");
        return;
      }
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <article className={`p-4 shadow-sm sm:p-6 lg:p-8 ${boardPanelClass}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {pinned && !archived && (
              <span className="mb-2 inline-block rounded bg-gold/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-artillery">
                Pinned
              </span>
            )}
            {archived && (
              <span className="mb-2 mr-2 inline-block rounded bg-neutral-200/80 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                Archived
              </span>
            )}
            {isEmailThread && (
              <span className="mb-2 mr-2 inline-block rounded bg-redleg/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-redleg">
                Inbound email
              </span>
            )}
            <h2 className="font-display text-xl font-semibold text-artillery sm:text-2xl lg:text-3xl">
              {message.subject}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {message.author_name} ·{" "}
              {formatBoardTimestamp(message.created_at)}
            </p>
            {inbound && (
              <p className="mt-1 text-sm text-neutral-500">
                From {inbound.from_address}
                {inbound.to_address ? ` → ${inbound.to_address}` : ""}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {canPin && !archived && (
              <button
                type="button"
                onClick={togglePin}
                className="text-xs font-semibold uppercase tracking-wide text-redleg hover:underline"
              >
                {pinned ? "Unpin" : "Pin"}
              </button>
            )}
            <button
              type="button"
              onClick={toggleArchive}
              className="text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-artillery hover:underline"
            >
              {archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-4">
          <BoardMarkdown content={message.body_md} />
          <BoardAttachmentList attachments={messageAttachments} />
        </div>
      </article>

      <section className="space-y-4">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-600">
          Thread ({comments.length})
        </h3>
        {comments.map((c) => (
          <div key={c.id} className={`p-4 lg:p-5 ${boardInsetPanelClass}`}>
            <div className="flex flex-wrap items-center gap-2">
              {c.email_reply ? (
                <span className="rounded bg-artillery/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-artillery">
                  Sent reply
                </span>
              ) : (
                <span className="rounded bg-neutral-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                  Internal
                </span>
              )}
              <p className="text-xs text-neutral-500">
                {c.author_name} · {formatBoardTimestamp(c.created_at)}
                {c.email_reply
                  ? ` · to ${c.email_reply.to_address}`
                  : ""}
              </p>
            </div>
            <div className="mt-2">
              <BoardMarkdown content={c.body_md} />
              <BoardAttachmentList
                attachments={commentAttachmentsState[c.id] ?? []}
              />
            </div>
          </div>
        ))}

        <div className={`space-y-3 p-4 lg:p-6 ${boardInsetPanelClass}`}>
          {isEmailThread && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode("comment");
                  setError(null);
                }}
                className={
                  mode === "comment"
                    ? boardButtonPrimaryClass
                    : boardButtonSecondaryClass
                }
              >
                Internal comment
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("respond");
                  setAttachments([]);
                  setError(null);
                }}
                className={
                  mode === "respond"
                    ? boardButtonPrimaryClass
                    : boardButtonSecondaryClass
                }
              >
                Respond
              </button>
            </div>
          )}

          {mode === "respond" && inbound ? (
            <form onSubmit={submitRespond} className="space-y-3">
              <p className="text-sm text-neutral-600">
                Sends email to <strong>{inbound.from_address}</strong>. Replies
                return to <strong>board@gatorredleg.org</strong> and post here.
              </p>
              {sendFromAddresses.length > 0 && (
                <label className="block">
                  <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Send as
                  </span>
                  <select
                    className={boardInputClass}
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                  >
                    {sendFromAddresses.map((addr) => (
                      <option key={addr} value={addr}>
                        {addr}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <textarea
                className={`${boardInputClass} min-h-28`}
                placeholder="Write the reply that will be emailed…"
                value={bodyMd}
                onChange={(e) => setBodyMd(e.target.value)}
              />
              {error && (
                <p className="text-sm text-redleg" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={saving}
                className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
              >
                {saving ? "Sending…" : "Send reply"}
              </button>
            </form>
          ) : (
            <form onSubmit={submitComment} className="space-y-3">
              {isEmailThread && (
                <p className="text-sm text-neutral-600">
                  Board-only — the external sender will not see this.
                </p>
              )}
              <textarea
                className={`${boardInputClass} min-h-24`}
                placeholder={
                  isEmailThread ? "Add an internal comment…" : "Add a comment…"
                }
                value={bodyMd}
                onChange={(e) => setBodyMd(e.target.value)}
              />
              <BoardAttachmentPicker
                value={attachments}
                onChange={setAttachments}
                disabled={saving}
              />
              <label className="flex items-start gap-2.5 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={notifyAll}
                  onChange={(e) => setNotifyAll(e.target.checked)}
                  disabled={saving}
                  className="mt-0.5 h-4 w-4 accent-redleg"
                />
                <span>
                  Notify all active members by email
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    @mentions are always emailed, even if this is off.
                  </span>
                </span>
              </label>
              {error && (
                <p className="text-sm text-redleg" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={saving}
                className={`${boardButtonPrimaryClass} w-full bg-artillery hover:bg-neutral-800 sm:w-auto`}
              >
                {saving ? "Saving…" : "Comment"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
