import Link from "next/link";
import { cn } from "@/lib/cn";

export function BoardPageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 border-b border-neutral-200/80 pb-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between lg:pb-8",
        className
      )}
    >
      <div className="min-w-0">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-artillery lg:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 lg:text-base">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>
      )}
    </div>
  );
}

export function BoardEmptyState({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 px-6 py-12 text-center lg:py-16">
      <p className="text-neutral-500">{children}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function BoardSectionTitle({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "danger";
}) {
  return (
    <h3
      className={cn(
        "font-heading text-xs font-semibold uppercase tracking-[0.2em]",
        variant === "danger" ? "text-redleg" : "text-neutral-500"
      )}
    >
      {children}
    </h3>
  );
}

export function BoardPublicSiteLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "text-sm text-neutral-500 transition-colors hover:text-redleg",
        className
      )}
    >
      ← Public site
    </Link>
  );
}

function memberInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function BoardMemberBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-redleg to-redleg-dark font-heading text-sm font-bold text-white shadow-inner"
        aria-hidden
      >
        {memberInitials(name)}
      </div>
      <p className="min-w-0 truncate font-medium text-white">{name}</p>
    </div>
  );
}
