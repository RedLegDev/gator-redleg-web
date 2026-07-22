import { cn } from "@/lib/cn";

/**
 * Body-content typography wrapper. Tuned for the reading pages (history,
 * mission, etc.) — comfortable measure, scarlet links, inscriptional headings.
 */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl text-[1.05rem] leading-relaxed text-artillery-light",
        "[&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-artillery",
        "[&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-artillery",
        "[&_h4]:mt-6 [&_h4]:scroll-mt-28 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:uppercase [&_h4]:tracking-wide [&_h4]:text-artillery",
        "[&_p]:mt-4",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5",
        "[&_a]:font-medium [&_a]:text-redleg [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-redleg-dark",
        "[&_strong]:text-artillery",
        "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border-b-2 [&_th]:border-gold [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-heading [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-artillery",
        "[&_td]:border-b [&_td]:border-artillery-light/15 [&_td]:px-3 [&_td]:py-2",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-6 [&_blockquote]:italic",
        className
      )}
    >
      {children}
    </div>
  );
}
