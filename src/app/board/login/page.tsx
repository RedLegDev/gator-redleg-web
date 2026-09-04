import { redirect } from "next/navigation";
import { BoardAuthShell } from "@/components/board/BoardAuthShell";
import { BoardLoginForm } from "@/components/board/BoardLoginForm";
import { getMember } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Board sign-in",
  robots: { index: false, follow: false },
};

export default async function BoardLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getMember()) redirect("/board");

  const params = await searchParams;
  return (
    <BoardAuthShell
      title="Chapter Board"
      description="Messages, tasks, and coordination for the Gator Redleg executive board."
    >
      <BoardLoginForm error={params.error === "1"} />
    </BoardAuthShell>
  );
}
