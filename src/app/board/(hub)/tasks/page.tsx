export const dynamic = "force-dynamic";

import { BoardTasksPanel } from "@/components/board/BoardTasksPanel";
import { listTaskLists } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

export default async function BoardTasksPage() {
  const lists = await listTaskLists(getDb());

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-artillery">
        To-do lists
      </h2>
      <BoardTasksPanel lists={lists} />
    </div>
  );
}
