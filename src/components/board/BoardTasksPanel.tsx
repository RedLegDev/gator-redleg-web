"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TaskListWithCounts } from "@/lib/board/types";

const inputClass =
  "w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/30";

export function BoardTasksPanel({
  lists: initialLists,
}: {
  lists: TaskListWithCounts[];
}) {
  const router = useRouter();
  const [lists, setLists] = useState(initialLists);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function addList(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    const res = await fetch("/api/board/tasks/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description: description.trim() || undefined,
      }),
    });
    const json = (await res.json()) as {
      ok?: boolean;
      error?: string;
      data?: TaskListWithCounts;
    };
    if (!res.ok || !json.data) {
      setError(json.error ?? "Could not create list.");
      setSaving(false);
      return;
    }
    setLists((prev) => [...prev, json.data!]);
    setName("");
    setDescription("");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <form
        onSubmit={addList}
        className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
      >
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700">
          New to-do list
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Name
            </span>
            <input
              className={inputClass}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="St. Barbara's 2027"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Description <span className="font-normal normal-case">(optional)</span>
            </span>
            <input
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this list is for"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-redleg px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark disabled:opacity-60"
        >
          {saving ? "Creating…" : "Create list"}
        </button>
      </form>

      <ul className="space-y-2">
        {lists.map((list) => (
          <li key={list.id}>
            <Link
              href={`/board/tasks/${list.id}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 hover:border-redleg/40"
            >
              <div>
                <span className="font-medium text-artillery">{list.name}</span>
                {list.description && (
                  <p className="mt-0.5 text-sm text-neutral-500">{list.description}</p>
                )}
              </div>
              <span className="shrink-0 text-sm text-neutral-500">
                {list.open_count}/{list.total_count} open
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
