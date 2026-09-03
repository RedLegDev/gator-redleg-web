export const dynamic = "force-dynamic";

import Link from "next/link";
import { boardStats } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";

export default async function BoardDashboardPage() {
  const stats = await boardStats(getDb());

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Executive board coordination — messages and tasks replacing Basecamp.
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
    </div>
  );
}
