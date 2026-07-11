import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Softball Tournament",
  description:
    "The annual Kenny Fike Memorial Softball Tournament benefiting the Gator Redleg Chapter.",
};

export default function SoftballPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="Kenny Fike Memorial Softball Tournament"
        subtitle="Open to the public — proceeds benefit the Gator Redleg Chapter."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <div className="rounded border-l-4 border-redleg bg-neutral-50 p-6">
            <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
              Winter Haven Diamondplex
            </p>
            <p className="mt-1 text-artillery-light">
              85 PSC Access Rd, Winter Haven, FL 33881
            </p>
            <p className="mt-2 text-sm text-artillery-muted">
              Concession stand will be operational.
            </p>
          </div>

          <p className="mt-6 leading-relaxed text-artillery-light">
            Open to the public. Proceeds benefit the Gator Redleg Chapter —
            United States Field Artillery Association, whose focus is to honor
            and recognize past and present United States Field Artillerymen.
          </p>

          <div className="mt-8 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
              Not currently scheduled
            </p>
            <p className="mt-2 text-sm text-artillery-light">
              Registration will open when the next tournament is announced.
              Follow us on{" "}
              <a
                href="https://m.facebook.com/pages/Gator-Redleg-Chapter-of-US-Field-Artillery-Association/159706074074450"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-redleg underline"
              >
                Facebook
              </a>{" "}
              for updates.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
