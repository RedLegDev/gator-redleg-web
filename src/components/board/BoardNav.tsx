"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/board", label: "Home", mobileLabel: "Home", exact: true },
  { href: "/board/messages", label: "Messages", mobileLabel: "Messages" },
  { href: "/board/tasks", label: "Tasks", mobileLabel: "Tasks" },
  { href: "/board/me", label: "My Tasks", mobileLabel: "Mine" },
  { href: "/board/people", label: "People", mobileLabel: "People" },
];

function linkActive(pathname: string, href: string, exact?: boolean) {
  return exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  active,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-heading font-medium uppercase tracking-wide transition-colors",
        active
          ? "bg-redleg text-white"
          : "text-artillery hover:bg-neutral-200/80",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function BoardNav({ memberName }: { memberName: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden border-neutral-200 bg-neutral-50 lg:block lg:min-h-[60vh] lg:w-56 lg:shrink-0 lg:border-r">
        <div className="px-4 py-5">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
            Board Hub
          </p>
          <p className="mt-1 text-sm text-neutral-600">{memberName}</p>
        </div>
        <nav className="flex flex-col px-3 pb-6">
          {links.map(({ href, label, exact }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              active={linkActive(pathname, href, exact)}
              className="rounded px-3 py-2.5 text-sm"
            />
          ))}
          <form action="/api/board/logout" method="POST" className="mt-2">
            <button
              type="submit"
              className="w-full rounded px-3 py-2.5 text-left text-sm font-heading font-medium uppercase tracking-wide text-neutral-500 hover:bg-neutral-200/80 hover:text-artillery"
            >
              Sign out
            </button>
          </form>
        </nav>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Board navigation"
      >
        <ul className="grid grid-cols-5">
          {links.map(({ href, mobileLabel, exact }) => {
            const active = linkActive(pathname, href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-heading font-semibold uppercase leading-tight tracking-wide",
                    active ? "text-redleg" : "text-neutral-500"
                  )}
                >
                  <span
                    className={cn(
                      "h-1 w-8 rounded-full",
                      active ? "bg-redleg" : "bg-transparent"
                    )}
                    aria-hidden
                  />
                  {mobileLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
