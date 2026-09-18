"use client";

import { useCallback, useEffect, useState } from "react";
import type { StoreTransaction } from "@/lib/board/store-proxy";
import {
  boardButtonPrimaryClass,
  boardButtonSecondaryClass,
  boardInputClass,
  boardPanelClass,
  boardStatCardClass,
} from "@/lib/board/ui";
import { cn } from "@/lib/cn";

function defaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split("T")[0]!;
}

function defaultEndDate() {
  return new Date().toISOString().split("T")[0]!;
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function statusLabel(status: string) {
  switch (status) {
    case "partial_refund":
      return "Partial refund";
    case "requires_confirmation":
      return "Needs confirmation";
    default:
      return status.replace(/_/g, " ");
  }
}

function statusClass(status: string) {
  switch (status) {
    case "succeeded":
      return "bg-green-50 text-green-800 border-green-200";
    case "pending":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "failed":
      return "bg-red-50 text-red-800 border-red-200";
    case "canceled":
      return "bg-orange-50 text-orange-800 border-orange-200";
    case "refunded":
    case "partial_refund":
      return "bg-violet-50 text-violet-800 border-violet-200";
    default:
      return "bg-neutral-50 text-neutral-700 border-neutral-200";
  }
}

function isKeptRevenue(t: StoreTransaction) {
  return t.status === "succeeded" || t.status === "partial_refund";
}

function keptAmount(t: StoreTransaction) {
  return Math.max(0, t.amount - (t.refundedAmount ?? 0));
}

export function BoardTransactionsPanel() {
  const [transactions, setTransactions] = useState<StoreTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const fetchTransactions = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) setLoading(true);
        const params = new URLSearchParams();
        if (startDate) params.set("start_date", startDate);
        if (endDate) params.set("end_date", endDate);

        const res = await fetch(`/api/board/transactions?${params}`);
        const body = (await res.json()) as {
          ok?: boolean;
          data?: { transactions?: StoreTransaction[] };
          error?: string;
        };
        if (!res.ok || !body.ok) {
          throw new Error(body.error || "Failed to fetch transactions");
        }
        setTransactions(body.data?.transactions ?? []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load transactions");
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchTransactions(false);
    }, 60_000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  const filtered = transactions.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      t.customerEmail?.toLowerCase().includes(q) ||
      t.customer?.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.items?.some((item) => item.name.toLowerCase().includes(q));

    let matchesStatus = true;
    if (statusFilter === "refunded") {
      matchesStatus = t.status === "refunded" || t.status === "partial_refund";
    } else if (statusFilter !== "all") {
      matchesStatus = t.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const revenueRows = filtered.filter(isKeptRevenue);
  const totalRevenue = revenueRows.reduce((sum, t) => sum + keptAmount(t), 0);
  const totalRefunded = filtered.reduce(
    (sum, t) => sum + (t.refundedAmount ?? 0),
    0
  );
  const totalFees = revenueRows.reduce((sum, t) => sum + (t.fee ?? 0), 0);
  const totalNet = revenueRows.reduce((sum, t) => {
    if (t.status === "partial_refund") return sum + keptAmount(t);
    return sum + (t.net ?? t.amount);
  }, 0);
  const hasFeeData = revenueRows.some((t) => t.fee != null || t.net != null);
  const keptCount = transactions.filter(isKeptRevenue).length;
  const refundedCount = transactions.filter(
    (t) => t.status === "refunded" || t.status === "partial_refund"
  ).length;

  if (loading) {
    return (
      <div className={cn(boardPanelClass, "px-6 py-16 text-center text-sm text-neutral-500")}>
        Loading transactions…
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(boardPanelClass, "px-6 py-12 text-center")}>
        <p className="font-medium text-redleg">{error}</p>
        <button
          type="button"
          onClick={() => void fetchTransactions()}
          className={cn(boardButtonPrimaryClass, "mt-4")}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className={boardStatCardClass}>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
            Gross kept
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-artillery">
            {formatCurrency(totalRevenue, "USD")}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            After refunds in this filter
          </p>
        </div>
        <div className={boardStatCardClass}>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
            Refunded
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-artillery">
            {formatCurrency(totalRefunded, "USD")}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {refundedCount} refunded in range
          </p>
        </div>
        <div className={boardStatCardClass}>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
            Fees
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-artillery">
            {hasFeeData ? formatCurrency(totalFees, "USD") : "—"}
          </p>
          <p className="mt-1 text-sm text-neutral-500">Stripe processing</p>
        </div>
        <div className={boardStatCardClass}>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
            Kept payments
          </p>
          <p className="mt-3 font-display text-3xl font-semibold text-artillery">
            {keptCount}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Net {formatCurrency(totalNet, "USD")} after fees
          </p>
        </div>
      </div>

      <div className={cn(boardPanelClass, "space-y-4 p-4 lg:p-5")}>
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-600">From</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={boardInputClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-neutral-600">To</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={boardInputClass}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setStartDate(defaultStartDate());
              setEndDate(defaultEndDate());
            }}
            className={boardButtonSecondaryClass}
          >
            Last 30 days
          </button>
          <button
            type="button"
            onClick={() => void fetchTransactions()}
            className={boardButtonSecondaryClass}
          >
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <label className="block min-w-0 flex-1 text-sm">
            <span className="mb-1 block font-medium text-neutral-600">
              Search
            </span>
            <input
              type="search"
              placeholder="Email, name, item, or payment ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={boardInputClass}
            />
          </label>
          <label className="block text-sm lg:w-56">
            <span className="mb-1 block font-medium text-neutral-600">
              Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={boardInputClass}
            >
              <option value="all">All</option>
              <option value="succeeded">Succeeded</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
              <option value="requires_confirmation">Needs confirmation</option>
              <option value="failed">Failed</option>
              <option value="canceled">Canceled</option>
            </select>
          </label>
        </div>
      </div>

      <div className={cn(boardPanelClass, "overflow-hidden")}>
        {filtered.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-neutral-500">
            No transactions match these filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50/80">
                <tr>
                  <th className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    When
                  </th>
                  <th className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Customer
                  </th>
                  <th className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Items
                  </th>
                  <th className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Amount
                  </th>
                  <th className="px-4 py-3 font-heading text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                      {formatDate(t.created)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-artillery">
                        {t.customerEmail || t.customer || "No email"}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-neutral-400">{t.id}</div>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-700">
                      {t.items && t.items.length > 0 ? (
                        <ul className="space-y-0.5">
                          {t.items.map((item, idx) => (
                            <li key={`${t.id}-${idx}`}>
                              {item.quantity}× {item.name} (
                              {formatCurrency(item.amount, t.currency)})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="italic text-neutral-400">No item metadata</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <div
                        className={cn(
                          "font-semibold text-artillery",
                          t.status === "refunded" && "line-through text-neutral-400"
                        )}
                      >
                        {formatCurrency(t.amount, t.currency)}
                      </div>
                      {(t.refundedAmount ?? 0) > 0 && (
                        <div className="mt-0.5 text-xs font-medium text-violet-700">
                          Refunded {formatCurrency(t.refundedAmount, t.currency)}
                          {t.status === "partial_refund"
                            ? ` · kept ${formatCurrency(keptAmount(t), t.currency)}`
                            : ""}
                        </div>
                      )}
                      {t.net != null && t.status === "succeeded" && (
                        <div className="mt-0.5 text-xs text-neutral-500">
                          Net {formatCurrency(t.net, t.currency)}
                          {t.fee != null
                            ? ` · fee ${formatCurrency(t.fee, t.currency)}`
                            : ""}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                          statusClass(t.status)
                        )}
                      >
                        {statusLabel(t.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-neutral-500">
        Showing {filtered.length} of {transactions.length} transactions
      </p>
    </div>
  );
}
