"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, FACEBOOK_URL } from "@/lib/nav";
import { cn } from "@/lib/cn";

const LOGO = "/lovable-uploads/c4320cdb-23e3-429d-bdeb-cc34787d252c.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-artillery text-white shadow-lg">
      {/* Utility strip — chapter motto */}
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-1.5 sm:px-8">
          <p className="font-label text-[0.68rem] uppercase tracking-[0.25em] text-gold">
            Vestigia Nulla Retrorsum
            <span className="mx-2 text-white/30">·</span>
            <span className="text-white/60">Never Retreat</span>
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[0.68rem] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-gold"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LOGO}
            alt="Gator Redleg Chapter crest"
            width={52}
            height={52}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-wide text-white sm:text-xl">
              GATOR REDLEGS
            </span>
            <span className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-gold">
              US Field Artillery Association
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV.map((group) => (
              <li key={group.href} className="group relative">
                <Link
                  href={group.href}
                  className={cn(
                    "block px-3 py-2 font-label text-sm uppercase tracking-wide transition-colors hover:text-gold",
                    pathname === group.href ||
                      (group.href !== "/" && pathname.startsWith(group.href))
                      ? "text-gold"
                      : "text-white/85"
                  )}
                >
                  {group.label}
                </Link>
                {group.children && (
                  <div className="invisible absolute left-0 top-full min-w-56 origin-top -translate-y-1 opacity-0 transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="mt-1 border-t-2 border-gold bg-artillery-light py-1 shadow-xl">
                      {group.children.map((child) => (
                        <li key={child.href}>
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-white/85 transition-colors hover:bg-redleg hover:text-white"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-white/85 transition-colors hover:bg-redleg hover:text-white"
                            >
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="border-t border-white/10 bg-artillery-light lg:hidden"
          aria-label="Primary mobile"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {NAV.map((group) => (
              <li key={group.href} className="border-b border-white/5 py-1">
                <Link
                  href={group.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 font-label text-sm uppercase tracking-wide text-white hover:text-gold"
                >
                  {group.label}
                </Link>
                {group.children && (
                  <ul className="pb-2 pl-4">
                    {group.children.map((child) =>
                      child.external ? (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-1 text-sm text-white/70 hover:text-gold"
                          >
                            {child.label}
                          </a>
                        </li>
                      ) : (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-1 text-sm text-white/70 hover:text-gold"
                          >
                            {child.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
