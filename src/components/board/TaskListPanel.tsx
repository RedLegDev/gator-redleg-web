"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Member, TaskWithMeta } from "@/lib/board/types";
import { formatBoardTimestamp } from "@/lib/board/format";
import { boardInputClass, boardButtonPrimaryClass } from "@/lib/board/ui";

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
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssigneeId, setEditAssigneeId] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [commentTaskId, setCommentTaskId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);

  function openEdit(task: TaskWithMeta) {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description_md ?? "");
    setEditAssigneeId(task.assignee_id ?? "");
    setEditDueDate(task.due_date ?? "");
    setCommentTaskId(null);
  }

  function cancelEdit() {
    setEditTaskId(null);
  }

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

  async function saveEdit(taskId: string) {
    if (!editTitle.trim()) return;
    setEditSaving(true);
    const res = await fetch(`/api/board/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        descriptionMd: editDescription.trim() || null,
        assigneeId: editAssigneeId || null,
        dueDate: editDueDate || null,
      }),
    });
    const json = (await res.json()) as { data?: TaskWithMeta };
    if (res.ok && json.data) {
      setTasks((prev) => prev.map((t) => (t.id === taskId ? json.data! : t)));
      setEditTaskId(null);
      router.refresh();
    }
    setEditSaving(false);
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

  const taskGroupProps = {
    members,
    editTaskId,
    editTitle,
    editDescription,
    editAssigneeId,
    editDueDate,
    editSaving,
    commentTaskId,
    commentText,
    commentSaving,
    onEdit: openEdit,
    onEditTitle: setEditTitle,
    onEditDescription: setEditDescription,
    onEditAssigneeId: setEditAssigneeId,
    onEditDueDate: setEditDueDate,
    onEditSave: saveEdit,
    onEditCancel: cancelEdit,
    onCommentOpen: (id: string) => {
      setCommentTaskId(id);
      setCommentText("");
      setEditTaskId(null);
    },
    onCommentText: setCommentText,
    onCommentSubmit: addTaskComment,
    onCommentCancel: () => setCommentTaskId(null),
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-artillery">{listName}</h2>

      <form
        onSubmit={addTask}
        className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
      >
        <label className="block w-full sm:min-w-[12rem] sm:flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            New task
          </span>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </label>
        <label className="block w-full sm:w-auto">
          <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
            Assignee
          </span>
          <select
            className={`${inputClass} sm:min-w-[10rem]`}
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
        <label className="block w-full sm:w-auto">
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
        <button
          type="submit"
          disabled={saving}
          className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
        >
          Add
        </button>
      </form>

      <TaskGroup label="Open" tasks={open} onToggle={toggleComplete} {...taskGroupProps} />
      {done.length > 0 && (
        <TaskGroup
          label="Completed"
          tasks={done}
          onToggle={toggleComplete}
          muted
          {...taskGroupProps}
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
  members,
  editTaskId,
  editTitle,
  editDescription,
  editAssigneeId,
  editDueDate,
  editSaving,
  commentTaskId,
  commentText,
  commentSaving,
  onEdit,
  onEditTitle,
  onEditDescription,
  onEditAssigneeId,
  onEditDueDate,
  onEditSave,
  onEditCancel,
  onCommentOpen,
  onCommentText,
  onCommentSubmit,
  onCommentCancel,
}: {
  label: string;
  tasks: TaskWithMeta[];
  onToggle: (t: TaskWithMeta) => void;
  muted?: boolean;
  members: Member[];
  editTaskId: string | null;
  editTitle: string;
  editDescription: string;
  editAssigneeId: string;
  editDueDate: string;
  editSaving: boolean;
  commentTaskId: string | null;
  commentText: string;
  commentSaving: boolean;
  onEdit: (t: TaskWithMeta) => void;
  onEditTitle: (v: string) => void;
  onEditDescription: (v: string) => void;
  onEditAssigneeId: (v: string) => void;
  onEditDueDate: (v: string) => void;
  onEditSave: (id: string) => void;
  onEditCancel: () => void;
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
            {editTaskId === task.id ? (
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    Title
                  </span>
                  <input
                    className={inputClass}
                    value={editTitle}
                    onChange={(e) => onEditTitle(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    Notes
                  </span>
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={editDescription}
                    onChange={(e) => onEditDescription(e.target.value)}
                    placeholder="Optional details"
                  />
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="block min-w-[10rem] flex-1">
                    <span className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                      Assignee
                    </span>
                    <select
                      className={inputClass}
                      value={editAssigneeId}
                      onChange={(e) => onEditAssigneeId(e.target.value)}
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
                      value={editDueDate}
                      onChange={(e) => onEditDueDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={editSaving}
                    onClick={() => onEditSave(task.id)}
                    className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
                  >
                    {editSaving ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={onEditCancel}
                    className="text-xs text-neutral-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
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
                  {task.description_md && (
                    <p className="mt-1 whitespace-pre-wrap text-sm text-neutral-600">
                      {task.description_md}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-500">
                    {task.assignee_name ? `Assigned: ${task.assignee_name}` : "Unassigned"}
                    {task.due_date ? ` · Due ${task.due_date}` : ""}
                    {task.completed_at
                      ? ` · Done ${formatBoardTimestamp(task.completed_at)}`
                      : ""}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <button
                      type="button"
                      onClick={() => onEdit(task)}
                      className="min-h-11 py-2 text-xs font-semibold text-redleg hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onCommentOpen(task.id)}
                      className="min-h-11 py-2 text-xs font-semibold text-redleg hover:underline"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
            {editTaskId !== task.id && commentTaskId === task.id && (
              <div className="mt-2 space-y-2 border-t border-neutral-100 pt-2 pl-7">
                <textarea
                  className={`${inputClass} min-h-16`}
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
