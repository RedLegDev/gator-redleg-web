import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "The Legend of St. Barbara",
  description:
    "Saint Barbara, patron saint of the Field Artillery, and the Order of Saint Barbara.",
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
            According to legend, Barbara was the daughter of Dioscorus, a Roman
            nobleman of Nicomedia in Asia Minor, in the 3rd and 4th centuries
            A.D. Kept in a tower by her father, she converted to Christianity.
            While her father was away, she had a third window pierced in her
            bathhouse tower, symbolizing the Holy Trinity.
          </p>
          <p>
            When Dioscorus discovered her conversion, he tortured her and
            beheaded her on a mountaintop. Descending from the mountain, he was
            struck by lightning — only his scorched sword remained.
          </p>
          <p>
            Barbara became the patroness of those in danger from thunderstorms,
            fire, explosions — from sudden death. Given the early days of
            cannon, with their misfires and muzzle bursts, artillerymen sought
            her protection. She has protected us well ever since.
          </p>
          <p>
            Venerated since the 7th century, Saint Barbara is usually depicted
            standing beside a tower with three windows, carrying a palm, and
            often shown with a cannon or chalice. She is counted among the
            fourteen Holy Helpers.
          </p>
          <h2>The Order of Saint Barbara</h2>
          <p>
            The United States Field Artillery Association presents the Order of
            Saint Barbara to recognize individuals who have made significant
            contributions to the Field Artillery.
          </p>
        </Prose>
      </Container>
    </>
  );
}
