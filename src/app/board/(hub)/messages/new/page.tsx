import { BoardPageHeader } from "@/components/board/BoardChrome";
import { NewMessageForm } from "@/components/board/NewMessageForm";
import { boardInsetPanelClass } from "@/lib/board/ui";

export default function NewBoardMessagePage() {
  return (
    <div>
      <BoardPageHeader
        title="New message"
        description="Posts email all active members by default. Uncheck notify to post quietly, or @mention someone for a targeted alert."
      />
      <div className={`p-5 lg:p-8 ${boardInsetPanelClass}`}>
        <NewMessageForm />
      </div>
    </div>
  );
}
