"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BoardMemberBadge } from "@/components/board/BoardChrome";
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

export function BoardNav({ memberName }: { memberName: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:self-stretch lg:bg-artillery lg:text-white">
        <div className="border-b border-white/10 px-5 py-6">
          <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-gold">
            Board Hub
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-tight text-white">
            Chapter Board
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/45">
            Executive coordination
          </p>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <BoardMemberBadge name={memberName} />
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-5" aria-label="Board">
          {links.map(({ href, label, exact }) => {
            const active = linkActive(pathname, href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-lg px-4 py-2.5 font-heading text-sm font-medium uppercase tracking-wide transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                )}
              >
                {active && (
                  <span
                    className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gold"
                    aria-hidden
                  />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-5 py-4">
          <form action="/api/board/logout" method="POST">
            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2.5 text-left font-heading text-sm font-medium uppercase tracking-wide text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
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
