import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsorship opportunities for the 2026 St. Barbara's Ball supporting Florida's Field Artillery.",
};

const TIERS = [
  { level: "$100", label: "Supporter" },
  { level: "$500", label: "Patron" },
  { level: "$2,000", label: "Benefactor" },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="St. Barbara's Ball" title="Sponsors" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            We&apos;re actively looking for sponsors to help offset the cost of
            the evening so we can get as many Redlegs through the door as
            possible. Your sponsorship expresses your support for Florida&apos;s
            artillery Soldiers and promotes your brand to the Field Artillery
            community. All funds collected go directly toward supporting the
            Chapter&apos;s mission and event costs for our troops.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.level}
                className="border-t-4 border-gold bg-neutral-50 p-5 text-center"
              >
                <p className="font-display text-2xl font-bold text-artillery">
                  {t.level}
                </p>
                <p className="mt-1 font-label text-xs uppercase tracking-widest text-artillery-muted">
                  {t.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-artillery-light">
            Interested in backing the event? Reach out and we&apos;d be glad to
            talk through the options.
          </p>
          <div className="mt-4">
            <Button href="mailto:president@gatorredleg.org">
              Contact Us About Sponsorship
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
