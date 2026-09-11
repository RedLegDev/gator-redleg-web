import { redirect } from "next/navigation";
import { BoardAuthShell } from "@/components/board/BoardAuthShell";
import { BoardRequestAccessForm } from "@/components/board/BoardRequestAccessForm";
import { getMember } from "@/lib/board/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Request board access",
  robots: { index: false, follow: false },
};

export default async function BoardRequestAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  if (await getMember()) redirect("/board");

  const params = await searchParams;
  const initialEmail = String(params.email ?? "").trim();

  return (
    <BoardAuthShell
      title="Request access"
      description="If a sign-in code never arrived, ask a board member to add you to the roster."
    >
      <BoardRequestAccessForm initialEmail={initialEmail} />
    </BoardAuthShell>
  );
}
