export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageThread } from "@/components/board/MessageThread";
import { listThreadAttachments } from "@/lib/board/attachments";
import {
  getInboundEmailByMessageId,
  getMessage,
  listComments,
} from "@/lib/board/db";
import { listAllowedFromAddresses } from "@/lib/board/send-identities";
import { getDb } from "@/lib/board/secrets";
import { requireMember } from "@/lib/board/session";

type Props = { params: Promise<{ id: string }> };

export default async function BoardMessagePage({ params }: Props) {
  const member = await requireMember();
  const { id } = await params;
  const db = getDb();
  const message = await getMessage(db, id);
  if (!message) notFound();
  const [comments, inbound, fromOptions] = await Promise.all([
    listComments(db, "message", id),
    getInboundEmailByMessageId(db, id),
    listAllowedFromAddresses(db, member.id),
  ]);
  const { message: messageAttachments, byCommentId } =
    await listThreadAttachments(
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
        inbound={inbound}
        sendFromAddresses={fromOptions.addresses}
        defaultFromAddress={fromOptions.defaultAddress}
      />
    </div>
  );
}
