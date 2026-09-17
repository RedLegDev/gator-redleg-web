export const dynamic = "force-dynamic";

import { BoardPageHeader } from "@/components/board/BoardChrome";
import { BoardTransactionsPanel } from "@/components/board/BoardTransactionsPanel";

export default function BoardTransactionsPage() {
  return (
    <div>
      <BoardPageHeader
        title="Transactions"
        description="Donations and store purchases from Stripe — same ledger the Treasurer's sheet tracks."
      />
      <BoardTransactionsPanel />
    </div>
  );
}
