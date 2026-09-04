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
      <Container className="py-8 lg:py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
              Members only
            </p>
            <h1 className="font-display text-2xl font-semibold text-artillery sm:text-3xl">
              Chapter Board
            </h1>
          </div>
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-redleg"
          >
            ← Public site
          </Link>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <BoardNav memberName={member.name} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </div>
  );
}
