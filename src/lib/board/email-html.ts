/** Heuristic for bodies that are HTML (or HTML dumped into a text part). */
export function looksLikeHtml(value: string): boolean {
  const s = value.trim();
  if (!s) return false;
  if (/^<!DOCTYPE\s+html/i.test(s) || /^<html[\s>]/i.test(s)) return true;
  const tags = s.match(/<\/?[a-zA-Z][a-zA-Z0-9-]*\b[^>]*>/g);
  return (tags?.length ?? 0) >= 3;
}

/** Prefer a real HTML part; fall back to a text part that is actually markup. */
export function inboundHtmlToStore(html: string, text: string): string {
  if (html && looksLikeHtml(html)) return html;
  if (looksLikeHtml(text)) return text;
  return "";
}

/** Plain-text fallback when PostalMime has HTML but no text part. */
export function textFromHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

const PREVIEW_CSP =
  "default-src 'none'; img-src https: http: data:; style-src 'unsafe-inline' https:; font-src https: data:";

const PREVIEW_HEAD = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}"><base target="_blank" rel="noopener noreferrer"><style>html,body{margin:0;padding:8px}img{max-width:100%;height:auto}</style>`;

/** Wrap inbound HTML for a sandboxed srcDoc preview. */
export function emailPreviewSrcDoc(html: string): string {
  const trimmed = html.trim();
  if (/<html[\s>]/i.test(trimmed)) {
    if (/<head[\s>]/i.test(trimmed)) {
      return trimmed.replace(/<head([^>]*)>/i, `<head$1>${PREVIEW_HEAD}`);
    }
    return trimmed.replace(/<html([^>]*)>/i, `<html$1><head>${PREVIEW_HEAD}</head>`);
  }
  return `<!DOCTYPE html><html><head>${PREVIEW_HEAD}</head><body>${trimmed}</body></html>`;
}
