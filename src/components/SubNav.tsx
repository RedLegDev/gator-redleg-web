"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import type { NavLink } from "@/lib/nav";
import { cn } from "@/lib/cn";

/** Second-level nav bar for sections with their own subpages (e.g. the Ball). */
export function SubNav({ items }: { items: NavLink[] }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-black/10 bg-neutral-50">
      <Container>
        <nav aria-label="Section" className="flex gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap border-b-2 px-4 py-3 font-label text-sm uppercase tracking-wide transition-colors",
                  active
                    ? "border-redleg text-redleg"
                    : "border-transparent text-artillery-muted hover:text-artillery"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
