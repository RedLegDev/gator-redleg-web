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
        "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-artillery",
        "[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-artillery",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5",
        "[&_a]:font-medium [&_a]:text-redleg [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-redleg-dark",
        "[&_strong]:text-artillery",
        className
      )}
    >
      {children}
    </div>
  );
}
