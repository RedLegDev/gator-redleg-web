"use client";

import { useRef, useState } from "react";
import {
  isImageAttachment,
  MAX_ATTACHMENTS_PER_POST,
  MAX_ATTACHMENT_BYTES,
} from "@/lib/board/attachments";
import type { AttachmentMeta } from "@/lib/board/types";

type PendingAttachment = AttachmentMeta & { url: string };

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function BoardAttachmentPicker({
  value,
  onChange,
  disabled,
}: {
  value: PendingAttachment[];
  onChange: (next: PendingAttachment[]) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function onFilesSelected(files: FileList | null) {
    if (!files?.length) return;
    setError("");

    if (value.length + files.length > MAX_ATTACHMENTS_PER_POST) {
      setError(`Maximum ${MAX_ATTACHMENTS_PER_POST} attachments per post.`);
      return;
    }

    setUploading(true);
    const next = [...value];

    for (const file of Array.from(files)) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        setError(`${file.name} exceeds the 5MB limit.`);
        continue;
      }

      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/board/attachments", {
        method: "POST",
        body: form,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        data?: PendingAttachment & {
          contentType?: string;
          sizeBytes?: number;
        };
      };
      if (!res.ok || !json.data?.id) {
        setError(json.error ?? `Could not upload ${file.name}.`);
        continue;
      }
      next.push({
        id: json.data.id,
        filename: json.data.filename,
        content_type: json.data.contentType ?? file.type,
        size_bytes: json.data.sizeBytes ?? file.size,
        url: json.data.url ?? `/api/board/attachments/${json.data.id}`,
      });
    }

    onChange(next);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(id: string) {
    onChange(value.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={disabled || uploading || value.length >= MAX_ATTACHMENTS_PER_POST}
          onClick={() => inputRef.current?.click()}
          className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Attach file"}
        </button>
        <span className="text-xs text-neutral-500">PNG, JPG, or PDF · up to 5MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,application/pdf"
        multiple
        className="hidden"
        onChange={(e) => onFilesSelected(e.target.files)}
      />
      {error && (
        <p className="text-xs text-red-700">{error}</p>
      )}
      {value.length > 0 && (
        <ul className="space-y-1">
          {value.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-2 rounded border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs"
            >
              <span className="truncate">{a.filename} ({formatBytes(a.size_bytes)})</span>
              <button
                type="button"
                onClick={() => remove(a.id)}
                className="shrink-0 font-semibold text-redleg hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BoardAttachmentList({
  attachments,
}: {
  attachments: AttachmentMeta[];
}) {
  if (attachments.length === 0) return null;

  return (
    <ul className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
      {attachments.map((a) => {
        const url = `/api/board/attachments/${a.id}`;
        const isImage = isImageAttachment(a.content_type);
        return (
          <li key={a.id}>
            {isImage ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={a.filename}
                  className="max-h-80 rounded border border-neutral-200"
                />
              </a>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-redleg hover:bg-neutral-100"
              >
                {a.filename} ({formatBytes(a.size_bytes)})
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
