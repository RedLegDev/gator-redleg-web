import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-display font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redleg focus-visible:ring-offset-2 disabled:opacity-50";

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

const variants: Record<Variant, string> = {
  primary: "bg-redleg text-white hover:bg-redleg-dark",
  secondary: "bg-gold text-artillery hover:bg-gold-dark",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-artillery",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

/** External links (http/mailto) render as <a>; internal as next/link. */
export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const external = /^(https?:|mailto:|tel:)/.test(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
