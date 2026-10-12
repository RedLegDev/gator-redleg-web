// Branded member notifications (comments, mentions, posts, task assignments).
// Same maroon/gold shell as the public form emails (src/lib/contact.ts), with
// the markdown body rendered inline so members can read it without clicking.

import type { Element, ElementContent, Root } from "hast";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const MAROON = "#B22234";
const GOLD = "#FFD700";

/** Inline styles per tag — mail clients ignore <style> blocks. */
const TAG_STYLES: Record<string, string> = {
  p: "margin:0 0 12px 0;",
  a: `color:${MAROON};`,
  blockquote: "margin:0 0 12px 0;padding:4px 12px;border-left:3px solid #ccc;color:#555;",
  code: "font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;background:#f3f3f3;padding:1px 4px;border-radius:3px;",
  pre: "margin:0 0 12px 0;padding:10px;background:#f3f3f3;border-radius:4px;overflow-x:auto;white-space:pre-wrap;",
  ul: "margin:0 0 12px 0;padding-left:22px;",
  ol: "margin:0 0 12px 0;padding-left:22px;",
  li: "margin:0 0 4px 0;",
  h1: "margin:0 0 10px 0;font-size:18px;",
  h2: "margin:0 0 10px 0;font-size:17px;",
  h3: "margin:0 0 8px 0;font-size:16px;",
  h4: "margin:0 0 8px 0;font-size:15px;",
  table: "border-collapse:collapse;margin:0 0 12px 0;",
  th: "border:1px solid #ddd;padding:4px 8px;text-align:left;background:#f3f3f3;",
  td: "border:1px solid #ddd;padding:4px 8px;",
  img: "max-width:100%;height:auto;",
  hr: "border:none;border-top:1px solid #ddd;margin:12px 0;",
};

function inlineStyles() {
  return (tree: Root) => {
    const walk = (nodes: ElementContent[] | Root["children"]) => {
      for (const node of nodes) {
        if (node.type !== "element") continue;
        const el = node as Element;
        const style = TAG_STYLES[el.tagName];
        if (style) el.properties = { ...el.properties, style };
        walk(el.children);
      }
    };
    walk(tree.children);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype) // raw HTML in the markdown is dropped, not passed through
  .use(inlineStyles)
  .use(rehypeStringify);

export function markdownToEmailHtml(markdown: string): string {
  return String(processor.processSync(markdown));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBoardNotificationEmail(args: {
  /** Banner line, e.g. "NEW COMMENT". */
  heading: string;
  /** One-line summary, plain text, e.g. "Jane Doe commented on: Ball venue". */
  summary: string;
  /** Message or task title, shown in the gold callout. */
  title: string;
  /** Markdown content to show inline (comment, post body, task notes). */
  bodyMd?: string | null;
  /** Optional plain-text detail rows under the title. */
  details?: Array<[label: string, value: string]>;
  link: string;
  linkLabel: string;
}): { text: string; html: string } {
  const body = args.bodyMd?.trim() ?? "";
  const details = args.details ?? [];

  const text = [
    args.summary,
    "",
    args.title,
    ...details.map(([label, value]) => `${label}: ${value}`),
    ...(body ? ["", body] : []),
    "",
    `${args.linkLabel}: ${args.link}`,
  ].join("\n");

  const detailRows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 0;font-weight:bold;width:30%;">${escapeHtml(label)}:</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  const link = escapeHtml(args.link);

  const html = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0;">
  <div style="background-color:${MAROON};color:white;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:22px;">${escapeHtml(args.heading)}</h2>
    <p style="margin:5px 0;font-size:14px;color:${GOLD};">Gator Redleg Chapter, USFAA</p>
  </div>
  <div style="background-color:#f9f9f9;padding:20px;">
    <p style="margin:0 0 12px 0;">${escapeHtml(args.summary)}</p>
    <div style="background-color:#FFF9E6;padding:12px;border-left:4px solid ${GOLD};margin-bottom:${body ? "15px" : "0"};">
      <strong style="color:${MAROON};">${escapeHtml(args.title)}</strong>
      ${detailRows ? `<table style="width:100%;border-collapse:collapse;margin-top:6px;font-size:14px;">${detailRows}</table>` : ""}
    </div>
    ${body ? `<div style="background-color:white;padding:15px;border-left:4px solid ${MAROON};">${markdownToEmailHtml(body)}</div>` : ""}
    <p style="margin:20px 0 0 0;text-align:center;">
      <a href="${link}" style="display:inline-block;background-color:${MAROON};color:white;text-decoration:none;font-weight:bold;padding:10px 20px;border-radius:4px;">${escapeHtml(args.linkLabel)}</a>
    </p>
  </div>
  <div style="background-color:#333;color:white;padding:15px;text-align:center;">
    <p style="margin:0;font-size:12px;font-style:italic;">VESTIGIA NULLA RETRORSUM</p>
    <p style="margin:5px 0 0 0;font-size:12px;color:#999;">You get this because you're on the Gator Redleg board hub.</p>
  </div>
</body></html>`.trim();

  return { text, html };
}
