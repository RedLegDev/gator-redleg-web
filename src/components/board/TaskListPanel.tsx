"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Member, TaskWithMeta } from "@/lib/board/types";
import { formatBoardTimestamp } from "@/lib/board/format";

export function TaskListPanel({
  listId,
  listName,
  tasks: initialTasks,
  members,
}: {
  listId: string;
  listName: string;
  tasks: TaskWithMeta[];
  members: Member[];
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [commentTaskId, setCommentTaskId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);

  async function toggleComplete(task: TaskWithMeta) {
    await fetch(`/api/board/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed_at }),
    });
    router.refresh();
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              completed_at: t.completed_at ? null : Math.floor(Date.now() / 1000),
            }
          : t
      )
    );
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const res = await fetch("/api/board/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId,
        title,
        assigneeId: assigneeId || null,
        dueDate: dueDate || null,
      }),
    });
    const json = (await res.json()) as { data?: TaskWithMeta };
    if (res.ok && json.data) {
      setTasks((t) => [...t, { ...json.data!, assignee_name: null }]);
      setTitle("");
      setAssigneeId("");
      setDueDate("");
      router.refresh();
    }
    setSaving(false);
  }

  async function addTaskComment(taskId: string) {
    if (!commentText.trim()) return;
    setCommentSaving(true);
    await fetch(`/api/board/tasks/${taskId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyMd: commentText }),
    });
    setCommentText("");
    setCommentTaskId(null);
    setCommentSaving(false);
    router.refresh();
  }

  const open = tasks.filter((t) => !t.completed_at);
  const done = tasks.filter((t) => t.completed_at);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-artillery">{listName}</h2>

      <form onSubmit={addTask} className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="min-w-[12rem] flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            New task
          </span>
          <input
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            Assignee
          </span>
          <select
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            Due
          </span>
          <input
            type="date"
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-redleg px-4 py-2 text-sm font-semibold text-white hover:bg-redleg-dark disabled:opacity-60"
        >
          Add
        </button>
      </form>

      <TaskGroup
        label="Open"
        tasks={open}
        onToggle={toggleComplete}
        commentTaskId={commentTaskId}
        commentText={commentText}
        commentSaving={commentSaving}
        onCommentOpen={(id) => {
          setCommentTaskId(id);
          setCommentText("");
        }}
        onCommentText={setCommentText}
        onCommentSubmit={addTaskComment}
        onCommentCancel={() => setCommentTaskId(null)}
      />
      {done.length > 0 && (
        <TaskGroup
          label="Completed"
          tasks={done}
          onToggle={toggleComplete}
          muted
          commentTaskId={commentTaskId}
          commentText={commentText}
          commentSaving={commentSaving}
          onCommentOpen={(id) => {
            setCommentTaskId(id);
            setCommentText("");
          }}
          onCommentText={setCommentText}
          onCommentSubmit={addTaskComment}
          onCommentCancel={() => setCommentTaskId(null)}
        />
      )}
    </div>
  );
}

function TaskGroup({
  label,
  tasks,
  onToggle,
  muted,
  commentTaskId,
  commentText,
  commentSaving,
  onCommentOpen,
  onCommentText,
  onCommentSubmit,
  onCommentCancel,
}: {
  label: string;
  tasks: TaskWithMeta[];
  onToggle: (t: TaskWithMeta) => void;
  muted?: boolean;
  commentTaskId: string | null;
  commentText: string;
  commentSaving: boolean;
  onCommentOpen: (id: string) => void;
  onCommentText: (v: string) => void;
  onCommentSubmit: (id: string) => void;
  onCommentCancel: () => void;
}) {
  if (tasks.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {label} ({tasks.length})
      </h3>
      <ul className={`space-y-2 ${muted ? "opacity-70" : ""}`}>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={!!task.completed_at}
                onChange={() => onToggle(task)}
                className="mt-1 h-4 w-4 accent-redleg"
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${task.completed_at ? "line-through text-neutral-500" : "text-artillery"}`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-neutral-500">
                  {task.assignee_name ? `Assigned: ${task.assignee_name}` : "Unassigned"}
                  {task.due_date ? ` · Due ${task.due_date}` : ""}
                  {task.completed_at
                    ? ` · Done ${formatBoardTimestamp(task.completed_at)}`
                    : ""}
                </p>
                <button
                  type="button"
                  onClick={() => onCommentOpen(task.id)}
                  className="mt-1 text-xs font-semibold text-redleg hover:underline"
                >
                  Comment
                </button>
              </div>
            </div>
            {commentTaskId === task.id && (
              <div className="mt-2 space-y-2 border-t border-neutral-100 pt-2 pl-7">
                <textarea
                  className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm min-h-16"
                  placeholder="Comment… @Name to mention"
                  value={commentText}
                  onChange={(e) => onCommentText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={commentSaving}
                    onClick={() => onCommentSubmit(task.id)}
                    className="rounded bg-artillery px-3 py-1 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {commentSaving ? "Saving…" : "Post"}
                  </button>
                  <button
                    type="button"
                    onClick={onCommentCancel}
                    className="text-xs text-neutral-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
