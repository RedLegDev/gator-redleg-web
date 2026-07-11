import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "2019 St. Barbara's Ball Photos",
  description: "Photo gallery from the 2019 St. Barbara's Ball.",
};

export default function Photos2019BallPage() {
  return (
    <>
      <PageHero
        eyebrow="Photos"
        title="2019 St. Barbara's Ball"
        subtitle="Photographer: Ted Davis"
      />
      <Container className="py-16">
        <EmbedSlot
          href={EMBEDS.photos2019Ball}
          label="View the Album"
          note="This gallery will be posted here."
        />
      </Container>
    </>
  );
}
