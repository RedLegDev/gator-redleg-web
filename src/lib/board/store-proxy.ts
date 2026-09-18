import { secret } from "@/lib/board/secrets";

export const STORE_BASE_URL = "https://store.gatorredleg.org";

export type StoreTransaction = {
  id: string;
  amount: number;
  fee: number | null;
  net: number | null;
  refundedAmount: number;
  refundStatus: "none" | "partial" | "full";
  currency: string;
  customer: string | null;
  customerEmail: string | null;
  status: string;
  created: number;
  items?: Array<{
    name: string;
    quantity: number;
    amount: number;
  }>;
};

export type StoreTransactionsResponse = {
  transactions: StoreTransaction[];
  hasMore?: boolean;
  error?: string;
};

function storeSecretOrThrow(): string {
  const value = secret("BOARD_STORE_WEBHOOK_SECRET");
  if (!value) {
    throw new Error("BOARD_STORE_WEBHOOK_SECRET is not configured");
  }
  return value;
}

export async function fetchStoreTransactions(
  searchParams: URLSearchParams
): Promise<{ ok: true; data: StoreTransactionsResponse } | { ok: false; status: number; error: string }> {
  const webhookSecret = storeSecretOrThrow();
  const qs = searchParams.toString();
  const url = `${STORE_BASE_URL}/api/transactions${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    headers: { "x-board-store-secret": webhookSecret },
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as StoreTransactionsResponse;
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data.error || `Store returned ${res.status}`,
    };
  }

  return { ok: true, data };
}
