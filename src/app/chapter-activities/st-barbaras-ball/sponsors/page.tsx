import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsorship opportunities for the St. Barbara's Ball — $100, $500, and $2,000 levels.",
};

const TIERS = [
  { level: "$100", label: "Supporter" },
  { level: "$500", label: "Patron" },
  { level: "$2,000", label: "Benefactor" },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="St. Barbara's Ball" title="Sponsors" />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            Your sponsorship will express your support for Florida&apos;s
            artillery Soldiers, promote your brand to roughly two hundred annual
            attendees, and help to defray the costs associated with recognizing
            our finest honorees at this annual celebration.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.level}
                className="border-t-4 border-gold bg-neutral-50 p-5 text-center"
              >
                <p className="font-display text-2xl font-bold text-artillery">
                  {t.level}
                </p>
                <p className="mt-1 font-label text-xs uppercase tracking-widest text-artillery-muted">
                  {t.label}
                </p>
              </div>
            ))}
          </div>

          <EmbedSlot
            href={EMBEDS.ballSponsors}
            label="Become a Sponsor"
            note="Sponsorship purchase is handled through our partner — reach us on Facebook and we'll get you set up."
          />
        </div>
      </Container>
    </>
  );
}
