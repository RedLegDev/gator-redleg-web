export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  BoardEmptyState,
  BoardPageHeader,
} from "@/components/board/BoardChrome";
import { countMessages, listMessages } from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";
import {
  boardButtonPrimaryClass,
  boardListLinkClass,
  boardPanelClass,
} from "@/lib/board/ui";

type Props = { searchParams: Promise<{ archived?: string }> };

export default async function BoardMessagesPage({ searchParams }: Props) {
  const showArchived = (await searchParams).archived === "1";
  const db = getDb();
  const [messages, archivedCount] = await Promise.all([
    listMessages(db, { status: showArchived ? "all" : "active" }),
    countMessages(db, "archived"),
  ]);

  return (
    <div>
      <BoardPageHeader
        title="Message Board"
        description="Chapter-wide threads for exec coordination, announcements, and discussion."
      >
        <div className="flex flex-wrap items-center gap-3">
          {archivedCount > 0 && (
            <Link
              href={showArchived ? "/board/messages" : "/board/messages?archived=1"}
              className="text-sm font-semibold text-neutral-500 underline-offset-2 hover:underline"
              aria-pressed={showArchived}
            >
              {showArchived
                ? "Hide archived"
                : `Show archived (${archivedCount})`}
            </Link>
          )}
          <Link href="/board/messages/new" className={boardButtonPrimaryClass}>
            New message
          </Link>
        </div>
      </BoardPageHeader>

      {messages.length === 0 ? (
        <BoardEmptyState
          action={
            <Link href="/board/messages/new" className={boardButtonPrimaryClass}>
              Post the first message
            </Link>
          }
        >
          No messages yet.
        </BoardEmptyState>
      ) : (
        <ul className={`divide-y divide-neutral-100 ${boardPanelClass}`}>
          {messages.map((m) => {
            const isArchived = m.status === "archived";
            return (
              <li key={m.id}>
                <Link
                  href={`/board/messages/${m.id}`}
                  className={`${boardListLinkClass} px-4 py-4 lg:px-6 lg:py-5 ${
                    isArchived ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {m.pinned === 1 && !isArchived && (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-artillery">
                        Pinned
                      </span>
                    )}
                    {isArchived && (
                      <span className="rounded-full bg-neutral-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-600">
                        Archived
                      </span>
                    )}
                    <span className="font-medium text-artillery lg:text-lg">
                      {m.subject}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-neutral-500">
                    {m.author_name} · {formatBoardTimestamp(m.updated_at)} ·{" "}
                    {m.comment_count} comment
                    {m.comment_count === 1 ? "" : "s"}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
