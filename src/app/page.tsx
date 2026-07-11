import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { AzimuthRule } from "@/components/AzimuthRule";

const LOGO = "/lovable-uploads/c4320cdb-23e3-429d-bdeb-cc34787d252c.png";

const EVENTS = [
  {
    name: "St. Barbara's Ball",
    when: "November",
    blurb:
      "Our premier annual event honoring the patron saint of the Field Artillery.",
    href: "/chapter-activities/st-barbaras-ball",
  },
  {
    name: "Golf Tournament",
    when: "Spring",
    blurb: "A day on the course to raise funds for the chapter and our Soldiers.",
    href: "/chapter-activities/golf-tournament",
  },
  {
    name: "Kenny Fike Memorial Softball",
    when: "Fall",
    blurb: "Bats, gloves, and camaraderie in memory of one of our own.",
    href: "/chapter-activities/softball-tournament",
  },
  {
    name: "5K Fun Run",
    when: "Annual",
    blurb: "Lace up and step off in support of Florida's Redlegs.",
    href: "/chapter-activities/5k-run",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-artillery text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 75% 30%, rgba(200,16,46,0.45) 0%, transparent 70%)",
          }}
        />
        <Container className="relative grid items-center gap-10 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div>
            <p className="font-label text-sm uppercase tracking-[0.3em] text-gold">
              Florida Chapter · US Field Artillery Association
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
              Gator
              <br />
              Redlegs
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Serving Florida&apos;s Field Artillery Soldiers, veterans, and
              their families — promoting the efficiency of the branch, keeping
              its traditions, and honoring those who serve the King of Battle.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/membership" variant="primary" size="lg">
                Become a Member
              </Button>
              <Button href="/support" variant="outline" size="lg">
                Support the Chapter
              </Button>
            </div>
          </div>

          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 -z-0 rounded-full bg-gold/10 blur-3xl" />
            <Image
              src={LOGO}
              alt="Gator Redleg Chapter crest"
              width={520}
              height={520}
              className="relative z-10 w-full drop-shadow-2xl"
              priority
            />
          </div>
        </Container>

        {/* Motto strip */}
        <div className="relative border-t border-white/10 bg-black/40">
          <Container className="py-3 text-center">
            <p className="font-display text-sm uppercase tracking-[0.35em] text-gold sm:text-base">
              Vestigia Nulla Retrorsum — Never Retreat
            </p>
          </Container>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-label text-sm uppercase tracking-[0.3em] text-redleg">
              Our Mission
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-artillery sm:text-4xl">
              For the Redlegs of Florida
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-artillery-light">
              The Gator Redleg Chapter promotes the efficiency of the Field
              Artillery, maintains its history and traditions, perpetuates the
              memory of the fallen, and supports our Soldiers through
              scholarships and charitable contributions — fostering camaraderie
              across the profession of arms.
            </p>
          </div>
          <AzimuthRule className="mx-auto mt-12 max-w-md" />
        </Container>
      </section>

      {/* Events */}
      <section className="bg-neutral-50 py-20">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-label text-sm uppercase tracking-[0.3em] text-redleg">
                On the Firing Line
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-artillery sm:text-4xl">
                Chapter Events
              </h2>
            </div>
            <Button
              href="/chapter-activities"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              All Activities
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EVENTS.map((e) => (
              <a
                key={e.name}
                href={e.href}
                className="group flex flex-col border-t-4 border-redleg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="font-label text-xs uppercase tracking-widest text-artillery-muted">
                  {e.when}
                </span>
                <span className="mt-2 font-display text-xl font-semibold text-artillery group-hover:text-redleg">
                  {e.name}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-artillery-light">
                  {e.blurb}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Support CTA */}
      <section className="bg-artillery py-20 text-white">
        <Container className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">
              Stand with our Soldiers
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Every dollar raised supports scholarships, unit initiatives, and
              Soldiers and families in need across Florida&apos;s Field
              Artillery. Your generosity keeps the guns loud and the traditions
              alive.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Button href="/support/fundraising" variant="primary" size="lg">
              Donate
            </Button>
            <Button href="/membership" variant="secondary" size="lg">
              Join Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
