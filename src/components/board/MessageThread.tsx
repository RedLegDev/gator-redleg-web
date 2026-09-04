"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoardAvatar } from "./BoardChrome";
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
import { cn } from "@/lib/cn";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardButtonSecondaryClass,
  boardPanelClass,
} from "@/lib/board/ui";

type PendingAttachment = AttachmentMeta & { url: string };
type ComposerMode = "comment" | "respond";

function MetaChip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "redleg" | "artillery";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
        tone === "gold" && "bg-gold/15 text-artillery",
        tone === "redleg" && "bg-redleg/10 text-redleg",
        tone === "artillery" && "bg-artillery/10 text-artillery",
        tone === "neutral" && "bg-neutral-100 text-neutral-600"
      )}
    >
      {children}
    </span>
  );
}

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
  const replyCount = comments.length;

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
        router.push("/board/messages");
        return;
      }
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 lg:space-y-10">
      {/* Original post */}
      <article className={cn("relative overflow-hidden", boardPanelClass)}>
        {pinned && !archived && (
          <span
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold to-redleg"
            aria-hidden
          />
        )}

        <header className="border-b border-neutral-100 px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              {(pinned || archived || isEmailThread) && (
                <div className="flex flex-wrap gap-1.5">
                  {pinned && !archived && <MetaChip tone="gold">Pinned</MetaChip>}
                  {archived && <MetaChip>Archived</MetaChip>}
                  {isEmailThread && (
                    <MetaChip tone="redleg">Inbound email</MetaChip>
                  )}
                </div>
              )}
              <h1 className="font-display text-2xl font-semibold leading-snug tracking-tight text-artillery sm:text-3xl">
                {message.subject}
              </h1>
              <div className="flex items-start gap-3">
                <BoardAvatar name={message.author_name} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-artillery">
                    {message.author_name}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {formatBoardTimestamp(message.created_at)}
                  </p>
                  {inbound && (
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                      <span className="font-medium text-neutral-600">From</span>{" "}
                      {inbound.from_address}
                      {inbound.to_address ? (
                        <>
                          {" "}
                          <span className="text-neutral-400">→</span>{" "}
                          {inbound.to_address}
                        </>
                      ) : null}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {canPin && !archived && (
                <button
                  type="button"
                  onClick={togglePin}
                  className={boardButtonSecondaryClass}
                >
                  {pinned ? "Unpin" : "Pin"}
                </button>
              )}
              <button
                type="button"
                onClick={toggleArchive}
                className={boardButtonSecondaryClass}
              >
                {archived ? "Unarchive" : "Archive"}
              </button>
            </div>
          </div>
        </header>

        <div className="px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
          <BoardMarkdown content={message.body_md} />
          <BoardAttachmentList attachments={messageAttachments} />
        </div>
      </article>

      {/* Discussion */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 border-b border-neutral-200/80 pb-3">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Discussion
          </h2>
          <p className="text-xs text-neutral-400">
            {replyCount === 0
              ? "No replies yet"
              : `${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
          </p>
        </div>

        {comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((c) => {
              const isOutbound = Boolean(c.email_reply);
              return (
                <li
                  key={c.id}
                  className={cn(
                    "rounded-xl border bg-white px-4 py-4 sm:px-5 sm:py-5",
                    isOutbound
                      ? "border-artillery/15 shadow-sm"
                      : "border-neutral-200/90"
                  )}
                >
                  <div className="flex gap-3">
                    <BoardAvatar
                      name={c.author_name}
                      size="sm"
                      tone={isOutbound ? "brand" : "neutral"}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-artillery">
                          {c.author_name}
                        </p>
                        <MetaChip tone={isOutbound ? "artillery" : "neutral"}>
                          {isOutbound ? "Sent reply" : "Internal"}
                        </MetaChip>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        {formatBoardTimestamp(c.created_at)}
                        {c.email_reply
                          ? ` · to ${c.email_reply.to_address}`
                          : ""}
                      </p>
                      <div className="mt-3">
                        <BoardMarkdown content={c.body_md} />
                        <BoardAttachmentList
                          attachments={commentAttachmentsState[c.id] ?? []}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Composer */}
        <div className={cn("overflow-hidden", boardPanelClass)}>
          {isEmailThread && (
            <div
              className="grid grid-cols-2 border-b border-neutral-200 bg-neutral-50/80"
              role="tablist"
              aria-label="Reply type"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "comment"}
                onClick={() => {
                  setMode("comment");
                  setError(null);
                }}
                className={cn(
                  "px-4 py-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                  mode === "comment"
                    ? "border-b-2 border-redleg bg-white text-artillery"
                    : "text-neutral-500 hover:text-artillery"
                )}
              >
                Internal comment
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "respond"}
                onClick={() => {
                  setMode("respond");
                  setAttachments([]);
                  setError(null);
                }}
                className={cn(
                  "px-4 py-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                  mode === "respond"
                    ? "border-b-2 border-redleg bg-white text-artillery"
                    : "text-neutral-500 hover:text-artillery"
                )}
              >
                Respond by email
              </button>
            </div>
          )}

          <div className="space-y-4 p-5 sm:p-6 lg:p-7">
            {mode === "respond" && inbound ? (
              <form onSubmit={submitRespond} className="space-y-4">
                <p className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-3 text-sm leading-relaxed text-neutral-600">
                  Sends email to{" "}
                  <span className="font-medium text-artillery">
                    {inbound.from_address}
                  </span>
                  . Their reply returns to board@gatorredleg.org and posts here.
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
                <label className="block">
                  <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Reply
                  </span>
                  <textarea
                    className={`${boardInputClass} min-h-32`}
                    placeholder="Write the reply that will be emailed…"
                    value={bodyMd}
                    onChange={(e) => setBodyMd(e.target.value)}
                  />
                </label>
                {error && (
                  <p className="text-sm text-redleg" role="alert">
                    {error}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
                  >
                    {saving ? "Sending…" : "Send reply"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={submitComment} className="space-y-4">
                {isEmailThread && (
                  <p className="text-sm leading-relaxed text-neutral-500">
                    Board-only note — the external sender will not see this.
                  </p>
                )}
                <label className="block">
                  <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {isEmailThread ? "Internal comment" : "Comment"}
                  </span>
                  <textarea
                    className={`${boardInputClass} min-h-28`}
                    placeholder={
                      isEmailThread
                        ? "Add an internal comment…"
                        : "Add a comment… Use @Name or @email to mention someone."
                    }
                    value={bodyMd}
                    onChange={(e) => setBodyMd(e.target.value)}
                  />
                </label>
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
                  >
                    {saving ? "Posting…" : "Post comment"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
