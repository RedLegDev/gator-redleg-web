import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "Request for Support",
  description:
    "Submit a request for support from the Gator Redleg Chapter's charitable programs.",
};

export default function RequestForSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Request for Support"
        subtitle="Soldiers, units, and families can request support through the chapter's charitable programs."
      />
      <Container className="py-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-artillery-light">
            The Gator Redlegs provide financial and material support to Field
            Artillery Soldiers, units, and families through our Charitable Action
            Playbook. Submit your request below and the Executive Board will
            review it.
          </p>
          <EmbedSlot
            href={EMBEDS.requestForSupport}
            label="Submit a Request"
            note="Our request form will be posted here — reach us on Facebook in the meantime."
          />
        </div>
      </Container>
    </>
  );
}
