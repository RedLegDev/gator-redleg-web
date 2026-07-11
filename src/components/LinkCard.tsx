import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Shared content card used across the events grid, history, and activities
 * indexes. Equal-height flex column with a scarlet top rule, a condensed
 * signage title, and a footer affordance that advances on hover.
 *
 * `meta` renders a tracked eyebrow above the title (e.g. an event date).
 */
export function LinkCard({
  href,
  title,
  blurb,
  meta,
  cta = "Learn more",
  external,
  className,
}: {
  href: string;
  title: string;
  blurb: string;
  meta?: string;
  cta?: string;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group flex h-full flex-col border-t-2 border-redleg bg-white p-6",
    "shadow-[0_1px_2px_rgba(20,20,20,0.06)] ring-1 ring-black/5",
    "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-black/10",
    "focus-visible:-translate-y-0.5 focus-visible:shadow-lg",
    className
  );

  const inner = (
    <>
      {meta && (
        <span className="font-label text-xs uppercase tracking-[0.18em] text-gold-dark">
          {meta}
        </span>
      )}
      <h3
        className={cn(
          "font-heading text-xl font-semibold leading-tight text-artillery transition-colors group-hover:text-redleg",
          meta && "mt-2"
        )}
      >
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-artillery-light">
        {blurb}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-label text-xs uppercase tracking-[0.15em] text-redleg">
        {cta}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
