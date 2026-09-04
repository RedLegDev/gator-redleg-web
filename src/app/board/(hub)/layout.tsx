import Link from "next/link";
import { Container } from "@/components/Container";
import { BoardNav } from "@/components/board/BoardNav";
import { requireMember } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const member = await requireMember();

  return (
    <div className="border-t-4 border-redleg bg-white">
      <Container className="py-4 sm:py-6 lg:py-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 lg:mb-6">
          <div className="min-w-0">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
              Members only
            </p>
            <h1 className="font-display text-xl font-semibold text-artillery sm:text-2xl lg:text-3xl">
              Chapter Board
            </h1>
            <p className="mt-0.5 truncate text-sm text-neutral-500 lg:hidden">
              {member.name}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <form action="/api/board/logout" method="POST" className="lg:hidden">
              <button
                type="submit"
                className="text-sm font-semibold text-neutral-500 hover:text-redleg"
              >
                Sign out
              </button>
            </form>
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-redleg"
            >
              ← Public site
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <BoardNav memberName={member.name} />
          <div className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</div>
        </div>
      </Container>
    </div>
  );
}
