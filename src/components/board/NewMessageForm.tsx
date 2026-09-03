"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/30";

export function NewMessageForm() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [bodyMd, setBodyMd] = useState("");
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
        body: JSON.stringify({ subject, bodyMd }),
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
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
          Subject
        </span>
        <input
          className={inputClass}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
          Message (Markdown)
        </span>
        <textarea
          className={`${inputClass} min-h-48 font-mono`}
          value={bodyMd}
          onChange={(e) => setBodyMd(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-redleg px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark disabled:opacity-60"
      >
        {saving ? "Posting…" : "Post message"}
      </button>
    </form>
  );
}
