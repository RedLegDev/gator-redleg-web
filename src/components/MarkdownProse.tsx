import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { Prose } from "@/components/Prose";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return headingText(el.props.children);
  }
  return "";
}

const components: Components = {
  a({ href = "", children }) {
    const external = href.startsWith("http") || href.startsWith("//");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link href={href}>{children}</Link>;
  },
  h2({ children }) {
    const id = slugify(headingText(children));
    return <h2 id={id}>{children}</h2>;
  },
  h3({ children }) {
    const id = slugify(headingText(children));
    return <h3 id={id}>{children}</h3>;
  },
  h4({ children }) {
    const id = slugify(headingText(children));
    return <h4 id={id}>{children}</h4>;
  },
};

/**
 * Renders markdown through the shared Prose typography shell.
 * Used for living chapter docs (SOP and future Basecamp→site moves).
 */
export function MarkdownProse({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <Prose className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </Prose>
  );
}

/** Pull h2 headings from markdown for an on-page table of contents. */
export function markdownToc(markdown: string): Array<{ id: string; label: string }> {
  const toc: Array<{ id: string; label: string }> = [];
  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line);
    if (!match) continue;
    const label = match[1].trim();
    toc.push({ id: slugify(label), label });
  }
  return toc;
}
