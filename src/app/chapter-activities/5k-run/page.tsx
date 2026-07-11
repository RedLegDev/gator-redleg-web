import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "5K Run",
  description: "The Gator Redleg 5K Fun Run — our newest charity event.",
};

export default function RunPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="5K Fun Run"
        subtitle="Our newest event — lace up in support of Florida's Redlegs."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg 5K Fun Run brings the community together for a
            morning of fitness and camaraderie, raising funds for the chapter and
            the Soldiers and families we support.
          </p>
          <div className="mt-8">
            <Button href="/chapter-activities/5k-run/registration">
              Registration
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
