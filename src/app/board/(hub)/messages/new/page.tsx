import { BoardPageHeader } from "@/components/board/BoardChrome";
import { NewMessageForm } from "@/components/board/NewMessageForm";
import { boardInsetPanelClass } from "@/lib/board/ui";

export default function NewBoardMessagePage() {
  return (
    <div>
      <BoardPageHeader
        title="New message"
        description="Post to the full board. Use @mentions to notify specific members."
      />
      <div className={`p-5 lg:p-8 ${boardInsetPanelClass}`}>
        <NewMessageForm />
      </div>
    </div>
  );
}
