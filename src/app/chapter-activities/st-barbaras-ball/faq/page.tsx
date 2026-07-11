import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { ballFaqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "St. Barbara's Ball FAQ",
  description:
    "Traditions, attire, rules of the mess, the grog ceremony, and the Orders of Saint Barbara and Molly Pitcher.",
};

const TOC = [
  ["Our History", "our-history"],
  ["What is a “Dining Out”?", "dining-out"],
  ["Attire", "attire"],
  ["Rules of the Mess", "rules-of-the-mess"],
  ["The Punch aka “Grog”", "grog"],
  ["Awards", "awards"],
] as const;

export default function BallFaqPage() {
  return (
    <>
      <JsonLd data={ballFaqSchema} />
      <PageHero
        eyebrow="St. Barbara's Ball"
        title="Frequently Asked Questions"
        subtitle="The traditions, attire, and ceremony of a Saint Barbara's Day celebration."
      />
      <Container className="py-16">
        <nav className="mb-12 max-w-3xl rounded border-l-4 border-redleg bg-neutral-50 p-6">
          <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
            On this page
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {TOC.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="font-medium text-redleg underline underline-offset-2 hover:text-redleg-dark"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Prose>
          <p>
            The United States Field Artillery Association recognizes the
            tremendous value of Saint Barbara&apos;s legacy, particularly the
            celebrations and awards associated with her name. Such activities and
            recognition bring the artillery&apos;s venerable history to mind, but
            they have another, more significant function: they establish a
            standard of excellence for aspiring Redlegs. More than any other
            event in the life of Field Artillery Soldiers, Saint Barbara&apos;s
            Day offers an opportunity to enhance professional commitment and
            underscore lofty standards of excellence.
          </p>

          <h2 id="our-history">Our History</h2>
          <p>
            Reading the legend of Saint Barbara is an important part of every
            celebration. Such readings may be included as part of a ceremony for
            the Orders of Saint Barbara or may occur earlier in the program.
            There is no established rule about who should read the legend, but
            whoever does should practice. A good legend will include historical
            information and the symbolic importance of Saint Barbara. See{" "}
            <Link href="/history/the-legend-of-st-barbara">
              The Legend of St. Barbara
            </Link>
            , <Link href="/history/the-story-of-molly-pitcher">
              The Story of Molly Pitcher
            </Link>
            , and <Link href="/history/fiddlers-green">Fiddler&apos;s Green</Link>.
          </p>

          <h2 id="dining-out">St. Barbara&apos;s Day Celebrations — What is a &ldquo;Dining Out&rdquo;?</h2>
          <p>
            The dining-in is one of the more common ways to celebrate Saint
            Barbara&apos;s Day. It involves only Redlegs and selected guests. It
            is a formal dinner with strict rules of conduct. Two persons — Mr.
            President and Mr. Vice — control the progress of the dinner. This
            type of celebration is an excellent way to gather Redlegs together
            socially and build on the camaraderie of a particular unit.
          </p>
          <p>
            The dining-out is quite similar to the dining-in. The only difference
            is that spouses are included. The dining-out is a formal affair, and
            strict rules of conduct still apply.
          </p>

          <h2 id="attire">Attire</h2>
          <p>
            For the 2026 Dining Out, dress is <strong>cocktail attire</strong>;
            Soldiers are encouraged to attend in uniform. A traditional Saint
            Barbara&apos;s dining-in or dining-out is a formal affair — the
            standards below describe that traditional formality for reference.
          </p>
          <h3>Military Personnel (traditional standard)</h3>
          <p>
            Traditionally, dress is Bow Tie: military personnel wear the black
            bow tie with the Army Blue, Army Blue Mess, Army White, or Army White
            Mess uniform. Celebrants may wear ribbons or miniature or regular
            medals on the Army Blue or White uniforms; miniature medals are
            appropriate on the mess uniforms.
          </p>
          <h3>Civilian (traditional standard)</h3>
          <p>
            For a traditional formal celebration, civilian guests wear the tuxedo
            or formal gown.
          </p>

          <h2 id="rules-of-the-mess">Rules of the Mess</h2>
          <h3>The Receiving Line</h3>
          <p>
            Receiving lines usually are located near an entrance and are kept as
            short as possible. The first person in the line will be an individual
            whose sole duty is to announce the names of the guests. His job is
            merely to introduce arriving guests to the next person in the line.
            As couples approach, the man moves to the right of the woman, so she
            is ahead of him, and states the woman&apos;s name to the first person
            in line. After the woman has been introduced, the man introduces
            himself. Extended conversation has no place in a receiving line.
          </p>
          <h3>Toasts</h3>
          <p>
            Toasts are a traditional element of the dining-in and dining-out.
            Planners must decide in advance the subject of each toast and the
            person who will present it. Toasts may be made to the President of
            the United States, the United States Army, the division, the
            regiment, and the unit. Finally, a toast should be given in the name
            of Saint Barbara. The proper procedure is to hold the toasting glass
            at waist level; when the toast is proposed, repeat the subject, raise
            the glass to eye level, and take a drink. No toasts other than those
            listed in the program should be offered.
          </p>

          <h2 id="grog">The Punch aka &ldquo;Grog&rdquo;</h2>
          <p>
            The Grog Ceremony, a revered tradition during the St. Barbara&apos;s
            Day celebrations, is a symbolic rite that honors new gunners as they
            join the ranks of the esteemed Field Artillery. This ceremonial
            mixing of the Field Artillery Punch introduces them to the &lsquo;most
            dreaded weapon&rsquo; of the artillery. The &lsquo;charges&rsquo;
            added trace back to our historical roots:
          </p>
          <ul>
            <li>Champagne for the dignified presence and quality of artillery.</li>
            <li>
              Corn squeezin&apos;s and Scotch reflect our American and British
              heritages.
            </li>
            <li>Cognac acknowledges the French contributions to our freedom.</li>
            <li>
              A blended bourbon unites all arms and allies, emphasizing our joint
              effort on the battlefield.
            </li>
          </ul>
          <p>
            The ceremony culminates with a red elixir, symbolizing the blood of
            those who have sacrificed for freedom. The Grog Ceremony is not just
            about the punch; it&apos;s about honoring tradition, recognizing the
            past, and instilling a sense of unity and purpose among the
            artillerymen.
          </p>

          <h2 id="awards">Awards</h2>
          <h3>The Honorable Order of St. Barbara</h3>
          <p>
            The Order of Saint Barbara is awarded through the U.S. Field
            Artillery Association (USFAA) and the Air Defense Artillery
            Association (ADAA) and has two levels. The{" "}
            <strong>Honorable Order of Saint Barbara</strong> is awarded to those
            who have demonstrated the highest standards of integrity and moral
            character, an outstanding degree of professional competence, and
            selfless service to the Artillery. The{" "}
            <strong>Ancient Order of Saint Barbara</strong> is reserved for those
            who have achieved long-term, exceptional service to the artillery
            surpassing even their brethren in the Honorable Order — approved by
            the Commanding General, United States Army Field Artillery Center and
            Fort Sill.
          </p>
          <h3>The Molly Pitcher Award</h3>
          <p>
            The Honorable Order of Molly Pitcher is bestowed by the USFAA and
            ADAA to recognize military spouses who have voluntarily contributed
            in a significant way to the improvement of the U.S. Field Artillery
            or Air Defense Artillery communities. Learn more about the{" "}
            <Link href="/membership">United States Field Artillery Association</Link>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
