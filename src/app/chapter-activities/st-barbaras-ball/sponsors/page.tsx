import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EMBEDS } from "@/lib/embeds";
import { TAX_EXEMPTION_PDF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "2026 St. Barbara's Ball sponsorship tiers — King of Battle, Master Gunner, and Gunner — supporting Florida's Field Artillery.",
};

const SPONSORSHIP_FLYER_PDF =
  "/docs/st-barbaras-ball-sponsorship-2026.pdf";
const SPONSORSHIP_FLYER_IMAGE =
  "/photos/st-barbaras-ball-sponsorship-2026.png";

const TIERS = [
  {
    name: "King of Battle",
    subtitle: "Presenting Sponsor",
    amount: "$2,000",
    featured: true as const,
    benefits: [
      "Logo displayed on Gator Redleg website (1 year)",
      "Individual slide recognition",
      "Headline recognition in the banquet program",
      "Gator Redleg swag bag",
      "105mm engraved howitzer shell with certificate of appreciation",
    ],
  },
  {
    name: "Master Gunner",
    subtitle: "Table Sponsor",
    amount: "$500",
    featured: false as const,
    benefits: [
      "Table name recognition",
      "Half-slide recognition",
      "Banquet program recognition",
      "Gator Redleg swag bag",
      "Certificate of appreciation",
    ],
  },
  {
    name: "Gunner",
    subtitle: "Individual Sponsor",
    amount: "$125",
    featured: false as const,
    benefits: [
      "Quarter-slide recognition",
      "Banquet program recognition",
      "Certificate of appreciation",
      "Sponsors one junior Soldier's attendance",
    ],
  },
] as const;

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="St. Barbara's Ball · December 12, 2026"
        title="Sponsors"
        subtitle="Back the Regiment's premier tradition and help get Redlegs through the door."
      />
      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg Chapter is a 501(c)(3) non-profit professional
            association serving Florida&apos;s Field Artillery Soldiers,
            veterans, and their families. Your sponsorship directly supports
            the Soldiers of Florida&apos;s Army National Guard Field Artillery
            units while helping preserve one of the branch&apos;s most cherished
            traditions.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col border-t-4 bg-neutral-50 p-6 ${
                  tier.featured
                    ? "border-redleg ring-2 ring-redleg/20"
                    : "border-gold"
                }`}
              >
                <p className="font-label text-xs uppercase tracking-widest text-artillery-muted">
                  {tier.subtitle}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-wide text-redleg">
                  {tier.name}
                </h2>
                <p className="mt-2 font-display text-3xl font-bold text-artillery">
                  {tier.amount}
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm leading-relaxed text-artillery-light">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded border-l-4 border-gold bg-neutral-50 p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-redleg">
              How to Sponsor
            </h2>
            <p className="mt-3 leading-relaxed text-artillery-light">
              Card donations are accepted through our secure donation page.
              Prefer an invoice or want to discuss a custom arrangement? Email{" "}
              <a
                href="mailto:president@gatorredleg.org"
                className="font-semibold text-redleg underline"
              >
                president@gatorredleg.org
              </a>{" "}
              and we&apos;ll get you squared away.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {EMBEDS.donate ? (
                <Button href={EMBEDS.donate}>Donate Online</Button>
              ) : null}
              <Button
                href="mailto:president@gatorredleg.org?subject=2026%20St.%20Barbara%27s%20Ball%20Sponsorship"
                variant="secondary"
              >
                Contact Us
              </Button>
              <Button href={SPONSORSHIP_FLYER_PDF} variant="secondary">
                Download Flyer (PDF)
              </Button>
            </div>
          </div>

          <figure className="mt-12">
            <a
              href={SPONSORSHIP_FLYER_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded shadow-lg ring-1 ring-black/5 transition hover:ring-redleg/30"
            >
              <Image
                src={SPONSORSHIP_FLYER_IMAGE}
                alt="2026 Saint Barbara's Reception and Ball sponsorship flyer with King of Battle, Master Gunner, and Gunner tiers."
                width={1275}
                height={1650}
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-2 font-label text-xs uppercase tracking-wide text-artillery-muted">
              2026 sponsorship flyer — click to open the PDF
            </figcaption>
          </figure>

          <div className="mt-10 space-y-4 text-sm leading-relaxed text-artillery-muted">
            <p>
              Donations of in-kind items and gift cards are also accepted to
              support the silent auction.
            </p>
            <p>
              Gator Redlegs is a registered 501(c)(3) nonprofit organization
              (EIN 82-4625785). Sponsorships may be tax-deductible as permitted
              by law.{" "}
              <a
                href={TAX_EXEMPTION_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-redleg underline underline-offset-2 hover:text-redleg-dark"
              >
                IRS determination letter
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
