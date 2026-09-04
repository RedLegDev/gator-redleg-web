import { Container } from "@/components/Container";
import { BoardPublicSiteLink } from "@/components/board/BoardChrome";
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
    <div className="border-t-4 border-redleg bg-neutral-100/80 lg:bg-neutral-100">
      <Container className="py-4 sm:py-6 lg:py-8">
        {/* Mobile page chrome */}
        <div className="mb-4 lg:hidden">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
                Members only
              </p>
              <h1 className="font-display text-xl font-semibold text-artillery sm:text-2xl">
                Chapter Board
              </h1>
              <p className="mt-0.5 truncate text-sm text-neutral-500">
                {member.name}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <form action="/api/board/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm font-semibold text-neutral-500 hover:text-redleg"
                >
                  Sign out
                </button>
              </form>
              <BoardPublicSiteLink />
            </div>
          </div>
        </div>

        {/* App shell */}
        <div className="lg:flex lg:min-h-[calc(100vh-10rem)] lg:overflow-hidden lg:rounded-2xl lg:border lg:border-neutral-200/80 lg:bg-white lg:shadow-[0_20px_60px_-24px_rgba(20,20,20,0.35)]">
          <BoardNav memberName={member.name} />
          <div className="min-w-0 flex-1 pb-20 lg:overflow-y-auto lg:bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_12rem)] lg:pb-0 lg:pt-0">
            <div className="hidden items-center justify-end border-b border-neutral-200/60 px-8 py-3 lg:flex">
              <BoardPublicSiteLink />
            </div>
            <div className="lg:px-8 lg:py-8 xl:px-10 xl:py-10">{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
