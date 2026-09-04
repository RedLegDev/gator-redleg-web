export const dynamic = "force-dynamic";

import Link from "next/link";
import { BoardEmptyState, BoardPageHeader } from "@/components/board/BoardChrome";
import { listMyOpenTasks } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";
import { boardListLinkClass, boardPanelClass } from "@/lib/board/ui";

export default async function MyTasksPage() {
  const member = await requireMember();
  const tasks = await listMyOpenTasks(getDb(), member.id);

  return (
    <div>
      <BoardPageHeader
        title="My tasks"
        description="Everything currently assigned to you across all lists."
      />

      {tasks.length === 0 ? (
        <BoardEmptyState>Nothing assigned to you right now.</BoardEmptyState>
      ) : (
        <ul className={`divide-y divide-neutral-100 ${boardPanelClass}`}>
          {tasks.map((t) => (
            <li key={t.id}>
              <Link
                href={`/board/tasks/${t.list_id}`}
                className={`${boardListLinkClass} block px-4 py-4 lg:px-6 lg:py-5`}
              >
                <p className="font-medium text-artillery lg:text-lg">{t.title}</p>
                <p className="mt-1.5 text-sm text-neutral-500">
                  <span className="text-redleg">{t.list_name}</span>
                  {t.due_date ? ` · Due ${t.due_date}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
