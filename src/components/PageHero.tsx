import { Container } from "@/components/Container";

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
