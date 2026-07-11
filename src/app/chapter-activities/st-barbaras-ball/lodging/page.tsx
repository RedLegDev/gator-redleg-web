import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Lodging",
  description:
    "Room block and lodging information for the St. Barbara's Ball at the Hard Rock Hotel Daytona Beach.",
};

export default function LodgingPage() {
  return (
    <>
      <PageHero
        eyebrow="St. Barbara's Ball"
        title="Lodging"
        subtitle="Hard Rock Hotel, Daytona Beach"
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-3">
            <Button href={EMBEDS.ballLodgingHotel} variant="secondary">
              Visit Website
            </Button>
            <Button href={EMBEDS.ballLodgingBooking}>Book Your Stay</Button>
          </div>

          <h2 className="mt-10 font-display text-2xl font-bold tracking-wide text-artillery">
            Lodging Information
          </h2>
          <p className="mt-3 leading-relaxed text-artillery-light">
            Experience panoramic ocean views, legendary amenities, and modern
            luxury at the Hard Rock Hotel Daytona Beach. Situated in the heart of
            one of America&apos;s most famous beaches, this hotel offers the
            perfect setting for your stay during the St. Barbara&apos;s Ball
            weekend. Bask in the Florida sun at the oceanfront pool or savor a
            meal at their world-famous restaurant while enjoying the vibrant
            atmosphere.
          </p>

          <div className="mt-8 rounded border-l-4 border-redleg bg-neutral-50 p-6">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              Book Early!
            </h3>
            <p className="mt-2 text-artillery-light">
              Room block cut-off is <strong>October 8, 2025</strong>. To secure
              your accommodation for the St. Barbara&apos;s Ball, use our booking
              block link above.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
