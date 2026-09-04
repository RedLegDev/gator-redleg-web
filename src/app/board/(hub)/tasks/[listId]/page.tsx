export const dynamic = "force-dynamic";

import Link from "next/link";
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
    <div>
      <Link
        href="/board/tasks"
        className="mb-6 inline-flex text-sm text-neutral-500 transition-colors hover:text-redleg lg:mb-8"
      >
        ← All lists
      </Link>
      <TaskListPanel
      listId={listId}
      listName={list.name}
      tasks={tasks}
      members={members}
      />
    </div>
  );
}
