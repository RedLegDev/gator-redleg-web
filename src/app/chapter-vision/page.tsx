import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Chapter Vision",
  description:
    "The Gator Redleg Chapter's vision — community, activities, and support for Florida's Field Artillery.",
};

export default function ChapterVisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We're Headed"
        title="Chapter Vision"
        subtitle="Building community, preserving tradition, and standing behind Florida's Redlegs."
      />
      <Container className="py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              h: "Community",
              p: 'A support network our veterans, military, and families can turn to in times of hardship — so we "Never Leave a Fallen Comrade."',
            },
            {
              h: "Activities",
              p: "Meaningful events that preserve and strengthen the bonds of camaraderie between Artillerists past and present.",
            },
            {
              h: "Support",
              p: "An avenue for local governments, businesses, and charities to express their support for our hometown heroes.",
            },
          ].map((pillar) => (
            <div key={pillar.h} className="border-t-4 border-gold pt-4">
              <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-redleg">
                {pillar.h}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-artillery-light">
                {pillar.p}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-redleg">
            The Full Vision
          </h2>
          <div className="mt-4 overflow-hidden rounded border border-artillery-light/20">
            <iframe
              src={EMBEDS.chapterVisionDoc}
              title="Gator Redleg Chapter Vision"
              className="h-[80vh] w-full"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
