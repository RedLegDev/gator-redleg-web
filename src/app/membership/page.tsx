import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the United States Field Artillery Association and affiliate with the Gator Redleg Chapter.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="United States Field Artillery Association"
        subtitle="We are only as strong as our membership."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <blockquote className="border-l-4 border-gold pl-6 text-lg italic leading-relaxed text-artillery-light">
            &ldquo;Your dedication to your professional association will help
            perpetuate its rich heritage, as well as its many initiatives —
            scholarships to USFAA members and their family members, recognition
            awards to the FA BOLC, CCC, PCC and NCOA distinguished graduates,
            support for Field Artillery balls, Saint Barbara and Molly Pitcher
            awards, and Chapter Grants that help chapters stay active and promote
            the mission and legacy of the Field Artillery.&rdquo;
            <footer className="mt-2 font-label text-sm uppercase not-italic tracking-wide text-artillery-muted">
              — US Field Artillery Association
            </footer>
          </blockquote>

          <div className="mt-8">
            <Button href={EMBEDS.usfaaJoin} size="lg">
              Join Today
            </Button>
          </div>

          <p className="mt-8 leading-relaxed text-artillery-light">
            Since its humble beginnings on horseback at Fort Riley in the first
            decade of the last century, the United States Field Artillery
            Association has served important purposes and contributed to the
            development of the world&apos;s best Field Artillery. Today&apos;s
            Association continues this proud Redleg tradition. Benefits include
            the Artillery Journal subscription, scholarship eligibility,
            complimentary membership in the AUSA, and supporting the Gator
            Redlegs in your community. Visit{" "}
            <a
              href={EMBEDS.usfaaInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-redleg underline underline-offset-2 hover:text-redleg-dark"
            >
              fieldartillery.org
            </a>{" "}
            for more information, including{" "}
            <a
              href={EMBEDS.usfaaNewMemberships}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-redleg underline underline-offset-2 hover:text-redleg-dark"
            >
              small business, corporate enrollment, and membership renewal
            </a>
            .
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
            How to Affiliate With the Gator Redlegs
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-artillery-light">
            <li>
              Join or renew your membership through the United States Field
              Artillery Association at{" "}
              <a
                href={EMBEDS.usfaaJoin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-redleg underline underline-offset-2 hover:text-redleg-dark"
              >
                fieldartillery.org
              </a>
              . Annual, multi-year, and lifetime memberships are available —
              USFAA sets current pricing.
            </li>
            <li>
              Once you have a member account, log in to the USFAA Member Compass
              portal and set your chapter affiliation to the{" "}
              <strong>Gator Redleg Chapter</strong>.
            </li>
            <li>
              That&apos;s it — your dues support USFAA&apos;s national mission,
              and your affiliation keeps the Gator Redlegs strong here in central
              Florida.
            </li>
          </ol>
        </div>

        <div className="mt-12 max-w-3xl rounded border-l-4 border-redleg bg-neutral-50 p-6">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
            AUSA Partnership
          </h3>
          <p className="mt-2 leading-relaxed text-artillery-light">
            We have become teammates with the Association of the United States
            Army. As long as you are a member of the United States Field
            Artillery Association, you gain complimentary membership in AUSA —
            the Field Artillery Association ensures you are enrolled. AUSA has
            been a huge advocate for force structure and offers significant
            retail discounts now available to all of our members.
          </p>
        </div>
      </Container>
    </>
  );
}
