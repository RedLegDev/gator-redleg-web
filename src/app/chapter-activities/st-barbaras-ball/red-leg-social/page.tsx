import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Red Leg Social",
  description:
    "The Red Leg Social kicks off St. Barbara's Ball weekend on Friday, December 11, 2026.",
};

export default function RedLegSocialPage() {
  return (
    <>
      <PageHero
        eyebrow="St. Barbara's Ball"
        title="Red Leg Social"
        subtitle="Friday, December 11, 2026 — the night before the Dining Out."
      />
      <Container className="py-16">
        <div className="max-w-2xl text-lg leading-relaxed text-artillery-light">
          <p>
            Kick off St. Barbara&apos;s weekend with the Red Leg Social on Friday
            evening. Reconnect with fellow Redlegs in a relaxed, informal setting
            — swap stories, welcome new faces, and set the tone for the Dining
            Out the following night.
          </p>
          <p className="mt-4">
            Venue and timing will be announced with ticketing later this summer.
            Watch this space and follow us on Facebook for details.
          </p>
        </div>
      </Container>
    </>
  );
}
