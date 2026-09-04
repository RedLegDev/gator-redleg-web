export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { TaskListPanel } from "@/components/board/TaskListPanel";
import { getTaskList, listActiveMembers, listTasksInList } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

type Props = { params: Promise<{ listId: string }> };

export default async function BoardTaskListPage({ params }: Props) {
  const { listId } = await params;
  const db = getDb();
  const list = await getTaskList(db, listId);
  if (!list) notFound();
  const [tasks, members] = await Promise.all([
    listTasksInList(db, listId),
    listActiveMembers(db),
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
