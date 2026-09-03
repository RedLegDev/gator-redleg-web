import { MarkdownProse } from "@/components/MarkdownProse";

export function BoardMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-heading prose-a:text-redleg">
      <MarkdownProse markdown={content} />
    </div>
  );
}
