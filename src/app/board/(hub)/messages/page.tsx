export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  BoardEmptyState,
  BoardPageHeader,
} from "@/components/board/BoardChrome";
import { countMessages, listMessages } from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";
import { cn } from "@/lib/cn";
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
    listMessages(db, { status: showArchived ? "archived" : "active" }),
    countMessages(db, "archived"),
  ]);

  return (
    <div>
      <BoardPageHeader
        title={showArchived ? "Archived messages" : "Message Board"}
        description={
          showArchived
            ? "Hidden from the main board. Unarchive a thread to put it back."
            : "Chapter-wide threads for executive coordination, announcements, and discussion."
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          {archivedCount > 0 && (
            <Link
              href={
                showArchived ? "/board/messages" : "/board/messages?archived=1"
              }
              className="text-sm font-medium text-neutral-500 underline-offset-2 transition-colors hover:text-artillery hover:underline"
              aria-pressed={showArchived}
            >
              {showArchived
                ? "Back to active"
                : `Show archived (${archivedCount})`}
            </Link>
          )}
          {!showArchived && (
            <Link href="/board/messages/new" className={boardButtonPrimaryClass}>
              New message
            </Link>
          )}
        </div>
      </BoardPageHeader>

      {messages.length === 0 ? (
        <BoardEmptyState
          action={
            showArchived ? (
              <Link href="/board/messages" className={boardButtonPrimaryClass}>
                Back to active
              </Link>
            ) : (
              <Link
                href="/board/messages/new"
                className={boardButtonPrimaryClass}
              >
                Post the first message
              </Link>
            )
          }
        >
          {showArchived ? "No archived messages." : "No messages yet."}
        </BoardEmptyState>
      ) : (
        <ul className={cn("divide-y divide-neutral-100", boardPanelClass)}>
          {messages.map((m) => {
            const isArchived = m.status === "archived";
            const isPinned = m.pinned === 1 && !isArchived;
            return (
              <li key={m.id}>
                <Link
                  href={`/board/messages/${m.id}`}
                  className={cn(
                    boardListLinkClass,
                    "relative px-5 py-4 sm:px-6 sm:py-5",
                    isArchived && "opacity-70"
                  )}
                >
                  {isPinned && (
                    <span
                      className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-gold"
                      aria-hidden
                    />
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isPinned && (
                          <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                            Pinned
                          </span>
                        )}
                        {isArchived && (
                          <span className="font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                            Archived
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          "font-medium leading-snug text-artillery sm:text-lg",
                          isPinned || isArchived ? "mt-1" : ""
                        )}
                      >
                        {m.subject}
                      </p>
                      <p className="mt-1.5 text-sm text-neutral-500">
                        {m.author_name}
                        <span className="mx-1.5 text-neutral-300">·</span>
                        {formatBoardTimestamp(m.updated_at)}
                      </p>
                    </div>
                    <div className="shrink-0 pt-0.5 text-right">
                      <p className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                        {m.comment_count}
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        {m.comment_count === 1 ? "reply" : "replies"}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
