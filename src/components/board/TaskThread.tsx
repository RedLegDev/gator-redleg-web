"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BoardAvatar } from "./BoardChrome";
import { BoardMarkdown } from "./BoardMarkdown";
import type {
  CommentWithAuthor,
  Member,
  TaskWithMeta,
} from "@/lib/board/types";
import { formatBoardTimestamp, formatDueDate } from "@/lib/board/format";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardPanelClass,
} from "@/lib/board/ui";

export function TaskThread({
  task: initialTask,
  comments: initialComments,
  members,
}: {
  task: TaskWithMeta;
  comments: CommentWithAuthor[];
  members: Member[];
}) {
  const router = useRouter();
  const [task, setTask] = useState(initialTask);
  const [comments, setComments] = useState(initialComments);
  const [bodyMd, setBodyMd] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssigneeId, setEditAssigneeId] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);

  // Server data wins after router.refresh().
  useEffect(() => setTask(initialTask), [initialTask]);
  useEffect(() => setComments(initialComments), [initialComments]);

  const due = task.due_date
    ? formatDueDate(task.due_date, !!task.completed_at)
    : null;

  async function patchTask(body: Record<string, unknown>): Promise<boolean> {
    setTaskError(null);
    const res = await fetch(`/api/board/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    const json = res
      ? ((await res.json().catch(() => ({}))) as { data?: TaskWithMeta })
      : {};
    if (!res?.ok || !json.data) {
      setTaskError("Could not save the task. Try again.");
      return false;
    }
    setTask(json.data);
    router.refresh();
    return true;
  }

  async function toggleComplete() {
    const before = task;
    setTask({
      ...task,
      completed_at: task.completed_at ? null : Math.floor(Date.now() / 1000),
    });
    if (!(await patchTask({ completed: !before.completed_at }))) setTask(before);
  }

  function openEdit() {
    setEditTitle(task.title);
    setEditDescription(task.description_md ?? "");
    setEditAssigneeId(task.assignee_id ?? "");
    setEditDueDate(task.due_date ?? "");
    setTaskError(null);
    setEditing(true);
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setEditSaving(true);
    const ok = await patchTask({
      title: editTitle,
      descriptionMd: editDescription.trim() || null,
      assigneeId: editAssigneeId || null,
      dueDate: editDueDate || null,
    });
    setEditSaving(false);
    if (ok) setEditing(false);
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
        {editing ? (
          <form onSubmit={saveEdit} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                Title
              </span>
              <input
                className={boardInputClass}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                Notes
              </span>
              <textarea
                className={`${boardInputClass} min-h-24`}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Optional details"
              />
            </label>
            <div className="grid grid-cols-2 gap-3 sm:max-w-md">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                  Assignee
                </span>
                <select
                  className={boardInputClass}
                  value={editAssigneeId}
                  onChange={(e) => setEditAssigneeId(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                  Due
                </span>
                <input
                  type="date"
                  className={boardInputClass}
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
              </label>
            </div>
            {taskError && (
              <p className="text-sm text-redleg" role="alert">
                {taskError}
              </p>
            )}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={editSaving}
                className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
              >
                {editSaving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="min-h-11 text-sm text-neutral-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start gap-3">
            <label className="-m-2 flex min-h-11 min-w-11 shrink-0 cursor-pointer items-start justify-center p-2 pt-3">
              <input
                type="checkbox"
                checked={!!task.completed_at}
                onChange={toggleComplete}
                aria-label={task.completed_at ? "Mark not done" : "Mark done"}
                className="h-5 w-5 accent-redleg"
              />
            </label>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h2
                  className={`font-display text-2xl font-semibold tracking-tight ${task.completed_at ? "line-through text-neutral-500" : "text-artillery"}`}
                >
                  {task.title}
                </h2>
                <button
                  type="button"
                  onClick={openEdit}
                  className="min-h-11 shrink-0 px-1 text-sm font-semibold text-redleg hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-neutral-500">
                <span>{task.assignee_name ?? "Unassigned"}</span>
                {due && (
                  <span className={due.overdue ? "font-semibold text-redleg" : undefined}>
                    {due.overdue ? "Overdue · " : "Due "}
                    {due.label}
                  </span>
                )}
                {task.completed_at ? (
                  <span>Done {formatBoardTimestamp(task.completed_at)}</span>
                ) : null}
              </p>
              {task.description_md && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
                  {task.description_md}
                </p>
              )}
              {taskError && (
                <p className="mt-2 text-sm text-redleg" role="alert">
                  {taskError}
                </p>
              )}
            </div>
          </div>
        )}
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
