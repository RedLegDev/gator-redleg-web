"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Member, TaskWithMeta } from "@/lib/board/types";
import { formatDueDate, taskPath } from "@/lib/board/format";
import {
  boardInputClass,
  boardButtonPrimaryClass,
  boardInsetPanelClass,
  boardPanelClass,
} from "@/lib/board/ui";

const inputClass = boardInputClass;

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
  const [error, setError] = useState<string | null>(null);

  // Server data wins after router.refresh() (other officers' changes, comment counts).
  useEffect(() => setTasks(initialTasks), [initialTasks]);

  async function toggleComplete(task: TaskWithMeta) {
    const completed = !task.completed_at;
    const setCompleted = (value: number | null) =>
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, completed_at: value } : t))
      );
    setCompleted(completed ? Math.floor(Date.now() / 1000) : null);
    setError(null);
    const res = await fetch(`/api/board/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    }).catch(() => null);
    if (!res?.ok) {
      setCompleted(task.completed_at);
      setError(`Could not update “${task.title}”. Try again.`);
      return;
    }
    router.refresh();
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch("/api/board/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId,
        title,
        assigneeId: assigneeId || null,
        dueDate: dueDate || null,
      }),
    }).catch(() => null);
    const json = res
      ? ((await res.json().catch(() => ({}))) as { data?: TaskWithMeta })
      : {};
    if (res?.ok && json.data) {
      const assignee = members.find((m) => m.id === json.data!.assignee_id);
      setTasks((t) => [
        ...t,
        { ...json.data!, assignee_name: assignee?.name ?? null, comment_count: 0 },
      ]);
      setTitle("");
      setAssigneeId("");
      setDueDate("");
      router.refresh();
    } else {
      setError("Could not add the task. Try again.");
    }
    setSaving(false);
  }

  const open = tasks.filter((t) => !t.completed_at);
  const done = tasks.filter((t) => t.completed_at);

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-200/80 pb-6 lg:pb-8">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          To-do list
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-artillery lg:text-3xl">
          {listName}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {open.length} open · {done.length} done
        </p>
      </div>

      <form
        onSubmit={addTask}
        className={`flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-end lg:p-5 ${boardInsetPanelClass}`}
      >
        <label className="block sm:basis-full">
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            New task
          </span>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing?"
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[14rem_auto]">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
              Assignee
            </span>
            <select
              className={inputClass}
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
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
              Due
            </span>
            <input
              type="date"
              className={inputClass}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          {saving ? "Adding…" : "Add task"}
        </button>
      </form>

      {error && (
        <p
          className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}

      <section>
        <h3 className="mb-2 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Open ({open.length})
        </h3>
        {open.length === 0 ? (
          <p className={`${boardPanelClass} px-4 py-6 text-center text-sm text-neutral-500`}>
            Nothing open on this list.
          </p>
        ) : (
          <TaskRows tasks={open} onToggle={toggleComplete} />
        )}
      </section>

      {done.length > 0 && (
        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-redleg">
            <span aria-hidden className="transition-transform group-open:rotate-90">
              ▸
            </span>
            Completed ({done.length})
          </summary>
          <div className="mt-2 opacity-70">
            <TaskRows tasks={done} onToggle={toggleComplete} />
          </div>
        </details>
      )}
    </div>
  );
}

function TaskRows({
  tasks,
  onToggle,
}: {
  tasks: TaskWithMeta[];
  onToggle: (t: TaskWithMeta) => void;
}) {
  return (
    <ul className={`divide-y divide-neutral-100 overflow-hidden ${boardPanelClass}`}>
      {tasks.map((task) => {
        const due = task.due_date
          ? formatDueDate(task.due_date, !!task.completed_at)
          : null;
        return (
          <li key={task.id} className="flex items-stretch">
            <label className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-start justify-center pl-2 pt-3.5 lg:pl-3 lg:pt-4">
              <input
                type="checkbox"
                checked={!!task.completed_at}
                onChange={() => onToggle(task)}
                aria-label={
                  task.completed_at
                    ? `Mark “${task.title}” not done`
                    : `Mark “${task.title}” done`
                }
                className="h-5 w-5 accent-redleg"
              />
            </label>
            <Link
              href={taskPath(task)}
              className="min-w-0 flex-1 py-3 pr-4 transition-colors hover:bg-neutral-50/90 lg:py-4 lg:pr-5"
            >
              <span
                className={`block text-sm font-medium lg:text-base ${task.completed_at ? "line-through text-neutral-500" : "text-artillery"}`}
              >
                {task.title}
              </span>
              {task.description_md && (
                <span className="mt-0.5 line-clamp-2 text-sm text-neutral-600">
                  {task.description_md}
                </span>
              )}
              <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-neutral-500">
                <span>{task.assignee_name ?? "Unassigned"}</span>
                {due && (
                  <span className={due.overdue ? "font-semibold text-redleg" : undefined}>
                    {due.overdue ? "Overdue · " : "Due "}
                    {due.label}
                  </span>
                )}
                {task.comment_count ? (
                  <span>
                    {task.comment_count}{" "}
                    {task.comment_count === 1 ? "comment" : "comments"}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
