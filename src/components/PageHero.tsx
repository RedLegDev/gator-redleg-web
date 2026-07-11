import { Container } from "@/components/Container";

/** Concentric aiming-circle dial with an azimuth index — a faint watermark. */
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
 * Interior page header band. Scarlet-on-artillery with the inscriptional
 * display face, matching the home hero's register.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-artillery text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 120% at 15% 0%, rgba(200,16,46,0.4) 0%, transparent 60%)",
        }}
      />
      {/* Aiming-circle motif — echoes the azimuth signature and balances the
          left-set title on wide screens. */}
      <AimingCircle className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] -translate-y-1/2 text-gold/10 lg:block" />
      <Container className="relative py-14 sm:py-20">
        {eyebrow && (
          <p className="font-label text-sm uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight tracking-wide sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {subtitle}
          </p>
        )}
      </Container>
      <div className="h-1 w-full bg-gradient-to-r from-redleg via-gold to-redleg" />
    </section>
  );
}
