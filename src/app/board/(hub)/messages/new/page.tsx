import { BoardPageHeader } from "@/components/board/BoardChrome";
import { NewMessageForm } from "@/components/board/NewMessageForm";

export default function NewBoardMessagePage() {
  return (
    <div>
      <BoardPageHeader
        title="New message"
        description="Posts email all active members by default. Uncheck notify to post quietly, or @mention someone for a targeted alert."
      />
      <NewMessageForm />
    </div>
  );
}
