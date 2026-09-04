export const dynamic = "force-dynamic";

import Link from "next/link";
import { BoardPageHeader } from "@/components/board/BoardChrome";
import { BoardPeoplePanel } from "@/components/board/BoardPeoplePanel";
import { listAllMembers } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

export default async function BoardPeoplePage() {
  const member = await requireMember();
  const members = await listAllMembers(getDb());
  const canManageSendAs =
    member.role === "president" || member.role === "officer";

  return (
    <div>
      <BoardPageHeader
        title="People"
        description="Who can sign in to the board."
      >
        {canManageSendAs ? (
          <Link
            href="/board/send-as"
            className="text-sm font-semibold text-neutral-500 underline-offset-2 hover:text-redleg hover:underline"
          >
            Chapter send-as
          </Link>
        ) : null}
      </BoardPageHeader>
      <BoardPeoplePanel
        members={members}
        currentMemberId={member.id}
      />
    </div>
  );
}
