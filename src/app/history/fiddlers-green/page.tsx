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

          <h2>The Cavalryman&apos;s Poem</h2>
          <p>
            The legend is preserved in a poem, &ldquo;Fiddlers&apos; Green,&rdquo;
            first published in the U.S. Army&apos;s <em>Cavalry Journal</em> in
            1923. By the cavalry&apos;s telling it belongs to the mounted arms
            alone — the verse marches the Infantry, the Engineers, and even the
            Artillery straight past to Hell, reserving the shade for troopers
            only. We Redlegs, who once served the guns from the saddle, choose to
            believe there&apos;s a canteen and a spot at the fire waiting for us
            too.
          </p>
          <blockquote className="mt-6 border-l-4 border-gold pl-6 text-lg italic leading-relaxed text-artillery-light [&_p]:mt-6 first:[&_p]:mt-0">
            <p>
              Halfway down the trail to Hell,
              <br />
              In a shady meadow green
              <br />
              Are the Souls of all dead troopers camped,
              <br />
              Near a good old-time canteen.
              <br />
              And this eternal resting place
              <br />
              Is known as Fiddlers&apos; Green.
            </p>
            <p>
              Marching past, straight through to Hell
              <br />
              The Infantry are seen.
              <br />
              Accompanied by the Engineers,
              <br />
              Artillery and Marines,
              <br />
              For none but the shades of Cavalrymen
              <br />
              Dismount at Fiddlers&apos; Green.
            </p>
            <p>
              Though some go curving down the trail
              <br />
              To seek a warmer scene.
              <br />
              No trooper ever gets to Hell
              <br />
              Ere he&apos;s emptied his canteen.
              <br />
              And so rides back to drink again
              <br />
              With friends at Fiddlers&apos; Green.
            </p>
            <p>
              And so when man and horse go down
              <br />
              Beneath a saber keen,
              <br />
              Or in a roaring charge of fierce melee
              <br />
              You stop a bullet clean,
              <br />
              And the hostiles come to get your scalp,
              <br />
              Just empty your canteen,
              <br />
              And put your pistol to your head
              <br />
              And go to Fiddlers&apos; Green.
            </p>
            <footer className="mt-4 font-label text-sm uppercase not-italic tracking-wide text-artillery-muted">
              — The Cavalryman&apos;s Poem, Cavalry Journal, 1923
            </footer>
          </blockquote>
        </Prose>
      </Container>
    </>
  );
}
