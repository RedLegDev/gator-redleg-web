import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Softball Tournament",
  description:
    "The annual 1SG Fike Memorial Softball Tournament benefiting the Gator Redleg Chapter.",
};

export default function SoftballPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="1SG Fike Memorial Softball Tournament"
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

          <div className="mt-8">
            <Button href="/chapter-activities/softball-tournament/registration">
              Register Your Team or Sponsorship
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
