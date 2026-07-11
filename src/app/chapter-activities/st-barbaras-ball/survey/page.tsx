import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "St. Barbara's Ball Survey",
  description: "Share your feedback on the St. Barbara's Ball.",
};

export default function BallSurveyPage() {
  return (
    <>
      <PageHero eyebrow="St. Barbara's Ball" title="Survey" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Your feedback helps us make each St. Barbara&apos;s Ball better than
            the last. Please take a moment to share your thoughts.
          </p>
          <EmbedSlot
            href={EMBEDS.ballSurvey}
            label="Open the Survey"
            note="The survey form will be posted here — check back soon."
          />
        </div>
      </Container>
    </>
  );
}
