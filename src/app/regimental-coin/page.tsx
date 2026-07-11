import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Regimental Coin",
  description:
    "The Gator Redleg regimental coin and the End of Mission recognition program.",
};

export default function RegimentalCoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Tradition"
        title="Regimental Coin"
        subtitle="A token of the Redleg brotherhood, presented to Soldiers who have served the guns."
      />
      <Container className="py-16">
        <Prose>
          <p>
            The challenge coin is one of the oldest traditions in the military —
            a symbol of belonging, of shared hardship, and of a job well done.
            The Gator Redleg regimental coin carries the chapter&apos;s colors
            and crest as a lasting reminder of a Soldier&apos;s service in
            Florida&apos;s Field Artillery.
          </p>
          <h2>End of Mission</h2>
          <p>
            Through our <strong>End of Mission</strong> program, the chapter
            presents a regimental coin to junior enlisted Soldiers (E-5 and
            below) as they ETS or PCS from the 116th Field Artillery — a way of
            thanking them for their service and welcoming them into the lifelong
            fellowship of the Redlegs.
          </p>
          <p>
            Unit leaders can request a coin for a departing Soldier through the
            chapter&apos;s Charitable Action Playbook.
          </p>
        </Prose>
        <div className="mt-8">
          <Button href="/support/request-for-support">Request a Coin</Button>
        </div>
      </Container>
    </>
  );
}
