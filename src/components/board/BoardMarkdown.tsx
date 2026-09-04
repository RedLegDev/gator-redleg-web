import { MarkdownProse } from "@/components/MarkdownProse";

export function BoardMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none break-words prose-headings:font-heading prose-a:text-redleg prose-pre:overflow-x-auto">
      <MarkdownProse markdown={content} />
    </div>
  );
}
