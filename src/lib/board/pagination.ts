export const MESSAGE_PAGE_SIZE = 50;
export const MESSAGE_PAGE_SIZE_MAX = 100;

export function parsePage(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export function parsePageSize(raw: string | null | undefined): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return MESSAGE_PAGE_SIZE;
  return Math.min(n, MESSAGE_PAGE_SIZE_MAX);
}

export function clampPage(
  page: number,
  total: number,
  pageSize: number
): number {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return Math.min(page, pages);
}

export function pageCount(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}

export function messagesListHref(opts: {
  archived?: boolean;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (opts.archived) params.set("archived", "1");
  if (opts.page && opts.page > 1) params.set("page", String(opts.page));
  const q = params.toString();
  return q ? `/board/messages?${q}` : "/board/messages";
}
