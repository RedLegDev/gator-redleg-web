import { NewMessageForm } from "@/components/board/NewMessageForm";

export default function NewBoardMessagePage() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-artillery">
        New message
      </h2>
      <NewMessageForm />
    </div>
  );
}
