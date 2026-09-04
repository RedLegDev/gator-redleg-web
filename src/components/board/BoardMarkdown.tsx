import { MarkdownProse } from "@/components/MarkdownProse";

export function BoardMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none break-words prose-headings:font-heading prose-headings:tracking-wide prose-p:leading-relaxed prose-a:text-redleg prose-a:no-underline hover:prose-a:underline prose-pre:overflow-x-auto prose-sm sm:prose-base">
      <MarkdownProse markdown={content} />
    </div>
  );
}
