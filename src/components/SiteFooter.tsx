import Link from "next/link";
import Image from "next/image";
import { NAV, FACEBOOK_URL, BASECAMP_URL, ZOOM_PATH } from "@/lib/nav";
import { Container } from "@/components/Container";

const LOGO = "/lovable-uploads/c4320cdb-23e3-429d-bdeb-cc34787d252c.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-artillery text-white/70">
      {/* gold top edge */}
      <div className="h-1 w-full bg-gradient-to-r from-redleg via-gold to-redleg" />
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={LOGO}
                alt="Gator Redleg Chapter crest"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-wide text-white">
                GATOR REDLEGS
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              The Gator Redleg Chapter of the United States Field Artillery
              Association serves Florida&apos;s Field Artillery Soldiers,
              veterans, and their families in support of the 116th Field
              Artillery Regiment.
            </p>
            <p className="mt-4 font-label text-xs uppercase tracking-widest text-gold">
              501(c)(3) Non-Profit · EIN 82-4625785
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {NAV.filter((g) => g.children && g.children.length).map((group) => (
              <div key={group.href}>
                <Link
                  href={group.href}
                  className="font-label text-sm uppercase tracking-wide text-white transition-colors hover:text-gold"
                >
                  {group.label}
                </Link>
                <ul className="mt-3 space-y-2">
                  {group.children!.map((child) => (
                    <li key={child.href}>
                      {child.external ? (
                        <a
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm transition-colors hover:text-gold"
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link
                          href={child.href}
                          className="text-sm transition-colors hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-white/50">
            Vestigia Nulla Retrorsum — Never Retreat
          </p>
          <div className="flex items-center gap-5 text-xs">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Facebook
            </a>
            <a
              href="https://store.gatorredleg.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Store
            </a>
            <a
              href={BASECAMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Basecamp
            </a>
            <Link href={ZOOM_PATH} className="transition-colors hover:text-gold">
              Zoom
            </Link>
            <span className="text-white/40">
              © {new Date().getFullYear()} Gator Redleg Chapter
            </span>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-white/30 sm:text-right">
          Managed by{" "}
          <a
            href="https://redleg.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Red Leg Dev, LLC
          </a>
        </p>
      </Container>
    </footer>
  );
}
