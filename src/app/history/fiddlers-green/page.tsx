import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Fiddler's Green",
  description:
    "The soldier's legend of Fiddler's Green — the resting place of those who served the guns.",
};

export default function FiddlersGreenPage() {
  return (
    <>
      <PageHero
        eyebrow="History"
        title="Fiddler's Green"
        subtitle="Where the Redlegs muster once the last fire mission is complete."
      />
      <Container className="py-16">
        <Prose>
          <p>
            Fiddler&apos;s Green is the soldier&apos;s legend of a resting place
            for those who served on the gun line and in the saddle. As the story
            goes, it lies a short march this side of the hereafter — a shaded
            meadow with cool water and good company, where the cannoneers and
            troopers who have answered their final call gather to rest.
          </p>
          <p>
            There the guns are silent, the horses are watered, and no bugle
            sounds a march. Old Redlegs swap stories around the fire, share a
            drink, and want for nothing. It is said that any Soldier who has done
            their duty well will find a welcome there among their own.
          </p>
          <p>
            For the Field Artillery, Fiddler&apos;s Green is a way of honoring
            the memory of the fallen and of those who have gone before us — a
            reminder that the fellowship of the Redlegs does not end when the
            last round is fired.
          </p>
        </Prose>
      </Container>
    </>
  );
}
