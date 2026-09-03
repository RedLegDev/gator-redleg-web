export const dynamic = "force-dynamic";

import Link from "next/link";
import { listMyOpenTasks } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

export default async function MyTasksPage() {
  const member = await requireMember();
  const tasks = await listMyOpenTasks(getDb(), member.id);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-artillery">
        My tasks
      </h2>
      {tasks.length === 0 ? (
        <p className="text-neutral-500">Nothing assigned to you.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="rounded-lg border border-neutral-200 bg-white px-4 py-3"
            >
              <p className="font-medium text-artillery">{t.title}</p>
              <p className="text-sm text-neutral-500">
                <Link
                  href={`/board/tasks/${t.list_id}`}
                  className="text-redleg hover:underline"
                >
                  {t.list_name}
                </Link>
                {t.due_date ? ` · Due ${t.due_date}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
