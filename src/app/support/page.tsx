import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS, CHARITIES } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Florida's Field Artillery Soldiers and veterans. Donations to the Gator Redlegs are tax deductible.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Chapter Patrons"
        title="How You Can Support the Chapter"
        subtitle="Contributions offset the cost of our Soldier and Veteran events and support veteran-oriented charities."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-wide text-artillery">
            Make a Donation
          </h2>
          <p className="mt-3 leading-relaxed text-artillery-light">
            Consider making a one-time donation through the link
            below. As a registered 501(c)(3), all donations to the Gator Redlegs
            are tax deductible.
          </p>
          <EmbedSlot
            href={EMBEDS.donate}
            label="Donate to the Chapter"
            note="Secure donation processing through our chapter store."
          />
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-redleg">
            Organizations We&apos;ve Supported
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHARITIES.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-t-4 border-gold bg-neutral-50 p-5 text-center font-label text-sm uppercase tracking-wide text-artillery transition-shadow hover:shadow-lg"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
