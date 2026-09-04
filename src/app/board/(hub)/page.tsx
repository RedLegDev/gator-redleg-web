export const dynamic = "force-dynamic";

import Link from "next/link";
import { activityHref, activityLabel } from "@/lib/board/activity";
import { boardParallelRunActive } from "@/lib/board/flags";
import {
  boardStats,
  getTask,
  listOverdueTasks,
  listRecentActivity,
} from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";

export default async function BoardDashboardPage() {
  const db = getDb();
  const [stats, activity, overdue] = await Promise.all([
    boardStats(db),
    listRecentActivity(db, 15),
    listOverdueTasks(db, 8),
  ]);

  const activityLinks = await Promise.all(
    activity.map(async (row) => {
      if (row.object_type === "task") {
        const task = await getTask(db, row.object_id);
        return task ? `/board/tasks/${task.list_id}` : null;
      }
      return activityHref(row);
    })
  );

  return (
    <div className="space-y-8">
      {boardParallelRunActive() && (
        <div className="rounded-lg border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-artillery">
          <p className="font-heading font-semibold uppercase tracking-wide">
            Basecamp parallel run
          </p>
          <p className="mt-1">
            Use this board hub for new messages and tasks. Basecamp project 30371149
            stays read-only for reference during the transition.
          </p>
        </div>
      )}

      <p className="text-neutral-600">
        Executive board coordination — messages and tasks. Mention teammates with{" "}
        <code className="rounded bg-neutral-100 px-1 text-xs">@Name</code> or{" "}
        <code className="rounded bg-neutral-100 px-1 text-xs">@email</code> in posts
        and comments.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/board/messages"
          className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-redleg">
            Messages
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-artillery">
            {stats.messages}
          </p>
          <p className="mt-1 text-sm text-neutral-500">Active threads</p>
        </Link>
        <Link
          href="/board/tasks"
          className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-redleg">
            Open tasks
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-artillery">
            {stats.openTasks}
          </p>
          <p className="mt-1 text-sm text-neutral-500">Across all lists</p>
        </Link>
      </div>

      {overdue.length > 0 && (
        <section>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-redleg">
            Overdue
          </h2>
          <ul className="mt-3 space-y-2">
            {overdue.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/board/tasks/${t.list_id}`}
                  className="block rounded border border-red-200 bg-red-50/50 px-3 py-2 text-sm hover:bg-red-50"
                >
                  <span className="font-medium text-artillery">{t.title}</span>
                  <span className="text-neutral-500">
                    {" "}
                    · {t.list_name} · due {t.due_date}
                    {t.assignee_name ? ` · ${t.assignee_name}` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-600">
          Recent activity
        </h2>
        {activity.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500">No activity yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-neutral-100 rounded-lg border border-neutral-200 bg-white">
            {activity.map((row, i) => {
              const href = activityLinks[i];
              const label = activityLabel(row);
              return (
                <li key={row.id} className="px-4 py-3 text-sm">
                  {href ? (
                    <Link href={href} className="text-artillery hover:text-redleg">
                      {label}
                    </Link>
                  ) : (
                    <span className="text-artillery">{label}</span>
                  )}
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {formatBoardTimestamp(row.created_at)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
