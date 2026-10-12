export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { TaskThread } from "@/components/board/TaskThread";
import { getTask, getTaskList, listComments } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

type Props = { params: Promise<{ listId: string; taskId: string }> };

export default async function BoardTaskPage({ params }: Props) {
  const { listId, taskId } = await params;
  const db = getDb();
  const task = await getTask(db, taskId);
  if (!task || task.list_id !== listId) notFound();
  const [list, comments] = await Promise.all([
    getTaskList(db, listId),
    listComments(db, "task", taskId),
  ]);

  return (
    <div>
      <Link
        href={`/board/tasks/${listId}`}
        className="mb-6 inline-flex text-sm text-neutral-500 transition-colors hover:text-redleg lg:mb-8"
      >
        ← {list?.name ?? "Task list"}
      </Link>
      <TaskThread task={task} comments={comments} />
    </div>
  );
}
