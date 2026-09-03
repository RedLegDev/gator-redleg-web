export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { MessageThread } from "@/components/board/MessageThread";
import { getMessage, listComments } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { isPresident, requireMember } from "@/lib/board/session";

type Props = { params: Promise<{ id: string }> };

export default async function BoardMessagePage({ params }: Props) {
  const member = await requireMember();
  const { id } = await params;
  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) notFound();
  const comments = await listComments(db, "message", id);

  return (
    <MessageThread
      message={message}
      comments={comments}
      canPin={isPresident(member)}
    />
  );
}
