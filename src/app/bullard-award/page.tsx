import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { MarkdownProse, markdownToc } from "@/components/MarkdownProse";
import { AzimuthRule } from "@/components/AzimuthRule";
import { BullardAwardRecipients } from "@/components/BullardAwardRecipients";
import { BULLARD_AWARD_RECIPIENTS } from "@/lib/bullard-award";
import { BULLARD_AWARD_SOP } from "@/lib/chapter-docs";

export const metadata: Metadata = {
  title: "MG Kennedy C. Bullard Award",
  description:
    "The Major General Kennedy C. Bullard Award — recognizing outstanding junior Field Artillery officers and NCOs in the Florida Army National Guard. Standing Operating Procedures and the Assault at Red Beach take-home print.",
};

export const dynamic = "force-static";

export default function BullardAwardPage() {
  const sop = BULLARD_AWARD_SOP;
  const toc = markdownToc(sop);

  return (
    <>
      <PageHero
        eyebrow="Awards"
        title="MG Kennedy C. Bullard Award"
        subtitle="Recognizing outstanding junior Redleg leaders — chartered in the Regiment's centennial year, 2017."
      />
      <Container className="py-16">
        <Prose>
          <p>
            The Major General Kennedy C. Bullard Award honors high-potential
            junior officers and NCOs for outstanding contributions to Florida&apos;s
            Field Artillery community. Two awards are presented each year — one
            to an Artillery officer (Lieutenant or Captain) and one to an
            Artillery NCO (Corporal through Staff Sergeant) — with presentation
            preferred at the annual National Guard Association of Florida
            conference, or at St. Barbara&apos;s Ball if an awardee cannot attend.
          </p>
          <p>
            Recipients are engraved on the permanent trophy retained at Saint
            Francis Barracks in Saint Augustine, and receive a framed print of{" "}
            <em>Assault at Red Beach — Morotai Island</em> as their take-home
            award.
          </p>
        </Prose>

        <BullardAwardRecipients classes={BULLARD_AWARD_RECIPIENTS} />

        <section className="mt-14" aria-labelledby="red-beach-heading">
          <h2
            id="red-beach-heading"
            className="font-display text-2xl font-bold tracking-wide text-artillery"
          >
            Assault at Red Beach
          </h2>
          <p className="mt-2 font-heading text-xs uppercase tracking-[0.2em] text-artillery-muted">
            The take-home award · Jackson Walker, 1990
          </p>

          <figure className="mt-6 overflow-hidden rounded border border-artillery-light/15 bg-artillery/[0.02]">
            <Image
              src="/IMG_1329.jpg"
              alt="Assault at Red Beach: Morotai Island — oil painting by Jackson Walker depicting the 116th Field Artillery landing in 1944"
              width={3420}
              height={1874}
              className="h-auto w-full"
              priority
            />
            <figcaption className="border-t border-artillery-light/15 px-4 py-3 font-heading text-xs uppercase tracking-wide text-artillery-muted sm:px-5">
              Assault at Red Beach: Morotai Island — 1944 · Jackson Walker,
              1990, oil on Masonite, 36&quot; × 66&quot;
            </figcaption>
          </figure>

          <Prose className="mt-8">
            <p>
              On September 15, 1944, the 116th Field Artillery, part of the 31st
              &ldquo;Dixie&rdquo; Infantry Division, participated in an assault
              landing on the island of Morotai, Dutch East Indies. The Japanese
              were taken by surprise and offered little resistance. Following a
              landing made difficult primarily by underwater coral reefs and muddy
              terrain, the 116th provided artillery support for divisional
              infantry units protecting the newly established American airfields
              on the island. Throughout the period of occupation, the Japanese
              frequently raided the island from nearby Halmahera. The 116th
              remained on Morotai until their redeployment for the invasion of
              Mindanao, Philippine Islands, in May 1945.
            </p>
          </Prose>
        </section>

        <div className="my-14">
          <AzimuthRule />
        </div>

        <section aria-labelledby="sop-heading">
          <h2
            id="sop-heading"
            className="font-display text-2xl font-bold tracking-wide text-artillery"
          >
            Standing Operating Procedures
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-artillery-light">
            Nomination packets are due to the Chapter President no later than{" "}
            <strong className="text-artillery">1 April</strong> each year. The
            Award Board selects recipients by 1 May.
          </p>

          <div className="mt-10 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
            <aside className="mb-10 lg:mb-0">
              <nav
                aria-label="Bullard Award SOP sections"
                className="lg:sticky lg:top-28"
              >
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-artillery-muted">
                  Contents
                </p>
                <ol className="mt-3 space-y-2 border-l border-artillery-light/20 pl-4">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm leading-snug text-artillery-light transition-colors hover:text-redleg"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <MarkdownProse markdown={sop} className="max-w-none" />
          </div>
        </section>
      </Container>
    </>
  );
}
