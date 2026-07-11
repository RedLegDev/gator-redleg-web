import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Softball Tournament",
  description:
    "The Kenny Fike Memorial Softball Tournament honors 1SG Kenny A. Fike and benefits the Gator Redleg Chapter.",
};

export default function SoftballPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Activities"
        title="Kenny Fike Memorial Softball Tournament"
        subtitle="Played in memory of 1SG Kenny A. Fike — open to the public, proceeds benefit the Gator Redleg Chapter."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          {/* In Memoriam */}
          <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
            In Memory of 1SG Kenny A. Fike
          </h2>
          <p className="mt-3 leading-relaxed text-artillery-light">
            The tournament carries the name of{" "}
            <strong className="text-artillery">
              First Sergeant Kenny A. Fike
            </strong>
            , Florida Army National Guard (29 March 1979 – 24 September 2010), a
            Redleg of the 2nd Battalion, 116th Field Artillery. The Kenny A. Fike
            National Guard Armory stands named in his honor, and each fall the
            Gator Redlegs take the field to keep his memory alive and to support
            the Soldiers and families of Florida&apos;s Field Artillery.
          </p>

          <figure className="mt-8">
            <Image
              src="/photos/kenny-fike-plaque.jpg"
              alt="Bronze plaque dedicating the Kenny A. Fike National Guard Armory in honor of First Sergeant Kenny A. Fike, Florida Army National Guard, 29 March 1979 – 24 September 2010."
              width={960}
              height={749}
              className="h-auto w-full rounded"
            />
            <figcaption className="mt-2 font-label text-xs uppercase tracking-wide text-artillery-muted">
              &ldquo;A battery of artillery is worth a thousand muskets.&rdquo; —
              Gen. William T. Sherman
            </figcaption>
          </figure>

          <figure className="mt-6">
            <Image
              src="/photos/softball-tournament.jpg"
              alt="Gator Redleg families and players in REDLEG jerseys gathered around the Kenny A. Fike memorial plaque at the softball tournament."
              width={960}
              height={755}
              className="h-auto w-full rounded"
            />
            <figcaption className="mt-2 font-label text-xs uppercase tracking-wide text-artillery-muted">
              Redlegs, families, and friends at the memorial tournament.
            </figcaption>
          </figure>

          {/* Venue */}
          <div className="mt-10 rounded border-l-4 border-redleg bg-neutral-50 p-6">
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

          <div className="mt-8 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <p className="font-label text-sm uppercase tracking-wide text-artillery-muted">
              Not currently scheduled
            </p>
            <p className="mt-2 text-sm text-artillery-light">
              Registration will open when the next tournament is announced.
              Follow us on{" "}
              <a
                href="https://m.facebook.com/pages/Gator-Redleg-Chapter-of-US-Field-Artillery-Association/159706074074450"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-redleg underline"
              >
                Facebook
              </a>{" "}
              for updates.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
