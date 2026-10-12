"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TaskListWithCounts } from "@/lib/board/types";

import { boardInputClass, boardButtonPrimaryClass, boardInsetPanelClass, boardPanelClass } from "@/lib/board/ui";

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

      {lists.length > 0 && (
        <ul className="space-y-2">
          {lists.map((list) => (
            <li key={list.id}>
              <Link
                href={`/board/tasks/${list.id}`}
                className={`${boardPanelClass} flex flex-col gap-2 px-4 py-4 transition-all hover:border-redleg/20 hover:shadow-md sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-5`}
              >
                <div>
                  <span className="font-medium text-artillery lg:text-lg">{list.name}</span>
                  {list.description && (
                    <p className="mt-0.5 text-sm text-neutral-500">{list.description}</p>
                  )}
                </div>
                <span className="shrink-0 text-sm text-neutral-500">
                  {list.total_count === 0 ? (
                    "No tasks yet"
                  ) : (
                    <>
                      <span className="font-semibold text-artillery">
                        {list.open_count} open
                      </span>
                      {" · "}
                      {list.total_count - list.open_count} done
                    </>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {lists.length === 0 && (
        <p className={`${boardPanelClass} px-4 py-6 text-center text-sm text-neutral-500`}>
          No to-do lists yet.
        </p>
      )}

      <details className={`group ${boardInsetPanelClass}`}>
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-neutral-700 hover:text-redleg lg:px-6">
          <span aria-hidden className="text-redleg group-open:hidden">+</span>
          <span aria-hidden className="hidden text-redleg group-open:inline">−</span>
          New to-do list
        </summary>
        <form
          onSubmit={addList}
          className="space-y-3 px-4 pb-4 lg:px-6 lg:pb-6"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                Name
              </span>
              <input
                className={boardInputClass}
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
                className={boardInputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What this list is for"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className={`${boardButtonPrimaryClass} w-full sm:w-auto`}
          >
            {saving ? "Creating…" : "Create list"}
          </button>
        </form>
      </details>
    </div>
  );
}
