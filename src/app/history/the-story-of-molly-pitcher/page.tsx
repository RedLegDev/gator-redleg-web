import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "The Story of Molly Pitcher",
  description:
    "Mary Hays McCauly — 'Sergeant Molly' — and the Order of Molly Pitcher.",
};

export default function MollyPitcherPage() {
  return (
    <>
      <PageHero
        eyebrow="History"
        title="The Story of Molly Pitcher"
        subtitle="Mary Hays McCauly · The Battle of Monmouth, June 28, 1778"
      />
      <Container className="py-16">
        <Prose>
          <p>
            Mary Hays McCauly — known to history as &ldquo;Molly Pitcher&rdquo;
            — shared the rigors of Valley Forge with her husband, William Hays.
            At the Battle of Monmouth on June 28, 1778, she carried water to
            exhausted soldiers under fire, tended the wounded, and carried a
            crippled soldier to safety.
          </p>
          <p>
            When her husband fell wounded at his gun, the piece was about to be
            withdrawn for lack of a crew. Without hesitation, Molly took up the
            rammer staff and served the gun under heavy enemy fire — the second
            woman to man a gun on an American battlefield, after Margaret Corbin
            at Fort Washington in 1776.
          </p>
          <p>
            General Washington issued her a warrant as a noncommissioned officer
            — &ldquo;Sergeant Molly.&rdquo; A flagstaff and cannon stand at her
            gravesite in Carlisle, Pennsylvania.
          </p>
          <h2>The Order of Molly Pitcher</h2>
          <p>
            The United States Field Artillery Association presents the Order of
            Molly Pitcher to recognize individuals who have made significant
            contributions in the field.
          </p>
        </Prose>
      </Container>
    </>
  );
}
