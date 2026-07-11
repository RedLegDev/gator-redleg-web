import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "RSVP & Tickets",
  description: "RSVP and purchase tickets for the 2025 St. Barbara's Ball.",
};

export default function RsvpPage() {
  return (
    <>
      <PageHero eyebrow="St. Barbara's Ball" title="You're Invited!" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Reserve your spot for the 2025 St. Barbara&apos;s Reception &amp;
            Ball at the Hard Rock Hotel Daytona Beach. Tickets and RSVP are
            handled through our ticketing partner.
          </p>
          <EmbedSlot
            href={EMBEDS.ballRsvp}
            label="RSVP & Purchase Tickets"
            note="Ticketing opens through our partner — check back shortly or reach us on Facebook for the link."
          />
        </div>
      </Container>
    </>
  );
}
