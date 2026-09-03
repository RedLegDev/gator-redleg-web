export const dynamic = "force-dynamic";

import Link from "next/link";
import { listTaskLists } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

export default async function BoardTasksPage() {
  const lists = await listTaskLists(getDb());

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-artillery">
        To-do lists
      </h2>
      <ul className="space-y-2">
        {lists.map((list) => (
          <li key={list.id}>
            <Link
              href={`/board/tasks/${list.id}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 hover:border-redleg/40"
            >
              <span className="font-medium text-artillery">{list.name}</span>
              <span className="text-sm text-neutral-500">
                {list.open_count}/{list.total_count} open
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
