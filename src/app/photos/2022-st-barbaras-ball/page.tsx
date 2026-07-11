import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { EmbedSlot } from "@/components/EmbedSlot";
import { EMBEDS } from "@/lib/embeds";

export const metadata: Metadata = {
  title: "2022 St. Barbara's Ball Photos",
  description: "Photo gallery from the 2022 St. Barbara's Ball.",
};

export default function Photos2022Page() {
  return (
    <>
      <PageHero eyebrow="Photos" title="2022 St. Barbara's Ball" />
      <Container className="py-16">
        <EmbedSlot
          href={EMBEDS.photos2022Ball}
          label="View the Album"
          note="This gallery will be posted here."
        />
      </Container>
    </>
  );
}
