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

/** Board hub path for a single task (its detail page with comments). */
export function taskPath(task: { id: string; list_id: string }): string {
  return `/board/tasks/${task.list_id}/${task.id}`;
}

/** Today as YYYY-MM-DD in the chapter's time zone. */
function chapterToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

/** "Nov 1" (or "Nov 1, 2027" outside this year) plus whether an open task is past due. */
export function formatDueDate(
  due: string,
  completed: boolean
): { label: string; overdue: boolean } {
  const [y, m, d] = due.split("-").map(Number);
  const today = chapterToday();
  const label = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    ...(String(y) === today.slice(0, 4) ? {} : { year: "numeric" }),
  });
  return { label, overdue: !completed && due < today };
}
