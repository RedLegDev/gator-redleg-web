export const dynamic = "force-dynamic";

import { BoardPageHeader } from "@/components/board/BoardChrome";
import { BoardPeoplePanel } from "@/components/board/BoardPeoplePanel";
import { listAllMembers } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

export default async function BoardPeoplePage() {
  const member = await requireMember();
  const members = await listAllMembers(getDb());

  return (
    <div>
      <BoardPageHeader
        title="People"
        description="Manage who can access the board hub with one-time email code sign-in."
      />
      <BoardPeoplePanel
        members={members}
        currentMemberId={member.id}
        isPresident={
          member.role === "president" || member.role === "officer"
        }
      />
    </div>
  );
}
