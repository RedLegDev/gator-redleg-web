export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  BoardEmptyState,
  BoardPageHeader,
} from "@/components/board/BoardChrome";
import { listMessages } from "@/lib/board/db";
import { formatBoardTimestamp } from "@/lib/board/format";
import { getDb } from "@/lib/board/secrets";
import { boardButtonPrimaryClass, boardListLinkClass, boardPanelClass } from "@/lib/board/ui";

export default async function BoardMessagesPage() {
  const messages = await listMessages(getDb());

  return (
    <div>
      <BoardPageHeader
        title="Message Board"
        description="Chapter-wide threads for exec coordination, announcements, and discussion."
      >
        <Link href="/board/messages/new" className={boardButtonPrimaryClass}>
          New message
        </Link>
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
          {messages.map((m) => (
            <li key={m.id}>
              <Link
                href={`/board/messages/${m.id}`}
                className={`${boardListLinkClass} px-4 py-4 lg:px-6 lg:py-5`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {m.pinned === 1 && (
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-artillery">
                      Pinned
                    </span>
                  )}
                  <span className="font-medium text-artillery lg:text-lg">
                    {m.subject}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-neutral-500">
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
