import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Fundraising opportunities supporting the Gator Redleg Chapter.",
};

export default function FundraisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Fundraising Opportunities"
        subtitle="Ways your business or organization can partner with the Gator Redlegs."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redleg Chapter partners with businesses and community
            members to raise funds that directly support Florida&apos;s Field
            Artillery Soldiers, veterans, and their families.
          </p>
          <EmbedSlot
            href={null}
            label="Fundraising Details"
            note="Our fundraising flyer will be posted here — contact us to get involved."
          />
        </div>
      </Container>
    </>
  );
}
