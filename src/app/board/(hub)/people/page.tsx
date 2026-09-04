export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { BoardPeoplePanel } from "@/components/board/BoardPeoplePanel";
import { listAllMembers } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { isPresident, requireMember } from "@/lib/board/session";

export default async function BoardPeoplePage() {
  const member = await requireMember();
  if (!isPresident(member)) notFound();
  const members = await listAllMembers(getDb());

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-artillery">People</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Manage who can access the board hub.
      </p>
      <div className="mt-6">
        <BoardPeoplePanel members={members} currentMemberId={member.id} />
      </div>
    </div>
  );
}
