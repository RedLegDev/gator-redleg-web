export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { BoardPageHeader } from "@/components/board/BoardChrome";
import { BoardSendAsPanel } from "@/components/board/BoardSendAsPanel";
import { listActiveMembers } from "@/lib/board/db";
import { listAllSendIdentities } from "@/lib/board/send-identities";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

export default async function BoardSendAsPage() {
  const member = await requireMember();
  if (member.role !== "president" && member.role !== "officer") {
    redirect("/board/people");
  }

  const db = getDb();
  const [identities, members] = await Promise.all([
    listAllSendIdentities(db),
    listActiveMembers(db),
  ]);

  return (
    <div>
      <Link
        href="/board/people"
        className="mb-6 inline-flex text-sm text-neutral-500 transition-colors hover:text-redleg lg:mb-8"
      >
        ← People
      </Link>
      <BoardPageHeader
        title="Chapter send-as"
        description="Which @gatorredleg.org addresses each board member may use when responding to inbound email."
      />
      <BoardSendAsPanel identities={identities} members={members} />
    </div>
  );
}
