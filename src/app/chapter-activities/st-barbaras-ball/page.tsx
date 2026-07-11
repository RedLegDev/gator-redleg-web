import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "St. Barbara's Ball",
  description:
    "The 2025 St. Barbara's Reception & Ball at the Hard Rock Hotel Daytona Beach — November 7–8, 2025.",
};

export default function StBarbarasBallPage() {
  return (
    <>
      <PageHero
        eyebrow="Tickets Now Available"
        title="St. Barbara's Ball"
        subtitle="Friday, November 7th & Saturday, November 8th, 2025 · Hard Rock Hotel, Daytona Beach"
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="font-display text-xl font-semibold uppercase tracking-wide text-redleg">
            2025 St. Barbara&apos;s Reception &amp; Ball
          </p>
          <p className="mt-4 text-lg leading-relaxed text-artillery-light">
            In keeping with the highest traditions of The King of Battle, The
            Gator Redleg Chapter of the United States Field Artillery Association
            proudly presents the United States Army Field Artillery&apos;s Saint
            Barbara&apos;s Day Ball and Social.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/chapter-activities/st-barbaras-ball/rsvp">
              RSVP &amp; Tickets
            </Button>
            <Button
              href="/chapter-activities/st-barbaras-ball/lodging"
              variant="secondary"
            >
              Lodging Information
            </Button>
            <Button
              href="/chapter-activities/st-barbaras-ball/faq"
              variant="secondary"
            >
              FAQs (Attire, Traditions)
            </Button>
            <Button
              href="/chapter-activities/st-barbaras-ball/sponsors"
              variant="secondary"
            >
              Become a Sponsor
            </Button>
          </div>

          <div className="mt-12 space-y-8">
            <div className="border-l-4 border-gold pl-6">
              <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
                Red Leg Social
              </h2>
              <p className="mt-1 font-label text-sm uppercase tracking-wide text-artillery-muted">
                Friday, November 7th · Avalon Terrace · 7–11 PM · $50 per person
              </p>
              <p className="mt-3 leading-relaxed text-artillery-light">
                Kick off the festivities Friday evening on the Avalon Terrace.
                This year we&apos;ve elevated the experience with a menu of Angus
                Beef Sliders, Chicken Parmesan Sliders, and BBQ Pulled Pork
                Sliders, complemented by a mashed potato bar and salad bar — plus
                a cash bar. Reconnect with fellow Redlegs in a relaxed, informal
                setting. Attire is business casual.
              </p>
            </div>

            <div className="border-l-4 border-redleg pl-6">
              <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
                St. Barbara&apos;s Ball
              </h2>
              <p className="mt-1 font-label text-sm uppercase tracking-wide text-artillery-muted">
                Saturday, November 8th · Avalon Ballroom · Cocktails 1700 · Ball
                1900–2330
              </p>
              <p className="mt-3 leading-relaxed text-artillery-light">
                The celebration continues Saturday with an extended cocktail hour
                from 1700 to 1900, then the ball from 1900 to 2330 — a gourmet
                dining experience with your choice of NY Strip, Salmon, Chicken,
                or a Vegetarian Option, followed by dessert. And, of course, the
                beloved grog ceremony will be a highlight of the evening.
              </p>
              <p className="mt-3 leading-relaxed text-artillery-light">
                <strong className="text-artillery">Dress Code:</strong> Service
                Uniform with Bow Tie, Blue Mess Dress, or Black Tie. Soldiers who
                only have the Army Green Service Uniform (AGSU) are authorized to
                wear it for this event, as approved by the Regimental Command
                Sergeant Majors.
              </p>
            </div>

            <div className="rounded bg-artillery p-6 text-white">
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-gold">
                Early Bird Discount
              </h3>
              <p className="mt-2 text-white/85">
                Take advantage of a $20 discount on your tickets by purchasing
                early and securing your spot for this grand celebration.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
              Sponsorship
            </h2>
            <p className="mt-3 leading-relaxed text-artillery-light">
              The St. Barbara&apos;s Ball is our biggest event of the year and a
              great opportunity for sponsors to promote their business and
              enhance their branding through affiliation with our professional
              association. We recognize sponsors on the website and in our Year
              in Review presentation. We offer $100, $500, and $2,000 level
              sponsorships to accommodate every level of support.
            </p>
            <div className="mt-5">
              <Button
                href="/chapter-activities/st-barbaras-ball/sponsors"
                variant="primary"
              >
                Sponsorship Opportunities
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
