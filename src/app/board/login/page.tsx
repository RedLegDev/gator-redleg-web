import { redirect } from "next/navigation";
import { BoardLoginForm } from "@/components/board/BoardLoginForm";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getMember } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export default async function BoardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getMember()) redirect("/board");

  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Board Hub"
        title="Sign in"
        subtitle="Magic link for executive board and members at large."
      />
      <Container className="px-4 pb-12 sm:px-5 sm:pb-16">
        <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
          <BoardLoginForm error={params.error === "1"} />
        </div>
      </Container>
    </>
  );
}
