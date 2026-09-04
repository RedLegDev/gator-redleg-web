export const dynamic = "force-dynamic";

import { BoardPageHeader } from "@/components/board/BoardChrome";
import { BoardTasksPanel } from "@/components/board/BoardTasksPanel";
import { listTaskLists } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

export default async function BoardTasksPage() {
  const lists = await listTaskLists(getDb());

  return (
    <div>
      <BoardPageHeader
        title="To-do lists"
        description="Organize chapter work by committee, event, or topic."
      />
      <BoardTasksPanel lists={lists} />
    </div>
  );
}
