import Link from "next/link";
import { cn } from "@/lib/cn";

/** Concentric aiming-circle dial — faint watermark for board auth. */
function AimingCircle({ className }: { className?: string }) {
  const ticks = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="94" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="70" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="44" strokeWidth="0.75" />
      {ticks.map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="6"
          x2="100"
          y2={deg % 30 === 0 ? 18 : 12}
          strokeWidth={deg % 90 === 0 ? 1.5 : 0.75}
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <line x1="100" y1="6" x2="100" y2="194" strokeWidth="0.5" />
      <line x1="6" y1="100" x2="194" y2="100" strokeWidth="0.5" />
    </svg>
  );
}

/**
 * Full-bleed sign-in / verify shell — matches board hub artillery register.
 */
export function BoardAuthShell({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-artillery text-white",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 80% at 0% 0%, rgba(200,16,46,0.45) 0%, transparent 55%), radial-gradient(40% 50% at 100% 100%, rgba(212,175,55,0.12) 0%, transparent 50%)",
        }}
      />
      <AimingCircle className="pointer-events-none absolute -right-24 bottom-[-20%] h-[85vmin] w-[85vmin] text-gold/[0.08] sm:-right-16 sm:bottom-[-10%] lg:right-[42%] lg:top-1/2 lg:bottom-auto lg:h-[110%] lg:w-auto lg:-translate-y-1/2 lg:translate-x-1/2" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl lg:grid-cols-2">
        <div className="flex flex-col justify-between px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div>
            <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-gold">
              Board Hub
            </p>
            <h1 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-wide sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-10 space-y-4 lg:mt-0">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-gold/80">
              Vestigia Nulla Retrorsum
            </p>
            <p className="max-w-xs text-sm text-white/45">
              Executive board and members at large — one-time code sign-in.
            </p>
            <Link
              href="/"
              className="inline-flex text-sm text-white/55 transition-colors hover:text-gold"
            >
              ← Back to public site
            </Link>
          </div>
        </div>

        <div className="flex items-end px-5 pb-10 sm:px-8 sm:pb-14 lg:items-center lg:px-12 lg:py-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-artillery shadow-[0_24px_80px_-28px_rgba(0,0,0,0.65)] sm:p-8">
            {children}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-redleg via-gold to-redleg" />
    </section>
  );
}
