export const dynamic = "force-dynamic";

import Link from "next/link";
import { activityHref, activityLabel } from "@/lib/board/activity";
import { BoardSectionTitle } from "@/components/board/BoardChrome";
import {
  boardStats,
  getTask,
  listOverdueTasks,
  listRecentActivity,
} from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";
import {
  boardAccentBar,
  boardPanelClass,
  boardStatCardClass,
} from "@/lib/board/ui";

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
    <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10 xl:gap-12">
      <div className="space-y-8 lg:col-span-2">
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
            Dashboard
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-artillery xl:text-4xl">
            Welcome back
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 lg:text-base">
            Executive board coordination — messages and tasks. Mention teammates
            with{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              @Name
            </code>{" "}
            or{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              @email
            </code>{" "}
            in posts and comments.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/board/messages" className={boardStatCardClass}>
            <span className={boardAccentBar()} aria-hidden />
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
              Messages
            </p>
            <p className="mt-3 font-display text-4xl font-semibold text-artillery">
              {stats.messages}
            </p>
            <p className="mt-1 text-sm text-neutral-500">Active threads</p>
          </Link>
          <Link href="/board/tasks" className={boardStatCardClass}>
            <span className={boardAccentBar()} aria-hidden />
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
              Open tasks
            </p>
            <p className="mt-3 font-display text-4xl font-semibold text-artillery">
              {stats.openTasks}
            </p>
            <p className="mt-1 text-sm text-neutral-500">Across all lists</p>
          </Link>
        </div>

        {overdue.length > 0 && (
          <section>
            <BoardSectionTitle variant="danger">Overdue</BoardSectionTitle>
            <ul className={`mt-4 space-y-2 ${boardPanelClass} overflow-hidden`}>
              {overdue.map((t) => (
                <li key={t.id} className="border-b border-neutral-100 last:border-0">
                  <Link
                    href={`/board/tasks/${t.list_id}`}
                    className="block px-4 py-3.5 transition-colors hover:bg-red-50/60 lg:px-5"
                  >
                    <span className="block font-medium text-artillery">{t.title}</span>
                    <span className="mt-1 block text-sm text-neutral-500 sm:inline sm:mt-0">
                      {t.list_name} · due {t.due_date}
                      {t.assignee_name ? ` · ${t.assignee_name}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <section className="lg:col-span-1">
        <div className="lg:sticky lg:top-8">
          <BoardSectionTitle>Recent activity</BoardSectionTitle>
          {activity.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500">No activity yet.</p>
          ) : (
            <ul className={`mt-4 divide-y divide-neutral-100 ${boardPanelClass}`}>
              {activity.map((row, i) => {
                const href = activityLinks[i];
                const label = activityLabel(row);
                return (
                  <li key={row.id} className="px-4 py-3.5 lg:px-5">
                    {href ? (
                      <Link
                        href={href}
                        className="text-sm leading-snug text-artillery transition-colors hover:text-redleg"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="text-sm leading-snug text-artillery">
                        {label}
                      </span>
                    )}
                    <span className="mt-1 block text-xs text-neutral-400">
                      {formatBoardTimestamp(row.created_at)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
