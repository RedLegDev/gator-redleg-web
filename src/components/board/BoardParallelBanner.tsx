import Link from "next/link";
import { boardParallelRunActive } from "@/lib/board/flags";

export function BoardParallelBanner() {
  if (!boardParallelRunActive()) return null;

  return (
    <div className="border-b border-gold/40 bg-gold/15 text-artillery">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-sm">
        <span className="font-heading font-semibold uppercase tracking-wide">
          Board hub is live
        </span>
        <span className="text-neutral-700">
          — Executive Committee: sign in for messages &amp; tasks.
        </span>
        <Link href="/board/login" className="font-semibold text-redleg hover:underline">
          Board login
        </Link>
      </div>
    </div>
  );
}
