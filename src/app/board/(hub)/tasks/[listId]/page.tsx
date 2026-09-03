export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { TaskListPanel } from "@/components/board/TaskListPanel";
import {
  getTaskList,
  listTasksInList,
  syncAllowlistMembers,
} from "@/lib/board/db";
import { getDb, secret } from "@/lib/board/secrets";
import { parseAllowlist } from "@/lib/board/auth";

type Props = { params: Promise<{ listId: string }> };

export default async function BoardTaskListPage({ params }: Props) {
  const { listId } = await params;
  const db = getDb();
  const list = await getTaskList(db, listId);
  if (!list) notFound();
  const [tasks, members] = await Promise.all([
    listTasksInList(db, listId),
    syncAllowlistMembers(
      db,
      parseAllowlist(secret("BOARD_ALLOWLIST")),
      secret("BOARD_PRESIDENT_ALLOWLIST")
    ),
  ]);

  return (
    <TaskListPanel
      listId={listId}
      listName={list.name}
      tasks={tasks}
      members={members}
    />
  );
}
