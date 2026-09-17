export function formatBoardTimestamp(unixSec: number): string {
  return new Date(unixSec * 1000).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Who to show as the poster. Inbound mail uses the sender, not the system author. */
export function messagePosterName(message: {
  author_name: string;
  inbound_from_address?: string | null;
}): string {
  const from = message.inbound_from_address?.trim();
  return from || message.author_name;
}

export function parseOptionalDate(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  const s = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}
