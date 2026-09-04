export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageThread } from "@/components/board/MessageThread";
import { listThreadAttachments } from "@/lib/board/attachments";
import { getMessage, listComments } from "@/lib/board/db";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

type Props = { params: Promise<{ id: string }> };

export default async function BoardMessagePage({ params }: Props) {
  await requireMember();
  const { id } = await params;
  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) notFound();
  const comments = await listComments(db, "message", id);
  const { message: messageAttachments, byCommentId } = await listThreadAttachments(
    db,
    id,
    comments.map((c) => c.id)
  );

  return (
    <div>
      <Link
        href="/board/messages"
        className="mb-6 inline-flex text-sm text-neutral-500 transition-colors hover:text-redleg lg:mb-8"
      >
        ← All messages
      </Link>
      <MessageThread
      message={message}
      comments={comments}
      messageAttachments={messageAttachments}
      commentAttachments={byCommentId}
      canPin
      />
    </div>
  );
}
