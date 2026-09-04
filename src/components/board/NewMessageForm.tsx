"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoardAttachmentPicker } from "./BoardAttachments";
import type { AttachmentMeta } from "@/lib/board/types";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardPanelClass,
} from "@/lib/board/ui";

type PendingAttachment = AttachmentMeta & { url: string };

export function NewMessageForm() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const [notifyAll, setNotifyAll] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/board/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          bodyMd,
          attachmentIds: attachments.map((a) => a.id),
          notify: notifyAll,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; data?: { id: string } };
      if (!res.ok || !json.data?.id) throw new Error("failed");
      router.push(`/board/messages/${json.data.id}`);
      router.refresh();
    } catch {
      setError("Could not post message.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mx-auto max-w-3xl space-y-5 p-5 sm:p-7 lg:p-8 ${boardPanelClass}`}
    >
      {error && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}
      <label className="block">
        <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Subject
        </span>
        <input
          className={boardInputClass}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief, clear subject line"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Message
        </span>
        <textarea
          className={`${boardInputClass} min-h-52`}
          value={bodyMd}
          onChange={(e) => setBodyMd(e.target.value)}
          placeholder="Markdown supported. Use @Name or @email to mention someone."
          required
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
      <div className="flex justify-end border-t border-neutral-100 pt-5">
        <button
          type="submit"
          disabled={saving}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          {saving ? "Posting…" : "Post message"}
        </button>
      </div>
    </form>
  );
}
