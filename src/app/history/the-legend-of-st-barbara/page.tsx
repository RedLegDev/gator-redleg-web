import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "The Legend of St. Barbara",
  description:
    "The legend, history, and artillery traditions of Saint Barbara — patron saint of the Field Artillery and namesake of the Order of Saint Barbara.",
};

export default function StBarbaraPage() {
  return (
    <>
      <PageHero
        eyebrow="History"
        title="The Legend of Saint Barbara"
        subtitle="Patron saint of artillerymen · Feast Day, December 4th"
      />
      <Container className="py-16">
        <figure className="mb-6 sm:float-right sm:ml-8 sm:max-w-[220px]">
          <Image
            src="/photos/st-barbara-icon.jpg"
            alt="Devotional depiction of Saint Barbara, crowned and robed in red, holding a chalice beside her three-windowed tower with a cannon at her feet."
            width={243}
            height={408}
            className="h-auto w-full rounded shadow"
          />
          <figcaption className="mt-2 font-label text-xs uppercase tracking-wide text-artillery-muted">
            Saint Barbara, patroness of artillerymen.
          </figcaption>
        </figure>
        <Prose>
          <p>
            Around the world, Saint Barbara is recognized as the patron saint
            of field artillerymen. We associate her courage and steadfast faith
            with the qualities of those who have served the guns for centuries.
            Her feast day falls on December 4 — the anchor of every Saint
            Barbara&apos;s Day celebration, including the Gator Redleg Chapter&apos;s{" "}
            <Link href="/chapter-activities/st-barbaras-ball">
              St. Barbara&apos;s Ball
            </Link>
            .
          </p>

          <h2>The Legend</h2>
          <p>
            According to legend, Barbara was the beautiful daughter of
            Dioscorus, a wealthy pagan nobleman of the Roman Empire who lived in
            Nicomedia in Asia Minor sometime in the third or fourth century.
            Her beauty was renowned, and suitors sought her hand — but her
            father, jealous and possessive, shut her away in a tower to keep
            her from the world and to limit her exposure to the new faith
            spreading through the empire.
          </p>
          <p>
            Even imprisonment could not keep her from becoming a Christian.
            From her tower window she looked out upon the countryside, marveled
            at the living world around her, and concluded that the idols her
            family worshipped were false. She received instruction, was
            baptized, and refused every offer of marriage — including those
            from princes her father favored.
          </p>
          <p>
            Shortly before embarking on a journey, Dioscorus commissioned a
            sumptuous bathhouse for his daughter, designed with two windows.
            While he was away, Barbara directed the builders to pierce a third
            window in the tower, symbolizing the Holy Trinity, and is said to
            have traced a cross in the sand of the bath. When her father
            returned and learned what she had done, he flew into a rage.
            Despite his threats, she refused to renounce her faith.
          </p>
          <p>
            Dioscorus dragged Barbara before Marcian, the local prefect, who
            ordered her tortured and put to death. Her own father carried out
            the sentence, beheading her on a mountaintop. As he descended the
            mountain, a sudden violent storm broke over him. Lightning struck
            him down; only his scorched sword remained — divine vengeance, in
            the telling, for the murder of his daughter.
          </p>
          <p>
            In later versions of the story, a shepherd betrays Barbara&apos;s
            hiding place after she flees her father. The place and year of her
            martyrdom vary across manuscripts: some place it in Heliopolis,
            others in Nicomedia; dates range from the mid-third century to
            around 306 A.D.
          </p>

          <h2>Tradition and History</h2>
          <p>
            Scholars note that Barbara&apos;s historicity is doubtful — she
            belongs to hagiography, the literature of saints&apos; lives, rather
            than to verified history. Yet the legend took deep root. The cult of
            Saint Barbara began in the Eastern Church, with an early monastery
            at Edessa in the fourth century. She was known in Rome by the
            seventh century, and her veneration spread westward — notably when
            relics were translated from Rome to Ghent in 985. Accounts of her
            martyrdom were collected in Greek, Syriac, and Latin manuscripts
            from the ninth century onward, and her story was incorporated into
            the martyrologies of Western Europe.
          </p>
          <p>
            She was numbered among the{" "}
            <strong>Fourteen Holy Helpers</strong> — saints invoked against
            various dangers and ailments — and became one of the most widely
            venerated martyrs in both East and West. A reported miracle in
            1448, when a man named Henry Kock escaped a deadly fire at Gorkum
            by calling upon her name, further spread devotion to the saint.
          </p>
          <p>
            G.K. Chesterton celebrated her in{" "}
            <em>The Ballad of Saint Barbara</em> (1922), written for &ldquo;the
            saint of gunners, and a stay in sudden death.&rdquo;
          </p>

          <blockquote className="mt-6 border-l-4 border-gold pl-6 text-lg italic leading-relaxed text-artillery-light [&_p]:mt-6 first:[&_p]:mt-0">
            <p>
              Ruin is a builder of windows; her legend witnesseth
              <br />
              Barbara, the saint of gunners, and a stay in sudden death.
            </p>
            <p>
              St. Barbara for the gunnery and God defend the right,
              <br />
              Building window upon window to our lady of the light.
              <br />
              St. Barbara of the Gunners, with her hand upon the gun.
            </p>
            <footer className="mt-4 font-label text-sm uppercase not-italic tracking-wide text-artillery-muted">
              — G.K. Chesterton, <em>The Ballad of Saint Barbara</em>, 1922
            </footer>
          </blockquote>

          <h2>Patroness of the Guns</h2>
          <p>
            The lightning that consumed Barbara&apos;s father linked her with
            sudden, violent death — thunderstorms, fire, and explosion. As
            gunpowder transformed warfare in the West, those who worked with it
            claimed her protection. Early cannon were notoriously unreliable:
            misfires, muzzle bursts, and exploding weapons were occupational
            hazards of the first gunners. Artillerymen began invoking Saint
            Barbara against the dangers of their trade.
          </p>
          <p>
            Her patronage extended beyond the gun line. Armourers, gunsmiths,
            military engineers, and miners — as gunpowder came into underground
            work in the 1600s — all looked to Saint Barbara. Fireworks makers,
            architects, and those who labor where a spark can kill still number
            her among their protectors.
          </p>
          <p>
            She is usually depicted standing beside a tower pierced with three
            windows, carrying the palm branch of a martyr. Icons often show her
            with a cannon at her feet or holding a chalice and sacramental
            wafer. She has protected us well ever since.
          </p>

          <h2>Saint Barbara&apos;s Day</h2>
          <p>
            The United States Field Artillery Association has long recognized
            the value of Barbara&apos;s legacy — not only the legend itself,
            but the celebrations and standards of excellence that bear her
            name. Saint Barbara&apos;s Day is the foremost occasion in the life
            of a Redleg: a chance to honor tradition, reinforce professional
            commitment, and gather with comrades.
          </p>
          <p>
            Whether formatted as a dining-in, a dining-out, or a military ball,
            the objectives remain the same: enhance professionalism, build
            camaraderie, and promote the profession of arms. Reading the legend
            of Saint Barbara is an important part of every celebration, as is
            the presentation of the Orders of Saint Barbara and Molly Pitcher.
          </p>

          <h2>The Order of Saint Barbara</h2>
          <p>
            The U.S. Field Artillery Association and the Air Defense Artillery
            Association present the Order of Saint Barbara to recognize
            exceptional service to the artillery community. Two levels:
          </p>
          <h3>Honorable Order of Saint Barbara</h3>
          <p>
            Awarded to individuals who demonstrate the highest standards of
            integrity and moral character, outstanding professional competence,
            and selfless service to Army or Marine Corps Field Artillery.
          </p>
          <h3>Ancient Order of Saint Barbara</h3>
          <p>
            The more distinguished of the two, reserved for a select few whose
            long-term dedication embodies the spirit, dignity, and sacrifice of
            Saint Barbara herself — conspicuous lifetime service that stands
            above even their peers in the Honorable Order.
          </p>
        </Prose>
      </Container>
    </>
  );
}
