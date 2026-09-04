export const dynamic = "force-dynamic";

import Link from "next/link";
import { listMessages } from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";

export default async function BoardMessagesPage() {
  const messages = await listMessages(getDb());

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-semibold text-artillery">
          Message Board
        </h2>
        <Link
          href="/board/messages/new"
          className="inline-flex min-h-11 items-center justify-center rounded bg-redleg px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-redleg-dark"
        >
          New message
        </Link>
      </div>
      {messages.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
          No messages yet. Post the first one.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {messages.map((m) => (
            <li key={m.id}>
              <Link
                href={`/board/messages/${m.id}`}
                className="block px-4 py-4 hover:bg-neutral-50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {m.pinned === 1 && (
                    <span className="rounded bg-gold/25 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-artillery">
                      Pinned
                    </span>
                  )}
                  <span className="font-medium text-artillery">{m.subject}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  {m.author_name} · {formatBoardTimestamp(m.updated_at)} ·{" "}
                  {m.comment_count} comment{m.comment_count === 1 ? "" : "s"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
