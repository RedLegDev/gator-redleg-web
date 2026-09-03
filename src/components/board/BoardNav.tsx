"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/board", label: "Dashboard", exact: true },
  { href: "/board/messages", label: "Messages" },
  { href: "/board/tasks", label: "Tasks" },
  { href: "/board/me", label: "My Tasks" },
];

export function BoardNav({ memberName }: { memberName: string }) {
  const pathname = usePathname();

  return (
    <aside className="border-b border-neutral-200 bg-neutral-50 lg:border-b-0 lg:border-r lg:min-h-[60vh] lg:w-56 lg:shrink-0">
      <div className="px-4 py-5">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-redleg">
          Board Hub
        </p>
        <p className="mt-1 text-sm text-neutral-600">{memberName}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-3 lg:flex-col lg:px-3 lg:pb-6">
        {links.map(({ href, label, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "whitespace-nowrap rounded px-3 py-2 text-sm font-heading font-medium uppercase tracking-wide transition-colors",
                active
                  ? "bg-redleg text-white"
                  : "text-artillery hover:bg-neutral-200/80"
              )}
            >
              {label}
            </Link>
          );
        })}
        <form action="/api/board/logout" method="POST" className="lg:mt-2">
          <button
            type="submit"
            className="w-full whitespace-nowrap rounded px-3 py-2 text-left text-sm font-heading font-medium uppercase tracking-wide text-neutral-500 hover:bg-neutral-200/80 hover:text-artillery"
          >
            Sign out
          </button>
        </form>
      </nav>
    </aside>
  );
}
