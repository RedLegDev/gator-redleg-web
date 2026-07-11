import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "RSVP & Tickets",
  description: "RSVP and tickets for the 2026 St. Barbara's Ball.",
};

export default function RsvpPage() {
  return (
    <>
      <PageHero eyebrow="St. Barbara's Ball" title="RSVP & Tickets" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Save the date — Saturday, December 12, 2026 at the Winter Haven
            Armory. Tickets will be available as individual seats and full tables
            of eight, so round up your section and sit together.
          </p>
          <EmbedSlot
            href={EMBEDS.ballRsvp}
            label="Registration opens late summer"
            note="Ticketing isn't open yet. Check back late summer, or follow us on Facebook for the announcement."
          />
        </div>
      </Container>
    </>
  );
}
