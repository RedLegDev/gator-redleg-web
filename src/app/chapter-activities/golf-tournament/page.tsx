import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Golf Tournament",
  description:
    "The annual Gator Redleg Golf Tournament raising funds for the chapter and our Soldiers.",
};

export default function GolfPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="Gator Redleg Golf Tournament"
        subtitle="A spring scramble raising funds for the chapter and other military organizations."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg Golf Tournament brings Redlegs, families, and
            sponsors together for a day on the course in support of Florida&apos;s
            Field Artillery Soldiers and the veteran community.
          </p>
          <div className="mt-8">
            <Button href="/chapter-activities/golf-tournament/registration">
              Register Here
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
