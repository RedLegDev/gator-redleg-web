"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BoardAvatar } from "./BoardChrome";
import { BoardMarkdown } from "./BoardMarkdown";
import type { CommentWithAuthor, TaskWithMeta } from "@/lib/board/types";
import { formatBoardTimestamp } from "@/lib/board/format";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardPanelClass,
} from "@/lib/board/ui";

export function TaskThread({
  task,
  comments: initialComments,
}: {
  task: TaskWithMeta;
  comments: CommentWithAuthor[];
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [completedAt, setCompletedAt] = useState(task.completed_at);
  const [bodyMd, setBodyMd] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleComplete() {
    const completed = !completedAt;
    setCompletedAt(completed ? Math.floor(Date.now() / 1000) : null);
    await fetch(`/api/board/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    router.refresh();
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!bodyMd.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/board/tasks/${task.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyMd }),
    });
    const json = (await res.json()) as {
      data?: CommentWithAuthor;
      error?: string;
    };
    if (res.ok && json.data) {
      setComments((c) => [...c, json.data!]);
      setBodyMd("");
      router.refresh();
    } else {
      setError(json.error ?? "Could not save comment.");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <section className={`${boardPanelClass} px-4 py-4 lg:px-6 lg:py-5`}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={!!completedAt}
            onChange={toggleComplete}
            aria-label={completedAt ? "Mark not done" : "Mark done"}
            className="mt-1.5 h-4 w-4 accent-redleg"
          />
          <div className="min-w-0 flex-1">
            <h2
              className={`font-display text-2xl font-semibold tracking-tight ${completedAt ? "line-through text-neutral-500" : "text-artillery"}`}
            >
              {task.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {task.assignee_name ? `Assigned: ${task.assignee_name}` : "Unassigned"}
              {task.due_date ? ` · Due ${task.due_date}` : ""}
              {completedAt ? ` · Done ${formatBoardTimestamp(completedAt)}` : ""}
            </p>
            {task.description_md && (
              <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
                {task.description_md}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Comments ({comments.length})
        </h3>
        {comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                id={`comment-${c.id}`}
                className="rounded-xl border border-neutral-200/90 bg-white px-4 py-4 sm:px-5"
              >
                <div className="flex gap-3">
                  <BoardAvatar name={c.author_name} size="sm" tone="neutral" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-artillery">
                      {c.author_name}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {formatBoardTimestamp(c.created_at)}
                    </p>
                    <div className="mt-3">
                      <BoardMarkdown content={c.body_md} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={submitComment}
          className={`${boardPanelClass} space-y-4 px-4 py-4 sm:px-5`}
        >
          <label className="block">
            <span className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Comment
            </span>
            <textarea
              className={`${boardInputClass} min-h-28`}
              placeholder="Add a comment… Use @Name to mention someone."
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
              {saving ? "Posting…" : "Post comment"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
