import { cn } from "@/lib/cn";

/** Shared board form styles — text-base on mobile avoids iOS input zoom. */
export const boardInputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base md:text-sm focus:border-redleg focus:outline-none focus:ring-2 focus:ring-redleg/30";

export const boardButtonPrimaryClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-redleg px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-redleg-dark disabled:opacity-60";

export const boardButtonSecondaryClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 disabled:opacity-50";

export const boardPanelClass =
  "rounded-xl border border-neutral-200 bg-white shadow-sm";

export const boardInsetPanelClass =
  "rounded-xl border border-neutral-200 bg-neutral-50/80";

export const boardStatCardClass =
  "group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-redleg/25 hover:shadow-md lg:p-7";

export const boardListLinkClass =
  "block transition-colors hover:bg-neutral-50/90 lg:hover:bg-redleg/[0.03]";

export function boardAccentBar(className?: string) {
  return cn(
    "absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-redleg via-redleg to-gold",
    className
  );
}
